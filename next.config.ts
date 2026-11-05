import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "coresg-normal.trae.ai",
      },
    ],
  },
  async redirects() {
    return [
      // The case-study slugs changed when the real projects replaced placeholders.
      {
        source: "/projects/skill-bridge",
        destination: "/projects/skillbridge",
        permanent: true,
      },
      { source: "/projects/walletguard", destination: "/projects", permanent: true },
      { source: "/projects/virasethu", destination: "/projects", permanent: true },
      { source: "/projects/prism-tokens", destination: "/projects", permanent: true },
      { source: "/projects/chronoflow", destination: "/projects", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // The service worker must always be revalidated so updates ship.
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/icons/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
