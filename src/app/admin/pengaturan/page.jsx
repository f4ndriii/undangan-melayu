"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function PengaturanDataUndangan() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
          supabase.from("love_stories").select("*").order("display_order", { ascending: true }),
          supabase.from("galleries").select("*").order("display_order", { ascending: true }),
          supabase.from("gifts_config").select("*").limit(1).maybeSingle(),
        ]);

        const akad = events?.find((e) => e.event_type === "akad") || events?.[0];
        const resepsi = events?.find((e) => e.event_type === "resepsi") || events?.[1];

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

          kisahCinta: stories?.length > 0 ? stories : [{ story_date: "", title: "", description: "" }],
          galeriFoto: galleries?.length > 0 ? galleries.map((g) => g.image_url) : [""],

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
      kisahCinta: [...formData.kisahCinta, { story_date: "", title: "", description: "" }],
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
      const { error: errProfile } = await supabase.from("profiles_config").upsert(profilePayload);
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
      const { error: errEvents } = await supabase.from("events").upsert([akadPayload, resepsiPayload]);
      if (errEvents) throw errEvents;

      // 3. Simpan Kisah Cinta (love_stories) - Hapus lama lalu insert ulang agar urutan rapi
      await supabase.from("love_stories").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      const validStories = formData.kisahCinta
        .filter((s) => s.title && s.story_date)
        .map((s, idx) => ({
          story_date: s.story_date,
          title: s.title,
          description: s.description || "",
          display_order: idx + 1,
        }));
      if (validStories.length > 0) {
        const { error: errStories } = await supabase.from("love_stories").insert(validStories);
        if (errStories) throw errStories;
      }

      // 4. Simpan Galeri Foto (galleries)
      await supabase.from("galleries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      const validGalleries = formData.galeriFoto
        .filter((url) => url.trim() !== "")
        .map((url, idx) => ({
          image_url: url.trim(),
          display_order: idx + 1,
        }));
      if (validGalleries.length > 0) {
        const { error: errGalleries } = await supabase.from("galleries").insert(validGalleries);
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
      const { error: errGift } = await supabase.from("gifts_config").upsert(giftPayload);
      if (errGift) throw errGift;

      alert("Semua pengaturan berhasil disimpan ke database!");
    } catch (error) {
      console.error("Error saat menyimpan:", error);
      alert("Gagal menyimpan data: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 font-sans">Memuat data pengaturan...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans text-gray-800 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-burgundy font-bold">Data & Konten Undangan</h1>
        <a href="/admin" className="text-sm font-bold text-emas hover:underline">
          ← Kembali ke Dashboard
        </a>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* --- 1. DATA MEMPELAI --- */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pria */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-serif text-burgundy mb-4 border-b border-emas/30 pb-2">Mempelai Pria</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Panggilan *</label>
                <input required type="text" name="groom_nick_name" value={formData.groom_nick_name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Lengkap & Gelar *</label>
                <input required type="text" name="groom_full_name" value={formData.groom_full_name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Orang Tua *</label>
                <input required type="text" name="groom_parents" value={formData.groom_parents} onChange={handleChange} placeholder="Putra dari Bapak ... & Ibu ..." className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">URL Foto Mempelai Pria</label>
                <input type="url" name="groom_photo_url" value={formData.groom_photo_url} onChange={handleChange} placeholder="https://..." className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none text-sm" />
              </div>
            </div>
          </div>

          {/* Wanita */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-serif text-burgundy mb-4 border-b border-emas/30 pb-2">Mempelai Wanita</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Panggilan *</label>
                <input required type="text" name="bride_nick_name" value={formData.bride_nick_name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Lengkap & Gelar *</label>
                <input required type="text" name="bride_full_name" value={formData.bride_full_name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Orang Tua *</label>
                <input required type="text" name="bride_parents" value={formData.bride_parents} onChange={handleChange} placeholder="Putri dari Bapak ... & Ibu ..." className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">URL Foto Mempelai Wanita</label>
                <input type="url" name="bride_photo_url" value={formData.bride_photo_url} onChange={handleChange} placeholder="https://..." className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. JADWAL & LOKASI ACARA --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-serif text-burgundy mb-4 border-b border-emas/30 pb-2">Jadwal & Lokasi Acara</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad */}
            <div className="space-y-4">
              <h3 className="font-bold text-emas">Akad Nikah</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tanggal *</label>
                  <input required type="date" name="akad_date" value={formData.akad_date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Waktu *</label>
                  <input required type="text" name="akad_time" value={formData.akad_time} onChange={handleChange} placeholder="08:00 WIB - Selesai" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nama Tempat / Gedung *</label>
                <input required type="text" name="akad_location_name" value={formData.akad_location_name} onChange={handleChange} placeholder="Contoh: Masjid Agung" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Alamat Lengkap *</label>
                <textarea required name="akad_location_address" value={formData.akad_location_address} onChange={handleChange} rows="2" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none"></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tautan Google Maps *</label>
                <input required type="url" name="akad_maps_url" value={formData.akad_maps_url} onChange={handleChange} placeholder="https://maps.google.com/..." className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none text-sm" />
              </div>
            </div>

            {/* Resepsi */}
            <div className="space-y-4">
              <h3 className="font-bold text-emas">Resepsi</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tanggal *</label>
                  <input required type="date" name="resepsi_date" value={formData.resepsi_date} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Waktu *</label>
                  <input required type="text" name="resepsi_time" value={formData.resepsi_time} onChange={handleChange} placeholder="11:00 WIB - 14:00 WIB" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nama Tempat / Gedung *</label>
                <input required type="text" name="resepsi_location_name" value={formData.resepsi_location_name} onChange={handleChange} placeholder="Contoh: Gedung Serbaguna" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Alamat Lengkap *</label>
                <textarea required name="resepsi_location_address" value={formData.resepsi_location_address} onChange={handleChange} rows="2" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none"></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tautan Google Maps *</label>
                <input required type="url" name="resepsi_maps_url" value={formData.resepsi_maps_url} onChange={handleChange} placeholder="https://maps.google.com/..." className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. KISAH CINTA --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b border-emas/30 pb-2">
            <h2 className="text-xl font-serif text-burgundy">Kisah Cinta (Timeline)</h2>
            <button type="button" onClick={addKisah} className="text-sm bg-emas/20 text-emas font-bold px-3 py-1 rounded hover:bg-emas/30 transition-colors">
              + Tambah Cerita
            </button>
          </div>
          
          <div className="space-y-6">
            {formData.kisahCinta.map((kisah, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
                <button type="button" onClick={() => removeKisah(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm font-bold">✕ Hapus</button>
                <div className="grid md:grid-cols-2 gap-4 mb-2 pr-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Tanggal Momen *</label>
                    <input type="date" value={kisah.story_date} onChange={(e) => handleKisahChange(index, "story_date", e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-emas focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Judul Cerita *</label>
                    <input type="text" value={kisah.title} onChange={(e) => handleKisahChange(index, "title", e.target.value)} placeholder="Pertama Kali Bertemu" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-emas focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Isi Cerita</label>
                  <textarea value={kisah.description} onChange={(e) => handleKisahChange(index, "description", e.target.value)} rows="2" placeholder="Ceritakan momen tersebut di sini..." className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-emas focus:outline-none"></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 4. GALERI FOTO --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b border-emas/30 pb-2">
            <h2 className="text-xl font-serif text-burgundy">Galeri Foto</h2>
            <button type="button" onClick={addGaleri} className="text-sm bg-emas/20 text-emas font-bold px-3 py-1 rounded hover:bg-emas/30 transition-colors">
              + Tambah Foto
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {formData.galeriFoto.map((foto, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-500 font-bold">{index + 1}</span>
                <input 
                  type="url" 
                  value={foto} 
                  onChange={(e) => handleGaleriChange(index, e.target.value)} 
                  placeholder="Tautan Foto (URL dari Supabase Storage)" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-emas focus:outline-none" 
                />
                <button type="button" onClick={() => removeGaleri(index)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- 5. KADO DIGITAL & ALAMAT KIRIM --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-serif text-burgundy mb-4 border-b border-emas/30 pb-2">Kado Digital & Amplop</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Nama Bank / E-Wallet</label>
              <input type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} placeholder="BCA / Mandiri / GoPay" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Nomor Rekening</label>
              <input type="text" name="account_number" value={formData.account_number} onChange={handleChange} placeholder="1234567890" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Atas Nama</label>
              <input type="text" name="account_owner" value={formData.account_owner} onChange={handleChange} placeholder="Nama Pemilik Rekening" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">URL Gambar QRIS (Opsional)</label>
              <input type="url" name="qris_image_url" value={formData.qris_image_url} onChange={handleChange} placeholder="https://..." className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Nama Penerima Kado Fisik</label>
              <input type="text" name="receiver_name" value={formData.receiver_name} onChange={handleChange} placeholder="Nama Penerima Paket" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-bold text-gray-600 mb-1">Alamat Pengiriman Kado Fisik</label>
            <textarea name="receiver_address" value={formData.receiver_address} onChange={handleChange} rows="2" placeholder="Alamat lengkap pengiriman kado..." className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none"></textarea>
          </div>
        </div>

        {/* --- TOMBOL SIMPAN --- */}
        <div className="flex justify-end sticky bottom-8">
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-burgundy text-white font-bold py-3 px-10 rounded-full hover:bg-burgundy/90 transition-all shadow-xl disabled:opacity-50"
          >
            {isSaving ? "Menyimpan ke Database..." : "Simpan Pengaturan"}
          </button>
        </div>

      </form>
    </div>
  );
}