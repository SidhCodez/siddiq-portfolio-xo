export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: "AI & SYSTEMS" | "SECURITY & WEB3" | "DATA & ARCHIVES" | "UI ARCHITECTURE";
  year: string;
  role: string;
  clientOrOrg: string;
  /** Controls display order across the homepage and case-study pagination. */
  displayOrder: number;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string;
  githubUrl: string;
  /** Omitted when a project is deliberately headless or app-only. */
  liveUrl?: string;
  featured?: boolean;
  architectureNotes: string[];
  keyOutcomes: string[];
}

export const ALL_PROJECTS: Project[] = [
  {
    slug: "skillbridge",
    title: "SkillBridge",
    subtitle: "Verified skill. Real proof. Real opportunity.",
    category: "AI & SYSTEMS",
    year: "2026",
    role: "Collaborative Dev Team",
    clientOrOrg: "Hackathon MVP",
    displayOrder: 1,
    description:
      "Verified skill portfolio platform: students submit real project work, mentors verify and auto-award badges, recruiters search only mentor-approved proof — one trusted chain from submission to hire.",
    longDescription:
      "SkillBridge closes the gap between learning in class and proving skill for a job. Students submit real project work or solve mentor-posted problems — technical challenges in an in-browser Monaco editor, non-technical ones as case studies. Mentors review from a live, real-time queue, and approving a submission automatically issues a verified badge for every tagged skill. Recruiters then search a badge-indexed surface where only mentor-approved work exists, making the trust boundary structural rather than cosmetic. A client-heavy React + Firebase SPA carries ~90% of CRUD directly to a security-rules-enforced Realtime Database, with a single Groq-powered Cloud Function for the AI problem assistant and Gemini for ATS-style resume scoring — the whole loop built to run clean during a live demo.",
    tags: ["React 18", "Vite 5", "Firebase", "Tailwind CSS", "Monaco Editor", "Groq API"],
    metrics: "100% MENTOR-VERIFIED PROOF ONLY",
    githubUrl: "https://github.com/debojit-dev0/SkillBridge",
    liveUrl: "https://skillbridge-fawn-six.vercel.app/",
    featured: true,
    architectureNotes: [
      "Client-heavy SPA + BaaS — ~90% of CRUD (submit, review, badge, problem, profile) is a direct Firebase SDK read/write against a Realtime Database, with security rules — not frontend checks — as the real enforcement layer; no custom Express/Node server.",
      "One deliberate server-side exception — the AI problem assistant needs a GROQ_API_KEY that must never reach the client bundle, so it runs through a single Firebase Cloud Function (chatAssist) that verifies the caller's Firebase ID token and restricts role to student.",
      "Badge-first data model — recruiters query the badges/ collection, which is only written on mentor approval, so the trust boundary is structural rather than a UI filter; real-time onValue listeners drive the mentor review queue so pending submissions appear without refresh.",
    ],
    keyOutcomes: [
      "Full submit → verify → badge → discover loop runs end-to-end across three role-scoped dashboards (student, mentor, recruiter), built explicitly to survive a live presentation.",
      "Recruiter search returns only mentor-approved, badge-indexed skills — self-reported resume claims are structurally excluded from results, not hidden by a toggle.",
      "Mentor approval auto-issues a verified badge per tagged skill in one action, collapsing review and credentialing; the AI companion adds a persisted ATS score + pros/cons/suggestions history per student.",
    ],
  },
  {
    slug: "coldcase",
    title: "ColdCase",
    subtitle: "Git blame tells you who. ColdCase tells you why, with receipts.",
    category: "AI & SYSTEMS",
    year: "2026",
    role: "AI-Agent-Built Monorepo",
    clientOrOrg: "Hackathon MVP",
    displayOrder: 2,
    description:
      "Autonomous forensic analysis pipeline that explains why code looks the way it does — every AI claim linked to a verbatim receipt from commits, PRs, or issues. Evidence or silence.",
    longDescription:
      "ColdCase answers the question git blame cannot: why does this code look this way? It is an autonomous forensic pipeline that clones a repository, ranks hotspots, maps every line to a commit SHA, then fetches the associated pull requests, issues, and review comments from GitHub. Groq drafts per-file narratives in parallel; Gemini synthesizes repository-wide eras from the full evidence ledger. Crucially, a deterministic quote-checker drops any AI claim whose quote does not exist verbatim in the cited history, and a pure TypeScript confidence engine grades what survives. Eight trust invariants run before a case file is saved, so the exported JSON snapshot contains only receipt-backed explanations, viewable offline in a fast React viewer.",
    tags: ["Node.js", "React 18", "TypeScript", "Groq", "Gemini", "SQLite (WASM)"],
    metrics: "EVERY CLAIM HAS A RECEIPT",
    githubUrl: "https://github.com/SidhCodez/ColdCase.git",
    liveUrl: "https://coldcase-dot.antideploy.com",
    featured: true,
    architectureNotes: [
      "Deterministic verification sits outside the LLM — packages/core holds pure, unit-tested TypeScript for schemas, quote-checking, and confidence scoring; the 14-step Node pipeline can only export a case after 8 trust invariants confirm every claim carries a verbatim quote that exists in the cited GitHub data.",
      "Model routing by workload shape — Groq/Llama 3 70B handles dozens of per-file stories in parallel for speed, while Gemini 1.5 Pro ingests the entire evidence ledger at once for repository-wide Eras synthesis; both are downstream of the quote-checker, so neither can promote an unbacked claim.",
      "Cache-backed, offline-first artifacts — a local WebAssembly SQLite cache prevents over-querying GitHub during analysis, and the output is a portable JSON snapshot hostable on a static CDN, so the React viewer needs zero network calls to render a case file.",
    ],
    keyOutcomes: [
      "Every explanation in the UI carries clickable receipts that open an Evidence Drawer showing the exact verbatim quote from the original PR, commit, or issue; unbacked claims are destroyed before a case is saved.",
      "Confidence is never self-reported by an AI — a pure, unit-tested TypeScript function assigns HIGH / MEDIUM / LOW / NONE strictly from the presence of verified receipts.",
      "Pasting any public GitHub URL triggers live clone-and-analyze, producing a portable JSON snapshot that passes 8 trust invariants before export and can be hosted statically and viewed offline.",
    ],
  },
  {
    slug: "resumind",
    title: "ResumeMind",
    subtitle: "Upload a PDF. Get a structured ATS report.",
    category: "AI & SYSTEMS",
    year: "2026",
    role: "Solo Developer",
    clientOrOrg: "Mini Project",
    displayOrder: 3,
    description:
      "Client-side AI resume analyzer: upload a PDF, store it in Puter cloud, and get a structured ATS and feedback report with scores, category breakdowns, and actionable tips.",
    longDescription:
      "ResumeMind is a fully client-side AI resume reviewer built with React 19, TypeScript, and Puter.js. A user uploads a PDF through a drag-and-drop zone; the file is stored in Puter FS, its first page is rendered to a PNG preview via pdfjs-dist, and a placeholder record is written to Puter KV before analysis begins. The resume is then sent to Puter AI (gpt-4o-mini) with a strict instruction prompt that demands only valid JSON — no markdown fences — covering ATS compatibility, tone and style, content, structure, and skills. The response is cleaned, parsed, and saved back to KV, then rendered as a scored report with expandable tips. Authentication, storage, and AI all run through Puter, so the app ships with no backend and no API keys.",
    tags: ["React 19", "TypeScript", "Puter.js", "Tailwind CSS", "pdfjs-dist", "Zustand"],
    metrics: "ZERO BACKEND. FULL ATS REPORT.",
    githubUrl: "https://github.com/SidhCodez/Resumind-smart-analyzer.git",
    liveUrl: "https://resumind-smart-analyzer.vercel.app/",
    featured: true,
    architectureNotes: [
      "Fully client-side SPA with no server code — Puter.js is loaded as a global browser script and wrapped in a single Zustand store (src/lib/puter.ts) exposing auth, fs, ai, and kv; there is no backend session management and no API key in the app.",
      "Two-artifact upload pipeline — every upload produces both the original PDF in Puter FS (resumePath) and a high-resolution first-page PNG preview (imagePath) generated by pdfjs-dist, with a placeholder resume:<id> KV record written before AI analysis so the record exists even if analysis fails.",
      "Strict prompt-to-JSON contract — prepareInstructions.ts builds an instruction prompt requiring only valid JSON with no markdown fences, including optional job title and description; the response is normalized, fence-stripped, JSON.parse'd, and written back to KV, with parse failures surfaced as user-facing errors rather than silent bad data.",
    ],
    keyOutcomes: [
      "Authentication, file storage, KV persistence, and AI calls all run through Puter client-side — the app needs no backend server or API keys, and user data belongs to the signed-in Puter account.",
      "A complete upload-to-report flow: PDF upload → cloud storage → PNG preview generation → placeholder KV record → AI analysis → parsed feedback saved to KV → navigation to /resume/<id> with scores and expandable category tips.",
      "A dedicated Wipe page deletes all root cloud files and all resume:* KV records in one confirmed action, giving users a full data-cleanup path rather than per-item deletion.",
    ],
  },
  {
    slug: "brain-dev",
    title: "Brain Dot",
    subtitle: "Telegram → Cloudflare Worker → GitHub → Obsidian. Zero servers.",
    category: "AI & SYSTEMS",
    year: "2026",
    role: "Creator & Maintainer",
    clientOrOrg: "Personal Build (SidhCodez)",
    displayOrder: 4,
    description:
      "Frictionless capture inbox: message a Telegram bot and a Cloudflare Worker commits it as a timestamped, ID-tagged Markdown entry straight into your Obsidian vault via GitHub. No server, no paid tier.",
    longDescription:
      "Brain Dot turns a Telegram message into a permanent, searchable Obsidian note in under two seconds. A Cloudflare Worker receives the webhook, authenticates it against a secret header, confirms the sender's chat ID against an allowlist, stamps a per-day sequential ID (LOG-20260923-01) and a local-time timestamp, then read-modify-writes the entry into a daily Markdown file in a private GitHub repo — retrying on stale-SHA conflicts so concurrent messages are never lost. Obsidian Git pulls on a five-minute interval, and the entry simply appears. The entire Worker is ~130 lines in a single file with no build step, no dependencies, and no bundler. Every message is a commit, and every service involved sits inside a free tier.",
    tags: ["Cloudflare Workers", "Cloudflare KV", "Telegram Bot API", "GitHub API", "Wrangler", "Obsidian"],
    metrics: "EVERY MESSAGE IS A COMMIT",
    githubUrl: "https://github.com/SidhCodez/brain_dev_dot.git",
    featured: true,
    architectureNotes: [
      "Single-file Worker, no build step — the whole pipeline lives in src/index.js with zero dependencies and no bundler config; wrangler deploy uploads the file directly, so there is nothing to maintain, patch, or keep warm.",
      "SHA-aware read-modify-write with backoff retry — the GitHub Contents API requires the current sha to update a file, so the Worker fetches the file, captures the SHA, appends, then PUTs — retrying up to four times on 409/422 so a second message arriving mid-write re-reads and succeeds instead of being dropped.",
      "Four independent defence layers, secrets never in code — webhook secret-token header verification rejects anyone who finds the Worker URL; a chat-ID allowlist silently 200s strangers probing the bot; the GitHub token is fine-grained to Contents-only on one repo; and all four secrets live in Cloudflare via wrangler secret put, with wrangler.toml holding only non-secret values.",
    ],
    keyOutcomes: [
      "$0/month in practice — Telegram unlimited, Workers 100k req/day (~20 used), KV 1k writes/day (~40 used), unlimited private repos; roughly 2 KV writes per message against a free tier that would need several thousand messages/day to approach.",
      "Two-second capture from anywhere — a message returns Saved LOG-YYYYMMDD-NN in 1–2 seconds, with failure replies naming the failing layer (GitHub read 403, 401, 404) instead of a generic error.",
      "Correct-by-construction entries — local-timezone stamping via a configurable offset keeps a 9pm message in today's file, leading # characters are escaped so a message can't break Markdown structure, and UTF-8 is preserved via base64 + escape/unescape so emoji and non-Latin scripts survive intact.",
    ],
  },
  {
    slug: "alchemy-docs",
    title: "Alchemy Docs",
    subtitle: "The ultimate prompt framework for hackathons, builders, and creators.",
    category: "DATA & ARCHIVES",
    year: "2026",
    role: "Creator & Maintainer",
    clientOrOrg: "Personal / Hackathon Alchemy",
    displayOrder: 5,
    description:
      "Production-grade docs-as-code platform on mdBook hosting structured prompt frameworks — 20 categories, 4 phases, 330+ prompt packs — with instant client-side search, dark/light themes, and one-click prompt copy.",
    longDescription:
      "Alchemy Docs is a production-grade documentation platform built on mdBook that turns a sprawling prompt framework into a fast, searchable static site. Pure Markdown source files in the repo compile to an ultra-fast static website, with global search handled entirely client-side by elasticlunr.js — no server index, no query backend. A custom theme delivers dark and light modes, responsive typography, and one-click copy buttons so prompts drop straight into Claude, ChatGPT, or Cursor. A GitHub Actions pipeline runs build and link verification before Vercel deploys on every push to main. The result is docs-as-code in the strict sense: content is the source of truth, the build is reproducible, and deployment is zero-touch — currently hosting Hackathon Alchemy's 20 categories, 4 phases, and 330+ prompt packs, with Builder Alchemy staged as the next framework.",
    tags: ["mdBook", "Markdown", "elasticlunr.js", "Custom CSS", "GitHub Actions", "Vercel"],
    metrics: "330+ PROMPT PACKS, 20 CATEGORIES",
    githubUrl: "https://github.com/SidhCodez/Alechemy-Docs.git",
    liveUrl: "https://alechemydocs.vercel.app/",
    featured: false,
    architectureNotes: [
      "Docs-as-code with no runtime backend — all content is pure Markdown under docs/src/, compiled by mdBook into an ultra-fast static site; there is no CMS, no database, and no server-side rendering path, so the repository itself is the single source of truth.",
      "Client-side-only search — global search is powered by elasticlunr.js, with the index shipped to the browser, eliminating any search backend or query service while keeping instant results across the full prompt corpus.",
      "CI-gated, zero-touch deployment — a GitHub Actions workflow runs the build and mdbook-linkcheck before Vercel deploys on every push to main, so broken links and build failures are caught in CI rather than in production.",
    ],
    keyOutcomes: [
      "Hackathon Alchemy is fully organized into 20 categories across 4 phases with 330+ prompt packs, structured under docs/src/hackathon-alchemy/ and navigable via SUMMARY.md; Builder Alchemy is staged as the next framework.",
      "Prompt consumption is one click — one-click copy buttons let prompts move directly into Claude, ChatGPT, or Cursor, backed by a custom dark/light responsive theme engineered against UI_SPEC.md.",
      "Deployment is automated and link-verified — GitHub Actions builds and runs link checking on every push, and Vercel distributes the output to its global CDN via vercel.json with no manual deploy step.",
    ],
  },
  {
    slug: "keel",
    title: "Keel",
    subtitle: "Pick up exactly where you stopped, and see honestly where you slipped.",
    category: "UI ARCHITECTURE",
    year: "2026",
    role: "Solo Developer & Mobile Architect",
    clientOrOrg: "Personal Project",
    displayOrder: 6,
    description:
      "Offline-first Android app unifying project tracking, habit streaks, and a hard-locked journal — with 2-tap resume, honest slip metrics, and timestamp deep-links. 100% on-device SQLite, zero cloud.",
    longDescription:
      "Keel replaces the three-tool juggle — Notion for content, Trello for buckets, HabitNow for streaks — with one offline-first Android app. Its north star is 2-tap resume: a Continue Card shows your last active project with its exact marker (Stopped at: 14:32, Page 84), and one tap opens the link at that timestamp while starting the timer. Projects auto-bucket by deadline so nothing is dragged manually, and every postponement increments a visible slip count — procrastination becomes a number rather than a feeling. A journal enforces a 10-minute hard lock through back-button interception, keep-awake, and native screen pinning, resetting the clock if you background the app. All business logic lives in pure, 100%-covered TypeScript functions over a local SQLite database.",
    tags: ["Expo", "React Native", "SQLite", "Drizzle ORM", "Zustand", "NativeWind"],
    metrics: "2 TAPS FROM COLD START TO RESUME",
    githubUrl: "https://github.com/SidhCodez/keel.git",
    featured: false,
    architectureNotes: [
      "Pure functions own every business rule — bucket allocation, streak/freeze computation, daily target, slip metrics, and YouTube timestamp parsing all live in /src/rules/ as dependency-free, side-effect-free TypeScript at 100% Jest coverage, so the app's correctness is testable without a device or a database.",
      "Timers are timestamps, not intervals — sessions persist started_at + accumulated_ms to SQLite rather than counting with setInterval, which eliminates clock drift and survives app kill, OS reclamation, and device reboot; a 3-hour guard auto-pauses runaway sessions and logs auto_paused_by_guard: true so analytics stay honest.",
      "Four independent defence layers on the journal lock — BackHandler interception, expo-keep-awake, native startLockTask() screen pinning, and a reset-to-10:00 penalty on backgrounding; the draft is autosaved throughout, so only the clock resets, never the writing — one uninterrupted block is enforced.",
    ],
    keyOutcomes: [
      "The north star is an executable acceptance test — cold start → Continue Card → tap Resume → YouTube opens at the stored marker and the timer starts, asserting total taps from launch = 2.",
      "₹0 lifetime cost, verifiable line by line — MIT-licensed Expo, React Native, SQLite, Drizzle, NativeWind and react-native-svg, plus free Android Studio, local Gradle builds, and free private GitHub hosting: no subscriptions, no API keys, no server.",
      "User sovereignty is a shipped feature, not a policy — complete database export/import as Zod-validated, schema-versioned JSON with atomic transactional restore, on a database that never leaves the device (no auth, no cloud, no AI).",
    ],
  },
];

/** Case studies ordered by their explicit displayOrder. */
export const PROJECTS_BY_ORDER = [...ALL_PROJECTS].sort(
  (a, b) => a.displayOrder - b.displayOrder
);

/** Projects promoted to the homepage (featured first, capped at four). */
export const FEATURED_PROJECTS = PROJECTS_BY_ORDER.filter(
  (project) => project.featured
).slice(0, 4);
