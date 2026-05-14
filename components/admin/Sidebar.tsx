// === FILE: components/admin/Sidebar.tsx ===

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  PieChart,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  logoutAction: () => void;
}

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Registrations", href: "/admin/registrations", icon: Users, exact: false },
  { label: "Track Analytics", href: "/admin/tracks", icon: PieChart, exact: false },
];

/** Fixed left navigation sidebar with route highlighting and logout action. */
const Sidebar = ({ logoutAction }: SidebarProps) => {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex flex-col w-60 flex-shrink-0 h-screen bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 flex-shrink-0">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white leading-none">BDC Admin</p>
          <p className="text-xs text-slate-500 mt-0.5 truncate">Building a Digital Career</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Admin navigation">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-3 mb-3">
          Menu
        </p>
        {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                active
                  ? "text-white bg-slate-800 border-l-2 border-blue-400"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-800">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors duration-150"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
