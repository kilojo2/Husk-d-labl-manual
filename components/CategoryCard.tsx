import Link from "next/link";
import { Icon } from "./Icon";
import type { ReactNode } from "react";

interface CategoryCardProps {
  title: string;
  icon: string;
  description: string;
  href: string;
  children?: ReactNode;
}

export default function CategoryCard({ title, icon, description, href, children }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group ds-card flex flex-col gap-3 p-5 transition-all duration-200 hover:border-accent/30 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon name={icon} size={18} />
        </div>
        <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
      {children && <div className="mt-1">{children}</div>}
    </Link>
  );
}
