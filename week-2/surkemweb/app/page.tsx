"use client";

import React, { useState } from "react";

export default function Home() {
  // Accessibility state for elderly users (toggle larger text)
  const [isLargeText, setIsLargeText] = useState(false);

  // Online submission modal trigger & state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationCode, setRegistrationCode] = useState("");

  // Form input states
  const [formData, setFormData] = useState({
    deceasedName: "",
    deceasedNik: "",
    deceasedDate: "",
    deceasedPlace: "",
    applicantName: "",
    applicantRelation: "Anak Kandung",
    applicantPhone: "",
    deliveryOption: "digital",
  });

  // Tracking sidebar state
  const [searchTrackingId, setSearchTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState<{
    id: string;
    name: string;
    status: string;
    date: string;
    step: number;
  } | null>(null);

  // Document checklist interactive helper
  const [checkedDocs, setCheckedDocs] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
  });

  const toggleDocCheck = (id: number) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `SK-${new Date().getFullYear()}${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegistrationCode(randomCode);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormStep(1);
    setIsSubmitted(false);
    setFormData({
      deceasedName: "",
      deceasedNik: "",
      deceasedDate: "",
      deceasedPlace: "",
      applicantName: "",
      applicantRelation: "Anak Kandung",
      applicantPhone: "",
      deliveryOption: "digital",
    });
    setIsModalOpen(false);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTrackingId.trim()) return;

    setTrackingResult({
      id: searchTrackingId.toUpperCase(),
      name: "Alm. Bapak H. Soedirman",
      status: "Verifikasi Berkas Disetujui",
      date: "02 Oktober 2026",
      step: 3,
    });
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-800 ${
        isLargeText ? "text-lg" : "text-base"
      } transition-all duration-200 antialiased selection:bg-blue-100 selection:text-blue-900`}
    >
      {/* Tautan untuk melompati navigasi bagi pengguna keyboard */}
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-blue-700 focus:text-white focus:rounded-lg focus:m-2"
      >
        Lewati ke konten utama
      </a>

      {/* 
        MAIN PAGE STRUCTURE: CSS GRID 12-COLUMN LAYOUT
        - Header: lg:col-span-12
        - Main content area: lg:col-span-8 (2/3 lebar layar)
        - Sidebar (aside): lg:col-span-4 (1/3 lebar layar)
        - Footer: lg:col-span-12
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================================================================
            HEADER (col-span-12 / Landmark: banner)
        ========================================================================= */}
        <header className="col-span-1 lg:col-span-12 bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
          {/* Top Bar / Accessibility & Hotline banner (Flexbox) */}
          <div className="bg-slate-100/80 px-4 sm:px-6 py-2 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center justify-start gap-2">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-slate-700">
                Layanan Resmi Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil)
              </span>
              <span className="hidden md:inline-block text-slate-300">|</span>
              <span className="hidden md:inline-block text-emerald-700 font-medium">
                100% Bebas Biaya (Gratis)
              </span>
            </div>

            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsLargeText(!isLargeText)}
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-xs font-medium"
                title="Perbesar teks untuk kemudahan membaca bagi lansia"
              >
                <svg
                  className="w-3.5 h-3.5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5h12M9 5v14m8-7h4m-2-2v4"
                  />
                </svg>
                {isLargeText ? "Ukuran Teks: Besar (Aktif)" : "Perbesar Teks (Lansia)"}
              </button>

              <div className="flex items-center justify-center gap-1 text-slate-700">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-semibold text-slate-900">0800-1-DUKCAPIL</span>
                <span className="hidden sm:inline text-slate-500">(Bebas Pulsa 24 Jam)</span>
              </div>
            </div>
          </div>

          {/* Main Navigation Bar (Landmark: navigation) */}
          <nav
            aria-label="Navigasi utama"
            className="px-4 sm:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center justify-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-xs">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center justify-start gap-2">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Layanan Surat &amp; Akta Kematian
                  </span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Online
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Portal Pendampingan Keluarga Berduka &bull; Mudah, Santun, &amp; Transparan
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto list-none m-0 p-0">
              <li>
                <a
                  href="#prosedur"
                  className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                  Prosedur
                </a>
              </li>
              <li>
                <a
                  href="#persyaratan"
                  className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                  Syarat Berkas
                </a>
              </li>
              <li>
                <a
                  href="#lacak"
                  className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors"
                >
                  Lacak Status
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormStep(1);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Ajukan Surat Kematian
                </button>
              </li>
            </ul>
          </nav>
        </header>

        {/* =========================================================================
            MAIN CONTENT AREA (col-span-8 / Landmark: main)
        ========================================================================= */}
        <main id="konten" className="col-span-1 lg:col-span-8 space-y-8">
          {/* Empathetic Hero Banner */}
          <section
            aria-labelledby="judul-utama"
            className="bg-gradient-to-br from-blue-50/90 via-white to-slate-100/70 rounded-2xl p-6 sm:p-8 border border-blue-100/80 shadow-xs relative overflow-hidden"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center justify-start gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4">
                <svg
                  className="w-4 h-4 text-blue-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Turut Berduka Cita Atas Kehilangan Keluarga Tercinta
              </div>

              <h1 id="judul-utama" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Kami Siap Mendampingi Anda Menyelesaikan Administrasi Kependudukan
              </h1>

              <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
                Dalam suasana duka, keluarga tidak perlu merasa terbebani oleh urusan
                dokumen. Portal ini dirancang ramah dan mudah dipahami, membantu Anda
                memperoleh <strong>Akta Kematian resmi</strong> serta{" "}
                <strong>pembaruan Kartu Keluarga (KK) baru</strong> secara mandiri
                atau didampingi petugas kami.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-start gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormStep(1);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Mulai Pengajuan Online Sekarang
                </button>

                <a
                  href="#panduan-lansia"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors text-sm sm:text-base"
                >
                  Panduan untuk Lansia
                </a>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200/70 flex flex-wrap items-center justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500">
                <div className="flex items-center justify-start gap-1.5">
                  <svg
                    className="w-4 h-4 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Tanpa Biaya (Rp 0)</span>
                </div>
                <div className="flex items-center justify-start gap-1.5">
                  <svg
                    className="w-4 h-4 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Proses 1x24 Jam Kerja</span>
                </div>
                <div className="flex items-center justify-start gap-1.5">
                  <svg
                    className="w-4 h-4 text-emerald-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Tanda Tangan Elektronik (TTE) Sah</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 1: LAYANAN UTAMA & KEUNGGULAN (Landmark: region) */}
          <section aria-labelledby="judul-keunggulan" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 id="judul-keunggulan" className="text-lg sm:text-xl font-bold text-slate-900">
                  Kemudahan Layanan yang Kami Sediakan
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Didesain untuk mengutamakan ketenangan dan kemudahan sanak keluarga.
                </p>
              </div>
              <span className="inline-flex items-center justify-center self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                Standar Pelayanan Prima
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">Pelayanan 100% Gratis</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Seluruh proses administrasi penerbitan akta kematian tidak dipungut biaya retribusi apapun.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-start text-xs font-semibold text-emerald-700">
                  Bebas Pungutan Liar
                </div>
              </article>

              <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">Penerbitan 1x24 Jam</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Setelah berkas dinyatakan lengkap oleh petugas, akta resmi akan langsung diterbitkan secara elektronik.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-start text-xs font-semibold text-blue-700">
                  Notifikasi WhatsApp Otomatis
                </div>
              </article>

              <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base">Layanan Jemput Bola</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Bagi pemohon lanjut usia atau yang tidak memiliki gawai, petugas kelurahan siap mendampingi langsung ke rumah.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-start text-xs font-semibold text-slate-700">
                  Ramah Lansia &amp; Disabilitas
                </div>
              </article>
            </div>
          </section>

          {/* SECTION 2: PROSEDUR & ALUR PENGURUSAN (Landmark: region) */}
          <section id="prosedur" aria-labelledby="judul-prosedur" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 id="judul-prosedur" className="text-lg sm:text-xl font-bold text-slate-900">
                  Alur &amp; Prosedur Pengurusan
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Langkah sederhana dari pelaporan hingga terbitnya dokumen kependudukan baru.
                </p>
              </div>
              <span className="inline-flex items-center justify-center self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                6 Tahap Mudah
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">1</span>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Tahap Awal</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Surat Keterangan Kematian</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Dapatkan surat keterangan kematian dari dokter/RS atau pengantar RT/RW &amp; Kelurahan.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-xs text-blue-700 font-medium">Berkas Sumber Medis / Kelurahan</div>
              </article>

              <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">2</span>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Persiapan</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Siapkan &amp; Foto Berkas</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Foto dokumen asli dengan ponsel: KTP almarhum, KK, KTP pelapor, dan KTP 2 saksi.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-xs text-blue-700 font-medium">Format Foto HP (JPG / PNG / PDF)</div>
              </article>

              <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">3</span>
                    <span className="text-xs font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Online</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Isi Formulir Singkat</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Klik tombol &quot;Ajukan Surat Kematian&quot;. Masukkan data pokok pemohon dan almarhum.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-xs text-blue-700 font-medium">Selesai dalam 5 Menit</div>
              </article>

              <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-sm">4</span>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Verifikasi</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Validasi oleh Petugas</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Petugas Disdukcapil memverifikasi kecocokan NIK di database nasional.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-xs text-blue-700 font-medium">Pemberitahuan SMS &amp; WhatsApp</div>
              </article>

              <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-sm">5</span>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Penerbitan</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Penerbitan Akta TTE Resmi</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Kutipan Akta Kematian resmi diterbitkan dengan Tanda Tangan Elektronik.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-xs text-blue-700 font-medium">Bisa Dicetak di Kertas HVS A4</div>
              </article>

              <article className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm">6</span>
                    <span className="text-xs font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Paket 3-in-1</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Kartu Keluarga Baru Terbit</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    Secara otomatis KK keluarga diperbarui tanpa perlu permohonan terpisah.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-xs text-emerald-700 font-medium">Paket Dokumen Lengkap Langsung</div>
              </article>
            </div>
          </section>

          {/* SECTION 3: DOKUMEN PERSYARATAN (Landmark: region) */}
          <section id="persyaratan" aria-labelledby="judul-persyaratan" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 id="judul-persyaratan" className="text-lg sm:text-xl font-bold text-slate-900">
                  Dokumen Persyaratan yang Diperlukan
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Periksa kelengkapan dokumen di bawah ini. Cukup lampirkan foto yang terbaca jelas.
                </p>
              </div>
              <div className="flex items-center justify-start gap-1 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Klik kotak centang untuk membantu mengingat berkas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Doc 1 */}
              <div
                onClick={() => toggleDocCheck(1)}
                className={`p-5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  checkedDocs[1]
                    ? "bg-blue-50/50 border-blue-300 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Wajib Utama</span>
                    <input type="checkbox" checked={!!checkedDocs[1]} onChange={() => {}} className="w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer" aria-label="Centang Surat Keterangan Kematian" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mt-2.5 text-base">Surat Keterangan Kematian</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Asli dari Dokter / Puskesmas / Rumah Sakit, ATAU Surat Pengantar Kematian dari Kepala Desa / Lurah.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                  <span>Asli / Salinan Sah</span>
                  <span className="text-blue-600 font-medium">1 Berkas</span>
                </div>
              </div>

              {/* Doc 2 */}
              <div
                onClick={() => toggleDocCheck(2)}
                className={`p-5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  checkedDocs[2]
                    ? "bg-blue-50/50 border-blue-300 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Wajib Utama</span>
                    <input type="checkbox" checked={!!checkedDocs[2]} onChange={() => {}} className="w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer" aria-label="Centang Kartu Keluarga Asli" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mt-2.5 text-base">Kartu Keluarga (KK) Asli</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Kartu Keluarga tempat almarhum/almarhumah terdaftar. Akan diperbarui otomatis dengan susunan baru.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                  <span>KK Almarhum</span>
                  <span className="text-blue-600 font-medium">1 Lembar</span>
                </div>
              </div>

              {/* Doc 3 */}
              <div
                onClick={() => toggleDocCheck(3)}
                className={`p-5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  checkedDocs[3]
                    ? "bg-blue-50/50 border-blue-300 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Identitas</span>
                    <input type="checkbox" checked={!!checkedDocs[3]} onChange={() => {}} className="w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer" aria-label="Centang KTP Almarhum" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mt-2.5 text-base">KTP-el Almarhum/Almarhumah</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    KTP elektronik asli. Jika hilang/rusak, dapat diganti dengan surat pernyataan kehilangan dari keluarga.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                  <span>KTP Almarhum</span>
                  <span className="text-blue-600 font-medium">Asli / Foto</span>
                </div>
              </div>

              {/* Doc 4 */}
              <div
                onClick={() => toggleDocCheck(4)}
                className={`p-5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  checkedDocs[4]
                    ? "bg-blue-50/50 border-blue-300 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Pemohon</span>
                    <input type="checkbox" checked={!!checkedDocs[4]} onChange={() => {}} className="w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer" aria-label="Centang KTP Pelapor" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mt-2.5 text-base">KTP-el Pelapor / Ahli Waris</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Identitas KTP pelapor (suami/istri, anak kandung, orang tua, atau keluarga terdekat yang mengurus).
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                  <span>KTP Keluarga</span>
                  <span className="text-blue-600 font-medium">1 Foto Jelas</span>
                </div>
              </div>

              {/* Doc 5 */}
              <div
                onClick={() => toggleDocCheck(5)}
                className={`p-5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  checkedDocs[5]
                    ? "bg-blue-50/50 border-blue-300 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Saksi</span>
                    <input type="checkbox" checked={!!checkedDocs[5]} onChange={() => {}} className="w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer" aria-label="Centang KTP 2 Saksi" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mt-2.5 text-base">KTP-el 2 Orang Saksi</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Foto identitas KTP 2 orang saksi yang mengetahui peristiwa kematian (kerabat, tetangga, atau RT/RW).
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                  <span>KTP 2 Saksi</span>
                  <span className="text-blue-600 font-medium">2 Orang</span>
                </div>
              </div>

              {/* Doc 6 */}
              <div
                onClick={() => toggleDocCheck(6)}
                className={`p-5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  checkedDocs[6]
                    ? "bg-blue-50/50 border-blue-300 shadow-xs"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Khusus Status Kawin</span>
                    <input type="checkbox" checked={!!checkedDocs[6]} onChange={() => {}} className="w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer" aria-label="Centang Buku Nikah" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mt-2.5 text-base">Buku Nikah / Akta Perkawinan</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Wajib dilampirkan jika almarhum masih berstatus kawin, untuk pembaruan status pasangan hidup.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                  <span>Buku Nikah</span>
                  <span className="text-amber-700 font-medium">Bila Berkeluarga</span>
                </div>
              </div>
            </div>
          </section>

          {/* ONLINE SUBMISSION TRIGGER BANNER */}
          <section className="bg-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-800 text-blue-200">
                  Pengajuan Mandiri Cepat
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Sudah Siap Melakukan Permohonan Online?
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Tidak perlu khawatir jika ada dokumen yang belum lengkap, Anda dapat mengisi data pokok terlebih dahulu.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormStep(1);
                    setIsModalOpen(true);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Buka Formulir Pengajuan
                </button>
              </div>
            </div>
          </section>

          {/* Guidance for Elderly Users Accordion / Tips */}
          <section
            id="panduan-lansia"
            aria-labelledby="judul-lansia"
            className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 id="judul-lansia" className="text-lg font-bold text-slate-900">
                  Panduan Kemudahan untuk Lansia &amp; Pendamping
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Pertanyaan umum dan tips bila Anda kesulitan menggunakan gawai.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-3">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                  Apakah lansia wajib datang sendiri ke kantor Disdukcapil?
                </h3>
                <p className="text-slate-600 mt-1 leading-relaxed text-xs sm:text-sm">
                  <strong>Tidak perlu.</strong> Pengurusan dapat diwakilkan sepenuhnya oleh keluarga atau memanfaatkan <strong>Layanan Jemput Berkas</strong>.
                </p>
              </div>
              <div className="py-3">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                  Bagaimana jika wafat di rumah tanpa surat dokter?
                </h3>
                <p className="text-slate-600 mt-1 leading-relaxed text-xs sm:text-sm">
                  Cukup hubungi pengurus RT/RW setempat untuk meminta Surat Pengantar Kematian guna menerbitkan Formulir F-2.01.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* =========================================================================
            SIDEBAR (aside / Landmark: complementary)
        ========================================================================= */}
        <aside aria-label="Informasi pendukung" className="col-span-1 lg:col-span-4 space-y-6">
          {/* Widget 1: Status Tracker */}
          <div id="lacak" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-start gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Lacak Status Permohonan</h2>
                  <p className="text-xs text-slate-500">Cek proses berkas Anda</p>
                </div>
              </div>
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                Real-Time
              </span>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-3">
              <div>
                <label htmlFor="searchTrackingId" className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Registrasi / NIK Pemohon
                </label>
                <input
                  id="searchTrackingId"
                  type="text"
                  required
                  value={searchTrackingId}
                  onChange={(e) => setSearchTrackingId(e.target.value)}
                  placeholder="Contoh: SK-202610-8842 atau NIK"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium text-sm transition-colors cursor-pointer"
              >
                Periksa Status Berkas
              </button>
            </form>

            {trackingResult && (
              <div className="mt-4 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm space-y-2">
                <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                  <span className="font-semibold text-slate-800">ID: {trackingResult.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {trackingResult.status}
                  </span>
                </div>
                <p className="text-slate-600"><strong>Subjek:</strong> {trackingResult.name}</p>
                <p className="text-slate-600"><strong>Tanggal:</strong> {trackingResult.date}</p>
              </div>
            )}
          </div>

          {/* Widget 2: Hotline Assistance */}
          <div className="bg-gradient-to-br from-blue-50 to-slate-100 p-6 rounded-2xl border border-blue-200 shadow-xs space-y-4">
            <div className="flex items-center justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base">Butuh Bantuan Langsung?</h2>
                <p className="text-xs text-slate-600">Petugas kami siap memandu tanpa antre</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jika keluarga kesulitan mengisi formulir digital, hubungi hotline kami agar petugas dapat menginputkan data atas nama keluarga.
            </p>

            <div className="space-y-2.5">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs transition-colors"
              >
                Konsultasi WhatsApp Pendampingan
              </a>
              <a
                href="tel:08001385227"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors"
              >
                Telepon Bebas Pulsa (0800-1-DUKCAPIL)
              </a>
            </div>
          </div>

          {/* Widget 3: Location Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-bold text-slate-900 text-base">Lokasi &amp; Jam Layanan Fisik</h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900">Gedung Disdukcapil Pelayanan Terpadu</p>
                <p className="text-slate-500 mt-0.5">Jl. Pemuda No. 45, Kompleks Perkantoran Pemkot</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Jam Operasional</p>
                <p className="text-slate-500 mt-0.5">Senin &ndash; Jumat: 08.00 &ndash; 15.30 WIB</p>
              </div>
            </div>
          </div>
        </aside>

        {/* =========================================================================
            FOOTER (col-span-12 / Landmark: contentinfo)
        ========================================================================= */}
        <footer className="col-span-1 lg:col-span-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mt-4 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-1 text-center md:text-left">
              <span className="font-bold text-slate-900 text-base">Portal Layanan Akta Kematian Terpadu</span>
              <p className="text-xs text-slate-500 max-w-md">
                Berdasarkan Undang-Undang Republik Indonesia Nomor 24 Tahun 2013 tentang Administrasi Kependudukan.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-600">
              <a href="#prosedur" className="hover:text-blue-600">Alur Pelayanan</a>
              <a href="#persyaratan" className="hover:text-blue-600">Persyaratan Berkas</a>
              <a href="#panduan-lansia" className="hover:text-blue-600">Panduan Lansia</a>
            </div>
          </div>
          <p className="pt-6 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Dinas Kependudukan dan Pencatatan Sipil. Hak Cipta Dilindungi.
          </p>
        </footer>
      </div>

      {/* ONLINE SUBMISSION FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-base">
                {isSubmitted ? "Permohonan Berhasil Dikirim" : "Formulir Pengajuan Surat Kematian"}
              </h2>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg" aria-label="Tutup modal">✕</button>
            </div>
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formStep === 1 && (
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="deceasedName" className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap Almarhum *</label>
                        <input
                          id="deceasedName"
                          type="text"
                          required
                          value={formData.deceasedName}
                          onChange={(e) => setFormData({ ...formData, deceasedName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus-visible:outline-2 focus-visible:outline-blue-700"
                        />
                      </div>
                      <div>
                        <label htmlFor="deceasedNik" className="block text-xs font-semibold text-slate-700 mb-1">NIK Almarhum *</label>
                        <input
                          id="deceasedNik"
                          type="text"
                          required
                          maxLength={16}
                          value={formData.deceasedNik}
                          onChange={(e) => setFormData({ ...formData, deceasedNik: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus-visible:outline-2 focus-visible:outline-blue-700"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold cursor-pointer"
                      >
                        Lanjut
                      </button>
                    </div>
                  )}
                  {formStep === 2 && (
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="applicantName" className="block text-xs font-semibold text-slate-700 mb-1">Nama Pelapor *</label>
                        <input
                          id="applicantName"
                          type="text"
                          required
                          value={formData.applicantName}
                          onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus-visible:outline-2 focus-visible:outline-blue-700"
                        />
                      </div>
                      <div>
                        <label htmlFor="applicantPhone" className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp *</label>
                        <input
                          id="applicantPhone"
                          type="tel"
                          required
                          value={formData.applicantPhone}
                          onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus-visible:outline-2 focus-visible:outline-blue-700"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold cursor-pointer"
                      >
                        Kirim Permohonan
                      </button>
                    </div>
                  )}
                </form>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">Permohonan Berhasil</h3>
                  <p className="text-sm text-slate-600">Nomor Registrasi: <strong>{registrationCode}</strong></p>
                  <button onClick={resetForm} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold cursor-pointer">Tutup</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}