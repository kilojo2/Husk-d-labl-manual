"use client";

import { useState, useRef, useEffect } from "react";
import { themes, type ThemeId } from "@/lib/themes";
import SFSymbol from "./SFSymbol";

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
        <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-xl bg-white px-3.5 py-2 text-sm font-medium text-[#1D1D1F] apple-shadow-md ring-1 ring-black/5">
          {themes.find((t) => t.id === hoveredTheme)?.label}
          <div className="absolute right-4 top-full h-2 w-2 rotate-45 bg-white" />
        </div>
      )}

      {/* Main toggle button — iOS-style rounded square icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setHoveredTheme(currentTheme)}
        onMouseLeave={() => setHoveredTheme(null)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl text-white apple-shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
        style={{ background: current.iconBg }}
        aria-label="Переключить тему"
      >
        <SFSymbol name={current.icon} size={20} className="text-white" />
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
                className={`group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium apple-shadow-sm backdrop-blur-xl transition-all duration-200 hover:scale-105 ${
                  isActive
                    ? "bg-accent text-white shadow-accent/20"
                    : "bg-[var(--color-surface,#fff)]/90 text-text-secondary ring-1 ring-[var(--color-border,rgba(0,0,0,0.1))] hover:bg-[var(--color-surface,#fff)] hover:text-text-primary"
                }`}
              >
                {/* iOS-style rounded square icon */}
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-[7px] text-white"
                  style={{ background: theme.iconBg }}
                >
                  <SFSymbol name={theme.icon} size={14} className="text-white" />
                </span>
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
