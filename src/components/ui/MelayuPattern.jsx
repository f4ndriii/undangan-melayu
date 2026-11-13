export default function MelayuPattern({ className = "opacity-[0.07]" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Pola Geometris Tenun Songket & Bunga Tanjung Melayu */}
          <pattern
            id="melayu-songket-pattern"
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            {/* Belah Ketupat Utama (Kisi Tenun) */}
            <path
              d="M48 0 L96 48 L48 96 L0 48 Z"
              fill="none"
              stroke="#E5C17B"
              strokeWidth="0.9"
            />
            <path
              d="M48 8 L88 48 L48 88 L8 48 Z"
              fill="none"
              stroke="#E5C17B"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />

            {/* Motif Bunga Tanjung / Bintang Delapan di Tengah */}
            <g transform="translate(48, 48)">
              <path
                d="M0 -18 C4 -8, 8 -4, 18 0 C8 4, 4 8, 0 18 C-4 8, -8 4, -18 0 C-8 -4, -4 -8, 0 -18 Z"
                fill="none"
                stroke="#F4D99B"
                strokeWidth="0.9"
              />
              <path
                d="M-12 -12 C-4 -6, 4 -6, 12 -12 C6 -4, 6 4, 12 12 C4 6, -4 6, -12 12 C-6 4, -6 -4, -12 -12 Z"
                fill="none"
                stroke="#E5C17B"
                strokeWidth="0.7"
              />
              <circle cx="0" cy="0" r="2.5" fill="#E5C17B" />
            </g>

            {/* Motif Pucuk Rebung / Kelopak Sudut */}
            <path
              d="M0 0 L14 0 L0 14 Z M96 0 L82 0 L96 14 Z M0 96 L14 96 L0 82 Z M96 96 L82 96 L96 82 Z"
              fill="none"
              stroke="#E5C17B"
              strokeWidth="0.7"
            />
            <circle cx="0" cy="0" r="3" fill="#E5C17B" />
            <circle cx="96" cy="0" r="3" fill="#E5C17B" />
            <circle cx="0" cy="96" r="3" fill="#E5C17B" />
            <circle cx="96" cy="96" r="3" fill="#E5C17B" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#melayu-songket-pattern)" />
      </svg>
    </div>
  );
}