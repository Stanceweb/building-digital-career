// === FILE: components/admin/LaptopBadge.tsx ===

import { cn } from "@/lib/utils";

interface LaptopBadgeProps {
  value: string;
}

const styleMap: Record<string, string> = {
  Yes: "bg-green-50 text-green-700 ring-1 ring-green-200",
  No: "bg-red-50 text-red-700 ring-1 ring-red-200",
  "I'll borrow one": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
};

/** Renders a colored badge for the has_laptop field. */
const LaptopBadge = ({ value }: LaptopBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      styleMap[value] ?? "bg-slate-100 text-slate-600"
    )}
  >
    {value}
  </span>
);

export default LaptopBadge;
