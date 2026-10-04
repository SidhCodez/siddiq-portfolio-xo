"use client";

import * as React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import {
  ArrowUp,
  ArrowUpRight,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  Copy,
  Check,
} from "@phosphor-icons/react";

const NAV_DIRECTORY = [
  { label: "ALL PROJECTS", href: "/projects" },
  { label: "ESSAYS & BLOG", href: "/blog" },
  { label: "ABOUT SIDDIQ", href: "/#about" },
  { label: "CAPABILITIES", href: "/#skills" },
  { label: "CAREER TIMELINE", href: "/#experience" },
];

const SOCIAL_LINKS = [
  { label: "GITHUB", href: "https://github.com/siddiq", icon: GithubLogo },
  { label: "LINKEDIN", href: "https://linkedin.com/in/siddiq", icon: LinkedinLogo },
  { label: "EMAIL", href: "mailto:contact@siddiq.dev", icon: EnvelopeSimple },
];

export function Footer() {
  const [copied, setCopied] = React.useState(false);
  const email = "contact@siddiq.dev";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 md:mt-36 border-t border-border-surface bg-surface/30">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 editorial-grid-lines opacity-30 pointer-events-none" />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Top Call to Action Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 md:pb-24 border-b border-border-surface">
          <div className="lg:col-span-7 space-y-6">
            <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              COLLABORATION & INQUIRIES
            </div>

            <h2 className="font-fraunces text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-[1.08]">
              Deliberate code. <br />
              <span className="italic text-accent">Quiet luxury.</span>
            </h2>

            <p className="font-inter text-sm sm:text-base text-muted max-w-[54ch] leading-relaxed">
              Available for full-time engineering appointments, high-assurance design system
              initiatives, and select digital product commissions.
            </p>

            {/* Actions using exact component button styles */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a href={`mailto:${email}`} className="btn-primary">
                <span>SEND DIRECT MESSAGE</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-secondary"
              >
                {copied ? (
                  <>
                    <Check size={14} weight="bold" className="text-accent" />
                    <span>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} weight="regular" />
                    <span>COPY EMAIL ({email})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Directory & Channels */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Sitemap Navigation */}
            <div className="space-y-4">
              <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-muted">
                DIRECTORY
              </div>
              <ul className="space-y-2">
                {NAV_DIRECTORY.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-inter text-xs text-muted hover:text-ink transition-colors block py-1 font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Channels & Specs */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-muted">
                  CHANNELS
                </div>
                <ul className="space-y-1">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between py-1.5 border-b border-border-surface text-ink hover:text-accent transition-colors"
                        >
                          <span className="flex items-center gap-2.5 font-inter text-xs font-semibold tracking-wider">
                            <Icon size={14} />
                            <span>{link.label}</span>
                          </span>
                          <ArrowUpRight
                            size={12}
                            className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Status Spec */}
              <div className="p-3.5 rounded-[2px] border border-border-surface bg-surface space-y-1">
                <div className="font-inter text-[9px] font-bold uppercase tracking-eyebrow text-muted">
                  CURRENT STATUS
                </div>
                <div className="font-inter text-xs text-ink flex justify-between">
                  <span>CAPACITY</span>
                  <span className="font-mono text-accent">OPEN FOR ROLES</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <BrandLogo showWordmark={true} />
          </div>

          <div className="flex items-center gap-6">
            <span className="font-inter text-xs text-muted">
              EDITION 01 · © {new Date().getFullYear()} ALL RIGHTS RESERVED
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex items-center gap-2 px-3.5 py-2 rounded-[2px] border border-border-surface bg-surface hover:border-muted text-ink text-xs transition-all active:scale-95"
            >
              <span className="font-inter text-[10px] font-bold tracking-eyebrow uppercase">TOP</span>
              <ArrowUp size={12} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
