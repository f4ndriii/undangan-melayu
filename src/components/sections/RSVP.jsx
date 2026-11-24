"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import MelayuPattern from "@/components/ui/MelayuPattern";

const PAGE_SIZE = 10;

function RSVPForm({ onSubmitted }) {
  const searchParams = useSearchParams();
  const initialGuest = searchParams.get("to") || "";

  const [guestName, setGuestName] = useState(initialGuest);
  const [address, setAddress] = useState("");
  const [attendance, setAttendance] = useState("hadir");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState(null);

  useEffect(() => {
    if (initialGuest) setGuestName(initialGuest);
  }, [initialGuest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim() || !address.trim()) return;

    setIsSubmitting(true);
    setStatusFeedback(null);

    const trimmedName = guestName.trim();
    const trimmedAddress = address.trim();
    const trimmedMessage = message.trim();
    const isAttending =
      attendance === "hadir"
        ? true
        : attendance === "tidak_hadir"
        ? false
        : null;

    try {
      // 1. Cek apakah nama tamu sudah terdaftar di tabel 'guests' (case-insensitive)
      const { data: existingGuest, error: checkError } = await supabase
        .from("guests")
        .select("id, address")
        .ilike("name", trimmedName)
        .limit(1)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingGuest) {
        // Jika sudah ada -> UPDATE status kehadiran & alamat
        const { error: updateError } = await supabase
          .from("guests")
          .update({
            is_attending: isAttending,
            address: trimmedAddress,
          })
          .eq("id", existingGuest.id);

        if (updateError) throw updateError;
      } else {
        // Jika belum ada -> INSERT baris tamu baru
        const { error: insertError } = await supabase.from("guests").insert([
          {
            name: trimmedName,
            address: trimmedAddress,
            is_attending: isAttending,
          },
        ]);

        if (insertError) throw insertError;
      }

      // 2. Simpan ke tabel 'wishes' hanya jika tamu mengisi ucapan
      let wishData = null;
      if (trimmedMessage) {
        const { data, error: wishError } = await supabase
          .from("wishes")
          .insert([
            {
              sender_name: trimmedName,
              message: trimmedMessage,
            },
          ])
          .select()
          .single();

        if (wishError) throw wishError;
        wishData = data;
      }

      setStatusFeedback({
        type: "success",
        text: trimmedMessage
          ? existingGuest
            ? "Terima kasih, status kehadiran Anda telah diperbarui dan doa restu telah ditambahkan."
            : "Terima kasih, konfirmasi kehadiran dan doa restu Anda telah tercatat."
          : existingGuest
          ? "Terima kasih, konfirmasi kehadiran Anda telah diperbarui."
          : "Terima kasih, konfirmasi kehadiran Anda telah tercatat.",
      });
      setMessage("");
      setAddress("");
      if (onSubmitted && wishData) {
        onSubmitted({
          ...wishData,
          is_attending: isAttending,
        });
      }
    } catch (err) {
      console.error("Gagal mengirim RSVP:", err);
      setStatusFeedback({
        type: "error",
        text: "Maaf, terjadi kendala saat mengirim konfirmasi: " + err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div>
        <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
          Nama Lengkap <span className="text-[#F4D99B]">*</span>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
            Alamat / Instansi <span className="text-[#F4D99B]">*</span>
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Contoh: Pekanbaru / Rekan Kerja"
            className="w-full h-[46px] px-4 bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] font-sans text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors"
          />
        </div>

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
            <option value="ragu">Masih Ragu</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
          Ucapan &amp; Doa Restu{" "}
          <span className="normal-case tracking-normal text-[#F4E3C3]/50">
            (Opsional)
          </span>
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan doa terbaik untuk kedua mempelai..."
          className="w-full px-4 py-3 bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] font-sans text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors resize-none"
        />
      </div>

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
  const [totalWishes, setTotalWishes] = useState(0);
  const [loadingWishes, setLoadingWishes] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchWishesBatch = async (fromIndex, toIndex, isInitial = false) => {
    try {
      const {
        data: wishesData,
        count,
        error,
      } = await supabase
        .from("wishes")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(fromIndex, toIndex);

      if (error || !wishesData) return;

      if (typeof count === "number") {
        setTotalWishes(count);
      }

      // Ambil status kehadiran hanya untuk nama-nama pada batch ini
      const senderNames = [
        ...new Set(wishesData.map((w) => w.sender_name).filter(Boolean)),
      ];
      let guestsData = [];
      if (senderNames.length > 0) {
        const { data } = await supabase
          .from("guests")
          .select("name, is_attending")
          .in("name", senderNames);
        guestsData = data || [];
      }

      const merged = wishesData.map((w) => {
        const matchedGuest = guestsData.find(
          (g) => g.name?.toLowerCase() === w.sender_name?.toLowerCase()
        );
        return {
          ...w,
          is_attending: matchedGuest ? matchedGuest.is_attending : undefined,
        };
      });

      if (isInitial) {
        setWishes(merged);
      } else {
        setWishes((prev) => [...prev, ...merged]);
      }
    } catch (err) {
      console.error("Gagal memuat ucapan:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoadingWishes(true);
      await fetchWishesBatch(0, PAGE_SIZE - 1, true);
      setLoadingWishes(false);
    };
    init();
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const from = wishes.length;
    const to = from + PAGE_SIZE - 1;
    await fetchWishesBatch(from, to, false);
    setLoadingMore(false);
  };

  const handleNewWish = (newWish) => {
    setWishes((prev) => [newWish, ...prev]);
    setTotalWishes((prev) => prev + 1);
  };

  const hasMore = wishes.length < totalWishes;

  return (
    <section
      id="rsvp"
      className="relative w-full py-20 sm:py-24 px-4 sm:px-6 overflow-hidden border-t border-[#D4AF37]/20"
      style={{
        background:
          "radial-gradient(circle at center, #4A0813 0%, #31040B 70%, #220206 100%)",
      }}
    >
      <MelayuPattern className="opacity-[0.06]" />

      <div className="relative z-10 max-w-3xl mx-auto">
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
              {totalWishes} Ucapan
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
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1 sm:pr-2">
              {wishes.map((item, idx) => {
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
                          {item.sender_name}
                        </span>
                        {item.is_attending !== undefined && (
                          <span
                            className={`px-2.5 py-0.5 text-[9px] font-sans tracking-[0.15em] uppercase border rounded-full ${
                              item.is_attending === true
                                ? "bg-[#0F4642] text-[#F4D99B] border-[#D4AF37]/50"
                                : item.is_attending === false
                                ? "bg-[#4A0813] text-[#F4E3C3]/75 border-[#D4AF37]/30"
                                : "bg-[#220206] text-[#E6C78C]/85 border-[#D4AF37]/40"
                            }`}
                          >
                            {item.is_attending === true
                              ? "Hadir"
                              : item.is_attending === false
                              ? "Berhalangan"
                              : "Masih Ragu"}
                          </span>
                        )}
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

              {hasMore && (
                <div className="pt-2 pb-1 text-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-5 py-2 bg-[#35050C] border border-[#D4AF37]/55 text-[#F4D99B] font-sans text-xs tracking-wider uppercase rounded-[2px] hover:bg-[#D4AF37] hover:text-[#2C0409] disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {loadingMore
                      ? "Memuat Ucapan..."
                      : `Muat Ucapan Lainnya (${totalWishes - wishes.length} tersisa)`}
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}