import { useEffect, useRef, useState } from "react";
import API from "../services/api";

export default function FormMahasiswa() {
  const [materi, setMateri] = useState([]);
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    API.get("/material").then(res => setMateri(res.data));
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.nim) {
      alert("Mohon isi Nama Lengkap dan NIM terlebih dahulu.");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach(key => data.append(key, form[key]));
      if (image) data.append("image", image);
      await API.post("/submission", data);
      alert("Tugas berhasil dikumpulkan!");
    } catch (err) {
      alert("Gagal mengirim tugas. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="bg-[#0C447C] px-8 py-6 flex items-center gap-4">
          <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-white text-lg font-semibold">Upload Tugas</h1>
            <p className="text-white/60 text-sm mt-0.5">Isi data dengan lengkap sebelum mengumpulkan</p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">

          {/* Section: Data Mahasiswa */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Data Mahasiswa</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500" htmlFor="nama">Nama Lengkap</label>
              <input
                id="nama"
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition"
                onChange={e => setForm({ ...form, nama: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500" htmlFor="nim">NIM</label>
              <input
                id="nim"
                type="text"
                placeholder="Nomor Induk Mahasiswa"
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition"
                onChange={e => setForm({ ...form, nim: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500" htmlFor="kelas">Kelas</label>
              <input
                id="kelas"
                type="text"
                placeholder="Contoh: A1"
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition"
                onChange={e => setForm({ ...form, kelas: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-500" htmlFor="jadwal">Hari & Jam Praktikum</label>
              <input
                id="jadwal"
                type="text"
                placeholder="Contoh: Senin, 08.00"
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition"
                onChange={e => setForm({ ...form, jadwal: e.target.value })}
              />
            </div>
          </div>

          {/* Section: Detail Tugas */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 pt-1">Detail Tugas</p>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500" htmlFor="materi">Materi</label>
            <select
              id="materi"
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition cursor-pointer"
              onChange={e => setForm({ ...form, materi: e.target.value })}
            >
              <option value="">— Pilih Materi —</option>
              {materi.map(m => (
                <option key={m._id} value={m._id}>{m.nama}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500" htmlFor="deskripsi">Penjelasan / Deskripsi Tugas</label>
            <textarea
              id="deskripsi"
              rows={4}
              placeholder="Jelaskan secara singkat fungsi code-code program tersebut"
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition resize-y"
              onChange={e => setForm({ ...form, deskripsi: e.target.value })}
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">File Screenshot Tugas</label>
            <div
              className="relative border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50 hover:border-blue-400 hover:bg-white transition cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFile}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {fileName ? (
                <p className="text-sm font-medium text-blue-600">✓ {fileName}</p>
              ) : (
                <>
                  <p className="text-sm font-medium text-slate-600">Klik atau seret file ke sini (Screenshot Hasil)</p>
                  <p className="text-xs text-slate-400 mt-1">Jpg, Png max 10MB</p>
                </>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0C447C] hover:bg-[#185FA5] disabled:opacity-60 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Mengirim...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Kumpulkan Tugas
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-slate-400">Data tersimpan secara aman dan terenkripsi kedalam cloud</span>
        </div>

      </div>
    </div>
  );
}