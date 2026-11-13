import { Cormorant_Garamond, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Undangan Pernikahan Digital",
  description: "Walimatul Urus",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${greatVibes.variable} ${jakarta.variable}`}
    >
      <body className="font-sans antialiased bg-[#2B040A] text-[#F7E7CE]">
        {children}
      </body>
    </html>
  );
}