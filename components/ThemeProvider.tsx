"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { ThemeId, AccentId } from "@/lib/themes";

interface ThemeContextType {
  theme: ThemeId | "system";
  accent: AccentId;
  resolvedTheme: ThemeId;
  setTheme: (theme: ThemeId | "system") => void;
  setAccent: (accent: AccentId) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function getSystemTheme(): ThemeId {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(stored: string | null): ThemeId | "system" {
  if (stored === "light" || stored === "dark" || stored === "midnight" || stored === "graphite" || stored === "system") {
    return stored;
  }
  return "system";
}

function resolveAccent(stored: string | null): AccentId {
  if (stored === "purple" || stored === "blue" || stored === "green" || stored === "orange" || stored === "red") {
    return stored;
  }
  return "purple";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId | "system">("system");
  const [accent, setAccentState] = useState<AccentId>("purple");
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const storedTheme = resolveTheme(localStorage.getItem("hl-theme"));
    const storedAccent = resolveAccent(localStorage.getItem("hl-accent"));
    setThemeState(storedTheme);
    setAccentState(storedAccent);
    setMounted(true);
  }, []);

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  // Apply data attributes to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);
    root.setAttribute("data-accent", accent);
  }, [resolvedTheme, accent]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const root = document.documentElement;
      root.setAttribute("data-theme", getSystemTheme());
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeId | "system") => {
    setThemeState(newTheme);
    localStorage.setItem("hl-theme", newTheme);
  }, []);

  const setAccent = useCallback((newAccent: AccentId) => {
    setAccentState(newAccent);
    localStorage.setItem("hl-accent", newAccent);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, accent, resolvedTheme, setTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
