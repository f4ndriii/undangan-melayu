"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import MelayuPattern from "@/components/ui/MelayuPattern";

export default function KelolaUcapanPage() {
  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchWishes();
  }, []);

  async function fetchWishes() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (err) {
      setFeedback({
        type: "error",
        text: "Gagal memuat daftar ucapan: " + err.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id, senderName) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus ucapan dari "${senderName}"?`
    );
    if (!confirmed) return;

    setDeletingId(id);
    setFeedback(null);
    try {
      const { error } = await supabase.from("wishes").delete().eq("id", id);
      if (error) throw error;

      setWishes((prev) => prev.filter((item) => item.id !== id));
      setFeedback({
        type: "success",
        text: `Ucapan dari "${senderName}" berhasil dihapus.`,
      });
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      setFeedback({
        type: "error",
        text: "Gagal menghapus ucapan: " + err.message,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const filteredWishes = wishes.filter(
    (w) =>
      w.sender_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative min-h-full p-5 sm:p-8 lg:p-10 font-sans text-[#FAF0DF] overflow-hidden">
      <MelayuPattern className="opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Halaman */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#D4AF37]/30">
          <div>
            <span className="block text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-1.5">
              Moderasi Buku Tamu
            </span>
            <h1 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight">
              Kelola Ucapan &amp; Doa
            </h1>
          </div>

          <span className="px-4 py-1.5 bg-[#220206] border border-[#D4AF37]/45 rounded-full text-xs tracking-wider uppercase text-[#E6C78C] self-start sm:self-auto">
            Total {wishes.length} Ucapan
          </span>
        </div>

        {/* Notifikasi Status */}
        {feedback && (
          <div
            className={`px-5 py-3.5 rounded-[2px] border text-xs sm:text-sm mb-6 shadow-[0_10px_25px_rgba(0,0,0,0.45)] ${
              feedback.type === "success"
                ? "bg-[#0F4642]/90 border-[#D4AF37]/70 text-[#FAF0DF]"
                : "bg-[#5A0B18]/95 border-red-400/60 text-red-200"
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* Kolom Pencarian Ucapan */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pengirim atau isi ucapan..."
            className="w-full max-w-md bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] px-4 py-2.5 text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/40 focus:outline-none focus:border-[#F4D99B] transition-colors"
          />
        </div>

        {/* Kontainer Daftar Ucapan */}
        <div
          className="p-[2px] rounded-[2px] shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
          style={{
            background:
              "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
          }}
        >
          <div className="bg-[#2B040A] p-[2px]">
            <div
              className="relative p-6 sm:p-8 border border-[#D4AF37]/65"
              style={{
                background:
                  "radial-gradient(circle at top left, #4A0813 0%, #260308 90%)",
              }}
            >
              {isLoading ? (
                <div className="py-14 text-center text-[#E6C78C]/80 text-xs tracking-[0.25em] uppercase">
                  Memuat Daftar Ucapan...
                </div>
              ) : filteredWishes.length > 0 ? (
                <div className="space-y-4">
                  {filteredWishes.map((wish) => (
                    <div
                      key={wish.id}
                      className="p-4 sm:p-5 bg-[#220206]/85 rounded-[2px] border border-[#D4AF37]/30 hover:border-[#D4AF37]/65 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-serif font-medium text-lg sm:text-xl text-[#F2D58E]">
                            {wish.sender_name}
                          </h3>
                          {wish.created_at && (
                            <span className="text-[11px] text-[#E6C78C]/60">
                              •{" "}
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
                        <p className="text-[#F4E3C3]/85 font-light text-xs sm:text-sm mt-2 leading-relaxed">
                          {wish.message}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={deletingId === wish.id}
                        onClick={() => handleDelete(wish.id, wish.sender_name)}
                        className="px-3.5 py-1.5 bg-[#5A0B18]/85 hover:bg-rose-800 border border-rose-400/45 text-rose-200 hover:text-white rounded-[2px] text-[11px] tracking-wider uppercase transition-colors disabled:opacity-50 cursor-pointer self-start shrink-0"
                      >
                        {deletingId === wish.id ? "Menghapus..." : "Hapus Ucapan"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border border-[#D4AF37]/20 bg-[#220206]/50 rounded-[2px]">
                  <p className="font-serif italic text-base text-[#F4E3C3]/65">
                    {searchQuery
                      ? "Tidak ada ucapan yang cocok dengan pencarian"
                      : "Belum ada ucapan yang masuk"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}