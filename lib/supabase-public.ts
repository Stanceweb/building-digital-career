// === FILE: lib/supabase-public.ts ===
// CLIENT-SAFE: uses the public anon key only. Never import SUPABASE_SERVICE_ROLE_KEY here.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { RegistrationFormData } from "@/lib/registration-schema";

let _client: SupabaseClient | null = null;

function getPublicClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  _client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _client;
}

export interface CreateRegistrationResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Inserts a new registration row via the public anon key.
 * Maps camelCase form fields → snake_case DB columns.
 * Never throws — caller shows the entrance card even if DB write fails.
 */
export async function createRegistration(
  formData: Partial<RegistrationFormData>,
  accessId: string
): Promise<CreateRegistrationResult> {
  const row = {
    full_name:       formData.fullName,
    email:           formData.email,
    phone:           formData.phone,
    age_range:       formData.ageRange,
    gender:          formData.gender,
    state_of_origin: formData.stateOfOrigin,
    education:       formData.education,
    current_status:  formData.currentStatus,
    has_laptop:      formData.hasLaptop,
    hear_about_us:   formData.hearAboutUs,
    selected_track:  formData.selectedTrack,
    motivation:      formData.motivation ?? null,
    access_id:       accessId,
  };

  try {
    const { data, error } = await getPublicClient()
      .from("registrations")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("[createRegistration] Supabase error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, id: (data as { id: string }).id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[createRegistration] Unexpected error:", message);
    return { success: false, error: message };
  }
}
