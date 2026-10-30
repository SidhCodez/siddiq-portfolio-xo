import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: { absolute: "Siddiq — Frontend Engineer & UI Architect" },
  description:
    "Portfolio of Siddiq, a frontend engineer and UI architect building high-performance Next.js applications, disciplined design systems, and quiet digital interfaces.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: "Siddiq — Frontend Engineer & UI Architect",
    description:
      "High-performance Next.js applications, disciplined design systems, and quiet digital interfaces.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddiq — Frontend Engineer & UI Architect",
    description:
      "High-performance Next.js applications, disciplined design systems, and quiet digital interfaces.",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return (
    <div className="relative flex flex-col w-full overflow-hidden">
      {/* 01: Hero Section */}
      <HeroSection />

      {/* 02: About & Philosophy Section */}
      <AboutSection />

      {/* 03: Projects Portfolio (SkillBridge, WalletGuard, ColdCase, Virasethu) */}
      <ProjectsSection />

      {/* 04: Skills & Architecture Matrix */}
      <SkillsSection />

      {/* 05: Experience Timeline */}
      <ExperienceSection />

      {/* 06: Contact & Inquiries */}
      <ContactSection />
    </div>
  );
}
