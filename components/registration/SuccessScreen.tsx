// === FILE: components/registration/SuccessScreen.tsx ===

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, User, Target, Calendar, MapPin } from "lucide-react";
import type { RegistrationFormData } from "@/lib/registration-schema";
import { TRACKS } from "@/lib/tracks-data";
import EntranceCard from "./EntranceCard";

interface SuccessScreenProps {
  formData: Partial<RegistrationFormData>;
  onReset: () => void;
  accessId: string;
}

/** Replaces the form after successful submission with a confirmation summary and entrance card. */
const SuccessScreen = ({ formData, onReset, accessId }: SuccessScreenProps) => {
  const firstName = formData.fullName?.split(" ")[0] ?? "there";
  const isCustomTrack = formData.selectedTrack === "other";
  const selectedTrackData = isCustomTrack
    ? null
    : TRACKS.find((t) => t.id === formData.selectedTrack);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Animated checkmark — hidden when printing */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="mb-6 print:hidden"
      >
        <CheckCircle2 className="w-20 h-20 text-green-500" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="w-full"
      >
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1 print:hidden">
          You&apos;re Registered!
        </h1>
        <p className="text-base text-blue-600 font-semibold mb-8 print:hidden">
          Building a Digital Career
        </p>

        {/* Confirmation summary card — hidden when printing */}
        <div className="rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-left mb-6 overflow-hidden print:hidden">
          <div className="px-5 py-3.5 bg-blue-50 border-b border-blue-100">
            <p className="text-sm font-bold text-blue-700">Registration Confirmation</p>
          </div>
          <div className="px-5 py-4 space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Name</p>
                <p className="text-sm font-semibold text-slate-900">{formData.fullName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Track</p>
                <p className="text-sm font-semibold text-slate-900">
                  {isCustomTrack
                    ? formData.customTrack ?? "—"
                    : selectedTrackData?.name ?? "—"}
                </p>
                {isCustomTrack && (
                  <p className="text-xs text-amber-600 font-medium mt-0.5">Custom suggestion</p>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Date</p>
                <p className="text-sm font-semibold text-slate-900">18th – 20th June 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Location</p>
                <p className="text-sm font-semibold text-slate-900">CGMI Ihiagwa, Imo State</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-2 print:hidden">
          Thank you for registering, <strong className="text-slate-800">{firstName}</strong>. We look
          forward to seeing you at CGMI Ihiagwa. Check your email for further details closer to the
          event.
        </p>

        {/* Entrance card — visible on screen AND in print */}
        <EntranceCard formData={formData} accessId={accessId} />

        {/* Reset button — hidden when printing */}
        <button
          type="button"
          onClick={onReset}
          className="mt-4 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-3.5 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none print:hidden"
        >
          Register Another Person
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessScreen;
