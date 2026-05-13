// === FILE: components/registration/TrackCard.tsx ===

"use client";

import {
  Code2,
  Palette,
  Layout,
  Megaphone,
  BarChart2,
  ShieldCheck,
  Smartphone,
  Video,
  Camera,
  PenTool,
  ShoppingBag,
  Layers,
  Cloud,
  BrainCircuit,
  Banknote,
  Check,
  LucideProps,
} from "lucide-react";
import type { Track } from "@/lib/tracks-data";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Code2,
  Palette,
  Layout,
  Megaphone,
  BarChart2,
  ShieldCheck,
  Smartphone,
  Video,
  Camera,
  PenTool,
  ShoppingBag,
  Layers,
  Cloud,
  BrainCircuit,
  Banknote,
};

interface TrackCardProps {
  track: Track;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

/** Renders a single selectable skill track card with icon, name, and description. */
const TrackCard = ({ track, isSelected, onSelect }: TrackCardProps) => {
  const Icon = iconMap[track.iconName] ?? Code2;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(track.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select ${track.name} track`}
      onClick={() => onSelect(track.id)}
      onKeyDown={handleKeyDown}
      className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
        isSelected
          ? "border-2 border-blue-600 bg-blue-50"
          : "border border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
      }`}
    >
      {isSelected && (
        <span className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600">
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </span>
      )}

      <div
        className={`flex items-center justify-center w-11 h-11 rounded-xl mb-3 ${
          isSelected ? "bg-blue-600" : "bg-blue-100"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${isSelected ? "text-white" : "text-blue-600"}`}
        />
      </div>

      <h3
        className={`font-bold text-sm tracking-tight mb-1.5 ${
          isSelected ? "text-blue-700" : "text-slate-900"
        }`}
      >
        {track.name}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed">{track.description}</p>
    </div>
  );
};

export default TrackCard;
