"use client";

import * as React from "react";
import Link from "next/link";
import { ALL_BLOGS, BlogPost } from "@/data/blogs";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  ArrowLeft,
  ArrowUpRight,
  ShareNetwork,
  Check,
  Clock,
  Calendar,
  MagnifyingGlass,
} from "@phosphor-icons/react";

const BLOG_CATEGORIES = [
  "ALL",
  "DESIGN SYSTEMS",
  "SECURITY & CRYPTO",
  "PERFORMANCE",
  "FRONTEND ARCHITECTURE",
] as const;

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null);

  const filteredBlogs = ALL_BLOGS.filter((post) => {
    const matchesCategory =
      selectedCategory === "ALL" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = async (post: BlogPost, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = `${window.location.origin}/blog/${post.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.subtitle,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if user cancels or browser fails
      }
    }

    navigator.clipboard.writeText(shareUrl);
    setCopiedSlug(post.slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 editorial-grid-lines opacity-30 pointer-events-none" />

      <div className="relative max-w-[1120px] mx-auto space-y-16">
        {/* Back Navigation */}
        <ScrollReveal yOffset={10}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-inter text-xs font-semibold tracking-wider text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>RETURN TO OVERVIEW</span>
          </Link>
        </ScrollReveal>

        {/* Page Header */}
        <ScrollReveal yOffset={16}>
          <div className="space-y-4 max-w-3xl">
            <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              ESSAYS & MONOGRAPHS · {ALL_BLOGS.length} PUBLICATIONS
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl text-ink font-semibold leading-[1.08]">
              Essays on software, <br />
              <span className="italic text-accent">design, and speed.</span>
            </h1>
            <p className="font-inter text-base sm:text-lg text-muted max-w-[54ch] leading-relaxed">
              In-depth investigations into digital product architecture, quiet luxury design
              tokens, cryptographic security interfaces, and web performance.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories & Filter Bar */}
        <ScrollReveal delay={0.1} yOffset={16}>
          <div className="p-4 rounded-[3px] border border-border-surface bg-surface flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {BLOG_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-[2px] font-inter text-[11px] font-bold tracking-eyebrow uppercase transition-all ${
                      isSelected
                        ? "bg-accent text-bg"
                        : "bg-bg text-muted hover:text-ink border border-border-surface"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64">
              <MagnifyingGlass
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search essays..."
                className="w-full pl-9 pr-4 py-2 rounded-[2px] border border-border-surface bg-bg text-ink placeholder:text-muted/60 font-inter text-xs transition-colors focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Blog Post List */}
        <div className="space-y-6">
          {filteredBlogs.map((post, idx) => (
            <ScrollReveal key={post.slug} delay={0.06 * idx} yOffset={18}>
              <article className="group rounded-[3px] border border-border-surface bg-surface hover:border-accent transition-all duration-300 p-7 sm:p-9 space-y-6">
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-surface pb-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted">
                    <span className="flex items-center gap-1.5 text-accent font-semibold font-inter text-[11px] uppercase tracking-eyebrow">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      <span>{post.publishedAt}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Shareable Link Trigger */}
                  <button
                    type="button"
                    onClick={(e) => handleShare(post, e)}
                    aria-label={`Share ${post.title}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border border-border-surface bg-bg text-muted hover:text-ink hover:border-accent transition-all text-xs font-inter font-medium active:scale-95"
                  >
                    {copiedSlug === post.slug ? (
                      <>
                        <Check size={13} weight="bold" className="text-accent" />
                        <span className="text-accent font-semibold">LINK COPIED</span>
                      </>
                    ) : (
                      <>
                        <ShareNetwork size={13} />
                        <span>SHARE</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Article Headline & Summary */}
                <div className="space-y-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-fraunces text-2xl sm:text-3xl text-ink font-semibold group-hover:text-accent transition-colors block"
                  >
                    {post.title}
                  </Link>

                  <p className="font-inter text-sm sm:text-base text-muted font-normal leading-relaxed">
                    {post.subtitle}
                  </p>

                  <p className="font-inter text-xs sm:text-sm text-ink/80 leading-relaxed line-clamp-2 pt-1">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags & Read Action */}
                <div className="pt-4 border-t border-border-surface flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-[2px] text-[11px] font-mono bg-bg text-muted border border-border-surface"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 font-inter text-[11px] font-bold uppercase tracking-button text-accent hover:underline"
                  >
                    <span>READ ESSAY</span>
                    <ArrowUpRight size={13} weight="bold" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="p-12 text-center rounded-[3px] border border-border-surface bg-surface space-y-3">
            <h3 className="font-fraunces text-2xl text-ink font-semibold">
              No essays match your query
            </h3>
            <p className="font-inter text-sm text-muted">
              Try adjusting your category filter or clearing the search bar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
