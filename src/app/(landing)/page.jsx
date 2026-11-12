"use client";
import { useState } from "react";
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

  return (
    <main className="min-h-screen bg-krem overflow-x-hidden">
      <Cover onOpen={() => setIsCoverOpened(true)} />
      
      {isCoverOpened && (
        <div className="animate-fade-in">
          <Intro />
          <Profile />
          <Event />
          <Gallery />
          <LoveStory />
          <RSVP />
          <Gift />
          
          {/* Footer Penutup */}
          <footer className="py-12 bg-burgundy text-krem text-center px-6">
            <h2 className="text-2xl font-serif mb-4">Terima Kasih</h2>
            <p className="font-sans text-sm opacity-80 max-w-xl mx-auto mb-8">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
            </p>
            <p className="font-serif text-xl text-emas">[Nama Pria] & [Nama Wanita]</p>
          </footer>
        </div>
      )}
    </main>
  );
}