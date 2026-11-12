"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cover({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  // 1. Tambahkan state ini untuk menandai undangan sudah terbuka
  const [isOpened, setIsOpened] = useState(false); 
  const [progress, setProgress] = useState(0);

  const handleOpen = () => {
    setIsOpening(true);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          // 2. Ubah state menjadi true agar layar putih menghilang
          setIsOpened(true); 
          
          // Beri jeda agar animasi menghilang selesai sebelum memanggil onOpen parent
          setTimeout(() => {
            if (onOpen) onOpen();
          }, 800); 
        }, 600);
      }
      setProgress(currentProgress);
    }, 150);
  };

  return (
    <AnimatePresence>
      {/* 3. Bungkus motion.div utama dengan kondisi !isOpened */}
      {!isOpened && (
        <motion.div 
          animate={{ backgroundColor: isOpening ? "#FFFFFF" : "var(--color-burgundy)" }}
          exit={{ opacity: 0, y: "-100%" }} // Efek layar putih ditarik ke atas
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-hidden"
        >
          {/* ... SISA KODE DI DALAM SINI TETAP SAMA SEPERTI SEBELUMNYA ... */}
        {/* Konten Utama Sampul - Akan memudar (fade out) saat tombol ditekan */}
        <motion.div 
          animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.95 : 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md h-full max-h-[850px] border border-emas/40 rounded-t-full flex flex-col items-center justify-between py-16 px-6 shadow-2xl"
        >
          {/* Latar Belakang Gradien yang juga memudar */}
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy/50 to-burgundy rounded-t-full -z-10"></div>

          {/* Ornamen Atas */}
          <div className="w-16 h-16 border-t border-l border-emas/60 rotate-45 mb-4 absolute top-10"></div>

          <div className="flex flex-col items-center text-center z-10 mt-16">
            <span className="text-emas/80 font-sans tracking-[0.3em] text-xs uppercase mb-4">Walimatul Urus</span>
            
            <h1 className="font-serif text-5xl md:text-6xl text-krem leading-tight mb-4">
              <span className="block italic">Pria</span>
              <span className="block text-emas my-2 text-4xl">&</span>
              <span className="block italic">Wanita</span>
            </h1>
            
            <div className="w-12 h-[1px] bg-emas/50 my-6"></div>
            
            <p className="font-sans text-krem/80 tracking-widest text-sm uppercase">01 Januari 2027</p>
          </div>

          <div className="z-10 flex flex-col items-center w-full mt-auto mb-8">
            <p className="text-krem/70 text-xs font-sans mb-6">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            
            <button 
              onClick={handleOpen}
              disabled={isOpening}
              className="w-full max-w-[200px] py-3 bg-transparent border border-emas text-emas hover:bg-emas hover:text-burgundy transition-all duration-300 font-sans tracking-widest text-xs uppercase disabled:opacity-0"
            >
              Buka Undangan
            </button>
          </div>
        </motion.div>

        {/* Loading Screen - Akan muncul (fade in) di atas layar putih saat loading dimulai */}
        <AnimatePresence>
          {isOpening && progress < 100 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
            >
              <div className="flex flex-col items-center w-64">
                {/* Custom Ornamen Melayu */}
                <div className="flex justify-center mb-6">
                  <motion.img 
                    src="/ornamen/ornamen_emas_solid_vector.svg"
                    alt="Ornamen Loading"
                    className="w-24 h-24" /* Sesuaikan ukurannya */
                    /* Efek animasi denyut (pulsing) agar terlihat hidup saat loading */
                    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* Progress Bar Line */}
                <div className="relative w-full h-[1px] bg-emas/30 mt-4">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-emas"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                  {/* Indikator Titik Progress (Berjalan mengikuti garis) */}
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-burgundy border border-emas rotate-45"
                    initial={{ left: 0 }}
                    animate={{ left: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>

                {/* Teks Persentase */}
                <motion.p className="text-emas font-sans tracking-[0.2em] text-[10px] uppercase mt-6">
                  Memuat {progress}%
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
      )}
    </AnimatePresence>
    );
}