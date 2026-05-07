import { useState } from "react";

export default function TableData({ data = [] }) {
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);

  const filtered = data.filter(d =>
    [d.nama, d.nim, d.kelas, d.materi].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <>
      {/* Image Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-xl object-contain max-h-[80vh] shadow-2xl"
            />
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-slate-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        {/* Table Header / Toolbar */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Data Pengumpulan Tugas</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {filtered.length} dari {data.length} entri
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-60">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari nama, NIM, kelas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Nama</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">NIM</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Kelas</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Materi</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">File</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((d, i) => (
                  <tr key={d._id} className="hover:bg-slate-50 transition-colors group">

                    {/* Nama */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#E6F1FB] flex items-center justify-center flex-shrink-0 text-[11px] font-semibold text-[#185FA5]">
                          {d.nama?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-800">{d.nama}</span>
                      </div>
                    </td>

                    {/* NIM */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {d.nim}
                      </span>
                    </td>

                    {/* Kelas */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="bg-[#E6F1FB] text-[#185FA5] text-xs font-medium px-2.5 py-1 rounded-full">
                        {d.kelas}
                      </span>
                    </td>

                    {/* Materi */}
                    <td className="px-5 py-3.5 whitespace-nowrap text-slate-600">
                      {d.materi}
                    </td>

                    {/* Deskripsi */}
                    <td className="px-5 py-3.5 max-w-xs">
                      <p className="text-slate-500 truncate text-xs leading-relaxed" title={d.deskripsi}>
                        {d.deskripsi || <span className="italic text-slate-300">—</span>}
                      </p>
                    </td>

                    {/* Gambar */}
                    <td className="px-5 py-3.5">
                      {d.imageUrl ? (
                        <button
                          onClick={() => setPreview(d.imageUrl)}
                          className="relative group/img"
                          aria-label="Lihat gambar"
                        >
                          <img
                            src={d.imageUrl}
                            alt={`Tugas ${d.nama}`}
                            className="w-12 h-12 object-cover rounded-lg border border-slate-200 group-hover/img:border-blue-400 transition-all"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 rounded-lg transition-all flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white opacity-0 group-hover/img:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                            </svg>
                          </div>
                        </button>
                      ) : (
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-medium text-slate-500">Tidak ada data ditemukan</p>
                      <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {data.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Menampilkan <span className="font-medium text-slate-600">{filtered.length}</span> entri
            </p>
            <p className="text-xs text-slate-400">E-Task · Portal Akademik</p>
          </div>
        )}
      </div>
    </>
  );
}