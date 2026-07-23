"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Icon } from "./Icon";
import { themeNames, accentColors, type AccentId } from "@/lib/themes";

export default function ThemeSwitcher() {
  const { theme, accent, setTheme, setAccent } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const themeLabel = theme === "system" ? "System" : themeNames.find((t) => t.id === theme)?.label ?? "System";

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
        aria-label="Theme settings"
      >
        <Icon name="Palette" size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-bg-primary shadow-lg">
          {/* Theme selector */}
          <div className="p-2">
            <p className="px-2 py-1 text-xs font-medium uppercase tracking-wider text-text-muted">
              Theme
            </p>
            {themeNames.map((t) => {
              const isActive = theme === t.id || (theme === "system" && t.id === "dark" && false);
              const isSystem = theme === "system" && t.id === "dark";
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                    theme === t.id
                      ? "bg-accent-subtle text-accent font-medium"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      theme === t.id ? "border-accent bg-accent" : "border-border"
                    }`}
                  >
                    {theme === t.id && (
                      <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {t.label}
                </button>
              );
            })}
            <button
              onClick={() => setTheme("system")}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                theme === "system"
                  ? "bg-accent-subtle text-accent font-medium"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  theme === "system" ? "border-accent bg-accent" : "border-border"
                }`}
              >
                {theme === "system" && (
                  <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              System
            </button>
          </div>

          {/* Divider */}
          <div className="mx-2 border-t border-border" />

          {/* Accent color picker */}
          <div className="p-2">
            <p className="px-2 py-1 text-xs font-medium uppercase tracking-wider text-text-muted">
              Accent
            </p>
            <div className="flex gap-1.5 px-2 py-1.5">
              {(Object.entries(accentColors) as [AccentId, typeof accentColors.purple][]).map(([id, color]) => (
                <button
                  key={id}
                  onClick={() => setAccent(id)}
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                    accent === id ? "ring-2 ring-offset-1 ring-offset-bg-primary" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                  title={color.name}
                >
                  {accent === id && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
