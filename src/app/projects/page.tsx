import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/projects-index";

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "An index of software engineering projects, high-assurance security tools, AI systems, and design token architectures built by Siddiq between 2023 and 2026.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: "Projects & Case Studies — Siddiq",
    description:
      "An index of software engineering projects, high-assurance security tools, AI systems, and design token architectures built by Siddiq.",
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Case Studies — Siddiq",
    description:
      "An index of software engineering projects, high-assurance security tools, AI systems, and design token architectures built by Siddiq.",
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
