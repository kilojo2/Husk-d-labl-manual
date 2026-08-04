"use client";

import Link from "next/link";
import { navigationSections } from "@/lib/navigation";
import NavSection from "./NavSection";
import SFSymbol from "./SFSymbol";

interface TreeNavigationProps {
  onNavigate?: () => void;
}

export default function TreeNavigation({ onNavigate }: TreeNavigationProps) {
  return (
    <nav className="flex flex-col gap-1.5 px-1.5 py-3" aria-label="Sidebar navigation">
      {/* Главное меню */}
      <Link
        href="/"
        onClick={onNavigate}
        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-accent hover:bg-accent/5 transition-all duration-150"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 group-hover:bg-accent/15 transition-colors">
          <SFSymbol name="house.fill" size={16} className="text-accent" />
        </span>
        Главное меню
      </Link>

      <div className="h-px mx-2 bg-border/40" />

      {navigationSections.map((section) => (
        <NavSection
          key={section.title}
          section={section}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}