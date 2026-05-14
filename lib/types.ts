// === FILE: lib/types.ts ===

import { TRACKS } from "@/lib/tracks-data";

export interface Registration {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  age_range: string;
  gender: string;
  state_of_origin: string;
  education: string;
  current_status: string;
  has_laptop: string;
  hear_about_us: string;
  selected_track: string;
  motivation: string | null;
}

export interface TrackStats {
  trackId: string;
  trackName: string;
  count: number;
  percentage: number;
  laptopYesPercentage: number;
}

export interface AdminStats {
  totalRegistrations: number;
  mostPopularTrack: string;
  laptopYesPercentage: number;
  todayRegistrations: number;
}

export function getTrackDisplayName(trackId: string): string {
  if (trackId === "other") return "Other (Suggested)";
  return TRACKS.find((t) => t.id === trackId)?.name ?? trackId;
}

export function computeAdminStats(registrations: Registration[]): AdminStats {
  const total = registrations.length;

  const trackCounts: Record<string, number> = {};
  for (const r of registrations) {
    trackCounts[r.selected_track] = (trackCounts[r.selected_track] ?? 0) + 1;
  }
  const topTrackId = Object.entries(trackCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  const laptopYes = registrations.filter((r) => r.has_laptop === "Yes").length;
  const laptopYesPercentage = total > 0 ? Math.round((laptopYes / total) * 100) : 0;

  const today = new Date().toISOString().slice(0, 10);
  const todayRegistrations = registrations.filter((r) =>
    r.created_at.startsWith(today)
  ).length;

  return {
    totalRegistrations: total,
    mostPopularTrack: getTrackDisplayName(topTrackId),
    laptopYesPercentage,
    todayRegistrations,
  };
}

export function computeTrackStats(registrations: Registration[]): TrackStats[] {
  const total = registrations.length;

  const all = [
    ...TRACKS.map((t) => ({ trackId: t.id, trackName: t.name })),
    { trackId: "other", trackName: "Other (Suggested)" },
  ];

  return all
    .map(({ trackId, trackName }) => {
      const subset = registrations.filter((r) => r.selected_track === trackId);
      const count = subset.length;
      const laptopYes = subset.filter((r) => r.has_laptop === "Yes").length;
      return {
        trackId,
        trackName,
        count,
        percentage: total > 0 ? parseFloat(((count / total) * 100).toFixed(1)) : 0,
        laptopYesPercentage: count > 0 ? Math.round((laptopYes / count) * 100) : 0,
      };
    })
    .sort((a, b) => b.count - a.count);
}
