"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Email atau password salah. Silakan coba lagi.");
      setIsLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-dvh bg-burgundy flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-emas/40">
        <div className="text-center mb-8">
          <span className="text-emas tracking-[0.2em] text-xs uppercase font-bold">
            Panel Admin
          </span>
          <h1 className="text-3xl font-serif text-burgundy font-bold mt-2">
            Masuk ke CMS
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Silakan masuk untuk mengelola undangan
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Email Admin
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@undangan.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-emas text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-emas text-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-burgundy text-white font-bold py-3 rounded-lg hover:bg-burgundy/90 transition-colors shadow-md disabled:opacity-50 mt-2"
          >
            {isLoading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-gray-400 hover:text-burgundy transition">
            ← Kembali ke Halaman Undangan
          </a>
        </div>
      </div>
    </div>
  );
}