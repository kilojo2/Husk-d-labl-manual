"use client";

import { useState, useRef, useEffect } from "react";
import { themes, type ThemeId } from "@/lib/themes";

interface ThemeSwitcherProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<ThemeId | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
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

  const current = themes.find((t) => t.id === currentTheme) ?? themes[0];

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50">
      {/* Tooltip for hovered theme */}
      {hoveredTheme && !isOpen && (
        <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg bg-bg-surface px-3 py-1.5 text-sm text-text-primary shadow-lg ring-1 ring-border">
          {themes.find((t) => t.id === hoveredTheme)?.label}
          <div className="absolute right-4 top-full h-2 w-2 rotate-45 bg-bg-surface" />
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setHoveredTheme(currentTheme)}
        onMouseLeave={() => setHoveredTheme(null)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-lg font-bold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-accent/40 active:scale-95"
        aria-label="Переключить тему"
      >
        {current.icon}
      </button>

      {/* Theme selection menu */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-4 flex flex-col gap-2">
          {themes.map((theme) => {
            const isActive = theme.id === currentTheme;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme.id);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHoveredTheme(theme.id)}
                onMouseLeave={() => setHoveredTheme(null)}
                className={`group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
                  isActive
                    ? "bg-accent text-white shadow-accent/30"
                    : "bg-bg-surface/90 text-text-secondary ring-1 ring-border hover:bg-bg-surface hover:text-text-primary"
                }`}
              >
                <span className="text-lg">{theme.icon}</span>
                <span className="whitespace-nowrap">{theme.label}</span>
                {isActive && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
