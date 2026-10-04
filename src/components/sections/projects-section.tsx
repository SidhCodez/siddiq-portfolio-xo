"use client";

import * as React from "react";
import Link from "next/link";
import { ALL_PROJECTS } from "@/data/projects";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  ArrowUpRight,
  GithubLogo,
  Sparkle,
  ShieldCheck,
  MagnifyingGlass,
  BookBookmark,
} from "@phosphor-icons/react";

const PROJECT_ICONS: Record<string, React.ElementType> = {
  "skill-bridge": Sparkle,
  walletguard: ShieldCheck,
  coldcase: MagnifyingGlass,
  virasethu: BookBookmark,
};

export function ProjectsSection() {
  const featuredProject = ALL_PROJECTS[0];
  const gridProjects = ALL_PROJECTS.slice(1, 4);
  const FeaturedIcon = PROJECT_ICONS[featuredProject.slug] || Sparkle;

  return (
    <section id="projects" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-border-surface">
      <div className="max-w-[1360px] mx-auto space-y-16">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={16}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                02 — SELECTED WORKS
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold">
                Proven engineering.
              </h2>
              <p className="font-inter text-sm sm:text-base text-muted leading-relaxed">
                A curated selection of software engineering projects, high-assurance security
                interfaces, and disciplined design systems built for scale.
              </p>
            </div>

            <Link href="/projects" className="btn-secondary self-start md:self-auto text-[11px]">
              <span>VIEW ALL {ALL_PROJECTS.length} PROJECTS</span>
              <ArrowUpRight size={13} weight="bold" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured Project: Wide Spotlight Bento with Scroll Reveal */}
        <ScrollReveal delay={0.1} yOffset={24} duration={0.7}>
          <div className="rounded-[3px] border border-border-surface bg-surface overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Content Column */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-[2px] bg-bg text-accent border border-border-surface">
                      <FeaturedIcon size={18} />
                    </span>
                    <span className="font-inter text-[11px] font-bold tracking-eyebrow uppercase text-accent">
                      FEATURED ARCHITECTURE · {featuredProject.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <Link
                      href={`/projects/${featuredProject.slug}`}
                      className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold hover:text-accent transition-colors block"
                    >
                      {featuredProject.title}
                    </Link>
                    <div className="font-inter text-sm font-medium text-muted">
                      {featuredProject.subtitle}
                    </div>
                  </div>

                  <p className="font-inter text-sm text-muted leading-relaxed max-w-[54ch]">
                    {featuredProject.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-[2px] text-xs font-mono bg-bg text-ink border border-border-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions and Metrics */}
                <div className="pt-6 border-t border-border-surface flex flex-wrap items-center justify-between gap-4">
                  <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                    {featuredProject.metrics}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${featuredProject.title} source code on GitHub`}
                      className="p-2.5 rounded-[2px] border border-border-surface bg-bg text-ink hover:text-accent transition-colors"
                    >
                      <GithubLogo size={18} />
                    </a>

                    <Link
                      href={`/projects/${featuredProject.slug}`}
                      className="font-inter text-[11px] font-bold uppercase tracking-button text-muted hover:text-ink transition-colors"
                    >
                      Case Study
                    </Link>

                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-[11px]"
                    >
                      <span>LIVE DEMO</span>
                      <ArrowUpRight size={13} weight="bold" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Architectural Visual Preview */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-bg border-t lg:border-t-0 lg:border-l border-border-surface flex items-center justify-center p-8">
                <div className="w-full h-full min-h-[220px] rounded-[2px] border border-border-surface bg-surface/50 p-6 flex flex-col justify-between space-y-6">
                  <div className="flex items-center justify-between text-muted font-mono text-xs">
                    <span>SKILL_GRAPH_ENGINE v2.4</span>
                    <span className="text-accent font-bold">ONLINE</span>
                  </div>

                  <div className="space-y-3">
                    <div className="h-1.5 w-3/4 rounded-[1px] bg-accent/20 overflow-hidden">
                      <div className="h-full w-2/3 bg-accent" />
                    </div>
                    <div className="h-1.5 w-1/2 rounded-[1px] bg-accent/20 overflow-hidden">
                      <div className="h-full w-4/5 bg-accent" />
                    </div>
                    <div className="h-1.5 w-5/6 rounded-[1px] bg-accent/20 overflow-hidden">
                      <div className="h-full w-1/2 bg-accent" />
                    </div>
                  </div>

                  <div className="font-inter text-[10px] font-bold tracking-eyebrow uppercase text-muted flex justify-between">
                    <span>LATENCY: 18MS</span>
                    <span>GRAPH NODES: 1,420</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Remaining Projects: Asymmetric Bento Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridProjects.map((project, idx) => {
            const Icon = PROJECT_ICONS[project.slug] || Sparkle;
            return (
              <ScrollReveal key={project.slug} delay={0.15 + idx * 0.08} yOffset={20}>
                <div className="group h-full rounded-[3px] border border-border-surface bg-surface hover:border-accent transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-[2px] bg-bg text-accent border border-border-surface">
                        <Icon size={18} />
                      </span>
                      <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
                        {project.category}
                      </span>
                    </div>

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
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-[2px] text-[11px] font-mono bg-bg text-muted border border-border-surface"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-inter text-xs text-muted hover:text-ink transition-colors"
                      >
                        <GithubLogo size={14} />
                        <span>Source</span>
                      </a>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 font-inter text-[11px] font-bold uppercase tracking-button text-accent hover:underline"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight size={12} weight="bold" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
