"use client";

import * as React from "react";
import Link from "next/link";
import { ALL_PROJECTS } from "@/data/projects";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ArrowUpRight, GithubLogo, ArrowLeft, MagnifyingGlass, Sparkle } from "@phosphor-icons/react";

const CATEGORIES = [
  "ALL",
  "AI & SYSTEMS",
  "SECURITY & WEB3",
  "DATA & ARCHIVES",
  "UI ARCHITECTURE",
] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === "ALL" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 editorial-grid-lines opacity-30 pointer-events-none" />

      <div className="relative max-w-[1360px] mx-auto space-y-16">
        {/* Back Link */}
        <ScrollReveal yOffset={10}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-inter text-xs font-semibold tracking-wider text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>RETURN TO OVERVIEW</span>
          </Link>
        </ScrollReveal>

        {/* Page Hero Header */}
        <ScrollReveal yOffset={16}>
          <div className="space-y-4 max-w-4xl">
            <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              PORTFOLIO ARCHIVE · {ALL_PROJECTS.length} SELECTED COMMISSIONS
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl text-ink font-semibold leading-[1.08]">
              Comprehensive works & <br />
              <span className="italic text-accent">architectural systems.</span>
            </h1>
            <p className="font-inter text-base sm:text-lg text-muted max-w-[58ch] leading-relaxed">
              An index of software engineering projects, high-assurance security tools,
              and design token systems developed between 2023 and 2026.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter & Search Bar */}
        <ScrollReveal delay={0.1} yOffset={16}>
          <div className="p-4 rounded-[3px] border border-border-surface bg-surface flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-[2px] font-inter text-[11px] font-bold tracking-eyebrow uppercase transition-all ${
                      isSelected
                        ? "bg-accent text-bg"
                        : "bg-bg text-muted hover:text-ink border border-border-surface"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <MagnifyingGlass
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech..."
                className="w-full pl-9 pr-4 py-2 rounded-[2px] border border-border-surface bg-bg text-ink placeholder:text-muted/60 font-inter text-xs transition-colors focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.slug} delay={0.06 * idx} yOffset={20}>
              <div className="group h-full rounded-[3px] border border-border-surface bg-surface hover:border-accent transition-all duration-300 flex flex-col justify-between p-7 sm:p-8 space-y-6">
                <div className="space-y-4">
                  {/* Top Meta */}
                  <div className="flex items-center justify-between border-b border-border-surface pb-3">
                    <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-accent">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-fraunces text-2xl text-ink font-semibold group-hover:text-accent transition-colors block"
                    >
                      {project.title}
                    </Link>
                    <p className="font-inter text-xs text-muted font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="font-inter text-sm text-muted leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-5 pt-4 border-t border-border-surface">
                  {/* Metric Tag */}
                  <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent flex items-center gap-1.5">
                    <Sparkle size={13} weight="fill" />
                    <span>{project.metrics}</span>
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-[2px] text-[11px] font-mono bg-bg text-muted border border-border-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center justify-between pt-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-inter text-xs text-muted hover:text-ink transition-colors"
                    >
                      <GithubLogo size={14} />
                      <span>Source</span>
                    </a>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-inter text-[11px] font-bold uppercase tracking-button text-muted hover:text-ink transition-colors"
                      >
                        Case Study
                      </Link>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-[10px] min-h-[36px] px-3.5"
                      >
                        <span>Demo</span>
                        <ArrowUpRight size={12} weight="bold" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-[3px] border border-border-surface bg-surface space-y-3">
            <h3 className="font-fraunces text-2xl text-ink font-semibold">
              No matching projects found
            </h3>
            <p className="font-inter text-sm text-muted">
              Try adjusting your category filter or search keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
