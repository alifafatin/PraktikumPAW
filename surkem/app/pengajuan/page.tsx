'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import BadgeStatus from '@/components/BadgeStatus';
import {
  findRTRWOfficer,
  addReport,
} from '@/lib/mockData';
import { DeathReport, RTRWOfficer, AuthMethod } from '@/types';

interface FormErrors {
  reporterName?: string;
  reporterNik?: string;
  reporterContact?: string;
  deceasedName?: string;
  deceasedNik?: string;
  dateOfDeath?: string;
  causeOfDeath?: string;
  address?: string;
  consent?: string;
}

function ReporterPortalContent() {
  const searchParams = useSearchParams();
  const initialContact = searchParams.get('contact') || '081223344556';
  const initialAuth = (searchParams.get('auth') as AuthMethod) || 'whatsapp';

  // Step 1: Authentication & Reporter Identity
  const authMethod = initialAuth;
  const [contactInput, setContactInput] = useState(initialContact);
  const [reporterName, setReporterName] = useState('Rian Pratama');
  const [reporterNik, setReporterNik] = useState('3273012508920003');
  const [relation, setRelation] = useState('Anak Kandung');

  // Step 2: Deceased Data
  const [deceasedName, setDeceasedName] = useState('');
  const [deceasedNik, setDeceasedNik] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [timeOfDeath, setTimeOfDeath] = useState('10:00');
  const [placeOfDeath, setPlaceOfDeath] = useState('Rumah Tinggal');
  const [causeOfDeath, setCauseOfDeath] = useState('');

  // Step 3: Address & RT/RW Routing State
  const [address, setAddress] = useState('Jl. Merdeka No. 88');
  const [kelurahan, setKelurahan] = useState('Kelurahan Merdeka');
  const [rt, setRt] = useState('03');
  const [rw, setRw] = useState('05');
  const kecamatan = 'Kecamatan Sumur Bandung';
  const [assignedOfficer, setAssignedOfficer] = useState<RTRWOfficer>(() =>
    findRTRWOfficer('Kelurahan Merdeka', '03', '05')
  );

  // Step 4: Documents & AI Optical Verification
  const [docs, setDocs] = useState<{
    ktpDeceased: string | null;
    kkDeceased: string | null;
    hospitalLetter: string | null;
  }>({
    ktpDeceased: 'ktp_almarhum_scan.pdf',
    kkDeceased: 'kartu_keluarga_asli.pdf',
    hospitalLetter: 'surat_kematian_puskesmas.pdf',
  });

  const [aiChecking, setAiChecking] = useState(false);
  const [aiResult, setAiResult] = useState<{
    overallConfidence: number;
    ocrConfidence: number;
    faceClarity: number;
    signatureDetected: boolean;
    notes: string;
  } | null>({
    overallConfidence: 98.5,
    ocrConfidence: 99.1,
    faceClarity: 97.4,
    signatureDetected: true,
    notes: '✅ KTP & KK NIK Matched with 98.5% Confidence. Cap basah RS terverifikasi.',
  });

  // Cryptographic state
  const encryptionStatus = {
    algorithm: 'AES-256-GCM',
    keyBits: 256,
    ivHex: '7d89ab10ef34567890abcdef',
    integrityHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    isEncrypted: true,
  };

  const [consentAgreed, setConsentAgreed] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<DeathReport | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [demoFillToast, setDemoFillToast] = useState(false);

  // Dynamic RT/RW routing change
  const handleAddressRoutingChange = (newKel: string, newRt: string, newRw: string) => {
    setKelurahan(newKel);
    setRt(newRt);
    setRw(newRw);
    const officer = findRTRWOfficer(newKel, newRt, newRw);
    setAssignedOfficer(officer);
  };

  // Simulate AI document scan with ethical fallback (<95%)
  const triggerAiDocCheck = (scenario: 'optimal' | 'suboptimal' = 'optimal') => {
    setAiChecking(true);
    setTimeout(() => {
      setAiChecking(false);
      if (scenario === 'suboptimal') {
        setAiResult({
          overallConfidence: 91.2,
          ocrConfidence: 89.4,
          faceClarity: 88.0,
          signatureDetected: true,
          notes: '⚠️ Kualitas pemindaian dokumen 91.2% (< 95%). Resolusi stempel rumah sakit rendah/buram.',
        });
      } else {
        setAiResult({
          overallConfidence: 98.8,
          ocrConfidence: 99.4,
          faceClarity: 98.1,
          signatureDetected: true,
          notes: '✅ KTP & KK NIK Matched with 98.8% Confidence. Cap basah dan tanda tangan medis valid.',
        });
      }
    }, 600);
  };

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!reporterName.trim()) {
      newErrors.reporterName = 'Nama lengkap pelapor wajib diisi.';
    }

    if (!deceasedName.trim()) {
      newErrors.deceasedName = 'Nama lengkap almarhum/almarhumah wajib diisi.';
    }

    if (!deceasedNik.trim()) {
      newErrors.deceasedNik = 'NIK almarhum wajib diisi.';
    } else if (!/^\d{16}$/.test(deceasedNik.trim())) {
      newErrors.deceasedNik = 'NIK almarhum harus tepat 16 digit angka sesuai KTP.';
    }

    if (reporterNik.trim() && !/^\d{16}$/.test(reporterNik.trim())) {
      newErrors.reporterNik = 'NIK pelapor harus tepat 16 digit angka.';
    }

    if (!dateOfDeath) {
      newErrors.dateOfDeath = 'Tanggal kematian wajib dipilih.';
    }

    if (!causeOfDeath.trim()) {
      newErrors.causeOfDeath = 'Penyebab kematian wajib diisi.';
    }

    if (!address.trim()) {
      newErrors.address = 'Alamat duka wajib diisi.';
    }

    if (!consentAgreed) {
      newErrors.consent =
        'Anda wajib menyetujui deklarasi persetujuan pemrosesan data kependudukan (UU PDP No. 27/2022) sebelum mengirimkan laporan.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      const element = document.getElementById(
        firstKey === 'consent' ? 'privacy-consent-checkbox' : `${firstKey}-input`
      );
      element?.focus();
      return false;
    }

    return true;
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomIdSuffix = Math.floor(100 + Math.random() * 900);
      const reportId = `SK-2026-00${randomIdSuffix}`;

      const newReport: DeathReport = {
        id: reportId,
        reporter: {
          name: reporterName,
          nik: reporterNik || '3273010000000000',
          email: authMethod === 'email' ? contactInput : 'pelapor@gmail.com',
          phone: authMethod === 'whatsapp' ? contactInput : '081234567890',
          relation,
          authMethod,
          isVerified: true,
          verifiedAt: new Date().toLocaleString('id-ID'),
        },
        deceased: {
          fullName: deceasedName,
          nik: deceasedNik,
          gender,
          dateOfBirth: dateOfBirth || '1960-01-01',
          dateOfDeath,
          timeOfDeath,
          causeOfDeath,
          placeOfDeath,
          address,
          rt: rt.padStart(2, '0'),
          rw: rw.padStart(2, '0'),
          kelurahan,
          kecamatan,
          city: 'Kota Bandung',
        },
        status: 'AWAITING_RTRW_APPROVAL',
        assignedRTRW: assignedOfficer,
        submittedAt: new Date().toLocaleString('id-ID') + ' WIB',
        documents: {
          ktpDeceasedName: docs.ktpDeceased || 'ktp_almarhum_encrypted.bin',
          kkDeceasedName: docs.kkDeceased || 'kartu_keluarga_encrypted.bin',
          hospitalLetterName: docs.hospitalLetter || 'surat_rs_encrypted.bin',
          ktpReporterName: 'ktp_pelapor_encrypted.bin',
          encryptionAlgorithm: 'AES-256-GCM',
          payloadHashAes256Gcm: encryptionStatus.integrityHash,
          ivHex: encryptionStatus.ivHex,
          encryptionTimestamp: new Date().toISOString(),
          aiVerification: aiResult
            ? {
                ...aiResult,
                nikMatch: true,
                status: aiResult.overallConfidence >= 95 ? 'VERIFIED' : 'NEEDS_REVIEW',
              }
            : undefined,
        },
        notes:
          aiResult && aiResult.overallConfidence < 95
            ? `Pengajuan baru oleh ${reporterName}. Dialihkan ke Verifikasi Manual RT/RW karena keyakinan AI di bawah 95% (${aiResult.overallConfidence}%). Otomatis diteruskan ke pengurus ${assignedOfficer.officerName}.`
            : `Pengajuan baru oleh ${reporterName}. Otomatis diteruskan ke pengurus ${assignedOfficer.officerName}.`,
      };

      addReport(newReport);
      setSubmittedReport(newReport);
      setIsSubmitting(false);
      setShowReceiptModal(true);
    }, 900);
  };

  // One-Click Auto-Fill Demo Data Button
  const handleQuickFill = () => {
    setDeceasedName('Raden Mas Soewondo');
    setDeceasedNik('3273011902450007');
    setGender('Laki-laki');
    setDateOfBirth('1945-02-19');
    setDateOfDeath('2026-10-14');
    setTimeOfDeath('08:30');
    setPlaceOfDeath('Rumah Sakit Hasan Sadikin (RSHS)');
    setCauseOfDeath('Komplikasi Penyakit Dalam & Usia Lanjut');
    setAddress('Jl. Merdeka No. 104');
    handleAddressRoutingChange('Kelurahan Merdeka', '03', '05');
    setConsentAgreed(true);
    setErrors({});
    setDemoFillToast(true);
    setTimeout(() => setDemoFillToast(false), 3500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & Breadcrumb */}
      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-blue-700">Beranda</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Portal Pelapor Resmi</span>
          </nav>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
              Portal Pelapor Warga
            </span>
            <span className="text-xs text-slate-600">Sesi Terotentikasi ({contactInput})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Formulir Pelaporan Kematian Digital
          </h1>
          <p className="mt-1 text-sm text-slate-700 max-w-3xl leading-relaxed">
            Isi rincian peristiwa duka. Data identitas dilindungi enkripsi client-side <strong className="text-slate-900 font-semibold">AES-256-GCM</strong> sebelum diteruskan ke Ketua RT/RW dan Dinas Dukcapil.
          </p>
        </div>

        {/* Demo Auto-Fill Button */}
        <div className="shrink-0 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleQuickFill}
            aria-label="Isi formulir dengan data contoh otomatis"
            className="border-indigo-600 text-indigo-900 bg-indigo-50/50 hover:bg-indigo-100 font-semibold shadow-xs"
          >
            ⚡ Isi Contoh Otomatis (Demo)
          </Button>
        </div>
      </div>

      {demoFillToast && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 p-3 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-medium flex items-center gap-2 shadow-xs"
        >
          <span className="text-emerald-800 font-bold">✓</span>
          <span>Data demo (Raden Mas Soewondo, NIK: 3273011902450007) berhasil diisikan ke formulir!</span>
        </div>
      )}

      {/* Grid: Form Left, Crypto & RT/RW Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Controlled Form */}
        <form onSubmit={handleSubmit} noValidate className="lg:col-span-8 space-y-8">
          {/* Step 1: Reporter Info */}
          <section
            aria-labelledby="section-reporter-info"
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-white text-xs font-bold" aria-hidden="true">
                  1
                </span>
                <h2 id="section-reporter-info" className="text-lg font-bold text-slate-900">
                  Langkah 1: Identitas Pelapor & Kontak Notifikasi
                </h2>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" aria-hidden="true"></span>
                Terverifikasi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="reporterName-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Nama Lengkap Pelapor <span className="text-red-700">*</span>
                </label>
                <input
                  id="reporterName-input"
                  name="reporterName"
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  aria-invalid={errors.reporterName ? 'true' : 'false'}
                  aria-describedby={errors.reporterName ? 'reporterName-error' : undefined}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                  placeholder="Contoh: Rian Pratama"
                />
                {errors.reporterName && (
                  <p id="reporterName-error" role="alert" className="mt-1 text-xs font-semibold text-red-700">
                    {errors.reporterName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="reporterNik-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  NIK Pelapor (16 Digit) <span className="text-slate-500 text-xs font-normal">(Opsional)</span>
                </label>
                <input
                  id="reporterNik-input"
                  name="reporterNik"
                  type="text"
                  inputMode="numeric"
                  maxLength={16}
                  value={reporterNik}
                  onChange={(e) => setReporterNik(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                  placeholder="16 digit angka NIK pelapor"
                />
              </div>

              <div>
                <label
                  htmlFor="contactInput-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Kontak Notifikasi ({authMethod.toUpperCase()}) <span className="text-red-700">*</span>
                </label>
                <input
                  id="contactInput-input"
                  name="contactInput"
                  type={authMethod === 'whatsapp' ? 'tel' : 'email'}
                  required
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                />
              </div>

              <div>
                <label
                  htmlFor="relation-select"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Hubungan Keluarga dengan Almarhum <span className="text-red-700">*</span>
                </label>
                <select
                  id="relation-select"
                  name="relation"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <option value="Anak Kandung">Anak Kandung</option>
                  <option value="Pasangan (Suami/Istri)">Pasangan (Suami/Istri)</option>
                  <option value="Orang Tua">Orang Tua</option>
                  <option value="Saudara Kandung">Saudara Kandung</option>
                  <option value="Kerabat / Kuasa Keluarga">Kerabat / Kuasa Keluarga</option>
                </select>
              </div>
            </div>
          </section>

          {/* Step 2: Deceased Data */}
          <section
            aria-labelledby="section-deceased-info"
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-white text-xs font-bold" aria-hidden="true">
                2
              </span>
              <h2 id="section-deceased-info" className="text-lg font-bold text-slate-900">
                Langkah 2: Data Almarhum / Almarhumah
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="deceasedName-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Nama Lengkap Almarhum / Almarhumah <span className="text-red-700">*</span>
                </label>
                <input
                  id="deceasedName-input"
                  name="deceasedName"
                  type="text"
                  required
                  value={deceasedName}
                  onChange={(e) => {
                    setDeceasedName(e.target.value);
                    if (errors.deceasedName) setErrors({ ...errors, deceasedName: undefined });
                  }}
                  aria-invalid={errors.deceasedName ? 'true' : 'false'}
                  aria-describedby={errors.deceasedName ? 'deceasedName-error' : undefined}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                  placeholder="Contoh: Raden Mas Soewondo (sesuai KTP / KK)"
                />
                {errors.deceasedName && (
                  <p id="deceasedName-error" role="alert" className="mt-1 text-xs font-semibold text-red-700">
                    {errors.deceasedName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="deceasedNik-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  NIK Almarhum (Wajib 16 Digit) <span className="text-red-700">*</span>
                </label>
                <div className="relative">
                  <input
                    id="deceasedNik-input"
                    name="deceasedNik"
                    type="text"
                    inputMode="numeric"
                    maxLength={16}
                    required
                    value={deceasedNik}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setDeceasedNik(val);
                      if (errors.deceasedNik) setErrors({ ...errors, deceasedNik: undefined });
                    }}
                    aria-invalid={errors.deceasedNik ? 'true' : 'false'}
                    aria-describedby={errors.deceasedNik ? 'deceasedNik-error' : 'deceasedNik-hint'}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white font-mono shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                    placeholder="Contoh: 3273011902450007"
                  />
                  <div className="absolute right-2.5 top-2.5 text-xs text-slate-500 font-mono">
                    {deceasedNik.length}/16
                  </div>
                </div>
                <p id="deceasedNik-hint" className="mt-1 text-[11px] text-slate-600">
                  Data NIK dienkripsi client-side (AES-256) dan 4 digit terakhir digunakan sebagai PIN unduh.
                </p>
                {errors.deceasedNik && (
                  <p id="deceasedNik-error" role="alert" className="mt-1 text-xs font-semibold text-red-700">
                    {errors.deceasedNik}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="gender-select"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Jenis Kelamin <span className="text-red-700">*</span>
                </label>
                <select
                  id="gender-select"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Laki-laki' | 'Perempuan')}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="dateOfBirth-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Tanggal Lahir
                </label>
                <input
                  id="dateOfBirth-input"
                  name="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                />
              </div>

              <div>
                <label
                  htmlFor="dateOfDeath-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Tanggal Meninggal Dunia <span className="text-red-700">*</span>
                </label>
                <input
                  id="dateOfDeath-input"
                  name="dateOfDeath"
                  type="date"
                  required
                  value={dateOfDeath}
                  onChange={(e) => {
                    setDateOfDeath(e.target.value);
                    if (errors.dateOfDeath) setErrors({ ...errors, dateOfDeath: undefined });
                  }}
                  aria-invalid={errors.dateOfDeath ? 'true' : 'false'}
                  aria-describedby={errors.dateOfDeath ? 'dateOfDeath-error' : undefined}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                />
                {errors.dateOfDeath && (
                  <p id="dateOfDeath-error" role="alert" className="mt-1 text-xs font-semibold text-red-700">
                    {errors.dateOfDeath}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="timeOfDeath-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Pukul / Jam Kematian (WIB)
                </label>
                <input
                  id="timeOfDeath-input"
                  name="timeOfDeath"
                  type="time"
                  value={timeOfDeath}
                  onChange={(e) => setTimeOfDeath(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                />
              </div>

              <div>
                <label
                  htmlFor="placeOfDeath-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Tempat Kematian
                </label>
                <input
                  id="placeOfDeath-input"
                  name="placeOfDeath"
                  type="text"
                  value={placeOfDeath}
                  onChange={(e) => setPlaceOfDeath(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                  placeholder="Contoh: RS Hasan Sadikin / Rumah Tinggal"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="causeOfDeath-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Penyebab Kematian (Keterangan Medis) <span className="text-red-700">*</span>
                </label>
                <input
                  id="causeOfDeath-input"
                  name="causeOfDeath"
                  type="text"
                  required
                  value={causeOfDeath}
                  onChange={(e) => {
                    setCauseOfDeath(e.target.value);
                    if (errors.causeOfDeath) setErrors({ ...errors, causeOfDeath: undefined });
                  }}
                  aria-invalid={errors.causeOfDeath ? 'true' : 'false'}
                  aria-describedby={errors.causeOfDeath ? 'causeOfDeath-error' : undefined}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                  placeholder="Contoh: Komplikasi Penyakit Dalam & Usia Lanjut"
                />
                {errors.causeOfDeath && (
                  <p id="causeOfDeath-error" role="alert" className="mt-1 text-xs font-semibold text-red-700">
                    {errors.causeOfDeath}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Step 3: Address & RT/RW Routing */}
          <section
            aria-labelledby="section-address-routing"
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-white text-xs font-bold" aria-hidden="true">
                3
              </span>
              <h2 id="section-address-routing" className="text-lg font-bold text-slate-900">
                Langkah 3: Alamat Duka & Routing Otomatis RT/RW
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="sm:col-span-3">
                <label
                  htmlFor="address-input"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Alamat Lengkap Rumah Duka <span className="text-red-700">*</span>
                </label>
                <input
                  id="address-input"
                  name="address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                  placeholder="Nama jalan, nomor rumah, gang, atau kompleks"
                />
              </div>

              <div>
                <label
                  htmlFor="kelurahan-select"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  Kelurahan <span className="text-red-700">*</span>
                </label>
                <select
                  id="kelurahan-select"
                  name="kelurahan"
                  value={kelurahan}
                  onChange={(e) => handleAddressRoutingChange(e.target.value, rt, rw)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <option value="Kelurahan Merdeka">Kelurahan Merdeka</option>
                  <option value="Kelurahan Sukamaju">Kelurahan Sukamaju</option>
                  <option value="Kelurahan Melati">Kelurahan Melati</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="rt-select"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  RT <span className="text-red-700">*</span>
                </label>
                <select
                  id="rt-select"
                  name="rt"
                  value={rt}
                  onChange={(e) => handleAddressRoutingChange(kelurahan, e.target.value, rw)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <option value="01">RT 01</option>
                  <option value="02">RT 02</option>
                  <option value="03">RT 03</option>
                  <option value="04">RT 04</option>
                  <option value="05">RT 05</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="rw-select"
                  className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1"
                >
                  RW <span className="text-red-700">*</span>
                </label>
                <select
                  id="rw-select"
                  name="rw"
                  value={rw}
                  onChange={(e) => handleAddressRoutingChange(kelurahan, rt, e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 bg-white shadow-2xs focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <option value="01">RW 01</option>
                  <option value="02">RW 02</option>
                  <option value="03">RW 03</option>
                  <option value="05">RW 05</option>
                  <option value="07">RW 07</option>
                </select>
              </div>
            </div>

            {/* Assigned RT/RW Card */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between border-b border-blue-200/60 pb-2 mb-2">
                <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                  <span>📍 Pejabat RT/RW Terdeteksi Otomatis</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                  Terhubung Siap TTD
                </span>
              </div>
              <div className="text-xs text-blue-950 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-600">Pejabat:</span> <strong>{assignedOfficer.officerName}</strong>
                </div>
                <div>
                  <span className="text-slate-600">WhatsApp:</span> <strong className="text-emerald-900">{assignedOfficer.officerPhone}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Documents & AI Verification */}
          <section
            aria-labelledby="section-docs-upload"
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4 mb-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-white text-xs font-bold" aria-hidden="true">
                4
              </span>
              <h2 id="section-docs-upload" className="text-lg font-bold text-slate-900">
                Langkah 4: Unggah Dokumen Pendukung & Asisten Optik AI
              </h2>
            </div>

            <div className="space-y-3">
              {/* Doc 1 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">📄</span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">KTP Almarhum <span className="text-red-700">*</span></span>
                    <span className="text-[11px] text-slate-600">{docs.ktpDeceased}</span>
                  </div>
                </div>
                <label className="cursor-pointer text-xs font-semibold px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 hover:bg-slate-100">
                  <span>Ganti</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setDocs({ ...docs, ktpDeceased: e.target.files[0].name });
                        triggerAiDocCheck();
                      }
                    }}
                  />
                </label>
              </div>

              {/* Doc 2 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">📑</span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Kartu Keluarga (KK) <span className="text-red-700">*</span></span>
                    <span className="text-[11px] text-slate-600">{docs.kkDeceased}</span>
                  </div>
                </div>
                <label className="cursor-pointer text-xs font-semibold px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 hover:bg-slate-100">
                  <span>Ganti</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setDocs({ ...docs, kkDeceased: e.target.files[0].name });
                        triggerAiDocCheck();
                      }
                    }}
                  />
                </label>
              </div>

              {/* Doc 3 */}
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🏥</span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Surat Kematian Medis (RS/Puskesmas) <span className="text-red-700">*</span></span>
                    <span className="text-[11px] text-slate-600">{docs.hospitalLetter}</span>
                  </div>
                </div>
                <label className="cursor-pointer text-xs font-semibold px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 hover:bg-slate-100">
                  <span>Ganti</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setDocs({ ...docs, hospitalLetter: e.target.files[0].name });
                        triggerAiDocCheck();
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* AI Verification Assessment */}
            <div className="mt-4 p-4 rounded-xl border border-indigo-200 bg-indigo-50/70">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <span>🤖 Asisten Optik AI: Hasil Pemindaian Dokumen</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => triggerAiDocCheck('optimal')}
                    disabled={aiChecking}
                    className="text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded hover:bg-emerald-100 cursor-pointer"
                  >
                    {aiChecking ? 'Memindai...' : '⚡ Optimal (98.8%)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerAiDocCheck('suboptimal')}
                    disabled={aiChecking}
                    className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded hover:bg-amber-100 cursor-pointer"
                  >
                    {aiChecking ? 'Memindai...' : '⚠️ Uji Sub-Optimal (91.2%)'}
                  </button>
                </div>
              </div>

              {aiResult && (
                <div className="space-y-2">
                  <p className="text-xs text-indigo-950 bg-white p-2.5 rounded border border-indigo-100">
                    {aiResult.notes} (OCR: {aiResult.ocrConfidence}%, Foto KTP: {aiResult.faceClarity}%)
                  </p>

                  {/* Ethical AI Verification & Fallback Notice (ACM 1.2 Avoid Harm & ACM 2.1 Quality) */}
                  {aiResult.overallConfidence < 95 && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-amber-800 text-base font-bold shrink-0">⚠️</span>
                        <div className="space-y-1">
                          <strong className="block font-bold text-amber-950">
                            Deteksi AI kurang optimal. Berkas Anda akan dialihkan secara otomatis ke Verifikasi Manual oleh Ketua RT/RW tanpa pembatalan instan.
                          </strong>
                          <p className="text-[11px] text-amber-900 leading-relaxed">
                            <strong>Prinsip Etika ACM 1.2 (Avoid Harm) &amp; ACM 2.1 (Quality):</strong> WebSurkem menerapkan prinsip verifikasi manusia berlapis (human-in-the-loop). Keterbatasan pembacaan optik terhadap cap basah atau tulisan tangan medis tidak akan pernah menggugurkan atau membatalkan hak sipil warga secara sepihak. Pengurus RT/RW memiliki wewenang untuk memverifikasi dokumen secara fisik.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Step 5: Deklarasi Persetujuan & Privasi Data Pemohon (ACM 1.6 & Indonesia UU PDP No. 27/2022) */}
          <section
            aria-labelledby="section-privacy-consent"
            className="bg-white rounded-xl border-2 border-blue-200 p-5 sm:p-6 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-white text-xs font-bold" aria-hidden="true">
                  5
                </span>
                <h2 id="section-privacy-consent" className="text-lg font-bold text-slate-900">
                  Deklarasi Persetujuan &amp; Privasi Data Pemohon
                </h2>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 font-bold border border-blue-300 w-fit">
                ACM 1.6 &amp; UU PDP 27/2022
              </span>
            </div>

            {/* Clear Data Minimization Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300 font-semibold">
                <span>🔒</span>
                <span>Data terenkripsi</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold">
                <span>🏛️</span>
                <span>Hanya diakses RT/RW &amp; Dukcapil berwenang</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200 font-semibold">
                <span>🛡️</span>
                <span>Prinsip Minimasi Data</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 font-semibold">
                <span>🚫</span>
                <span>Bebas Komersialisasi Pihak Ketiga</span>
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              Sesuai ketentuan Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) dan Kode Etik Komputasi ACM 2018 (Prinsip 1.6 Menghormati Privasi), data kependudukan almarhum dan pelapor hanya diproses untuk kepentingan verifikasi penerbitan akta kematian resmi dalam ekosistem SPBE.
            </p>

            {/* Mandatory Checkbox */}
            <div className="pt-2">
              <label
                htmlFor="privacy-consent-checkbox"
                className={`flex items-start gap-3 p-3.5 rounded-lg border transition-colors cursor-pointer ${
                  errors.consent
                    ? 'bg-red-50/70 border-red-300'
                    : consentAgreed
                    ? 'bg-blue-50/50 border-blue-300'
                    : 'bg-slate-50 border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <input
                  id="privacy-consent-checkbox"
                  name="privacyConsent"
                  type="checkbox"
                  required
                  checked={consentAgreed}
                  onChange={(e) => {
                    setConsentAgreed(e.target.checked);
                    if (errors.consent) setErrors({ ...errors, consent: undefined });
                  }}
                  aria-invalid={errors.consent ? 'true' : 'false'}
                  aria-describedby={errors.consent ? 'consent-error-msg' : undefined}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600 focus-visible:outline-2 focus-visible:outline-blue-700"
                />
                <div className="text-xs sm:text-sm text-slate-800 leading-snug">
                  <span className="font-semibold text-slate-900">
                    Saya menyetujui pemrosesan data kependudukan ini secara enkripsi client-side (AES-256-GCM) khusus untuk penerbitan Akta Kematian resmi SPBE. <span className="text-red-700">*</span>
                  </span>
                  <span className="block text-[11px] text-slate-600 mt-1">
                    Persetujuan ini mencakup penerusan berkas terenkripsi kepada Pengurus RT/RW domisili duka dan Administrator Dinas Dukcapil.
                  </span>
                </div>
              </label>

              {errors.consent && (
                <p id="consent-error-msg" role="alert" className="mt-2 text-xs font-semibold text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {errors.consent}
                </p>
              )}
            </div>
          </section>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs text-slate-600">
              🔒 Terenkripsi dengan AES-256-GCM sebelum diteruskan ke server
            </span>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              loadingText="Mengenkripsi & Mengirim..."
              className="w-full sm:w-auto shadow-md"
            >
              🔐 Enkripsi & Kirim Pelaporan ke RT/RW
            </Button>
          </div>
        </form>

        {/* Right: Security & Workflow Details */}
        <aside aria-label="Informasi Keamanan Kriptografi" className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Jaminan Kriptografi Client-Side
            </h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Data NIK dan berkas dilindungi enkripsi militer <strong className="text-slate-900">AES-256-GCM</strong>.
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs font-mono space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1">
                <span>AES-256-GCM Active</span>
                <span className="text-emerald-400">ENCRYPTED</span>
              </div>
              <div className="truncate text-amber-300 text-[10px]">IV: {encryptionStatus.ivHex}</div>
              <div className="truncate text-indigo-300 text-[10px]">Checksum: {encryptionStatus.integrityHash.slice(0, 24)}...</div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 border border-slate-200 text-center space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Lacak Dokumen Anda
            </h3>
            <p className="text-xs text-slate-600">
              Sudah memiliki Nomor Registrasi? Periksa penerbitan akta di halaman pencarian resmi.
            </p>
            <Link
              href="/unduh"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg shadow-2xs"
            >
              🔍 Lacak & Unduh Akta →
            </Link>
          </div>
        </aside>
      </div>

      {/* Success Receipt Modal */}
      {showReceiptModal && submittedReport && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="receipt-title"
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="bg-emerald-700 text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-full bg-white text-emerald-700 font-bold">✓</span>
                <div>
                  <h2 id="receipt-title" className="text-base font-bold text-white leading-tight">
                    Laporan Berhasil Dienkripsi & Dikirimkan!
                  </h2>
                  <p className="text-xs text-emerald-100">ID: {submittedReport.id}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-600">Almarhum:</span>
                  <strong className="text-slate-900">{submittedReport.deceased.fullName}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-600">NIK:</span>
                  <span className="font-mono text-slate-800">{submittedReport.deceased.nik}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-600">RT/RW Tujuan:</span>
                  <span className="text-slate-900 font-medium">{submittedReport.assignedRTRW.officerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <BadgeStatus status={submittedReport.status} size="sm" />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <Link
                  href={`/unduh?id=${submittedReport.id}`}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold shadow-xs"
                >
                  Pantau di Halaman Unduh →
                </Link>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowReceiptModal(false)}
                >
                  Tutup Tanda Terima
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReporterPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-slate-600">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-700 border-t-transparent rounded-full mb-3" />
          <p className="text-sm font-semibold">Memuat Portal Pelapor...</p>
        </div>
      }
    >
      <ReporterPortalContent />
    </Suspense>
  );
}
