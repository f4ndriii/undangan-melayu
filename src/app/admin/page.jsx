import { supabase } from '@/lib/supabase';

// Mematikan caching agar data selalu real-time setiap kali halaman dimuat ulang
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Mengambil data tamu dan ucapan dari Supabase
  const { data: guests } = await supabase
    .from('guests')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: wishes } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false });

  const totalAttending = guests?.filter(g => g.is_attending === true).length || 0;
  const totalNotAttending = guests?.filter(g => g.is_attending === false).length || 0;

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif text-burgundy mb-8 font-bold">Dashboard Admin Undangan</h1>
        
        {/* Ringkasan Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 mb-1">Total RSVP Hadir</h3>
            <p className="text-4xl font-bold text-green-600">{totalAttending}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 mb-1">Total RSVP Tidak Hadir</h3>
            <p className="text-4xl font-bold text-red-600">{totalNotAttending}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 mb-1">Total Ucapan</h3>
            <p className="text-4xl font-bold text-emas">{wishes?.length || 0}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Tabel RSVP */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-serif text-burgundy mb-6">Daftar Kehadiran (RSVP)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-3 px-4 font-semibold">Nama</th>
                    <th className="py-3 px-4 font-semibold">Alamat</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {guests?.length > 0 ? guests.map((guest) => (
                    <tr key={guest.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4">{guest.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{guest.address}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${guest.is_attending ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {guest.is_attending ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="3" className="py-4 text-center text-gray-500">Belum ada data RSVP</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabel Ucapan */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-serif text-burgundy mb-6">Daftar Ucapan & Doa</h2>
            <div className="flex flex-col gap-4">
              {wishes?.length > 0 ? wishes.map((wish) => (
                <div key={wish.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-burgundy">{wish.sender_name}</h4>
                  <p className="text-gray-600 text-sm mt-2">{wish.message}</p>
                </div>
              )) : (
                <p className="text-center text-gray-500 py-4">Belum ada ucapan masuk</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}