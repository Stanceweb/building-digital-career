// === FILE: components/registration/StepTrackSelection.tsx ===

"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, Check } from "lucide-react";
import { TRACKS } from "@/lib/tracks-data";
import type { TrackSelectionData } from "@/lib/registration-schema";
import TrackCard from "./TrackCard";

interface StepTrackSelectionProps {
  defaultValues: Partial<TrackSelectionData>;
  onComplete: (data: TrackSelectionData) => void;
  onBack: () => void;
}

/** Step 3 — 15 skill track cards + an "Other" option for custom suggestions. Single selection only. */
const StepTrackSelection = ({
  defaultValues,
  onComplete,
  onBack,
}: StepTrackSelectionProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  const [selectedTrack, setSelectedTrack] = useState<string>(
    defaultValues.selectedTrack ?? ""
  );
  const [customTrack, setCustomTrack] = useState<string>(
    defaultValues.customTrack ?? ""
  );
  const [trackError, setTrackError] = useState("");
  const [customError, setCustomError] = useState("");

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // Auto-focus the custom input when "other" is selected
  useEffect(() => {
    if (selectedTrack === "other") {
      customInputRef.current?.focus();
    }
  }, [selectedTrack]);

  const handleSelect = (id: string) => {
    setSelectedTrack(id);
    setTrackError("");
    if (id !== "other") setCustomError("");
  };

  const handleOtherKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect("other");
    }
  };

  const handleNext = () => {
    if (!selectedTrack) {
      setTrackError("Please select a skill track to continue.");
      return;
    }
    if (selectedTrack === "other" && !customTrack.trim()) {
      setCustomError("Please describe the skill track you'd like to suggest.");
      return;
    }
    onComplete({
      selectedTrack,
      customTrack: selectedTrack === "other" ? customTrack.trim() : undefined,
    });
  };

  const isOtherSelected = selectedTrack === "other";

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
        Don&apos;t see yours? Pick <strong>Other</strong> and suggest it below.
      </p>

      {trackError && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 font-medium"
        >
          {trackError}
        </div>
      )}

      {/* 15 standard track cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRACKS.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isSelected={selectedTrack === track.id}
            onSelect={handleSelect}
          />
        ))}

        {/* Other card */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={isOtherSelected}
          aria-label="Select Other — suggest your own track"
          onClick={() => handleSelect("other")}
          onKeyDown={handleOtherKeyDown}
          className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            isOtherSelected
              ? "border-2 border-blue-600 bg-blue-50"
              : "border border-dashed border-slate-300 bg-white hover:border-blue-300 hover:bg-slate-50"
          }`}
        >
          {isOtherSelected && (
            <span className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600">
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </span>
          )}

          <div
            className={`flex items-center justify-center w-11 h-11 rounded-xl mb-3 ${
              isOtherSelected ? "bg-blue-600" : "bg-slate-100"
            }`}
          >
            <Lightbulb
              className={`w-5 h-5 ${isOtherSelected ? "text-white" : "text-slate-400"}`}
            />
          </div>

          <h3
            className={`font-bold text-sm tracking-tight mb-1.5 ${
              isOtherSelected ? "text-blue-700" : "text-slate-900"
            }`}
          >
            Other
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Don&apos;t see your preferred skill? Suggest any track you&apos;d like to learn.
          </p>
        </div>
      </div>

      {/* Custom track input — revealed when Other is selected */}
      {isOtherSelected && (
        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <label
            htmlFor="customTrack"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            What skill would you like to learn?{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            ref={customInputRef}
            id="customTrack"
            type="text"
            value={customTrack}
            onChange={(e) => {
              setCustomTrack(e.target.value);
              if (e.target.value.trim()) setCustomError("");
            }}
            placeholder="e.g. Machine Learning, Animation, Sound Design…"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
          />
          {customError && (
            <p role="alert" aria-live="polite" className="text-xs text-red-600 mt-1.5">
              {customError}
            </p>
          )}
          <p className="text-xs text-slate-500 mt-2">
            Your suggestion will be shared with the organizers — we may add it in future workshops!
          </p>
        </div>
      )}

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
