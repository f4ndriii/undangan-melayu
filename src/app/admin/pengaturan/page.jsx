"use client";
import { useState } from "react";

export default function PengaturanDataUndangan() {
  const [formData, setFormData] = useState({
    // --- Data Mempelai ---
    priaPanggilan: "",
    priaLengkap: "",
    priaAyah: "",
    priaIbu: "",
    wanitaPanggilan: "",
    wanitaLengkap: "",
    wanitaAyah: "",
    wanitaIbu: "",
    
    // --- Data Acara ---
    tanggalAkad: "", 
    waktuAkad: "", 
    lokasiAkad: "", 
    linkMapsAkad: "",
    tanggalResepsi: "", 
    waktuResepsi: "", 
    lokasiResepsi: "", 
    linkMapsResepsi: "",

    // --- Kisah Cinta (Array of Objects) ---
    kisahCinta: [
      { id: 1, tanggal: "", judul: "", cerita: "" }
    ],

    // --- Galeri Foto (Array of Strings/URLs) ---
    galeriFoto: [""],
  });

  const [isSaving, setIsSaving] = useState(false);

  // Handler Umum
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler Kisah Cinta Dinamis
  const handleKisahChange = (index, field, value) => {
    const newKisah = [...formData.kisahCinta];
    newKisah[index][field] = value;
    setFormData({ ...formData, kisahCinta: newKisah });
  };
  
  const addKisah = () => {
    setFormData({ 
      ...formData, 
      kisahCinta: [...formData.kisahCinta, { id: Date.now(), tanggal: "", judul: "", cerita: "" }] 
    });
  };
  
  const removeKisah = (index) => {
    const newKisah = formData.kisahCinta.filter((_, i) => i !== index);
    setFormData({ ...formData, kisahCinta: newKisah });
  };

  // Handler Galeri Foto Dinamis
  const handleGaleriChange = (index, value) => {
    const newGaleri = [...formData.galeriFoto];
    newGaleri[index] = value;
    setFormData({ ...formData, galeriFoto: newGaleri });
  };
  
  const addGaleri = () => {
    setFormData({ ...formData, galeriFoto: [...formData.galeriFoto, ""] });
  };
  
  const removeGaleri = (index) => {
    const newGaleri = formData.galeriFoto.filter((_, i) => i !== index);
    setFormData({ ...formData, galeriFoto: newGaleri });
  };

  // Handler Simpan
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    console.log("Data siap dikirim ke Supabase:", formData);
    setTimeout(() => {
      setIsSaving(false);
      alert("Semua data undangan berhasil diperbarui!");
    }, 1000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans text-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-burgundy font-bold">Data & Konten Undangan</h1>
        <a href="/admin" className="text-sm font-bold text-emas hover:underline">
          ← Kembali ke Dashboard
        </a>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* --- GRID MEMPELAI --- */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mempelai Pria */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-serif text-burgundy mb-4 border-b border-emas/30 pb-2">Mempelai Pria</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Panggilan</label>
                <input type="text" name="priaPanggilan" value={formData.priaPanggilan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Lengkap & Gelar</label>
                <input type="text" name="priaLengkap" value={formData.priaLengkap} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Nama Ayah</label>
                  <input type="text" name="priaAyah" value={formData.priaAyah} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Nama Ibu</label>
                  <input type="text" name="priaIbu" value={formData.priaIbu} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Mempelai Wanita */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-serif text-burgundy mb-4 border-b border-emas/30 pb-2">Mempelai Wanita</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Panggilan</label>
                <input type="text" name="wanitaPanggilan" value={formData.wanitaPanggilan} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nama Lengkap & Gelar</label>
                <input type="text" name="wanitaLengkap" value={formData.wanitaLengkap} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Nama Ayah</label>
                  <input type="text" name="wanitaAyah" value={formData.wanitaAyah} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Nama Ibu</label>
                  <input type="text" name="wanitaIbu" value={formData.wanitaIbu} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- GRID ACARA --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-serif text-burgundy mb-4 border-b border-emas/30 pb-2">Jadwal & Lokasi Acara</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad */}
            <div className="space-y-4">
              <h3 className="font-bold text-emas">Akad Nikah</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tanggal</label>
                  <input type="date" name="tanggalAkad" value={formData.tanggalAkad} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Waktu</label>
                  <input type="time" name="waktuAkad" value={formData.waktuAkad} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
              </div>
              <textarea name="lokasiAkad" value={formData.lokasiAkad} onChange={handleChange} placeholder="Nama & Alamat Lokasi" rows="2" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none"></textarea>
              <input type="url" name="linkMapsAkad" value={formData.linkMapsAkad} onChange={handleChange} placeholder="Tautan Google Maps (https://...)" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none text-sm" />
            </div>

            {/* Resepsi */}
            <div className="space-y-4">
              <h3 className="font-bold text-emas">Resepsi</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tanggal</label>
                  <input type="date" name="tanggalResepsi" value={formData.tanggalResepsi} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Waktu</label>
                  <input type="time" name="waktuResepsi" value={formData.waktuResepsi} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none" />
                </div>
              </div>
              <textarea name="lokasiResepsi" value={formData.lokasiResepsi} onChange={handleChange} placeholder="Nama & Alamat Lokasi" rows="2" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none"></textarea>
              <input type="url" name="linkMapsResepsi" value={formData.linkMapsResepsi} onChange={handleChange} placeholder="Tautan Google Maps (https://...)" className="w-full border border-gray-300 rounded-lg p-2 focus:border-emas focus:outline-none text-sm" />
            </div>
          </div>
        </div>

        {/* --- KISAH CINTA --- */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b border-emas/30 pb-2">
            <h2 className="text-xl font-serif text-burgundy">Kisah Cinta (Timeline)</h2>
            <button type="button" onClick={addKisah} className="text-sm bg-emas/20 text-emas font-bold px-3 py-1 rounded hover:bg-emas/30 transition-colors">
              + Tambah Cerita
            </button>
          </div>
          
          <div className="space-y-6">
            {formData.kisahCinta.map((kisah, index) => (
              <div key={kisah.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 relative">
                <button type="button" onClick={() => removeKisah(index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm font-bold">✕ Hapus</button>
                <div className="grid md:grid-cols-2 gap-4 mb-2 pr-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Tanggal / Bulan / Tahun</label>
                    <input type="text" value={kisah.tanggal} onChange={(e) => handleKisahChange(index, "tanggal", e.target.value)} placeholder="Misal: Januari 2023" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-emas focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Judul Cerita</label>
                    <input type="text" value={kisah.judul} onChange={(e) => handleKisahChange(index, "judul", e.target.value)} placeholder="Pertama Kali Bertemu" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-emas focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Isi Cerita</label>
                  <textarea value={kisah.cerita} onChange={(e) => handleKisahChange(index, "cerita", e.target.value)} rows="2" placeholder="Ceritakan momen tersebut di sini..." className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-emas focus:outline-none"></textarea>
                </div>
              </div>
            ))}
            {formData.kisahCinta.length === 0 && <p className="text-sm text-gray-400 text-center">Belum ada kisah cinta yang ditambahkan.</p>}
          </div>
        </div>

        {/* --- GALERI FOTO --- */}
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
                  placeholder="Tautan Foto (URL dari Supabase Storage / Imgur)" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-emas focus:outline-none" 
                />
                <button type="button" onClick={() => removeGaleri(index)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- TOMBOL SIMPAN --- */}
        <div className="flex justify-end sticky bottom-8">
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-burgundy text-white font-bold py-3 px-10 rounded-full hover:bg-burgundy/90 transition-all shadow-xl disabled:opacity-50"
          >
            {isSaving ? "Menyimpan Data..." : "Simpan Pengaturan"}
          </button>
        </div>

      </form>
    </div>
  );
}