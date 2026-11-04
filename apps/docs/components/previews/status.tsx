import {
  Alert02Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import { Bi } from "./bi";

const STATUSES: {
  key: string;
  icon: IconSvgElement;
  ar: string;
  en: string;
  subtle: string;
  solid: string;
}[] = [
  {
    key: "success",
    icon: CheckmarkCircle02Icon,
    ar: "تم إرسال الطلب بنجاح",
    en: "Request submitted",
    subtle: "bg-success-50 border-success text-success",
    solid: "bg-success",
  },
  {
    key: "info",
    icon: InformationCircleIcon,
    ar: "سيتم التحديث يوم الأحد",
    en: "Updates arrive on Sunday",
    subtle: "bg-info-50 border-info text-info",
    solid: "bg-info",
  },
  {
    key: "warning",
    icon: Alert02Icon,
    ar: "تنتهي الوثيقة خلال ٣٠ يومًا",
    en: "Document expires in 30 days",
    subtle: "bg-warning-50 border-warning text-warning",
    solid: "bg-warning",
  },
  {
    key: "error",
    icon: AlertCircleIcon,
    ar: "تعذّر التحقق من البيانات",
    en: "We could not verify your details",
    subtle: "bg-error-50 border-error text-error",
    solid: "bg-error",
  },
];

export function StatusColors() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        {STATUSES.map((s) => (
          <div
            key={s.key}
            className={cn("flex items-center gap-2 rounded-sm border-s-4 px-4 py-3", s.subtle)}
          >
            <HugeiconsIcon icon={s.icon} size={20} aria-hidden />
            <span className="text-sm font-medium">
              <Bi ar={s.ar} en={s.en} />
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap content-start gap-3">
        {STATUSES.map((s) => (
          <span
            key={s.key}
            className={cn(
              "rounded-sm px-3 py-1.5 text-sm font-medium text-oncolor-primary",
              s.solid,
            )}
          >
            {s.key}
          </span>
        ))}
        <span className="rounded-sm bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
          primary
        </span>
        <span className="rounded-sm bg-background-secondary px-3 py-1.5 text-sm font-medium text-on-gold">
          gold
        </span>
        <span className="rounded-sm bg-tertiary px-3 py-1.5 text-sm font-medium text-oncolor-primary">
          lavender
        </span>
      </div>
    </div>
  );
}
