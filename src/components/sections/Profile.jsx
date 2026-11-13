"use client";
import { motion } from "framer-motion";
import MelayuPattern from "@/components/ui/MelayuPattern";

function CoupleCard({
  roleLabel,
  fullName,
  parentInfo,
  instagram,
  photoUrl,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center text-center w-full max-w-[320px] mx-auto"
    >
      {/* Bingkai Foto Lengkung Kubah Emas Ganda */}
      <div
        className="relative w-52 h-68 sm:w-56 sm:h-72 rounded-t-full p-[4px] shadow-[0_18px_40px_rgba(0,0,0,0.6)] mb-6"
        style={{
          background:
            "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
        }}
      >
        <div className="w-full h-full bg-[#2B040A] rounded-t-full p-[3px]">
          <div className="relative w-full h-full rounded-t-full border border-[#D4AF37]/75 overflow-hidden bg-[#1D0206] flex items-center justify-center">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={fullName}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            ) : (
              /* Fallback elegan jika foto belum diunggah di CMS */
              <div className="flex flex-col items-center justify-center p-4 text-[#E6C78C]/50">
                <span className="font-script text-4xl text-[#D4AF37]/70 mb-1">
                  {fullName?.charAt(0) || "M"}
                </span>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase">
                  Foto Mempelai
                </span>
              </div>
            )}

            {/* Vignette halus di bagian bawah foto */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#240207]/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Label Mempelai */}
      <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#E6C78C]/80 font-medium mb-2">
        {roleLabel}
      </span>

      {/* Nama Lengkap Mempelai (Editorial Serif) */}
      <h3 className="font-serif font-normal text-2xl sm:text-[28px] text-[#FAF0DF] leading-snug tracking-wide mb-2.5">
        {fullName}
      </h3>

      {/* Garis Ornamen Tipis */}
      <div className="flex items-center gap-2 mb-3 opacity-60">
        <div className="w-6 h-[0.5px] bg-[#D4AF37]"></div>
        <div className="w-1 h-1 rotate-45 bg-[#D4AF37]"></div>
        <div className="w-6 h-[0.5px] bg-[#D4AF37]"></div>
      </div>

      {/* Keterangan Putra/Putri Dari */}
      <p className="font-sans font-light text-xs text-[#F4E3C3]/80 leading-relaxed max-w-[260px] mb-3">
        {parentInfo}
      </p>

      {/* Tautan Instagram (Opsional jika diisi di CMS) */}
      {instagram && (
        <a
          href={`https://instagram.com/${instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D4AF37]/40 bg-[#4A0813]/60 text-[#F4D99B] hover:border-[#F4D99B] hover:bg-[#5E0B18] transition-all duration-300 font-sans text-[10px] tracking-wider"
        >
          <span>@{instagram.replace("@", "")}</span>
        </a>
      )}
    </motion.div>
  );
}

export default function Profile({ profile }) {
  const groomFullName = profile?.groom_full_name || "Nama Lengkap Mempelai Pria";
  const groomParents =
    profile?.groom_parents ||
    "Putra dari Bapak Fulan & Ibu Fulanah";
  const groomPhoto = profile?.groom_photo_url || "";
  const groomIg = profile?.groom_instagram || "";

  const brideFullName = profile?.bride_full_name || "Nama Lengkap Mempelai Wanita";
  const brideParents =
    profile?.bride_parents ||
    "Putri dari Bapak Fulan & Ibu Fulanah";
  const bridePhoto = profile?.bride_photo_url || "";
  const brideIg = profile?.bride_instagram || "";

  return (
    <section
      id="profile"
      className="relative w-full py-20 sm:py-24 px-4 sm:px-6 overflow-hidden border-t border-[#D4AF37]/20"
      style={{
        background:
          "radial-gradient(circle at center, #4A0813 0%, #31040B 70%, #220206 100%)",
      }}
    >
      {/* Tekstur Songket Melayu halus */}
      <MelayuPattern className="opacity-[0.06]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-2">
            Mempelai Berbahagia
          </span>
          <h2 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight">
            Pasangan Pengantin
          </h2>
        </motion.div>

        {/* Grid Dua Mempelai + Simbol "&" di Tengah */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-6">
          {/* Mempelai Pria */}
          <CoupleCard
            roleLabel="Mempelai Pria"
            fullName={groomFullName}
            parentInfo={groomParents}
            instagram={groomIg}
            photoUrl={groomPhoto}
            delay={0.1}
          />

          {/* Pemisah Ampersand Kaligrafi di Tengah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center my-2 md:my-0"
          >
            <div className="w-[0.5px] h-8 bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent hidden md:block mb-2" />
            <span className="font-script text-4xl sm:text-5xl text-[#E5C17B] select-none">
              &amp;
            </span>
            <div className="w-[0.5px] h-8 bg-gradient-to-t from-transparent via-[#D4AF37]/60 to-transparent hidden md:block mt-2" />
          </motion.div>

          {/* Mempelai Wanita */}
          <CoupleCard
            roleLabel="Mempelai Wanita"
            fullName={brideFullName}
            parentInfo={brideParents}
            instagram={brideIg}
            photoUrl={bridePhoto}
            delay={0.25}
          />
        </div>
      </div>
    </section>
  );
}