import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { SiteIntro } from "@/components/site-intro";
import { JsonLd } from "@/components/structured-data";
import { getAllPostMeta } from "@/lib/blog";
import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

// Fonts are self-hosted: the Google Fonts loader fetches CSS at build time, which
// makes deploys fail whenever that request is blocked or rate-limited.
const fraunces = localFont({
  src: [
    {
      path: "./fonts/fraunces-latin-var.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/fraunces-latin-var-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const inter = localFont({
  src: [
    {
      path: "./fonts/inter-latin-var.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s — Siddiq",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Siddiq",
    "Frontend Engineer",
    "UI/UX Designer",
    "Next.js Portfolio",
    "React Developer",
    "Design Systems",
    "TypeScript",
    "Web Performance",
    "Web3 Security",
    "Fraunces",
    "Inter",
    "Garnet",
  ],
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0F0C0D" },
    { media: "(prefers-color-scheme: light)", color: "#FBF5F3" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR.name,
  url: AUTHOR.url,
  jobTitle: AUTHOR.jobTitle,
  email: `mailto:${AUTHOR.email}`,
  sameAs: [AUTHOR.github, AUTHOR.linkedin],
  knowsAbout: [
    "Frontend Engineering",
    "UI/UX Design",
    "Design Systems",
    "Next.js",
    "React",
    "TypeScript",
    "Web Performance",
    "Web3 Security",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  author: {
    "@type": "Person",
    name: AUTHOR.name,
    url: AUTHOR.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchPosts = getAllPostMeta().map(
    ({ slug, title, subtitle, category, tags }) => ({
      slug,
      title,
      subtitle,
      category,
      tags,
    })
  );

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-bg text-ink antialiased selection:bg-accent selection:text-bg transition-colors duration-300">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />

        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <main
            id="main-content"
            tabIndex={-1}
            className="relative min-h-[100dvh] pt-20 md:pt-24 focus:outline-none"
          >
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Global ⌘K command palette */}
          <CommandPalette posts={searchPosts} />

          {/* Privacy-friendly Vercel analytics */}
          <Analytics />

          {/* First-load liquid glass brand intro */}
          <SiteIntro />
        </ThemeProvider>
      </body>
    </html>
  );
}
