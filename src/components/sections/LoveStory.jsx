"use client";
import { motion } from "framer-motion";
import MelayuPattern from "@/components/ui/MelayuPattern";

export default function LoveStory({ stories = [] }) {
  // Fallback kisah jika tabel love_stories di Supabase belum diisi
  const displayStories =
    stories.length > 0
      ? stories
      : [
          {
            id: "story-1",
            year: "2022",
            title: "Awal Pertemuan",
            description:
              "Berawal dari pertemuan sederhana yang tak terduga, percakapan singkat perlahan menumbuhkan rasa nyaman dan saling memahami satu sama lain.",
          },
          {
            id: "story-2",
            year: "2024",
            title: "Menjalin Komitmen",
            description:
              "Setelah melalui berbagai musim bersama, kami menyadari bahwa langkah ke depan akan jauh lebih bermakna jika ditempuh beriringan dengan niat yang tulus.",
          },
          {
            id: "story-3",
            year: "2026",
            title: "Khithbah & Lamaran",
            description:
              "Dengan memohon ridha Allah SWT serta restu kedua orang tua, dua keluarga dipertemukan untuk mengikat janji suci menuju jenjang pernikahan.",
          },
          {
            id: "story-4",
            year: "2027",
            title: "Walimatul Urus",
            description:
              "Hari yang dinantikan pun tiba—awal babak baru bagi kami untuk membangun keluarga yang sakinah, mawaddah, warahmah.",
          },
        ];

  return (
    <section
      id="love-story"
      className="relative w-full py-20 sm:py-24 px-4 sm:px-6 overflow-hidden border-t border-[#D4AF37]/20"
      style={{
        background:
          "radial-gradient(circle at center, #3E060F 0%, #2B040A 75%, #1E0206 100%)",
      }}
    >
      {/* Tekstur Songket Melayu Halus */}
      <MelayuPattern className="opacity-[0.06]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-2">
            Perjalanan Cinta
          </span>
          <h2 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight mb-4">
            Kisah Kasih Kami
          </h2>

          {/* Ornamen Pemisah Tipis */}
          <div className="flex items-center justify-center gap-2 opacity-65">
            <div className="w-8 h-[0.5px] bg-[#D4AF37]" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]" />
            <div className="w-8 h-[0.5px] bg-[#D4AF37]" />
          </div>
        </motion.div>

        {/* Kontainer Timeline Vertikal */}
        <div className="relative">
          {/* Garis Poros Emas Vertikal (Kiri pada Mobile, Tengah pada Desktop) */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#D4AF37]/70 to-transparent" />

          <div className="space-y-10 sm:space-y-12">
            {displayStories.map((story, idx) => {
              const isEven = idx % 2 === 0;
              const yearLabel = story.year || story.date_label || "";
              const storyTitle = story.title || "Babak Kisah";
              const storyDesc =
                story.description || story.content || story.story || "";

              return (
                <motion.div
                  key={story.id || idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Penanda Berlian Emas di Garis Poros */}
                  <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                    <div className="w-4 h-4 rotate-45 bg-[#2B040A] border border-[#F4D99B] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.55)]">
                      <div className="w-1.5 h-1.5 bg-[#E5C17B]" />
                    </div>
                  </div>

                  {/* Sisi Kartu Cerita */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] pl-11 md:pl-0 ${
                      isEven ? "md:pr-4 md:text-right" : "md:pl-4 md:text-left"
                    }`}
                  >
                    <div
                      className="p-[2px] rounded-[2px] shadow-[0_14px_35px_rgba(0,0,0,0.55)]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(246,226,165,0.65) 0%, rgba(197,155,56,0.35) 50%, rgba(231,200,120,0.65) 100%)",
                      }}
                    >
                      <div
                        className="relative p-6 sm:p-7 border border-[#D4AF37]/45 overflow-hidden"
                        style={{
                          background:
                            "radial-gradient(circle at center, #4E0914 0%, #31040B 90%)",
                        }}
                      >
                        <MelayuPattern className="opacity-[0.04]" />

                        {/* Aksen Sudut Tipis */}
                        <div className="w-3 h-3 border-t border-l border-[#D4AF37]/60 absolute top-2 left-2" />
                        <div className="w-3 h-3 border-b border-r border-[#D4AF37]/60 absolute bottom-2 right-2" />

                        <div className="relative z-10">
                          {yearLabel && (
                            <span className="inline-block font-sans text-[10px] tracking-[0.28em] uppercase text-[#E6C78C] font-medium mb-1.5">
                              {yearLabel}
                            </span>
                          )}

                          <h3 className="font-serif font-normal text-2xl sm:text-[26px] text-[#FAF0DF] leading-snug mb-2.5">
                            {storyTitle}
                          </h3>

                          {/* Garis Ornamen Kecil */}
                          <div
                            className={`flex items-center gap-1.5 mb-3 opacity-60 ${
                              isEven
                                ? "justify-start md:justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div className="w-6 h-[0.5px] bg-[#D4AF37]" />
                            <div className="w-1 h-1 rotate-45 bg-[#D4AF37]" />
                            <div className="w-6 h-[0.5px] bg-[#D4AF37]" />
                          </div>

                          <p className="font-sans font-light text-xs sm:text-[13px] text-[#F4E3C3]/85 leading-[1.8]">
                            {storyDesc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer Kosong untuk Sisi Berlawanan di Desktop */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}