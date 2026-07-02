"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-bg-primary/95 px-4 backdrop-blur-sm md:px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary md:hidden"
        aria-label={isSidebarOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Logo */}
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2 text-lg font-bold text-text-primary"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-white">
          HL
        </span>
        <span className="hidden sm:inline">Husk'd Labl Manuals</span>
      </Link>

      {/* Search bar */}
      <div className="flex flex-1 justify-end md:justify-center">
        <SearchBar />
      </div>
    </header>
  );
}
