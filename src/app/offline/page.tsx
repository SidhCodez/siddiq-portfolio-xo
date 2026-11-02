import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, WifiSlash } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Offline",
  description: "You are offline. Cached pages are still available.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <section className="relative flex min-h-[70dvh] items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 editorial-grid-lines opacity-40" />

      <div className="relative w-full max-w-xl rounded-[2px] border border-border-surface bg-surface/60 p-8 backdrop-blur-sm sm:p-12">
        <div className="mb-8 flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-[2px] border border-border-strong bg-bg text-accent">
            <WifiSlash size={22} weight="regular" aria-hidden="true" />
          </span>
          <div className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
            Connection lost
          </div>
        </div>

        <h1 className="font-fraunces text-4xl leading-[1.08] text-ink sm:text-5xl">
          You&apos;re offline,
          <br />
          <span className="italic text-accent">but not stranded.</span>
        </h1>

        <p className="mt-5 max-w-[46ch] font-inter text-sm leading-relaxed text-muted">
          This page is served from the local cache. Pages you have already
          visited remain available — reconnect to load anything else.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/" className="btn-primary">
            <span>TRY AGAIN</span>
            <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </Link>
          <Link href="/projects" className="btn-secondary">
            <ArrowLeft size={14} weight="regular" aria-hidden="true" />
            <span>BROWSE CACHED PROJECTS</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
