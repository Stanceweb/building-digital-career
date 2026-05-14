// === FILE: lib/supabase-public.ts ===
// Client-safe registration helper — posts to the /api/register route handler.
// Never connects to PostgreSQL directly (server-only concern).

import type { RegistrationFormData } from "@/lib/registration-schema";

export interface CreateRegistrationResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Submits a completed registration to the server.
 * Always returns a result — never throws — so the entrance card
 * is shown even if the server write fails.
 */
export async function createRegistration(
  formData: Partial<RegistrationFormData>,
  accessId: string
): Promise<CreateRegistrationResult> {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData, accessId }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[createRegistration] Server error:", data.error);
      return { success: false, error: data.error ?? "Request failed" };
    }

    return { success: true, id: data.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[createRegistration] Network error:", message);
    return { success: false, error: message };
  }
}
