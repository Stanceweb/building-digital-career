// === FILE: components/registration/ProgressBar.tsx ===

"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number; // 0-based
  totalSteps: number;
}

const STEP_LABELS = ["Personal", "Background", "Track", "Review"];

/** Displays a multi-node step progress indicator with animated fill and percentage label. */
const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full mb-8">
      {/* Node + connector row */}
      <div className="flex items-center justify-between relative">
        {STEP_LABELS.map((label, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={label} className="flex-1 flex flex-col items-center relative">
              {/* Connector line (left side) */}
              {index > 0 && (
                <div className="absolute top-4 right-1/2 left-0 h-0.5 -translate-y-1/2 z-0">
                  <div className="w-full h-full bg-slate-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: isCompleted || isActive ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              )}

              {/* Node circle */}
              <div
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-blue-600 border-blue-600"
                    : isActive
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-slate-300"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                ) : (
                  <span
                    className={`text-xs font-bold ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-blue-600"
                    : isCompleted
                    ? "text-blue-600"
                    : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Percentage label */}
      <p className="text-center text-xs text-slate-500 mt-3 font-medium">
        Step {currentStep + 1} of {totalSteps} —{" "}
        <span className="text-blue-600 font-semibold">{percentage}% Complete</span>
      </p>
    </div>
  );
};

export default ProgressBar;
