import { NextResponse } from "next/server";

/** Diagnostic endpoint — shows which env vars are set (values never exposed). */
export async function GET() {
  return NextResponse.json({
    env: {
      ADMIN_USERNAME: !!process.env.ADMIN_USERNAME,
      ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
      ADMIN_SECRET: !!process.env.ADMIN_SECRET,
      DATABASE_URL: !!process.env.DATABASE_URL,
    },
  });
}
