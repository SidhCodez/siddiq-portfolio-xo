"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowUpRight,
  List,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "PROJECTS", href: "/projects" },
  { label: "ABOUT", href: "/#about" },
  { label: "SKILLS", href: "/#skills" },
  { label: "ESSAYS", href: "/blog" },
  { label: "CONTACT", href: "/#contact" },
];

function openCommandPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  const drawerRef = React.useRef<HTMLDivElement>(null);
  const menuTriggerRef = React.useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the menu whenever the route changes.
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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

  // Focus trap, Escape handling, and focus restoration for the mobile drawer.
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    previouslyFocusedRef.current =
      menuTriggerRef.current ?? (document.activeElement as HTMLElement | null);

    const drawer = drawerRef.current;
    if (!drawer) return;

    const getFocusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
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
            <div className="hidden lg:flex items-center gap-8">
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
                    aria-current={isActive ? "page" : undefined}
                    className={`font-inter text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Actions (Search, Theme Toggle & Secondary Button Resume) */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={openCommandPalette}
                aria-label="Open global search"
                className="inline-flex items-center gap-2 h-11 px-3 rounded-[2px] border border-border-surface bg-surface/60 text-muted hover:text-ink hover:border-muted transition-colors"
              >
                <MagnifyingGlass size={15} aria-hidden="true" />
                <span className="font-inter text-[11px] font-semibold tracking-[0.14em] uppercase">
                  Search
                </span>
                <kbd className="rounded-[2px] border border-border-surface bg-bg px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />

              <a
                href="/siddiq-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-[11px]"
              >
                <span>RESUME</span>
                <ArrowUpRight size={13} weight="bold" />
              </a>
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                type="button"
                onClick={openCommandPalette}
                aria-label="Open global search"
                className="w-11 h-11 rounded-[2px] border border-border-surface bg-surface flex items-center justify-center text-ink"
              >
                <MagnifyingGlass size={18} aria-hidden="true" />
              </button>

              <ThemeToggle />

              <button
                ref={menuTriggerRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
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
            ref={drawerRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            tabIndex={-1}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-bg pt-28 px-6 pb-10 flex flex-col justify-between focus:outline-none"
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

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCommandPalette();
                  }}
                  className="inline-flex items-center gap-2 font-fraunces text-3xl text-ink hover:text-accent italic transition-colors text-left"
                >
                  <MagnifyingGlass size={22} aria-hidden="true" />
                  <span>SEARCH</span>
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border-surface">
              <a
                href="/siddiq-resume.pdf"
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
