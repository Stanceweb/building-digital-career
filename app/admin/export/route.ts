// === FILE: app/admin/export/route.ts ===

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminSession } from "@/lib/admin-auth";
import { getAllRegistrations } from "@/lib/supabase-admin";
import { generateCSV, csvFilename } from "@/lib/export-utils";

/** Protected CSV export route — streams all registrations as a downloadable file. */
export async function GET() {
  // Auth check
  const sessionCookie = cookies().get("admin_session")?.value;
  if (!sessionCookie || !(await verifyAdminSession(sessionCookie))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const registrations = await getAllRegistrations();
  const csv = generateCSV(registrations);
  const filename = csvFilename();

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
