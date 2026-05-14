// === FILE: lib/supabase-admin.ts ===
// Server-only data access layer. Uses direct PostgreSQL via lib/db.ts.
// Note: created_at is cast to text so it arrives as an ISO string,
// matching the Registration interface and preventing Date object type mismatches.

import { getPool } from "@/lib/db";
import type { Registration } from "@/lib/types";

const SELECT = `
  SELECT
    id,
    created_at::text,
    full_name,
    email,
    phone,
    age_range,
    gender,
    state_of_origin,
    education,
    current_status,
    has_laptop,
    hear_about_us,
    selected_track,
    motivation,
    access_id
  FROM registrations
`;

export async function getAllRegistrations(): Promise<Registration[]> {
  try {
    const { rows } = await getPool().query<Registration>(
      `${SELECT} ORDER BY created_at DESC`
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
      `${SELECT} WHERE id = $1`,
      [id]
    );
    return rows[0] ?? null;
  } catch (err) {
    console.error("DB error (getRegistrationById):", err);
    return null;
  }
}
