"use client";
import { motion } from "framer-motion";

export default function LoveStory({ stories }) {
  const defaultStories = [
    {
      story_date: "2024-12-01",
      title: "Pertemuan Pertama",
      description: "Kami pertama kali bertemu di sebuah acara keluarga. Tidak ada yang menyangka bahwa perkenalan singkat itu akan membawa kami sejauh ini."
    },
    {
      story_date: "2025-08-01",
      title: "Menjalin Hubungan",
      description: "Setelah beberapa bulan saling mengenal, kami memutuskan untuk melangkah ke tahap yang lebih serius dan saling berkomitmen."
    },
    {
      story_date: "2026-06-01",
      title: "Lamaran",
      description: "Sebuah langkah besar diambil. Dengan restu dari kedua orang tua, kami melangsungkan acara lamaran yang sederhana namun penuh makna."
    }
  ];

  const displayStories = stories && stories.length > 0 ? stories : defaultStories;

  const formatMonthYear = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 px-6 bg-krem">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-3xl font-serif text-burgundy mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeUp}
        >
          Kisah Cinta
        </motion.h2>

        <div className="relative border-l-2 border-emas/50 ml-4 md:ml-0 md:border-l-0 md:flex md:flex-col md:items-center">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-emas/50 transform -translate-x-1/2"></div>

          {displayStories.map((story, index) => (
            <motion.div 
              key={story.id || index}
              className={`mb-10 pl-6 md:pl-0 md:w-full md:flex ${
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              } relative`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              variants={fadeUp}
            >
              <div className="absolute w-4 h-4 bg-emas rounded-full -left-[9px] top-2 md:left-1/2 md:transform md:-translate-x-1/2 border-4 border-krem shadow-sm z-10"></div>
              
              <div className={`md:w-5/12 bg-white p-6 rounded-xl border border-emas/30 shadow-sm ${
                index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
              }`}>
                <span className="text-sm font-bold text-emas font-sans block mb-1">
                  {formatMonthYear(story.story_date)}
                </span>
                <h3 className="text-lg font-serif text-burgundy mb-2">{story.title}</h3>
                <p className="text-gray-600 font-sans text-sm leading-relaxed">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}