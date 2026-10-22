'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setOfficerSession, validateOfficerCredential } from '@/lib/mockData';

export default function OfficerLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const session = validateOfficerCredential(username, password);

    if (!session) {
      setError('Email/username atau password tidak valid.');
      return;
    }

    setOfficerSession(session);
    router.push('/dashboard');
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-12 sm:px-6">
      <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg md:grid-cols-2">
        <div className="bg-slate-900 p-8 text-white sm:p-10">
          <span className="text-sm font-semibold text-blue-300">PORTAL PETUGAS</span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight">
            Dashboard verifikasi dan penerbitan
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Masuk menggunakan email atau username petugas dan password demo.
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
            <h2 className="text-xl font-bold text-slate-950">Login Petugas</h2>
            <p className="mt-1 text-sm text-slate-600">Gunakan akun demonstrasi yang tersedia.</p>
          </div>

          <div>
            <label htmlFor="officer-username" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Email / Username
            </label>
            <input
              id="officer-username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError(null);
              }}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-3 text-sm text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              placeholder="Email dinas atau username"
            />
          </div>

          <div>
            <label htmlFor="officer-password" className="mb-1.5 block text-sm font-semibold text-slate-800">
              Password
            </label>
            <input
              id="officer-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null);
              }}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-3 text-sm text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              placeholder="Masukkan password"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Masuk ke Dashboard
          </button>

          <div className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
            <p><strong>RT/RW:</strong> `rt03` / `rt123`</p>
            <p><strong>Dukcapil:</strong> `admin` / `admin123`</p>
          </div>

          <p className="text-center text-sm text-slate-600">
            Warga?{' '}
            <Link href="/login-warga" className="font-semibold text-blue-700 hover:underline">
              Login warga
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
