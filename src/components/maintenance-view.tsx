"use client";

import * as React from "react";
import {
  LinkedinLogo,
  GithubLogo,
  EnvelopeSimple,
  ArrowUpRight,
  Copy,
  Check,
} from "@phosphor-icons/react";
import { MAINTENANCE_CONTENT } from "@/config/maintenance";

export function MaintenanceView() {
  const [copied, setCopied] = React.useState(false);
  const emailAddress = "siddiq080806@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#0F0C0D] text-[#F5EDE9] flex flex-col justify-between selection:bg-[#C2434B] selection:text-[#0F0C0D] overflow-x-hidden">
      {/* Background Architectural Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 editorial-grid-lines opacity-20"
        aria-hidden="true"
      />

      {/* Top Header / Brand Mark */}
      <header className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-8 pt-8 sm:pt-12 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Brand Kit Diamond Mark */}
          <div className="relative flex items-center justify-center p-1.5 flex-shrink-0">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#C2434B]"
              aria-hidden="true"
            >
              <path
                d="M 12 2.5 L 21.5 12 L 12 21.5 L 2.5 12 Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="2.2" fill="currentColor" />
            </svg>
          </div>
          <span className="font-fraunces font-medium italic text-[22px] text-[#F5EDE9] leading-none tracking-tight">
            Siddiq
          </span>
        </div>

        {/* Live Status Beacon */}
        <div
          role="status"
          aria-label={`Status: ${MAINTENANCE_CONTENT.status}`}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[2px] border border-[#261D20] bg-[#1A1416]/90 backdrop-blur-sm text-xs font-inter text-[#B8A8A4]"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2434B] opacity-75 motion-reduce:hidden"
              aria-hidden="true"
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C2434B]" />
          </span>
          <span className="text-[11px] font-medium tracking-wide uppercase">
            {MAINTENANCE_CONTENT.status}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-[840px] mx-auto px-6 sm:px-8 py-16 sm:py-24 my-auto">
        <div className="space-y-10 sm:space-y-12">
          {/* Eyebrow and Main Heading */}
          <div className="space-y-5">
            <div className="font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-[#C2434B]">
              {MAINTENANCE_CONTENT.eyebrow}
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl text-[#F5EDE9] font-semibold leading-[1.08] tracking-tight">
              {MAINTENANCE_CONTENT.heading}
            </h1>
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-4 max-w-[62ch]">
            {MAINTENANCE_CONTENT.description.map((paragraph, index) => (
              <p
                key={index}
                className="font-inter text-base sm:text-lg text-[#B8A8A4] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Contact Channels Section */}
          <div className="pt-4 space-y-4">
            <div className="font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-[#B8A8A4]/70">
              DIRECT CHANNELS
            </div>

            <nav
              aria-label="Contact Links"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5"
            >
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/siddiq-dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Siddiq on LinkedIn (opens in a new tab)"
                className="group p-4 sm:p-5 rounded-[2px] border border-[#261D20] bg-[#1A1416]/70 hover:bg-[#1A1416] hover:border-[#C2434B]/60 transition-all duration-200 flex flex-col justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2434B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0C0D]"
              >
                <div className="flex items-center justify-between text-[#B8A8A4] group-hover:text-[#F5EDE9] transition-colors">
                  <LinkedinLogo size={22} weight="regular" />
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <div>
                  <span className="block font-inter text-xs font-semibold text-[#F5EDE9] tracking-wider uppercase">
                    LinkedIn
                  </span>
                  <span className="block font-mono text-[11px] text-[#B8A8A4] mt-0.5 truncate">
                    in/siddiq-dev
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/SidhCodez"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Siddiq's GitHub profile (opens in a new tab)"
                className="group p-4 sm:p-5 rounded-[2px] border border-[#261D20] bg-[#1A1416]/70 hover:bg-[#1A1416] hover:border-[#C2434B]/60 transition-all duration-200 flex flex-col justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2434B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0C0D]"
              >
                <div className="flex items-center justify-between text-[#B8A8A4] group-hover:text-[#F5EDE9] transition-colors">
                  <GithubLogo size={22} weight="regular" />
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <div>
                  <span className="block font-inter text-xs font-semibold text-[#F5EDE9] tracking-wider uppercase">
                    GitHub
                  </span>
                  <span className="block font-mono text-[11px] text-[#B8A8A4] mt-0.5 truncate">
                    SidhCodez
                  </span>
                </div>
              </a>

              {/* Email */}
              <div className="group p-4 sm:p-5 rounded-[2px] border border-[#261D20] bg-[#1A1416]/70 hover:bg-[#1A1416] hover:border-[#C2434B]/60 transition-all duration-200 flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between text-[#B8A8A4] group-hover:text-[#F5EDE9] transition-colors">
                  <EnvelopeSimple size={22} weight="regular" />
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
                    className="p-1 rounded-[2px] border border-[#261D20] hover:border-[#B8A8A4] bg-[#0F0C0D] text-[#B8A8A4] hover:text-[#F5EDE9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2434B]"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <Check size={14} weight="bold" className="text-[#C2434B]" />
                    ) : (
                      <Copy size={14} weight="regular" />
                    )}
                  </button>
                </div>
                <div>
                  <a
                    href="mailto:siddiq080806@gmail.com"
                    aria-label="Send an email to Siddiq at siddiq080806@gmail.com"
                    className="block group/link focus-visible:outline-none focus-visible:underline"
                  >
                    <span className="block font-inter text-xs font-semibold text-[#F5EDE9] tracking-wider uppercase">
                      Email
                    </span>
                    <span className="block font-mono text-[11px] text-[#B8A8A4] group-hover/link:text-[#C2434B] mt-0.5 truncate transition-colors">
                      {copied ? "Copied to clipboard!" : emailAddress}
                    </span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </main>

      {/* Footer / Closing Message */}
      <footer className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-8 pb-8 sm:pb-12 pt-6 border-t border-[#261D20]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-fraunces italic text-sm text-[#F5EDE9]/75 tracking-tight">
          {MAINTENANCE_CONTENT.closing}
        </p>

        <p className="font-inter text-xs text-[#B8A8A4]/60">
          © {new Date().getFullYear()} Siddiq · All rights reserved
        </p>
      </footer>
    </div>
  );
}
