// === FILE: components/admin/ExportButton.tsx ===

"use client";

import { Download } from "lucide-react";

/** Triggers a CSV download from /admin/export when clicked. */
const ExportButton = () => {
  const handleExport = () => {
    window.location.href = "/admin/export";
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2 transition-all duration-150 shadow-sm"
    >
      <Download className="w-4 h-4" />
      Export CSV
    </button>
  );
};

export default ExportButton;
