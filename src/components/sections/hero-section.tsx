"use client";

import * as React from "react";
import { ArrowDown, ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100dvh-5rem)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-16 overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 editorial-grid-lines opacity-35 pointer-events-none" />

      <div className="relative max-w-[1360px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, Action Buttons */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[11px] font-inter font-bold tracking-eyebrow uppercase text-accent"
            >
              <span>EDITION 01</span>
              <span className="text-muted">/</span>
              <span>DEVELOPER & DESIGNER</span>
            </motion.div>

            {/* Display Headline: Fraunces 500 italic scale (84–96px on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="font-fraunces font-medium italic text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-ink leading-[1.08] tracking-display pb-2">
                Quiet luxury, <br />
                <span className="text-accent not-italic font-normal">crafted code.</span>
              </h1>
            </motion.div>

            {/* Body Copy: Inter 400 under 20 words */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-inter text-base sm:text-lg text-muted max-w-[48ch] leading-relaxed"
            >
              Frontend engineer designing deliberate digital systems where architectural restraint meets modern engineering speed.
            </motion.p>

            {/* Primary & Secondary Buttons strictly adhering to Design System specs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a href="#projects" className="btn-primary">
                <span>EXPLORE WORK</span>
                <ArrowDown size={14} weight="bold" />
              </a>

              <a href="#contact" className="btn-secondary">
                <span>GET IN TOUCH</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Editorial Architecture Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative p-6 sm:p-8 rounded-[3px] border border-border-surface bg-surface shadow-sm space-y-6">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-border-surface pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-[1px] bg-accent" />
                  <span className="font-inter text-[11px] font-bold tracking-eyebrow uppercase text-muted">
                    SPECIFICATION
                  </span>
                </div>
                <span className="font-inter text-[11px] text-muted tracking-wider">
                  2026 ARCHITECTURE
                </span>
              </div>

              {/* Manifesto Content */}
              <div className="space-y-4">
                <h3 className="font-fraunces text-2xl sm:text-3xl text-ink font-semibold leading-snug">
                  Detail is the difference.
                </h3>
                <p className="font-inter text-sm text-muted leading-relaxed">
                  Considered detail, generous space, and calm confidence in every layout we make.
                  Restraint in every touchpoint.
                </p>
              </div>

              {/* Contrast & Metric Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-surface">
                <div className="p-3.5 rounded-[2px] bg-bg/50 border border-border-surface">
                  <span className="block font-fraunces text-2xl text-accent font-medium">
                    17:1
                  </span>
                  <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
                    CONTRAST RATIO
                  </span>
                </div>
                <div className="p-3.5 rounded-[2px] bg-bg/50 border border-border-surface">
                  <span className="block font-fraunces text-2xl text-accent font-medium">
                    100%
                  </span>
                  <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
                    FLUID TYPESYSTEM
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
