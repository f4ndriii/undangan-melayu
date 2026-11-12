"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, QrCode, CreditCard, Gift as GiftIcon } from "lucide-react";

export default function Gift() {
  const [activeTab, setActiveTab] = useState("qris");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-6 bg-krem text-center">
      <div className="max-w-2xl mx-auto">
        <motion.h2 
          className="text-3xl font-serif text-burgundy mb-4"
          initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8 }} variants={fadeUp}
        >
          Kirim Hadiah
        </motion.h2>
        <motion.p 
          className="text-gray-600 font-sans mb-8"
          initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} variants={fadeUp}
        >
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat mengirimkannya melalui:
        </motion.p>

        <motion.div 
          className="bg-white rounded-xl shadow-md border border-emas/30 overflow-hidden"
          initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} variants={fadeUp}
        >
          {/* Navigasi Tab */}
          <div className="flex border-b border-gray-200">
            <button onClick={() => setActiveTab("qris")} className={`flex-1 py-4 font-sans font-bold flex items-center justify-center gap-2 ${activeTab === "qris" ? "bg-burgundy text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              <QrCode size={18} /> QRIS
            </button>
            <button onClick={() => setActiveTab("transfer")} className={`flex-1 py-4 font-sans font-bold flex items-center justify-center gap-2 ${activeTab === "transfer" ? "bg-burgundy text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              <CreditCard size={18} /> Transfer
            </button>
            <button onClick={() => setActiveTab("fisik")} className={`flex-1 py-4 font-sans font-bold flex items-center justify-center gap-2 ${activeTab === "fisik" ? "bg-burgundy text-white" : "text-gray-500 hover:bg-gray-50"}`}>
              <GiftIcon size={18} /> Fisik
            </button>
          </div>

          {/* Konten Tab */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === "qris" && (
                <motion.div key="qris" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4 border-2 border-emas">
                    <span className="text-gray-500 font-sans text-sm">Gambar QRIS</span>
                  </div>
                  <p className="font-sans text-gray-600 text-sm">Scan QRIS di atas melalui aplikasi M-Banking atau E-Wallet Anda.</p>
                </motion.div>
              )}

              {activeTab === "transfer" && (
                <motion.div key="transfer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="text-xl font-serif text-burgundy mb-2">[Nama Bank]</h3>
                  <p className="text-3xl font-sans font-bold tracking-widest text-gray-800 mb-2">1234 5678 9012</p>
                  <p className="font-sans text-gray-500 mb-6">a.n [Pemilik Rekening]</p>
                  <button onClick={() => handleCopy("123456789012")} className="inline-flex items-center gap-2 px-6 py-2 bg-emas text-burgundy font-bold rounded-full hover:bg-yellow-500 transition font-sans">
                    <Copy size={16} /> {copied ? "Berhasil Disalin!" : "Salin Nomor Rekening"}
                  </button>
                </motion.div>
              )}

              {activeTab === "fisik" && (
                <motion.div key="fisik" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="text-xl font-serif text-burgundy mb-2">Alamat Pengiriman</h3>
                  <p className="font-bold text-gray-800 font-sans mb-1">Penerima: [Nama Penerima]</p>
                  <p className="font-sans text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
                    Jl. Contoh Alamat Pengiriman Hadiah No. 123, Kelurahan, Kecamatan, Kota, Provinsi, 12345
                  </p>
                  <button onClick={() => handleCopy("Jl. Contoh Alamat Pengiriman Hadiah No. 123")} className="inline-flex items-center gap-2 px-6 py-2 bg-emas text-burgundy font-bold rounded-full hover:bg-yellow-500 transition font-sans">
                    <Copy size={16} /> {copied ? "Berhasil Disalin!" : "Salin Alamat"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}