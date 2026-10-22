'use client';

import React, { Suspense, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserSession } from '@/types';
import { getUserSession, logoutUser, subscribeToUserSession } from '@/lib/mockData';

function getServerSessionSnapshot(): null {
  return null;
}

function getRoleLabel(role: 'rtrw' | 'dukcapil'): string {
  return role === 'rtrw' ? 'RT/RW' : 'Dukcapil';
}

function NavigationLinks({
  links,
  pathname,
}: {
  links: { href: string; label: string }[];
  pathname: string | null;
}) {
  const isActive = (href: string) =>
    pathname !== null && (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(link.href) ? 'page' : undefined}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
            isActive(link.href)
              ? 'bg-blue-50 text-blue-900'
              : 'text-slate-700 hover:bg-slate-100 hover:text-blue-800'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

function CurrentPathNavigationLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();
  return <NavigationLinks links={links} pathname={pathname} />;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = useSyncExternalStore<UserSession | null>(
    subscribeToUserSession,
    getUserSession,
    getServerSessionSnapshot
  );
  const router = useRouter();
  const isOfficer = session?.role === 'rtrw' || session?.role === 'dukcapil';
  const applicationHref = session ? '/pengajuan' : '/login-warga';

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: applicationHref, label: 'Ajukan Surat Kematian' },
    { href: '/unduh', label: 'Cari & Unduh Akta' },
  ];

  const handleLogout = () => {
    logoutUser();
    setMobileMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <aside
        aria-label="Kepatuhan etika komputasi dan perlindungan data"
        className="w-full border-b border-slate-800 bg-slate-900 px-4 py-1.5 text-center text-[11px] font-medium text-slate-200"
      >
        🛡️ WebSurkem dikembangkan dengan memperhatikan etika komputasi dan pelindungan data pribadi.
      </aside>

      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-blue-800 px-4 py-2 font-semibold text-white focus:not-sr-only focus:absolute focus:left-2 focus:top-2"
      >
        Loncat ke konten utama
      </a>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-lg p-1.5 text-slate-900"
            aria-label="WebSurkem - Beranda"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
              WS
            </span>
            <span className="flex flex-col">
              <span className="text-lg font-bold leading-tight tracking-tight">WebSurkem</span>
              <span className="text-[11px] font-medium leading-none text-slate-600">
                Layanan Akta Kematian Digital
              </span>
            </span>
          </Link>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
            <Suspense fallback={<NavigationLinks links={navLinks} pathname={null} />}>
              <CurrentPathNavigationLinks links={navLinks} />
            </Suspense>
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            {session?.role === 'warga' && (
              <>
                <span className="max-w-40 truncate rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-950">
                  Warga: {session.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700"
                >
                  Keluar
                </button>
              </>
            )}

            {isOfficer && (
              <>
                <span
                  className={`max-w-40 truncate rounded-full border px-3 py-1.5 text-xs font-bold ${
                    session.role === 'rtrw'
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-950'
                      : 'border-blue-200 bg-blue-50 text-blue-950'
                  }`}
                >
                  {getRoleLabel(session.role)}: {session.name}
                </span>
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700"
                >
                  Keluar
                </button>
              </>
            )}

            {!session && (
              <>
                <Link
                  href="/login-warga"
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Login Warga
                </Link>
                <Link
                  href="/login-petugas"
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Login Petugas
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-800 hover:bg-slate-100 md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          >
            <span aria-hidden="true">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navigasi seluler"
          className="space-y-1 border-t border-slate-200 bg-white px-4 py-3 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}

          {isOfficer && (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-50"
            >
              Dashboard Petugas · {getRoleLabel(session.role)}
            </Link>
          )}

          {session && (
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
              <span className="truncate text-sm font-semibold text-slate-800">
                {session.name}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-red-700"
              >
                Keluar
              </button>
            </div>
          )}

          {!session && (
            <>
              <Link
                href="/login-warga"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-50"
              >
                Login Warga
              </Link>
              <Link
                href="/login-petugas"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-50"
              >
                Login Petugas
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
