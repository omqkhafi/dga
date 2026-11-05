"use client";

import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Mail01Icon,
  StarIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Avatar, AvatarGroup } from "@/registry/bases/base/ui/avatar";
import { Divider } from "@/registry/bases/base/ui/divider";
import { FeaturedIcon, type FeaturedIconProps } from "@/registry/bases/base/ui/featured-icon";
import { Skeleton } from "@/registry/bases/base/ui/skeleton";
import { Bi, useBi, useLanguage } from "./bi";
import { OnColorSurface, Row, Stack } from "./kit";

export function DividerDemo() {
  return (
    <Stack>
      <div className="flex flex-col gap-3 text-sm text-text-primary-paragraph">
        <Bi en="Section one" ar="القسم الأول" />
        <Divider />
        <Bi en="Section two" ar="القسم الثاني" />
        <Divider variant="primary" />
        <Bi en="Section three" ar="القسم الثالث" />
      </div>
      <div className="flex h-6 items-center gap-3 text-sm text-text-primary-paragraph">
        <Bi en="Services" ar="الخدمات" />
        <Divider orientation="vertical" />
        <Bi en="News" ar="الأخبار" />
        <Divider orientation="vertical" />
        <Bi en="Contact" ar="تواصل معنا" />
      </div>
      <OnColorSurface>
        <div className="flex w-full flex-col gap-3 text-sm text-text-oncolor-primary">
          <Bi en="On colour: alpha-white" ar="على لون: أبيض شفاف" />
          <Divider variant="alpha-white" />
          <Bi en="On colour: white" ar="على لون: أبيض" />
          <Divider variant="white" />
        </div>
      </OnColorSurface>
    </Stack>
  );
}

const SIZES = [24, 32, 40, 48, 64, 80, 120] as const;

export function AvatarDemo() {
  const t = useBi();
  const rtl = useLanguage() === "ar";
  return (
    <Stack>
      <Row label={<Bi en="Image" ar="صورة" />}>
        {SIZES.map((size) => (
          <Avatar
            key={size}
            size={size}
            src="/avatar-sample.svg"
            alt={t("Noura Al-Qahtani", "نورة القحطاني")}
          />
        ))}
      </Row>
      <Row label={<Bi en="Initials" ar="أحرف" />}>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} initials={rtl ? "ن ق" : "NQ"} />
        ))}
      </Row>
      <Row
        label={
          <Bi en="Icon, square, broken image falls back" ar="أيقونة، مربع، وبديل عند تعذر الصورة" />
        }
      >
        {SIZES.map((size) => (
          <Avatar key={size} size={size} square src="/missing.png" alt="" />
        ))}
      </Row>
      <Row label={<Bi en="Avatar group: stacked and spaced" ar="مجموعة صور: متراكبة ومتباعدة" />}>
        <AvatarGroup>
          <Avatar size={32} src="/avatar-sample.svg" alt={t("Noura", "نورة")} />
          <Avatar size={32} initials={t("AK", "أ ك")} />
          <Avatar size={32} initials="SM" />
          <Avatar size={32} initials="+3" aria-label={t("3 more", "3 أخرى")} />
        </AvatarGroup>
        <AvatarGroup stacked={false}>
          <Avatar size={32} src="/avatar-sample.svg" alt={t("Noura", "نورة")} />
          <Avatar size={32} initials={t("AK", "أ ك")} />
          <Avatar size={32}>
            <HugeiconsIcon icon={UserIcon} className="size-6 text-icon-default" aria-hidden />
          </Avatar>
        </AvatarGroup>
      </Row>
    </Stack>
  );
}

type FIVariant = NonNullable<FeaturedIconProps["variant"]>;
const FI: [FIVariant, typeof StarIcon][] = [
  ["brand", StarIcon],
  ["neutral", Mail01Icon],
  ["success", CheckmarkCircle02Icon],
  ["error", Alert02Icon],
  ["warning", Alert02Icon],
  ["info", InformationCircleIcon],
];

export function FeaturedIconDemo() {
  return (
    <Stack>
      {(["light", "hard", "outlined"] as const).map((appearance) => (
        <Row key={appearance} label={`appearance="${appearance}"`}>
          {FI.map(([variant, icon]) => (
            <FeaturedIcon key={variant} variant={variant} appearance={appearance}>
              <HugeiconsIcon icon={icon} />
            </FeaturedIcon>
          ))}
        </Row>
      ))}
      <Row label={<Bi en="Sizes sm, md, lg, xl; circle" ar="الأحجام sm وmd وlg وxl؛ دائرة" />}>
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <FeaturedIcon key={size} size={size}>
            <HugeiconsIcon icon={StarIcon} />
          </FeaturedIcon>
        ))}
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <FeaturedIcon key={size} size={size} circle variant="info">
            <HugeiconsIcon icon={InformationCircleIcon} />
          </FeaturedIcon>
        ))}
      </Row>
    </Stack>
  );
}

export function SkeletonDemo() {
  return (
    <Stack>
      <Row label={<Bi en="Rectangle sm, md, lg; line sm, lg" ar="مستطيل sm وmd وlg؛ سطر sm وlg" />}>
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Skeleton size="sm" className="w-24" />
          <Skeleton size="md" className="w-32" />
          <Skeleton size="lg" />
          <Skeleton shape="line" size="sm" />
          <Skeleton shape="line" size="lg" className="w-3/4" />
        </div>
      </Row>
      <Row label={<Bi en="Square and circle 24 to 120" ar="مربع ودائرة من 24 إلى 120" />}>
        {([24, 48, 64, 80, 120] as const).map((size) => (
          <Skeleton key={size} shape="square" size={size} />
        ))}
        {([24, 48, 64, 80, 120] as const).map((size) => (
          <Skeleton key={size} shape="circle" size={size} />
        ))}
      </Row>
    </Stack>
  );
}

/** The five Figma composite layouts, built from the primitive. */
export function SkeletonLayouts() {
  return (
    <div aria-busy="true" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex items-center gap-3">
        <Skeleton shape="square" size={48} />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton shape="line" size="lg" />
          <Skeleton shape="line" size="sm" className="w-2/3" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton shape="circle" size={24} />
            <Skeleton shape="line" size="sm" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        <Skeleton shape="square" className="aspect-video size-auto w-full rounded-md" />
        <div className="flex flex-col gap-2">
          <Skeleton shape="line" size="lg" />
          <Skeleton shape="line" size="sm" />
          <Skeleton shape="line" size="sm" className="w-1/2" />
        </div>
        <Skeleton size="lg" className="w-32" />
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid h-32 grid-cols-5 items-end gap-2">
          {["h-1/3", "h-2/3", "h-1/2", "h-full", "h-3/4"].map((h) => (
            <Skeleton key={h} shape="square" className={`size-auto w-full rounded-xs ${h}`} />
          ))}
        </div>
        <Skeleton shape="line" size="lg" />
        <Skeleton shape="line" size="sm" className="w-2/3" />
      </div>
      <div className="flex flex-col items-center gap-6">
        <Skeleton shape="circle" size={80} />
        <div className="flex w-full flex-col items-center gap-2">
          <Skeleton shape="line" size="lg" className="w-1/2" />
          <Skeleton shape="line" size="sm" />
        </div>
        <Skeleton size="lg" className="w-32" />
      </div>
    </div>
  );
}
