import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, Clock, Calendar } from "@phosphor-icons/react/dist/ssr";
import { BlogShareBar } from "@/components/blog-share-bar";
import { JsonLd } from "@/components/structured-data";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/blog";
import { AUTHOR, SITE_NAME, absoluteUrl } from "@/lib/site";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Resource Not Found",
      description: "The requested resource could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      authors: [AUTHOR.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`/blog/${post.slug}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(post.slug);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
      sameAs: [AUTHOR.github, AUTHOR.linkedin],
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
  };

  return (
    <article className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <JsonLd data={blogPostingJsonLd} />

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

          <span className="font-mono text-xs text-muted">{post.category}</span>
        </div>

        {/* Article Header */}
        <header className="space-y-6">
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              <time dateTime={post.publishedAt}>{post.displayDate}</time>
            </span>
            <span aria-hidden="true">•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
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
        <div className="pt-4 border-t border-border-surface">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
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
        {(previous || next) && (
          <div className="pt-8 border-t border-border-surface grid grid-cols-1 sm:grid-cols-2 gap-6">
            {previous ? (
              <Link
                href={`/blog/${previous.slug}`}
                className="p-6 rounded-[2px] border border-border-surface bg-surface hover:border-accent transition-colors group space-y-2"
              >
                <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
                  PREVIOUS ESSAY
                </span>
                <h2 className="font-fraunces text-lg text-ink font-semibold group-hover:text-accent transition-colors line-clamp-2">
                  {previous.title}
                </h2>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="p-6 rounded-[2px] border border-border-surface bg-surface hover:border-accent transition-colors group space-y-2 text-right"
              >
                <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
                  NEXT ESSAY
                </span>
                <h2 className="font-fraunces text-lg text-ink font-semibold group-hover:text-accent transition-colors line-clamp-2">
                  {next.title}
                </h2>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
