// === FILE: components/registration/StepPersonalInfo.tsx ===

"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import {
  personalInfoSchema,
  type PersonalInfoData,
  AGE_RANGES,
  GENDERS,
} from "@/lib/registration-schema";

interface StepPersonalInfoProps {
  defaultValues: Partial<PersonalInfoData>;
  onComplete: (data: PersonalInfoData) => void;
}

/** Step 1 — Collects name, email, phone, age range, and gender. */
const StepPersonalInfo = ({ defaultValues, onComplete }: StepPersonalInfoProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit(onComplete)} noValidate>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-xl font-bold tracking-tight text-slate-900 mb-1 outline-none"
      >
        Personal Information
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        Tell us a little about yourself to get started.
      </p>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Chioma Okafor"
            {...register("fullName")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
          />
          {errors.fullName && (
            <p role="alert" aria-live="polite" className="text-xs text-red-600 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. chioma@example.com"
            {...register("email")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
          />
          {errors.email && (
            <p role="alert" aria-live="polite" className="text-xs text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 08012345678"
            {...register("phone")}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
          />
          {errors.phone && (
            <p role="alert" aria-live="polite" className="text-xs text-red-600 mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Age Range + Gender row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Age Range */}
          <div>
            <label htmlFor="ageRange" className="block text-sm font-medium text-slate-700 mb-1.5">
              Age Range <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="ageRange"
                {...register("ageRange")}
                className="w-full appearance-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white pr-10"
              >
                <option value="">Select age range</option>
                {AGE_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            {errors.ageRange && (
              <p role="alert" aria-live="polite" className="text-xs text-red-600 mt-1">
                {errors.ageRange.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-slate-700 mb-1.5">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="gender"
                {...register("gender")}
                className="w-full appearance-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white pr-10"
              >
                <option value="">Select gender</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            {errors.gender && (
              <p role="alert" aria-live="polite" className="text-xs text-red-600 mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
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

export default StepPersonalInfo;
