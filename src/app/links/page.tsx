import type { Metadata } from "next";
import { LinksCatalogue } from "@/components/links-catalogue";
import { LINK_COLLECTIONS, getLinkCount } from "@/data/links";

const linkCount = getLinkCount(LINK_COLLECTIONS);
const collectionCount = LINK_COLLECTIONS.length;

export const metadata: Metadata = {
  title: "Link Catalogue",
  description: `${linkCount} hand-picked talks and resources, grouped into ${collectionCount} collections — frontend architecture, design systems, performance, security and the web at large.`,
  alternates: { canonical: "/links" },
  openGraph: {
    type: "website",
    title: "Link Catalogue — Siddiq",
    description: `${linkCount} hand-picked talks and resources, grouped into ${collectionCount} collections.`,
    url: "/links",
  },
  twitter: {
    card: "summary_large_image",
    title: "Link Catalogue — Siddiq",
    description: `${linkCount} hand-picked talks and resources, grouped into ${collectionCount} collections.`,
    images: ["/opengraph-image"],
  },
};

export default function LinksPage() {
  return <LinksCatalogue />;
}
