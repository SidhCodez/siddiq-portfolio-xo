import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has moved.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100dvh-8rem)] flex items-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="absolute inset-0 editorial-grid-lines opacity-30 pointer-events-none" />

      <div className="relative max-w-[860px] mx-auto w-full">
        <div className="rounded-[3px] border border-border-surface bg-surface p-8 sm:p-12 md:p-16 space-y-10">
          <div className="flex items-center justify-between border-b border-border-surface pb-5">
            <span className="inline-flex items-center gap-2 font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              <Compass size={15} />
              <span>Error 404</span>
            </span>
            <span className="font-mono text-xs text-muted">ROUTE NOT FOUND</span>
          </div>

          <div className="space-y-5">
            <p className="font-fraunces text-6xl sm:text-7xl text-accent font-medium leading-none">
              404
            </p>
            <h1 className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold leading-tight">
              This page left the archive.
            </h1>
            <p className="font-inter text-sm sm:text-base text-muted leading-relaxed max-w-[48ch]">
              The URL may be mistyped, or the page may have been moved. The work,
              talks, resources, and contact channels are still exactly where you left them.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/" className="btn-primary">
              <ArrowLeft size={14} weight="bold" />
              <span>RETURN HOME</span>
            </Link>
            <Link href="/projects" className="btn-secondary">
              <span>VIEW PROJECTS</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
            <Link
              href="/blog"
              className="font-inter text-[11px] font-bold uppercase tracking-button text-muted hover:text-ink transition-colors px-2 py-2"
            >
              READ ESSAYS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
