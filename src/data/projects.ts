export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: "AI & SYSTEMS" | "SECURITY & WEB3" | "DATA & ARCHIVES" | "UI ARCHITECTURE";
  year: string;
  role: string;
  clientOrOrg: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string;
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  architectureNotes: string[];
  keyOutcomes: string[];
}

export const ALL_PROJECTS: Project[] = [
  {
    slug: "skill-bridge",
    title: "SkillBridge",
    subtitle: "AI Skill Mapping & Engineering Pathway Architecture",
    category: "AI & SYSTEMS",
    year: "2024",
    role: "Lead Frontend Architect",
    clientOrOrg: "Independent Engineering Lab",
    description:
      "Intelligent engineering career roadmap generator. Evaluates codebase competencies, constructs knowledge graphs, and charts actionable career progression.",
    longDescription:
      "SkillBridge addresses the opacity of developer competency growth. By ingesting public repository commits, PR reviews, and architectural contributions, the platform constructs an interactive directed acyclic graph (DAG) representing an engineer's true skill breadth. Built with sub-20ms client graph traversal and Next.js App Router streaming.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "OpenAI API", "Prisma", "Cytoscape.js"],
    metrics: "4.8× FASTER ONBOARDING",
    githubUrl: "https://github.com/siddiq/skill-bridge",
    liveUrl: "https://skillbridge.siddiq.dev",
    featured: true,
    architectureNotes: [
      "Client-side canvas rendering using Cytoscape.js and custom web workers to prevent main-thread UI jank during large graph iterations.",
      "Optimized Edge API routes streaming OpenAI competency assessments directly into structured JSON representations.",
      "Strict WCAG 2.1 AA accessibility implementation with complete screen-reader navigable keyboard trees.",
    ],
    keyOutcomes: [
      "Reduced senior-engineer onboarding mapping time from 3 weeks to under 4 days.",
      "Processed 14,000+ developer commit histories with zero memory leaks.",
      "Featured across internal enterprise technical roadmaps for engineering retention.",
    ],
  },
  {
    slug: "walletguard",
    title: "WalletGuard",
    subtitle: "Non-Custodial Vault & Security Telemetry Interface",
    category: "SECURITY & WEB3",
    year: "2024",
    role: "Security UI/UX Engineer",
    clientOrOrg: "Decentralized Security Guild",
    description:
      "High-assurance security client for web3 assets. Real-time transaction simulation, smart contract dry-runs, and instant drainer mitigation.",
    longDescription:
      "WalletGuard was engineered to protect digital asset custodians from malicious smart contract calls, phishing signatures, and approvals fraud. The UI simulates transaction state changes on a localized EVM fork in real time before signatures are broadcast, clearly visualizing net balance shifts and contract approval allowances.",
    tags: ["React 19", "Viem", "Wagmi", "Tailwind CSS", "Rust", "Ethers"],
    metrics: "0 COMPROMISED TRANSACTIONS",
    githubUrl: "https://github.com/siddiq/walletguard",
    liveUrl: "https://walletguard.siddiq.dev",
    featured: true,
    architectureNotes: [
      "Custom gas price predictive telemetry updating over persistent WebSockets with zero state cascade re-renders.",
      "Strict offline signature validation mode ensuring cryptographic isolation on air-gapped hardware wallets.",
      "Bespoke high-contrast design tokens alerting users instantly to risky permit2 or transferFrom allowances.",
    ],
    keyOutcomes: [
      "Protected over $4.2M in aggregate asset transactions across 1,800 active testing nodes.",
      "Identified and intercepted 32 zero-day malicious approval drainer scripts in public staging.",
      "Achieved sub-15ms visual feedback on complex multisig verification sequences.",
    ],
  },
  {
    slug: "coldcase",
    title: "ColdCase",
    subtitle: "Investigative Intelligence & Timeline Suite",
    category: "DATA & ARCHIVES",
    year: "2023",
    role: "Full-Stack UI Engineer",
    clientOrOrg: "Forensic Data Initiative",
    description:
      "Minimalist forensic analysis platform designed for complex timeline reconstruction, entity cross-referencing, and evidentiary document mapping.",
    longDescription:
      "ColdCase serves legal researchers and forensic journalists investigating complex, multi-decade documentation trails. It synthesizes disparate PDF depositions, police reports, and timestamped telephone logs into a unified, chronologically scrubs-able timeline with automated entity co-occurrence detection.",
    tags: ["Next.js", "SQLite", "Cytoscape.js", "Motion", "Tailwind CSS"],
    metrics: "SUB-50MS GRAPH QUERIES",
    githubUrl: "https://github.com/siddiq/coldcase",
    liveUrl: "https://coldcase.siddiq.dev",
    featured: true,
    architectureNotes: [
      "Integrated SQLite running directly in the browser via WebAssembly (Wasm) for complete offline data sovereignty and zero surveillance exposure.",
      "Scroll-driven timeline virtualization rendering 100,000+ timestamped records at consistent 60fps.",
      "Monochrome editorial UI architecture inspired by declassified governmental dossiers and archival typography.",
    ],
    keyOutcomes: [
      "Assisted 12 independent investigative teams in cross-indexing multi-terabyte evidentiary document collections.",
      "Decreased timeline reconciliation latency from days of manual spreadsheets to seconds of search.",
      "Zero server dependencies — total local privacy for sensitive investigations.",
    ],
  },
  {
    slug: "virasethu",
    title: "Virasethu",
    subtitle: "Digital Heritage Preservation & Archival Platform",
    category: "DATA & ARCHIVES",
    year: "2023",
    role: "Lead Frontend Architect",
    clientOrOrg: "Cultural Heritage Consortium",
    description:
      "Preservation interface for endangered historical manuscripts and architectural records. Features deep-zoom IIIF tiling and multilingual translation.",
    longDescription:
      "Virasethu is a digital repository built to catalog, preserve, and publicly exhibit fragile historical manuscripts and architectural ephemera. Utilizing the International Image Interoperability Framework (IIIF), researchers can zoom seamlessly into ultra-high-resolution multi-gigapixel scans with millimeter precision.",
    tags: ["Next.js", "PostgreSQL", "Cloudflare R2", "IIIF OpenSeadragon", "TypeScript"],
    metrics: "12,000+ DIGITIZED ARTIFACTS",
    githubUrl: "https://github.com/siddiq/virasethu",
    liveUrl: "https://virasethu.siddiq.dev",
    featured: true,
    architectureNotes: [
      "Deep-zoom viewport using OpenSeadragon integrated with React 19 concurrent features.",
      "Distributed asset edge caching through Cloudflare R2 and Workers to eliminate egress bandwidth fees.",
      "Bilingual typography pipeline rendering ancient Indic scripts alongside contemporary translation layers.",
    ],
    keyOutcomes: [
      "Archived over 12,000 rare palm-leaf and stone-inscription scans from 4 regional heritage institutions.",
      "Average image tile load time of under 85ms on international cellular connections.",
      "Adopted by 3 university humanities departments as their primary research visualization platform.",
    ],
  },
  {
    slug: "prism-tokens",
    title: "Prism Engine",
    subtitle: "Semantic Design Token Compiler & Runtime",
    category: "UI ARCHITECTURE",
    year: "2024",
    role: "Systems Designer & Author",
    clientOrOrg: "Open Source Tooling",
    description:
      "Zero-runtime design token synchronizer converting Figma variable collections into type-safe CSS custom properties and Tailwind presets.",
    longDescription:
      "Prism bridges the divide between Figma variables and production codebases. It automatically validates color contrast ratios, enforces WCAG AA compliance across both dark and light modes, and outputs immutable TypeScript declaration files alongside CSS variables.",
    tags: ["TypeScript", "Node.js", "Tailwind CSS", "Figma API", "AST Parsers"],
    metrics: "100% TYPE-SAFE TOKENS",
    githubUrl: "https://github.com/siddiq/prism-tokens",
    liveUrl: "https://prism.siddiq.dev",
    featured: false,
    architectureNotes: [
      "Abstract Syntax Tree (AST) transformer generating zero-overhead CSS custom property definitions.",
      "Automated CI contrast checker failing builds if any background/foreground pair drops below 4.5:1.",
      "Bidirectional sync notifying designers when engineer-defined component tokens deviate from design specs.",
    ],
    keyOutcomes: [
      "Eliminated token discrepancy bugs across 3 cross-functional design and frontend squads.",
      "Decreased theme token refactoring time from 2 weeks to 10 seconds of automated CLI execution.",
    ],
  },
  {
    slug: "chronoflow",
    title: "ChronoFlow",
    subtitle: "High-Throughput Time Series Event Orchestrator",
    category: "AI & SYSTEMS",
    year: "2023",
    role: "Frontend Engineer",
    clientOrOrg: "Enterprise Telemetry Client",
    description:
      "Real-time event streaming visualizer for distributed microservices. Features sub-frame canvas scrubbing and distributed trace correlation.",
    longDescription:
      "ChronoFlow processes high-velocity microservice event telemetry. Built to replace bloated observability tables with an editorial, intuitive trace timeline, allowing SREs and systems engineers to instantly pinpoint latency bottlenecks across complex distributed clusters.",
    tags: ["React", "HTML5 Canvas", "WebSockets", "TypeScript", "Tailwind CSS"],
    metrics: "60FPS CANVAS SCRUBBING",
    githubUrl: "https://github.com/siddiq/chronoflow",
    liveUrl: "https://chronoflow.siddiq.dev",
    featured: false,
    architectureNotes: [
      "Custom HTML5 Canvas rendering engine capable of plotting 50,000 discrete event spans per frame.",
      "Off-screen canvas buffering and requestAnimationFrame throttling ensuring zero garbage-collection stutter.",
      "Keyboard-first navigation model enabling SREs to inspect traces without leaving the terminal-inspired UI.",
    ],
    keyOutcomes: [
      "Accelerated root-cause incident analysis by 65% for a production fleet of 120 services.",
      "Maintained rock-solid 60fps frame rates even during heavy DDoS telemetry ingestion spikes.",
    ],
  },
];
