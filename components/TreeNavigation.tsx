"use client";

import { navigationSections } from "@/lib/navigation";
import NavSection from "./NavSection";

interface TreeNavigationProps {
  onNavigate?: () => void;
}

export default function TreeNavigation({ onNavigate }: TreeNavigationProps) {
  return (
    <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Sidebar navigation">
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
