import Link from "next/link";
import { Icon } from "./Icon";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-xs text-text-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-text-secondary">
            <Icon name="house" size={14} />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <Icon name="chevron-right" size={12} className="text-text-muted/50" />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-text-secondary">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-secondary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
