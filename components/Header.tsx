"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-3 z-30 mx-4 flex h-12 items-center gap-4 rounded-2xl apple-glass-strong apple-shadow-md px-4 md:mx-6 md:px-5">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-surface-hover hover:text-text-primary md:hidden"
        aria-label={isSidebarOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Logo */}
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2.5 text-base font-semibold text-text-primary"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white apple-shadow-sm">
          HL
        </span>
        <span className="hidden sm:inline">Husk&apos;d Labl Manuals</span>
      </Link>

      {/* Search bar */}
      <div className="flex flex-1 justify-end md:justify-center">
        <SearchBar />
      </div>
    </header>
  );
}
