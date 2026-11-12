"use client";
import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="min-h-dvh w-full flex flex-col items-center justify-center py-12 px-6 bg-krem text-burgundy">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <h2 className="text-2xl font-serif text-emas mb-6">Bismillahirahmanirrahim</h2>
        <p className="text-gray-700 font-sans mb-8 leading-relaxed">Assalamu'alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami.</p>

        <div className="bg-white/50 p-6 rounded-lg border border-emas/30 shadow-sm">
          <p className="font-serif text-lg mb-4 italic text-burgundy">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya
            pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir."
          </p>
          <p className="font-bold font-sans text-sm text-gray-600">(QS. Ar-Rum: 21)</p>
        </div>
      </motion.div>
    </section>
  );
}
