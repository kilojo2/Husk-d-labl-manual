"use client";

import { useState } from "react";
import SFSymbol from "./SFSymbol";
import { sanitizeSearchQuery } from "@/lib/sanitize";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize on every keystroke to prevent XSS
    const sanitized = sanitizeSearchQuery(e.target.value);
    setQuery(sanitized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sanitize again on submit for defense-in-depth
    const safeQuery = sanitizeSearchQuery(query);
    if (!safeQuery) return;
    // TODO: Integrate Algolia search in a later stage
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm" role="search">
      <div className="relative">
        <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
          <SFSymbol name="magnifyingglass" size={16} />
        </div>
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Поиск по справочнику..."
          className="w-full rounded-full border border-border bg-bg-surface/80 py-2 pl-10 pr-4 text-sm text-text-primary placeholder-text-muted transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 apple-shadow-sm"
          aria-label="Поиск по справочнику"
          autoComplete="off"
          maxLength={200}
        />
      </div>
    </form>
  );
}
