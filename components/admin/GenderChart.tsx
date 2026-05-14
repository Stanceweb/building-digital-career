// === FILE: components/admin/GenderChart.tsx ===

"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Registration } from "@/lib/types";

interface GenderChartProps {
  registrations: Registration[];
}

const COLORS: Record<string, string> = {
  Male: "#2563EB",
  Female: "#EC4899",
  "Prefer not to say": "#94A3B8",
};

const FALLBACK_COLORS = ["#2563EB", "#EC4899", "#94A3B8", "#F59E0B", "#10B981"];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { percentage: number } }[];
}) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 text-sm">
      <p className="font-semibold text-slate-900">{item.name}</p>
      <p className="text-slate-500">
        <span className="font-bold text-blue-600">{item.value}</span> registrants
        {" "}({item.payload.percentage}%)
      </p>
    </div>
  );
};

/** Donut chart showing gender split across all registrants. */
const GenderChart = ({ registrations }: GenderChartProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const total = registrations.length;

  const counts: Record<string, number> = {};
  for (const r of registrations) {
    counts[r.gender] = (counts[r.gender] ?? 0) + 1;
  }

  const data = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
    percentage: total > 0 ? parseFloat(((value / total) * 100).toFixed(1)) : 0,
  }));

  if (!mounted) {
    return (
      <div
        className="h-64 animate-pulse bg-slate-100 rounded-xl"
        aria-label="Loading gender chart"
      />
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-slate-400">
        No data yet
      </div>
    );
  }

  return (
    <div aria-label="Donut chart showing gender distribution of registrants">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-xs text-slate-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderChart;
