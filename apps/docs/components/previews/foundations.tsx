import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  Calendar03Icon,
  Delete02Icon,
  Download04Icon,
  Home01Icon,
  Mail01Icon,
  Search01Icon,
  Settings02Icon,
  Tick02Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { tokens } from "@/lib/tokens";
import { Bi } from "./bi";

export function TypographyDemo() {
  return (
    <div className="flex flex-col gap-4">
      {tokens.typography.sizes.map((size) => (
        <div
          key={size.key}
          className="flex flex-col gap-1 border-b border-border pb-3 last:border-0"
        >
          <span className="font-mono text-xs text-muted-foreground">{size.utility}</span>
          <span className={`${size.utility} font-semibold text-display`}>
            <Bi ar="منصات الكود الموحد" en="Unified Platforms Code" />
          </span>
        </div>
      ))}
    </div>
  );
}

export function WeightsDemo() {
  const weights = [
    ["font-regular", "Regular 400"],
    ["font-medium", "Medium 500"],
    ["font-semibold", "SemiBold 600"],
    ["font-bold", "Bold 700"],
  ] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {weights.map(([cls, label]) => (
        <div key={cls} className="rounded-sm border border-border bg-card p-4">
          <p className={`${cls} text-display-xs text-display`}>
            <Bi ar="الخط العربي" en="IBM Plex Sans Arabic" />
          </p>
          <p className="text-xs text-muted-foreground">
            {label} · {cls}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Section and card spacing change with the viewport (Figma Desktop/Tablet/Mobile modes). */
export function SpacingDemo() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-section-gap rounded-md bg-muted p-section-padding">
        <p className="text-sm font-medium text-foreground">p-section-padding · gap-section-gap</p>
        <div className="grid gap-card-lg-gap sm:grid-cols-2">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="flex flex-col gap-card-lg-gap rounded-card bg-card p-card-lg-padding shadow-xs"
            >
              <span className="h-3 w-24 rounded-xs bg-sa-flag-200" />
              <span className="h-3 w-full rounded-xs bg-neutral-200 dark:bg-neutral-700" />
              <span className="font-mono text-xs text-muted-foreground">p-card-lg-padding</span>
            </div>
          ))}
        </div>
      </section>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-foreground">
          <Bi ar="الهوامش المنطقية تنعكس تلقائيًا" en="Logical spacing flips with direction" />
        </p>
        <div className="rounded-sm border border-dashed border-border-neutral-primary p-2">
          <div className="ms-12 flex items-center gap-2 rounded-xs bg-primary-50 py-2 ps-3 text-sm text-primary">
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={16}
              className="rtl:-scale-x-100"
              aria-hidden
            />
            ms-12 · ps-3
          </div>
        </div>
      </div>
    </div>
  );
}

export function RadiusDemo() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {tokens.radius
        .filter((r) => r.name.startsWith("radius-"))
        .map((r) => {
          const key = r.name.replace("radius-", "");
          return (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className="size-20 border-2 border-primary bg-primary-50"
                style={{ borderRadius: `var(--${r.name})` }}
              />
              <span className="font-mono text-xs text-muted-foreground">
                rounded-{key} · {r.value}
              </span>
            </div>
          );
        })}
    </div>
  );
}

export function ShadowsDemo() {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-md bg-body p-4 sm:grid-cols-4">
      {tokens.shadows.map((s) => (
        <div
          key={s.name}
          className="flex h-24 items-center justify-center rounded-md bg-card text-sm font-medium text-foreground"
          style={{ boxShadow: `var(--${s.name})` }}
        >
          {s.name}
        </div>
      ))}
    </div>
  );
}

const COMMON = [
  Home01Icon,
  Search01Icon,
  User02Icon,
  Settings02Icon,
  Mail01Icon,
  Calendar03Icon,
  Download04Icon,
  Delete02Icon,
  Tick02Icon,
];

export function IconsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4 text-icon-default">
        {COMMON.map((icon, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static list
          <HugeiconsIcon key={i} icon={icon} size={24} strokeWidth={1.5} aria-hidden />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={20}
            className="text-icon-primary rtl:-scale-x-100"
            aria-hidden
          />
          <Bi ar="التالي (ينعكس)" en="Next (mirrors)" />
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            size={20}
            className="text-icon-primary rtl:-scale-x-100"
            aria-hidden
          />
          <Bi ar="متابعة (ينعكس)" en="Continue (mirrors)" />
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <HugeiconsIcon icon={Tick02Icon} size={20} className="text-icon-success" aria-hidden />
          <Bi ar="علامة الصح (لا تنعكس)" en="Checkmark (never mirrors)" />
        </div>
      </div>
      <div className="flex items-end gap-4 text-icon-neutral">
        {[16, 20, 24, 32].map((size) => (
          <div key={size} className="flex flex-col items-center gap-1">
            <HugeiconsIcon icon={Home01Icon} size={size} aria-hidden />
            <span className="font-mono text-xs text-muted-foreground">{size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
