"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import MelayuPattern from "@/components/ui/MelayuPattern";

function RSVPForm({ onSubmitted }) {
  const searchParams = useSearchParams();
  const initialGuest = searchParams.get("to") || "";

  const [guestName, setGuestName] = useState(initialGuest);
  const [attendance, setAttendance] = useState("hadir");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState(null);

  useEffect(() => {
    if (initialGuest) setGuestName(initialGuest);
  }, [initialGuest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setStatusFeedback(null);

    try {
      const payload = {
        guest_name: guestName.trim(),
        attendance,
        guest_count: attendance === "hadir" ? Number(guestCount) : 0,
        message: message.trim(),
      };

      const { data, error } = await supabase
        .from("rsvps")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      setStatusFeedback({
        type: "success",
        text: "Terima kasih, konfirmasi kehadiran dan doa restu Anda telah tercatat.",
      });
      setMessage("");
      if (onSubmitted && data) onSubmitted(data);
    } catch (err) {
      console.error("Gagal mengirim RSVP:", err);
      setStatusFeedback({
        type: "error",
        text: "Maaf, terjadi kendala saat mengirim ucapan. Silakan coba kembali.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {/* Nama Tamu */}
      <div>
        <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
          Nama Lengkap
        </label>
        <input
          type="text"
          required
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Masukkan nama Anda"
          className="w-full px-4 py-3 bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] font-sans text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors"
        />
      </div>

      {/* Status Kehadiran & Spinner Jumlah Tamu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
            Konfirmasi Kehadiran
          </label>
          <select
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="w-full h-[46px] px-4 bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] font-sans text-sm text-[#FAF0DF] focus:outline-none focus:border-[#F4D99B] transition-colors"
          >
            <option value="hadir">InsyaAllah Hadir</option>
            <option value="tidak_hadir">Maaf, Berhalangan Hadir</option>
            <option value="ragu">Masih Ragu / Tentatif</option>
          </select>
        </div>

        <div>
          <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
            Jumlah Tamu
          </label>
          <div
            className={`flex items-center justify-between h-[46px] px-2 bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] transition-opacity ${
              attendance !== "hadir" ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
              disabled={attendance !== "hadir" || guestCount <= 1}
              aria-label="Kurangi jumlah tamu"
              className="w-8 h-8 flex items-center justify-center rounded-[2px] border border-[#D4AF37]/40 bg-[#35050C] text-[#F4D99B] hover:bg-[#D4AF37] hover:text-[#2C0409] disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>

            <div className="flex items-baseline gap-1.5 select-none">
              <span className="font-serif text-lg text-[#FAF0DF] font-medium">
                {attendance === "hadir" ? guestCount : 0}
              </span>
              <span className="font-sans text-[11px] text-[#E6C78C]/75">
                Orang
              </span>
            </div>

            <button
              type="button"
              onClick={() => setGuestCount((prev) => Math.min(10, prev + 1))}
              disabled={attendance !== "hadir" || guestCount >= 10}
              aria-label="Tambah jumlah tamu"
              className="w-8 h-8 flex items-center justify-center rounded-[2px] border border-[#D4AF37]/40 bg-[#35050C] text-[#F4D99B] hover:bg-[#D4AF37] hover:text-[#2C0409] disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Ucapan & Doa Restu */}
      <div>
        <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
          Ucapan &amp; Doa Restu
        </label>
        <textarea
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan doa terbaik untuk kedua mempelai..."
          className="w-full px-4 py-3 bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] font-sans text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors resize-none"
        />
      </div>

      {/* Pesan Status */}
      {statusFeedback && (
        <div
          className={`px-4 py-2.5 rounded-[2px] border text-xs font-sans ${
            statusFeedback.type === "success"
              ? "bg-[#0F4642]/70 border-[#D4AF37]/60 text-[#FAF0DF]"
              : "bg-[#5A0B18]/80 border-red-400/50 text-red-200"
          }`}
        >
          {statusFeedback.text}
        </div>
      )}

      {/* Tombol Kirim dengan Shimmer Hover (Seragam dengan Tombol Maps) */}
      <div className="pt-2 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-2.5 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
          style={{
            background:
              "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
            border: "1px solid #FFF2C8",
          }}
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <span className="relative z-10">
            {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi & Doa"}
          </span>
        </button>
      </div>
    </form>
  );
}

export default function RSVP() {
  const [wishes, setWishes] = useState([]);
  const [loadingWishes, setLoadingWishes] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const { data, error } = await supabase
          .from("rsvps")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(30);

        if (!error && data) {
          setWishes(data);
        }
      } catch (err) {
        console.error("Gagal memuat ucapan:", err);
      } finally {
        setLoadingWishes(false);
      }
    };

    fetchWishes();
  }, []);

  const handleNewWish = (newWish) => {
    setWishes((prev) => [newWish, ...prev]);
  };

  const getAttendanceBadge = (status) => {
    if (status === "hadir") {
      return {
        label: "Hadir",
        className: "bg-[#0F4642] text-[#F4D99B] border-[#D4AF37]/50",
      };
    }
    if (status === "tidak_hadir") {
      return {
        label: "Berhalangan",
        className: "bg-[#4A0813] text-[#F4E3C3]/75 border-[#D4AF37]/30",
      };
    }
    return {
      label: "Tentatif",
      className: "bg-[#3B060E] text-[#E6C78C] border-[#D4AF37]/40",
    };
  };

  return (
    <section
      id="rsvp"
      className="relative w-full py-20 sm:py-24 px-4 sm:px-6 overflow-hidden border-t border-[#D4AF37]/20"
      style={{
        background:
          "radial-gradient(circle at center, #4A0813 0%, #31040B 70%, #220206 100%)",
      }}
    >
      {/* Tekstur Songket Melayu */}
      <MelayuPattern className="opacity-[0.06]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-2">
            Buku Tamu &amp; Kehadiran
          </span>
          <h2 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight mb-3">
            RSVP &amp; Doa Restu
          </h2>
          <p className="font-sans font-light text-xs sm:text-sm text-[#F4E3C3]/80 max-w-md mx-auto leading-relaxed">
            Mohon konfirmasi kehadiran Anda serta tinggalkan untaian doa restu bagi perjalanan baru kami.
          </p>
        </motion.div>

        {/* Bingkai Kartu Formulir */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="p-[3px] rounded-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.65)] mb-12"
          style={{
            background:
              "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
          }}
        >
          <div className="bg-[#2B040A] p-[3px]">
            <div
              className="relative p-6 sm:p-10 border border-[#D4AF37]/65 overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at center, #4E0914 0%, #31040B 90%)",
              }}
            >
              <MelayuPattern className="opacity-[0.04]" />

              {/* Ornamen Sudut */}
              <div className="w-4 h-4 border-t border-l border-[#D4AF37]/65 absolute top-2.5 left-2.5" />
              <div className="w-4 h-4 border-t border-r border-[#D4AF37]/65 absolute top-2.5 right-2.5" />
              <div className="w-4 h-4 border-b border-l border-[#D4AF37]/65 absolute bottom-2.5 left-2.5" />
              <div className="w-4 h-4 border-b border-r border-[#D4AF37]/65 absolute bottom-2.5 right-2.5" />

              <div className="relative z-10">
                <Suspense
                  fallback={
                    <p className="text-center font-sans text-xs text-[#E6C78C]/70">
                      Memuat formulir...
                    </p>
                  }
                >
                  <RSVPForm onSubmitted={handleNewWish} />
                </Suspense>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daftar Ucapan & Doa Tamu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3 mb-6">
            <h3 className="font-serif text-xl sm:text-2xl text-[#FAF0DF]">
              Untaian Doa Tamu
            </h3>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#E6C78C]/80">
              {wishes.length} Ucapan
            </span>
          </div>

          {loadingWishes ? (
            <p className="text-center font-sans text-xs text-[#E6C78C]/60 py-8">
              Memuat ucapan tamu...
            </p>
          ) : wishes.length === 0 ? (
            <div className="text-center py-10 px-4 border border-[#D4AF37]/25 bg-[#2B040A]/50 rounded-[2px]">
              <p className="font-serif italic text-base text-[#F4E3C3]/75">
                Belum ada ucapan. Jadilah yang pertama mengirimkan doa restu untuk kedua mempelai.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 sm:pr-2">
              {wishes.map((item, idx) => {
                const badge = getAttendanceBadge(item.attendance);
                const formattedTime = item.created_at
                  ? new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "";

                return (
                  <div
                    key={item.id || idx}
                    className="p-5 bg-[#260308]/85 border border-[#D4AF37]/35 rounded-[2px] shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-serif font-medium text-base sm:text-lg text-[#FAF0DF]">
                          {item.guest_name}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 text-[9px] font-sans tracking-[0.15em] uppercase border rounded-full ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>

                      {formattedTime && (
                        <span className="font-sans text-[10px] text-[#E6C78C]/60">
                          {formattedTime}
                        </span>
                      )}
                    </div>

                    <p className="font-sans font-light text-xs sm:text-[13px] text-[#F4E3C3]/85 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}