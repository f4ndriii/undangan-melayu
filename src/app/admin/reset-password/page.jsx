"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import MelayuPattern from "@/components/ui/MelayuPattern";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (newPassword.length < 6) {
      return setErrorMsg("Password minimal harus 6 karakter.");
    }

    if (newPassword !== confirmPassword) {
      return setErrorMsg("Konfirmasi password tidak cocok.");
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg("Gagal memperbarui password: " + error.message);
    } else {
      setSuccessMsg(
        "Password berhasil diperbarui! Mengalihkan ke halaman admin..."
      );
      setTimeout(() => {
        router.push("/admin");
      }, 1500);
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
                  Keamanan Akun
                </span>
                <h1 className="font-script font-normal text-4xl sm:text-[42px] text-[#F2D58E] leading-tight">
                  Buat Password Baru
                </h1>
                <p className="text-[#F4E3C3]/75 font-light text-xs sm:text-sm mt-2">
                  Masukkan kata sandi baru untuk akun admin Anda
                </p>
              </div>

              {errorMsg && (
                <div className="relative z-10 bg-[#5A0B18]/90 border border-red-400/50 text-red-200 text-xs p-3 rounded-[2px] mb-5 text-center">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="relative z-10 bg-[#0F4642]/85 border border-[#D4AF37]/60 text-[#FAF0DF] text-xs p-3 rounded-[2px] mb-5 text-center">
                  {successMsg}
                </div>
              )}

              <form
                onSubmit={handleUpdatePassword}
                className="relative z-10 space-y-5"
              >
                <div>
                  <label className="block text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full bg-[#220206]/85 border border-[#D4AF37]/45 rounded-[2px] px-4 py-3 text-sm text-[#FAF0DF] placeholder:text-[#F4E3C3]/35 focus:outline-none focus:border-[#F4D99B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.22em] uppercase text-[#E6C78C]/85 mb-2">
                    Ulangi Password Baru
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ketik ulang password baru"
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
                      {isLoading ? "Menyimpan..." : "Simpan Password Baru"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}