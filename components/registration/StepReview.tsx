// === FILE: components/registration/StepReview.tsx ===

"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Edit2 } from "lucide-react";
import type { RegistrationFormData } from "@/lib/registration-schema";
import { TRACKS } from "@/lib/tracks-data";

interface StepReviewProps {
  formData: Partial<RegistrationFormData>;
  onSubmit: () => Promise<void>;
  onEditStep: (step: number) => void;
}

interface ReviewSectionProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}

const ReviewSection = ({ title, onEdit, children }: ReviewSectionProps) => (
  <div className="rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
    <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
      <h3 className="text-sm font-bold text-slate-700 tracking-tight">{title}</h3>
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-1"
        aria-label={`Edit ${title}`}
      >
        <Edit2 className="w-3.5 h-3.5" />
        Edit
      </button>
    </div>
    <div className="px-5 py-4 space-y-3">{children}</div>
  </div>
);

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-4">
    <span className="text-xs font-medium text-slate-500 w-32 flex-shrink-0 pt-0.5">{label}</span>
    <span className="text-sm text-slate-900 font-medium flex-1">{value || "—"}</span>
  </div>
);

/** Step 4 — Shows a grouped summary of all responses with edit navigation and submit button. */
const StepReview = ({ formData, onSubmit, onEditStep }: StepReviewProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const selectedTrackData = TRACKS.find((t) => t.id === formData.selectedTrack);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-xl font-bold tracking-tight text-slate-900 mb-1 outline-none"
      >
        Review Your Registration
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        Please confirm your details before submitting.
      </p>

      <div className="space-y-4">
        {/* Section 1: Personal */}
        <ReviewSection title="Personal Information" onEdit={() => onEditStep(0)}>
          <ReviewRow label="Full Name" value={formData.fullName ?? ""} />
          <ReviewRow label="Email" value={formData.email ?? ""} />
          <ReviewRow label="Phone" value={formData.phone ?? ""} />
          <ReviewRow label="Age Range" value={formData.ageRange ?? ""} />
          <ReviewRow label="Gender" value={formData.gender ?? ""} />
        </ReviewSection>

        {/* Section 2: Background */}
        <ReviewSection title="Background Information" onEdit={() => onEditStep(1)}>
          <ReviewRow label="State of Origin" value={formData.stateOfOrigin ?? ""} />
          <ReviewRow label="Education" value={formData.education ?? ""} />
          <ReviewRow label="Current Status" value={formData.currentStatus ?? ""} />
          <ReviewRow label="Has Laptop?" value={formData.hasLaptop ?? ""} />
          <ReviewRow label="Heard Via" value={formData.hearAboutUs ?? ""} />
        </ReviewSection>

        {/* Section 3: Track */}
        <ReviewSection title="Selected Track" onEdit={() => onEditStep(2)}>
          {selectedTrackData ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 flex-shrink-0">
                <span className="text-blue-600 text-xs font-bold">#{selectedTrackData.id}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{selectedTrackData.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{selectedTrackData.description}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No track selected</p>
          )}
        </ReviewSection>

        {/* Section 4: Motivation */}
        <ReviewSection title="Motivation" onEdit={() => onEditStep(1)}>
          {formData.motivation ? (
            <p className="text-sm text-slate-700 leading-relaxed">{formData.motivation}</p>
          ) : (
            <p className="text-sm text-slate-400 italic">Not provided</p>
          )}
        </ReviewSection>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={() => onEditStep(2)}
          className="rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-6 py-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white text-sm font-semibold px-8 py-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit Registration"
          )}
        </button>
      </div>
    </div>
  );
};

export default StepReview;
