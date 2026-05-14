// === FILE: app/admin/page.tsx ===

import { Users, Trophy, Laptop, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { getAllRegistrations } from "@/lib/supabase-admin";
import { computeAdminStats, computeTrackStats } from "@/lib/types";
import StatCard from "@/components/admin/StatCard";
import TrackBreakdownChart from "@/components/admin/TrackBreakdownChart";
import GenderChart from "@/components/admin/GenderChart";
import RegistrationsTable from "@/components/admin/RegistrationsTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Overview — BDC Admin" };
export const revalidate = 60;

/** Dashboard overview — stats, charts, and recent registrations. */
export default async function AdminDashboardPage() {
  const registrations = await getAllRegistrations();
  const stats = computeAdminStats(registrations);
  const trackStats = computeTrackStats(registrations);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-slate-900">Overview</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Building a Digital Career · 18–20 June 2025 · CGMI LOVECENTER, Nekede II, Imo State
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Registrations"
          value={stats.totalRegistrations}
          icon={<Users className="w-4 h-4" />}
          accent="blue"
        />
        <StatCard
          title="Most Popular Track"
          value={stats.mostPopularTrack}
          subtitle="Highest registrant count"
          icon={<Trophy className="w-4 h-4" />}
          accent="amber"
        />
        <StatCard
          title="Have a Laptop"
          value={`${stats.laptopYesPercentage}%`}
          subtitle={`${registrations.filter((r) => r.has_laptop === "Yes").length} of ${stats.totalRegistrations} registrants`}
          icon={<Laptop className="w-4 h-4" />}
          accent="green"
        />
        <StatCard
          title="Today's Registrations"
          value={stats.todayRegistrations}
          subtitle={new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
          icon={<CalendarCheck className="w-4 h-4" />}
          accent="slate"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Track breakdown — takes 2/3 */}
        <div className="xl:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900">Track Registrations</h2>
            <p className="text-xs text-slate-500 mt-0.5">Sorted by popularity</p>
          </div>
          <TrackBreakdownChart data={trackStats} />
        </div>

        {/* Gender chart — takes 1/3 */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900">Gender Split</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {stats.totalRegistrations} total registrants
            </p>
          </div>
          <GenderChart registrations={registrations} />
        </div>
      </div>

      {/* Recent registrations */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Recent Registrations</h2>
            <p className="text-xs text-slate-500 mt-0.5">Last 10 sign-ups</p>
          </div>
          <Link
            href="/admin/registrations"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            View all →
          </Link>
        </div>
        <RegistrationsTable registrations={registrations} showFilters={false} maxRows={10} />
      </div>
    </div>
  );
}
