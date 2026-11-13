"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import MelayuPattern from "@/components/ui/MelayuPattern";

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
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg("Gagal mengirim tautan: " + error.message);
    } else {
      setSuccessMsg(
        "Tautan pemulihan kata sandi telah dikirim ke email Anda. Silakan cek kotak masuk atau folder spam."
      );
    }
  };

  return (
    <div
      className="relative min-h-dvh flex items-center justify-center p-4 overflow-hidden font-sans"
      style={{
        background:
          "radial-gradient(circle at center, #4A0813 0%, #2B040A 75%, #180104 100%)",
      }}
    >
      {/* Tekstur Songket Melayu Halus */}
      <MelayuPattern className="opacity-[0.07] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Bingkai Luar Emas Metalik */}
        <div
          className="p-[3px] rounded-[2px] shadow-[0_25px_60px_rgba(0,0,0,0.75)]"
          style={{
            background:
              "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
          }}
        >
          <div className="bg-[#2B040A] p-[3px]">
            <div
              className="relative p-8 sm:p-10 border border-[#D4AF37]/70 overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at center, #520915 0%, #31040B 85%)",
              }}
            >
              <MelayuPattern className="opacity-[0.04] pointer-events-none" />

              {/* Ornamen Sudut Tipis */}
              <div className="w-3.5 h-3.5 border-t border-l border-[#D4AF37]/65 absolute top-2.5 left-2.5" />
              <div className="w-3.5 h-3.5 border-t border-r border-[#D4AF37]/65 absolute top-2.5 right-2.5" />
              <div className="w-3.5 h-3.5 border-b border-l border-[#D4AF37]/65 absolute bottom-2.5 left-2.5" />
              <div className="w-3.5 h-3.5 border-b border-r border-[#D4AF37]/65 absolute bottom-2.5 right-2.5" />

              {/* Header */}
              <div className="relative z-10 text-center mb-8">
                <span className="block text-[#E6C78C]/80 tracking-[0.35em] text-[9px] uppercase font-medium mb-2">
                  Panel Admin
                </span>
                <h1 className="font-script font-normal text-4xl sm:text-[42px] text-[#F2D58E] leading-tight">
                  {isForgotMode ? "Lupa Password" : "Masuk ke CMS"}
                </h1>
                <p className="text-[#F4E3C3]/75 font-light text-xs sm:text-sm mt-2">
                  {isForgotMode
                    ? "Masukkan email terdaftar untuk menerima tautan reset"
                    : "Silakan masuk untuk mengelola undangan"}
                </p>
              </div>

              {errorMsg && (
                <div className="relative z-10 bg-[#5A0B18]/90 border border-red-400/50 text-red-200 text-xs p-3 rounded-[2px] mb-5 text-center">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="relative z-10 bg-[#0F4642]/85 border border-[#D4AF37]/60 text-[#FAF0DF] text-xs p-3 rounded-[2px] mb-5 text-center leading-relaxed">
                  {successMsg}
                </div>
              )}

              {!isForgotMode ? (
                /* --- FORM LOGIN --- */
                <form onSubmit={handleLogin} className="relative z-10 space-y-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
                      Email Admin
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@undangan.com"
                      className="w-full bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] px-4 py-3 text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotMode(true);
                          setErrorMsg("");
                          setSuccessMsg("");
                        }}
                        className="text-[11px] text-[#E6C78C] hover:text-[#F6E3A6] hover:underline transition-colors cursor-pointer"
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
                      className="w-full bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] px-4 py-3 text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative overflow-hidden w-full py-3 text-[#2C0409] font-serif font-semibold tracking-wider text-base rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 disabled:opacity-50 transition-all duration-300 cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                        border: "1px solid #FFF2C8",
                      }}
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />
                      <span className="relative z-10">
                        {isLoading ? "Memeriksa..." : "Masuk"}
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                /* --- FORM KIRIM EMAIL RESET --- */
                <form
                  onSubmit={handleResetRequest}
                  className="relative z-10 space-y-5"
                >
                  <div>
                    <label className="block text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
                      Email Terdaftar
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@undangan.com"
                      className="w-full bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] px-4 py-3 text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors"
                    />
                  </div>

                  <div className="pt-1 space-y-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative overflow-hidden w-full py-3 text-[#2C0409] font-serif font-semibold tracking-wider text-base rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 disabled:opacity-50 transition-all duration-300 cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                        border: "1px solid #FFF2C8",
                      }}
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />
                      <span className="relative z-10">
                        {isLoading ? "Mengirim..." : "Kirim Tautan Reset"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(false);
                        setErrorMsg("");
                        setSuccessMsg("");
                      }}
                      className="w-full text-center text-xs text-[#E6C78C]/80 hover:text-[#F6E3A6] py-1.5 transition-colors cursor-pointer"
                    >
                      ← Kembali ke Halaman Login
                    </button>
                  </div>
                </form>
              )}

              <div className="relative z-10 mt-7 pt-5 border-t border-[#D4AF37]/25 text-center">
                <a
                  href="/"
                  className="text-xs text-[#E6C78C]/70 hover:text-[#F6E3A6] transition-colors"
                >
                  ← Kembali ke Halaman Undangan
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}