"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { search, type SearchResult } from "@/lib/search-index";

interface SearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setResults(search(query));
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        onClose();
        window.location.href = results[selectedIndex].href;
      }
    },
    [results, selectedIndex, onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh",
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "rgba(28,28,30,0.98)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Поиск инструкций..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <kbd style={{
            padding: "2px 6px",
            borderRadius: "4px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.3)",
            fontSize: "11px",
            fontWeight: 500,
          }}>
            Esc
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div style={{ padding: "8px" }}>
            {/* Section header */}
            <div style={{
              padding: "6px 12px 4px",
              fontSize: "11px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
              Инструкции
            </div>
            {results.map((result, idx) => (
              <Link
                key={idx}
                href={result.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: idx === selectedIndex ? "rgba(99,102,241,0.12)" : "transparent",
                  textDecoration: "none",
                  transition: "background 0.1s",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "2px",
                  }}>
                    {result.title}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {result.snippet}
                  </div>
                </div>
                <span style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.25)",
                  whiteSpace: "nowrap",
                  marginTop: "2px",
                }}>
                  {result.section}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query && results.length === 0 && (
          <div style={{
            padding: "32px",
            textAlign: "center",
            color: "rgba(255,255,255,0.3)",
            fontSize: "14px",
          }}>
            Ничего не найдено по запросу «{query}»
          </div>
        )}

        {/* Footer hint */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "10px 20px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.25)",
        }}>
          <span>↑ ↓ Навигация</span>
          <span>↵ Открыть</span>
          <span>Esc Закрыть</span>
        </div>
      </div>
    </div>
  );
}

export { search };