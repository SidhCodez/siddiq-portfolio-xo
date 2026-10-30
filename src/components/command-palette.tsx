"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { ALL_PROJECTS } from "@/data/projects";
import { AUTHOR, CONTACT_EMAIL } from "@/lib/site";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Check,
  Copy,
  EnvelopeSimple,
  FilePdf,
  FolderOpen,
  GithubLogo,
  House,
  LinkedinLogo,
  MagnifyingGlass,
  Moon,
  Stack,
  Sun,
  User,
} from "@phosphor-icons/react";

export interface SearchPost {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
}

interface CommandPaletteProps {
  posts: SearchPost[];
}

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: House, keywords: "overview landing index" },
  { label: "All Projects", href: "/projects", icon: Briefcase, keywords: "work archive portfolio" },
  { label: "All Essays", href: "/blog", icon: BookOpen, keywords: "writing blog monographs" },
  { label: "About", href: "/#about", icon: User, keywords: "bio philosophy ethos" },
  { label: "Skills", href: "/#skills", icon: Stack, keywords: "capabilities stack technologies" },
  { label: "Experience", href: "/#experience", icon: Briefcase, keywords: "career timeline roles" },
  { label: "Contact", href: "/#contact", icon: EnvelopeSimple, keywords: "email inquiry hire" },
];

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function CommandPalette({ posts }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    const onOpenRequest = () => setOpen(true);

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenRequest);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenRequest);
    };
  }, []);

  React.useEffect(() => {
    if (!copiedEmail) return;
    const timeout = window.setTimeout(() => setCopiedEmail(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copiedEmail]);

  const navigate = React.useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const isDark = (resolvedTheme ?? "dark") === "dark";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global site search"
      overlayClassName="fixed inset-0 z-[100] bg-bg/85 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[10vh] z-[101] w-[calc(100%-2rem)] max-w-[640px] -translate-x-1/2 rounded-[3px] border border-border-surface bg-surface shadow-2xl overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 border-b border-border-surface">
        <MagnifyingGlass size={18} className="text-muted shrink-0" aria-hidden="true" />
        <Command.Input
          placeholder="Search pages, projects, essays, actions…"
          className="flex-1 bg-transparent py-4 font-inter text-sm text-ink outline-none placeholder:text-muted/60"
        />
        <kbd className="hidden sm:inline-flex shrink-0 items-center rounded-[2px] border border-border-surface bg-bg px-1.5 py-0.5 font-mono text-[10px] text-muted">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[min(62vh,440px)] overflow-y-auto p-2">
        <Command.Empty className="py-12 text-center font-inter text-xs text-muted">
          No results found. Try a project name, essay title, or skill.
        </Command.Empty>

        <Command.Group heading="Navigate">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Command.Item
                key={item.href}
                value={`${item.label} ${item.keywords}`}
                onSelect={() => navigate(item.href)}
                className="cmdk-item"
              >
                <Icon size={16} className="cmdk-item-icon shrink-0" aria-hidden="true" />
                <span className="font-inter text-sm text-ink">{item.label}</span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-muted">
                  Page
                </span>
              </Command.Item>
            );
          })}
        </Command.Group>

        <Command.Group heading="Projects">
          {ALL_PROJECTS.map((project) => (
            <Command.Item
              key={project.slug}
              value={`${project.title} ${project.subtitle} ${project.category} ${project.tags.join(" ")}`}
              onSelect={() => navigate(`/projects/${project.slug}`)}
              className="cmdk-item"
            >
              <FolderOpen
                size={16}
                className="cmdk-item-icon shrink-0"
                aria-hidden="true"
              />
              <span className="font-inter text-sm text-ink">{project.title}</span>
              <span className="ml-auto truncate pl-4 font-inter text-[10px] uppercase tracking-wider text-muted">
                {project.category}
              </span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Essays">
          {posts.map((post) => (
            <Command.Item
              key={post.slug}
              value={`${post.title} ${post.subtitle} ${post.category} ${post.tags.join(" ")}`}
              onSelect={() => navigate(`/blog/${post.slug}`)}
              className="cmdk-item"
            >
              <BookOpen
                size={16}
                className="cmdk-item-icon shrink-0"
                aria-hidden="true"
              />
              <span className="font-inter text-sm text-ink line-clamp-1">
                {post.title}
              </span>
              <ArrowUpRight
                size={12}
                className="ml-auto shrink-0 text-muted"
                aria-hidden="true"
              />
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions">
          <Command.Item
            value="toggle theme dark light appearance"
            onSelect={() => {
              setTheme(isDark ? "light" : "dark");
              setOpen(false);
            }}
            className="cmdk-item"
          >
            {isDark ? (
              <Sun size={16} className="cmdk-item-icon shrink-0" aria-hidden="true" />
            ) : (
              <Moon size={16} className="cmdk-item-icon shrink-0" aria-hidden="true" />
            )}
            <span className="font-inter text-sm text-ink">
              Switch to {isDark ? "light" : "dark"} mode
            </span>
          </Command.Item>

          <Command.Item
            value={`copy email address ${CONTACT_EMAIL}`}
            onSelect={() => {
              navigator.clipboard.writeText(CONTACT_EMAIL);
              setCopiedEmail(true);
            }}
            className="cmdk-item"
          >
            {copiedEmail ? (
              <Check size={16} className="shrink-0 text-accent" aria-hidden="true" />
            ) : (
              <Copy size={16} className="cmdk-item-icon shrink-0" aria-hidden="true" />
            )}
            <span className="font-inter text-sm text-ink">
              {copiedEmail ? "Email copied to clipboard" : "Copy email address"}
            </span>
            <span className="ml-auto font-mono text-[10px] text-muted">
              {CONTACT_EMAIL}
            </span>
          </Command.Item>

          <Command.Item
            value="open resume pdf download cv"
            onSelect={() => {
              setOpen(false);
              openExternal("/siddiq-resume.pdf");
            }}
            className="cmdk-item"
          >
            <FilePdf size={16} className="cmdk-item-icon shrink-0" aria-hidden="true" />
            <span className="font-inter text-sm text-ink">Open resume</span>
          </Command.Item>

          <Command.Item
            value="github profile source code"
            onSelect={() => {
              setOpen(false);
              openExternal(AUTHOR.github);
            }}
            className="cmdk-item"
          >
            <GithubLogo size={16} className="cmdk-item-icon shrink-0" aria-hidden="true" />
            <span className="font-inter text-sm text-ink">GitHub profile</span>
            <ArrowUpRight
              size={12}
              className="ml-auto shrink-0 text-muted"
              aria-hidden="true"
            />
          </Command.Item>

          <Command.Item
            value="linkedin profile professional network"
            onSelect={() => {
              setOpen(false);
              openExternal(AUTHOR.linkedin);
            }}
            className="cmdk-item"
          >
            <LinkedinLogo
              size={16}
              className="cmdk-item-icon shrink-0"
              aria-hidden="true"
            />
            <span className="font-inter text-sm text-ink">LinkedIn profile</span>
            <ArrowUpRight
              size={12}
              className="ml-auto shrink-0 text-muted"
              aria-hidden="true"
            />
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="flex items-center justify-between gap-4 border-t border-border-surface bg-bg/50 px-4 py-2.5 font-inter text-[10px] uppercase tracking-eyebrow text-muted">
        <span>↑↓ navigate · ↵ open</span>
        <span className="font-mono normal-case tracking-normal">⌘K / Ctrl+K</span>
      </div>
    </Command.Dialog>
  );
}
