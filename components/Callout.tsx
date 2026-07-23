import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { icons } from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "danger";

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutStyles: Record<CalloutType, { border: string; bg: string; icon: string; color: string }> = {
  info: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    icon: "Info",
    color: "text-blue-500",
  },
  warning: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    icon: "TriangleAlert",
    color: "text-amber-500",
  },
  success: {
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    icon: "CircleCheckBig",
    color: "text-green-500",
  },
  danger: {
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    icon: "OctagonAlert",
    color: "text-red-500",
  },
};

export default function Callout({ type, title, children }: CalloutProps) {
  const style = calloutStyles[type];

  return (
    <div className={`rounded-lg border ${style.border} ${style.bg} p-4 my-6`}>
      <div className="flex items-start gap-3">
        <Icon name={style.icon} className={`h-5 w-5 mt-0.5 shrink-0 ${style.color}`} />
        <div className="min-w-0">
          {title && <p className="font-medium text-sm mb-1 text-text-primary">{title}</p>}
          <div className="text-sm text-text-secondary">{children}</div>
        </div>
      </div>
    </div>
  );
}
