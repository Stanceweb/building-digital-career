// === FILE: app/admin/login/page.tsx ===

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { GraduationCap, AlertCircle } from "lucide-react";
import { createAdminSession } from "@/lib/admin-auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — BDC",
};

async function loginAction(formData: FormData) {
  "use server";

  const username = (formData.get("username") as string | null) ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const session = await createAdminSession(username);
    cookies().set("admin_session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 h
      path: "/",
    });
    redirect("/admin");
  }

  redirect("/admin/login?error=invalid");
}

interface LoginPageProps {
  searchParams: { error?: string };
}

/** Public login page — verifies credentials and issues a signed session cookie. */
export default function LoginPage({ searchParams }: LoginPageProps) {
  const hasError = searchParams.error === "invalid";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none">BDC Admin</p>
              <p className="text-xs text-slate-500 mt-0.5">Building a Digital Career</p>
            </div>
          </div>

          <h1 className="text-xl font-semibold text-slate-900 mb-1">Sign in</h1>
          <p className="text-sm text-slate-500 mb-6">Access the event admin dashboard.</p>

          {hasError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 text-sm text-red-700 mb-5"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Invalid credentials. Please try again.
            </div>
          )}

          <form action={loginAction} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                autoFocus
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 transition-all duration-150 mt-2"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          CGMI LOVECENTER, Nekede II — Event Admin Panel
        </p>
      </div>
    </div>
  );
}
