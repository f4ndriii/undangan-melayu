"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import MelayuPattern from "@/components/ui/MelayuPattern";

export default function PengaturanDataUndangan() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Menyimpan ID baris bawaan dari database untuk keperluan update
  const [ids, setIds] = useState({
    profileId: null,
    akadId: null,
    resepsiId: null,
    giftId: null,
  });

  const [formData, setFormData] = useState({
    // 1. profiles_config
    groom_nick_name: "",
    groom_full_name: "",
    groom_parents: "",
    groom_photo_url: "",
    bride_nick_name: "",
    bride_full_name: "",
    bride_parents: "",
    bride_photo_url: "",

    // 2. events (Akad & Resepsi)
    akad_date: "",
    akad_time: "",
    akad_location_name: "",
    akad_location_address: "",
    akad_maps_url: "",

    resepsi_date: "",
    resepsi_time: "",
    resepsi_location_name: "",
    resepsi_location_address: "",
    resepsi_maps_url: "",

    // 3. love_stories
    kisahCinta: [],

    // 4. galleries
    galeriFoto: [],

    // 5. gifts_config
    bank_name: "",
    account_number: "",
    account_owner: "",
    qris_image_url: "",
    receiver_name: "",
    receiver_address: "",
  });

  // Memuat semua data awal dari Supabase saat halaman dibuka
  useEffect(() => {
    async function loadAllData() {
      setIsLoading(true);
      try {
        const [
          { data: profile },
          { data: events },
          { data: stories },
          { data: galleries },
          { data: gift },
        ] = await Promise.all([
          supabase.from("profiles_config").select("*").limit(1).maybeSingle(),
          supabase.from("events").select("*"),
          supabase
            .from("love_stories")
            .select("*")
            .order("display_order", { ascending: true }),
          supabase
            .from("galleries")
            .select("*")
            .order("display_order", { ascending: true }),
          supabase.from("gifts_config").select("*").limit(1).maybeSingle(),
        ]);

        const akad =
          events?.find((e) => e.event_type === "akad") || events?.[0];
        const resepsi =
          events?.find((e) => e.event_type === "resepsi") || events?.[1];

        setIds({
          profileId: profile?.id || null,
          akadId: akad?.id || null,
          resepsiId: resepsi?.id || null,
          giftId: gift?.id || null,
        });

        setFormData({
          groom_nick_name: profile?.groom_nick_name || "",
          groom_full_name: profile?.groom_full_name || "",
          groom_parents: profile?.groom_parents || "",
          groom_photo_url: profile?.groom_photo_url || "",
          bride_nick_name: profile?.bride_nick_name || "",
          bride_full_name: profile?.bride_full_name || "",
          bride_parents: profile?.bride_parents || "",
          bride_photo_url: profile?.bride_photo_url || "",

          akad_date: akad?.event_date || "",
          akad_time: akad?.event_time || "",
          akad_location_name: akad?.location_name || "",
          akad_location_address: akad?.location_address || "",
          akad_maps_url: akad?.maps_url || "",

          resepsi_date: resepsi?.event_date || "",
          resepsi_time: resepsi?.event_time || "",
          resepsi_location_name: resepsi?.location_name || "",
          resepsi_location_address: resepsi?.location_address || "",
          resepsi_maps_url: resepsi?.maps_url || "",

          kisahCinta:
            stories?.length > 0
              ? stories
              : [{ story_date: "", title: "", description: "" }],
          galeriFoto:
            galleries?.length > 0 ? galleries.map((g) => g.image_url) : [""],

          bank_name: gift?.bank_name || "",
          account_number: gift?.account_number || "",
          account_owner: gift?.account_owner || "",
          qris_image_url: gift?.qris_image_url || "",
          receiver_name: gift?.receiver_name || "",
          receiver_address: gift?.receiver_address || "",
        });
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadAllData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler Kisah Cinta
  const handleKisahChange = (index, field, value) => {
    const updated = [...formData.kisahCinta];
    updated[index][field] = value;
    setFormData({ ...formData, kisahCinta: updated });
  };
  const addKisah = () => {
    setFormData({
      ...formData,
      kisahCinta: [
        ...formData.kisahCinta,
        { story_date: "", title: "", description: "" },
      ],
    });
  };
  const removeKisah = (index) => {
    setFormData({
      ...formData,
      kisahCinta: formData.kisahCinta.filter((_, i) => i !== index),
    });
  };

  // Handler Galeri Foto
  const handleGaleriChange = (index, value) => {
    const updated = [...formData.galeriFoto];
    updated[index] = value;
    setFormData({ ...formData, galeriFoto: updated });
  };
  const addGaleri = () => {
    setFormData({ ...formData, galeriFoto: [...formData.galeriFoto, ""] });
  };
  const removeGaleri = (index) => {
    setFormData({
      ...formData,
      galeriFoto: formData.galeriFoto.filter((_, i) => i !== index),
    });
  };

  // Menyimpan semua perubahan ke 5 tabel Supabase
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    try {
      // 1. Simpan Profil Mempelai (profiles_config)
      const profilePayload = {
        ...(ids.profileId && { id: ids.profileId }),
        groom_nick_name: formData.groom_nick_name,
        groom_full_name: formData.groom_full_name,
        groom_parents: formData.groom_parents,
        groom_photo_url: formData.groom_photo_url || null,
        bride_nick_name: formData.bride_nick_name,
        bride_full_name: formData.bride_full_name,
        bride_parents: formData.bride_parents,
        bride_photo_url: formData.bride_photo_url || null,
        updated_at: new Date().toISOString(),
      };
      const { error: errProfile } = await supabase
        .from("profiles_config")
        .upsert(profilePayload);
      if (errProfile) throw errProfile;

      // 2. Simpan Jadwal Acara (events)
      const akadPayload = {
        ...(ids.akadId && { id: ids.akadId }),
        event_type: "akad",
        event_date: formData.akad_date,
        event_time: formData.akad_time,
        location_name: formData.akad_location_name,
        location_address: formData.akad_location_address,
        maps_url: formData.akad_maps_url,
      };
      const resepsiPayload = {
        ...(ids.resepsiId && { id: ids.resepsiId }),
        event_type: "resepsi",
        event_date: formData.resepsi_date,
        event_time: formData.resepsi_time,
        location_name: formData.resepsi_location_name,
        location_address: formData.resepsi_location_address,
        maps_url: formData.resepsi_maps_url,
      };
      const { error: errEvents } = await supabase
        .from("events")
        .upsert([akadPayload, resepsiPayload]);
      if (errEvents) throw errEvents;

      // 3. Simpan Kisah Cinta (love_stories)
      await supabase
        .from("love_stories")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");
      const validStories = formData.kisahCinta
        .filter((s) => s.title && s.story_date)
        .map((s, idx) => ({
          story_date: s.story_date,
          title: s.title,
          description: s.description || "",
          display_order: idx + 1,
        }));
      if (validStories.length > 0) {
        const { error: errStories } = await supabase
          .from("love_stories")
          .insert(validStories);
        if (errStories) throw errStories;
      }

      // 4. Simpan Galeri Foto (galleries)
      await supabase
        .from("galleries")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");
      const validGalleries = formData.galeriFoto
        .filter((url) => url.trim() !== "")
        .map((url, idx) => ({
          image_url: url.trim(),
          display_order: idx + 1,
        }));
      if (validGalleries.length > 0) {
        const { error: errGalleries } = await supabase
          .from("galleries")
          .insert(validGalleries);
        if (errGalleries) throw errGalleries;
      }

      // 5. Simpan Kado Digital (gifts_config)
      const giftPayload = {
        ...(ids.giftId && { id: ids.giftId }),
        bank_name: formData.bank_name || null,
        account_number: formData.account_number || null,
        account_owner: formData.account_owner || null,
        qris_image_url: formData.qris_image_url || null,
        receiver_name: formData.receiver_name || null,
        receiver_address: formData.receiver_address || null,
      };
      const { error: errGift } = await supabase
        .from("gifts_config")
        .upsert(giftPayload);
      if (errGift) throw errGift;

      setFeedback({
        type: "success",
        text: "Semua pengaturan berhasil disimpan ke database!",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setFeedback(null), 4000);
    } catch (error) {
      console.error("Error saat menyimpan:", error);
      setFeedback({
        type: "error",
        text: "Gagal menyimpan data: " + error.message,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "w-full bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] px-4 py-2.5 text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors";
  const labelClass =
    "block text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2 font-medium";

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-[#F2D58E] font-sans">
        <div className="w-6 h-6 rotate-45 border border-[#D4AF37] animate-pulse" />
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#E6C78C]/85">
          Memuat Data Pengaturan...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-full p-5 sm:p-8 lg:p-10 font-sans text-[#FAF0DF] pb-28 overflow-hidden">
      {/* Tekstur Songket Halus */}
      <MelayuPattern className="opacity-[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Halaman */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#D4AF37]/30">
          <div>
            <span className="block text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-1.5">
              Konfigurasi Konten &amp; Media
            </span>
            <h1 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight">
              Data &amp; Konten Undangan
            </h1>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] border border-[#D4AF37]/40 bg-[#260308]/80 text-xs text-[#E6C78C] hover:border-[#F4D99B] hover:text-[#FAF0DF] transition-colors self-start sm:self-auto"
          >
            <span>← Kembali ke Dashboard</span>
          </Link>
        </div>

        {/* Notifikasi Status Simpan */}
        {feedback && (
          <div
            className={`px-5 py-3.5 rounded-[2px] border text-xs sm:text-sm mb-8 shadow-[0_10px_25px_rgba(0,0,0,0.45)] ${
              feedback.type === "success"
                ? "bg-[#0F4642]/90 border-[#D4AF37]/70 text-[#FAF0DF]"
                : "bg-[#5A0B18]/95 border-red-400/60 text-red-200"
            }`}
          >
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* --- 1. DATA MEMPELAI --- */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Pria */}
            <div
              className="p-[2px] rounded-[2px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
              style={{
                background:
                  "linear-gradient(135deg, #F6E2A5 0%, #C59B38 45%, #8F6818 100%)",
              }}
            >
              <div className="bg-[#2B040A] p-[2px] h-full">
                <div
                  className="relative h-full p-6 sm:p-7 border border-[#D4AF37]/65"
                  style={{
                    background:
                      "radial-gradient(circle at top left, #4E0914 0%, #280309 90%)",
                  }}
                >
                  <div className="border-b border-[#D4AF37]/30 pb-3 mb-5">
                    <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75">
                      Profil Calon Suami
                    </span>
                    <h2 className="font-serif text-2xl text-[#F2D58E] mt-0.5">
                      Mempelai Pria
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Nama Panggilan *</label>
                      <input
                        required
                        type="text"
                        name="groom_nick_name"
                        value={formData.groom_nick_name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Nama Lengkap &amp; Gelar *
                      </label>
                      <input
                        required
                        type="text"
                        name="groom_full_name"
                        value={formData.groom_full_name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Nama Orang Tua *</label>
                      <input
                        required
                        type="text"
                        name="groom_parents"
                        value={formData.groom_parents}
                        onChange={handleChange}
                        placeholder="Putra dari Bapak ... & Ibu ..."
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        URL Foto Mempelai Pria
                      </label>
                      <input
                        type="url"
                        name="groom_photo_url"
                        value={formData.groom_photo_url}
                        onChange={handleChange}
                        placeholder="https://..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wanita */}
            <div
              className="p-[2px] rounded-[2px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
              style={{
                background:
                  "linear-gradient(135deg, #F6E2A5 0%, #C59B38 45%, #8F6818 100%)",
              }}
            >
              <div className="bg-[#2B040A] p-[2px] h-full">
                <div
                  className="relative h-full p-6 sm:p-7 border border-[#D4AF37]/65"
                  style={{
                    background:
                      "radial-gradient(circle at top left, #4E0914 0%, #280309 90%)",
                  }}
                >
                  <div className="border-b border-[#D4AF37]/30 pb-3 mb-5">
                    <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75">
                      Profil Calon Istri
                    </span>
                    <h2 className="font-serif text-2xl text-[#F2D58E] mt-0.5">
                      Mempelai Wanita
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Nama Panggilan *</label>
                      <input
                        required
                        type="text"
                        name="bride_nick_name"
                        value={formData.bride_nick_name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Nama Lengkap &amp; Gelar *
                      </label>
                      <input
                        required
                        type="text"
                        name="bride_full_name"
                        value={formData.bride_full_name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Nama Orang Tua *</label>
                      <input
                        required
                        type="text"
                        name="bride_parents"
                        value={formData.bride_parents}
                        onChange={handleChange}
                        placeholder="Putri dari Bapak ... & Ibu ..."
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        URL Foto Mempelai Wanita
                      </label>
                      <input
                        type="url"
                        name="bride_photo_url"
                        value={formData.bride_photo_url}
                        onChange={handleChange}
                        placeholder="https://..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- 2. JADWAL & LOKASI ACARA --- */}
          <div
            className="p-[2px] rounded-[2px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 45%, #8F6818 100%)",
            }}
          >
            <div className="bg-[#2B040A] p-[2px]">
              <div
                className="relative p-6 sm:p-8 border border-[#D4AF37]/65"
                style={{
                  background:
                    "radial-gradient(circle at top, #4E0914 0%, #280309 90%)",
                }}
              >
                <div className="border-b border-[#D4AF37]/30 pb-3 mb-6">
                  <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75">
                    Rangkaian Prosesi
                  </span>
                  <h2 className="font-serif text-2xl text-[#F2D58E] mt-0.5">
                    Jadwal &amp; Lokasi Acara
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Akad */}
                  <div className="space-y-4 p-5 bg-[#220206]/60 border border-[#D4AF37]/25 rounded-[2px]">
                    <h3 className="font-serif text-xl text-[#F4D99B] border-b border-[#D4AF37]/20 pb-2">
                      Akad Nikah
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Tanggal *</label>
                        <input
                          required
                          type="date"
                          name="akad_date"
                          value={formData.akad_date}
                          onChange={handleChange}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Waktu *</label>
                        <input
                          required
                          type="text"
                          name="akad_time"
                          value={formData.akad_time}
                          onChange={handleChange}
                          placeholder="08:00 WIB - Selesai"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>
                        Nama Tempat / Gedung *
                      </label>
                      <input
                        required
                        type="text"
                        name="akad_location_name"
                        value={formData.akad_location_name}
                        onChange={handleChange}
                        placeholder="Contoh: Masjid Agung"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Alamat Lengkap *</label>
                      <textarea
                        required
                        name="akad_location_address"
                        value={formData.akad_location_address}
                        onChange={handleChange}
                        rows="2"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Tautan Google Maps *
                      </label>
                      <input
                        required
                        type="url"
                        name="akad_maps_url"
                        value={formData.akad_maps_url}
                        onChange={handleChange}
                        placeholder="https://maps.google.com/..."
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Resepsi */}
                  <div className="space-y-4 p-5 bg-[#220206]/60 border border-[#D4AF37]/25 rounded-[2px]">
                    <h3 className="font-serif text-xl text-[#F4D99B] border-b border-[#D4AF37]/20 pb-2">
                      Resepsi
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Tanggal *</label>
                        <input
                          required
                          type="date"
                          name="resepsi_date"
                          value={formData.resepsi_date}
                          onChange={handleChange}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Waktu *</label>
                        <input
                          required
                          type="text"
                          name="resepsi_time"
                          value={formData.resepsi_time}
                          onChange={handleChange}
                          placeholder="11:00 WIB - 14:00 WIB"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>
                        Nama Tempat / Gedung *
                      </label>
                      <input
                        required
                        type="text"
                        name="resepsi_location_name"
                        value={formData.resepsi_location_name}
                        onChange={handleChange}
                        placeholder="Contoh: Gedung Serbaguna"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Alamat Lengkap *</label>
                      <textarea
                        required
                        name="resepsi_location_address"
                        value={formData.resepsi_location_address}
                        onChange={handleChange}
                        rows="2"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Tautan Google Maps *
                      </label>
                      <input
                        required
                        type="url"
                        name="resepsi_maps_url"
                        value={formData.resepsi_maps_url}
                        onChange={handleChange}
                        placeholder="https://maps.google.com/..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- 3. KISAH CINTA --- */}
          <div
            className="p-[2px] rounded-[2px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 45%, #8F6818 100%)",
            }}
          >
            <div className="bg-[#2B040A] p-[2px]">
              <div
                className="relative p-6 sm:p-8 border border-[#D4AF37]/65"
                style={{
                  background:
                    "radial-gradient(circle at top, #4E0914 0%, #280309 90%)",
                }}
              >
                <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#D4AF37]/30 pb-3 mb-6">
                  <div>
                    <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75">
                      Perjalanan Cinta
                    </span>
                    <h2 className="font-serif text-2xl text-[#F2D58E] mt-0.5">
                      Kisah Cinta (Timeline)
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={addKisah}
                    className="px-4 py-1.5 bg-[#35050C] border border-[#D4AF37]/60 text-[#F4D99B] text-xs font-medium rounded-[2px] hover:bg-[#D4AF37] hover:text-[#2C0409] transition-colors cursor-pointer"
                  >
                    + Tambah Cerita
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.kisahCinta.map((kisah, index) => (
                    <div
                      key={index}
                      className="p-5 border border-[#D4AF37]/30 rounded-[2px] bg-[#220206]/75 relative"
                    >
                      <button
                        type="button"
                        onClick={() => removeKisah(index)}
                        className="absolute top-3.5 right-3.5 text-rose-300 hover:text-white bg-[#5A0B18]/80 border border-rose-400/30 px-2.5 py-1 rounded-[2px] text-[11px] transition-colors cursor-pointer"
                      >
                        ✕ Hapus
                      </button>

                      <div className="grid md:grid-cols-2 gap-4 mb-3 pr-20">
                        <div>
                          <label className={labelClass}>Tanggal Momen *</label>
                          <input
                            type="date"
                            value={kisah.story_date}
                            onChange={(e) =>
                              handleKisahChange(
                                index,
                                "story_date",
                                e.target.value
                              )
                            }
                            className={`${inputClass} [color-scheme:dark]`}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Judul Cerita *</label>
                          <input
                            type="text"
                            value={kisah.title}
                            onChange={(e) =>
                              handleKisahChange(index, "title", e.target.value)
                            }
                            placeholder="Pertama Kali Bertemu"
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Isi Cerita</label>
                        <textarea
                          value={kisah.description}
                          onChange={(e) =>
                            handleKisahChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows="2"
                          placeholder="Ceritakan momen tersebut di sini..."
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- 4. GALERI FOTO --- */}
          <div
            className="p-[2px] rounded-[2px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 45%, #8F6818 100%)",
            }}
          >
            <div className="bg-[#2B040A] p-[2px]">
              <div
                className="relative p-6 sm:p-8 border border-[#D4AF37]/65"
                style={{
                  background:
                    "radial-gradient(circle at top, #4E0914 0%, #280309 90%)",
                }}
              >
                <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#D4AF37]/30 pb-3 mb-6">
                  <div>
                    <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75">
                      Dokumentasi Momen
                    </span>
                    <h2 className="font-serif text-2xl text-[#F2D58E] mt-0.5">
                      Galeri Foto
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={addGaleri}
                    className="px-4 py-1.5 bg-[#35050C] border border-[#D4AF37]/60 text-[#F4D99B] text-xs font-medium rounded-[2px] hover:bg-[#D4AF37] hover:text-[#2C0409] transition-colors cursor-pointer"
                  >
                    + Tambah Foto
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {formData.galeriFoto.map((foto, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      <span className="bg-[#35050C] border border-[#D4AF37]/45 px-3 py-2.5 rounded-[2px] text-xs text-[#F2D58E] font-serif">
                        {index + 1}
                      </span>
                      <input
                        type="url"
                        value={foto}
                        onChange={(e) =>
                          handleGaleriChange(index, e.target.value)
                        }
                        placeholder="Tautan Foto (URL dari Supabase Storage)"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => removeGaleri(index)}
                        className="px-3 py-2.5 bg-[#5A0B18]/80 border border-rose-400/30 text-rose-300 hover:bg-rose-800/80 hover:text-white rounded-[2px] text-xs transition-colors cursor-pointer"
                        title="Hapus Foto"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- 5. KADO DIGITAL & ALAMAT KIRIM --- */}
          <div
            className="p-[2px] rounded-[2px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 45%, #8F6818 100%)",
            }}
          >
            <div className="bg-[#2B040A] p-[2px]">
              <div
                className="relative p-6 sm:p-8 border border-[#D4AF37]/65"
                style={{
                  background:
                    "radial-gradient(circle at top, #4E0914 0%, #280309 90%)",
                }}
              >
                <div className="border-b border-[#D4AF37]/30 pb-3 mb-6">
                  <span className="block text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75">
                    Tanda Kasih Tamu
                  </span>
                  <h2 className="font-serif text-2xl text-[#F2D58E] mt-0.5">
                    Kado Digital &amp; Amplop
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className={labelClass}>Nama Bank / E-Wallet</label>
                    <input
                      type="text"
                      name="bank_name"
                      value={formData.bank_name}
                      onChange={handleChange}
                      placeholder="BSI / BCA / Mandiri"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Nomor Rekening</label>
                    <input
                      type="text"
                      name="account_number"
                      value={formData.account_number}
                      onChange={handleChange}
                      placeholder="1234567890"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Atas Nama</label>
                    <input
                      type="text"
                      name="account_owner"
                      value={formData.account_owner}
                      onChange={handleChange}
                      placeholder="Nama Pemilik Rekening"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className={labelClass}>
                      URL Gambar QRIS (Opsional)
                    </label>
                    <input
                      type="url"
                      name="qris_image_url"
                      value={formData.qris_image_url}
                      onChange={handleChange}
                      placeholder="https://..."
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Nama Penerima Kado Fisik
                    </label>
                    <input
                      type="text"
                      name="receiver_name"
                      value={formData.receiver_name}
                      onChange={handleChange}
                      placeholder="Nama Penerima Paket"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Alamat Pengiriman Kado Fisik
                  </label>
                  <textarea
                    name="receiver_address"
                    value={formData.receiver_address}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Alamat lengkap pengiriman kado..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- TOMBOL SIMPAN MELAYANG --- */}
          <div className="flex justify-end sticky bottom-6 z-30">
            <button
              type="submit"
              disabled={isSaving}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-3 text-[#2C0409] font-serif font-semibold tracking-wider text-base rounded-[2px] shadow-[0_12px_30px_rgba(0,0,0,0.75)] hover:shadow-[0_14px_32px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 disabled:opacity-50 transition-all duration-300 cursor-pointer"
              style={{
                background:
                  "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                border: "1px solid #FFF2C8",
              }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />
              <svg
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="relative z-10">
                {isSaving ? "Menyimpan ke Database..." : "Simpan Pengaturan"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}