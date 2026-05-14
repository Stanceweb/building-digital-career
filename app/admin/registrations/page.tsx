// === FILE: app/admin/registrations/page.tsx ===

import { getAllRegistrations } from "@/lib/supabase-admin";
import RegistrationsTable from "@/components/admin/RegistrationsTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Registrations — BDC Admin" };
export const revalidate = 60;

/** Full paginated and filterable registrations table with CSV export. */
export default async function RegistrationsPage() {
  const registrations = await getAllRegistrations();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Registrations</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {registrations.length} total registrant{registrations.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <RegistrationsTable
        registrations={registrations}
        showFilters
        showExport
      />
    </div>
  );
}
