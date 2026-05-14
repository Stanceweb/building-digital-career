// === FILE: app/api/register/route.ts ===
// Public API endpoint — validates and inserts a new registration into PostgreSQL.

import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { registrationFormSchema } from "@/lib/registration-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, accessId } = body as {
      formData: unknown;
      accessId: string;
    };

    // Validate with Zod (re-uses the same schema as the form)
    const parsed = registrationFormSchema.safeParse(formData);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const d = parsed.data;

    const { rows } = await getPool().query(
      `INSERT INTO registrations
         (full_name, email, phone, age_range, gender,
          state_of_origin, education, current_status,
          has_laptop, hear_about_us, selected_track,
          motivation, access_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING id`,
      [
        d.fullName,
        d.email,
        d.phone,
        d.ageRange,
        d.gender,
        d.stateOfOrigin,
        d.education,
        d.currentStatus,
        d.hasLaptop,
        d.hearAboutUs,
        d.selectedTrack,
        d.motivation ?? null,
        accessId,
      ]
    );

    return NextResponse.json({ id: rows[0].id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/register]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
