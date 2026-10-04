import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PROJECTS } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, GithubLogo, Sparkle, CheckCircle } from "@phosphor-icons/react/dist/ssr";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = ALL_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = ALL_PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = ALL_PROJECTS[(currentIndex + 1) % ALL_PROJECTS.length];
  const prevProject =
    ALL_PROJECTS[(currentIndex - 1 + ALL_PROJECTS.length) % ALL_PROJECTS.length];

  return (
    <article className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 editorial-grid-lines opacity-25 pointer-events-none" />

      <div className="relative max-w-[1040px] mx-auto space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border-surface pb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-inter text-xs font-semibold tracking-wider text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>ALL PROJECTS</span>
          </Link>

          <span className="font-mono text-xs text-muted">
            CASE STUDY · {project.year}
          </span>
        </div>

        {/* Hero Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-surface border border-border-surface text-[11px] font-inter font-bold tracking-eyebrow uppercase text-accent">
            <Sparkle size={13} weight="fill" />
            <span>{project.category}</span>
          </div>

          <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl text-ink font-semibold leading-[1.08]">
            {project.title}
          </h1>

          <p className="font-inter text-lg sm:text-xl text-muted max-w-[56ch] leading-relaxed">
            {project.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>EXPERIENCE LIVE SYSTEM</span>
              <ArrowUpRight size={14} weight="bold" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <GithubLogo size={16} />
              <span>INSPECT REPOSITORY</span>
            </a>
          </div>
        </div>

        {/* Specifications Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-[3px] border border-border-surface bg-surface">
          <div>
            <span className="block font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
              ROLE
            </span>
            <span className="font-inter text-sm text-ink font-medium mt-1 block">
              {project.role}
            </span>
          </div>
          <div>
            <span className="block font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
              CLIENT / CONTEXT
            </span>
            <span className="font-inter text-sm text-ink font-medium mt-1 block">
              {project.clientOrOrg}
            </span>
          </div>
          <div>
            <span className="block font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
              YEAR
            </span>
            <span className="font-inter text-sm text-ink font-medium mt-1 block">
              {project.year}
            </span>
          </div>
          <div>
            <span className="block font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
              CORE METRIC
            </span>
            <span className="font-inter text-sm text-accent font-semibold mt-1 block">
              {project.metrics}
            </span>
          </div>
        </div>

        {/* Narrative & Problem Space */}
        <div className="space-y-6 pt-4">
          <h2 className="font-fraunces text-2xl sm:text-3xl text-ink font-semibold">
            System Overview & Mandate
          </h2>
          <p className="font-inter text-base sm:text-lg text-ink/90 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Architectural Notes */}
        <div className="space-y-6 pt-4 border-t border-border-surface">
          <h2 className="font-fraunces text-2xl sm:text-3xl text-ink font-semibold">
            Engineering & Technical Architecture
          </h2>
          <div className="space-y-4">
            {project.architectureNotes.map((note, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[2px] border border-border-surface bg-surface flex items-start gap-4"
              >
                <span className="font-mono text-xs text-accent mt-0.5 font-bold">
                  0{idx + 1}
                </span>
                <p className="font-inter text-sm text-muted leading-relaxed">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Outcomes */}
        <div className="space-y-6 pt-4 border-t border-border-surface">
          <h2 className="font-fraunces text-2xl sm:text-3xl text-ink font-semibold">
            Impact & Measured Outcomes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.keyOutcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[2px] border border-border-surface bg-surface space-y-2"
              >
                <CheckCircle size={18} weight="fill" className="text-accent" />
                <p className="font-inter text-sm text-ink leading-relaxed">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Employed */}
        <div className="space-y-4 pt-4 border-t border-border-surface">
          <h3 className="font-inter text-[11px] font-bold uppercase tracking-eyebrow text-muted">
            TECHNOLOGY STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-[2px] text-xs font-mono bg-surface text-ink border border-border-surface"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Next / Previous Project Pagination */}
        <div className="pt-12 border-t border-border-surface grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-6 rounded-[2px] border border-border-surface bg-surface hover:border-accent transition-colors group space-y-2"
          >
            <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
              PREVIOUS CASE STUDY
            </span>
            <h4 className="font-fraunces text-xl text-ink font-semibold group-hover:text-accent transition-colors">
              {prevProject.title}
            </h4>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-6 rounded-[2px] border border-border-surface bg-surface hover:border-accent transition-colors group space-y-2 text-right"
          >
            <span className="font-inter text-[10px] font-bold uppercase tracking-eyebrow text-muted">
              NEXT CASE STUDY
            </span>
            <h4 className="font-fraunces text-xl text-ink font-semibold group-hover:text-accent transition-colors">
              {nextProject.title}
            </h4>
          </Link>
        </div>
      </div>
    </article>
  );
}
