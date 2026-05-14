// === FILE: lib/export-utils.ts ===

import type { Registration } from "@/lib/types";
import { getTrackDisplayName } from "@/lib/types";

function escapeCsvField(value: string | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  });
}

const CSV_HEADERS = [
  "ID",
  "Registered At",
  "Full Name",
  "Email",
  "Phone",
  "Age Range",
  "Gender",
  "State of Origin",
  "Education",
  "Current Status",
  "Has Laptop",
  "How Did You Hear",
  "Selected Track",
  "Motivation",
];

/** Converts an array of registrations into a properly escaped CSV string. */
export function generateCSV(registrations: Registration[]): string {
  const rows = registrations.map((r) =>
    [
      r.id,
      formatDate(r.created_at),
      r.full_name,
      r.email,
      r.phone,
      r.age_range,
      r.gender,
      r.state_of_origin,
      r.education,
      r.current_status,
      r.has_laptop,
      r.hear_about_us,
      getTrackDisplayName(r.selected_track),
      r.motivation,
    ]
      .map(escapeCsvField)
      .join(",")
  );

  return [CSV_HEADERS.map(escapeCsvField).join(","), ...rows].join("\r\n");
}

export function csvFilename(): string {
  const date = new Date().toISOString().slice(0, 10);
  return `building-a-digital-career-registrations-${date}.csv`;
}
