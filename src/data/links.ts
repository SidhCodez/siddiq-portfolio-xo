export type LinkCategory = "TALKS" | "RESOURCES";

export interface CuratedLink {
  title: string;
  url: string;
  source: string;
  note: string;
}

export interface LinkCollection {
  id: string;
  category: LinkCategory;
  title: string;
  blurb: string;
  links: CuratedLink[];
}

export const LINK_CATEGORIES: LinkCategory[] = ["TALKS", "RESOURCES"];

/**
 * Hand-picked links, grouped into collections.
 *
 * Two kinds of entries live here:
 * - TALKS — recorded talks and lectures worth watching
 * - RESOURCES — docs, tools, references and archives worth keeping
 */
export const LINK_COLLECTIONS: LinkCollection[] = [
  {
    id: "craft",
    category: "TALKS",
    title: "Craft & code",
    blurb:
      "Talks about software as a creative medium — the part that has nothing to do with frameworks.",
    links: [
      {
        title: "The Art of Code",
        url: "https://www.youtube.com/watch?v=6avJHaC3C2U",
        source: "Dylan Beattie · YouTube",
        note: "A tour of code as an expressive craft, from esolangs to Conway's Game of Life.",
      },
      {
        title: "Rethinking Reactivity",
        url: "https://www.youtube.com/watch?v=AdNJ3fydeao",
        source: "Rich Harris · YouTube",
        note: "Why granular reactivity changes the mental model of a UI framework.",
      },
      {
        title: "In the Loop",
        url: "https://www.youtube.com/watch?v=cCOL7MC4Pl0",
        source: "Jake Archibald · JSConf Asia",
        note: "The event loop, task queues and rendering, explained with live demos.",
      },
      {
        title: "The Cost of JavaScript",
        url: "https://www.youtube.com/watch?v=63I-mEuSvGA",
        source: "Addy Osmani · Fluent",
        note: "What bytes actually cost once parse, compile and execution are counted.",
      },
    ],
  },
  {
    id: "ideas-systems",
    category: "TALKS",
    title: "Ideas & systems",
    blurb:
      "Lectures that reframe how you think about tools, interfaces and the work itself.",
    links: [
      {
        title: "Inventing on Principle",
        url: "https://www.youtube.com/watch?v=PUv66718DII",
        source: "Bret Victor · YouTube",
        note: "Why creators need immediate, visible feedback — and what tools should do about it.",
      },
      {
        title: "How to Speak",
        url: "https://www.youtube.com/watch?v=Unzc731iCUY",
        source: "Patrick Winston · MIT OpenCourseWare",
        note: "The classic MIT lecture on presenting ideas so people actually remember them.",
      },
      {
        title: "Stop Writing Dead Programs",
        url: "https://www.youtube.com/watch?v=8Ab3ArE8W3s",
        source: "Jack Rusher · Strange Loop",
        note: "A case for live, inspectable programming environments.",
      },
      {
        title: "The Mess We're In",
        url: "https://www.youtube.com/watch?v=lKXe3HUG2l4",
        source: "Joe Armstrong · Strange Loop",
        note: "A candid history of how our computing stack got so complicated.",
      },
    ],
  },
  {
    id: "docs",
    category: "RESOURCES",
    title: "Docs & references",
    blurb:
      "The documentation I keep returning to — the files that stay pinned in the browser.",
    links: [
      {
        title: "Next.js Documentation",
        url: "https://nextjs.org/docs",
        source: "nextjs.org",
        note: "App Router, server components, caching and deployment reference.",
      },
      {
        title: "React Reference",
        url: "https://react.dev/reference/react",
        source: "react.dev",
        note: "Canonical API docs, hooks and the rules of React.",
      },
      {
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        source: "developer.mozilla.org",
        note: "The baseline for HTML, CSS, JavaScript and platform APIs.",
      },
      {
        title: "Web Vitals",
        url: "https://web.dev/vitals/",
        source: "web.dev",
        note: "How LCP, INP and CLS are measured, and what counts as good.",
      },
    ],
  },
  {
    id: "motion-tools",
    category: "RESOURCES",
    title: "Motion & interface tools",
    blurb:
      "Libraries and primitives for interfaces that move without dropping frames.",
    links: [
      {
        title: "Motion",
        url: "https://motion.dev",
        source: "motion.dev",
        note: "The animation library formerly known as Framer Motion.",
      },
      {
        title: "Phosphor Icons",
        url: "https://phosphoricons.com",
        source: "phosphoricons.com",
        note: "The icon family used across this site, in six weights.",
      },
      {
        title: "Tailwind CSS",
        url: "https://tailwindcss.com/docs",
        source: "tailwindcss.com",
        note: "Utility-first CSS reference — spacing, typography and variants.",
      },
      {
        title: "View Transitions API",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API",
        source: "MDN",
        note: "Native cross-document and same-document transition primitives.",
      },
    ],
  },
  {
    id: "security",
    category: "RESOURCES",
    title: "Security & web3",
    blurb:
      "Reading material for interfaces that have to be trustworthy, not just pretty.",
    links: [
      {
        title: "OWASP Top Ten",
        url: "https://owasp.org/www-project-top-ten/",
        source: "owasp.org",
        note: "The baseline risk model for anything that touches user data.",
      },
      {
        title: "Viem",
        url: "https://viem.sh",
        source: "viem.sh",
        note: "Type-safe Ethereum primitives — clients, contracts and simulation.",
      },
      {
        title: "Ethereum Developer Docs",
        url: "https://ethereum.org/en/developers/docs/",
        source: "ethereum.org",
        note: "EVM, accounts, transactions and smart contract fundamentals.",
      },
    ],
  },
  {
    id: "archives",
    category: "RESOURCES",
    title: "Archives & inspiration",
    blurb:
      "Catalogues and indexes to browse when the work needs a wider frame of reference.",
    links: [
      {
        title: "Sansser Catalogue",
        url: "https://sansser.com/link",
        source: "sansser.com",
        note: "The reference for this page: free AI tools tested and grouped into collections.",
      },
      {
        title: "Godly",
        url: "https://godly.website",
        source: "godly.website",
        note: "A curated feed of astronomically good web design.",
      },
      {
        title: "Minimal Gallery",
        url: "https://minimal.gallery",
        source: "minimal.gallery",
        note: "A quiet archive of minimal, typography-led websites.",
      },
      {
        title: "HTTPster",
        url: "https://httpster.net",
        source: "httpster.net",
        note: "A long-running showcase of distinctive, well-built sites.",
      },
    ],
  },
];

export function getLinkCount(collections: LinkCollection[] = LINK_COLLECTIONS) {
  return collections.reduce((total, collection) => total + collection.links.length, 0);
}
