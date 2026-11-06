"use client";

import * as React from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  ArrowUpRight,
  BookOpen,
  CalendarBlank,
  Clock,
} from "@phosphor-icons/react";

interface TalkResourcesSectionProps {
  posts: BlogPostMeta[];
}

export function TalkResourcesSection({ posts }: TalkResourcesSectionProps) {
  if (posts.length === 0) return null;

  const [featured, ...rest] = posts.slice(0, 4);
  const total = String(posts.length).padStart(2, "0");

  return (
    <section
      id="resources"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-border-surface"
    >
      <div className="max-w-[1360px] mx-auto space-y-16">
        {/* Section Header */}
        <ScrollReveal yOffset={16}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                06 — TALK/RESOURCES
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold">
                Ideas worth keeping.
              </h2>
              <p className="font-inter text-sm sm:text-base text-muted leading-relaxed">
                Talks, notes, and reference material on frontend architecture,
                design systems, and the craft of building for the web.
              </p>
            </div>

            <Link
              href="/blog"
              className="btn-secondary self-start md:self-auto text-[11px]"
            >
              <span>BROWSE ALL {total} RESOURCES</span>
              <ArrowUpRight size={13} weight="bold" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured resource + index list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured resource */}
          <ScrollReveal
            className="lg:col-span-7"
            delay={0.1}
            yOffset={24}
            duration={0.7}
          >
            <article className="group relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[3px] border border-border-surface bg-surface p-8 sm:p-10 hover:border-accent transition-colors">
              {/* Architectural ordinal watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-10 select-none font-fraunces text-[170px] leading-none text-accent/[0.06]"
              >
                01
              </span>

              <div className="relative space-y-6">
                <div className="flex items-center justify-between border-b border-border-surface pb-4">
                  <span className="flex items-center gap-2 font-inter text-[10px] font-bold uppercase tracking-eyebrow text-accent">
                    <BookOpen size={14} weight="fill" />
                    <span>Featured · {featured.category}</span>
                  </span>
                  <span className="font-mono text-[10px] text-muted">01 / {total}</span>
                </div>

                <div className="space-y-4">
                  <h3 className="font-fraunces text-3xl sm:text-4xl md:text-[44px] text-ink font-semibold leading-[1.1]">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {featured.title}
                    </Link>
                  </h3>
                  <p className="font-inter text-sm sm:text-base text-muted leading-relaxed max-w-[52ch]">
                    {featured.subtitle}
                  </p>
                  <p className="font-inter text-xs sm:text-sm text-ink/80 leading-relaxed line-clamp-3 max-w-[58ch]">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {featured.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-[2px] text-[11px] font-mono bg-bg text-muted border border-border-surface"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border-surface pt-5">
                <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-muted">
                  <span className="flex items-center gap-1.5">
                    <CalendarBlank size={12} aria-hidden="true" />
                    {featured.displayDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} aria-hidden="true" />
                    {featured.readTime}
                  </span>
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 font-inter text-[11px] font-bold uppercase tracking-button text-accent hover:underline"
                >
                  <span>Read resource</span>
                  <ArrowUpRight size={13} weight="bold" />
                </Link>
              </div>
            </article>
          </ScrollReveal>

          {/* Compact index of the remaining resources */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {rest.map((post, idx) => (
              <ScrollReveal
                key={post.slug}
                className="flex-1"
                delay={0.16 + idx * 0.07}
                yOffset={18}
              >
                <article className="group flex h-full items-start gap-5 rounded-[3px] border border-border-surface bg-surface p-6 hover:border-accent hover:bg-bg/40 transition-colors">
                  <span className="font-fraunces text-2xl font-medium text-accent/60 tabular-nums">
                    {String(idx + 2).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-3 font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
                      <span className="truncate text-accent">{post.category}</span>
                      <span className="shrink-0 font-mono font-normal tracking-wider">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-fraunces text-xl text-ink font-semibold leading-snug">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group-hover:text-accent transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="font-inter text-xs text-muted leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
