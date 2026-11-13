"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import MelayuPattern from "@/components/ui/MelayuPattern";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAuthPage =
    pathname === "/admin/login" || pathname === "/admin/reset-password";

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
      <div
        className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden text-[#F2D58E]"
        style={{
          background:
            "radial-gradient(circle at center, #4A0813 0%, #260308 75%, #160103 100%)",
        }}
      >
        <MelayuPattern className="opacity-[0.06]" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-6 h-6 rotate-45 border border-[#D4AF37] animate-pulse" />
          <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#E6C78C]/85">
            Memeriksa Sesi Admin...
          </p>
        </div>
      </div>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      href: "/admin/tamu",
      label: "Kelola Tamu (RSVP)",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
    },
    {
      href: "/admin/pengaturan",
      label: "Pengaturan Undangan",
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="relative min-h-dvh text-[#FAF0DF] flex flex-col md:flex-row"
      style={{
        background:
          "radial-gradient(circle at top right, #3E060F 0%, #220206 60%, #150103 100%)",
      }}
    >
      {/* Tekstur Songket Latar Belakang */}
      <MelayuPattern className="opacity-[0.04] pointer-events-none" />

      {/* Sidebar / Menu Admin */}
      <aside
        className="relative z-20 w-full md:w-68 border-b md:border-b-0 md:border-r border-[#D4AF37]/30 p-5 sm:p-6 shrink-0 flex flex-col justify-between overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #2D040A 0%, #1D0206 100%)",
        }}
      >
        <MelayuPattern className="opacity-[0.04] pointer-events-none" />

        <div className="relative z-10">
          {/* Brand Header */}
          <div className="pb-5 mb-6 border-b border-[#D4AF37]/25 flex items-center justify-between md:block">
            <div>
              <span className="block font-sans text-[9px] tracking-[0.32em] uppercase text-[#E6C78C]/75 font-medium">
                Panel Pengelola
              </span>
              <h2 className="font-script font-normal text-3xl sm:text-4xl text-[#F2D58E] leading-tight mt-0.5">
                Admin Panel
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-2 mt-3 opacity-60">
              <div className="w-8 h-[0.5px] bg-[#D4AF37]" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]" />
              <div className="w-8 h-[0.5px] bg-[#D4AF37]" />
            </div>
          </div>

          {/* Menu Navigasi */}
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-1 md:pb-0 font-sans text-xs">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-[2px] whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "text-[#2C0409] font-semibold shadow-[0_6px_18px_rgba(212,175,55,0.35)]"
                      : "text-[#F4E3C3]/80 border border-transparent hover:border-[#D4AF37]/35 hover:bg-[#4A0813]/70 hover:text-[#F6E3A6]"
                  }`}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                          border: "1px solid #FFF2C8",
                        }
                      : undefined
                  }
                >
                  <span
                    className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none ${
                      isActive
                        ? "bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        : "bg-gradient-to-r from-transparent via-[#F6E3A6]/15 to-transparent"
                    }`}
                  />
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="relative z-10 tracking-wide">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="relative z-10 mt-6 md:mt-8">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4" />
          <div className="flex flex-row md:flex-col gap-2 font-sans text-xs">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 flex items-center justify-center md:justify-start gap-2.5 px-4 py-2.5 rounded-[2px] border border-[#D4AF37]/35 text-[#E6C78C] hover:border-[#F4D99B] hover:bg-[#4A0813]/60 hover:text-[#FAF0DF] transition-all duration-300"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <span>Lihat Undangan</span>
            </Link>

            <button
              onClick={handleLogout}
              className="group flex-1 flex items-center justify-center md:justify-start gap-2.5 px-4 py-2.5 rounded-[2px] border border-red-400/25 bg-[#3A050D]/70 text-red-300 hover:bg-red-950/75 hover:border-red-400/50 hover:text-red-200 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span className="font-medium">Keluar (Logout)</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <div className="relative z-10 flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}