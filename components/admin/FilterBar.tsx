// === FILE: components/admin/FilterBar.tsx ===

"use client";

import { Search, X } from "lucide-react";
import { TRACKS } from "@/lib/tracks-data";
import { CURRENT_STATUSES, LAPTOP_OPTIONS } from "@/lib/registration-schema";

export interface Filters {
  search: string;
  track: string;
  status: string;
  laptop: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const hasActiveFilters = (f: Filters) =>
  f.search !== "" || f.track !== "" || f.status !== "" || f.laptop !== "";

/** Search and multi-filter controls for the registrations table. */
const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  const clear = () =>
    onChange({ search: "", track: "", status: "", laptop: "" });

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-52">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search name or email…"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
        />
      </div>

      {/* Track filter */}
      <select
        value={filters.track}
        onChange={(e) => update({ track: e.target.value })}
        className="rounded-lg border border-slate-200 text-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-slate-700"
      >
        <option value="">All Tracks</option>
        {TRACKS.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
        <option value="other">Other (Suggested)</option>
      </select>

      {/* Status filter */}
      <select
        value={filters.status}
        onChange={(e) => update({ status: e.target.value })}
        className="rounded-lg border border-slate-200 text-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-slate-700"
      >
        <option value="">All Statuses</option>
        {CURRENT_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Laptop filter */}
      <select
        value={filters.laptop}
        onChange={(e) => update({ laptop: e.target.value })}
        className="rounded-lg border border-slate-200 text-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-slate-700"
      >
        <option value="">All (Laptop)</option>
        {LAPTOP_OPTIONS.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      {/* Clear */}
      {hasActiveFilters(filters) && (
        <button
          onClick={clear}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  );
};

export default FilterBar;
