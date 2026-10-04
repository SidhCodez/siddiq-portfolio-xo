"use client";

import * as React from "react";
import { Code, PaintBrush, Gauge, Cpu } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface SkillCluster {
  title: string;
  category: string;
  icon: React.ElementType;
  skills: { name: string; tag: string }[];
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    title: "Frontend Architecture",
    category: "ENGINEERING",
    icon: Code,
    skills: [
      { name: "Next.js (App Router / RSC)", tag: "Expert" },
      { name: "TypeScript / Strict Types", tag: "Expert" },
      { name: "React 19 / Modern Hooks", tag: "Advanced" },
      { name: "State Architecture (Zustand)", tag: "Advanced" },
      { name: "REST & GraphQL APIs", tag: "Proficient" },
    ],
  },
  {
    title: "UI Systems & Design",
    category: "CREATIVE DIRECTION",
    icon: PaintBrush,
    skills: [
      { name: "Design Tokens & Palettes", tag: "Expert" },
      { name: "Editorial Serif Typestacks", tag: "Specialist" },
      { name: "Micro-interactions (Motion)", tag: "Advanced" },
      { name: "WCAG 2.1 AA Accessibility", tag: "Strict" },
      { name: "Figma Component Systems", tag: "Advanced" },
    ],
  },
  {
    title: "Performance & Runtime",
    category: "OPTIMIZATION",
    icon: Gauge,
    skills: [
      { name: "Core Web Vitals (LCP < 2.5s)", tag: "Optimized" },
      { name: "Edge & Serverless Compute", tag: "Advanced" },
      { name: "Zero Cumulative Layout Shift", tag: "Strict" },
      { name: "Asset & Font Streamlining", tag: "Deep" },
      { name: "Bundle Optimization", tag: "Advanced" },
    ],
  },
  {
    title: "Tooling & Infrastructure",
    category: "DEPLOYMENT",
    icon: Cpu,
    skills: [
      { name: "Tailwind CSS v3 & v4", tag: "Expert" },
      { name: "Git Workflow & CI/CD", tag: "Advanced" },
      { name: "Vercel & Cloudflare Edge", tag: "Advanced" },
      { name: "Node.js / Edge APIs", tag: "Proficient" },
      { name: "PostgreSQL & Prisma", tag: "Intermediate" },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-border-surface">
      <div className="max-w-[1360px] mx-auto space-y-16">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={16}>
          <div className="space-y-4 max-w-3xl">
            <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              03 — CAPABILITIES MATRIX
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold">
              Disciplined execution.
            </h2>
            <p className="font-inter text-sm sm:text-base text-muted leading-relaxed">
              A comprehensive overview of competencies spanning frontend system architecture,
              editorial UI design, and rigorous performance engineering.
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Column Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CLUSTERS.map((cluster, idx) => {
            const Icon = cluster.icon;
            return (
              <ScrollReveal key={cluster.title} delay={0.1 + idx * 0.08} yOffset={20}>
                <div className="h-full rounded-[3px] border border-border-surface bg-surface hover:border-accent transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-[2px] bg-bg text-accent border border-border-surface">
                        <Icon size={18} />
                      </span>
                      <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
                        {cluster.category}
                      </span>
                    </div>

                    <h3 className="font-fraunces text-xl text-ink font-semibold leading-snug">
                      {cluster.title}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 pt-3 border-t border-border-surface">
                    {cluster.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between font-inter text-xs text-ink/90 py-1"
                      >
                        <span>{skill.name}</span>
                        <span className="font-mono text-[10px] text-muted px-2 py-0.5 rounded-[2px] bg-bg border border-border-surface">
                          {skill.tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
