import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  Download04Icon,
  InformationCircleIcon,
  PaintBoardIcon,
  TextAlignRightIcon,
  UniversalAccessIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import NextLink from "next/link";
import { InstallCommand } from "@/components/shell/install-command";
import { siteUrl } from "@/lib/shared";
import { Avatar, AvatarGroup } from "@/registry/bases/base/ui/avatar";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Button } from "@/registry/bases/base/ui/button";
import { FeaturedIcon } from "@/registry/bases/base/ui/featured-icon";
import { Link } from "@/registry/bases/base/ui/link";
import { Skeleton } from "@/registry/bases/base/ui/skeleton";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";

const FEATURES = [
  {
    icon: TextAlignRightIcon,
    title: "Arabic first",
    body: "Logical properties only, so every component works in RTL and LTR without changes.",
  },
  {
    icon: PaintBoardIcon,
    title: "Every DGA token",
    body: "Colours, type, spacing and radius from the DGA Figma file, in light and dark mode.",
  },
  {
    icon: UniversalAccessIcon,
    title: "WCAG 2.1 AA",
    body: "Every state of every component is contrast-checked. The build fails on a regression.",
  },
];

export default function HomePage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <section className="border-b border-border-neutral-secondary bg-background-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center md:py-24">
          <Badge variant="success" rounded size="lg">
            منصات الكود الموحد · Platforms Code
          </Badge>
          <h1 className="text-display-md font-bold text-text-display md:text-display-xl">
            The DGA design system for shadcn
          </h1>
          <p className="max-w-2xl text-lg text-text-primary-paragraph">
            Tokens, themes and components that follow the Saudi DGA unified design system. Built on
            Base UI and Tailwind CSS v4, Arabic-first, and WCAG AA in light and dark mode.
          </p>
          <div className="flex w-full max-w-2xl flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" nativeButton={false} render={<NextLink href="/docs/installation" />}>
              Get started
              <HugeiconsIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                className="rtl:-scale-x-100"
              />
            </Button>
            <div className="min-w-0 sm:w-110">
              <InstallCommand command={`npx shadcn@latest init ${siteUrl}/r/dga.json`} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="showcase" className="mx-auto w-full max-w-5xl px-4 py-12">
        <h2 id="showcase" className="sr-only">
          Components
        </h2>
        <div dir="rtl" lang="ar" className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-md border border-border-neutral-secondary bg-background-card p-6">
            <div className="flex items-start gap-4">
              <FeaturedIcon variant="success" size="lg">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} />
              </FeaturedIcon>
              <div className="flex flex-col gap-1">
                <p className="text-md font-semibold text-text-default">تم استلام طلبك</p>
                <p className="text-sm text-text-primary-paragraph">
                  رقم الطلب ٢٤٨١٠ · قيد المراجعة
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusTag variant="info">قيد المراجعة</StatusTag>
              <Tag variant="neutral">خدمات الأفراد</Tag>
              <Badge variant="purple" rounded>
                جديد
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>
                <HugeiconsIcon icon={Download04Icon} data-icon="inline-start" />
                تنزيل الإيصال
              </Button>
              <Button variant="outline">تفاصيل الطلب</Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-md bg-background-primary p-6">
            <div className="flex items-center justify-between">
              <AvatarGroup>
                <Avatar size={32} src="/avatar-sample.svg" alt="" />
                <Avatar size={32} initials="ن ق" />
                <Avatar size={32} initials="+٤" aria-label="٤ آخرون" />
              </AvatarGroup>
              <Badge variant="on-color" rounded>
                فريق العمل
              </Badge>
            </div>
            <p className="text-lg font-semibold text-text-oncolor-primary">
              انضم إلى منصة الخدمات الرقمية الموحدة
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" onColor>
                سجل الآن
              </Button>
              <Link variant="on-color" href="/docs">
                اعرف المزيد
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-md border border-border-neutral-secondary bg-background-card p-6 md:col-span-2">
            <Skeleton shape="circle" size={48} />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton shape="line" size="lg" className="w-2/3" />
              <Skeleton shape="line" size="sm" />
            </div>
            <FeaturedIcon variant="info" appearance="outlined" circle size="md">
              <HugeiconsIcon icon={InformationCircleIcon} />
            </FeaturedIcon>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-4 pb-16 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col gap-3">
            <FeaturedIcon size="md">
              <HugeiconsIcon icon={f.icon} />
            </FeaturedIcon>
            <h3 className="text-md font-semibold text-text-default">{f.title}</h3>
            <p className="text-sm text-text-primary-paragraph">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
