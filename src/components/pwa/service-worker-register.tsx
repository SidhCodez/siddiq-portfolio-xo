"use client";

import * as React from "react";

const UPDATE_EVENT = "pwa:update-available";

/**
 * Registers the service worker in production only. In development the
 * registration is skipped so hot reloading never serves stale bundles.
 *
 * When a new worker takes control of a page that was already open, we surface
 * a small, dismissible refresh prompt instead of reloading underneath the
 * reader.
 */
export function ServiceWorkerRegister() {
  const [updateReady, setUpdateReady] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    let registration: ServiceWorkerRegistration | undefined;
    let hadController = Boolean(navigator.serviceWorker.controller);

    const handleControllerChange = () => {
      if (!hadController) {
        hadController = true;
        return;
      }
      setUpdateReady(true);
      window.dispatchEvent(new Event(UPDATE_EVENT));
    };

    const register = async () => {
      try {
        registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        // Check for a new deployment at most once an hour while the tab is open.
        const interval = window.setInterval(() => {
          registration?.update().catch(() => undefined);
        }, 60 * 60 * 1000);

        window.addEventListener("online", () => {
          registration?.update().catch(() => undefined);
        });

        return () => window.clearInterval(interval);
      } catch (error) {
        // Registration failures are non-fatal: the site works as a normal web app.
        if (process.env.NODE_ENV !== "production") {
          console.warn("Service worker registration failed", error);
        }
      }
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange
    );

    const cleanup = register();

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange
      );
      void cleanup.then((stop) => stop?.());
    };
  }, []);

  if (!updateReady) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-[70] mx-auto flex max-w-md items-center justify-between gap-4 rounded-[2px] border border-border-surface bg-surface px-4 py-3 shadow-2xl sm:left-auto sm:right-6"
    >
      <p className="font-inter text-xs font-medium text-ink">
        A new version is available.
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setUpdateReady(false);
            window.location.reload();
          }}
          className="rounded-[2px] border border-border-strong bg-accent px-3 py-1.5 font-inter text-[10px] font-bold uppercase tracking-eyebrow text-bg transition-opacity hover:opacity-90"
        >
          Refresh
        </button>
        <button
          type="button"
          onClick={() => setUpdateReady(false)}
          aria-label="Dismiss update notice"
          className="rounded-[2px] border border-border-surface bg-bg px-2.5 py-1.5 font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted transition-colors hover:text-ink"
        >
          Later
        </button>
      </div>
    </div>
  );
}
