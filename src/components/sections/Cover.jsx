"use client";
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MelayuPattern from "@/components/ui/MelayuPattern";
import {
  AwanLaratArch,
  PucukRebungDivider,
  MelayuCornerOrnament,
} from "@/components/ui/MelayuOrnaments";

function GuestNameDisplay() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");

  return (
    <div className="group text-center mb-4 px-5 py-2 rounded-[2px] border border-transparent hover:border-[#D4AF37]/40 hover:bg-[#220206]/45 transition-all duration-300 cursor-default">
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
            backgroundColor: isOpening ? "#FFFFFF" : "#3B060E",
          }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-hidden"
          style={{
            backgroundImage: isOpening
              ? "none"
              : "radial-gradient(circle at center, #5A0B18 0%, #3B060E 65%, #260308 100%)",
          }}
        >
          {/* Tekstur Songket Melayu di latar luar */}
          {!isOpening && <MelayuPattern className="opacity-[0.12]" />}

          <motion.div
            animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.95 : 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[380px] h-full max-h-[710px] flex flex-col items-center justify-center"
          >
            {/* Ornamen Sudut Luar Awan Larat */}
            <MelayuCornerOrnament className="w-32 h-32 absolute -bottom-4 -left-6 opacity-35 pointer-events-none" />
            <MelayuCornerOrnament flip className="w-32 h-32 absolute -bottom-4 -right-6 opacity-35 pointer-events-none" />

            {/* Pembungkus Kubah Emas + Ukiran Akar Awan Larat */}
            <div className="relative w-full flex-1 flex flex-col items-center">
              <AwanLaratArch className="w-[106%] -top-4 left-1/2 -translate-x-1/2 absolute z-20 drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)] pointer-events-none" />

              <div
                className="relative w-full h-full rounded-t-full p-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
                style={{
                  background:
                    "linear-gradient(135deg, #F6E2A5 0%, #C59B38 35%, #8F6818 65%, #E7C878 100%)",
                }}
              >
                <div className="w-full h-full bg-[#35050C] rounded-t-full p-[4px]">
                  <div
                    className="relative w-full h-full rounded-t-full border border-[#D4AF37]/75 overflow-hidden flex flex-col items-center justify-between pt-16 pb-9 px-6"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 35%, #520915 0%, #34040B 80%)",
                    }}
                  >
                    {/* Tekstur Songket bagian dalam kubah */}
                    <MelayuPattern className="opacity-[0.09] pointer-events-none" />

                    {/* Ornamen Awan Larat di Sudut Bawah Dalam Kubah */}
                    <MelayuCornerOrnament className="w-28 h-28 absolute bottom-1 left-1 opacity-45 pointer-events-none" />
                    <MelayuCornerOrnament flip className="w-28 h-28 absolute bottom-1 right-1 opacity-45 pointer-events-none" />

                    {/* Bagian Atas: Walimatul Urus & Nama Mempelai */}
                    <div className="flex flex-col items-center text-center z-10 mt-1">
                      <span className="text-[#E6C78C]/85 font-sans tracking-[0.35em] text-[9px] uppercase mb-4 font-medium">
                        Walimatul Urus
                      </span>

                      <h1 className="font-serif font-normal text-4xl sm:text-[44px] text-[#FAF0DF] leading-[1.05] tracking-tight">
                        <span className="block italic">
                          {profile?.groom_nick_name || "Pria"}
                        </span>
                        <span className="block font-script not-italic text-3xl text-[#E5C17B] my-1">
                          &amp;
                        </span>
                        <span className="block italic">
                          {profile?.bride_nick_name || "Wanita"}
                        </span>
                      </h1>
                    </div>

                    {/* Pembatas Pucuk Rebung & Belah Ketupat */}
                    <PucukRebungDivider className="w-56 z-10 my-1" />

                    {/* Bagian Tengah: Doa & Tanggal */}
                    <div className="flex flex-col items-center text-center z-10 px-2">
                      <p className="font-serif italic font-normal text-[13.5px] sm:text-[14.5px] text-[#F4E3C3]/85 leading-[1.6] max-w-[260px] mb-4">
                        &ldquo;Ya Allah, berkahilah pernikahan putra-putri kami ini dan jalinlah ikatan cinta yang abadi di antara mereka.&rdquo;
                      </p>

                      <p className="font-sans text-[#E6C78C] tracking-[0.28em] text-[10px] uppercase font-medium">
                        {formattedDate}
                      </p>
                    </div>

                    {/* Bagian Bawah: Tamu & Tombol */}
                    <div className="z-10 flex flex-col items-center w-full mt-1">
                      <Suspense
                        fallback={
                          <p className="text-[#E6C78C]/80 text-[11px] font-sans mb-4">
                            Kepada Yth. Bapak/Ibu/Saudara/i
                          </p>
                        }
                      >
                        <GuestNameDisplay />
                      </Suspense>

                      <button
                        onClick={handleOpen}
                        disabled={isOpening}
                        className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-2.5 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_20px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 transition-all duration-300 disabled:opacity-0 cursor-pointer"
                        style={{
                          background:
                            "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                          border: "1px solid #FFF2C8",
                        }}
                      >
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
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
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

