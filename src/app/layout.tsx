import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { isMaintenanceModeEnabled } from "@/config/maintenance";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = isMaintenanceModeEnabled()
  ? {
      title: "Building what's next — Siddiq",
      description:
        "Portfolio temporarily unavailable. I'm currently working behind the scenes on a few improvements to my portfolio.",
      robots: {
        index: false,
        follow: false,
      },
    }
  : {
      title: "Siddiq — Developer & Designer",
      description:
        "Personal portfolio of Siddiq. Specialized in high-performance frontend engineering, disciplined UI systems, and quiet digital craft.",
      keywords: [
        "Siddiq",
        "Frontend Engineer",
        "UI/UX Designer",
        "Next.js Portfolio",
        "Fraunces",
        "Inter",
        "Garnet",
      ],
      authors: [{ name: "Siddiq" }],
    };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenance = isMaintenanceModeEnabled();

  if (isMaintenance) {
    return (
      <html
        lang="en"
        data-theme="dark"
        suppressHydrationWarning
        className={`${fraunces.variable} ${inter.variable}`}
      >
        <body
          suppressHydrationWarning
          className="min-h-screen bg-[#0F0C0D] text-[#F5EDE9] antialiased selection:bg-[#C2434B] selection:text-[#0F0C0D]"
        >
          {children}
        </body>
      </html>
    );
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-bg text-ink antialiased selection:bg-accent selection:text-bg transition-colors duration-300"
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <main className="relative min-h-[100dvh] pt-20 md:pt-24">{children}</main>

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
