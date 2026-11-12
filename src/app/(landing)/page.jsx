"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Cover from "@/components/sections/Cover";
import Intro from "@/components/sections/Intro";
import Profile from "@/components/sections/Profile";
import Event from "@/components/sections/Event";
import Gallery from "@/components/sections/Gallery";
import LoveStory from "@/components/sections/LoveStory";
import RSVP from "@/components/sections/RSVP";
import Gift from "@/components/sections/Gift";

export default function LandingPage() {
  const [isCoverOpened, setIsCoverOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // State terpusat untuk seluruh data undangan dari Supabase
  const [weddingData, setWeddingData] = useState({
    profile: null,
    events: [],
    galleries: [],
    loveStories: [],
    gift: null,
  });

  useEffect(() => {
    async function fetchWeddingData() {
      try {
        const [
          { data: profile },
          { data: events },
          { data: galleries },
          { data: loveStories },
          { data: gift },
        ] = await Promise.all([
          supabase.from("profiles_config").select("*").limit(1).maybeSingle(),
          supabase.from("events").select("*"),
          supabase.from("galleries").select("*").order("display_order", { ascending: true }),
          supabase.from("love_stories").select("*").order("display_order", { ascending: true }),
          supabase.from("gifts_config").select("*").limit(1).maybeSingle(),
        ]);

        setWeddingData({
          profile: profile || null,
          events: events || [],
          galleries: galleries || [],
          loveStories: loveStories || [],
          gift: gift || null,
        });
      } catch (error) {
        console.error("Gagal memuat data undangan:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeddingData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-burgundy flex flex-col items-center justify-center text-krem font-serif">
        <p className="text-xl text-emas animate-pulse">Memuat Undangan...</p>
      </div>
    );
  }

  const { profile, events, galleries, loveStories, gift } = weddingData;

  return (
    <main className="min-h-screen bg-krem overflow-x-hidden">
      {/* Mengirim data profile & events ke Cover */}
      <Cover 
        onOpen={() => setIsCoverOpened(true)} 
        profile={profile} 
        events={events} 
      />
      
      {isCoverOpened && (
        <div className="animate-fade-in">
          <Intro profile={profile} />
          <Profile profile={profile} />
          <Event events={events} />
          <Gallery galleries={galleries} />
          <LoveStory stories={loveStories} />
          <RSVP />
          <Gift gift={gift} />
          
          {/* Footer Penutup Dinamis */}
          <footer className="py-12 bg-burgundy text-krem text-center px-6">
            <h2 className="text-2xl font-serif mb-4">Terima Kasih</h2>
            <p className="font-sans text-sm opacity-80 max-w-xl mx-auto mb-8">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
            </p>
            <p className="font-serif text-xl text-emas">
              {profile?.groom_nick_name || "Mempelai Pria"} & {profile?.bride_nick_name || "Mempelai Wanita"}
            </p>
          </footer>
        </div>
      )}
    </main>
  );
}