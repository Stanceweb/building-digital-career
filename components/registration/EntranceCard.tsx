// === FILE: components/registration/EntranceCard.tsx ===

"use client";

import QRCode from "react-qr-code";
import { Printer, CalendarDays, MapPin, Tag } from "lucide-react";
import type { RegistrationFormData } from "@/lib/registration-schema";
import { TRACKS } from "@/lib/tracks-data";

const VERIFY_BASE_URL = "https://bdc.stanceweb.us/verify";

interface EntranceCardProps {
  formData: Partial<RegistrationFormData>;
  accessId: string;
}

/** Printable entrance badge shown after successful registration. */
const EntranceCard = ({ formData, accessId }: EntranceCardProps) => {
  const isCustomTrack = formData.selectedTrack === "other";
  const trackName = isCustomTrack
    ? (formData.customTrack ?? "Custom Track")
    : (TRACKS.find((t) => t.id === formData.selectedTrack)?.name ?? "—");

  return (
    <div className="mt-8 w-full">
      {/* Label above card — hidden on print */}
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 text-center print:hidden">
        Your Entrance Card
      </p>

      {/* ── THE CARD (prints) ── */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-blue-200 shadow-[0_4px_24px_rgba(37,99,235,0.12)] bg-white print:shadow-none print:border-slate-300">

        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400" />

        {/* Blue header band */}
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white font-bold text-base tracking-tight leading-tight">
              Building a Digital Career
            </p>
            <p className="text-blue-200 text-xs font-medium mt-0.5">
              Free Digital Skills Workshop · Imo State, Nigeria
            </p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 flex-shrink-0">
            <span className="text-white text-xs font-black tracking-tighter select-none">BDC</span>
          </div>
        </div>

        {/* Card body */}
        <div className="px-6 py-5">
          {/* ENTRANCE PASS label */}
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
            Entrance Pass
          </p>

          {/* Two columns: participant info left, QR right */}
          <div className="flex items-start gap-6">
            {/* Left: details */}
            <div className="flex-1 min-w-0 space-y-3.5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                  Participant
                </p>
                <p className="text-xl font-bold text-slate-900 leading-tight">
                  {formData.fullName ?? "—"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                  Skill Track
                </p>
                <div className="flex items-start gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-blue-700 leading-snug">
                    {trackName}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs font-medium">18th – 20th June 2025</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs font-medium">CGMI Ihiagwa, Imo State</span>
                </div>
              </div>
            </div>

            {/* Right: QR code */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="rounded-xl border border-slate-200 p-2.5 bg-white shadow-sm">
                <QRCode
                  value={`${VERIFY_BASE_URL}/${accessId}`}
                  size={88}
                  level="M"
                  fgColor="#0F172A"
                  bgColor="#FFFFFF"
                />
              </div>
              <p className="text-[9px] text-slate-400 mt-1.5 font-medium text-center">
                Scan at entrance
              </p>
            </div>
          </div>

          {/* Access ID band */}
          <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                Access ID
              </p>
              <p className="font-mono text-lg font-bold tracking-widest text-slate-900 truncate">
                {accessId}
              </p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 flex-shrink-0">
              <span className="text-green-600 font-bold text-base leading-none">✓</span>
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-2.5">
          <p className="text-[10px] text-slate-400 text-center">
            Present this pass (printed or on your screen) at the event entrance.
          </p>
        </div>

        {/* Bottom gradient bar */}
        <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700" />
      </div>

      {/* Print button — hidden when printing */}
      <button
        type="button"
        onClick={() => window.print()}
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold px-6 py-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none print:hidden"
      >
        <Printer className="w-4 h-4" />
        Print / Save as PDF
      </button>
    </div>
  );
};

export default EntranceCard;
