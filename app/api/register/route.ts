// === FILE: app/api/register/route.ts ===
// Public POST endpoint — validates, inserts into PostgreSQL, sends transactional emails.

import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { registrationFormSchema } from "@/lib/registration-schema";
import { sendEmail, getAdminEmail } from "@/lib/mailer";
import {
  getConfirmationEmailHtml,
  getAdminNotificationEmailHtml,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  // ── Step 1: Parse request body ───────────────────────────────────────────
  let body: { formData: unknown; accessId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { formData, accessId } = body;

  // ── Step 2: Zod validation ───────────────────────────────────────────────
  const parsed = registrationFormSchema.safeParse(formData);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  // ── Step 3: Database insert ──────────────────────────────────────────────
  let insertedId: string;
  try {
    const { rows } = await getPool().query<{ id: string }>(
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
        accessId ?? null,
      ]
    );
    insertedId = rows[0].id;
  } catch (err: unknown) {
    // PostgreSQL unique violation code — duplicate email
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "23505"
    ) {
      return NextResponse.json(
        { error: "This email is already registered for the event." },
        { status: 409 }
      );
    }
    console.error("[POST /api/register] DB insert failed:", err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }

  // ── Step 4: Confirmation email → registrant (non-fatal) ─────────────────
  try {
    await sendEmail({
      to: { name: d.fullName, email: d.email },
      subject: "You're registered! 🎉 Building a Digital Career",
      htmlContent: getConfirmationEmailHtml(d),
    });
  } catch (error) {
    console.error("[POST /api/register] Confirmation email failed:", error);
  }

  // ── Step 5: Notification email → admin (non-fatal) ──────────────────────
  try {
    await sendEmail({
      to: { name: "BDC Admin", email: getAdminEmail() },
      subject: `New Registration: ${d.fullName} — ${d.selectedTrack}`,
      htmlContent: getAdminNotificationEmailHtml(d),
      replyTo: { name: d.fullName, email: d.email },
    });
  } catch (error) {
    console.error("[POST /api/register] Admin notification email failed:", error);
  }

  // ── Step 6: Success ──────────────────────────────────────────────────────
  return NextResponse.json(
    { success: true, message: "Registration successful", id: insertedId },
    { status: 200 }
  );
}
