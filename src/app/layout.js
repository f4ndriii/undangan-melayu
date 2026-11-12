import "./globals.css";

export const metadata = {
  title: "Undangan Pernikahan",
  description: "Walimatul Urus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased bg-krem text-burgundy">
        {children}
      </body>
    </html>
  );
}