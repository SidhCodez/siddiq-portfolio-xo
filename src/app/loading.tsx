export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="relative min-h-[calc(100dvh-8rem)] px-4 sm:px-6 lg:px-8 py-12 md:py-20"
    >
      <div className="absolute inset-0 editorial-grid-lines opacity-20 pointer-events-none" />

      <div className="relative max-w-[1120px] mx-auto space-y-12">
        {/* Breadcrumb placeholder */}
        <div className="h-3 w-40 rounded-[1px] bg-surface animate-pulse" />

        {/* Header block */}
        <div className="space-y-5 max-w-3xl">
          <div className="h-3 w-52 rounded-[1px] bg-accent/25 animate-pulse" />
          <div className="h-12 sm:h-14 w-full rounded-[1px] bg-surface animate-pulse" />
          <div className="h-12 sm:h-14 w-4/5 rounded-[1px] bg-surface animate-pulse" />
          <div className="h-4 w-full rounded-[1px] bg-surface/70 animate-pulse" />
          <div className="h-4 w-3/4 rounded-[1px] bg-surface/70 animate-pulse" />
        </div>

        {/* Card placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-[3px] border border-border-surface bg-surface p-7 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 rounded-[1px] bg-bg animate-pulse" />
                <div className="h-3 w-10 rounded-[1px] bg-bg animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="h-6 w-3/4 rounded-[1px] bg-bg animate-pulse" />
                <div className="h-3 w-full rounded-[1px] bg-bg/70 animate-pulse" />
                <div className="h-3 w-5/6 rounded-[1px] bg-bg/70 animate-pulse" />
              </div>
              <div className="flex gap-2 pt-3 border-t border-border-surface">
                <div className="h-5 w-16 rounded-[1px] bg-bg animate-pulse" />
                <div className="h-5 w-20 rounded-[1px] bg-bg animate-pulse" />
                <div className="h-5 w-14 rounded-[1px] bg-bg animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
