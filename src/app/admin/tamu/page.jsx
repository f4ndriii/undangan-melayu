"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import MelayuPattern from "@/components/ui/MelayuPattern";

export default function KelolaTamu() {
  const [guests, setGuests] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [coupleNames, setCoupleNames] = useState("Mempelai Pria & Wanita");

  useEffect(() => {
    fetchGuests();
    fetchCoupleNames();
  }, []);

  const fetchCoupleNames = async () => {
    const { data } = await supabase
      .from("profiles_config")
      .select("groom_nick_name, bride_nick_name")
      .limit(1)
      .maybeSingle();

    if (data?.groom_nick_name && data?.bride_nick_name) {
      setCoupleNames(`${data.groom_nick_name} & ${data.bride_nick_name}`);
    }
  };

  const fetchGuests = async () => {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setGuests(data);
  };

  // Fungsi membuat URL personal tiap tamu
  const generateInviteLink = (guestName) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/?to=${encodeURIComponent(guestName)}`;
  };

  // Fungsi Salin Link Undangan
  const handleCopyLink = (guest) => {
    const link = generateInviteLink(guest.name);
    navigator.clipboard.writeText(link);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Fungsi Kirim Langsung ke WhatsApp
  const handleShareWA = (guest) => {
    const link = generateInviteLink(guest.name);
    const message = `Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\nKepada Yth.\n*${guest.name}*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir memberikan doa restu pada acara pernikahan kami:\n\n*${coupleNames}*\n\nBerikut tautan undangan digital kami:\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh.`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Fungsi Tambah Tamu
  const handleAddGuest = async (e) => {
    e.preventDefault();
    setFeedback(null);
    if (!name.trim()) {
      setFeedback({ type: "error", text: "Nama tamu wajib diisi." });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.from("guests").insert([
      {
        name: name.trim(),
        address: address.trim() || "-",
        is_attending: true, // Default hadir saat didaftarkan admin
      },
    ]);

    if (error) {
      setFeedback({
        type: "error",
        text: "Gagal menambahkan tamu: " + error.message,
      });
    } else {
      setName("");
      setAddress("");
      setFeedback({
        type: "success",
        text: "Tamu berhasil ditambahkan & tautan siap dibagikan.",
      });
      setTimeout(() => setFeedback(null), 3000);
      fetchGuests();
    }
    setIsLoading(false);
  };

  // Fungsi Hapus Tamu
  const handleDeleteGuest = async (id) => {
    if (!confirm("Yakin ingin menghapus tamu ini?")) return;

    const { error } = await supabase.from("guests").delete().eq("id", id);

    if (error) {
      setFeedback({ type: "error", text: "Gagal menghapus tamu." });
    } else {
      fetchGuests();
    }
  };

  const filteredGuests = guests.filter(
    (g) =>
      g.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-full p-5 sm:p-8 lg:p-10 font-sans text-[#FAF0DF] overflow-hidden">
      {/* Tekstur Songket Halus */}
      <MelayuPattern className="opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Halaman */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#D4AF37]/30">
          <div>
            <span className="block text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-1.5">
              Manajemen Buku Tamu &amp; Distribusi
            </span>
            <h1 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight">
              Kelola Tamu
            </h1>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] border border-[#D4AF37]/40 bg-[#260308]/80 text-xs text-[#E6C78C] hover:border-[#F4D99B] hover:text-[#FAF0DF] transition-colors self-start sm:self-auto"
          >
            <span>← Kembali ke Dashboard</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Kolom Kiri: Form Tambah Tamu */}
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <div
              className="p-[3px] rounded-[2px] shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
              style={{
                background:
                  "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
              }}
            >
              <div className="bg-[#2B040A] p-[2px]">
                <div
                  className="relative p-6 sm:p-7 border border-[#D4AF37]/65 overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(circle at top, #520915 0%, #2E040A 88%)",
                  }}
                >
                  <MelayuPattern className="opacity-[0.04] pointer-events-none" />

                  <div className="w-3 h-3 border-t border-l border-[#D4AF37]/60 absolute top-2 left-2" />
                  <div className="w-3 h-3 border-b border-r border-[#D4AF37]/60 absolute bottom-2 right-2" />

                  <div className="relative z-10">
                    <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75 mb-1">
                      Generator Undangan
                    </span>
                    <h2 className="font-serif text-2xl text-[#F2D58E] mb-5">
                      Tambah Tamu Baru
                    </h2>

                    {feedback && (
                      <div
                        className={`px-3.5 py-2.5 rounded-[2px] border text-xs mb-4 ${
                          feedback.type === "success"
                            ? "bg-[#0F4642]/85 border-[#D4AF37]/60 text-[#FAF0DF]"
                            : "bg-[#5A0B18]/90 border-red-400/50 text-red-200"
                        }`}
                      >
                        {feedback.text}
                      </div>
                    )}

                    <form onSubmit={handleAddGuest} className="space-y-4">
                      <div>
                        <label className="block text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
                          Nama Tamu *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] px-4 py-2.5 text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors"
                          placeholder="Contoh: Budi Santoso"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
                          Alamat / Instansi
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] px-4 py-2.5 text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors"
                          placeholder="Contoh: Pekanbaru / PT Contoh"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="group relative overflow-hidden w-full py-2.5 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 disabled:opacity-50 transition-all duration-300 cursor-pointer"
                          style={{
                            background:
                              "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                            border: "1px solid #FFF2C8",
                          }}
                        >
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />
                          <span className="relative z-10">
                            {isLoading ? "Menyimpan..." : "Simpan & Buat Link"}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Tabel Daftar Tamu */}
          <div className="lg:col-span-2">
            <div
              className="p-[3px] rounded-[2px] shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
              style={{
                background:
                  "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
              }}
            >
              <div className="bg-[#2B040A] p-[2px]">
                <div
                  className="relative p-6 sm:p-7 border border-[#D4AF37]/65 overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(circle at top left, #4A0813 0%, #260308 90%)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/30 pb-4 mb-5">
                    <div>
                      <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75">
                        Daftar Penerima Undangan
                      </span>
                      <h2 className="font-serif text-2xl text-[#F2D58E] mt-0.5">
                        Daftar Tamu Undangan ({guests.length})
                      </h2>
                    </div>

                    {/* Input Cari Tamu */}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama atau alamat..."
                      className="w-full sm:w-56 bg-[#220206]/85 border border-[#D4AF37]/40 rounded-[2px] px-3.5 py-2 text-xs text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B]"
                    />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#D4AF37]/35 text-[10px] tracking-[0.2em] uppercase text-[#E6C78C]/85">
                          <th className="py-3 px-3 font-medium">Nama Tamu</th>
                          <th className="py-3 px-3 font-medium">Alamat</th>
                          <th className="py-3 px-3 font-medium text-right">
                            Bagikan &amp; Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4AF37]/15">
                        {filteredGuests.length > 0 ? (
                          filteredGuests.map((guest) => (
                            <tr
                              key={guest.id}
                              className="hover:bg-[#4A0813]/55 transition-colors"
                            >
                              <td className="py-3.5 px-3 font-serif text-base sm:text-lg text-[#FAF0DF]">
                                {guest.name}
                              </td>
                              <td className="py-3.5 px-3 text-xs text-[#F4E3C3]/75">
                                {guest.address || "-"}
                              </td>
                              <td className="py-3.5 px-3">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleCopyLink(guest)}
                                    className="text-[11px] font-medium bg-[#35050C] border border-[#D4AF37]/55 text-[#F4D99B] px-3 py-1.5 rounded-[2px] hover:bg-[#D4AF37] hover:text-[#2C0409] transition-colors whitespace-nowrap cursor-pointer"
                                  >
                                    {copiedId === guest.id
                                      ? "✓ Tersalin"
                                      : "Salin Link"}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleShareWA(guest)}
                                    className="text-[11px] font-medium bg-[#0F4642] border border-[#D4AF37]/45 text-[#8CE0C8] px-3 py-1.5 rounded-[2px] hover:bg-[#145B56] hover:text-[#FAF0DF] transition-colors whitespace-nowrap cursor-pointer"
                                  >
                                    Kirim WA
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteGuest(guest.id)}
                                    className="text-rose-300 hover:text-white text-xs font-semibold bg-[#5A0B18]/80 border border-rose-400/30 px-2.5 py-1.5 rounded-[2px] hover:bg-rose-800/80 transition-colors cursor-pointer"
                                    title="Hapus Tamu"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="3"
                              className="py-10 text-center font-serif italic text-base text-[#F4E3C3]/65"
                            >
                              {searchQuery
                                ? "Tidak ada tamu yang cocok dengan pencarian."
                                : "Belum ada tamu yang ditambahkan."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}