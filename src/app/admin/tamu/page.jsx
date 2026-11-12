"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function KelolaTamu() {
  const [guests, setGuests] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mengambil data tamu saat halaman dimuat
  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) setGuests(data);
  };

  // Fungsi Tambah Tamu
  const handleAddGuest = async (e) => {
    e.preventDefault();
    if (!name) return alert("Nama tamu wajib diisi!");
    
    setIsLoading(true);
    const { error } = await supabase
      .from("guests")
      .insert([{ name, address }]);

    if (error) {
      alert("Gagal menambahkan tamu.");
    } else {
      setName("");
      setAddress("");
      fetchGuests(); // Refresh data di tabel
    }
    setIsLoading(false);
  };

  // Fungsi Hapus Tamu
  const handleDeleteGuest = async (id) => {
    if (!confirm("Yakin ingin menghapus tamu ini?")) return;

    const { error } = await supabase
      .from("guests")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Gagal menghapus tamu.");
    } else {
      fetchGuests(); // Refresh data di tabel
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-burgundy font-bold">Kelola Tamu</h1>
        <a href="/admin" className="text-sm font-bold text-emas hover:underline">
          ← Kembali ke Dashboard
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Tambah Tamu */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-8">
            <h2 className="text-xl font-serif text-burgundy mb-4">Tambah Tamu Baru</h2>
            <form onSubmit={handleAddGuest} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Nama Tamu</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-emas"
                  placeholder="Contoh: Budi Santoso"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Alamat / Instansi</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-emas"
                  placeholder="Contoh: Jakarta / PT Contoh"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-burgundy text-white font-bold py-2 rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50 mt-2"
              >
                {isLoading ? "Menyimpan..." : "Simpan Tamu"}
              </button>
            </form>
          </div>
        </div>

        {/* Kolom Kanan: Tabel Daftar Tamu */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-serif text-burgundy mb-4">Daftar Tamu Undangan</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-3 px-4 font-semibold">Nama</th>
                    <th className="py-3 px-4 font-semibold">Alamat</th>
                    <th className="py-3 px-4 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.length > 0 ? guests.map((guest) => (
                    <tr key={guest.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">{guest.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{guest.address || '-'}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-bold bg-red-50 px-3 py-1 rounded-md hover:bg-red-100 transition-colors"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="3" className="py-8 text-center text-gray-500">Belum ada tamu yang ditambahkan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}