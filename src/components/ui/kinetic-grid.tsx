"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Point {
  x: number;
  y: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  born: number;
}

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface GridPalette {
  lineBase: Rgba;
  nodeBase: Rgba;
  lineActive: Rgba;
  nodeActive: Rgba;
  accentRgb: string;
  dotColor: string;
}

interface CanvasSize {
  w: number;
  h: number;
  dpr: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CELL_SIZE_DESKTOP = 55;
const CELL_SIZE_TABLET = 64;
const CELL_SIZE_MOBILE = 72;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 22;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;
const NODE_BASE_RADIUS = 1.8;
const NODE_ACTIVE_RADIUS = 3;
const OFF_SCREEN: Point = { x: -9999, y: -9999 };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function lerpColor(base: Rgba, active: Rgba, t: number): string {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

/** Parses the hex / rgb(a) values produced by the CSS custom properties. */
function parseColor(value: string): Rgba | null {
  const input = value.trim();
  if (!input) return null;

  const hex = input.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let digits = hex[1];
    if (digits.length === 3 || digits.length === 4) {
      digits = digits
        .split("")
        .map((char) => char + char)
        .join("");
    }
    if (digits.length !== 6 && digits.length !== 8) return null;

    return {
      r: parseInt(digits.slice(0, 2), 16),
      g: parseInt(digits.slice(2, 4), 16),
      b: parseInt(digits.slice(4, 6), 16),
      a: digits.length === 8 ? parseInt(digits.slice(6, 8), 16) / 255 : 1,
    };
  }

  const rgb = input.match(
    /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)$/i,
  );
  if (rgb) {
    return {
      r: Number(rgb[1]),
      g: Number(rgb[2]),
      b: Number(rgb[3]),
      a: rgb[4] === undefined ? 1 : Number(rgb[4]),
    };
  }

  return null;
}

/**
 * Derives the canvas palette from the live design tokens, so the grid follows
 * the Obsidian (dark) and Porcelain (light) themes without extra props.
 */
function readPalette(element: HTMLElement, monochrome: boolean): GridPalette {
  const styles = window.getComputedStyle(element);

  const ink = parseColor(styles.getPropertyValue("--ink")) ?? {
    r: 245,
    g: 237,
    b: 233,
    a: 1,
  };
  const accent = monochrome
    ? ink
    : parseColor(styles.getPropertyValue("--accent")) ?? {
        r: 194,
        g: 67,
        b: 75,
        a: 1,
      };

  return {
    // Deliberately restrained base linework — the accent is a scarce signal.
    lineBase: { ...ink, a: 0.09 },
    nodeBase: { ...ink, a: 0.16 },
    lineActive: { ...accent, a: 0.55 },
    nodeActive: { ...accent, a: 0.9 },
    accentRgb: `${accent.r},${accent.g},${accent.b}`,
    dotColor: `rgba(${ink.r},${ink.g},${ink.b},0.045)`,
  };
}

function cellSizeFor(width: number) {
  if (width < 640) return CELL_SIZE_MOBILE;
  if (width < 1024) return CELL_SIZE_TABLET;
  return CELL_SIZE_DESKTOP;
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface KineticGridProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * `default` follows the theme accent (garnet). `monochrome` renders the grid
   * with the ink token only.
   */
  globalColor?: "default" | "monochrome";
}

/**
 * Cursor-reactive architectural grid used as the hero backdrop.
 *
 * Adaptations from the reference implementation:
 * - sizes itself to its container (not the viewport) and stays behind content;
 * - reads the app's CSS tokens so it tracks the active theme;
 * - only runs while visible to save CPU, and renders a static frame when the
 *   user prefers reduced motion.
 */
