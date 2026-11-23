"use client";
import { motion } from "framer-motion";
import MelayuPattern from "@/components/ui/MelayuPattern";
import {
  TepakSirihOrnament,
  MelayuCornerOrnament,
} from "@/components/ui/MelayuOrnaments";

function FloralBranch({ className }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 95 C45 85, 65 55, 85 20"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M35 80 C55 82, 75 75, 95 60"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M55 58 C45 40, 48 25, 60 12"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M25 90 Q15 78 30 72 Q38 82 25 90 Z" fill="#C59B38" />
      <path d="M48 68 Q35 58 48 48 Q58 58 48 68 Z" fill="#D4AF37" />
      <path d="M72 42 Q62 30 75 22 Q84 32 72 42 Z" fill="#C59B38" />
      <path d="M68 74 Q78 85 90 76 Q82 65 68 74 Z" fill="#D4AF37" />
      <circle cx="86" cy="20" r="6.5" fill="#134E4A" stroke="#F4D99B" strokeWidth="1" />
      <circle cx="86" cy="20" r="2" fill="#F4D99B" />
      <circle cx="96" cy="60" r="5.5" fill="#134E4A" stroke="#F4D99B" strokeWidth="1" />
      <circle cx="96" cy="60" r="1.8" fill="#F4D99B" />
      <circle cx="60" cy="12" r="4.5" fill="#134E4A" stroke="#F4D99B" strokeWidth="0.9" />
    </svg>
  );
}

function SideGeometricPillar() {
  return (
    <div className="hidden sm:flex flex-col justify-between w-8 shrink-0 bg-[#0D3B38] border-x border-[#D4AF37]/75 py-1.5 px-1 relative overflow-hidden">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="w-full aspect-square border border-[#D4AF37]/60 flex items-center justify-center my-0.5"
        >
          <div className="w-3 h-3 border border-[#F4D99B]/75 rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#F4D99B] rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Intro({ profile }) {
  return (
    <section
      className="min-h-dvh w-full flex flex-col items-center justify-center py-8 sm:py-10 px-4 sm:px-6 text-krem relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center, #520915 0%, #38050D 65%, #240207 100%)",
      }}
    >
      {/* Tekstur latar belakang tenun songket Melayu */}
      <MelayuPattern className="opacity-[0.1]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl flex flex-col items-center text-center z-10"
      >
        {/* Ikon Tepak Sirih & Taburan Bunga Rampai */}
        <div className="mb-2">
          <span className="block font-sans text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-[#E6C78C]/80 mb-1">
            Sirih Penyapa Tamu
          </span>
          <TepakSirihOrnament className="w-40 sm:w-48 mx-auto drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]" />
        </div>

        {/* Kaligrafi Script Bersambung & Ornamen Sulur */}
        <div className="relative w-full flex items-center justify-center mb-2.5">
          <FloralBranch className="w-14 h-14 sm:w-20 sm:h-20 -mr-1 sm:mr-2 opacity-85 shrink-0" />

          <h2 className="font-script font-normal text-3xl sm:text-5xl text-[#F2D58E] leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] px-2">
            Bismillahirrahmanirrahim
          </h2>

          <FloralBranch className="w-14 h-14 sm:w-20 sm:h-20 -ml-1 sm:ml-2 opacity-85 shrink-0 scale-x-[-1]" />
        </div>

        {/* Salam & Kalimat Pembuka */}
        <p className="font-serif font-medium text-base sm:text-lg text-[#FAF0DF] mb-1 tracking-wide">
          Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>
        <p className="font-sans font-light text-xs text-[#F4E3C3]/85 max-w-lg leading-relaxed mb-4 px-2">
          Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami.
        </p>

        {/* Pantun Pembuka Adat Melayu (Font Besar & Mudah Dibaca) */}
        <div className="w-full max-w-xl mb-5 px-5 py-3 bg-[#260308]/70 border-y border-[#D4AF37]/45 relative">
          <p className="font-serif italic text-base sm:text-lg text-[#F4D99B] leading-relaxed">
            Bunga rampai harum mewangi, disusun rapi di atas puan;
            <br />
            Tepak sirih kami suguhkan dengan hati, menyambut hadirnya Bapak/Ibu sekalian.
          </p>
        </div>

        {/* Kotak Ayat Hijau Zamrud dengan Puncak Kubah Melayu */}
        <div className="relative w-full pt-4">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 w-36 h-9 flex items-center justify-center pointer-events-none">
            <svg
              viewBox="0 0 200 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M10 54 C35 54, 45 34, 65 28 C82 23, 92 14, 100 4 C108 14, 118 23, 135 28 C155 34, 165 54, 190 54 Z"
                fill="#0D3B38"
                stroke="#E5C17B"
                strokeWidth="2.5"
              />
              <path
                d="M22 54 C42 54, 50 38, 68 32 C84 27, 93 19, 100 10 C107 19, 116 27, 132 32 C150 38, 158 54, 178 54"
                stroke="#D4AF37"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div
            className="w-full p-[2.5px] shadow-[0_12px_32px_rgba(0,0,0,0.65)]"
            style={{
              background:
                "linear-gradient(135deg, #F6E2A5 0%, #C59B38 50%, #E7C878 100%)",
            }}
          >
            <div className="w-full bg-[#0F4642] border border-[#D4AF37]/75 flex items-stretch relative">
              <SideGeometricPillar />

              <div
                className="flex-1 py-5 px-5 sm:py-6 sm:px-8 flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle at center, #155B56 0%, #0C3835 100%)",
                }}
              >
                {/* Ornamen Sudut Awan Larat Melayu */}
                <MelayuCornerOrnament className="w-16 h-16 absolute bottom-0.5 left-0.5 opacity-45 pointer-events-none" />
                <MelayuCornerOrnament
                  flip
                  className="w-16 h-16 absolute bottom-0.5 right-0.5 opacity-45 pointer-events-none"
                />

                <p className="font-serif italic font-normal text-xs sm:text-sm md:text-[15px] text-[#FAF0DF]/95 leading-[1.7] mb-3 relative z-10">
                  &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.&rdquo;
                </p>

                <p className="font-sans font-medium text-[10px] sm:text-xs text-[#E6C78C] tracking-[0.2em] uppercase relative z-10">
                  QS. Ar-Rum : 21
                </p>
              </div>

              <SideGeometricPillar />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}