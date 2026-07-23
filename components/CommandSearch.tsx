"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icon";
import { search, type SearchResult } from "@/lib/search-index";
import { sanitizeSearchQuery } from "@/lib/sanitize";

export default function CommandSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeSearchQuery(e.target.value);
    setQuery(sanitized);
    setSelectedIndex(0);
    if (sanitized.trim().length === 0) {
      setResults([]);
      return;
    }
    const res = search(sanitized.trim());
    setResults(res);
  };

  const navigate = useCallback(
    (href: string) => {
      setIsOpen(false);
      const q = encodeURIComponent(query.trim());
      const separator = href.includes("?") ? "&" : "?";
      router.push(`${href}${separator}q=${q}`);
    },
    [query, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) navigate(results[selectedIndex].href);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Поиск по справочнику"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl rounded-xl border border-border bg-bg-primary shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Icon name="search" size={18} className="shrink-0 text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Поиск по справочнику..."
            className="flex-1 bg-transparent py-4 text-base text-text-primary outline-none placeholder:text-text-muted"
            autoComplete="off"
            maxLength={200}
          />
          <kbd className="hidden shrink-0 rounded-md border border-border bg-bg-secondary px-2 py-0.5 text-[11px] text-text-muted sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim().length > 0 && results.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
              <Icon name="search-x" size={28} className="text-text-muted" />
              <p className="text-sm text-text-muted">
                Ничего не найдено по запросу &laquo;{query}&raquo;
              </p>
              <p className="text-xs text-text-muted/60">
                Попробуйте другие ключевые слова
              </p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="py-2" role="listbox">
              {results.map((result, i) => (
                <li key={result.href} role="option" aria-selected={i === selectedIndex}>
                  <button
                    onClick={() => navigate(result.href)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-100 ${
                      i === selectedIndex
                        ? "bg-accent/10 text-accent"
                        : "text-text-primary hover:bg-bg-secondary"
                    }`}
                  >
                    <span className="flex h-6 shrink-0 items-center rounded-full bg-accent/15 px-2 text-[10px] font-medium uppercase tracking-wider text-accent">
                      {getSectionShort(result.section)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{result.title}</p>
                      <p className="truncate text-xs text-text-muted/70">{result.snippet}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {query.trim().length === 0 && (
            <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
              <Icon name="search" size={28} className="text-text-muted" />
              <p className="text-sm text-text-muted">Начните вводить запрос для поиска</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="border-t border-border px-4 py-2 text-center text-[10px] text-text-muted/60">
            {results.length}&nbsp;результатов&nbsp;· ↑↓&nbsp;для&nbsp;навигации&nbsp;· Enter&nbsp;для&nbsp;перехода
          </div>
        )}
      </div>
    </div>
  );
}

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