/**
 * 5. Bingkai Foto Kubah Ukiran Melayu (Ogee Arch + Ukiran Awan Larat + Puncak Pucuk Rebung + Alas Songket)
 */
export function MelayuPhotoFrame({
  photoUrl,
  altText = "Foto Mempelai",
  fallbackInitial = "M",
  className = "w-60 sm:w-64 mx-auto",
}) {
  // ID unik untuk clipPath agar tidak bentrok antara bingkai Pria & Wanita
  const clipId = `melayu-arch-${altText.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div className={`relative select-none ${className}`}>
      <svg
        viewBox="0 0 300 390"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_20px_38px_rgba(0,0,0,0.72)]"
      >
        <defs>
          {/* Gradasi Emas Metalik 3D */}
          <linearGradient id="frameGoldMain" x1="0" y1="0" x2="300" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF0BD" />
            <stop offset="28%" stopColor="#E2BE5B" />
            <stop offset="55%" stopColor="#9E7219" />
            <stop offset="82%" stopColor="#F5DC93" />
            <stop offset="100%" stopColor="#8A6012" />
          </linearGradient>

          <linearGradient id="frameGoldDark" x1="0" y1="0" x2="0" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5C3D08" />
            <stop offset="50%" stopColor="#3B2504" />
            <stop offset="100%" stopColor="#261602" />
          </linearGradient>

          <linearGradient id="frameGoldHighlight" x1="20" y1="20" x2="280" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF8DC" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFF2C2" />
          </linearGradient>

          {/* ClipPath Bentuk Kubah Meruncing Melayu (Ogee Arch) untuk Foto */}
          <clipPath id={clipId}>
            <path d="M150 68 C178 96, 244 106, 244 176 L244 334 L56 334 L56 176 C56 106, 122 96, 150 68 Z" />
          </clipPath>
        </defs>

        {/* --- 1. PUNCAK MAHKOTA PUCUK REBUNG --- */}
        {/* Pucuk Rebung Tengah Utama */}
        <path
          d="M150 6 L168 38 L150 54 L132 38 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="1.2"
        />
        <path
          d="M150 14 L161 36 L150 47 L139 36 Z"
          fill="url(#frameGoldDark)"
        />
        <path
          d="M150 20 L156 35 L150 42 L144 35 Z"
          fill="url(#frameGoldHighlight)"
        />

        {/* Pucuk Rebung Pengapit Kiri & Kanan */}
        <path
          d="M126 24 L136 45 L122 52 L114 38 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="0.9"
        />
        <path
          d="M174 24 L186 38 L178 52 L164 45 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="0.9"
        />

        {/* --- 2. BADAN BINGKAI UTAMA (OGEE ARCH + ALAS) --- */}
        {/* Siluet Luar Bingkai Emas */}
        <path
          d="M150 42 C188 78, 272 90, 272 174 L272 342 L280 342 L280 378 L20 378 L20 342 L28 342 L28 174 C28 90, 112 78, 150 42 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="1.4"
        />

        {/* Ceruk Ukiran Gelap (Memberi Efek Pahatan Timbul 3D) */}
        <path
          d="M150 52 C183 84, 260 96, 260 175 L260 338 L40 338 L40 175 C40 96, 117 84, 150 52 Z"
          fill="url(#frameGoldDark)"
        />

        {/* --- 3. UKIRAN SULUR AWAN LARAT TIMBUL DI SEPANJANG LENGKUNG & PILAR --- */}
        <g stroke="url(#frameGoldHighlight)" strokeWidth="2.1" strokeLinecap="round" fill="none">
          {/* Sulur Kubah Atas Kiri */}
          <path d="M146 60 C130 68, 126 84, 138 86 C146 87, 148 79, 142 78" />
          <path d="M124 72 C104 76, 94 94, 108 100 C116 103, 121 94, 114 91" />
          <path d="M94 92 C72 100, 62 122, 78 128 C87 131, 92 121, 84 118" />
          <path d="M68 122 C48 134, 44 156, 58 160 C66 162, 70 152, 62 150" />

          {/* Sulur Kubah Atas Kanan */}
          <path d="M154 60 C170 68, 174 84, 162 86 C154 87, 152 79, 158 78" />
          <path d="M176 72 C196 76, 206 94, 192 100 C184 103, 179 94, 186 91" />
          <path d="M206 92 C228 100, 238 122, 222 128 C213 131, 208 121, 216 118" />
          <path d="M232 122 C252 134, 256 156, 242 160 C234 162, 230 152, 238 150" />

          {/* Sulur Pilar Vertikal Kiri (Berulang ke Bawah) */}
          {[172, 206, 240, 274, 306].map((y) => (
            <g key={`left-${y}`}>
              <path
                d={`M48 ${y} C38 ${y + 8}, 38 ${y + 22}, 50 ${y + 24} C57 ${y + 25}, 59 ${y + 17}, 52 ${y + 16}`}
              />
              <circle cx="48" cy={y + 12} r="1.4" fill="#FFF3C8" stroke="none" />
            </g>
          ))}

          {/* Sulur Pilar Vertikal Kanan (Berulang ke Bawah) */}
          {[172, 206, 240, 274, 306].map((y) => (
            <g key={`right-${y}`}>
              <path
                d={`M252 ${y} C262 ${y + 8}, 262 ${y + 22}, 250 ${y + 24} C243 ${y + 25}, 241 ${y + 17}, 248 ${y + 16}`}
              />
              <circle cx="252" cy={y + 12} r="1.4" fill="#FFF3C8" stroke="none" />
            </g>
          ))}
        </g>

        {/* --- 4. LIS DALAM KUBAH (PEMBATAS FOTO) --- */}
        <path
          d="M150 64 C180 93, 248 104, 248 176 L248 336 L52 336 L52 176 C52 104, 120 93, 150 64 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF5CE"
          strokeWidth="1"
        />

        {/* --- 5. AREA FOTO MEMPELAI (TERPOTONG RAPI SESUAI KUBAH) --- */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="52" y="64" width="196" height="274" fill="#1E0206" />
          {photoUrl ? (
            <image
              href={photoUrl}
              x="52"
              y="66"
              width="196"
              height="272"
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <g>
              <text
                x="150"
                y="205"
                textAnchor="middle"
                fill="#D4AF37"
                fillOpacity="0.7"
                fontSize="54"
                fontFamily="serif"
                fontStyle="italic"
              >
                {fallbackInitial}
              </text>
              <text
                x="150"
                y="232"
                textAnchor="middle"
                fill="#E6C78C"
                fillOpacity="0.55"
                fontSize="9"
                letterSpacing="3"
              >
                FOTO MEMPELAI
              </text>
            </g>
          )}
          {/* Bayangan Vignette Halus di Tepi Dalam Bingkai */}
          <rect
            x="52"
            y="270"
            width="196"
            height="68"
            fill="url(#frameGoldDark)"
            fillOpacity="0.35"
          />
        </g>

        {/* Garis Emas Tipis Mengelilingi Foto */}
        <path
          d="M150 68 C178 96, 244 106, 244 176 L244 334 L56 334 L56 176 C56 106, 122 96, 150 68 Z"
          stroke="#FFF3C8"
          strokeWidth="1.2"
          fill="none"
        />

        {/* --- 6. PANEL ALAS BAWAH MOTIF SONGKET BELAH KETUPAT & PUCUK REBUNG --- */}
        <rect
          x="26"
          y="346"
          width="248"
          height="26"
          fill="url(#frameGoldDark)"
          stroke="#FFF3C8"
          strokeWidth="1"
        />

        {/* Deret Motif Belah Ketupat Songket di Alas Bawah */}
        {[42, 66, 90, 114, 138, 162, 186, 210, 234, 258].map((cx) => (
          <g key={`songket-${cx}`}>
            <path
              d={`M${cx} 349 L${cx + 10} 359 L${cx} 369 L${cx - 10} 359 Z`}
              stroke="url(#frameGoldHighlight)"
              strokeWidth="1.3"
              fill="url(#frameGoldMain)"
              fillOpacity="0.28"
            />
            <circle cx={cx} cy="359" r="1.8" fill="#FFF3C8" />
          </g>
        ))}

        {/* Kaki Sudut Bawah Kiri & Kanan */}
        <rect x="18" y="373" width="264" height="5" rx="1" fill="url(#frameGoldMain)" />
      </svg>
    </div>
  );
}