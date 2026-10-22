import React from 'react';
import Link from 'next/link';

export default function CertificateNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <div className="bg-white rounded-2xl border-2 border-red-200 p-8 sm:p-12 shadow-lg space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 border border-red-300 flex items-center justify-center text-red-700 text-3xl shadow-xs" aria-hidden="true">
          ⚠️
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-950 border border-red-300">
            Kesalahan 404 • Nomor Registrasi Tidak Ditemukan
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Nomor Registrasi Tidak Sah atau Belum Terdaftar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Format nomor registrasi permohonan harus mengikuti standar baku SPBE dengan pola:
            <br />
            <code className="inline-block mt-2 font-mono font-bold bg-slate-100 px-3 py-1 rounded text-blue-900 border border-slate-300">
              ^SRK-\d&#123;8&#125;-[A-Z0-9]&#123;4&#125;$ (Contoh: SRK-20261016-A1B2)
            </code>
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left max-w-md mx-auto space-y-2 text-slate-700">
          <span className="font-bold text-slate-900 block">Kemungkinan penyebab kendala:</span>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
            <li>Nomor registrasi salah ketik atau mengandung spasi/karakter tidak valid.</li>
            <li>Berkas laporan masih dalam proses persetujuan RT/RW atau belum disahkan Dukcapil.</li>
            <li>Sistem menerapkan validasi kriptografi ketat untuk menghindari penyalahgunaan identitas.</li>
          </ul>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/unduh/SRK-20261016-A1B2"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-md transition-colors"
          >
            ✓ Coba Contoh Registrasi Sah (SRK-20261016-A1B2)
          </Link>
          <Link
            href="/unduh"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs shadow-xs transition-colors"
          >
            ← Kembali ke Katalog Akta
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 font-medium text-xs transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

