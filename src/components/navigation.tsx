"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "PROJECTS", href: "/projects" },
  { label: "ABOUT", href: "/#about" },
  { label: "SKILLS", href: "/#skills" },
  { label: "ESSAYS", href: "/blog" },
  { label: "CONTACT", href: "/#contact" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/90 backdrop-blur-md border-b border-border-surface py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-between h-14 md:h-16"
          >
            {/* Left: Brand Logotype with Diamond Mark */}
            <div className="flex items-center gap-8">
              <BrandLogo />
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : link.href.startsWith("/#")
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`font-inter text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${
                      isActive
                        ? "text-accent"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Actions (Theme Toggle & Secondary Button Resume) */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-[11px]"
              >
                <span>RESUME</span>
                <ArrowUpRight size={13} weight="bold" />
              </a>
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="w-11 h-11 rounded-[2px] border border-border-surface bg-surface flex items-center justify-center text-ink"
              >
                {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden bg-bg pt-28 px-6 pb-10 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div className="font-inter text-[11px] font-bold tracking-eyebrow uppercase text-muted border-b border-border-surface pb-3">
                NAVIGATION
              </div>

              <div className="flex flex-col space-y-5">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-fraunces text-3xl text-ink hover:text-accent italic transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border-surface">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full"
              >
                <span>DOWNLOAD RESUME</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>
              <div className="text-center font-inter text-[12px] text-muted tracking-wider">
                SIDDIQ · EDITION 01
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
