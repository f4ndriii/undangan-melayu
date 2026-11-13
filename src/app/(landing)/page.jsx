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
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
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
          supabase.from("galleries").select("*").order("sort_order", { ascending: true }),
          supabase.from("love_stories").select("*").order("sort_order", { ascending: true }),
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

  return (
    <main className="min-h-dvh w-full bg-[#38050D] text-[#FAF0DF] overflow-x-hidden">
      {/* Cover berada di lapisan paling atas (z-50) */}
      <Cover
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
    </main>
  );
}