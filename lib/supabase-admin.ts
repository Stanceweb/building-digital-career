// === FILE: lib/supabase-admin.ts ===

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Registration } from "@/lib/types";

let _client: SupabaseClient | null = null;

/** Lazy singleton — only instantiated when first called, not at module load time. */
function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  _client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _client;
}

export async function getAllRegistrations(): Promise<Registration[]> {
  const { data, error } = await getClient()
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }
  return (data ?? []) as Registration[];
}

export async function getRegistrationById(id: string): Promise<Registration | null> {
  const { data, error } = await getClient()
    .from("registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return null;
  }
  return data as Registration;
}
