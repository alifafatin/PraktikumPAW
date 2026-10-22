import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-slate-200 bg-slate-900 text-slate-100 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: System info & Logo */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-bold">
                WS
              </div>
              <span className="text-lg font-bold text-white tracking-tight">WebSurkem</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sistem Informasi Pelayanan Surat Kematian Digital terintegrasi tingkat RT/RW dan Dinas Kependudukan dan Pencatatan Sipil.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-xs text-emerald-300 border border-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
              <span>Layanan Terverifikasi SPBE</span>
            </div>
          </div>

          {/* Col 2: Navigation shortcuts */}
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Layanan Utama
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 rounded-sm"
                >
                  Beranda Informasi
                </Link>
              </li>
              <li>
                <Link
                  href="/pengajuan"
                  className="text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 rounded-sm"
                >
                  Ajukan Surat Kematian
                </Link>
              </li>
              <li>
                <Link
                  href="/unduh"
                  className="text-slate-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 rounded-sm"
                >
                  Pencarian & Unduh Akta
                </Link>
              </li>
              <li>
                <Link
                  href="/login-petugas"
                  className="text-amber-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 rounded-sm font-semibold"
                >
                  🔐 Masuk sebagai Petugas RT/RW / Dukcapil
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Emergency & Assistance */}
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Kontak Bantuan & Darurat
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-100">Halo Dukcapil:</span>
                <span>1500537</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-100">WhatsApp Darurat:</span>
                <span>+62 811-800-537</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-slate-100">Email:</span>
                <span>callcenter.dukcapil@kemendagri.go.id</span>
              </li>
              <li className="text-[11px] text-slate-400 pt-1">
                Jam Layanan Online: 24 Jam Setiap Hari
              </li>
            </ul>
          </div>

          {/* Col 4: Accessibility & Security declaration */}
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Aksesibilitas & Kriptografi
            </h2>
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>
                Aplikasi ini dirancang mengikuti panduan <strong className="text-white">WCAG 2.2 Tingkat AA</strong> dengan kontras warna tinggi, navigasi papan ketik penuh, dan pembaca layar.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800 space-y-1">
                <div>🔐 Enkripsi Payload: AES-256-GCM</div>
                <div>🖋️ Tanda Tangan: Ed25519 Cryptographic Seal</div>
                <div>🔑 Proteksi PIN: PBKDF2 Password Key Derivation</div>
              </div>
            </div>
          </div>
        </div>

        {/* ACM Code of Ethics & Privacy Compliance Badge (ACM 3.1, 1.2, 1.6, 2.5) */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="rounded-xl bg-slate-800/80 border border-slate-700 p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 border border-blue-500/40 text-xs font-semibold">
                <span>🛡️</span>
                <span>WebSurkem dikembangkan sesuai Prinsip Etika Komputasi ACM 2018 &amp; Regulasi Pelindungan Data Pribadi (UU PDP No. 27/2022).</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                Menjunjung tinggi martabat keluarga duka melalui pelayanan publik yang adil, transparan, dan berpusat pada kepentingan umum (<strong className="text-white">ACM 3.1 Public Good</strong>), tanpa diskriminasi algoritma otomatis (<strong className="text-white">ACM 1.2 Avoid Harm</strong>), kerahasiaan data kependudukan terenkripsi (<strong className="text-white">ACM 1.6 Respect Privacy</strong>), dan evaluasi risiko transparan (<strong className="text-white">ACM 2.5 Risk Evaluation</strong>).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900/80 text-emerald-300 border border-emerald-500/30">
                ACM 1.2 • Avoid Harm
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900/80 text-blue-300 border border-blue-500/30">
                ACM 1.6 • Respect Privacy
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900/80 text-amber-300 border border-amber-500/30">
                ACM 2.5 • Risk Evaluation
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900/80 text-purple-300 border border-purple-500/30">
                ACM 3.1 • Public Good
              </span>
            </div>
          </div>
        </div>

        {/* Bottom border & copyright */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            Hak Cipta &copy; 2026 WebSurkem. Semua Hak Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Milestone 1 v0.1 Frontend</span>
            <span>&bull;</span>
            <span className="text-slate-400">Pengembangan Web (Matkul)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
