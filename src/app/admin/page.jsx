import Link from "next/link";
import { supabase } from "@/lib/supabase";
import MelayuPattern from "@/components/ui/MelayuPattern";

// Mematikan caching agar data selalu real-time setiap kali halaman dimuat ulang
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Mengambil data tamu dan ucapan dari Supabase
  const { data: guests } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: wishes } = await supabase
    .from("wishes")
    .select("*")
    .order("created_at", { ascending: false });

  const totalAttending =
    guests?.filter((g) => g.is_attending === true).length || 0;
  const totalNotAttending =
    guests?.filter((g) => g.is_attending === false).length || 0;

  return (
    <main className="relative min-h-full p-5 sm:p-8 lg:p-10 font-sans text-[#FAF0DF] overflow-hidden">
      {/* Tekstur Songket Halus */}
      <MelayuPattern className="opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Halaman */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#D4AF37]/30">
          <div>
            <span className="block text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-1.5">
              Ringkasan &amp; Statistik
            </span>
            <h1 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight">
              Dashboard Admin Undangan
            </h1>
          </div>

          <Link
            href="/admin/tamu"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 transition-all duration-300 self-start sm:self-auto"
            style={{
              background:
                "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
              border: "1px solid #FFF2C8",
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            <span className="relative z-10">Kelola Daftar Tamu</span>
            <svg
              className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

        {/* Ringkasan Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {/* Kartu 1: Total RSVP Hadir */}
          <div
            className="p-[2px] rounded-[2px] shadow-[0_14px_35px_rgba(0,0,0,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 45%, #8F6818 100%)",
            }}
          >
            <div
              className="relative h-full p-6 border border-[#D4AF37]/60 overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at top right, #4E0914 0%, #2B040A 85%)",
              }}
            >
              <div className="w-3 h-3 border-t border-l border-[#D4AF37]/60 absolute top-2 left-2" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[10px] tracking-[0.24em] uppercase text-[#E6C78C]/80 font-medium mb-2">
                    Total RSVP Hadir
                  </h3>
                  <p className="font-serif text-4xl sm:text-5xl text-[#8CE0C8] font-normal">
                    {totalAttending}
                  </p>
                  <span className="block text-[11px] text-[#F4E3C3]/65 mt-1.5">
                    Tamu mengonfirmasi hadir
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/45 bg-[#0F4642]/65 flex items-center justify-center text-[#8CE0C8] shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Kartu 2: Total RSVP Tidak Hadir */}
          <div
            className="p-[2px] rounded-[2px] shadow-[0_14px_35px_rgba(0,0,0,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 45%, #8F6818 100%)",
            }}
          >
            <div
              className="relative h-full p-6 border border-[#D4AF37]/60 overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at top right, #4E0914 0%, #2B040A 85%)",
              }}
            >
              <div className="w-3 h-3 border-t border-l border-[#D4AF37]/60 absolute top-2 left-2" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[10px] tracking-[0.24em] uppercase text-[#E6C78C]/80 font-medium mb-2">
                    Total RSVP Tidak Hadir
                  </h3>
                  <p className="font-serif text-4xl sm:text-5xl text-rose-300 font-normal">
                    {totalNotAttending}
                  </p>
                  <span className="block text-[11px] text-[#F4E3C3]/65 mt-1.5">
                    Tamu berhalangan hadir
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/45 bg-[#5A0B18]/80 flex items-center justify-center text-rose-300 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Kartu 3: Total Ucapan */}
          <div
            className="p-[2px] rounded-[2px] shadow-[0_14px_35px_rgba(0,0,0,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 45%, #8F6818 100%)",
            }}
          >
            <div
              className="relative h-full p-6 border border-[#D4AF37]/60 overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at top right, #4E0914 0%, #2B040A 85%)",
              }}
            >
              <div className="w-3 h-3 border-t border-l border-[#D4AF37]/60 absolute top-2 left-2" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[10px] tracking-[0.24em] uppercase text-[#E6C78C]/80 font-medium mb-2">
                    Total Ucapan
                  </h3>
                  <p className="font-serif text-4xl sm:text-5xl text-[#F2D58E] font-normal">
                    {wishes?.length || 0}
                  </p>
                  <span className="block text-[11px] text-[#F4E3C3]/65 mt-1.5">
                    Untaian doa restu masuk
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/45 bg-[#3A050D] flex items-center justify-center text-[#F2D58E] shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid 2 Kolom: Daftar RSVP & Daftar Ucapan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tabel RSVP */}
          <div
            className="p-[2px] rounded-[2px] shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
            }}
          >
            <div className="bg-[#2B040A] p-[2px] h-full">
              <div
                className="relative h-full p-6 sm:p-7 border border-[#D4AF37]/65 overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle at top left, #4A0813 0%, #260308 90%)",
                }}
              >
                <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4 mb-5">
                  <div>
                    <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75">
                      Konfirmasi Tamu
                    </span>
                    <h2 className="font-serif text-2xl text-[#F2D58E] mt-0.5">
                      Daftar Kehadiran (RSVP)
                    </h2>
                  </div>
                  <span className="px-3 py-1 bg-[#220206] border border-[#D4AF37]/40 rounded-full text-[10px] tracking-wider uppercase text-[#E6C78C]">
                    {guests?.length || 0} Data
                  </span>
                </div>

                <div className="overflow-x-auto max-h-[430px] overflow-y-auto pr-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#D4AF37]/35 text-[10px] tracking-[0.2em] uppercase text-[#E6C78C]/85">
                        <th className="py-3 px-3 font-medium">Nama</th>
                        <th className="py-3 px-3 font-medium">Alamat</th>
                        <th className="py-3 px-3 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D4AF37]/15">
                      {guests?.length > 0 ? (
                        guests.map((guest) => (
                          <tr
                            key={guest.id}
                            className="hover:bg-[#4A0813]/55 transition-colors"
                          >
                            <td className="py-3.5 px-3 font-serif text-base text-[#FAF0DF]">
                              {guest.name}
                            </td>
                            <td className="py-3.5 px-3 text-xs text-[#F4E3C3]/75">
                              {guest.address || "-"}
                            </td>
                            <td className="py-3.5 px-3 text-right whitespace-nowrap">
                              <span
                                className={`inline-block px-3 py-0.5 rounded-full text-[10px] tracking-wider uppercase border ${
                                  guest.is_attending
                                    ? "bg-[#0F4642]/80 text-[#8CE0C8] border-[#D4AF37]/45"
                                    : "bg-[#5A0B18]/80 text-rose-200 border-rose-400/35"
                                }`}
                              >
                                {guest.is_attending ? "Hadir" : "Tidak Hadir"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="py-10 text-center font-serif italic text-base text-[#F4E3C3]/65"
                          >
                            Belum ada data RSVP
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Ucapan & Doa */}
          <div
            className="p-[2px] rounded-[2px] shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
            }}
          >
            <div className="bg-[#2B040A] p-[2px] h-full">
              <div
                className="relative h-full p-6 sm:p-7 border border-[#D4AF37]/65 overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle at top left, #4A0813 0%, #260308 90%)",
                }}
              >
                <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4 mb-5">
                  <div>
                    <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75">
                      Buku Tamu Digital
                    </span>
                    <h2 className="font-serif text-2xl text-[#F2D58E] mt-0.5">
                      Daftar Ucapan &amp; Doa
                    </h2>
                  </div>
                  <span className="px-3 py-1 bg-[#220206] border border-[#D4AF37]/40 rounded-full text-[10px] tracking-wider uppercase text-[#E6C78C]">
                    {wishes?.length || 0} Ucapan
                  </span>
                </div>

                <div className="flex flex-col gap-3.5 max-h-[430px] overflow-y-auto pr-1">
                  {wishes?.length > 0 ? (
                    wishes.map((wish) => (
                      <div
                        key={wish.id}
                        className="p-4 bg-[#220206]/85 rounded-[2px] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-serif font-medium text-lg text-[#F2D58E]">
                            {wish.sender_name}
                          </h4>
                          {wish.created_at && (
                            <span className="text-[10px] text-[#E6C78C]/60">
                              {new Date(wish.created_at).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          )}
                        </div>
                        <p className="text-[#F4E3C3]/85 font-light text-xs sm:text-[13px] mt-2 leading-relaxed">
                          {wish.message}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center border border-[#D4AF37]/20 bg-[#220206]/50 rounded-[2px]">
                      <p className="font-serif italic text-base text-[#F4E3C3]/65">
                        Belum ada ucapan masuk
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}