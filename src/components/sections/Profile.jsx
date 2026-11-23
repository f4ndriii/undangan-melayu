"use client";
import { motion } from "framer-motion";
import MelayuPattern from "@/components/ui/MelayuPattern";
import {
  MelayuPhotoFrame,
  MelayuCornerOrnament,
} from "@/components/ui/MelayuOrnaments";

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
      className="flex flex-col items-center text-center w-full max-w-[330px] mx-auto"
    >
      {/* Bingkai Kubah Ukiran Melayu + Puncak Pucuk Rebung + Alas Songket */}
      <div className="mb-5 transition-transform duration-500 hover:scale-[1.02]">
        <MelayuPhotoFrame
          photoUrl={photoUrl}
          altText={fullName}
          fallbackInitial={fullName?.charAt(0) || "M"}
          className="w-60 sm:w-64 mx-auto"
        />
      </div>

      {/* Label Mempelai */}
      <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#E6C78C]/85 font-medium mb-2">
        {roleLabel}
      </span>

      {/* Nama Lengkap Mempelai */}
      <h3 className="font-serif font-normal text-2xl sm:text-[28px] text-[#FAF0DF] leading-snug tracking-wide mb-2.5">
        {fullName}
      </h3>

      {/* Keterangan Putra/Putri Dari */}
      <p className="font-sans font-light text-xs text-[#F4E3C3]/80 leading-relaxed max-w-[260px] mb-3">
        {parentInfo}
      </p>

      {/* Tautan Instagram */}
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
    profile?.groom_parents || "Putra dari Bapak Fulan & Ibu Fulanah";
  const groomPhoto = profile?.groom_photo_url || "";
  const groomIg = profile?.groom_instagram || "";

  const brideFullName =
    profile?.bride_full_name || "Nama Lengkap Mempelai Wanita";
  const brideParents =
    profile?.bride_parents || "Putri dari Bapak Fulan & Ibu Fulanah";
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
      <MelayuPattern className="opacity-[0.1]" />

      <MelayuCornerOrnament className="w-36 h-36 absolute bottom-2 left-2 opacity-30 pointer-events-none" />
      <MelayuCornerOrnament flip className="w-36 h-36 absolute bottom-2 right-2 opacity-30 pointer-events-none" />

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
          <CoupleCard
            roleLabel="Mempelai Pria"
            fullName={groomFullName}
            parentInfo={groomParents}
            instagram={groomIg}
            photoUrl={groomPhoto}
            delay={0.1}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center justify-center my-2 md:my-0"
          >
            <div className="w-[0.5px] h-10 bg-gradient-to-b from-transparent via-[#D4AF37]/70 to-transparent hidden md:block mb-2" />
            <div className="w-12 h-12 rotate-45 border border-[#D4AF37]/50 bg-[#2B040A]/80 flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
              <span className="-rotate-45 font-script text-3xl sm:text-4xl text-[#E5C17B] select-none">
                &amp;
              </span>
            </div>
            <div className="w-[0.5px] h-10 bg-gradient-to-t from-transparent via-[#D4AF37]/70 to-transparent hidden md:block mt-2" />
          </motion.div>

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