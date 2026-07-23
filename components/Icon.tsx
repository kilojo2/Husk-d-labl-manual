import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons];
  if (!LucideIcon) {
    // Fallback: render a placeholder if icon name isn't found
    return <span style={{ width: props.size || 20, height: props.size || 20 }} />;
  }
  return <LucideIcon {...props} />;
}
