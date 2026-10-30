"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// The WebGL engine is only needed for the first two seconds of a visit, so it
// loads after hydration instead of inflating every route's bundle.
const GlassIconReveal = dynamic(
  () => import("@/components/ui/liquid-glass-logo-reveal"),
  { ssr: false },
);

/**
 * Brand mark from `src/app/icon.svg`, inlined so the intro never waits on a
 * network request. The background plate is dropped: only the shape is used.
 */
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><path d="M 16 4 L 28 16 L 16 28 L 4 16 Z" stroke="#ffffff" stroke-width="2.2" stroke-linejoin="round"/><circle cx="16" cy="16" r="3" fill="#ffffff"/></svg>`;

const DEFAULT_PLAY_MS = 1900;
const DEFAULT_EXIT_MS = 450;
const DEFAULT_REDUCED_PLAY_MS = 500;
const DEFAULT_REDUCED_EXIT_MS = 350;

type Phase = "playing" | "leaving" | "done";

interface Palette {
  background: string;
  accent: string;
  look: "light" | "dark";
}

function isLightColor(value: string): boolean {
  const match = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return false;

  let digits = match[1];
  if (digits.length === 3) {
    digits = digits
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(digits.slice(0, 2), 16);
  const g = parseInt(digits.slice(2, 4), 16);
  const b = parseInt(digits.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.55;
}

export interface SiteIntroProps {
  /** How long the reveal plays before it fades away. */
  playMs?: number;
  /** Length of the fade itself. */
  exitMs?: number;
  /** Shorter timeline when the visitor prefers reduced motion. */
  reducedPlayMs?: number;
  reducedExitMs?: number;
}

/**
 * First-load brand intro: the site mark is revealed through a droplet of glass,
 * then the overlay fades away to the page.
 *
 * Rendered from the root layout so it appears on every full page load, but not
 * on client-side route changes. Pointer or keyboard input skips it, it never
 * traps focus, and it falls back to a plain logo when WebGL2 is unavailable.
 */
export function SiteIntro({
  playMs = DEFAULT_PLAY_MS,
  exitMs = DEFAULT_EXIT_MS,
  reducedPlayMs = DEFAULT_REDUCED_PLAY_MS,
  reducedExitMs = DEFAULT_REDUCED_EXIT_MS,
}: SiteIntroProps) {
  const [phase, setPhase] = React.useState<Phase>("playing");
  const [ready, setReady] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [palette, setPalette] = React.useState<Palette>({
    background: "#0F0C0D",
    accent: "#C2434B",
    look: "dark",
  });

  // Read the live design tokens so the intro matches the active theme.
  React.useEffect(() => {
    const styles = window.getComputedStyle(document.documentElement);
    const background = styles.getPropertyValue("--bg").trim();
    const accent = styles.getPropertyValue("--accent").trim();

    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    if (background) {
      setPalette({
        background,
        accent: accent || "#C2434B",
        look: isLightColor(background) ? "light" : "dark",
      });
    }
  }, []);

  // Hold the intro once the scene is ready, then fade it away. The extra grace
  // period keeps the page from hanging if the WebGL chunk never arrives.
  React.useEffect(() => {
    if (phase !== "playing") return;

    const play = reducedMotion ? reducedPlayMs : playMs;
    const delay = ready ? play : play + 1200;
    const timer = window.setTimeout(() => setPhase("leaving"), delay);
    return () => window.clearTimeout(timer);
  }, [phase, ready, reducedMotion, playMs, reducedPlayMs]);

  React.useEffect(() => {
    if (phase !== "leaving") return;

    const timer = window.setTimeout(
      () => setPhase("done"),
      reducedMotion ? reducedExitMs : exitMs,
    );
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion, exitMs, reducedExitMs]);

  // Any pointer or key press skips the intro.
  React.useEffect(() => {
    if (phase !== "playing") return;

    const dismiss = () => setPhase("leaving");

    window.addEventListener("pointerdown", dismiss, { passive: true });
    window.addEventListener("keydown", dismiss);

    return () => {
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, [phase]);

  // Lock scrolling while the overlay covers the page.
  React.useEffect(() => {
    if (phase === "done") return;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previous;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      data-site-intro={phase}
      className={cn(
        "site-intro fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5",
        phase === "leaving" && "site-intro--leaving",
      )}
      style={{ backgroundColor: palette.background }}
    >
      <GlassIconReveal
        logo={MARK_SVG}
        label="Siddiq"
        onReady={() => setReady(true)}
        look={palette.look}
        background={palette.background}
        logoColor={palette.accent}
        tileSize={420}
        logoScale={0.36}
        finalScale={1}
        loop={false}
        hold={0}
        tuning={{
          present: 0.85,
          glide: 1.25,
          response: 0.5,
          startSize: 0.24,
          startZoom: 1.6,
          bounce: 0,
          focus: 0.8,
          sheen: 1,
          lightTurn: 0.7,
        }}
        className="pointer-events-none"
        style={{
          width: "clamp(230px, 46vw, 400px)",
          height: "clamp(230px, 46vw, 400px)",
          backgroundColor: "transparent",
        }}
      />

      <div className="site-intro-wordmark font-inter text-[11px] font-bold uppercase tracking-eyebrow text-muted">
        Siddiq · Edition 01
      </div>
    </div>
  );
}
