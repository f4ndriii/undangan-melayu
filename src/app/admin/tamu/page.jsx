"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function KelolaTamu() {
  const [guests, setGuests] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
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
    if (!name.trim()) return alert("Nama tamu wajib diisi!");
    
    setIsLoading(true);
    const { error } = await supabase
      .from("guests")
      .insert([{ 
        name: name.trim(), 
        address: address.trim() || "-",
        is_attending: true // Default hadir saat didaftarkan admin
      }]);

    if (error) {
      alert("Gagal menambahkan tamu: " + error.message);
    } else {
      setName("");
      setAddress("");
      fetchGuests();
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
      fetchGuests();
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-burgundy font-bold">Kelola Tamu</h1>
        <Link href="/admin" className="text-sm font-bold text-emas hover:underline">
          ← Kembali ke Dashboard
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Tambah Tamu */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-8">
            <h2 className="text-xl font-serif text-burgundy mb-4">Tambah Tamu Baru</h2>
            <form onSubmit={handleAddGuest} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Nama Tamu *</label>
                <input 
                  type="text" 
                  required
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
                className="w-full bg-burgundy text-white font-bold py-2.5 rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50 mt-2"
              >
                {isLoading ? "Menyimpan..." : "Simpan & Buat Link"}
              </button>
            </form>
          </div>
        </div>

        {/* Kolom Kanan: Tabel Daftar Tamu */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif text-burgundy">Daftar Tamu Undangan ({guests.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100 text-sm text-gray-600">
                    <th className="py-3 px-4 font-semibold">Nama Tamu</th>
                    <th className="py-3 px-4 font-semibold">Alamat</th>
                    <th className="py-3 px-4 font-semibold text-right">Bagikan & Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.length > 0 ? guests.map((guest) => (
                    <tr key={guest.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">{guest.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{guest.address || '-'}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyLink(guest)}
                            className="text-xs font-bold bg-emas/20 text-burgundy px-3 py-1.5 rounded-md hover:bg-emas/40 transition-colors whitespace-nowrap"
                          >
                            {copiedId === guest.id ? "✓ Tersalin" : "Salin Link"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleShareWA(guest)}
                            className="text-xs font-bold bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
                          >
                            Kirim WA
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteGuest(guest.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold bg-red-50 px-2.5 py-1.5 rounded-md hover:bg-red-100 transition-colors"
                            title="Hapus Tamu"
                          >
                            ✕
                          </button>
                        </div>
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