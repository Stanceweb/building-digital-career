// === FILE: components/registration/StepTrackSelection.tsx ===

"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKS } from "@/lib/tracks-data";
import type { TrackSelectionData } from "@/lib/registration-schema";
import TrackCard from "./TrackCard";

interface StepTrackSelectionProps {
  defaultValues: Partial<TrackSelectionData>;
  onComplete: (data: TrackSelectionData) => void;
  onBack: () => void;
}

/** Step 3 — Displays all 15 skill track cards in a responsive grid for single selection. */
const StepTrackSelection = ({
  defaultValues,
  onComplete,
  onBack,
}: StepTrackSelectionProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [selectedTrack, setSelectedTrack] = useState<string>(
    defaultValues.selectedTrack ?? ""
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedTrack(id);
    setError("");
  };

  const handleNext = () => {
    if (!selectedTrack) {
      setError("Please select a skill track to continue.");
      return;
    }
    onComplete({ selectedTrack });
  };

  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-xl font-bold tracking-tight text-slate-900 mb-1 outline-none"
      >
        Choose Your Skill Track
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        Select exactly <strong>one track</strong> you would like to learn during the workshop.
      </p>

      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRACKS.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isSelected={selectedTrack === track.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-6 py-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
        >
          Review & Submit
        </button>
      </div>
    </div>
  );
};

export default StepTrackSelection;
