"use client";

import * as React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  LINK_CATEGORIES,
  LINK_COLLECTIONS,
  getLinkCount,
} from "@/data/links";
import {
  ArrowLeft,
  ArrowUpRight,
  MagnifyingGlass,
  LinkSimple,
} from "@phosphor-icons/react";

type Filter = "ALL" | (typeof LINK_CATEGORIES)[number];

export function LinksCatalogue() {
  const [filter, setFilter] = React.useState<Filter>("ALL");
  const [query, setQuery] = React.useState("");

  const totalLinks = getLinkCount();
  const totalCollections = LINK_COLLECTIONS.length;

  const filters: Filter[] = ["ALL", ...LINK_CATEGORIES];

  const visibleCollections = React.useMemo(() => {
    const search = query.trim().toLowerCase();

    return LINK_COLLECTIONS.filter((collection) => {
      const matchesFilter =
        filter === "ALL" || collection.category === filter;
      const matchesQuery =
        !search ||
        collection.title.toLowerCase().includes(search) ||
        collection.blurb.toLowerCase().includes(search) ||
        collection.links.some(
          (link) =>
            link.title.toLowerCase().includes(search) ||
            link.note.toLowerCase().includes(search) ||
            link.source.toLowerCase().includes(search)
        );

      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const resultLinks = getLinkCount(visibleCollections);
  const filterCount = (value: Filter) =>
    value === "ALL"
      ? totalLinks
      : getLinkCount(
          LINK_COLLECTIONS.filter((collection) => collection.category === value)
        );

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="absolute inset-0 editorial-grid-lines opacity-30 pointer-events-none" />

      <div className="relative max-w-[1120px] mx-auto space-y-14">
        {/* Back Navigation */}
        <ScrollReveal yOffset={10}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-inter text-xs font-semibold tracking-wider text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>RETURN TO OVERVIEW</span>
          </Link>
        </ScrollReveal>

        {/* Page Header */}
        <ScrollReveal yOffset={16}>
          <div className="space-y-5 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                THE LINK CATALOGUE · {String(totalLinks).padStart(2, "0")} LINKS
              </span>
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl text-ink font-semibold leading-[1.06]">
              Links worth <br />
              <span className="italic text-accent">passing on.</span>
            </h1>

            <p className="font-inter text-base sm:text-lg text-muted max-w-[54ch] leading-relaxed">
              Talks to watch and resources to keep — grouped into{" "}
              <span className="text-ink">{totalCollections} collections</span>.
              No affiliate noise, no SEO filler. Just the links that survive
              being bookmarked twice.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter & Search */}
        <ScrollReveal delay={0.1} yOffset={16}>
          <div className="rounded-[3px] border border-border-surface bg-surface p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((value) => {
                const isSelected = filter === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter(value)}
                    aria-pressed={isSelected}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] font-inter text-[11px] font-bold tracking-eyebrow uppercase transition-all ${
                      isSelected
                        ? "bg-accent text-bg"
                        : "bg-bg text-muted hover:text-ink border border-border-surface"
                    }`}
                  >
                    <span>{value}</span>
                    <span
                      className={`font-mono text-[10px] ${
                        isSelected ? "text-bg/70" : "text-muted/70"
                      }`}
                    >
                      {String(filterCount(value)).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64">
              <label htmlFor="links-search" className="sr-only">
                Search the link catalogue
              </label>
              <MagnifyingGlass
                size={16}
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="links-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search links..."
                className="w-full rounded-[2px] border border-border-surface bg-bg py-2 pl-10 pr-3 font-inter text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Collections */}
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-muted">
            <span>
              {String(visibleCollections.length).padStart(2, "0")} collections ·{" "}
              {String(resultLinks).padStart(2, "0")} links
            </span>
            <span className="hidden sm:block">Newest first</span>
          </div>

          {visibleCollections.map((collection, collectionIndex) => (
            <ScrollReveal
              key={collection.id}
              delay={0.05 + collectionIndex * 0.05}
              yOffset={18}
            >
              <article className="group/collection overflow-hidden rounded-[3px] border border-border-surface bg-surface transition-colors hover:border-accent/60">
                {/* Collection header */}
                <header className="grid grid-cols-1 gap-5 border-b border-border-surface p-6 sm:p-8 md:grid-cols-12 md:gap-6">
                  <div className="md:col-span-2 flex items-start">
                    <span className="font-fraunces text-4xl leading-none text-accent/45 tabular-nums">
                      {String(collectionIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="md:col-span-7 space-y-2">
                    <div className="flex flex-wrap items-center gap-3 font-inter text-[10px] font-bold uppercase tracking-eyebrow">
                      <span className="flex items-center gap-1.5 text-accent">
                        {collection.category === "TALKS" ? (
                          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                          </span>
                        ) : (
                          <LinkSimple size={12} weight="bold" aria-hidden="true" />
                        )}
                        {collection.category}
                      </span>
                      <span className="text-muted">
                        {String(collection.links.length).padStart(2, "0")} links
                      </span>
                    </div>

                    <h2 className="font-fraunces text-2xl sm:text-3xl text-ink font-semibold leading-tight">
                      {collection.title}
                    </h2>
                    <p className="font-inter text-sm text-muted leading-relaxed max-w-[58ch]">
                      {collection.blurb}
                    </p>
                  </div>

                  <div className="hidden md:col-span-3 md:flex md:justify-end">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
                      Collection {String(collectionIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                </header>

                {/* Links */}
                <ul className="divide-y divide-border-surface">
                  {collection.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid grid-cols-1 gap-3 px-6 py-5 transition-colors hover:bg-bg/50 sm:px-8 sm:grid-cols-12 sm:items-center sm:gap-6"
                      >
                        <div className="sm:col-span-7 space-y-1">
                          <h3 className="font-inter text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                            {link.title}
                          </h3>
                          <p className="font-inter text-xs text-muted leading-relaxed">
                            {link.note}
                          </p>
                        </div>

                        <div className="sm:col-span-3">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                            {link.source}
                          </span>
                        </div>

                        <div className="hidden sm:col-span-2 sm:flex sm:justify-end">
                          <ArrowUpRight
                            size={16}
                            weight="bold"
                            aria-hidden="true"
                            className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}

          {visibleCollections.length === 0 && (
            <div className="rounded-[3px] border border-dashed border-border-surface bg-surface p-12 text-center">
              <p className="font-fraunces text-2xl text-ink">Nothing matches yet.</p>
              <p className="mt-2 font-inter text-sm text-muted">
                Try a different filter or clear the search field.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("ALL");
                  setQuery("");
                }}
                className="btn-secondary mt-6 text-[11px]"
              >
                <span>RESET FILTERS</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <ScrollReveal yOffset={16}>
          <div className="flex flex-col gap-6 rounded-[3px] border border-border-surface bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="space-y-2">
              <div className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-accent">
                CONTINUE READING
              </div>
              <p className="font-fraunces text-2xl text-ink font-semibold">
                Prefer the long-form version?
              </p>
              <p className="font-inter text-sm text-muted">
                The reasoning behind these links lives in Talk/Resources.
              </p>
            </div>

            <Link href="/blog" className="btn-primary shrink-0">
              <span>READ TALK/RESOURCES</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
