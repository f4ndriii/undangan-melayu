/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: "#800020", // Warna merah gelap
        krem: "#F5F5DC",     // Warna krem/beige
        emas: "#D4AF37",     // Warna emas
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};