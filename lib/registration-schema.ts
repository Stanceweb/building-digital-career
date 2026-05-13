// === FILE: lib/registration-schema.ts ===

import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s\-()]+$/, "Invalid phone number format"),
  ageRange: z.enum(["Under 18", "18–25", "26–35", "36+"], {
    required_error: "Please select your age range",
    invalid_type_error: "Please select your age range",
  }),
  gender: z.enum(["Male", "Female", "Prefer not to say"], {
    required_error: "Please select your gender",
    invalid_type_error: "Please select your gender",
  }),
});

export const backgroundInfoSchema = z.object({
  stateOfOrigin: z.string().min(1, "Please select your state of origin"),
  education: z.string().min(1, "Please select your education level"),
  currentStatus: z.string().min(1, "Please select your current status"),
  hasLaptop: z.string().min(1, "Please answer the laptop question"),
  hearAboutUs: z.string().min(1, "Please tell us how you heard about this event"),
  motivation: z.string().max(500).optional(),
});

export const trackSelectionSchema = z.object({
  selectedTrack: z.string().min(1, "Please select a skill track"),
  customTrack: z.string().optional(),
});

export const registrationFormSchema = personalInfoSchema
  .merge(backgroundInfoSchema)
  .merge(trackSelectionSchema);

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type BackgroundInfoData = z.infer<typeof backgroundInfoSchema>;
export type TrackSelectionData = z.infer<typeof trackSelectionSchema>;
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;

export const AGE_RANGES = ["Under 18", "18–25", "26–35", "36+"] as const;
export const GENDERS = ["Male", "Female", "Prefer not to say"] as const;
export const EDUCATION_LEVELS = [
  "No formal education",
  "Primary",
  "Secondary (WAEC/NECO)",
  "OND / NCE",
  "HND / BSc",
  "Postgraduate (MSc/PhD)",
] as const;
export const CURRENT_STATUSES = [
  "Student",
  "Employed",
  "Unemployed",
  "Freelancer",
  "Business Owner",
] as const;
export const LAPTOP_OPTIONS = ["Yes", "No", "I'll borrow one"] as const;
export const HEAR_ABOUT_US_OPTIONS = [
  "WhatsApp",
  "Facebook",
  "Instagram",
  "Church Announcement",
  "Friend or Family",
  "Flyer",
  "Other",
] as const;

export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT (Abuja)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
] as const;
