"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-border-surface"
    >
      <div className="max-w-[1360px] mx-auto space-y-16">
        <ScrollReveal yOffset={16}>
          <div className="space-y-4 max-w-2xl">
            <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              07 — TESTIMONIALS
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink font-semibold">
              Kind words.
            </h2>
            <p className="font-inter text-sm sm:text-base text-muted leading-relaxed">
              Notes from the people I have built with — founders, engineers, and
              designers who care about the details as much as the outcome.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} yOffset={24} duration={0.7}>
          <div className="rounded-[3px] border border-border-surface bg-surface/40 overflow-hidden">
            <StaggerTestimonials />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
