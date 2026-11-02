"use client";

import * as React from "react";
import { DownloadSimple, ShareNetwork, X } from "@phosphor-icons/react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const COMPACT_BUTTON =
  "flex items-center gap-2 px-3.5 py-2 rounded-[2px] border border-border-surface bg-surface hover:border-muted text-ink text-xs transition-all active:scale-95";

/**
 * Shows an "Install app" action once the browser confirms the PWA is
 * installable. iOS Safari does not fire `beforeinstallprompt`, so it gets a
 * short illustrated instruction sheet instead.
 */
export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [available, setAvailable] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  const [showIOSHelp, setShowIOSHelp] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = window.navigator as Navigator & { standalone?: boolean };
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone === true;
    if (standalone) return;

    const ua = nav.userAgent;
    const ios =
      /iphone|ipad|ipod/i.test(ua) ||
      (nav.maxTouchPoints > 1 && /macintosh/i.test(ua));
    const safari =
      /safari/i.test(ua) &&
      !/chrome|crios|fxios|edgios|android/i.test(ua);

    setIsIOS(ios);
    if (ios && safari) setAvailable(true);

    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setAvailable(true);
    };

    const handleInstalled = () => {
      setDeferredPrompt(null);
      setAvailable(false);
      setShowIOSHelp(false);
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  React.useEffect(() => {
    if (!showIOSHelp) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowIOSHelp(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [showIOSHelp]);

  if (!available) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) {
      if (isIOS) setShowIOSHelp(true);
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") setAvailable(false);
    setDeferredPrompt(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstall}
        className={COMPACT_BUTTON}
        aria-label="Install this site as an app"
      >
        <span className="font-inter text-[10px] font-bold tracking-eyebrow uppercase">
          Install app
        </span>
        <DownloadSimple size={12} weight="bold" aria-hidden="true" />
      </button>

      {showIOSHelp && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setShowIOSHelp(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-sm rounded-[2px] border border-border-surface bg-surface p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setShowIOSHelp(false)}
              aria-label="Close install instructions"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-[2px] border border-border-surface text-muted transition-colors hover:text-ink"
            >
              <X size={14} />
            </button>

            <div className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-accent">
              Install on iOS
            </div>
            <h2
              id="ios-install-title"
              className="mt-2 font-fraunces text-2xl text-ink"
            >
              Add Siddiq to your home screen
            </h2>

            <ol className="mt-5 space-y-4 font-inter text-xs leading-relaxed text-muted">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] border border-border-surface bg-bg font-mono text-[10px] text-accent">
                  1
                </span>
                <span className="flex items-center gap-1.5">
                  Tap the Share button
                  <ShareNetwork
                    size={14}
                    className="text-ink"
                    aria-hidden="true"
                  />
                  in Safari&apos;s toolbar.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] border border-border-surface bg-bg font-mono text-[10px] text-accent">
                  2
                </span>
                <span>
                  Scroll down and choose{" "}
                  <span className="font-semibold text-ink">
                    Add to Home Screen
                  </span>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[2px] border border-border-surface bg-bg font-mono text-[10px] text-accent">
                  3
                </span>
                <span>
                  Tap{" "}
                  <span className="font-semibold text-ink">Add</span> to finish.
                </span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
