// === FILE: app/admin/registrations/[id]/page.tsx ===

import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  KeyRound,
  Code2,
  Palette,
  Layout,
  Megaphone,
  BarChart2,
  ShieldCheck,
  Smartphone,
  Video,
  Camera,
  PenTool,
  ShoppingBag,
  Layers,
  Cloud,
  BrainCircuit,
  Banknote,
  Lightbulb,
  type LucideProps,
} from "lucide-react";
import { getRegistrationById } from "@/lib/supabase-admin";
import { getTrackDisplayName } from "@/lib/types";
import { TRACKS } from "@/lib/tracks-data";
import LaptopBadge from "@/components/admin/LaptopBadge";
import type { Metadata } from "next";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Code2, Palette, Layout, Megaphone, BarChart2, ShieldCheck,
  Smartphone, Video, Camera, PenTool, ShoppingBag, Layers,
  Cloud, BrainCircuit, Banknote,
};

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const reg = await getRegistrationById(params.id);
  return { title: reg ? `${reg.full_name} — BDC Admin` : "Registration — BDC Admin" };
}

const Field = ({ label, value }: { label: string; value: string | null }) => (
  <div>
    <p className="text-xs font-medium text-slate-500 mb-0.5">{label}</p>
    <p className="text-sm text-slate-900 font-medium">{value || "—"}</p>
  </div>
);

/** Detail view for a single registration, showing all fields grouped by section. */
export default async function RegistrationDetailPage({ params }: PageProps) {
  const reg = await getRegistrationById(params.id);
  if (!reg) notFound();

  const track = TRACKS.find((t) => t.id === reg.selected_track);
  const TrackIcon = track ? (iconMap[track.iconName] ?? Lightbulb) : Lightbulb;
  const trackName = getTrackDisplayName(reg.selected_track);

  const registeredAt = new Date(reg.created_at).toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back + header */}
      <Link
        href="/admin/registrations"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to registrations
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{reg.full_name}</h1>
          <p className="text-sm text-slate-500 mt-0.5">Registered on {registeredAt}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-200">
          Registered
        </span>
      </div>

      <div className="space-y-5">
        {/* Card 1 — Personal */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Field label="Full Name" value={reg.full_name} />
            <Field label="Email Address" value={reg.email} />
            <Field label="Phone Number" value={reg.phone} />
            <Field label="Age Range" value={reg.age_range} />
            <Field label="Gender" value={reg.gender} />
          </div>
        </div>

        {/* Card 2 — Background */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Background Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Field label="State of Origin" value={reg.state_of_origin} />
            <Field label="Education Level" value={reg.education} />
            <Field label="Current Status" value={reg.current_status} />
            <div>
              <p className="text-xs font-medium text-slate-500 mb-0.5">Has Laptop?</p>
              <LaptopBadge value={reg.has_laptop} />
            </div>
            <Field label="How They Heard" value={reg.hear_about_us} />
          </div>
        </div>

        {/* Card 3 — Track */}
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-4">
            Selected Skill Track
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 flex-shrink-0">
              <TrackIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-blue-900">{trackName}</p>
              {track && (
                <p className="text-sm text-blue-600 mt-0.5">{track.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Card 4 — Motivation */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Motivation
          </h2>
          {reg.motivation ? (
            <blockquote className="border-l-4 border-blue-200 pl-4 text-sm text-slate-700 leading-relaxed italic">
              {reg.motivation}
            </blockquote>
          ) : (
            <p className="text-sm text-slate-400 italic">Not provided</p>
          )}
        </div>

        {/* Card 5 — Entrance Access */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Entrance Access
          </h2>
          {reg.access_id ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 flex-shrink-0">
                <KeyRound className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">Access ID</p>
                <p className="font-mono text-xl font-bold tracking-widest text-slate-900">
                  {reg.access_id}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">
              No access ID — registered before entrance card feature was added.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
