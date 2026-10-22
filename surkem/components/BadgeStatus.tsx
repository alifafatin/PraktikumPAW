import type { CertificateStatus } from "@/types";

interface BadgeStatusProps {
  status: CertificateStatus;
  size?: "sm" | "md";
}

const statusDetails: Record<
  CertificateStatus,
  { label: string; classes: string }
> = {
  DRAFT_ENCRYPTED: {
    label: "Draft Terenkripsi",
    classes: "border-slate-300 bg-slate-100 text-slate-800",
  },
  AWAITING_RTRW_APPROVAL: {
    label: "Menunggu Persetujuan RT/RW",
    classes: "border-amber-300 bg-amber-50 text-amber-900",
  },
  ED25519_SIGNED: {
    label: "Ditandatangani RT/RW",
    classes: "border-indigo-300 bg-indigo-50 text-indigo-900",
  },
  PROCESSING_DUKCAPIL: {
    label: "Diproses Dukcapil",
    classes: "border-blue-300 bg-blue-50 text-blue-900",
  },
  CERTIFICATE_ISSUED: {
    label: "Akta Diterbitkan",
    classes: "border-emerald-300 bg-emerald-50 text-emerald-900",
  },
};

export default function BadgeStatus({ status, size = "md" }: BadgeStatusProps) {
  const details = statusDetails[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold ${details.classes} ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      {details.label}
    </span>
  );
}
