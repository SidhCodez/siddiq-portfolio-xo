"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-11 h-11 rounded-[2px] border border-transparent" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "Light mode (Porcelain)" : "Dark mode (Obsidian)"}`}
      className="flex items-center justify-center w-11 h-11 rounded-[2px] border border-border-surface bg-surface/60 text-ink hover:border-muted hover:text-accent transition-all duration-200 active:scale-95 focus:outline-none focus:ring-1 focus:ring-accent"
    >
      <span className="sr-only">Toggle Theme</span>
      {isDark ? (
        <Sun size={18} weight="regular" className="text-muted hover:text-accent transition-colors" />
      ) : (
        <Moon size={18} weight="regular" className="text-muted hover:text-accent transition-colors" />
      )}
    </button>
  );
}
