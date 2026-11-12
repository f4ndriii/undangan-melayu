"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Event() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Tanggal target acara (Akad Nikah)
    const targetDate = new Date("2027-01-01T08:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-dvh py-20 px-6 bg-krem">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-3xl font-serif text-burgundy mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeUp}
        >
          Rangkaian Acara
        </motion.h2>

        {/* Hitung Mundur */}
        <motion.div 
          className="flex justify-center gap-4 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          variants={fadeUp}
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center bg-white border border-emas/50 rounded-lg p-3 w-20 shadow-sm">
              <span className="text-2xl font-serif font-bold text-burgundy">{value}</span>
              <span className="text-xs font-sans text-gray-500 uppercase">{unit === 'days' ? 'Hari' : unit === 'hours' ? 'Jam' : unit === 'minutes' ? 'Menit' : 'Detik'}</span>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Kartu Akad Nikah */}
          <motion.div 
            className="bg-white p-8 rounded-xl border border-emas/30 shadow-md relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            variants={fadeUp}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-emas"></div>
            <h3 className="text-2xl font-serif text-burgundy mb-2">Akad Nikah</h3>
            <p className="font-bold text-gray-700 font-sans mb-1">Jumat, 01 Januari 2027</p>
            <p className="text-gray-600 mb-4 font-sans">08.00 WIB - Selesai</p>
            <p className="text-gray-700 font-sans mb-6">
              <strong>[Nama Lokasi Akad]</strong><br/>
              Jl. Contoh Alamat Akad No. 123, Kota, Provinsi
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-burgundy text-white rounded-full text-sm font-sans hover:bg-red-900 transition"
            >
              <MapPin size={16} /> Buka Google Maps
            </a>
          </motion.div>

          {/* Kartu Resepsi */}
          <motion.div 
            className="bg-white p-8 rounded-xl border border-emas/30 shadow-md relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            variants={fadeUp}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-emas"></div>
            <h3 className="text-2xl font-serif text-burgundy mb-2">Resepsi</h3>
            <p className="font-bold text-gray-700 font-sans mb-1">Jumat, 01 Januari 2027</p>
            <p className="text-gray-600 mb-4 font-sans">11.00 WIB - 15.00 WIB</p>
            <p className="text-gray-700 font-sans mb-6">
              <strong>[Nama Lokasi Resepsi]</strong><br/>
              Jl. Contoh Alamat Resepsi No. 456, Kota, Provinsi
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-burgundy text-white rounded-full text-sm font-sans hover:bg-red-900 transition"
            >
              <MapPin size={16} /> Buka Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}