export default function KineticGrid({
  children,
  className,
  globalColor = "default",
}: KineticGridProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const mouseRef = React.useRef<Point>({ ...OFF_SCREEN });
  const targetMouseRef = React.useRef<Point>({ ...OFF_SCREEN });
  const ripplesRef = React.useRef<Ripple[]>([]);
  const rafRef = React.useRef<number>(0);
  const sizeRef = React.useRef<CanvasSize>({ w: 0, h: 0, dpr: 1 });
  const paletteRef = React.useRef<GridPalette | null>(null);
  const dotPatternRef = React.useRef<{
    color: string;
    pattern: CanvasPattern | null;
  } | null>(null);

  // ── Warp ────────────────────────────────────────────────────────────────────

  const getWarpedPoint = React.useCallback(
    (
      gx: number,
      gy: number,
      col: number,
      row: number,
      mouse: Point,
      ripples: Ripple[],
      cols: number,
      rows: number,
    ): { pt: Point; proximity: number } => {
      // Edge pin — smoothly locks boundary rows/cols in place.
      const edgeMargin = 1.5;
      const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
      const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
      const pinFactor = colPin * colPin * rowPin * rowPin;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

      // Ripple displacement.
      let rx = 0;
      let ry = 0;
      for (const ripple of ripples) {
        const rdx = gx - ripple.x;
        const rdy = gy - ripple.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const waveWidth = 55;
        const diff = rdist - ripple.radius;

        if (Math.abs(diff) < waveWidth) {
          const strength =
            (1 - Math.abs(diff) / waveWidth) * ripple.opacity * 18 * pinFactor;
          const angle = Math.atan2(rdy, rdx);
          const sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }

      // Cursor warp with bell falloff.
      if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
        const t = dist / INFLUENCE_RADIUS;
        const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
        const warpAmount = eased * MAX_WARP * pinFactor;
        const angle = Math.atan2(dy, dx);
        return {
          pt: {
            x: gx - Math.cos(angle) * warpAmount + rx,
            y: gy - Math.sin(angle) * warpAmount + ry,
          },
          proximity,
        };
      }

      return { pt: { x: gx + rx, y: gy + ry }, proximity };
    },
    [],
  );

  // ── Dot pattern (cached per theme) ──────────────────────────────────────────

  const getDotPattern = React.useCallback(
    (ctx: CanvasRenderingContext2D, color: string) => {
      const cached = dotPatternRef.current;
      if (cached && cached.color === color) return cached.pattern;

      const tile = document.createElement("canvas");
      tile.width = DOT_SPACING;
      tile.height = DOT_SPACING;

      const tileCtx = tile.getContext("2d");
      if (!tileCtx) return null;

      tileCtx.fillStyle = color;
      tileCtx.beginPath();
      tileCtx.arc(DOT_SPACING / 2, DOT_SPACING / 2, 0.7, 0, Math.PI * 2);
      tileCtx.fill();

      const pattern = ctx.createPattern(tile, "repeat");
      dotPatternRef.current = { color, pattern };
      return pattern;
    },
    [],
  );

  // ── Draw ────────────────────────────────────────────────────────────────────

  const draw = React.useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w: W, h: H, dpr } = sizeRef.current;
      const palette = paletteRef.current;
      if (!palette || W <= 0 || H <= 0) return;

      const mouse = mouseRef.current;
      const ripples = ripplesRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const pattern = getDotPattern(ctx, palette.dotColor);
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, W, H);
      }

      // Update ripples.
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        const age = (now - ripple.born) / 1000;
        ripple.radius = Math.max(0, age * 400);
        ripple.opacity = Math.max(0, 1 - age * 1.2);
        if (ripple.opacity <= 0) ripples.splice(i, 1);
      }

      // ── Build warped grid ─────────────────────────────────────────────────
      const cellSize = cellSizeFor(W);
      const cols = Math.max(2, Math.ceil(W / cellSize)) + 1;
      const rows = Math.max(2, Math.ceil(H / cellSize)) + 1;
      const cellW = W / (cols - 1);
      const cellH = H / (rows - 1);

      const pts: Point[][] = [];
      const prox: number[][] = [];

      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        prox[row] = [];
        for (let col = 0; col < cols; col++) {
          const { pt, proximity } = getWarpedPoint(
            col * cellW,
            row * cellH,
            col,
            row,
            mouse,
            ripples,
            cols,
            rows,
          );
          pts[row][col] = pt;
          prox[row][col] = proximity;
        }
      }

      // ── Grid lines ────────────────────────────────────────────────────────
      const drawSegment = (p1: Point, p2: Point, pr1: number, pr2: number) => {
        const t = smoothstep((pr1 + pr2) / 2);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = lerpColor(palette.lineBase, palette.lineActive, t);
        ctx.lineWidth = lerpN(0.8, 1.5, t);
        ctx.stroke();
      };

      ctx.lineCap = "butt";

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          drawSegment(
            pts[row][col],
            pts[row][col + 1],
            prox[row][col],
            prox[row][col + 1],
          );
        }
      }

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 1; row++) {
          drawSegment(
            pts[row][col],
            pts[row + 1][col],
            prox[row][col],
            prox[row + 1][col],
          );
        }
      }

      // ── Intersection nodes ────────────────────────────────────────────────
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const point = pts[row][col];
          const proximity = prox[row][col];
          const t = smoothstep(proximity);
          const radius = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

          // Outer glow ring for nodes near the pointer.
          if (t > 0.3) {
            const glowRadius = radius + lerpN(0, 6, (t - 0.3) / 0.7);
            const gradient = ctx.createRadialGradient(
              point.x,
              point.y,
              radius * 0.5,
              point.x,
              point.y,
              glowRadius,
            );
            gradient.addColorStop(
              0,
              `rgba(${palette.accentRgb},${(t * 0.28).toFixed(3)})`,
            );
            gradient.addColorStop(1, `rgba(${palette.accentRgb},0)`);
            ctx.beginPath();
            ctx.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = lerpColor(palette.nodeBase, palette.nodeActive, t);
          ctx.fill();
        }
      }

      // ── Ripple rings ──────────────────────────────────────────────────────
      for (const ripple of ripples) {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, Math.max(0, ripple.radius), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${palette.accentRgb},${(ripple.opacity * 0.22).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    },
    [getDotPattern, getWarpedPoint],
  );

  // ── Animation loop ──────────────────────────────────────────────────────────

  const animate = React.useCallback(
    (now: number) => {
      const mouse = mouseRef.current;
      const target = targetMouseRef.current;
      const previousX = mouse.x;
      const previousY = mouse.y;

      // Snap back when the pointer leaves instead of dragging a warp trail.
      if (target.x <= OFF_SCREEN.x + 1) {
        mouse.x = target.x;
        mouse.y = target.y;
      } else {
        mouse.x = lerpN(mouse.x, target.x, LERP_SPEED);
        mouse.y = lerpN(mouse.y, target.y, LERP_SPEED);
      }

      // Only repaint when the scene actually changes (idle frames are skipped).
      const moved =
        Math.abs(mouse.x - previousX) > 0.05 ||
        Math.abs(mouse.y - previousY) > 0.05;
      if (moved || ripplesRef.current.length > 0) {
        draw(now);
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [draw],
  );

  // ── Setup ───────────────────────────────────────────────────────────────────

  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let visible = true;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      sizeRef.current = { w, h, dpr };
      dotPatternRef.current = null;

      // Repaint immediately when no animation loop is running.
      if (reducedMotion) draw(performance.now());
    };

    const refreshPalette = () => {
      paletteRef.current = readPalette(canvas, globalColor === "monochrome");
    };

    resize();
    refreshPalette();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Follow theme switches (next-themes writes `data-theme` on <html>).
    const themeObserver = new MutationObserver(() => {
      refreshPalette();
      draw(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    const canRun = () => visible && !document.hidden && !reducedMotion;

    const start = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (!rafRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };

    const sync = () => {
      if (canRun()) {
        start();
      } else {
        stop();
      }
    };

    // Paint the static frame for reduced motion.
    draw(performance.now());
    sync();

    // Pause off-screen to keep the main thread free.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => sync();
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onPointerLeave = () => {
      targetMouseRef.current = { ...OFF_SCREEN };
    };

    const onPointerDown = (event: PointerEvent) => {
      if (reducedMotion) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      const rect = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        radius: 0,
        opacity: 1,
        born: performance.now(),
      });
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, {
      passive: true,
    });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });

    const onMotionPreferenceChange = () => {
      reducedMotion = motionQuery.matches;
      if (reducedMotion) {
        ripplesRef.current = [];
        targetMouseRef.current = { ...OFF_SCREEN };
        mouseRef.current = { ...OFF_SCREEN };
      }
      sync();
      draw(performance.now());
    };

    motionQuery.addEventListener("change", onMotionPreferenceChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointerdown", onPointerDown);
    };
  }, [animate, draw, globalColor]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className={cn("relative isolate w-full", className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        role="presentation"
        className="kinetic-grid-canvas pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
