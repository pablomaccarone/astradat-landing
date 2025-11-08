"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ThemeMode = "dark" | "light";

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "dark";
  }
  const stored = window.localStorage.getItem("astradat-theme");
  return stored === "light" || stored === "dark" ? (stored as ThemeMode) : "dark";
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("astradat-theme", theme);
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={cn(
        "relative flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition",
        "border-[color-mix(in_srgb,var(--text-primary)_15%,transparent)]",
        "bg-[color-mix(in_srgb,var(--surface-strong)_90%,transparent)]",
        "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      )}
      aria-label="Toggle theme"
    >
      <span className="text-xs uppercase tracking-[0.18em]">{isLight ? "Light" : "Dark"}</span>
      <div className="relative h-6 w-11 rounded-full border border-[color-mix(in_srgb,var(--text-primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--surface)_70%,var(--accent-night)_30%)]">
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--accent-mint)] shadow-[0_0_12px_rgba(91,251,162,0.6)]"
          style={{
            left: isLight ? "calc(100% - 1.25rem)" : "0.25rem",
          }}
        />
      </div>
    </button>
  );
}
