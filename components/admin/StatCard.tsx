// === FILE: components/admin/StatCard.tsx ===

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  accent?: "blue" | "green" | "amber" | "slate";
}

const accentMap = {
  blue: "text-blue-600 bg-blue-50",
  green: "text-green-600 bg-green-50",
  amber: "text-amber-600 bg-amber-50",
  slate: "text-slate-600 bg-slate-100",
};

/** Displays a single KPI metric with icon, value, title, and optional subtitle. */
const StatCard = ({ title, value, subtitle, icon, accent = "blue" }: StatCardProps) => (
  <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
    <div className="flex items-start justify-between mb-4">
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <span className={cn("flex items-center justify-center w-9 h-9 rounded-lg", accentMap[accent])}>
        {icon}
      </span>
    </div>
    <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
    {subtitle && <p className="text-xs text-slate-400 mt-1 truncate">{subtitle}</p>}
  </div>
);

export default StatCard;
