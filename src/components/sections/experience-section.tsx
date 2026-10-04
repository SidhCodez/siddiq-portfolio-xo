"use client";

import * as React from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  deliverables: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    period: "2024 — PRESENT",
    role: "Lead Frontend Architect",
    organization: "Independent Practice / Client Commissions",
    location: "Global Remote",
    description:
      "Engineering bespoke web experiences, strict design token systems, and high-performance Next.js architectures for tech founders and international startups.",
    deliverables: [
      "Architected sub-second web applications achieving 98+ Lighthouse scores.",
      "Established multi-theme token workflows with Tailwind CSS and Next.js App Router.",
      "Designed full UI systems for web3 security, AI intelligence, and cultural preservation.",
    ],
  },
  {
    period: "2023 — 2024",
    role: "Frontend Engineering Fellow",
    organization: "Systems & Open Web Collective",
    location: "Remote",
    description:
      "Specialized in core accessibility benchmarks (WCAG 2.1 AA) and fluid physics micro-animations for enterprise React applications.",
    deliverables: [
      "Standardized keyboard navigation and screen-reader accessibility across 40+ primitives.",
      "Refactored complex UI re-renders using optimized Motion values instead of React state.",
      "Co-authored design system documentation used across distributed engineering squads.",
    ],
  },
  {
    period: "2022 — 2023",
    role: "UI/UX Design Engineer",
    organization: "Digital Product Studio",
    location: "Hybrid",
    description:
      "Collaborated closely with product designers to bridge high-fidelity Figma prototypes into robust, testable frontend codebases.",
    deliverables: [
      "Created tokenized design systems synchronizing design variables directly with CSS.",
      "Built interactive data visualization components handling dense real-time feeds.",
      "Cut component delivery cycle time by 45% through reusable headless primitives.",
    ],
  },
  {
    period: "2021 — 2022",
    role: "Technical Community & Open Source Lead",
    organization: "Developer Ecosystem",
    location: "India",
    description:
      "Organized frontend workshops, mentored student developers in React and web standards, and led community hackathons.",
    deliverables: [
      "Mentored 200+ aspiring engineers through hands-on frontend build cohorts.",
      "Maintained curated open-source boilerplates with strict linting and test coverage.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-border-surface">
      <div className="max-w-[1360px] mx-auto space-y-16">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={16}>
          <div className="space-y-4 max-w-3xl">
            <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              04 — TRAJECTORY
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold">
              Chronicle of practice.
            </h2>
            <p className="font-inter text-sm sm:text-base text-muted leading-relaxed">
              A track record of engineering leadership, design fidelity, and deliberate problem
              solving across startups, collectives, and specialized client ventures.
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Timeline with Clean Hairline Dividers and Staggered Scroll Reveal */}
        <div className="border-t border-border-surface divide-y divide-border-surface">
          {EXPERIENCES.map((exp, idx) => (
            <ScrollReveal key={exp.period} delay={0.08 * idx} yOffset={18}>
              <div className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start group transition-colors duration-200 hover:bg-surface/40 px-2 sm:px-4 rounded-[2px]">
                {/* Period & Meta */}
                <div className="lg:col-span-3 space-y-1">
                  <span className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                    {exp.period}
                  </span>
                  <div className="font-inter text-xs text-muted">
                    {exp.location}
                  </div>
                </div>

                {/* Role & Organization */}
                <div className="lg:col-span-4 space-y-1">
                  <h3 className="font-fraunces text-2xl text-ink font-semibold group-hover:text-accent transition-colors">
                    {exp.role}
                  </h3>
                  <div className="font-inter text-sm font-medium text-muted">
                    {exp.organization}
                  </div>
                </div>

                {/* Description & Deliverables */}
                <div className="lg:col-span-5 space-y-4">
                  <p className="font-inter text-sm text-muted leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="space-y-1.5 pt-1">
                    {exp.deliverables.map((d, i) => (
                      <li
                        key={i}
                        className="font-inter text-xs text-ink/90 flex items-start gap-2"
                      >
                        <span className="text-accent mt-0.5">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
