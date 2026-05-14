// === FILE: components/registration/RegistrationForm.tsx ===

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import type { RegistrationFormData } from "@/lib/registration-schema";
import { generateAccessId } from "@/lib/access-id";
import { createRegistration } from "@/lib/supabase-public";
import ProgressBar from "./ProgressBar";
import StepPersonalInfo from "./StepPersonalInfo";
import StepBackgroundInfo from "./StepBackgroundInfo";
import StepTrackSelection from "./StepTrackSelection";
import StepReview from "./StepReview";
import SuccessScreen from "./SuccessScreen";

const TOTAL_STEPS = 4;

const stepVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

const stepTransition = { duration: 0.25, ease: "easeInOut" as const };

/** Root orchestrator for the multi-step registration flow. Owns all form state and step routing. */
const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({});
  const [accessId, setAccessId] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const mergeAndAdvance = (stepData: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => prev + 1);
  };

  const goBack = () => setCurrentStep((prev) => prev - 1);

  const goToStep = (step: number) => setCurrentStep(step);

  const handleSubmit = async () => {
    setSubmitError(null);

    const newAccessId = generateAccessId();
    setAccessId(newAccessId);

    const result = await createRegistration(formData, newAccessId);

    if (!result.success) {
      const msg = result.error ?? "";
      setSubmitError(
        msg.toLowerCase().includes("already registered")
          ? "This email is already registered for the event."
          : "Registration failed. Please check your connection and try again."
      );
      return;
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({});
    setCurrentStep(0);
    setIsSubmitted(false);
    setAccessId("");
    setSubmitError(null);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-8">
          <SuccessScreen
            formData={formData}
            onReset={handleReset}
            accessId={accessId}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Page header */}
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            Free Workshop · 18–20 June 2025
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Building a Digital Career
          </h1>
          <p className="text-sm text-slate-500 mt-1">CGMI LOVECENTER, Nekede II, Imo State</p>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Submission error banner — only visible on review step */}
        {currentStep === 3 && submitError && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {submitError}
          </div>
        )}

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 sm:p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={stepTransition}
              >
                <StepPersonalInfo
                  defaultValues={formData}
                  onComplete={(data) => mergeAndAdvance(data)}
                />
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step-1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={stepTransition}
              >
                <StepBackgroundInfo
                  defaultValues={formData}
                  onComplete={(data) => mergeAndAdvance(data)}
                  onBack={goBack}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={stepTransition}
              >
                <StepTrackSelection
                  defaultValues={formData}
                  onComplete={(data) => mergeAndAdvance(data)}
                  onBack={goBack}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step-3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={stepTransition}
              >
                <StepReview
                  formData={formData}
                  onSubmit={handleSubmit}
                  onEditStep={goToStep}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
