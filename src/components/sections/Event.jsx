"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MelayuPattern from "@/components/ui/MelayuPattern";

function CountdownBox({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-[2px] border border-[#D4AF37]/60 bg-[#2B040A]/80 shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
      <span className="font-serif text-2xl sm:text-3xl text-[#FAF0DF] leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-[#E6C78C]/80 mt-1.5">
        {label}
      </span>
    </div>
  );
}

function EventCard({ event, index }) {
  const title =
    event?.event_name ||
    (event?.event_type === "akad" ? "Akad Nikah" : "Resepsi Pernikahan");

  const formattedDate = event?.event_date
    ? new Date(event.event_date).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Sabtu, 01 Januari 2027";

  const timeRange =
    event?.start_time && event?.end_time
      ? `${event.start_time.slice(0, 5)} – ${event.end_time.slice(0, 5)} WIB`
      : event?.start_time
      ? `${event.start_time.slice(0, 5)} WIB – Selesai`
      : "08.00 WIB – Selesai";

  const venueName = event?.venue_name || "Gedung Serbaguna / Kediaman Mempelai";
  const venueAddress =
    event?.venue_address || "Jl. Raya Utama No. 1, Kota Pekanbaru, Riau";
  const mapsUrl = event?.maps_url || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: index * 0.15 }}
      className="w-full max-w-[380px] mx-auto"
    >
      {/* Bingkai Luar Emas Metalik Bentuk Kubah */}
      <div
        className="w-full h-full rounded-t-[160px] p-[4px] shadow-[0_20px_45px_rgba(0,0,0,0.65)]"
        style={{
          background:
            "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
        }}
      >
        <div className="w-full h-full bg-[#2B040A] rounded-t-[156px] p-[3px]">
          <div
            className="relative w-full h-full rounded-t-[153px] border border-[#D4AF37]/75 pt-14 pb-9 px-6 sm:px-8 flex flex-col items-center justify-between text-center overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 50% 25%, #520915 0%, #31040B 85%)",
            }}
          >
            {/* Tekstur Songket Halus di Dalam Kartu */}
            <MelayuPattern className="opacity-[0.04]" />

            {/* Ornamen Berlian Kecil di Puncak */}
            <div className="relative z-10 flex flex-col items-center w-full">
              <div className="w-2 h-2 rotate-45 border border-[#E5C17B] mb-3 opacity-80" />

              <span className="font-sans text-[9px] tracking-[0.32em] uppercase text-[#E6C78C]/80 font-medium mb-1.5">
                Rangkaian Acara
              </span>

              <h3 className="font-script font-normal text-4xl sm:text-[42px] text-[#F2D58E] leading-tight mb-4">
                {title}
              </h3>

              {/* Garis Pemisah Tipis */}
              <div className="flex items-center gap-2 mb-6 opacity-60">
                <div className="w-8 h-[0.5px] bg-[#D4AF37]" />
                <div className="w-1 h-1 rotate-45 bg-[#D4AF37]" />
                <div className="w-8 h-[0.5px] bg-[#D4AF37]" />
              </div>

              {/* Hari & Tanggal */}
              <div className="mb-4">
                <p className="font-serif text-lg sm:text-xl text-[#FAF0DF] tracking-wide">
                  {formattedDate}
                </p>
                <p className="font-sans text-xs text-[#E6C78C] tracking-[0.15em] uppercase mt-1">
                  {timeRange}
                </p>
              </div>

              {/* Lokasi Acara */}
              <div className="mt-2 mb-7 px-2">
                <p className="font-serif font-medium text-base sm:text-lg text-[#FAF0DF] mb-1">
                  {venueName}
                </p>
                <p className="font-sans font-light text-xs text-[#F4E3C3]/80 leading-relaxed">
                  {venueAddress}
                </p>
              </div>
            </div>

            {/* Tombol Penunjuk Lokasi (Google Maps) */}
            <div className="relative z-10 w-full flex justify-center">
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-2.5 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                    border: "1px solid #FFF2C8",
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span className="relative z-10">Petunjuk Lokasi</span>
                </a>
              ) : (
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#E6C78C]/50 border border-[#D4AF37]/30 px-4 py-2 rounded-[2px]">
                  Lokasi Segera Diperbarui
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Event({ events = [] }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fallback data jika tabel events di Supabase belum diisi
  const displayEvents =
    events.length > 0
      ? events
      : [
          {
            id: "default-akad",
            event_type: "akad",
            event_name: "Akad Nikah",
            event_date: "2027-01-01",
            start_time: "08:00:00",
            end_time: "10:00:00",
            venue_name: "Masjid Raya An-Nur",
            venue_address: "Jl. Hangtuah, Pekanbaru, Riau",
            maps_url: "https://maps.google.com",
          },
          {
            id: "default-resepsi",
            event_type: "resepsi",
            event_name: "Resepsi Pernikahan",
            event_date: "2027-01-01",
            start_time: "11:00:00",
            end_time: "15:00:00",
            venue_name: "Balai Adat Melayu Riau",
            venue_address: "Jl. Diponegoro No. 26, Pekanbaru, Riau",
            maps_url: "https://maps.google.com",
          },
        ];

  const primaryEvent =
    displayEvents.find((e) => e.event_type === "akad") || displayEvents[0];

  useEffect(() => {
    if (!primaryEvent?.event_date) return;

    const timePart = primaryEvent.start_time || "08:00:00";
    const targetDate = new Date(`${primaryEvent.event_date}T${timePart}`).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [primaryEvent]);

  return (
    <section
      id="event"
      className="relative w-full py-20 sm:py-24 px-4 sm:px-6 overflow-hidden border-t border-[#D4AF37]/20"
      style={{
        background:
          "radial-gradient(circle at center, #3E060F 0%, #2B040A 75%, #1E0206 100%)",
      }}
    >
      {/* Tekstur Songket Melayu */}
      <MelayuPattern className="opacity-[0.06]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header & Hitung Mundur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-2">
            Save The Date
          </span>
          <h2 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight mb-8">
            Waktu &amp; Tempat
          </h2>

          {/* Kotak Hitung Mundur (Countdown) */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <CountdownBox value={timeLeft.days} label="Hari" />
            <CountdownBox value={timeLeft.hours} label="Jam" />
            <CountdownBox value={timeLeft.minutes} label="Menit" />
            <CountdownBox value={timeLeft.seconds} label="Detik" />
          </div>
        </motion.div>

        {/* Grid Kartu Acara (Akad & Resepsi) */}
        <div
          className={`grid grid-cols-1 ${
            displayEvents.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
          } gap-8 sm:gap-10 items-stretch justify-center`}
        >
          {displayEvents.map((eventItem, idx) => (
            <EventCard
              key={eventItem.id || idx}
              event={eventItem}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}