'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setUserSession, validateWargaLogin } from '@/lib/mockData';

export default function WargaLoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const session = validateWargaLogin(name, phone);

    if (!session) {
      setError('Masukkan nama lengkap dan nomor telepon yang valid (8–15 digit).');
      return;
    }

    setUserSession(session);
    router.push('/pengajuan');
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-12 sm:px-6">
      <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg md:grid-cols-2">
        <div className="bg-blue-800 p-8 text-white sm:p-10">
          <span className="text-sm font-semibold text-blue-200">PORTAL WARGA</span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight">
            Mulai pengajuan Surat Kematian
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-blue-100">
            Masuk dengan nama dan nomor telepon. Ini adalah akses cepat untuk demo layanan;
            verifikasi OTP belum diaktifkan.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex text-sm font-semibold text-white underline underline-offset-4"
          >
            Kembali ke beranda
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-8 sm:p-10">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Login Warga</h2>
            <p className="mt-1 text-sm text-slate-600">Isi data berikut untuk melanjutkan.</p>
          </div>

          <div>
            <label htmlFor="warga-name" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Nama Lengkap
            </label>
            <input
              id="warga-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError(null);
              }}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-3 text-sm text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label htmlFor="warga-phone" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Nomor Telepon
            </label>
            <input
              id="warga-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setError(null);
              }}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-3 text-sm text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              placeholder="Contoh: 081223344556"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Lanjut ke Form Pengajuan
          </button>

          <p className="text-center text-sm text-slate-600">
            Petugas?{' '}
            <Link href="/login-petugas" className="font-semibold text-blue-700 hover:underline">
              Login petugas
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
