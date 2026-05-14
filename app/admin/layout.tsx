// === FILE: app/admin/layout.tsx ===

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Sidebar from "@/components/admin/Sidebar";

async function logoutAction() {
  "use server";
  cookies().set("admin_session", "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
  });
  redirect("/admin/login");
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

/** Root admin layout — conditionally shows the sidebar for all non-login pages. */
export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = headers().get("x-pathname") ?? "";
  const isLoginPage = pathname === "/admin/login" || pathname === "";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar logoutAction={logoutAction} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
