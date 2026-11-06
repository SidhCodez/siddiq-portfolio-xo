"use client";

import * as React from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { ScrollReveal } from "@/components/scroll-reveal";
import KineticGrid from "@/components/ui/kinetic-grid";
import { ArrowUpRight, BookOpen, Clock } from "@phosphor-icons/react";

interface TalkResourcesSectionProps {
  posts: BlogPostMeta[];
}

export function TalkResourcesSection({ posts }: TalkResourcesSectionProps) {
  if (posts.length === 0) return null;

  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const latest = posts[0];
  const total = String(posts.length).padStart(2, "0");
  const topics = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).slice(0, 18);

  return (
    <section
      id="resources"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-border-surface"
    >
      <div className="max-w-[1360px] mx-auto">
        <ScrollReveal yOffset={20} duration={0.7}>
          <div className="relative overflow-hidden rounded-[3px] border border-border-surface bg-surface">
            <KineticGrid globalColor="default">
              <div className="relative">
                {/* Architectural watermark */}
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
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                      </span>
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
                        architecture, design systems, and the craft of building
                        for the web. Written down so the reasoning outlives the
                        project.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                      <span className="flex items-center gap-2">
                        <BookOpen
                          size={14}
                          className="text-accent"
                          aria-hidden="true"
                        />
                        {total} resources
                      </span>
                      <span>{categories.length} categories</span>
                      <span className="flex items-center gap-2">
                        <Clock
                          size={14}
                          className="text-accent"
                          aria-hidden="true"
                        />
                        Latest · {latest.readTime}
                      </span>
                    </div>

                    <div className="pt-2">
                      <Link href="/blog" className="btn-primary group">
                        <span>EXPLORE TALK/RESOURCES</span>
                        <ArrowUpRight
                          size={14}
                          weight="bold"
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Archive index — decorative, not a set of links */}
                  <div className="lg:col-span-5">
                    <div className="rounded-[2px] border border-border-surface bg-bg/60 p-6 sm:p-7 space-y-5 backdrop-blur-[2px]">
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
                              className="group flex items-center justify-between gap-4"
                            >
                              <span className="flex items-center gap-4">
                                <span className="font-mono text-[10px] text-accent">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span className="font-inter text-sm text-ink transition-colors group-hover:text-accent">
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

                {/* Animated topic rail */}
                <div
                  className="marquee-viewport relative overflow-hidden border-t border-border-surface"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                  }}
                >
                  <div className="marquee-track flex w-max">
                    {[0, 1].map((group) => (
                      <div
                        key={group}
                        className="flex shrink-0 items-center gap-8 py-4 pr-8"
                        aria-hidden={group === 1}
                      >
                        {topics.map((topic) => (
                          <span
                            key={topic}
                            className="flex items-center gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-muted"
                          >
                            <span className="h-1 w-1 rounded-full bg-accent/70" />
                            {topic}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </KineticGrid>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
