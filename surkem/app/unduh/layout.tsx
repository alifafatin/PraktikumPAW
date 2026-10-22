import React from 'react';
import Link from 'next/link';

export default function UnduhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-slate-50">
      {/* Nested Layout Sub-Header */}
      <section
        aria-label="Informasi Portal Unduh & Verifikasi Akta"
        className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="font-semibold text-slate-800">Portal Resmi Unduh Akta Kematian Digital</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="hidden sm:inline">Terhubung Basis Data Dukcapil &amp; RT/RW</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/unduh"
              className="font-medium text-blue-700 hover:text-blue-900 transition-colors"
            >
              📑 Katalog Akta
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/pengajuan"
              className="font-medium text-slate-600 hover:text-blue-700 transition-colors"
            >
              ✏️ Buat Pengajuan Baru
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
}

