import React from 'react';
import Link from 'next/link';

export default function DashboardReportNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <div className="bg-white rounded-2xl border-2 border-amber-200 p-8 sm:p-12 shadow-lg space-y-6">
        <div
          className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 text-3xl shadow-xs"
          aria-hidden="true"
        >
          🔍
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300">
            Kesalahan 404 • Berkas Permohonan Tidak Ditemukan
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ID Permohonan Kematian Tidak Terdaftar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Sistem tidak dapat menemukan berkas dengan nomor identifikasi tersebut dalam basis data SPBE WebSurkem.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left max-w-md mx-auto space-y-2 text-slate-700">
          <span className="font-bold text-slate-900 block">Kemungkinan penyebab kendala:</span>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
            <li>ID permohonan salah ketik atau mengandung karakter tidak sah.</li>
            <li>Format ID permohonan yang valid adalah seperti <code className="font-mono font-bold text-blue-900">SK-2026-00630</code> atau <code className="font-mono font-bold text-blue-900">SRK-20261016-A1B2</code>.</li>
            <li>Berkas telah dipindahkan atau dihapus oleh administrator.</li>
          </ul>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard/SK-2026-00630"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs shadow-md transition-colors focus-visible:outline-2 focus-visible:outline-indigo-700"
          >
            ✓ Coba Contoh Berkas Sah (SK-2026-00630)
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-slate-700"
          >
            ← Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

