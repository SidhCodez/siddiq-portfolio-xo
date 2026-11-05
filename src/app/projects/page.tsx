import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/projects-index";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "An index of shipped software: verified skill platforms, AI forensics pipelines, offline-first apps, docs-as-code systems, and interface architecture by Siddiq.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: "Projects & Case Studies — Siddiq",
    description:
      "An index of shipped software: verified skill platforms, AI forensics pipelines, offline-first apps, docs-as-code systems, and interface architecture.",
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Case Studies — Siddiq",
    description:
      "An index of shipped software: verified skill platforms, AI forensics pipelines, offline-first apps, docs-as-code systems, and interface architecture.",
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
