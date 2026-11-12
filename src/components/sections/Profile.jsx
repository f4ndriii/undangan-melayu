"use client";
import { motion } from "framer-motion";

export default function Profile({ profile }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="flex-col justify-center py-10 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-3xl font-serif text-burgundy mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeUp}
        >
          Mempelai
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          {/* Mempelai Pria */}
          <motion.div 
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            variants={fadeUp}
          >
            <div className="w-48 h-48 rounded-full border-4 border-emas p-1 mb-4">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profile?.groom_photo_url ? (
                  <img 
                    src={profile.groom_photo_url} 
                    alt={profile.groom_full_name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Foto Pria</span>
                )}
              </div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-burgundy">
              {profile?.groom_full_name || "[Nama Lengkap Pria]"}
            </h3>
            <p className="font-sans text-emas font-bold mt-1">
              ({profile?.groom_nick_name || "Panggilan Pria"})
            </p>
            <p className="font-sans text-gray-600 mt-2 text-sm max-w-xs">
              {profile?.groom_parents || "Putra dari Bapak [Nama Ayah] & Ibu [Nama Ibu]"}
            </p>
          </motion.div>

          {/* Pemisah */}
          <motion.div 
            className="text-4xl font-serif text-emas my-4 md:my-0"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            &
          </motion.div>

          {/* Mempelai Wanita */}
          <motion.div 
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            variants={fadeUp}
          >
            <div className="w-48 h-48 rounded-full border-4 border-emas p-1 mb-4">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profile?.bride_photo_url ? (
                  <img 
                    src={profile.bride_photo_url} 
                    alt={profile.bride_full_name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Foto Wanita</span>
                )}
              </div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-burgundy">
              {profile?.bride_full_name || "[Nama Lengkap Wanita]"}
            </h3>
            <p className="font-sans text-emas font-bold mt-1">
              ({profile?.bride_nick_name || "Panggilan Wanita"})
            </p>
            <p className="font-sans text-gray-600 mt-2 text-sm max-w-xs">
              {profile?.bride_parents || "Putri dari Bapak [Nama Ayah] & Ibu [Nama Ibu]"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}