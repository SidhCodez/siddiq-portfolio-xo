"use client";

import * as React from "react";
import { Compass, Code, Lightning } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";

const VALUES = [
  {
    icon: Compass,
    title: "Editorial Restraint",
    desc: "Every pixel, divider, and token choice justifies its existence. Eliminating visual noise to let typography breathe.",
  },
  {
    icon: Code,
    title: "Type-Safe Rigor",
    desc: "Strict TypeScript interfaces, semantic ARIA hierarchies, and modular component trees engineered to endure.",
  },
  {
    icon: Lightning,
    title: "Tangible Performance",
    desc: "Sub-second LCP, zero cumulative layout shifts, and physical micro-motion that responds instantly to user interaction.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-border-surface">
      <div className="max-w-[1360px] mx-auto space-y-16">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal yOffset={16}>
          <div className="space-y-4 max-w-3xl">
            <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              01 — ABOUT & ETHOS
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold">
              Engineering meets calm aesthetics.
            </h2>
          </div>
        </ScrollReveal>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Bio Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal delay={0.1} yOffset={16}>
              <p className="font-inter text-lg sm:text-xl text-ink leading-relaxed font-normal">
                I am Siddiq, a frontend engineer and UI architect crafting high-assurance web products,
                strict design token systems, and quiet digital interfaces.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15} yOffset={16}>
              <p className="font-inter text-sm sm:text-base text-muted leading-relaxed">
                With deep experience bridging engineering rigor and editorial design taste, I eliminate
                the friction between Figma files and production code. I focus on software that feels
                physical, quietly authoritative, and blisteringly fast.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} yOffset={16}>
              <p className="font-inter text-sm sm:text-base text-muted leading-relaxed">
                Whether building accessible design tokens for enterprise applications or architecting
                zero-trust dashboards, my standard remains constant: precision in execution, generous
                whitespace, and absolute typographic clarity.
              </p>
            </ScrollReveal>

            {/* Quick Specs */}
            <ScrollReveal delay={0.25} yOffset={16}>
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-[2px] border border-border-surface bg-surface">
                  <span className="block font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                    FOCUS AREAS
                  </span>
                  <span className="font-inter text-sm text-ink font-medium mt-1.5 block">
                    Next.js · Design Systems · Fluid Motion
                  </span>
                </div>
                <div className="p-4 rounded-[2px] border border-border-surface bg-surface">
                  <span className="block font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
                    LOCATION
                  </span>
                  <span className="font-inter text-sm text-ink font-medium mt-1.5 block">
                    India · Remote Worldwide
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Architectural Principles Cards with Staggered Scroll Reveal */}
          <div className="lg:col-span-5 space-y-4">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={val.title} delay={0.15 + idx * 0.08} yOffset={20}>
                  <div className="p-6 rounded-[3px] border border-border-surface bg-surface space-y-3 transition-colors hover:border-accent">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-[2px] bg-bg text-accent border border-border-surface">
                        <Icon size={18} />
                      </span>
                      <h3 className="font-fraunces text-lg text-ink font-semibold">
                        {val.title}
                      </h3>
                    </div>
                    <p className="font-inter text-sm text-muted leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
