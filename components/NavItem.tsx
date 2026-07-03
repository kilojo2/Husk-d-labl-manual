"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem as NavItemType } from "@/lib/navigation";
import SFSymbol from "./SFSymbol";

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
        group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-gradient-to-r from-accent to-[#5AC8FA] text-white apple-shadow-sm"
            : "text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary"
        }
      `}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={`flex items-center justify-center ${isActive ? "text-white/90" : "text-text-muted group-hover:text-text-secondary"}`}>
        <SFSymbol name={item.icon} size={16} />
      </span>
      <span>{item.title}</span>
    </Link>
  );
}
