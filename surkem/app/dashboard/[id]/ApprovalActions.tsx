'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DeathReport } from '@/types';
import Button from '@/components/Button';
import BadgeStatus from '@/components/BadgeStatus';
import { updateReportStatus, addAuditLog, getOfficerSession } from '@/lib/mockData';

interface ApprovalActionsProps {
  report: DeathReport;
}

export default function ApprovalActions({ report }: ApprovalActionsProps) {
  const [currentStatus, setCurrentStatus] = useState(report.status);
  const [currentSignature, setCurrentSignature] = useState(report.rtRwSignature);

  const [isSigning, setIsSigning] = useState(false);
  const [signNotice, setSignNotice] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isAlreadySigned = !!currentSignature;
  const isCertificateIssued = currentStatus === 'CERTIFICATE_ISSUED';

  const handleSignEd25519 = () => {
    setIsSigning(true);
    setSignNotice('Memuat Kunci Privat Ed25519 RT/RW dari Enklaf Aman...');

    setTimeout(() => {
      setSignNotice('Signing with Ed25519 Digital Signature...');

      setTimeout(() => {
        const session = getOfficerSession();
        const signerName = session?.name || report.assignedRTRW.officerName || 'Ketua RT 03 Merdeka';
        const randomSigPart = Math.random().toString(16).substring(2, 18);
        const signatureHex = `3045022100${randomSigPart}${randomSigPart}0220${randomSigPart}${randomSigPart}`;
        const timestamp = new Date().toLocaleString('id-ID') + ' WIB';

        const newSignature: import('@/types').DigitalSignatureInfo = {
          algorithm: 'Ed25519',
          signerName,
          signerRole: 'Ketua RT',
          signatureHex,
          publicKey: report.assignedRTRW.publicKeyEd25519,
          timestamp,
          verified: true,
        };

        // Update local storage and system state
        updateReportStatus(report.id, 'ED25519_SIGNED', {
          rtRwSignature: newSignature,
          notes: `Disetujui dan ditandatangani secara digital (Ed25519) oleh ${signerName}. Otomatis diteruskan ke antrean verifikasi Dinas Dukcapil.`,
        });

        // Add Immutable Audit Trail Entry
        addAuditLog({
          actorRole: 'Ketua RT/RW',
          actorName: signerName,
          action: 'Persetujuan & Tanda Tangan Digital Draft (Ed25519)',
          targetReportId: report.id,
          cryptoHash: `ed25519:${signatureHex.slice(0, 36)}...`,
          details: `Verifikasi berkas almarhum ${report.deceased.fullName} disahkan oleh ${signerName}. Kunci publik terverifikasi sah.`,
        });

        setCurrentStatus('ED25519_SIGNED');
        setCurrentSignature(newSignature);
        setIsSigning(false);
        setSignNotice(null);
        setSuccessMessage('Berkas berhasil disetujui & ditandatangani secara digital dengan kunci privat Ed25519!');
      }, 900);
    }, 600);
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Status Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-slate-600 block">Status Otorisasi Saat Ini:</span>
          <div className="mt-1 flex items-center gap-2">
            <BadgeStatus status={currentStatus} size="md" />
            {isAlreadySigned && (
              <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                ✓ Ed25519 Valid
              </span>
            )}
            {isCertificateIssued && (
              <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                ✓ Akta Diterbitkan
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {!isAlreadySigned && (
            <Button
              type="button"
              variant="primary"
              size="md"
              isLoading={isSigning}
              loadingText="Menandatangani..."
              onClick={handleSignEd25519}
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold shadow-md focus-visible:outline-2 focus-visible:outline-indigo-700"
              aria-label={`Setujui dan tanda tangani berkas ${report.id} secara digital dengan Ed25519`}
            >
              🖋️ Ed25519 Approval
            </Button>
          )}

          {isCertificateIssued && (
            <Link
              href={`/unduh?id=${report.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-md transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              📥 Unduh Akta Resmi
            </Link>
          )}

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-300 shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-slate-700"
          >
            ← Kembali ke Dashboard
          </Link>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm flex items-start gap-3 shadow-xs"
        >
          <span className="text-emerald-700 font-bold text-lg leading-none" aria-hidden="true">
            ✓
          </span>
          <div className="space-y-1">
            <strong className="block font-bold">Otorisasi Berhasil</strong>
            <p className="leading-relaxed">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Signing Progress Feedback Overlay */}
      {isSigning && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 rounded-xl bg-slate-900 text-white border border-slate-700 flex items-center gap-3 shadow-lg"
        >
          <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-300 block">Kriptografi Asimetris Ed25519</span>
            <p className="text-xs text-white font-mono">{signNotice || 'Memproses tanda tangan...'}</p>
          </div>
        </div>
      )}

      {/* Cryptographic Signature Card (If signed) */}
      {currentSignature && (
        <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 space-y-2">
          <div className="flex items-center justify-between border-b border-indigo-200/80 pb-2">
            <span className="font-bold flex items-center gap-1.5 text-indigo-950">
              <span>🔏</span>
              <span>Tanda Tangan Digital Tersimpan (Ed25519 RFC 8032)</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-200 text-indigo-950">
              TERVALIDASI SPBE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
            <div>
              <span className="text-indigo-700 block">Penandatangan:</span>
              <strong className="text-slate-900">{currentSignature.signerName}</strong> ({currentSignature.signerRole})
            </div>
            <div>
              <span className="text-indigo-700 block">Waktu Penandatanganan:</span>
              <span className="text-slate-900">{currentSignature.timestamp}</span>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <span className="text-indigo-700 block">Kunci Publik Ed25519:</span>
              <span className="text-slate-900 break-all bg-white/70 p-1 rounded border border-indigo-200 block">
                {currentSignature.publicKey}
              </span>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <span className="text-indigo-700 block">Signature Hex:</span>
              <span className="text-slate-900 break-all bg-white/70 p-1 rounded border border-indigo-200 block text-[10px]">
                {currentSignature.signatureHex}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
