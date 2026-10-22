'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function UnduhTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // State resets on every sub-route navigation as per Next.js Template specification
  const [mountTime, setMountTime] = useState<string | null>(null);
  const [visitedCount, setVisitedCount] = useState(1);
  const [showDemoState, setShowDemoState] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const currentMountTime = new Date().toLocaleTimeString('id-ID');
      setMountTime(currentMountTime);
      // Demonstrates clean template instance creation per navigation
      console.log(`[Next.js Template Mounted]: Sub-route navigation to ${pathname} at ${currentMountTime}`);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div className="space-y-4">
      {/* Module 4 Template Demonstration Notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 sm:p-4 text-xs text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-blue-600 text-white font-bold text-[10px]" aria-hidden="true">
            TEMPLATE
          </span>
          <span className="leading-relaxed">
            <strong>Module 4 Routing Standard:</strong> Template instans aktif (Dimuat pada <span className="font-mono">{mountTime ?? '...'} WIB</span>). State otomatis ter-reset bersih pada setiap navigasi sub-rute katalog &amp; halaman detail.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setVisitedCount((c) => c + 1)}
            className="px-2.5 py-1 rounded bg-white border border-blue-300 text-blue-900 font-medium text-[11px] hover:bg-blue-100/60 cursor-pointer transition-colors"
            title="Klik untuk menguji state lokal template ini"
          >
            Uji State Lokal ({visitedCount})
          </button>
          <button
            type="button"
            onClick={() => setShowDemoState(!showDemoState)}
            className="text-[11px] text-blue-700 hover:text-blue-950 underline font-medium cursor-pointer"
          >
            {showDemoState ? 'Tutup Info' : 'Info Reset State'}
          </button>
        </div>
      </div>

      {showDemoState && (
        <div
          role="region"
          aria-label="Penjelasan Reset State Template"
          className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 space-y-1 shadow-2xs"
        >
          <strong className="text-slate-900 block">Karakteristik Next.js template.tsx vs layout.tsx:</strong>
          <p className="text-[11px] leading-relaxed text-slate-600">
            Berbeda dengan <code className="font-mono bg-slate-100 px-1 rounded">layout.tsx</code> yang mempertahankan status input/filter saat berpindah sub-halaman, <code className="font-mono bg-slate-100 px-1 rounded">template.tsx</code> membuat instans baru untuk setiap halaman anak, memastikan formulir pencarian dan status pratinjau dokumen ter-reset secara higienis tanpa sisa data permohonan sebelumnya.
          </p>
        </div>
      )}

      {/* Page content rendered cleanly */}
      <div>{children}</div>
    </div>
  );
}
