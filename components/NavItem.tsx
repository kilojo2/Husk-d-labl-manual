"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem as NavItemType } from "@/lib/navigation";

interface NavItemProps {
  item: NavItemType;
  onNavigate?: () => void;
}

export default function NavItem({ item, onNavigate }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`
        group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150
        ${
          isActive
            ? "bg-accent-muted text-accent"
            : "text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary"
        }
      `}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={`
          h-1.5 w-1.5 rounded-full transition-all duration-150
          ${isActive ? "bg-accent" : "bg-border group-hover:bg-text-muted"}
        `}
      />
      <span>{item.title}</span>
    </Link>
  );
}
