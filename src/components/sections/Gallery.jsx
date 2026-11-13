"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MelayuPattern from "@/components/ui/MelayuPattern";

export default function Gallery({ galleries = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Gunakan seluruh foto dari Supabase; jika kosong tampilkan 6 foto contoh
  const displayGalleries =
    galleries.length > 0
      ? galleries
      : [
          {
            id: "sample-1",
            image_url:
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
            caption: "Momen Kebersamaan",
          },
          {
            id: "sample-2",
            image_url:
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
            caption: "Langkah Awal",
          },
          {
            id: "sample-3",
            image_url:
              "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
            caption: "Ikatan Janji",
          },
          {
            id: "sample-4",
            image_url:
              "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80",
            caption: "Doa & Restu",
          },
          {
            id: "sample-5",
            image_url:
              "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
            caption: "Menuju Halal",
          },
          {
            id: "sample-6",
            image_url:
              "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
            caption: "Kisah Kita",
          },
        ];

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % displayGalleries.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex(
      (prev) => (prev - 1 + displayGalleries.length) % displayGalleries.length
    );
  };

  return (
    <section
      id="gallery"
      className="relative w-full py-20 sm:py-24 px-4 sm:px-6 overflow-hidden border-t border-[#D4AF37]/20"
      style={{
        background:
          "radial-gradient(circle at center, #4A0813 0%, #31040B 70%, #220206 100%)",
      }}
    >
      {/* Tekstur Songket Melayu Halus */}
      <MelayuPattern className="opacity-[0.06]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-2">
            Potret Kenangan
          </span>
          <h2 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight mb-4">
            Galeri Bahagia
          </h2>

          {/* Ornamen Pemisah Tipis */}
          <div className="flex items-center justify-center gap-2 opacity-65">
            <div className="w-8 h-[0.5px] bg-[#D4AF37]" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]" />
            <div className="w-8 h-[0.5px] bg-[#D4AF37]" />
          </div>
        </motion.div>

        {/* Masonry Grid — Otomatis rapi untuk berapa pun jumlah foto */}
        <div className="columns-2 md:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {displayGalleries.map((item, idx) => {
            // Foto pertama diberi aksen lengkung kubah atas sebagai pembuka
            const isFirst = idx === 0;

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 6) * 0.08 }}
                onClick={() => setSelectedIndex(idx)}
                className="break-inside-avoid group cursor-pointer relative"
              >
                {/* Bingkai Luar Emas Metalik */}
                <div
                  className={`w-full p-[3px] shadow-[0_14px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-y-1 ${
                    isFirst ? "rounded-t-[140px]" : "rounded-[2px]"
                  }`}
                  style={{
                    background:
                      "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
                  }}
                >
                  <div
                    className={`w-full bg-[#2B040A] p-[2px] ${
                      isFirst ? "rounded-t-[137px]" : "rounded-[1px]"
                    }`}
                  >
                    <div
                      className={`relative w-full overflow-hidden border border-[#D4AF37]/75 bg-[#1D0206] ${
                        isFirst ? "rounded-t-[135px]" : ""
                      }`}
                    >
                      <img
                        src={item.image_url}
                        alt={item.caption || `Galeri ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-auto block object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Overlay Gradasi & Caption saat Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#240207]/90 via-[#240207]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        {item.caption && (
                          <p className="font-serif italic text-sm sm:text-base text-[#FAF0DF] tracking-wide">
                            {item.caption}
                          </p>
                        )}
                        <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#E6C78C] mt-1">
                          Perbesar Foto
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-[#180104]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              aria-label="Tutup Galeri"
              className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full border border-[#D4AF37]/60 bg-[#2B040A]/80 text-[#F4D99B] hover:bg-[#D4AF37] hover:text-[#2C0409] transition-colors flex items-center justify-center cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {displayGalleries.length > 1 && (
              <button
                onClick={handlePrev}
                aria-label="Foto Sebelumnya"
                className="absolute left-3 sm:left-6 z-50 w-10 h-10 rounded-full border border-[#D4AF37]/60 bg-[#2B040A]/80 text-[#F4D99B] hover:bg-[#D4AF37] hover:text-[#2C0409] transition-colors flex items-center justify-center cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl max-h-[85vh] flex flex-col items-center"
            >
              <div
                className="p-[3px] rounded-[2px] shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
                style={{
                  background:
                    "linear-gradient(135deg, #F6E2A5 0%, #C59B38 50%, #E7C878 100%)",
                }}
              >
                <img
                  src={displayGalleries[selectedIndex]?.image_url}
                  alt={displayGalleries[selectedIndex]?.caption || "Preview"}
                  className="max-h-[72vh] w-auto object-contain bg-[#1D0206]"
                />
              </div>

              {displayGalleries[selectedIndex]?.caption && (
                <p className="font-serif italic text-base sm:text-lg text-[#FAF0DF] mt-4 text-center">
                  {displayGalleries[selectedIndex].caption}
                </p>
              )}

              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#E6C78C]/70 mt-1">
                {selectedIndex + 1} / {displayGalleries.length}
              </span>
            </motion.div>

            {displayGalleries.length > 1 && (
              <button
                onClick={handleNext}
                aria-label="Foto Berikutnya"
                className="absolute right-3 sm:right-6 z-50 w-10 h-10 rounded-full border border-[#D4AF37]/60 bg-[#2B040A]/80 text-[#F4D99B] hover:bg-[#D4AF37] hover:text-[#2C0409] transition-colors flex items-center justify-center cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}