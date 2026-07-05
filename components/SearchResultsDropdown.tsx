"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import SFSymbol from "./SFSymbol";
import type { SearchResult } from "@/lib/search-index";

interface SearchResultsDropdownProps {
  results: SearchResult[];
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
}

/** Append the search query as a URL parameter so the target page can highlight matches */
function hrefWithQuery(href: string, query: string): string {
  const q = encodeURIComponent(query.trim());
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}q=${q}`;
}

export default function SearchResultsDropdown({
  results,
  query,
  isOpen,
  onClose,
  onSelect,
}: SearchResultsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay to avoid immediate close from the same click that opened it
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || query.trim().length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border/50 bg-bg-surface/90 backdrop-blur-2xl apple-shadow-lg"
      role="listbox"
      aria-label="Результаты поиска"
    >
      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
          <div className="text-text-muted">
            <SFSymbol name="magnifyingglass" size={24} />
          </div>
          <p className="text-sm text-text-muted">
            Ничего не найдено по запросу &laquo;{query}&raquo;
          </p>
          <p className="text-xs text-text-muted/60">
            Попробуйте другие ключевые слова
          </p>
        </div>
      ) : (
        <ul className="max-h-[60vh] overflow-y-auto py-2">
          {results.map((result, i) => (
            <li key={result.href}>
              <Link
                href={hrefWithQuery(result.href, query)}
                onClick={onSelect}
                className="flex items-start gap-3 px-4 py-3 transition-colors duration-150 hover:bg-accent/10 focus:bg-accent/10 focus:outline-none"
                role="option"
                aria-selected={i === 0}
                tabIndex={0}
              >
                {/* Section badge */}
                <span className="mt-0.5 flex h-6 shrink-0 items-center rounded-full bg-accent/15 px-2 text-[10px] font-medium uppercase tracking-wider text-accent">
                  {getSectionShort(result.section)}
                </span>

                <div className="min-w-0 flex-1">
                  {/* Title */}
                  <p className="truncate text-sm font-medium text-text-primary">
                    {highlightMatches(result.title, query)}
                  </p>

                  {/* Snippet */}
                  <p className="mt-0.5 truncate text-xs text-text-muted">
                    {highlightMatches(result.snippet, query)}
                  </p>
                </div>

                {/* Arrow */}
                <div className="mt-0.5 shrink-0 text-text-muted/40">
                  <SFSymbol name="chevron.right" size={14} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Footer hint */}
      {results.length > 0 && (
        <div className="border-t border-border/30 px-4 py-2 text-center text-[10px] text-text-muted/40">
          {results.length}&nbsp;результатов&nbsp;· Enter&nbsp;для&nbsp;перехода
        </div>
      )}
    </div>
  );
}

/** Short label for the section badge */
function getSectionShort(section: string): string {
  switch (section) {
    case "Начало работы":
      return "Старт";
    case "Середина работы":
      return "Работа";
    case "Профессиональный режим":
      return "Профи";
    default:
      return section.slice(0, 4);
  }
}

/**
 * Highlight words from the query inside the text.
 * Wraps matched spans in <mark> tags.
 */
function highlightMatches(text: string, query: string): React.ReactNode {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (words.length === 0) return text;

  const pattern = new RegExp(`(${words.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    words.some((w) => part.toLowerCase() === w) ? (
      <mark
        key={i}
        className="rounded-sm bg-accent/30 px-0.5 text-text-primary"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
