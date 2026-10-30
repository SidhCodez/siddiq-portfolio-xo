"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowClockwise,
  House,
  WarningOctagon,
} from "@phosphor-icons/react";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  React.useEffect(() => {
    console.error("[app] Unhandled error:", error);
  }, [error]);

  return (
    <div className="relative min-h-[calc(100dvh-8rem)] flex items-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="absolute inset-0 editorial-grid-lines opacity-30 pointer-events-none" />

      <div className="relative max-w-[860px] mx-auto w-full">
        <div
          role="alert"
          className="rounded-[3px] border border-red-500/40 bg-surface p-8 sm:p-12 md:p-16 space-y-10"
        >
          <div className="flex items-center justify-between border-b border-border-surface pb-5">
            <span className="inline-flex items-center gap-2 font-inter text-[11px] font-bold uppercase tracking-eyebrow text-red-400">
              <WarningOctagon size={15} weight="fill" />
              <span>System Fault</span>
            </span>
            <span className="font-mono text-xs text-muted">
              {error.digest ? `REF ${error.digest}` : "UNEXPECTED ERROR"}
            </span>
          </div>

          <div className="space-y-5">
            <h1 className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold leading-tight">
              Something broke mid-render.
            </h1>
            <p className="font-inter text-sm sm:text-base text-muted leading-relaxed max-w-[50ch]">
              An unexpected error interrupted this page. Your data is untouched.
              Try the action again, or return to the overview.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button type="button" onClick={reset} className="btn-primary">
              <ArrowClockwise size={14} weight="bold" />
              <span>TRY AGAIN</span>
            </button>
            <Link href="/" className="btn-secondary">
              <House size={14} weight="bold" />
              <span>RETURN HOME</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
