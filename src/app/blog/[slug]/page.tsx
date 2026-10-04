import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_BLOGS } from "@/data/blogs";
import { BlogShareBar } from "@/components/blog-share-bar";
import { ArrowLeft, Clock, Calendar, Quotes } from "@phosphor-icons/react/dist/ssr";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = ALL_BLOGS.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  const currentIndex = ALL_BLOGS.findIndex((b) => b.slug === slug);
  const nextPost = ALL_BLOGS[(currentIndex + 1) % ALL_BLOGS.length];
  const prevPost =
    ALL_BLOGS[(currentIndex - 1 + ALL_BLOGS.length) % ALL_BLOGS.length];

  return (
    <article className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 editorial-grid-lines opacity-25 pointer-events-none" />

      <div className="relative max-w-[860px] mx-auto space-y-14">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border-surface pb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-inter text-xs font-semibold tracking-wider text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>ALL ESSAYS</span>
          </Link>

          <span className="font-mono text-xs text-muted">
            {post.category}
          </span>
        </div>

        {/* Article Header */}
        <header className="space-y-6">
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{post.publishedAt}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-ink font-semibold leading-[1.12]">
            {post.title}
          </h1>

          <p className="font-inter text-lg sm:text-xl text-muted leading-relaxed">
            {post.subtitle}
          </p>

          {/* Interactive Share Bar */}
          <BlogShareBar postTitle={post.title} postSlug={post.slug} />
        </header>

        {/* Article Body */}
        <div className="space-y-10 pt-4 border-t border-border-surface">
          {/* Intro Paragraph */}
          <p className="font-inter text-base sm:text-lg text-ink/90 leading-relaxed font-normal">
            {post.content.intro}
          </p>

          {/* Sections */}
          {post.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-6 pt-4">
              <h2 className="font-fraunces text-2xl sm:text-3xl text-ink font-semibold">
                {section.heading}
              </h2>

              <div className="space-y-4">
                {section.body.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="font-inter text-sm sm:text-base text-muted leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Pull Quote */}
              {section.quote && (
                <figure className="my-6 p-6 rounded-[2px] border-l-2 border-accent bg-surface space-y-2">
                  <Quotes size={22} weight="fill" className="text-accent opacity-80" />
                  <blockquote className="font-fraunces text-xl text-ink italic leading-snug">
                    "{section.quote}"
                  </blockquote>
                </figure>
              )}

              {/* Code Snippet */}
              {section.codeSnippet && (
                <div className="my-6 rounded-[2px] border border-border-surface bg-bg overflow-hidden">
                  <div className="px-4 py-2 border-b border-border-surface bg-surface flex items-center justify-between text-xs font-mono text-muted">
                    <span>{section.codeSnippet.language}</span>
                    <span>ARCHITECTURE</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-ink overflow-x-auto leading-relaxed">
                    <code>{section.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div className="pt-8 border-t border-border-surface space-y-4">
            <h3 className="font-fraunces text-2xl text-ink font-semibold">
              Endnote & Looking Forward
            </h3>
            <p className="font-inter text-base text-muted leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-border-surface flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-[2px] text-xs font-mono bg-surface text-ink border border-border-surface"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Monograph Card */}
        <div className="p-7 rounded-[3px] border border-border-surface bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              WRITTEN BY SIDDIQ
            </div>
            <div className="font-fraunces text-xl text-ink font-semibold">
              Frontend Engineer & UI Architect
            </div>
            <p className="font-inter text-xs text-muted max-w-[44ch] leading-relaxed">
              Writing on software restraint, high-assurance web3 clients, and modern frontend systems.
            </p>
          </div>

          <Link href="/#contact" className="btn-secondary text-[11px]">
            <span>GET IN TOUCH</span>
          </Link>
        </div>

        {/* Previous / Next Post Links */}
        <div className="pt-8 border-t border-border-surface grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/blog/${prevPost.slug}`}
            className="p-6 rounded-[2px] border border-border-surface bg-surface hover:border-accent transition-colors group space-y-2"
          >
            <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
              PREVIOUS ESSAY
            </span>
            <h4 className="font-fraunces text-lg text-ink font-semibold group-hover:text-accent transition-colors line-clamp-2">
              {prevPost.title}
            </h4>
          </Link>

          <Link
            href={`/blog/${nextPost.slug}`}
            className="p-6 rounded-[2px] border border-border-surface bg-surface hover:border-accent transition-colors group space-y-2 text-right"
          >
            <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
              NEXT ESSAY
            </span>
            <h4 className="font-fraunces text-lg text-ink font-semibold group-hover:text-accent transition-colors line-clamp-2">
              {nextPost.title}
            </h4>
          </Link>
        </div>
      </div>
    </article>
  );
}
