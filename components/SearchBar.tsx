"use client";

import { useState, useCallback, useRef, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import SFSymbol from "./SFSymbol";
import SearchResultsDropdown from "./SearchResultsDropdown";
import { sanitizeSearchQuery } from "@/lib/sanitize";
import { search, type SearchResult } from "@/lib/search-index";

interface SearchBarProps {
  /** "header" — компактное поле в шапке; "hero" — крупное поле на главной */
  variant?: "header" | "hero";
}

export default function SearchBar({ variant = "header" }: SearchBarProps) {
  const isHero = variant === "hero";
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsId = useId();

  /** Navigate to a page with the search query as a URL parameter */
  const navigateWithQuery = useCallback(
    (href: string) => {
      const q = encodeURIComponent(query.trim());
      const separator = href.includes("?") ? "&" : "?";
      router.push(`${href}${separator}q=${q}`);
    },
    [query, router],
  );

  const performSearch = useCallback((q: string) => {
    const trimmed = q.trim();
    if (trimmed.length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const res = search(trimmed);
    setResults(res);
    setIsOpen(true);
    setSelectedIndex(-1);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize on every keystroke to prevent XSS
    const sanitized = sanitizeSearchQuery(e.target.value);
    setQuery(sanitized);

    // Debounce search: 150ms after user stops typing
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(sanitized);
    }, 150);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const safeQuery = sanitizeSearchQuery(query);
    if (!safeQuery) return;

    // If there's a selected result, navigate to it with query
    if (selectedIndex >= 0 && selectedIndex < results.length) {
      const selected = results[selectedIndex];
      closeDropdown();
      navigateWithQuery(selected.href);
      return;
    }

    // Otherwise navigate to the first result if available
    if (results.length > 0) {
      closeDropdown();
      navigateWithQuery(results[0].href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1,
        );
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
    }
  };

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(-1);
  }, []);

  const handleSelect = useCallback(() => {
    closeDropdown();
    setQuery("");
    setResults([]);
  }, [closeDropdown]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full ${isHero ? "max-w-none" : "max-w-sm"}`}
      role="search"
    >
      <div className="relative">
        <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-text-secondary ${isHero ? "left-5" : "left-3.5"}`}>
          <SFSymbol name="magnifyingglass" size={isHero ? 20 : 16} />
        </div>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Поиск по справочнику..."
          className={`w-full rounded-full border border-border bg-bg-surface/80 text-text-primary placeholder-text-muted transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${
            isHero
              ? "py-4 pl-12 pr-4 text-base apple-glass apple-shadow-md"
              : "py-2 pl-10 pr-4 text-sm apple-shadow-sm"
          }`}
          role="combobox"
          aria-label="Поиск по справочнику"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={resultsId}
          autoComplete="off"
          maxLength={200}
        />
      </div>

      <div id={resultsId}>
        <SearchResultsDropdown
          results={results}
          query={query}
          isOpen={isOpen}
          onClose={closeDropdown}
          onSelect={handleSelect}
        />
      </div>
    </form>
  );
}
