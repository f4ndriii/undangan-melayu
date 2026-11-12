"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function RSVP() {
  const [rsvpData, setRsvpData] = useState({ name: "", address: "", is_attending: "true" });
  const [wishData, setWishData] = useState({ sender_name: "", message: "" });
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState({ rsvp: false, wish: false });
  const [status, setStatus] = useState({ rsvp: "", wish: "" });

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setWishes(data);
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, rsvp: true }));
    
    const { error } = await supabase.from('guests').insert([{
      name: rsvpData.name,
      address: rsvpData.address,
      is_attending: rsvpData.is_attending === "true"
    }]);
    
    setLoading(prev => ({ ...prev, rsvp: false }));
    
    if (error) {
      console.error("Error RSVP:", error);
      alert("Gagal: " + error.message); // Ini akan memunculkan popup error
    } else {
      setStatus(prev => ({ ...prev, rsvp: "Konfirmasi berhasil dikirim!" }));
      setRsvpData({ name: "", address: "", is_attending: "true" });
    }
  };

  const handleWishSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, wish: true }));
    const { error } = await supabase.from('wishes').insert([{
      sender_name: wishData.sender_name,
      message: wishData.message
    }]);
    setLoading(prev => ({ ...prev, wish: false }));
    if (!error) {
      setStatus(prev => ({ ...prev, wish: "Ucapan berhasil dikirim!" }));
      setWishData({ sender_name: "", message: "" });
      fetchWishes(); // Refresh daftar ucapan
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Kolom RSVP */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8 }} variants={fadeUp}
        >
          <h2 className="text-3xl font-serif text-burgundy mb-6">Konfirmasi Kehadiran</h2>
          <form onSubmit={handleRSVPSubmit} className="bg-krem p-6 rounded-xl border border-emas/30 shadow-sm flex flex-col gap-4">
            <input type="text" placeholder="Nama Lengkap" required value={rsvpData.name} onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})} className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-emas font-sans" />
            <textarea placeholder="Alamat" required rows="2" value={rsvpData.address} onChange={(e) => setRsvpData({...rsvpData, address: e.target.value})} className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-emas font-sans"></textarea>
            <select value={rsvpData.is_attending} onChange={(e) => setRsvpData({...rsvpData, is_attending: e.target.value})} className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-emas font-sans">
              <option value="true">Ya, Saya Akan Hadir</option>
              <option value="false">Maaf, Saya Tidak Bisa Hadir</option>
            </select>
            <button type="submit" disabled={loading.rsvp} className="bg-burgundy text-white font-bold py-3 rounded-lg hover:bg-red-900 transition font-sans mt-2">
              {loading.rsvp ? "Mengirim..." : "Kirim Konfirmasi"}
            </button>
            {status.rsvp && <p className="text-green-600 text-sm font-sans text-center mt-2">{status.rsvp}</p>}
          </form>
        </motion.div>

        {/* Kolom Ucapan */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} variants={fadeUp}
        >
          <h2 className="text-3xl font-serif text-burgundy mb-6">Kirim Ucapan</h2>
          <form onSubmit={handleWishSubmit} className="bg-krem p-6 rounded-xl border border-emas/30 shadow-sm flex flex-col gap-4 mb-6">
            <input type="text" placeholder="Nama Anda" required value={wishData.sender_name} onChange={(e) => setWishData({...wishData, sender_name: e.target.value})} className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-emas font-sans" />
            <textarea placeholder="Tulis ucapan dan doa..." required rows="3" value={wishData.message} onChange={(e) => setWishData({...wishData, message: e.target.value})} className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-emas font-sans"></textarea>
            <button type="submit" disabled={loading.wish} className="bg-emas text-burgundy font-bold py-3 rounded-lg hover:bg-yellow-500 transition font-sans mt-2">
              {loading.wish ? "Mengirim..." : "Kirim Ucapan"}
            </button>
            {status.wish && <p className="text-green-600 text-sm font-sans text-center mt-2">{status.wish}</p>}
          </form>

          {/* Daftar Ucapan */}
          <div className="max-h-64 overflow-y-auto pr-2 flex flex-col gap-3">
            {wishes.map((wish) => (
              <div key={wish.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <p className="font-bold font-sans text-burgundy text-sm">{wish.sender_name}</p>
                <p className="font-sans text-gray-600 text-sm mt-1">{wish.message}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}