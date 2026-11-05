"use client";

import {
  CheckmarkCircle02Icon,
  Moon02Icon,
  Sun03Icon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";
import { Icon } from "@/components/shell/icon";
import { Button } from "@/registry/bases/base/ui/button";
import { FeaturedIcon } from "@/registry/bases/base/ui/featured-icon";
import { Link } from "@/registry/bases/base/ui/link";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";

type Dir = "ltr" | "rtl";
type Mode = "light" | "dark";

const COPY = {
  ltr: {
    lang: "en",
    title: "Renew national address",
    intro: "Update the address linked to your National ID.",
    building: "Building number",
    buildingValue: "7421",
    postal: "Postal code",
    postalValue: "12643",
    district: "District",
    districtValue: "Al Olaya, Riyadh",
    tags: ["Residential", "Riyadh"],
    status: "Address verified",
    submit: "Submit request",
    draft: "Save draft",
    reference: "Reference RNA-24810",
    notice: "Request received",
    noticeBody: "We will message you within 2 working days.",
    track: "Track request",
  },
  rtl: {
    lang: "ar",
    title: "تجديد العنوان الوطني",
    intro: "حدّث العنوان المرتبط برقم هويتك الوطنية.",
    building: "رقم المبنى",
    buildingValue: "٧٤٢١",
    postal: "الرمز البريدي",
    postalValue: "١٢٦٤٣",
    district: "الحي",
    districtValue: "العليا، الرياض",
    tags: ["سكني", "الرياض"],
    status: "تم التحقق من العنوان",
    submit: "إرسال الطلب",
    draft: "حفظ المسودة",
    reference: "رقم المرجع ٢٤٨١٠",
    notice: "تم استلام طلبك",
    noticeBody: "سنراسلك خلال يومي عمل.",
    track: "تتبع الطلب",
  },
} as const;

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-field-text-label">
        {label}
      </label>
      <input
        id={id}
        defaultValue={value}
        className="h-10 rounded-sm border border-field-border-default bg-field-background-default px-3 text-md text-field-text-filled outline-none transition-colors duration-150 hover:border-field-border-hovered focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-border-black"
      />
    </div>
  );
}

/** One group of toggle buttons: a real radio-like set, with aria-pressed. */
function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string; icon: IconSvgElement }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="inline-flex rounded-sm bg-background-neutral-100 p-0.5">
      <legend className="sr-only">{label}</legend>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "inline-flex min-h-8 items-center gap-1.5 rounded-xs px-2.5 text-[0.8125rem] font-medium",
            o.value === value
              ? "bg-background-card text-text-default shadow-xs"
              : "text-text-primary-paragraph hover:text-text-default",
          )}
        >
          <Icon icon={o.icon} />
          {o.label}
        </button>
      ))}
    </fieldset>
  );
}

/**
 * A government service form in English or Arabic, light or dark, switched in place. The panel
 * carries its own `dir` and `data-theme`, so only the card changes, not the page around it.
 * The notification under it always uses the other direction, so both scripts are on screen.
 */
export function HeroCard() {
  const { resolvedTheme } = useTheme();
  const [dir, setDir] = useState<Dir>("ltr");
  const [chosen, setChosen] = useState<Mode | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const mode: Mode = chosen ?? (mounted && resolvedTheme === "dark" ? "dark" : "light");
  const other: Dir = dir === "ltr" ? "rtl" : "ltr";
  const t = COPY[dir];
  const n = COPY[other];

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Toggle
          label="Direction"
          value={dir}
          onChange={setDir}
          options={[
            { value: "ltr", label: "English", icon: TextAlignLeftIcon },
            { value: "rtl", label: "العربية", icon: TextAlignRightIcon },
          ]}
        />
        <Toggle
          label="Theme"
          value={mode}
          onChange={setChosen}
          options={[
            { value: "light", label: "Light", icon: Sun03Icon },
            { value: "dark", label: "Dark", icon: Moon02Icon },
          ]}
        />
      </div>

      <div
        data-theme={mode}
        dir={dir}
        lang={t.lang}
        className={cn(
          mode === "dark" && "dark",
          "flex flex-col gap-6 rounded-lg border border-border-neutral-secondary bg-background-card p-6 text-text-default",
          mode === "light" && "shadow-md",
        )}
      >
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="t-h3 text-text-display">{t.title}</h2>
            <p className="text-sm text-text-primary-paragraph">{t.intro}</p>
          </div>
          <StatusTag variant="success" size="sm">
            {t.status}
          </StatusTag>
        </header>

        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
          key={dir}
        >
          <Field label={t.building} value={t.buildingValue} />
          <Field label={t.postal} value={t.postalValue} />
          <Field label={t.district} value={t.districtValue} className="sm:col-span-2" />
          <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
            {t.tags.map((tag, i) => (
              <Tag key={tag} variant="neutral" outlined={i === 1} size="sm">
                {tag}
              </Tag>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-neutral-secondary pt-4 sm:col-span-2">
            <span className="text-[0.8125rem] text-text-secondary-paragraph">{t.reference}</span>
            <div className="flex gap-2">
              <Button variant="outline" type="button">
                {t.draft}
              </Button>
              <Button type="submit">{t.submit}</Button>
            </div>
          </div>
        </form>
      </div>

      <div
        data-theme={mode}
        dir={other}
        lang={n.lang}
        className={cn(
          mode === "dark" && "dark",
          "flex items-start gap-3 rounded-md border border-border-neutral-secondary bg-background-card p-4 text-text-default",
        )}
      >
        <FeaturedIcon variant="success" size="md">
          <Icon icon={CheckmarkCircle02Icon} />
        </FeaturedIcon>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-md font-semibold text-text-display">{n.notice}</p>
          <p className="text-sm text-text-primary-paragraph">{n.noticeBody}</p>
        </div>
        <Link href="/docs/components/featured-icon" size="sm" className="shrink-0 self-center">
          {n.track}
        </Link>
      </div>
      <p className="text-[0.8125rem] text-text-secondary-paragraph">
        Live components: switch language and theme above. The fields are plain markup until the form
        components ship.
      </p>
    </div>
  );
}
