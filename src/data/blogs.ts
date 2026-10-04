export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  readTime: string;
  category: "DESIGN SYSTEMS" | "SECURITY & CRYPTO" | "PERFORMANCE" | "FRONTEND ARCHITECTURE";
  excerpt: string;
  tags: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      quote?: string;
      codeSnippet?: {
        language: string;
        code: string;
      };
    }[];
    conclusion: string;
  };
}

export const ALL_BLOGS: BlogPost[] = [
  {
    slug: "the-architecture-of-quiet-luxury",
    title: "The Architecture of Quiet Luxury in Frontend Engineering",
    subtitle: "Why deliberate restraint, intentional whitespace, and typographic contrast outlast ephemeral SaaS trends.",
    publishedAt: "FEB 18, 2026",
    readTime: "6 MIN READ",
    category: "DESIGN SYSTEMS",
    excerpt:
      "Modern web software is frequently overloaded with gratuitous glassmorphism, hyper-saturated gradients, and distracting micro-animations. An examination of why quiet luxury design principles create enduring digital interfaces.",
    tags: ["Quiet Luxury", "Design Systems", "Typography", "Editorial UI"],
    content: {
      intro:
        "Every few years, the frontend landscape undergoes a cyclical sensory overload. In the late 2010s, it was flat neomorphism; more recently, it has been the ubiquitous AI purple mesh gradient and edge-to-edge floating pills. Yet the digital products that command genuine authority — those that users return to with calm confidence — rarely participate in these ephemeral stylistic cycles.",
      sections: [
        {
          heading: "Restraint as an Engineering Feature",
          body: [
            "Quiet luxury in digital product design is not merely the absence of ornamentation; it is the intentional elevation of essential structure. When you strip away arbitrary background blurs and decorative badges, typography, spatial rhythm, and tactile responsiveness must carry the entire interface.",
            "Consider font contrast: rather than relying on heavy drop shadows to denote elevation, an editorial interface uses typographic hierarchy — pairing a high-contrast serif like Fraunces with an immaculate neutral grotesk like Inter. The hierarchy is communicated optically rather than decoratively.",
          ],
          quote: "If a component requires a gradient glow to draw user attention, its fundamental hierarchy was poorly conceived.",
        },
        {
          heading: "The Mathematical Rhythm of Macro-Whitespace",
          body: [
            "One of the most noticeable tells of hasty software design is cramped vertical padding. When section padding is constrained to 32px or 48px, the interface feels hurried and claustrophobic. By doubling section spacing to 96px or 128px, each content block functions as a deliberate architectural statement.",
            "Generous whitespace signals confidence. It informs the visitor that every element on the screen was positioned with purpose, allowing reading comprehension to rise and cognitive friction to dissipate.",
          ],
        },
        {
          heading: "Calibrated Color Discipline",
          body: [
            "In our Obsidian and Porcelain system, color is treated as a scarce economic resource. The deep obsidian background (#0F0C0D) and warm surface (#1A1416) provide a calm ground where the single Garnet accent (#C2434B) acts strictly as a signal.",
            "When color is restricted to critical actions and system status, users never have to second-guess where their attention should focus.",
          ],
          codeSnippet: {
            language: "css",
            code: `:root {
  --bg: #0F0C0D;      /* Obsidian ground */
  --surface: #1A1416; /* Structural cards */
  --ink: #F5EDE9;     /* 16.9:1 AAA contrast */
  --accent: #C2434B;  /* Garnet — deliberate signal */
  --muted: #B8A8A4;   /* Secondary hierarchy */
}`,
          },
        },
      ],
      conclusion:
        "Building digital products with quiet luxury is ultimately an act of respect toward your users. It honors their time, calms their nervous system, and provides an enduring foundation that will not look outdated when the next visual fad inevitably arrives.",
    },
  },
  {
    slug: "designing-zero-trust-web3-interfaces",
    title: "Designing Zero-Trust Web3 Interfaces",
    subtitle: "How cryptographic verification, transaction simulation, and editorial clarity combat approval fraud.",
    publishedAt: "JAN 29, 2026",
    readTime: "8 MIN READ",
    category: "SECURITY & CRYPTO",
    excerpt:
      "Web3 user interfaces frequently fail users by obscuring cryptographic state behind opaque hex hashes. Here is how we engineered WalletGuard's transparent transaction simulation pipeline.",
    tags: ["Web3", "Cryptography", "Security", "EVM", "React"],
    content: {
      intro:
        "The fundamental promise of decentralized cryptography is trustlessness — the ability to verify rather than blindly believe. Yet ironically, traditional crypto wallets present users with incomprehensible hex strings, misleading gas estimates, and obscure permit signatures that have caused billions in asset theft.",
      sections: [
        {
          heading: "The Threat Model of Opaque Signatures",
          body: [
            "Phishing smart contracts exploit the cognitive load of transaction confirmation dialogs. By concealing malicious 'setApprovalForAll' or 'permit2' allowances within complex multicall arrays, attackers fool users into surrendering wallet keys.",
            "To solve this, the frontend must intercept transaction requests before the user ever touches their hardware signer, running a local EVM dry-run to compute exact delta shifts in wallet balances.",
          ],
          quote: "Never show a raw hex calldata block when you can compute and visualize the exact net balance delta.",
        },
        {
          heading: "Simulating State Deltas on Local EVM Forks",
          body: [
            "In WalletGuard, we implemented an ephemeral simulation worker using Viem and Rust bindings. The worker executes the pending transaction in an isolated memory sandbox against the current block state, calculating exactly which tokens leave the address and which enter.",
          ],
          codeSnippet: {
            language: "typescript",
            code: `// Simulating smart contract execution delta before user signing
export async function simulateTransactionSafety(
  txRequest: TransactionRequest
): Promise<SimulationResult> {
  const simulation = await evmFork.traceCall({
    to: txRequest.to,
    data: txRequest.data,
    value: txRequest.value,
  });

  return analyzeStateDeltas(simulation.stateDiff);
}`,
          },
        },
        {
          heading: "High-Contrast Visual Warnings",
          body: [
            "When high-risk permissions are detected, the UI immediately shifts from calm neutral tones to a high-contrast garnet warning indicator. By restricting this alarm state to genuine cryptographic threats, alert fatigue is prevented while critical assets remain strictly protected.",
          ],
        },
      ],
      conclusion:
        "Security in web3 is as much a design challenge as an algorithmic one. By combining real-time state simulation with crisp, legible typography, we can build interfaces that make digital asset custody intuitive, transparent, and resilient.",
    },
  },
  {
    slug: "sub-second-lcp-in-nextjs-15",
    title: "Achieving Sub-Second LCP in Next.js 15 App Router",
    subtitle: "Architectural techniques for eliminating layout shifts, optimizing font loading, and streaming server components.",
    publishedAt: "JAN 12, 2026",
    readTime: "7 MIN READ",
    category: "PERFORMANCE",
    excerpt:
      "A deep technical breakdown of how we achieved a 0.8s Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS) on high-typography editorial portfolio sites.",
    tags: ["Next.js 15", "Performance", "Web Vitals", "LCP", "CSS"],
    content: {
      intro:
        "Speed is an invisible luxury. An interface that loads in under 800 milliseconds communicates competence before the user has even read the first sentence. But maintaining this performance while serving custom display serifs and rich interactive graphs requires deliberate frontend architecture.",
      sections: [
        {
          heading: "The Danger of Viewport Layout Shifts (CLS)",
          body: [
            "A frequent pitfall in modern portfolio design is the misuse of 'h-screen' for full-viewport hero sections. On mobile browsers (such as iOS Safari), dynamic browser chrome recalculates '100vh' continuously during scroll, causing noticeable visual jumps.",
            "By transitioning to 'min-h-[100dvh]' and establishing static image/text bounding boxes before component hydration, Cumulative Layout Shift is reduced to a pristine 0.00.",
          ],
          codeSnippet: {
            language: "tsx",
            code: `// Avoid h-screen jumping on mobile Safari address bars
<section className="min-h-[100dvh] flex flex-col justify-center px-6">
  {/* Content renders without layout shifts */}
</section>`,
          },
        },
        {
          heading: "Zero-Flash Font Optimization with next/font",
          body: [
            "Display typography should never flash with FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text). Next.js 15 font optimization automatically self-hosts Google Fonts and inlines critical font fallbacks directly into the initial HTML response.",
            "Pairing this with CSS font-display: swap ensures that the initial DOM paint matches the exact typographic bounding box, preventing text reflows when the variable font finishes decoding.",
          ],
          quote: "Zero layout shift is achieved when your fallback font metrics match your primary display font dimensions.",
        },
        {
          heading: "Streaming Leaves and Interactive Isolation",
          body: [
            "Global client wrappers often drag unnecessary client-side JavaScript into server components. We isolate interactivity strictly to terminal leaf components (like ThemeToggle and ScrollReveal), allowing the vast majority of the document to render as pure static HTML.",
          ],
        },
      ],
      conclusion:
        "Performance optimization is not an afterthought to apply before launch; it is the structural spine upon which all subsequent aesthetic and UX decisions must rest.",
    },
  },
  {
    slug: "fluid-physics-over-react-state",
    title: "Fluid Physics Over React State: Micro-Interactions That Breathe",
    subtitle: "Why tracking continuous scroll and mouse gestures in React state kills mobile FPS, and how to fix it.",
    publishedAt: "DEC 20, 2025",
    readTime: "5 MIN READ",
    category: "FRONTEND ARCHITECTURE",
    excerpt:
      "Why calling setState inside mousemove or scroll listeners destroys 60fps frame budgets, and how Motion values decouple kinetic animation from the React reconciliation loop.",
    tags: ["Motion", "Physics", "React 19", "Animation", "GPU"],
    content: {
      intro:
        "Nothing betrays an amateur frontend build faster than janky micro-interactions. A button hover that stutters or a scroll parallax that drops frames on mobile ruins the perception of quality regardless of how sophisticated the underlying code may be.",
      sections: [
        {
          heading: "The Re-Render Catastrophe",
          body: [
            "When developers attach 'useState' to continuous events like 'window.onscroll' or pointer coordinates, React is forced to re-evaluate the entire virtual DOM tree 60 to 120 times every second. On low-power mobile devices, the main thread collapses under the weight of continuous garbage collection and reconciliation.",
          ],
          quote: "Continuous motion must live entirely outside the React render cycle.",
        },
        {
          heading: "Decoupled Motion Values and GPU Transforms",
          body: [
            "The proper approach is to utilize Motion values ('useMotionValue' and 'useTransform') that manipulate GPU-accelerated CSS transforms directly via hardware compositing, bypassing React component renders entirely.",
          ],
          codeSnippet: {
            language: "typescript",
            code: `import { useMotionValue, useTransform } from "motion/react";

// Continuous coordinate tracking without causing component re-renders
const mouseX = useMotionValue(0);
const rotate = useTransform(mouseX, [-200, 200], [-8, 8]);`,
          },
        },
        {
          heading: "Spring Physics vs Linear Easing",
          body: [
            "Natural objects in the physical world do not accelerate and stop abruptly on linear easing curves. By parameterizing animations with spring physics (stiffness: 100, damping: 20), digital elements feel tactile, weighted, and responsive.",
          ],
        },
      ],
      conclusion:
        "When micro-interactions simulate real-world mass and spring mechanics without blocking the JavaScript main thread, software stops feeling like a webpage and begins feeling like machined digital hardware.",
    },
  },
];
