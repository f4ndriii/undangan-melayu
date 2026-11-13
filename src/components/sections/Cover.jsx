"use client";
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MelayuPattern from "@/components/ui/MelayuPattern";

function GuestNameDisplay() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");

  return (
    <div className="group text-center mb-5 px-5 py-2 rounded-[2px] border border-transparent hover:border-[#D4AF37]/40 hover:bg-[#220206]/45 transition-all duration-300 cursor-default">
      <p className="text-[#E6C78C]/75 group-hover:text-[#F6E3A6] text-[10px] font-sans uppercase tracking-[0.2em] transition-colors duration-300">
        Kepada Yth.
      </p>
      <p className="text-[#F7E7CE] group-hover:text-[#F2D58E] font-serif text-lg sm:text-xl mt-1 font-medium tracking-wide group-hover:tracking-wider transition-all duration-300">
        {guestName || "Bapak/Ibu/Saudara/i"}
      </p>
      <div className="w-0 group-hover:w-16 h-[0.5px] bg-[#D4AF37]/70 mx-auto mt-1.5 transition-all duration-300" />
    </div>
  );
}

function MandalaCorner({ className }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="54" stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="3 3" />
      <circle cx="60" cy="60" r="44" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="60" cy="60" r="32" stroke="#D4AF37" strokeWidth="0.6" />
      <circle cx="60" cy="60" r="18" stroke="#D4AF37" strokeWidth="0.8" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 60 60)`}>
          <path
            d="M60 6 C65 20, 65 32, 60 42 C55 32, 55 20, 60 6 Z"
            stroke="#D4AF37"
            strokeWidth="0.7"
          />
          <path
            d="M60 18 C67 28, 67 40, 60 52 C53 40, 53 28, 60 18 Z"
            stroke="#D4AF37"
            strokeWidth="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

export default function Cover({ onOpen, profile, events }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false); 
  const [progress, setProgress] = useState(0);

  const akadEvent = events?.find((e) => e.event_type === "akad") || events?.[0];
  const formattedDate = akadEvent?.event_date
    ? new Date(akadEvent.event_date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "01 Januari 2027";

  const handleOpen = () => {
    setIsOpening(true);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          setIsOpened(true); 
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
      {!isOpened && (
        <motion.div 
          animate={{ 
            backgroundColor: isOpening ? "#FFFFFF" : "#3B060E" 
          }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-hidden"
          style={{
            backgroundImage: isOpening 
              ? "none" 
              : "radial-gradient(circle at center, #5A0B18 0%, #3B060E 65%, #260308 100%)"
          }}
        >
          {/* Tekstur latar belakang luar */}
          {!isOpening && <MelayuPattern className="opacity-[0.08]" />}

          <motion.div 
            animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.95 : 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[370px] h-full max-h-[700px] flex items-center justify-center"
          >
            <MandalaCorner className="w-40 h-40 absolute -bottom-10 -left-12 opacity-20 pointer-events-none" />
            <MandalaCorner className="w-40 h-40 absolute -bottom-10 -right-12 opacity-20 pointer-events-none" />

            <div 
              className="relative w-full h-full rounded-t-full p-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
              style={{
                background: "linear-gradient(135deg, #F6E2A5 0%, #C59B38 35%, #8F6818 65%, #E7C878 100%)"
              }}
            >
              <div className="w-full h-full bg-[#35050C] rounded-t-full p-[4px]">
                <div className="relative w-full h-full rounded-t-full border border-[#D4AF37]/75 overflow-hidden flex flex-col items-center justify-between pt-16 pb-10 px-6"
                  style={{
                    background: "radial-gradient(circle at 50% 35%, #520915 0%, #34040B 80%)"
                  }}
                >
                  {/* Tekstur bagian dalam kubah */}
                  <MelayuPattern className="opacity-[0.05] pointer-events-none" />

                  <MandalaCorner className="w-44 h-44 absolute -top-16 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none" />
                  <MandalaCorner className="w-36 h-36 absolute -bottom-14 -left-14 opacity-25 pointer-events-none" />
                  <MandalaCorner className="w-36 h-36 absolute -bottom-14 -right-14 opacity-25 pointer-events-none" />

                  {/* Bagian Atas: Walimatul Urus & Nama Mempelai */}
                  <div className="flex flex-col items-center text-center z-10 mt-1">
                    <span className="text-[#E6C78C]/80 font-sans tracking-[0.35em] text-[9px] uppercase mb-5 font-medium">
                      Walimatul Urus
                    </span>
                    
                    <h1 className="font-serif font-normal text-4xl sm:text-[46px] text-[#FAF0DF] leading-[1.05] tracking-tight">
                      <span className="block italic">{profile?.groom_nick_name || "Pria"}</span>
                      <span className="block font-script not-italic text-3xl text-[#E5C17B] my-1.5">
                        &amp;
                      </span>
                      <span className="block italic">{profile?.bride_nick_name || "Wanita"}</span>
                    </h1>
                  </div>

                  {/* Ornamen Pemisah Tipis */}
                  <div className="flex items-center gap-2 my-2 z-10 opacity-70">
                    <div className="w-8 h-[0.5px] bg-[#D4AF37]"></div>
                    <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]"></div>
                    <div className="w-8 h-[0.5px] bg-[#D4AF37]"></div>
                  </div>

                  {/* Bagian Tengah: Doa & Tanggal */}
                  <div className="flex flex-col items-center text-center z-10 px-2">
                    <p className="font-serif italic font-normal text-[14px] sm:text-[15px] text-[#F4E3C3]/85 leading-[1.65] max-w-[260px] mb-5">
                      &ldquo;Ya Allah, berkahilah pernikahan putra-putri kami ini dan jalinlah ikatan cinta yang abadi di antara mereka.&rdquo;
                    </p>
                    
                    <p className="font-sans text-[#E6C78C] tracking-[0.28em] text-[10px] uppercase font-medium">
                      {formattedDate}
                    </p>
                  </div>

                  {/* Bagian Bawah: Tamu & Tombol */}
                  <div className="z-10 flex flex-col items-center w-full mt-2">
                    <Suspense fallback={<p className="text-[#E6C78C]/80 text-[11px] font-sans mb-4">Kepada Yth. Bapak/Ibu/Saudara/i</p>}>
                      <GuestNameDisplay />
                    </Suspense>
                    
                    <button 
                      onClick={handleOpen}
                      disabled={isOpening}
                      className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-2.5 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_20px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 transition-all duration-300 disabled:opacity-0 cursor-pointer"
                      style={{
                        background: "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                        border: "1px solid #FFF2C8"
                      }}
                    >
                      {/* Kilauan cahaya melintas saat di-hover */}
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />

                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                        />
                      </svg>
                      <span className="relative z-10">Buka Undangan</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

          {/* Loading Screen */}
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
                  <div className="flex justify-center mb-6">
                    <motion.img 
                      src="/ornamen/ornamen_emas_solid_vector.svg"
                      alt="Ornamen Loading"
                      className="w-24 h-24"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  <div className="relative w-full h-[1px] bg-emas/30 mt-4">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-emas"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-burgundy border border-emas rotate-45"
                      initial={{ left: 0 }}
                      animate={{ left: `${progress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>

                  <motion.p className="text-emas font-sans tracking-[0.25em] text-[10px] uppercase mt-6">
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