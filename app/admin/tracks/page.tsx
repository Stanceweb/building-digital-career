// === FILE: app/admin/tracks/page.tsx ===

import { getAllRegistrations } from "@/lib/supabase-admin";
import { computeTrackStats } from "@/lib/types";
import TrackBreakdownChart from "@/components/admin/TrackBreakdownChart";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Track Analytics — BDC Admin" };
export const revalidate = 60;

const MEDAL: Record<number, string> = { 0: "🥇", 1: "🥈", 2: "🥉" };

/** Track analytics page — full bar chart and ranked summary table with laptop stats. */
export default async function TracksPage() {
  const registrations = await getAllRegistrations();
  const trackStats = computeTrackStats(registrations);
  const total = registrations.length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-slate-900">Track Registrations Breakdown</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {total} total registration{total !== 1 ? "s" : ""} across all skill tracks
        </p>
      </div>

      {/* Full-width bar chart */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-900 mb-1">All Tracks</h2>
        <p className="text-xs text-slate-500 mb-5">Sorted by registrant count, descending</p>
        <TrackBreakdownChart data={trackStats} />
      </div>

      {/* Summary table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-sm font-semibold text-slate-900">Track Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide w-16">
                  Rank
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Track Name
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Registrants
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                  % of Total
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Laptop Yes %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trackStats.map((track, index) => (
                <tr key={track.trackId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-slate-700">
                    {MEDAL[index] ?? (
                      <span className="text-slate-400 tabular-nums">{index + 1}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-slate-900">
                      {track.trackName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-blue-600 tabular-nums w-8">
                        {track.count}
                      </span>
                      {total > 0 && (
                        <div className="flex-1 max-w-[120px] bg-slate-100 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${(track.count / Math.max(...trackStats.map(t => t.count))) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 tabular-nums">
                    {track.percentage}%
                  </td>
                  <td className="px-4 py-3">
                    {track.count > 0 ? (
                      <span className="text-sm text-slate-600 tabular-nums">
                        {track.laptopYesPercentage}%
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
