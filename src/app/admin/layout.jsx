export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Sidebar / Menu Admin */}
      <aside className="w-full md:w-64 bg-burgundy text-krem p-6 shrink-0">
        <h2 className="text-2xl font-serif text-emas mb-8 font-bold">Admin Panel</h2>
        
        <nav className="flex flex-col gap-4 font-sans text-sm">
          <a href="/admin" className="p-3 rounded-lg bg-white/10 text-emas font-bold">
            Dashboard
          </a>
          <a href="/admin/tamu" className="p-3 rounded-lg hover:bg-white/5 transition-colors">
            Kelola Tamu (RSVP)
          </a>
          <a href="/admin/pengaturan" className="p-3 rounded-lg hover:bg-white/5 transition-colors">
            Pengaturan Undangan
          </a>
          
          <hr className="border-emas/20 my-4" />
          
          <a href="/" className="p-3 rounded-lg hover:bg-white/5 transition-colors opacity-70">
            ← Lihat Undangan
          </a>
        </nav>
      </aside>

      {/* Area Konten Utama (page.jsx Anda akan otomatis masuk ke sini) */}
      <div className="flex-1 overflow-x-hidden">
        {children}
      </div>

    </div>
  );
}