// === FILE: components/admin/RegistrationsTable.tsx ===

"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, Users } from "lucide-react";
import type { Registration } from "@/lib/types";
import { getTrackDisplayName } from "@/lib/types";
import { cn } from "@/lib/utils";
import FilterBar, { type Filters } from "./FilterBar";
import LaptopBadge from "./LaptopBadge";
import Pagination from "./Pagination";
import ExportButton from "./ExportButton";

interface RegistrationsTableProps {
  registrations: Registration[];
  showFilters?: boolean;
  showExport?: boolean;
  maxRows?: number;
}

type SortKey = keyof Registration;
type SortDir = "asc" | "desc";

const PAGE_SIZE = 25;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Sortable, filterable, paginated table of event registrations. Client-side processing. */
const RegistrationsTable = ({
  registrations,
  showFilters = true,
  showExport = false,
  maxRows,
}: RegistrationsTableProps) => {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    search: "",
    track: "",
    status: "",
    laptop: "",
  });
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase();
    return registrations.filter((r) => {
      if (q && !r.full_name.toLowerCase().includes(q) && !r.email.toLowerCase().includes(q))
        return false;
      if (filters.track && r.selected_track !== filters.track) return false;
      if (filters.status && r.current_status !== filters.status) return false;
      if (filters.laptop && r.has_laptop !== filters.laptop) return false;
      return true;
    });
  }, [registrations, filters]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const rows = maxRows ? sorted.slice(0, maxRows) : sorted;
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageRows = maxRows ? rows : rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (col !== sortKey) return <ChevronUp className="w-3 h-3 opacity-20" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 text-blue-600" />
    ) : (
      <ChevronDown className="w-3 h-3 text-blue-600" />
    );
  };

  const Th = ({
    col,
    label,
    className,
  }: {
    col: SortKey;
    label: string;
    className?: string;
  }) => (
    <th
      scope="col"
      onClick={() => handleSort(col)}
      className={cn(
        "px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide cursor-pointer select-none hover:text-slate-700 transition-colors",
        className
      )}
    >
      <span className="flex items-center gap-1">
        {label}
        <SortIcon col={col} />
      </span>
    </th>
  );

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <FilterBar
            filters={filters}
            onChange={(f) => {
              setFilters(f);
              setPage(1);
            }}
          />
          {showExport && <ExportButton />}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          <strong className="text-slate-700">{filtered.length}</strong> registration
          {filtered.length !== 1 ? "s" : ""} found
        </span>
        {!maxRows && totalPages > 1 && (
          <span>
            Page {page} of {totalPages}
          </span>
        )}
      </div>

      {pageRows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-slate-200 bg-white">
          <Users className="w-10 h-10 text-slate-300 mb-3" />
          <p className="text-sm font-medium text-slate-500">No registrations match your filters</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting the search or filter criteria</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide w-8">
                    #
                  </th>
                  <Th col="full_name" label="Full Name" />
                  <Th col="email" label="Email" className="hidden md:table-cell" />
                  <Th col="selected_track" label="Track" />
                  <Th col="state_of_origin" label="State" className="hidden lg:table-cell" />
                  <Th col="current_status" label="Status" className="hidden lg:table-cell" />
                  <Th col="has_laptop" label="Laptop" className="hidden xl:table-cell" />
                  <Th col="created_at" label="Registered" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pageRows.map((r, idx) => (
                  <tr
                    key={r.id}
                    onClick={() => router.push(`/admin/registrations/${r.id}`)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {maxRows ? idx + 1 : (page - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900 truncate max-w-[160px]">
                        {r.full_name}
                      </p>
                      <p className="text-xs text-slate-400 md:hidden truncate">{r.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 hidden md:table-cell max-w-[180px]">
                      <span className="truncate block">{r.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-100 max-w-[140px] truncate">
                        {getTrackDisplayName(r.selected_track)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 hidden lg:table-cell">
                      {r.state_of_origin}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 hidden lg:table-cell">
                      {r.current_status}
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <LaptopBadge value={r.has_laptop} />
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                      {formatDate(r.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!maxRows && totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default RegistrationsTable;
