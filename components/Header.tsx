"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[52px] items-center border-b border-border bg-bg-primary px-4 gap-4 md:px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary md:hidden"
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
        className="flex shrink-0 items-center gap-2.5 text-sm font-semibold text-text-primary"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-white">
          HL
        </span>
        <span className="hidden sm:inline">Husk'd Lab Manuals</span>
      </Link>

      {/* Search bar */}
      <div className="flex flex-1 justify-end md:justify-center">
        <SearchBar />
      </div>

      {/* Theme switcher */}
      <ThemeSwitcher />
    </header>
  );
}
