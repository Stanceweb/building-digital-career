// === FILE: components/registration/StepBackgroundInfo.tsx ===

"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import {
  backgroundInfoSchema,
  type BackgroundInfoData,
  NIGERIAN_STATES,
  EDUCATION_LEVELS,
  CURRENT_STATUSES,
  LAPTOP_OPTIONS,
  HEAR_ABOUT_US_OPTIONS,
} from "@/lib/registration-schema";

interface StepBackgroundInfoProps {
  defaultValues: Partial<BackgroundInfoData>;
  onComplete: (data: BackgroundInfoData) => void;
  onBack: () => void;
}

const SelectField = ({
  id,
  label,
  required,
  options,
  placeholder,
  error,
  registration,
}: {
  id: string;
  label: string;
  required?: boolean;
  options: readonly string[];
  placeholder: string;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<BackgroundInfoData>>["register"]>;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        id={id}
        {...registration}
        className="w-full appearance-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white pr-10"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
    {error && (
      <p role="alert" aria-live="polite" className="text-xs text-red-600 mt-1">
        {error}
      </p>
    )}
  </div>
);

/** Step 2 — Collects state of origin, education, status, laptop access, referral, and motivation. */
const StepBackgroundInfo = ({
  defaultValues,
  onComplete,
  onBack,
}: StepBackgroundInfoProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [charCount, setCharCount] = useState(defaultValues.motivation?.length ?? 0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BackgroundInfoData>({
    resolver: zodResolver(backgroundInfoSchema),
    defaultValues,
  });

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const motivationValue = watch("motivation");
  useEffect(() => {
    setCharCount(motivationValue?.length ?? 0);
  }, [motivationValue]);

  return (
    <form onSubmit={handleSubmit(onComplete)} noValidate>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-xl font-bold tracking-tight text-slate-900 mb-1 outline-none"
      >
        Background Information
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        Help us understand your background so we can serve you better.
      </p>

      <div className="space-y-5">
        <SelectField
          id="stateOfOrigin"
          label="State of Origin"
          required
          options={NIGERIAN_STATES}
          placeholder="Select your state"
          error={errors.stateOfOrigin?.message}
          registration={register("stateOfOrigin")}
        />

        <SelectField
          id="education"
          label="Highest Education Level"
          required
          options={EDUCATION_LEVELS}
          placeholder="Select education level"
          error={errors.education?.message}
          registration={register("education")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <SelectField
            id="currentStatus"
            label="Current Status"
            required
            options={CURRENT_STATUSES}
            placeholder="Select your status"
            error={errors.currentStatus?.message}
            registration={register("currentStatus")}
          />

          <SelectField
            id="hasLaptop"
            label="Do you have a laptop?"
            required
            options={LAPTOP_OPTIONS}
            placeholder="Select an option"
            error={errors.hasLaptop?.message}
            registration={register("hasLaptop")}
          />
        </div>

        <SelectField
          id="hearAboutUs"
          label="How did you hear about this event?"
          required
          options={HEAR_ABOUT_US_OPTIONS}
          placeholder="Select an option"
          error={errors.hearAboutUs?.message}
          registration={register("hearAboutUs")}
        />

        {/* Motivation textarea */}
        <div>
          <label htmlFor="motivation" className="block text-sm font-medium text-slate-700 mb-1.5">
            Why do you want to attend?{" "}
            <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="motivation"
            rows={4}
            maxLength={500}
            placeholder="Tell us why you want to attend and what you hope to learn..."
            {...register("motivation")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white resize-none"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.motivation ? (
              <p role="alert" aria-live="polite" className="text-xs text-red-600">
                {errors.motivation.message}
              </p>
            ) : (
              <span />
            )}
            <span className="text-xs text-slate-400 ml-auto">
              {charCount} / 500
            </span>
          </div>
        </div>
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
          type="submit"
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default StepBackgroundInfo;
