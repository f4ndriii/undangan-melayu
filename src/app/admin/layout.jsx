"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/reset-password";

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session && !isAuthPage) {
        router.replace("/admin/login");
      } else if (session && pathname === "/admin/login") {
        router.replace("/admin");
      } else {
        setIsAuthenticated(!!session);
        setIsChecking(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !isAuthPage) {
        setIsAuthenticated(false);
        router.replace("/admin/login");
      } else {
        setIsAuthenticated(!!session);
        setIsChecking(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, isAuthPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (isChecking) {
    return (
      <div className="min-h-dvh bg-gray-50 flex items-center justify-center font-sans text-gray-500">
        Memeriksa sesi admin...
      </div>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar / Menu Admin */}
      <aside className="w-full md:w-64 bg-burgundy text-krem p-6 shrink-0 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-serif text-emas mb-8 font-bold">Admin Panel</h2>
          
          <nav className="flex flex-col gap-3 font-sans text-sm">
            <Link 
              href="/admin" 
              className={`p-3 rounded-lg transition-colors ${
                pathname === "/admin" ? "bg-white/10 text-emas font-bold" : "hover:bg-white/5"
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/tamu" 
              className={`p-3 rounded-lg transition-colors ${
                pathname === "/admin/tamu" ? "bg-white/10 text-emas font-bold" : "hover:bg-white/5"
              }`}
            >
              Kelola Tamu (RSVP)
            </Link>
            <Link 
              href="/admin/pengaturan" 
              className={`p-3 rounded-lg transition-colors ${
                pathname === "/admin/pengaturan" ? "bg-white/10 text-emas font-bold" : "hover:bg-white/5"
              }`}
            >
              Pengaturan Undangan
            </Link>
          </nav>
        </div>

        <div className="mt-8">
          <hr className="border-emas/20 my-4" />
          <div className="flex flex-col gap-2 font-sans text-sm">
            <Link 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-lg hover:bg-white/5 transition-colors opacity-80"
            >
              ← Lihat Undangan
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left p-3 rounded-lg text-red-300 hover:bg-red-500/20 transition-colors font-semibold"
            >
              Keluar (Logout)
            </button>
          </div>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <div className="flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}