"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Cover from "@/components/sections/Cover";
import Intro from "@/components/sections/Intro";
import Profile from "@/components/sections/Profile";
import Event from "@/components/sections/Event";
import Gallery from "@/components/sections/Gallery";
import LoveStory from "@/components/sections/LoveStory";
import RSVP from "@/components/sections/RSVP";
import Gift from "@/components/sections/Gift";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [data, setData] = useState({
    profile: null,
    events: [],
    galleries: [],
    stories: [],
    gifts: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          { data: profileData },
          { data: eventsData },
          { data: galleriesData },
          { data: storiesData },
          { data: giftsData },
        ] = await Promise.all([
          supabase.from("profiles_config").select("*").limit(1).maybeSingle(),
          supabase.from("events").select("*").order("event_date", { ascending: true }),
          supabase.from("galleries").select("*").order("display_order", { ascending: true }),
          supabase.from("love_stories").select("*").order("display_order", { ascending: true }),
          supabase.from("gifts_config").select("*"),
        ]);

        setData({
          profile: profileData,
          events: eventsData || [],
          galleries: galleriesData || [],
          stories: storiesData || [],
          gifts: giftsData || [],
        });
      } catch (err) {
        console.error("Gagal memuat data undangan:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Preload audio saat halaman pertama kali dibuka agar siap langsung diputar
  useEffect(() => {
    const audio = new Audio("/audio/musik-melayu.mp3");
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = "auto";
    audio.load();
    audioRef.current = audio;

    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleStartMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Audio gagal diputar:", err);
      });
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <main className="min-h-dvh w-full bg-[#38050D] text-[#FAF0DF] overflow-x-hidden">
      {/* Cover berada di lapisan paling atas (z-50) */}
      <Cover
        onBeforeOpen={handleStartMusic}
        onOpen={() => setIsOpened(true)}
        profile={data.profile}
        events={data.events}
      />

      {/* Intro selalu siap di belakang Cover agar saat Cover slide ke atas, Intro langsung terlihat mulus */}
      <div className={!isOpened ? "h-dvh overflow-hidden" : ""}>
        <Intro profile={data.profile} />

        {isOpened && (
          <>
            <Profile profile={data.profile} />
            <Event events={data.events} />
            <Gallery galleries={data.galleries} />
            <LoveStory stories={data.stories} />
            <RSVP />
            <Gift gifts={data.gifts} />
            <Footer profile={data.profile} />
          </>
        )}
      </div>

      {/* Tombol Kontrol Musik Melayang */}
      {isOpened && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Jeda Musik Latar" : "Putar Musik Latar"}
          title={isPlaying ? "Jeda Musik Melayu" : "Putar Musik Melayu"}
          className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.65)] border border-[#F6E2A5] text-[#2C0409] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
          }}
        >
          <span
            className={`flex items-center justify-center ${
              isPlaying ? "animate-[spin_6s_linear_infinite]" : ""
            }`}
          >
            {isPlaying ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            )}
          </span>
        </button>
      )}
    </main>
  );
}