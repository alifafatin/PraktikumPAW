import type { ReactNode } from "react";

interface CardInfoProps {
  title: string;
  value: string | number;
  subtitle: string;
  variant?: "warning" | "success" | "default" | "primary";
  headingLevel?: "h2" | "h3" | "h4";
  icon?: ReactNode;
}

const variantClasses: Record<NonNullable<CardInfoProps["variant"]>, string> = {
  warning: "border-amber-200 bg-amber-50",
  success: "border-emerald-200 bg-emerald-50",
  default: "border-slate-200 bg-white",
  primary: "border-blue-200 bg-blue-50",
};

export default function CardInfo({
  title,
  value,
  subtitle,
  variant = "default",
  headingLevel: Heading = "h3",
  icon,
}: CardInfoProps) {
  return (
    <article className={`rounded-xl border p-4 shadow-xs ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <Heading className="text-xs font-semibold text-slate-700">
            {title}
          </Heading>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-600">{subtitle}</p>
        </div>
        {icon && (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/80"
          >
            {icon}
          </span>
        )}
      </div>
    </article>
  );
}
