import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const frontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  subtitle: z.string().min(1, "subtitle is required"),
  publishedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "publishedAt must be YYYY-MM-DD")
    .refine(
      (value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)),
      "publishedAt must be a real date"
    ),
  category: z.string().min(1, "category is required"),
  excerpt: z.string().min(1, "excerpt is required"),
  tags: z.array(z.string()).default([]),
});

export interface BlogPostMeta {
  slug: string;
  title: string;
  subtitle: string;
  /** ISO date, e.g. 2026-02-18 */
  publishedAt: string;
  /** Display date, e.g. FEB 18, 2026 */
  displayDate: string;
  readTime: string;
  category: string;
  excerpt: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function formatDisplayDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${iso}T00:00:00Z`))
    .toUpperCase();
}

function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} MIN READ`;
}

function readPostFile(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/blog/${fileName}: ${parsed.error.message}`
    );
  }

  return {
    slug,
    ...parsed.data,
    displayDate: formatDisplayDate(parsed.data.publishedAt),
    readTime: calculateReadingTime(content),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(readPostFile)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getAllPostMeta(): BlogPostMeta[] {
  return getAllPosts().map(
    ({ slug, title, subtitle, publishedAt, displayDate, readTime, category, excerpt, tags }) => ({
      slug,
      title,
      subtitle,
      publishedAt,
      displayDate,
      readTime,
      category,
      excerpt,
      tags,
    })
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getAdjacentPosts(slug: string): {
  previous: BlogPostMeta | null;
  next: BlogPostMeta | null;
} {
  const posts = getAllPostMeta();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) return { previous: null, next: null };

  return {
    previous: posts[(index - 1 + posts.length) % posts.length] ?? null,
    next: posts[(index + 1) % posts.length] ?? null,
  };
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((post) => post.category)));
}
