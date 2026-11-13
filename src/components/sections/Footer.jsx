"use client";
import MelayuPattern from "@/components/ui/MelayuPattern";

export default function Footer({ profile }) {
  const groom = profile?.groom_nick_name || "Pria";
  const bride = profile?.bride_nick_name || "Wanita";

  return (
    <footer
      className="relative w-full py-8 px-6 text-center overflow-hidden border-t border-[#D4AF37]/30"
      style={{
        background: "radial-gradient(circle at center, #4A0813 0%, #2B040A 100%)",
      }}
    >
      <MelayuPattern className="opacity-[0.06]" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        <p className="font-sans text-[11px] sm:text-xs text-[#F4E3C3]/80 leading-relaxed mb-3">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>

        <p className="font-serif italic text-sm text-[#E6C78C] mb-3">
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="flex items-center gap-2 mb-3 opacity-60">
          <div className="w-6 h-[0.5px] bg-[#D4AF37]"></div>
          <div className="w-1 h-1 rotate-45 border border-[#D4AF37]"></div>
          <div className="w-6 h-[0.5px] bg-[#D4AF37]"></div>
        </div>

        <h3 className="font-serif italic text-2xl text-[#FAF0DF]">
          {groom} <span className="font-script not-italic text-xl text-[#E5C17B]">&amp;</span> {bride}
        </h3>

        <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#E6C78C]/50 mt-4">
          Walimatul Urus • Digital Invitation
        </p>
      </div>
    </footer>
  );
}