import { NextResponse } from "next/server";

/** Diagnostic endpoint — confirms which env vars are set (values never exposed). */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    env: {
      DATABASE_URL:              !!process.env.DATABASE_URL,
      ADMIN_USERNAME:            !!process.env.ADMIN_USERNAME,
      ADMIN_PASSWORD:            !!process.env.ADMIN_PASSWORD,
      ADMIN_SECRET:              !!process.env.ADMIN_SECRET,
      BREVO_SMTP_LOGIN:          !!process.env.BREVO_SMTP_LOGIN,
      BREVO_SMTP_PASSWORD:       !!process.env.BREVO_SMTP_PASSWORD,
      BREVO_SENDER_NAME:         !!process.env.BREVO_SENDER_NAME,
      BREVO_SENDER_EMAIL:        !!process.env.BREVO_SENDER_EMAIL,
      ADMIN_NOTIFICATION_EMAIL:  !!process.env.ADMIN_NOTIFICATION_EMAIL,
    },
  });
}
