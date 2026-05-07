import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TableData from "../components/TableData";

export default function Admin() {
  const [data, setData] = useState([]);
  const [materi, setMateri] = useState([]);
  const [materiBaru, setMateriBaru] = useState("");
  const [loadingTambah, setLoadingTambah] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      const res = await API.get("/submission");
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchMateri = async () => {
    try {
      const res = await API.get("/material");
      setMateri(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMateri();
  }, []);

  const tambahMateri = async () => {
    if (!materiBaru.trim()) {
      showToast("Isi nama materi terlebih dahulu.", "error");
      return;
    }
    setLoadingTambah(true);
    try {
      await API.post("/material", { nama: materiBaru });
      setMateriBaru("");
      fetchMateri();
      showToast("Materi berhasil ditambahkan.");
    } catch (err) {
      showToast("Gagal menambahkan materi.", "error");
    } finally {
      setLoadingTambah(false);
    }
  };

  const downloadExcel = () => {
    window.open("http://localhost:5000/api/submission/export");
  };

  const stats = [
    {
      label: "Total Pengumpulan",
      value: data.length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "text-[#185FA5] bg-[#E6F1FB]",
    },
    {
      label: "Total Materi",
      value: materi.length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "text-[#0F6E56] bg-[#E1F5EE]",
    },
    {
      label: "Kelas Aktif",
      value: [...new Set(data.map(d => d.kelas).filter(Boolean))].length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "text-[#854F0B] bg-[#FAEEDA]",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all border ${
          toast.type === "error"
            ? "bg-red-50 text-red-700 border-red-200"
            : "bg-green-50 text-green-700 border-green-200"
        }`}>
          {toast.type === "error" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {toast.message}
        </div>
      )}

      <div className="min-h-screen bg-slate-50 pt-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-xl font-semibold text-slate-800">Dashboard Admin</h1>
              <p className="text-sm text-slate-400 mt-0.5">Kelola materi dan data pengumpulan tugas</p>
            </div>
            <button
              onClick={downloadExcel}
              className="inline-flex items-center gap-2 bg-[#0F6E56] hover:bg-[#085041] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Excel
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl px-5 py-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-800">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Two-column: Tambah Materi + Daftar Materi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

            {/* Tambah Materi */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-[#E6F1FB] rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#185FA5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-slate-800">Tambah Materi</h2>
              </div>
              <div className="flex gap-2">
                <input
                  value={materiBaru}
                  onChange={e => setMateriBaru(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && tambahMateri()}
                  placeholder="Nama materi baru..."
                  className="flex-1 px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition"
                />
                <button
                  onClick={tambahMateri}
                  disabled={loadingTambah}
                  className="flex items-center gap-1.5 bg-[#0C447C] hover:bg-[#185FA5] disabled:opacity-60 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  {loadingTambah ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                  Tambah
                </button>
              </div>
            </div>

            {/* Daftar Materi */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-[#E1F5EE] rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#0F6E56]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-slate-800">Daftar Materi</h2>
                <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {materi.length} materi
                </span>
              </div>
              {materi.length === 0 ? (
                <p className="text-sm text-slate-400 italic">Belum ada materi ditambahkan.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {materi.map(m => (
                    <span
                      key={m._id}
                      className="bg-[#E6F1FB] text-[#185FA5] text-xs font-medium px-3 py-1.5 rounded-full border border-[#B5D4F4]"
                    >
                      {m.nama}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          {loadingData ? (
            <div className="bg-white border border-slate-200 rounded-2xl flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <svg className="w-8 h-8 animate-spin text-slate-300" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <p className="text-sm">Memuat data...</p>
              </div>
            </div>
          ) : (
            <TableData data={data} />
          )}

        </div>
      </div>
    </>
  );
}