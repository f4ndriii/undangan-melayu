"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");

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
      alert("Password berhasil diperbarui! Silakan masuk menggunakan password baru Anda.");
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-dvh bg-burgundy flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-emas/40">
        <div className="text-center mb-8">
          <span className="text-emas tracking-[0.2em] text-xs uppercase font-bold">
            Keamanan Akun
          </span>
          <h1 className="text-3xl font-serif text-burgundy font-bold mt-2">
            Buat Password Baru
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Masukkan kata sandi baru untuk akun admin Anda
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Password Baru
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-emas text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Ulangi Password Baru
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ketik ulang password baru"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-emas text-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-burgundy text-white font-bold py-3 rounded-lg hover:bg-burgundy/90 transition-colors shadow-md disabled:opacity-50 mt-2"
          >
            {isLoading ? "Menyimpan..." : "Simpan Password Baru"}
          </button>
        </form>
      </div>
    </div>
  );
}