import { describe, expect, it } from "vitest";
import {
  getAllPostMeta,
  getAllPosts,
  getAdjacentPosts,
  getBlogCategories,
  getPostBySlug,
} from "@/lib/blog";

describe("blog content layer", () => {
  it("loads every MDX post and sorts newest first", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThanOrEqual(4);

    const dates = posts.map((post) => post.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("parses frontmatter and computes a reading time", () => {
    const post = getPostBySlug("the-architecture-of-quiet-luxury");

    expect(post).not.toBeNull();
    expect(post?.title).toContain("Quiet Luxury");
    expect(post?.displayDate).toBe("FEB 18, 2026");
    expect(post?.readTime).toMatch(/^\d+ MIN READ$/);
    expect(post?.tags).toContain("Design Systems");
    expect(post?.content).toContain("Restraint as an Engineering Feature");
  });

  it("excludes raw content from the searchable metadata index", () => {
    const [meta] = getAllPostMeta();
    expect(meta).toBeDefined();
    expect(meta).not.toHaveProperty("content");
  });

  it("returns null for unknown and unsafe slugs", () => {
    expect(getPostBySlug("does-not-exist")).toBeNull();
    expect(getPostBySlug("../etc/passwd")).toBeNull();
  });

  it("derives categories and wraps adjacent posts", () => {
    expect(getBlogCategories()).toContain("DESIGN SYSTEMS");

    const { previous, next } = getAdjacentPosts(
      "the-architecture-of-quiet-luxury"
    );
    expect(previous).not.toBeNull();
    expect(next).not.toBeNull();
    expect(previous?.slug).not.toBe(next?.slug);
  });
});
