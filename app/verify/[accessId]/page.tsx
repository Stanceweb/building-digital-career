// === FILE: app/verify/[accessId]/page.tsx ===
// Public page — shown when event staff scan a registrant's QR code at the entrance.

import { CheckCircle2, XCircle, User, Tag, Calendar, MapPin } from "lucide-react";
import { getPool } from "@/lib/db";
import { getTrackDisplayName } from "@/lib/types";
import type { Metadata } from "next";
import type { Registration } from "@/lib/types";

interface PageProps {
  params: { accessId: string };
}

export const metadata: Metadata = {
  title: "Entry Verification — Building a Digital Career",
};

/** Publicly accessible QR scan result page for entrance verification. */
export default async function VerifyPage({ params }: PageProps) {
  const { accessId } = params;

  let registration: Registration | null = null;

  try {
    const { rows } = await getPool().query<Registration>(
      `SELECT id, created_at::text, full_name, email, phone, age_range,
              gender, state_of_origin, education, current_status,
              has_laptop, hear_about_us, selected_track, motivation, access_id
       FROM registrations
       WHERE access_id = $1`,
      [accessId]
    );
    registration = rows[0] ?? null;
  } catch {
    // DB error — treat as not found
  }

  if (!registration) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="bg-white rounded-2xl border-2 border-red-200 shadow-lg p-8">
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" strokeWidth={1.5} />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Not Found</h1>
            <p className="text-slate-500 text-sm mb-4">
              This access ID is not registered in our system.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="font-mono text-sm font-bold text-red-700 tracking-widest">
                {accessId}
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Please contact the event organiser.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const trackName =
    registration.selected_track === "other"
      ? "Other (Suggested)"
      : getTrackDisplayName(registration.selected_track);

  const registeredDate = new Date(registration.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Verified card */}
        <div className="bg-white rounded-2xl border-2 border-green-200 shadow-lg overflow-hidden">
          {/* Green header */}
          <div className="bg-green-500 px-6 py-5 text-center">
            <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-2" strokeWidth={1.5} />
            <h1 className="text-xl font-bold text-white">Verified ✓</h1>
            <p className="text-green-100 text-sm mt-0.5">Registered Participant</p>
          </div>

          {/* Details */}
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Name</p>
                <p className="text-base font-bold text-slate-900">{registration.full_name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Skill Track</p>
                <p className="text-sm font-semibold text-blue-600">{trackName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Event Date</p>
                <p className="text-sm font-medium text-slate-700">18th – 20th June 2025</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                <p className="text-sm font-medium text-slate-700">CGMI Ihiagwa, Imo State</p>
              </div>
            </div>
          </div>

          {/* Access ID footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 text-center">Access ID</p>
            <p className="font-mono text-base font-bold tracking-widest text-slate-900 text-center">
              {registration.access_id}
            </p>
            <p className="text-xs text-slate-400 text-center mt-2">
              Registered on {registeredDate}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Building a Digital Career · CGMI Ihiagwa
        </p>
      </div>
    </div>
  );
}
