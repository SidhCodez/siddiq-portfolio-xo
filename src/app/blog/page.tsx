import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog-index";
import { getAllPostMeta, getBlogCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Talk/Resources",
  description:
    "In-depth talks, notes, and resources on frontend architecture, design systems, web performance, and high-assurance security interfaces by Siddiq.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Talk/Resources — Siddiq",
    description:
      "In-depth talks, notes, and resources on frontend architecture, design systems, web performance, and high-assurance security interfaces by Siddiq.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk/Resources — Siddiq",
    description:
      "In-depth talks, notes, and resources on frontend architecture, design systems, web performance, and high-assurance security interfaces by Siddiq.",
    images: ["/opengraph-image"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPostMeta();
  const categories = getBlogCategories();

  return <BlogIndex posts={posts} categories={categories} />;
}
