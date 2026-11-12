"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ galleries }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasPhotos = galleries && galleries.length > 0;
  const photos = hasPhotos ? galleries : [1, 2, 3, 4, 5, 6];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-dvh py-8 px-6 bg-white flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        
        <motion.h2 
          className="text-3xl font-serif text-burgundy mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeUp}
        >
          Galeri Kebahagiaan
        </motion.h2>

        {/* Foto Utama */}
        <motion.div 
          className="relative w-full aspect-square md:aspect-video bg-white rounded-xl overflow-hidden mb-4 border border-emas/40 shadow-md flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          variants={fadeUp}
        >
          <AnimatePresence mode="wait">
            {hasPhotos ? (
              <motion.img
                key={activeIndex}
                src={photos[activeIndex]?.image_url}
                alt={`Foto Galeri ${activeIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            ) : (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center bg-white text-burgundy/60 font-sans text-xl"
              >
                Foto Utama {photos[activeIndex]}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Thumbnail */}
        <motion.div 
          className="grid grid-cols-3 md:grid-cols-6 gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          variants={fadeUp}
        >
          {photos.map((photo, index) => (
            <div 
              key={photo.id || index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer aspect-square rounded-lg overflow-hidden flex items-center justify-center text-xs font-sans transition-all duration-300 ${
                activeIndex === index 
                  ? 'border-2 border-emas bg-krem text-burgundy opacity-100' 
                  : 'border border-emas/30 bg-white text-burgundy/50 opacity-60 hover:opacity-100'
              }`}
            >
              {hasPhotos ? (
                <img 
                  src={photo.image_url} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>Foto {photo}</span>
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}