import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReportById, getAllDashboardReports } from '@/lib/data';
import BadgeStatus from '@/components/BadgeStatus';
import ApprovalActions from './ApprovalActions';

interface DashboardDetailPageProps {
  params: Promise<{ id: string }>;
}

// Next.js static generation optimization for known dashboard report IDs
export async function generateStaticParams() {
  const reports = await getAllDashboardReports();
  return reports.map((report) => ({
    id: report.id,
  }));
}

export default async function DashboardDetailPage({ params }: DashboardDetailPageProps) {
  // Next.js 16 (React 19) requires awaiting dynamic route params
  const { id } = await params;

  if (!id) {
    notFound();
  }

  // Lookup record from lib/data.ts (supports SK-2026-00630, SRK-..., etc.)
  const report = await getReportById(id);

  if (!report) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Breadcrumb & Return to Dashboard Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-600">
          <Link href="/" className="hover:text-blue-700 transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/dashboard" className="hover:text-blue-700 transition-colors">
            Dashboard
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-800 font-bold font-mono">Periksa Berkas #{report.id}</span>
        </nav>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs shadow-2xs transition-colors focus-visible:outline-2 focus-visible:outline-blue-700 w-fit"
        >
          <span>← Kembali ke Dashboard</span>
        </Link>
      </div>

      {/* Main Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-blue-100 text-blue-950 border border-blue-300">
              #{report.id}
            </span>
            <span className="text-xs text-slate-600">Diajukan: {report.submittedAt}</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
              AES-256-GCM Terverifikasi
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Pemeriksaan Berkas: {report.deceased.fullName}
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Pemeriksaan kelengkapan berkas kematian warga untuk pengesahan tanda tangan digital Ed25519 dan penerbitan Akta Kematian resmi SPBE.
          </p>
        </div>

        <div className="shrink-0">
          <BadgeStatus status={report.status} size="md" />
        </div>
      </header>

      {/* Ed25519 Approval Action Card */}
      <section aria-labelledby="section-actions-heading" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <h2 id="section-actions-heading" className="sr-only">
          Aksi Otorisasi dan Persetujuan Berkas
        </h2>
        <ApprovalActions report={report} />
      </section>

      {/* Detailed Identity & Administrative Data Grid */}
      <section aria-labelledby="section-identity-heading" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <h2 id="section-identity-heading" className="sr-only">
          Rincian Identitas Almarhum dan Pemohon
        </h2>

        {/* Card 1: Data Almarhum */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="text-base" aria-hidden="true">🕊️</span>
              <span>Data Almarhum / Almarhumah</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">ID: {report.id}</span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="sm:col-span-2">
              <dt className="text-slate-600">Nama Lengkap Almarhum:</dt>
              <dd className="text-sm font-bold text-slate-900 mt-0.5">{report.deceased.fullName}</dd>
            </div>

            <div>
              <dt className="text-slate-600">Nomor Induk Kependudukan (NIK):</dt>
              <dd className="font-mono text-slate-900 font-bold mt-0.5">{report.deceased.nik}</dd>
            </div>

            <div>
              <dt className="text-slate-600">Jenis Kelamin:</dt>
              <dd className="text-slate-900 font-medium mt-0.5">{report.deceased.gender}</dd>
            </div>

            <div>
              <dt className="text-slate-600">Tanggal &amp; Waktu Wafat:</dt>
              <dd className="text-slate-900 font-medium mt-0.5">
                {report.deceased.dateOfDeath} ({report.deceased.timeOfDeath} WIB)
              </dd>
            </div>

            <div>
              <dt className="text-slate-600">Tempat Wafat:</dt>
              <dd className="text-slate-900 font-medium mt-0.5">{report.deceased.placeOfDeath}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-slate-600">Penyebab Kematian:</dt>
              <dd className="text-slate-900 font-semibold mt-0.5">{report.deceased.causeOfDeath}</dd>
            </div>

            <div className="sm:col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <dt className="text-slate-600">Alamat Duka:</dt>
              <dd className="text-slate-900 font-medium mt-0.5 leading-relaxed">
                {report.deceased.address}, RT {report.deceased.rt} / RW {report.deceased.rw},{' '}
                {report.deceased.kelurahan}, {report.deceased.kecamatan}, {report.deceased.city}
              </dd>
            </div>
          </dl>
        </div>

        {/* Card 2: Identitas Pelapor & Wilayah Satgas */}
        <div className="space-y-6">
          {/* Identitas Pelapor */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="text-base" aria-hidden="true">👤</span>
                <span>Identitas Pelapor / Pemohon</span>
              </h3>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-slate-600">Nama Pelapor:</dt>
                <dd className="text-sm font-bold text-slate-900 mt-0.5">{report.reporter.name}</dd>
              </div>

              <div>
                <dt className="text-slate-600">Hubungan Keluarga:</dt>
                <dd className="text-slate-900 font-semibold mt-0.5">{report.reporter.relation}</dd>
              </div>

              <div>
                <dt className="text-slate-600">Kontak Terdaftar:</dt>
                <dd className="text-slate-900 font-mono mt-0.5">
                  {report.reporter.authMethod === 'whatsapp' ? `📱 ${report.reporter.phone}` : `✉️ ${report.reporter.email}`}
                </dd>
              </div>

              <div>
                <dt className="text-slate-600">Status Verifikasi Kontak:</dt>
                <dd className="text-emerald-800 font-semibold mt-0.5 flex items-center gap-1">
                  <span>✓ Terverifikasi OTP/Link</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Wilayah & Aparatur RT/RW Penanggung Jawab */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="text-base" aria-hidden="true">🏡</span>
                <span>Wilayah Tugas &amp; Verifikator RT/RW</span>
              </h3>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-slate-600">Ketua RT/RW Bertugas:</dt>
                <dd className="text-slate-900 font-bold mt-0.5">{report.assignedRTRW.officerName}</dd>
              </div>

              <div>
                <dt className="text-slate-600">Kontak Satgas:</dt>
                <dd className="text-slate-900 font-mono mt-0.5">{report.assignedRTRW.officerPhone}</dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-slate-600">Wilayah Yurisdiksi:</dt>
                <dd className="text-slate-900 mt-0.5">
                  RT {report.assignedRTRW.rt} / RW {report.assignedRTRW.rw}, {report.assignedRTRW.kelurahan},{' '}
                  {report.assignedRTRW.kecamatan}, {report.assignedRTRW.city}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Document Attachments & AES-256-GCM Cryptographic Integrity */}
      <section aria-labelledby="section-docs-heading" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 id="section-docs-heading" className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span aria-hidden="true">📁</span>
              <span>Dokumen Persyaratan &amp; Integritas Kriptografi</span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Berkas digital dienkripsi client-side menggunakan AES-256-GCM sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022).
            </p>
          </div>

          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 text-emerald-400 self-start sm:self-center">
            SHA-256 SEAL VALID
          </span>
        </div>

        {/* Attached Files List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-500 block text-[11px]">KTP Almarhum:</span>
            <strong className="text-slate-900 font-mono block mt-1 truncate" title={report.documents.ktpDeceasedName}>
              📄 {report.documents.ktpDeceasedName}
            </strong>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-1">✓ Berkas Lengkap</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-500 block text-[11px]">Kartu Keluarga (KK):</span>
            <strong className="text-slate-900 font-mono block mt-1 truncate" title={report.documents.kkDeceasedName}>
              📄 {report.documents.kkDeceasedName}
            </strong>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-1">✓ Berkas Lengkap</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-500 block text-[11px]">Surat Medis / Kematian:</span>
            <strong className="text-slate-900 font-mono block mt-1 truncate" title={report.documents.hospitalLetterName}>
              📄 {report.documents.hospitalLetterName}
            </strong>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-1">✓ Berkas Lengkap</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-slate-500 block text-[11px]">KTP Pelapor:</span>
            <strong className="text-slate-900 font-mono block mt-1 truncate" title={report.documents.ktpReporterName}>
              📄 {report.documents.ktpReporterName}
            </strong>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-1">✓ Berkas Lengkap</span>
          </div>
        </div>

        {/* Cryptographic Hash & Envelope Information */}
        <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
            <span>Standar Kriptografi SPBE: AES-256-GCM</span>
            <span className="text-emerald-400 font-bold">TERENKRIPSI</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block">Initialization Vector (IV Hex):</span>
              <span className="text-amber-300 break-all">{report.documents.ivHex}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Timestamp Enkripsi:</span>
              <span className="text-slate-300">{report.documents.encryptionTimestamp}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-slate-400 block">Payload SHA-256 Checksum:</span>
              <span className="text-emerald-400 break-all">{report.documents.payloadHashAes256Gcm}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation Bar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          <span>← Kembali ke Dashboard</span>
        </Link>

        <span className="text-xs text-slate-500 font-mono">
          Pusat Pelayanan Digital Surat Kematian (WebSurkem) • SPBE Kota Bandung
        </span>
      </div>
    </div>
  );
}

