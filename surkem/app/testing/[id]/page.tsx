import React from 'react';
import { Suspense } from 'react';

interface TestingDetailPageProps {
  params: Promise<{ id: string }>;
}

async function TestingDetail({ params }: TestingDetailPageProps) {
  const { id } = await params;
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold">Testing Detail Page</h1>
      <p className="text-sm text-slate-600 mt-2">ID Pengujian: {id}</p>
    </div>
  );
}

export default function TestingDetailPage({ params }: TestingDetailPageProps) {
  return (
    <Suspense fallback={<p className="p-8 text-center text-slate-600">Memuat halaman pengujian...</p>}>
      <TestingDetail params={params} />
    </Suspense>
  );
}
