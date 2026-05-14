// === FILE: components/admin/TrackBreakdownChart.tsx ===

"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { TrackStats } from "@/lib/types";

interface TrackBreakdownChartProps {
  data: TrackStats[];
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: TrackStats }[];
}) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 text-sm">
      <p className="font-semibold text-slate-900 mb-0.5">{item.trackName}</p>
      <p className="text-slate-500">
        <span className="text-blue-600 font-bold">{item.count}</span> registrant
        {item.count !== 1 ? "s" : ""}{" "}
        <span className="text-slate-400">({item.percentage}%)</span>
      </p>
    </div>
  );
};

/** Horizontal bar chart showing registration count per skill track. */
const TrackBreakdownChart = ({ data }: TrackBreakdownChartProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const chartData = data
    .filter((d) => d.count > 0)
    .slice(0, 15)
    .map((d) => ({ ...d, name: d.trackName }));

  if (!mounted) {
    return (
      <div
        className="h-96 animate-pulse bg-slate-100 rounded-xl"
        aria-label="Loading track breakdown chart"
      />
    );
  }

  return (
    <div aria-label="Horizontal bar chart showing registrations per skill track">
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 4, right: 32, left: 8, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={180}
            tick={{ fontSize: 11, fill: "#64748B" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={index === 0 ? "#2563EB" : index < 3 ? "#3B82F6" : "#93C5FD"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrackBreakdownChart;
