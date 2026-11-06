"use client";

import * as React from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowUpRight, BookOpen, Clock } from "@phosphor-icons/react";

interface TalkResourcesSectionProps {
  posts: BlogPostMeta[];
}

export function TalkResourcesSection({ posts }: TalkResourcesSectionProps) {
  if (posts.length === 0) return null;

  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const latest = posts[0];
  const total = String(posts.length).padStart(2, "0");

  return (
    <section
      id="resources"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-border-surface"
    >
      <div className="max-w-[1360px] mx-auto">
        <ScrollReveal yOffset={20} duration={0.7}>
          <div className="relative overflow-hidden rounded-[3px] border border-border-surface bg-surface">
            {/* Architectural background */}
            <div className="absolute inset-0 editorial-grid-lines opacity-20 pointer-events-none" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-fraunces text-[260px] leading-none text-accent/[0.05] lg:block"
            >
              /
            </span>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center p-8 sm:p-12 lg:p-16">
              {/* CTA copy */}
              <div className="lg:col-span-7 space-y-7">
                <div className="flex items-center gap-3">
                  <span className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                    06 — TALK/RESOURCES
                  </span>
                  <span className="h-px flex-1 bg-border-surface" />
                </div>

                <div className="space-y-4">
                  <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-ink font-semibold leading-[1.08]">
                    The thinking behind <br />
                    <span className="italic text-accent">the work.</span>
                  </h2>
                  <p className="font-inter text-sm sm:text-base text-muted leading-relaxed max-w-[52ch]">
                    Talks, working notes, and reference material on frontend
                    architecture, design systems, and the craft of building for
                    the web. Written down so the reasoning outlives the project.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                  <span className="flex items-center gap-2">
                    <BookOpen size={14} className="text-accent" aria-hidden="true" />
                    {total} resources
                  </span>
                  <span>{categories.length} categories</span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-accent" aria-hidden="true" />
                    Latest · {latest.readTime}
                  </span>
                </div>

                <div className="pt-2">
                  <Link href="/blog" className="btn-primary">
                    <span>EXPLORE TALK/RESOURCES</span>
                    <ArrowUpRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>

              {/* Archive index — decorative, not a set of links */}
              <div className="lg:col-span-5">
                <div className="rounded-[2px] border border-border-surface bg-bg/50 p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between border-b border-border-surface pb-4">
                    <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
                      In the archive
                    </span>
                    <span className="font-mono text-[10px] text-muted">
                      {total} entries
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {categories.map((category, idx) => {
                      const count = posts.filter(
                        (post) => post.category === category
                      ).length;

                      return (
                        <li
                          key={category}
                          className="flex items-center justify-between gap-4"
                        >
                          <span className="flex items-center gap-4">
                            <span className="font-mono text-[10px] text-accent">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="font-inter text-sm text-ink">
                              {category}
                            </span>
                          </span>
                          <span className="font-mono text-[10px] text-muted">
                            {String(count).padStart(2, "0")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="border-t border-border-surface pt-4 font-inter text-xs italic text-muted">
                    Latest: {latest.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
