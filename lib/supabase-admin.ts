// === FILE: lib/supabase-admin.ts ===
// Server-only data access layer. Uses direct PostgreSQL via lib/db.ts.

import { getPool } from "@/lib/db";
import type { Registration } from "@/lib/types";

export async function getAllRegistrations(): Promise<Registration[]> {
  try {
    const { rows } = await getPool().query<Registration>(
      "SELECT * FROM registrations ORDER BY created_at DESC"
    );
    return rows;
  } catch (err) {
    console.error("DB error (getAllRegistrations):", err);
    return [];
  }
}

export async function getRegistrationById(id: string): Promise<Registration | null> {
  try {
    const { rows } = await getPool().query<Registration>(
      "SELECT * FROM registrations WHERE id = $1",
      [id]
    );
    return rows[0] ?? null;
  } catch (err) {
    console.error("DB error (getRegistrationById):", err);
    return null;
  }
}
