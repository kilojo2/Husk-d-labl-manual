import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IconProps extends LucideProps {
  name: string;
}

/**
 * Converts kebab-case to PascalCase so that names like "external-link"
 * resolve to "ExternalLink" in the lucide-react icons map.
 */
function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function Icon({ name, ...props }: IconProps) {
  // Try the name as-is first, then convert kebab-case to PascalCase
  const iconKey = (icons[name as keyof typeof icons]
    ? name
    : toPascalCase(name)) as keyof typeof icons;

  const LucideIcon = icons[iconKey];

  if (!LucideIcon) {
    // Fallback: render a placeholder if icon name isn't found
    return <span style={{ width: props.size || 20, height: props.size || 20 }} />;
  }
  return <LucideIcon {...props} />;
}
