"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MelayuPattern from "@/components/ui/MelayuPattern";

function BankCard({ gift }) {
  const [copied, setCopied] = useState(false);

  const bankName = gift?.bank_name || "Bank Syariah Indonesia (BSI)";
  const accountNumber = gift?.account_number || "1234567890";
  const accountHolder = gift?.account_holder || "Nama Pemilik Rekening";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Gagal menyalin nomor rekening:", err);
    }
  };

  return (
    <div
      className="w-full h-full p-[3px] rounded-[2px] shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
      style={{
        background:
          "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
      }}
    >
      <div className="w-full h-full bg-[#2B040A] p-[3px]">
        <div
          className="relative w-full h-full p-6 sm:p-8 border border-[#D4AF37]/70 flex flex-col justify-between overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 85% 15%, #580B18 0%, #31040B 80%)",
          }}
        >
          <MelayuPattern className="opacity-[0.05]" />

          <div className="w-3.5 h-3.5 border-t border-l border-[#D4AF37]/65 absolute top-2 left-2" />
          <div className="w-3.5 h-3.5 border-b border-r border-[#D4AF37]/65 absolute bottom-2 right-2" />

          <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
            <div className="text-left">
              <span className="block font-sans text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75 mb-1">
                Transfer Rekening
              </span>
              <h3 className="font-serif font-medium text-xl sm:text-2xl text-[#F2D58E] tracking-wide">
                {bankName}
              </h3>
            </div>

            <div className="w-10 h-7 rounded-[3px] border border-[#D4AF37]/60 bg-gradient-to-br from-[#F6E2A5]/25 to-[#8F6818]/25 flex items-center justify-center shrink-0">
              <div className="w-6 h-4 border border-[#D4AF37]/40 rounded-[1px]" />
            </div>
          </div>

          <div className="relative z-10 text-left mb-7">
            <p className="font-serif text-2xl sm:text-[28px] text-[#FAF0DF] tracking-[0.14em] font-normal select-all">
              {accountNumber}
            </p>
            <p className="font-sans font-light text-xs text-[#F4E3C3]/80 tracking-wider uppercase mt-1.5">
              a.n. {accountHolder}
            </p>
          </div>

          <div className="relative z-10 flex justify-start">
            <button
              type="button"
              onClick={handleCopy}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-2 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
              style={{
                background:
                  "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                border: "1px solid #FFF2C8",
              }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              {copied ? (
                <>
                  <svg
                    className="w-4 h-4 text-[#0F4642]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <span className="relative z-10">Nomor Tersalin</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
                  <span className="relative z-10">Salin Rekening</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gift({ gifts = [] }) {
  const [activeTab, setActiveTab] = useState("bank");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [zoomQris, setZoomQris] = useState(false);

  const giftList = Array.isArray(gifts) ? gifts : gifts ? [gifts] : [];

  // 1. Data Rekening Bank
  const bankAccounts =
    giftList.filter((g) => g.account_number && g.bank_name).length > 0
      ? giftList.filter((g) => g.account_number && g.bank_name)
      : [
          {
            id: "gift-1",
            bank_name: "Bank Syariah Indonesia (BSI)",
            account_number: "7123456789",
            account_holder: "Nama Mempelai Pria",
          },
          {
            id: "gift-2",
            bank_name: "Bank Central Asia (BCA)",
            account_number: "8901234567",
            account_holder: "Nama Mempelai Wanita",
          },
        ];

  // 2. Data QRIS
  const qrisItem = giftList.find(
    (g) => g.qris_url || g.qris_image_url || g.qr_code_url
  );
  const qrisUrl =
    qrisItem?.qris_url ||
    qrisItem?.qris_image_url ||
    qrisItem?.qr_code_url ||
    "";
  const qrisName =
    qrisItem?.qris_name ||
    qrisItem?.account_holder ||
    "QRIS Walimatul Urus";

  // 3. Data Alamat Pengiriman Hadiah Fisik
  const physicalGift = giftList.find(
    (g) => g.shipping_address || g.address || g.recipient_address
  );
  const shippingAddress =
    physicalGift?.shipping_address ||
    physicalGift?.address ||
    physicalGift?.recipient_address ||
    "Jl. Raya Utama No. 1, Kelurahan Simpang Baru, Kec. Tampan, Kota Pekanbaru, Riau 28293";
  const recipientName =
    physicalGift?.recipient_name ||
    physicalGift?.account_holder ||
    "Kediaman Kedua Mempelai";
  const recipientPhone =
    physicalGift?.recipient_phone || physicalGift?.phone || "";

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(shippingAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    } catch (err) {
      console.error("Gagal menyalin alamat:", err);
    }
  };

  const tabs = [
    {
      id: "bank",
      label: "Transfer Bank",
      icon: (
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
      ),
    },
    {
      id: "qris",
      label: "QRIS",
      icon: (
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 14.625h1.5v1.5h-1.5v-1.5zM18 14.625h1.5v1.5H18v-1.5zM15.75 16.875h1.5v1.5h-1.5v-1.5zM13.5 19.125h1.5v1.5h-1.5v-1.5zM18 19.125h1.5v1.5H18v-1.5z"
          />
        </svg>
      ),
    },
    {
      id: "gift",
      label: "Kirim Hadiah",
      icon: (
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="gift"
      className="relative w-full py-20 sm:py-24 px-4 sm:px-6 overflow-hidden border-t border-[#D4AF37]/20"
      style={{
        background:
          "radial-gradient(circle at center, #3E060F 0%, #2B040A 75%, #1E0206 100%)",
      }}
    >
      <MelayuPattern className="opacity-[0.06]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#E6C78C]/80 font-medium mb-2">
            Tanda Kasih
          </span>
          <h2 className="font-script font-normal text-4xl sm:text-5xl text-[#F2D58E] leading-tight mb-3">
            Amplop Digital &amp; Hadiah
          </h2>
          <p className="font-sans font-light text-xs sm:text-sm text-[#F4E3C3]/80 max-w-lg mx-auto leading-relaxed">
            Doa restu Bapak/Ibu/Saudara/i merupakan karunia yang sangat berarti bagi kami. Silakan pilih metode di bawah ini apabila berkenan menyampaikan tanda kasih.
          </p>
        </motion.div>

        {/* Navigasi Tab Pilihan Metode dengan Shimmer & Hover Interaktif */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 bg-[#220206]/90 border border-[#D4AF37]/45 rounded-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative overflow-hidden inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 font-serif text-sm sm:text-[15px] tracking-wide rounded-[2px] active:scale-95 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-[#2C0409] font-semibold shadow-[0_6px_18px_rgba(212,175,55,0.4)] hover:brightness-105"
                      : "text-[#F4E3C3]/80 border border-transparent hover:border-[#D4AF37]/45 hover:text-[#F6E3A6] hover:bg-[#4A0813]/75 hover:shadow-[0_4px_15px_rgba(212,175,55,0.18)]"
                  }`}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                          border: "1px solid #FFF2C8",
                        }
                      : undefined
                  }
                >
                  {/* Efek kilauan cahaya melintas saat di-hover */}
                  <span
                    className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none ${
                      isActive
                        ? "bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        : "bg-gradient-to-r from-transparent via-[#F6E3A6]/15 to-transparent"
                    }`}
                  />

                  <span className="relative z-10">{tab.icon}</span>
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Konten Tab Aktif */}
        <div className="min-h-[260px]">
          <AnimatePresence mode="wait">
            {activeTab === "bank" && (
              <motion.div
                key="tab-bank"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className={`grid grid-cols-1 ${
                  bankAccounts.length > 1
                    ? "md:grid-cols-2"
                    : "max-w-md mx-auto"
                } gap-6 sm:gap-8`}
              >
                {bankAccounts.map((giftItem, idx) => (
                  <BankCard key={giftItem.id || idx} gift={giftItem} />
                ))}
              </motion.div>
            )}

            {activeTab === "qris" && (
              <motion.div
                key="tab-qris"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="max-w-md mx-auto"
              >
                <div
                  className="w-full p-[3px] rounded-[2px] shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
                  }}
                >
                  <div className="w-full bg-[#2B040A] p-[3px]">
                    <div
                      className="relative w-full p-6 sm:p-8 border border-[#D4AF37]/70 flex flex-col items-center text-center overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at center, #520915 0%, #31040B 85%)",
                      }}
                    >
                      <MelayuPattern className="opacity-[0.05]" />

                      <div className="w-3.5 h-3.5 border-t border-l border-[#D4AF37]/65 absolute top-2 left-2" />
                      <div className="w-3.5 h-3.5 border-b border-r border-[#D4AF37]/65 absolute bottom-2 right-2" />

                      <div className="relative z-10 w-full flex flex-col items-center">
                        <span className="block font-sans text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75 mb-1">
                          Dompet Digital / E-Wallet
                        </span>
                        <h3 className="font-serif font-medium text-2xl text-[#F2D58E] mb-5">
                          Pindai Kode QRIS
                        </h3>

                        <div
                          onClick={() => qrisUrl && setZoomQris(true)}
                          className={`w-48 h-48 sm:w-52 sm:h-52 p-2.5 bg-[#FAF0DF] rounded-[4px] border-2 border-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center mb-3 ${
                            qrisUrl
                              ? "cursor-pointer hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(212,175,55,0.35)] transition-all duration-300"
                              : ""
                          }`}
                        >
                          {qrisUrl ? (
                            <img
                              src={qrisUrl}
                              alt="Kode QRIS Amplop Digital"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full border border-dashed border-[#4A0813]/40 flex flex-col items-center justify-center p-3 text-[#2B040A]">
                              <svg
                                className="w-10 h-10 text-[#4A0813]/70 mb-1.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                                />
                              </svg>
                              <span className="font-sans text-[10px] font-semibold tracking-wider uppercase text-[#4A0813]">
                                QRIS Ready
                              </span>
                              <span className="font-sans text-[9px] text-[#4A0813]/70 mt-0.5">
                                Unggah QR di CMS
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="font-sans text-xs text-[#E6C78C]/85 mb-5">
                          {qrisName}
                        </p>

                        {qrisUrl && (
                          <button
                            type="button"
                            onClick={() => setZoomQris(true)}
                            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-2 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
                            style={{
                              background:
                                "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                              border: "1px solid #FFF2C8",
                            }}
                          >
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                            <span className="relative z-10">Perbesar QRIS</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "gift" && (
              <motion.div
                key="tab-gift"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="max-w-lg mx-auto"
              >
                <div
                  className="w-full p-[3px] rounded-[2px] shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #F6E2A5 0%, #C59B38 40%, #8F6818 70%, #E7C878 100%)",
                  }}
                >
                  <div className="w-full bg-[#2B040A] p-[3px]">
                    <div
                      className="relative w-full p-6 sm:p-9 border border-[#D4AF37]/70 flex flex-col items-center text-center overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at center, #520915 0%, #31040B 85%)",
                      }}
                    >
                      <MelayuPattern className="opacity-[0.05]" />

                      <div className="w-3.5 h-3.5 border-t border-l border-[#D4AF37]/65 absolute top-2 left-2" />
                      <div className="w-3.5 h-3.5 border-b border-r border-[#D4AF37]/65 absolute bottom-2 right-2" />

                      <div className="relative z-10 flex flex-col items-center">
                        <span className="block font-sans text-[9px] tracking-[0.28em] uppercase text-[#E6C78C]/75 mb-1">
                          Kirim Kado Fisik
                        </span>
                        <h3 className="font-serif font-medium text-2xl text-[#F2D58E] mb-4">
                          Alamat Pengiriman
                        </h3>

                        <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-[#2B040A]/80 flex items-center justify-center text-[#F4D99B] mb-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                            />
                          </svg>
                        </div>

                        <p className="font-serif text-lg sm:text-xl text-[#FAF0DF] mb-1">
                          {recipientName}
                        </p>
                        {recipientPhone && (
                          <p className="font-sans text-xs text-[#E6C78C] mb-2">
                            {recipientPhone}
                          </p>
                        )}
                        <p className="font-sans font-light text-xs sm:text-sm text-[#F4E3C3]/85 leading-relaxed mb-6">
                          {shippingAddress}
                        </p>

                        <button
                          type="button"
                          onClick={handleCopyAddress}
                          className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-2 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
                          style={{
                            background:
                              "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                            border: "1px solid #FFF2C8",
                          }}
                        >
                          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                          <span className="relative z-10">
                            {copiedAddress ? "Alamat Tersalin" : "Salin Alamat"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Zoom QRIS */}
      <AnimatePresence>
        {zoomQris && qrisUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomQris(false)}
            className="fixed inset-0 z-50 bg-[#180104]/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full p-[3px] rounded-[2px] shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
              style={{
                background:
                  "linear-gradient(135deg, #F6E2A5 0%, #C59B38 50%, #E7C878 100%)",
              }}
            >
              <div className="bg-[#2B040A] p-6 text-center">
                <h4 className="font-serif text-xl text-[#F2D58E] mb-4">
                  {qrisName}
                </h4>
                <div className="bg-[#FAF0DF] p-3 rounded-[4px] mb-5">
                  <img
                    src={qrisUrl}
                    alt="QRIS Full"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setZoomQris(false)}
                  className="group relative overflow-hidden inline-flex items-center justify-center px-6 py-2 text-[#2C0409] font-serif font-semibold tracking-wider text-sm rounded-[2px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, #F6E3A6 0%, #D6B142 55%, #B5892A 100%)",
                    border: "1px solid #FFF2C8",
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  <span className="relative z-10">Tutup</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}