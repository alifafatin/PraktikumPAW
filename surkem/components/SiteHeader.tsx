'use client';

import React from 'react';
import Navbar from './Navbar';

export function SiteHeader() {
  return (
    <>
      {/* Global ACM Compliance Banner (ACM 3.1 Public Good) */}
      <aside
        aria-label="Kepatuhan Etika Komputasi & Perlindungan Data"
        className="w-full bg-slate-900 text-slate-200 text-[11px] px-4 py-1.5 border-b border-slate-800 text-center font-medium"
      >
        <span className="inline-flex items-center gap-1.5">
          <span>🛡️</span>
          <span>WebSurkem dikembangkan sesuai Prinsip Etika Komputasi ACM 2018 &amp; Regulasi Pelindungan Data Pribadi (UU PDP No. 27/2022).</span>
        </span>
      </aside>
      <Navbar />
    </>
  );
}

export default SiteHeader;

