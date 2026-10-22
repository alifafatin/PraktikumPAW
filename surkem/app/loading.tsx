export default function Loading() {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Memuat halaman"
      className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-center justify-center px-4 py-12"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-lg font-bold text-white shadow-lg shadow-blue-900/20">
        WS
      </div>
      <div
        aria-hidden="true"
        className="mt-6 h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700"
      />
      <p className="mt-4 text-sm font-semibold text-slate-800">Memuat halaman...</p>
      <p className="mt-1 text-xs text-slate-500">Mohon tunggu sebentar.</p>
      <span className="sr-only">Konten halaman sedang dimuat.</span>
    </section>
  );
}
