"use client";

/**
 * 1. Mahkota Selembayung (Untuk di atas teks Intro / Judul Section)
 */
export function SelembayungCrown({ className = "w-48 sm:w-56 mx-auto" }) {
  return (
    <svg
      viewBox="0 0 320 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldMelayu" x1="0" y1="0" x2="320" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F6E2A5" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="75%" stopColor="#9E731C" />
          <stop offset="100%" stopColor="#F3D999" />
        </linearGradient>
      </defs>

      <path
        d="M160 58 C135 32, 102 14, 72 8 C84 24, 92 42, 86 58 C108 52, 134 56, 160 68 Z"
        stroke="url(#goldMelayu)"
        strokeWidth="1.7"
        fill="url(#goldMelayu)"
        fillOpacity="0.18"
      />
      <path
        d="M160 58 C185 32, 218 14, 248 8 C236 24, 228 42, 234 58 C212 52, 186 56, 160 68 Z"
        stroke="url(#goldMelayu)"
        strokeWidth="1.7"
        fill="url(#goldMelayu)"
        fillOpacity="0.18"
      />
      <path
        d="M24 72 C58 72, 74 52, 106 58 C126 62, 144 68, 160 72"
        stroke="url(#goldMelayu)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M296 72 C262 72, 246 52, 214 58 C194 62, 176 68, 160 72"
        stroke="url(#goldMelayu)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="72" r="3" fill="url(#goldMelayu)" />
      <circle cx="300" cy="72" r="3" fill="url(#goldMelayu)" />
      <path
        d="M160 10 L172 38 L160 54 L148 38 Z"
        stroke="url(#goldMelayu)"
        strokeWidth="1.7"
        fill="url(#goldMelayu)"
        fillOpacity="0.32"
      />
      <circle cx="160" cy="35" r="2.8" fill="#FAF0DF" />
      <path
        d="M160 62 L172 72 L160 82 L148 72 Z"
        fill="url(#goldMelayu)"
      />
    </svg>
  );
}

/**
 * 2. Bingkai Puncak Akar & Sulur Awan Larat (Melengkung mengikuti kubah Cover & Profile)
 */
export function AwanLaratArch({ className = "w-full pointer-events-none" }) {
  return (
    <svg
      viewBox="0 0 360 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="akarEmas" x1="20" y1="10" x2="340" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8E7B4" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#9C711A" />
          <stop offset="100%" stopColor="#F5DC9B" />
        </linearGradient>
      </defs>

      {/* Punca Tengah (Kuntum Bunga Kundur / Pucuk Sulur Utama di Puncak) */}
      <path
        d="M180 8 C186 20, 189 31, 180 42 C171 31, 174 20, 180 8 Z"
        stroke="url(#akarEmas)"
        strokeWidth="1.6"
        fill="url(#akarEmas)"
        fillOpacity="0.35"
      />
      <path
        d="M180 22 C169 17, 160 22, 159 31 C166 33, 173 31, 180 36"
        stroke="url(#akarEmas)"
        strokeWidth="1.4"
        fill="url(#akarEmas)"
        fillOpacity="0.2"
      />
      <path
        d="M180 22 C191 17, 200 22, 201 31 C194 33, 187 31, 180 36"
        stroke="url(#akarEmas)"
        strokeWidth="1.4"
        fill="url(#akarEmas)"
        fillOpacity="0.2"
      />
      <circle cx="180" cy="25" r="2.5" fill="#FAF0DF" />

      {/* --- SULUR AKAR KIRI (Mengalir mengikuti lengkung kubah ke bawah) --- */}
      {/* Batang Akar Utama Kiri */}
      <path
        d="M174 36 C135 34, 92 50, 62 82 C38 108, 26 132, 22 150"
        stroke="url(#akarEmas)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Batang Akar Pendamping (Lapis Dalam) */}
      <path
        d="M176 42 C142 42, 102 58, 74 88 C52 112, 42 134, 38 150"
        stroke="url(#akarEmas)"
        strokeWidth="1"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />

      {/* Kaluk Pakis 1 (Atas Kiri - melingkar ke luar) */}
      <path
        d="M148 37 C134 22, 114 23, 108 35 C104 43, 112 49, 119 45 C124 42, 122 36, 117 36"
        stroke="url(#akarEmas)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Daun Awan Larat 1 */}
      <path
        d="M132 42 C121 48, 115 58, 121 65 C128 63, 134 55, 138 44"
        stroke="url(#akarEmas)"
        strokeWidth="1.2"
        fill="url(#akarEmas)"
        fillOpacity="0.22"
      />

      {/* Kaluk Pakis 2 (Tengah Kiri - melingkar ke luar) */}
      <path
        d="M104 52 C85 40, 65 46, 61 60 C58 70, 68 76, 75 70 C80 66, 77 59, 71 60"
        stroke="url(#akarEmas)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Daun Awan Larat 2 */}
      <path
        d="M86 64 C73 72, 68 85, 76 92 C84 89, 89 79, 92 66"
        stroke="url(#akarEmas)"
        strokeWidth="1.2"
        fill="url(#akarEmas)"
        fillOpacity="0.22"
      />

      {/* Kaluk Pakis 3 (Bawah Kiri - melingkar ke luar) */}
      <path
        d="M56 90 C36 84, 20 96, 20 112 C20 123, 32 127, 38 119 C42 114, 37 107, 32 109"
        stroke="url(#akarEmas)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Ujung Sulur Bawah Kiri */}
      <path
        d="M28 134 C16 134, 10 143, 14 151"
        stroke="url(#akarEmas)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="117" cy="36" r="1.8" fill="#FAF0DF" />
      <circle cx="71" cy="60" r="1.8" fill="#FAF0DF" />
      <circle cx="32" cy="109" r="1.8" fill="#FAF0DF" />

      {/* --- SULUR AKAR KANAN (Cerminan Simetris Kiri) --- */}
      {/* Batang Akar Utama Kanan */}
      <path
        d="M186 36 C225 34, 268 50, 298 82 C322 108, 334 132, 338 150"
        stroke="url(#akarEmas)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Batang Akar Pendamping (Lapis Dalam) */}
      <path
        d="M184 42 C218 42, 258 58, 286 88 C308 112, 318 134, 322 150"
        stroke="url(#akarEmas)"
        strokeWidth="1"
        strokeOpacity="0.65"
        strokeLinecap="round"
      />

      {/* Kaluk Pakis 1 (Atas Kanan) */}
      <path
        d="M212 37 C226 22, 246 23, 252 35 C256 43, 248 49, 241 45 C236 42, 238 36, 243 36"
        stroke="url(#akarEmas)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Daun Awan Larat 1 */}
      <path
        d="M228 42 C239 48, 245 58, 239 65 C232 63, 226 55, 222 44"
        stroke="url(#akarEmas)"
        strokeWidth="1.2"
        fill="url(#akarEmas)"
        fillOpacity="0.22"
      />

      {/* Kaluk Pakis 2 (Tengah Kanan) */}
      <path
        d="M256 52 C275 40, 295 46, 299 60 C302 70, 292 76, 285 70 C280 66, 283 59, 289 60"
        stroke="url(#akarEmas)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Daun Awan Larat 2 */}
      <path
        d="M274 64 C287 72, 292 85, 284 92 C276 89, 271 79, 268 66"
        stroke="url(#akarEmas)"
        strokeWidth="1.2"
        fill="url(#akarEmas)"
        fillOpacity="0.22"
      />

      {/* Kaluk Pakis 3 (Bawah Kanan) */}
      <path
        d="M304 90 C324 84, 340 96, 340 112 C340 123, 328 127, 322 119 C318 114, 323 107, 328 109"
        stroke="url(#akarEmas)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Ujung Sulur Bawah Kanan */}
      <path
        d="M332 134 C344 134, 350 143, 346 151"
        stroke="url(#akarEmas)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="243" cy="36" r="1.8" fill="#FAF0DF" />
      <circle cx="289" cy="60" r="1.8" fill="#FAF0DF" />
      <circle cx="328" cy="109" r="1.8" fill="#FAF0DF" />
    </svg>
  );
}

/**
 * 3. Pembatas Pucuk Rebung & Belah Ketupat
 */
export function PucukRebungDivider({ className = "w-full max-w-xs mx-auto" }) {
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`} aria-hidden="true">
      <div className="flex-1 flex items-center justify-end gap-1">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
        <svg viewBox="0 0 60 16" className="w-11 h-3 shrink-0" fill="none">
          <path d="M4 13 L12 3 L20 13 Z" stroke="#D4AF37" strokeWidth="1.2" fill="#D4AF37" fillOpacity="0.22" />
          <path d="M22 13 L30 3 L38 13 Z" stroke="#D4AF37" strokeWidth="1.2" fill="#D4AF37" fillOpacity="0.35" />
          <path d="M40 13 L48 3 L56 13 Z" stroke="#D4AF37" strokeWidth="1.2" fill="#D4AF37" fillOpacity="0.5" />
        </svg>
      </div>

      <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
        <path
          d="M18 2 L34 18 L18 34 L2 18 Z"
          stroke="#F4D99B"
          strokeWidth="1.4"
          fill="#D4AF37"
          fillOpacity="0.22"
        />
        <path
          d="M18 8 L28 18 L18 28 L8 18 Z"
          stroke="#D4AF37"
          strokeWidth="1.2"
          fill="#D4AF37"
          fillOpacity="0.4"
        />
        <circle cx="18" cy="18" r="2.5" fill="#FAF0DF" />
      </svg>

      <div className="flex-1 flex items-center justify-start gap-1">
        <svg viewBox="0 0 60 16" className="w-11 h-3 shrink-0" fill="none">
          <path d="M4 13 L12 3 L20 13 Z" stroke="#D4AF37" strokeWidth="1.2" fill="#D4AF37" fillOpacity="0.5" />
          <path d="M22 13 L30 3 L38 13 Z" stroke="#D4AF37" strokeWidth="1.2" fill="#D4AF37" fillOpacity="0.35" />
          <path d="M40 13 L48 3 L56 13 Z" stroke="#D4AF37" strokeWidth="1.2" fill="#D4AF37" fillOpacity="0.22" />
        </svg>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
      </div>
    </div>
  );
}

/**
 * 4. Ornamen Sudut Awan Larat & Pucuk Rebung
 */
export function MelayuCornerOrnament({ className = "w-32 h-32", flip = false }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flip ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M6 114 C6 58, 58 6, 114 6"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      <path
        d="M14 114 C14 64, 64 14, 114 14"
        stroke="#F4D99B"
        strokeWidth="1"
      />
      <path
        d="M20 110 C22 72, 46 46, 84 36 C68 48, 62 64, 64 82 C48 80, 32 90, 20 110 Z"
        stroke="#D4AF37"
        strokeWidth="1.2"
        fill="#D4AF37"
        fillOpacity="0.16"
      />
      <path d="M12 96 L22 86 L28 98 Z" stroke="#F4D99B" strokeWidth="1" fill="#D4AF37" fillOpacity="0.3" />
      <path d="M32 72 L44 64 L48 78 Z" stroke="#F4D99B" strokeWidth="1" fill="#D4AF37" fillOpacity="0.3" />
      <path d="M56 48 L68 42 L70 56 Z" stroke="#F4D99B" strokeWidth="1" fill="#D4AF37" fillOpacity="0.3" />
      <circle cx="44" cy="44" r="3" fill="#F4D99B" fillOpacity="0.7" />
    </svg>
  );
}

/**
 * 5. Bingkai Foto Kubah Melayu Minimalis (Tepian Tipis + Mahkota Pucuk Rebung + Filigree Sulur Akar)
 */
export function MelayuPhotoFrame({
  photoUrl,
  altText = "Foto Mempelai",
  fallbackInitial = "M",
  className = "w-56 sm:w-64 mx-auto",
}) {
  const clipId = `melayu-arch-${altText.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <div className={`relative select-none ${className}`}>
      <svg
        viewBox="0 0 300 390"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)]"
      >
        <defs>
          {/* Gradasi Emas Halus */}
          <linearGradient id="frameGoldMain" x1="0" y1="0" x2="300" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8E7B4" />
            <stop offset="35%" stopColor="#D8B34C" />
            <stop offset="68%" stopColor="#9E731B" />
            <stop offset="100%" stopColor="#F3D993" />
          </linearGradient>

          {/* Dasar Ceruk Gelap Tipis */}
          <linearGradient id="frameGoldDark" x1="0" y1="0" x2="0" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#351E05" />
            <stop offset="50%" stopColor="#241302" />
            <stop offset="100%" stopColor="#1B0D01" />
          </linearGradient>

          {/* Kilau Emas Tipis untuk Sulur Akar */}
          <linearGradient id="rootGoldBright" x1="30" y1="10" x2="270" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="50%" stopColor="#E6C260" />
            <stop offset="100%" stopColor="#F5DC98" />
          </linearGradient>

          {/* ClipPath Area Foto Lebih Luas (Mengikuti Kubah Tipis) */}
          <clipPath id={clipId}>
            <path d="M150 56 C182 86, 254 96, 254 168 L254 344 L46 344 L46 168 C46 96, 118 86, 150 56 Z" />
          </clipPath>
        </defs>

        {/* --- 1. MAHKOTA PUCUK REBUNG RAMPING --- */}
        <path
          d="M150 8 L161 32 L150 43 L139 32 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="0.9"
        />
        <path
          d="M150 15 L156 31 L150 38 L144 31 Z"
          fill="url(#frameGoldDark)"
        />
        {/* Pucuk Rebung Kecil Pengapit */}
        <path
          d="M132 23 L139 38 L129 43 L124 32 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="0.7"
        />
        <path
          d="M168 23 L176 32 L171 43 L161 38 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="0.7"
        />

        {/* --- 2. BADAN BINGKAI TIPIS (KETEBALAN RAMPING) --- */}
        {/* Lis Luar Bingkai */}
        <path
          d="M150 38 C186 72, 268 84, 268 167 L268 350 L273 350 L273 374 L27 374 L27 350 L32 350 L32 167 C32 84, 114 72, 150 38 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="1"
        />

        {/* Ceruk Gelap Ramping Tempat Sulur Akar */}
        <path
          d="M150 44 C184 76, 262 88, 262 167 L262 348 L38 348 L38 167 C38 88, 116 76, 150 44 Z"
          fill="url(#frameGoldDark)"
        />

        {/* --- 3. UKIRAN FILIGREE SULUR AKAR HALUS (MINIMALIS) --- */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Sulur Akar Halus Sisi Kiri */}
          <path
            d="M148 48 C132 62, 114 68, 98 80 C80 94, 58 108, 48 134 C40 156, 48 182, 42 208 C36 234, 48 260, 42 288 C38 308, 46 328, 42 345"
            stroke="url(#rootGoldBright)"
            strokeWidth="1.4"
          />
          <path
            d="M145 52 C128 60, 120 76, 102 86 C82 96, 70 118, 52 140 C38 158, 40 186, 47 212 C52 234, 38 262, 47 290 C51 308, 40 328, 47 345"
            stroke="url(#frameGoldMain)"
            strokeWidth="0.9"
            strokeOpacity="0.8"
          />
          {/* Lengkungan Sulur Akar Kecil Kiri */}
          <path d="M122 66 C114 58, 104 64, 109 72" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M88 88 C76 82, 68 92, 74 99" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M58 118 C46 115, 42 127, 50 133" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M44 166 C37 164, 36 177, 45 180" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M44 218 C50 216, 51 229, 42 232" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M44 270 C37 268, 36 281, 45 284" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M44 316 C50 314, 51 327, 42 330" stroke="url(#rootGoldBright)" strokeWidth="1" />

          {/* Sulur Akar Halus Sisi Kanan (Simetris) */}
          <path
            d="M152 48 C168 62, 186 68, 202 80 C220 94, 242 108, 252 134 C260 156, 252 182, 258 208 C264 234, 252 260, 258 288 C262 308, 254 328, 258 345"
            stroke="url(#rootGoldBright)"
            strokeWidth="1.4"
          />
          <path
            d="M155 52 C172 60, 180 76, 198 86 C218 96, 230 118, 248 140 C262 158, 260 186, 253 212 C248 234, 262 262, 253 290 C249 308, 260 328, 253 345"
            stroke="url(#frameGoldMain)"
            strokeWidth="0.9"
            strokeOpacity="0.8"
          />
          {/* Lengkungan Sulur Akar Kecil Kanan */}
          <path d="M178 66 C186 58, 196 64, 191 72" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M212 88 C224 82, 232 92, 226 99" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M242 118 C254 115, 258 127, 250 133" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M256 166 C263 164, 264 177, 255 180" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M256 218 C250 216, 249 229, 258 232" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M256 270 C263 268, 264 281, 255 284" stroke="url(#rootGoldBright)" strokeWidth="1" />
          <path d="M256 316 C250 314, 249 327, 258 330" stroke="url(#rootGoldBright)" strokeWidth="1" />
        </g>

        {/* --- 4. LIS DALAM TIPIS PEMBATAS FOTO --- */}
        <path
          d="M150 53 C183 84, 256 94, 256 168 L256 346 L44 346 L44 168 C44 94, 117 84, 150 53 Z"
          fill="url(#frameGoldMain)"
          stroke="#FFF5CE"
          strokeWidth="0.8"
        />

        {/* --- 5. AREA FOTO MEMPELAI --- */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="44" y="54" width="212" height="292" fill="#1E0206" />
          {photoUrl ? (
            <image
              href={photoUrl}
              x="44"
              y="55"
              width="212"
              height="290"
              preserveAspectRatio="xMidYMid slice"
            />
          ) : (
            <g>
              <text
                x="150"
                y="205"
                textAnchor="middle"
                fill="#D4AF37"
                fillOpacity="0.7"
                fontSize="52"
                fontFamily="serif"
                fontStyle="italic"
              >
                {fallbackInitial}
              </text>
              <text
                x="150"
                y="232"
                textAnchor="middle"
                fill="#E6C78C"
                fillOpacity="0.55"
                fontSize="9"
                letterSpacing="3"
              >
                FOTO MEMPELAI
              </text>
            </g>
          )}
          <rect
            x="44"
            y="285"
            width="212"
            height="61"
            fill="url(#frameGoldDark)"
            fillOpacity="0.3"
          />
        </g>

        {/* Garis Emas Halus di Tepi Foto */}
        <path
          d="M150 56 C182 86, 254 96, 254 168 L254 344 L46 344 L46 168 C46 96, 118 86, 150 56 Z"
          stroke="#FFF3C8"
          strokeWidth="0.9"
          fill="none"
        />

        {/* --- 6. PANEL ALAS BAWAH RAMPING DENGAN SULUR AKAR TIPIS --- */}
        <rect
          x="32"
          y="353"
          width="236"
          height="16"
          fill="url(#frameGoldDark)"
          stroke="#FFF3C8"
          strokeWidth="0.7"
        />

        <g fill="none" strokeLinecap="round">
          <path
            d="M38 361 C54 354, 70 368, 86 361 C102 354, 118 368, 134 361 C150 354, 166 368, 182 361 C198 354, 214 368, 230 361 C244 355, 254 365, 262 361"
            stroke="url(#rootGoldBright)"
            strokeWidth="1.3"
          />
          <path
            d="M38 361 C54 368, 70 354, 86 361 C102 368, 118 354, 134 361 C150 368, 166 354, 182 361 C198 368, 214 354, 230 361 C244 367, 254 357, 262 361"
            stroke="url(#frameGoldMain)"
            strokeWidth="0.8"
            strokeOpacity="0.8"
          />
        </g>

        {/* Garis Kaki Bawah Tipis */}
        <rect x="25" y="371" width="250" height="3" rx="1" fill="url(#frameGoldMain)" />
      </svg>
    </div>
  );
}

/**
 * 6. Ikon Tepak Sirih & Taburan Bunga Rampai (Simbol Penyambutan Tamu Adat Melayu)
 */
export function TepakSirihOrnament({ className = "w-56 sm:w-64 mx-auto" }) {
  return (
    <svg
      viewBox="0 0 320 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tepakGoldMain" x1="40" y1="10" x2="280" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2C2" />
          <stop offset="35%" stopColor="#E2BE5B" />
          <stop offset="70%" stopColor="#9C7018" />
          <stop offset="100%" stopColor="#F5DC93" />
        </linearGradient>

        <linearGradient id="tepakGoldDark" x1="0" y1="30" x2="0" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A2E07" />
          <stop offset="100%" stopColor="#261502" />
        </linearGradient>

        <linearGradient id="sirihLeafGold" x1="120" y1="12" x2="200" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="55%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6212" />
        </linearGradient>
      </defs>

      {/* --- 1. SUSUNAN DAUN SIRIH MEKAR DI ATAS CERANA --- */}
      {/* Daun Sirih Belakang Kiri */}
      <path
        d="M148 52 C126 46, 114 28, 126 16 C140 22, 150 36, 152 52 Z"
        fill="url(#sirihLeafGold)"
        fillOpacity="0.45"
        stroke="#FFF3C8"
        strokeWidth="1.1"
      />
      {/* Daun Sirih Belakang Kanan */}
      <path
        d="M172 52 C194 46, 206 28, 194 16 C180 22, 170 36, 168 52 Z"
        fill="url(#sirihLeafGold)"
        fillOpacity="0.45"
        stroke="#FFF3C8"
        strokeWidth="1.1"
      />
      {/* Daun Sirih Tengah Utama (Tegak) */}
      <path
        d="M160 52 C142 38, 144 18, 160 8 C176 18, 178 38, 160 52 Z"
        fill="url(#sirihLeafGold)"
        fillOpacity="0.72"
        stroke="#FFF8DC"
        strokeWidth="1.3"
      />
      {/* Tulang Daun Sirih Tengah */}
      <path
        d="M160 12 L160 50 M160 24 L152 19 M160 24 L168 19 M160 34 L150 28 M160 34 L170 28"
        stroke="#3B2304"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* --- 2. CEMBUL / COMBOL KIRI & KANAN (WADAH PINANG, KAPUR & GAMBIR) --- */}
      {/* Cembul Kiri */}
      <g>
        <path
          d="M86 64 L112 64 L109 80 L89 80 Z"
          fill="url(#tepakGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="1"
        />
        {/* Tutup Kubah Cembul Kiri */}
        <path
          d="M84 64 C84 55, 114 55, 114 64 Z"
          fill="url(#tepakGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="1"
        />
        <circle cx="99" cy="54" r="2.2" fill="#FFF3C8" />
      </g>

      {/* Cembul Kanan */}
      <g>
        <path
          d="M208 64 L234 64 L231 80 L211 80 Z"
          fill="url(#tepakGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="1"
        />
        {/* Tutup Kubah Cembul Kanan */}
        <path
          d="M206 64 C206 55, 236 55, 236 64 Z"
          fill="url(#tepakGoldMain)"
          stroke="#FFF3C8"
          strokeWidth="1"
        />
        <circle cx="221" cy="54" r="2.2" fill="#FFF3C8" />
      </g>

      {/* --- 3. CERANA / PUAN SIRIH TENGAH BERKAKI --- */}
      {/* Bibir Mangkuk Cerana */}
      <path
        d="M118 52 L202 52 L192 72 L128 72 Z"
        fill="url(#tepakGoldMain)"
        stroke="#FFF5CE"
        strokeWidth="1.2"
      />
      {/* Ukiran Pucuk Rebung di Badan Cerana */}
      <path
        d="M132 55 L140 69 L148 55 L156 69 L164 55 L172 69 L180 55 L188 69"
        stroke="url(#tepakGoldDark)"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Leher & Kaki Cerana */}
      <path
        d="M148 72 L172 72 L168 81 L152 81 Z"
        fill="url(#tepakGoldDark)"
        stroke="url(#tepakGoldMain)"
        strokeWidth="1"
      />
      <path
        d="M136 88 L148 81 L172 81 L184 88 Z"
        fill="url(#tepakGoldMain)"
        stroke="#FFF3C8"
        strokeWidth="1"
      />

      {/* --- 4. DULANG / NAMPAN TEPAK SIRIH BERUKIR --- */}
      <path
        d="M62 88 L258 88 L246 104 L74 104 Z"
        fill="url(#tepakGoldDark)"
        stroke="url(#tepakGoldMain)"
        strokeWidth="1.4"
      />
      {/* Motif Belah Ketupat di Bibir Nampan */}
      {[86, 108, 130, 152, 174, 196, 218, 236].map((cx) => (
        <path
          key={`nampan-${cx}`}
          d={`M${cx} 91 L${cx + 6} 96 L${cx} 101 L${cx - 6} 96 Z`}
          stroke="url(#tepakGoldMain)"
          strokeWidth="1"
          fill="url(#tepakGoldMain)"
          fillOpacity="0.25"
        />
      ))}
      {/* Kaki Nampan */}
      <path
        d="M84 104 L236 104 L242 110 L78 110 Z"
        fill="url(#tepakGoldMain)"
      />

      {/* --- 5. TABURAN BUNGA RAMPAI & BUNGA CENGKIH DI BAWAH --- */}
      {/* Garis Halus Pengikat */}
      <line x1="24" y1="120" x2="128" y2="120" stroke="#D4AF37" strokeOpacity="0.55" strokeWidth="0.9" />
      <line x1="192" y1="120" x2="296" y2="120" stroke="#D4AF37" strokeOpacity="0.55" strokeWidth="0.9" />

      {/* Kelopak Bunga Rampai & Cengkih Melayang Simetris */}
      <g fill="url(#tepakGoldMain)">
        {/* Bunga Rampai Tengah */}
        <path d="M160 113 L164 118 L160 123 L156 118 Z" />
        <circle cx="160" cy="128" r="1.8" fill="#FFF3C8" />

        {/* Taburan Kiri */}
        <path d="M142 116 C138 114, 135 118, 139 121 C142 122, 144 119, 142 116 Z" />
        <path d="M122 123 C118 121, 116 125, 120 127 C123 128, 124 125, 122 123 Z" fillOpacity="0.8" />
        <path d="M100 115 C96 114, 95 118, 98 120 C101 120, 102 117, 100 115 Z" fillOpacity="0.7" />
        <circle cx="149" cy="124" r="1.4" fill="#FFF3C8" />
        <circle cx="111" cy="117" r="1.2" />

        {/* Taburan Kanan */}
        <path d="M178 116 C182 114, 185 118, 181 121 C178 122, 176 119, 178 116 Z" />
        <path d="M198 123 C202 121, 204 125, 200 127 C197 128, 196 125, 198 123 Z" fillOpacity="0.8" />
        <path d="M220 115 C224 114, 225 118, 222 120 C219 120, 218 117, 220 115 Z" fillOpacity="0.7" />
        <circle cx="171" cy="124" r="1.4" fill="#FFF3C8" />
        <circle cx="209" cy="117" r="1.2" />
      </g>
    </svg>
  );
}