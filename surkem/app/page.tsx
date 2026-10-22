'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserSession } from '@/lib/mockData';

const steps = [
  {
    number: '01',
    title: 'Isi pengajuan',
    description: 'Lengkapi identitas pelapor, data almarhum, dan informasi peristiwa kematian.',
  },
  {
    number: '02',
    title: 'Unggah dokumen',
    description: 'Siapkan dokumen pendukung agar petugas dapat memeriksa data dengan tepat.',
  },
  {
    number: '03',
    title: 'Verifikasi RT/RW',
    description: 'Petugas wilayah memeriksa permohonan dan memberikan persetujuan.',
  },
  {
    number: '04',
    title: 'Penerbitan Dukcapil',
    description: 'Dukcapil memproses akta yang sudah disetujui untuk dapat diunduh.',
  },
];

export default function LandingPage() {
  const router = useRouter();

  const handleNewApplication = () => {
    router.push(getUserSession() ? '/pengajuan' : '/login-warga');
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-950">
              <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
              Layanan publik digital untuk warga
            </span>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Urus Surat Kematian dengan lebih mudah dan terarah.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Ajukan data secara online, ikuti proses verifikasi, dan pantau penerbitan akta
              melalui satu layanan terpadu.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleNewApplication}
                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Buat Surat Kematian Baru
                <span className="ml-2" aria-hidden="true">→</span>
              </button>
              <Link
                href="/login-petugas"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Dashboard Petugas
              </Link>
            </div>
            <p className="text-xs text-slate-500">
              Warga dapat memulai pengajuan dengan nama lengkap dan nomor telepon.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl sm:p-8">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
                Alur layanan
              </span>
              <span className="text-3xl" aria-hidden="true">📄</span>
            </div>
            <h2 className="mt-8 text-2xl font-bold">Satu alur, dari pengajuan sampai akta.</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Ikuti status permohonan saat berkas diperiksa oleh petugas wilayah dan Dinas
              Kependudukan dan Pencatatan Sipil.
            </p>
            <div className="mt-8 space-y-4">
              {steps.slice(0, 3).map((step) => (
                <div key={step.number} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-blue-200">
                    {step.number}
                  </span>
                  <span className="text-sm font-semibold text-slate-100">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="application-steps-title"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            Panduan pengajuan
          </p>
          <h2
            id="application-steps-title"
            className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
          >
            Bagaimana cara mengurus Surat Kematian?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Berikut tahapan yang perlu dilalui sampai akta siap diterbitkan.
          </p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-800">
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleNewApplication}
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white hover:bg-blue-800 sm:w-auto"
          >
            Buat Surat Kematian Baru
          </button>
          <Link
            href="/unduh"
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 hover:bg-slate-100 sm:w-auto"
          >
            Cari &amp; Unduh Akta
          </Link>
        </div>
      </section>
    </div>
  );
}
