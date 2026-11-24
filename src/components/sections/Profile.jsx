"use client";
import { motion } from "framer-motion";
import MelayuPattern from "@/components/ui/MelayuPattern";
import {
  MelayuPhotoFrame,
  MelayuCornerOrnament,
} from "@/components/ui/MelayuOrnaments";

function formatSingleParent(prefix, rawName, fallback) {
  const clean = rawName?.trim();
  if (!clean) return fallback;
  // Mencegah duplikasi kata "Bapak" atau "Ibu" jika terlanjur diketik di form
  const regex = new RegExp(`^${prefix}\\s+`, "i");
  return `${prefix} ${clean.replace(regex, "")}`;
}

function CoupleCard({
  roleLabel,
  rolePrefix,
  fullName,
  fatherName,
  motherName,
  instagram,
  photoUrl,
  delay = 0,
}) {
  const formattedFather = formatSingleParent(
    "Bapak",
    fatherName,
    "Bapak Fulan"
  );
  const formattedMother = formatSingleParent(
    "Ibu",
    motherName,
    "Ibu Fulanah"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center text-center w-full max-w-[360px] mx-auto"
    >
      {/* Bingkai Foto Ukuran Besar */}
      <div className="mb-3 transition-transform duration-500 hover:scale-[1.02]">
        <MelayuPhotoFrame
          photoUrl={photoUrl}
          altText={fullName}
          fallbackInitial={fullName?.charAt(0) || "M"}
          className="w-56 sm:w-64 mx-auto"
        />
      </div>

      {/* Label Mempelai */}
      <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#E6C78C]/85 font-medium mb-1">
        {roleLabel}
      </span>

      {/* Nama Lengkap Mempelai */}
      <h3 className="font-serif font-normal text-xl sm:text-2xl text-[#FAF0DF] leading-snug tracking-wide mb-2 text-balance">
        {fullName}
      </h3>

      {/* Keterangan Putra/Putri Dari (Tertata 3 Baris Simetris) */}
      <div className="font-sans font-light text-xs text-[#F4E3C3]/80 leading-relaxed mb-2 space-y-0.5">
        <span className="block text-[11px] text-[#E6C78C]/75 tracking-wide">
          {rolePrefix} dari
        </span>
        <span className="block">{formattedFather} &amp;</span>
        <span className="block">{formattedMother}</span>
      </div>

      {/* Tautan Instagram */}
      {instagram && (
        <a
          href={`https://instagram.com/${instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#D4AF37]/40 bg-[#4A0813]/60 text-[#F4D99B] hover:border-[#F4D99B] hover:bg-[#5E0B18] transition-all duration-300 font-sans text-[10px] tracking-wider"
        >
          <span>@{instagram.replace("@", "")}</span>
        </a>
      )}
    </motion.div>
  );
}

export default function Profile({ profile }) {
  const groomFullName = profile?.groom_full_name || "Nama Lengkap Mempelai Pria";
  const groomPhoto = profile?.groom_photo_url || "";
  const groomIg = profile?.groom_instagram || "";

  const brideFullName =
    profile?.bride_full_name || "Nama Lengkap Mempelai Wanita";
  const bridePhoto = profile?.bride_photo_url || "";
  const brideIg = profile?.bride_instagram || "";

  return (
    <section
      id="profile"
      className="min-h-dvh w-full flex flex-col items-center justify-center py-8 sm:py-10 px-4 sm:px-6 overflow-hidden border-t border-[#D4AF37]/20 relative"
      style={{
        background:
          "radial-gradient(circle at center, #4A0813 0%, #31040B 70%, #220206 100%)",
      }}
    >
      <MelayuPattern className="opacity-[0.1]" />

      <MelayuCornerOrnament className="w-32 h-32 absolute bottom-2 left-2 opacity-30 pointer-events-none" />
      <MelayuCornerOrnament flip className="w-32 h-32 absolute bottom-2 right-2 opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header Section Ringkas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-5 sm:mb-7"
        >
          <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-0.5">
            Mempelai Berbahagia
          </span>
          <h2 className="font-script font-normal text-3xl sm:text-4xl text-[#F2D58E] leading-tight">
            Pasangan Pengantin
          </h2>
        </motion.div>

        {/* Grid Dua Mempelai + Simbol "&" di Tengah */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-4">
          <CoupleCard
            roleLabel="Mempelai Pria"
            rolePrefix="Putra"
            fullName={groomFullName}
            fatherName={profile?.groom_father_name}
            motherName={profile?.groom_mother_name}
            instagram={groomIg}
            photoUrl={groomPhoto}
            delay={0.1}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center my-1 md:my-0"
          >
            <div className="w-[0.5px] h-8 bg-gradient-to-b from-transparent via-[#D4AF37]/70 to-transparent hidden md:block mb-2" />
            <div className="w-10 h-10 sm:w-11 sm:h-11 rotate-45 border border-[#D4AF37]/50 bg-[#2B040A]/80 flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
              <span className="-rotate-45 font-script text-2xl sm:text-3xl text-[#E5C17B] select-none">
                &amp;
              </span>
            </div>
            <div className="w-[0.5px] h-8 bg-gradient-to-t from-transparent via-[#D4AF37]/70 to-transparent hidden md:block mt-2" />
          </motion.div>

          <CoupleCard
            roleLabel="Mempelai Wanita"
            rolePrefix="Putri"
            fullName={brideFullName}
            fatherName={profile?.bride_father_name}
            motherName={profile?.bride_mother_name}
            instagram={brideIg}
            photoUrl={bridePhoto}
            delay={0.25}
          />
        </div>
      </div>
    </section>
  );
}