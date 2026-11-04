import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  Notification03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Bi } from "./bi";

/** A small government-service page built only from DGA token utilities. */
export function ServiceCard() {
  return (
    <div className="overflow-hidden rounded-md border border-border-neutral-secondary bg-body">
      <header className="flex items-center justify-between gap-4 bg-nav-header px-4 py-3 text-oncolor-primary">
        <span className="font-semibold">
          <Bi ar="منصة الخدمات" en="Services platform" />
        </span>
        <HugeiconsIcon icon={Notification03Icon} size={20} aria-hidden />
      </header>
      <div className="flex flex-col gap-section-gap p-section-padding">
        <div className="flex flex-col gap-2">
          <h2 className="text-display-xs font-semibold text-display">
            <Bi ar="تجديد الهوية الوطنية" en="Renew national ID" />
          </h2>
          <p className="max-w-paragraph text-md text-primary-paragraph">
            <Bi
              ar="جدّد هويتك الوطنية إلكترونيًا خلال دقائق دون الحاجة لزيارة الفرع."
              en="Renew your national ID online in minutes, without visiting a branch."
            />
          </p>
        </div>
        <div className="flex flex-col gap-card-md-gap rounded-card border border-border-neutral-secondary bg-card p-card-md-padding shadow-sm">
          <div className="flex items-center gap-2 text-success">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} aria-hidden />
            <span className="text-sm font-medium">
              <Bi ar="أنت مؤهل لهذه الخدمة" en="You are eligible for this service" />
            </span>
          </div>
          <p className="text-sm text-secondary-paragraph">
            <Bi ar="المدة المتوقعة: ٥ دقائق" en="Estimated time: 5 minutes" />
          </p>
          <div className="flex flex-wrap items-center gap-buttons-group-gap">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-1 rounded-sm bg-primary px-4 text-md font-medium text-primary-foreground hover:bg-button-background-primary-hovered focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Bi ar="ابدأ الخدمة" en="Start service" />
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={20}
                className="rtl:-scale-x-100"
                aria-hidden
              />
            </button>
            <a
              href="#details"
              className="text-md font-medium text-link-primary underline-offset-4 hover:text-link-primary-hovered hover:underline"
            >
              <Bi ar="تفاصيل الخدمة" en="Service details" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
