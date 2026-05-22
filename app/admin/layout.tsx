"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    setAuthenticated(!!token);
    setChecking(false);
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setAuthenticated(false);
  };

  // Login-Seite braucht kein Admin-Layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-gray-500">Laden …</p>
      </div>
    );
  }

  if (!authenticated) {
    // Redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-5">
          <Link href="/admin" className="flex items-baseline gap-1">
            <span className="font-serif text-lg tracking-tight">
              SwissTravel
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4">
          <Link
            href="/admin"
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
              pathname === "/admin"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Anfragen
          </Link>
        </nav>

        <div className="border-t border-gray-200 px-3 py-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 p-8">{children}</main>
    </div>
  );
}
