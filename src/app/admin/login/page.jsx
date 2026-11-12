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
  const [successMsg, setSuccessMsg] = useState("");
  
  // Mode tampilan: false = form login, true = form lupa password
  const [isForgotMode, setIsForgotMode] = useState(false);

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

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // Arahkan ke halaman ganti password setelah pengguna klik link di email
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg("Gagal mengirim tautan: " + error.message);
    } else {
      setSuccessMsg("Tautan pemulihan kata sandi telah dikirim ke email Anda. Silakan cek kotak masuk atau folder spam.");
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
            {isForgotMode ? "Lupa Password" : "Masuk ke CMS"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isForgotMode
              ? "Masukkan email terdaftar untuk menerima tautan reset"
              : "Silakan masuk untuk mengelola undangan"}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg mb-4 text-center">
            {successMsg}
          </div>
        )}

        {!isForgotMode ? (
          /* --- FORM LOGIN --- */
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
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotMode(true);
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className="text-xs text-emas font-bold hover:underline"
                >
                  Lupa Password?
                </button>
              </div>
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
        ) : (
          /* --- FORM KIRIM EMAIL RESET --- */
          <form onSubmit={handleResetRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Email Terdaftar
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-burgundy text-white font-bold py-3 rounded-lg hover:bg-burgundy/90 transition-colors shadow-md disabled:opacity-50 mt-2"
            >
              {isLoading ? "Mengirim..." : "Kirim Tautan Reset"}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsForgotMode(false);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className="w-full text-center text-sm text-gray-500 hover:text-burgundy font-semibold mt-2"
            >
              ← Kembali ke Halaman Login
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-gray-400 hover:text-burgundy transition">
            ← Kembali ke Halaman Undangan
          </a>
        </div>
      </div>
    </div>
  );
}