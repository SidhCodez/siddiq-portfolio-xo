import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="light"]'],
  theme: {
    extend: {
      colors: {
        // Design System Palette Tokens
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        accent: "var(--accent)",
        muted: "var(--muted)",

        // Specific named hex codes for reference
        obsidian: "#0F0C0D",
        porcelain: "#FBF5F3",
        garnet: {
          dark: "#C2434B",
          light: "#7A1E26",
        },

        // Borders
        "border-subtle": "var(--border-subtle)",
        "border-surface": "var(--border-surface)",
        "border-strong": "var(--border-strong)",
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
        button: "0.14em",
        display: "-0.02em",
      },
      borderRadius: {
        btn: "2px",
        card: "3px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
