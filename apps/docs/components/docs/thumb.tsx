import { CheckmarkCircle02Icon, Upload04Icon } from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";
import { Icon } from "@/components/shell/icon";
import type { Locale } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/bases/base/ui/accordion";
import { Avatar, AvatarGroup } from "@/registry/bases/base/ui/avatar";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Button } from "@/registry/bases/base/ui/button";
import { Checkbox } from "@/registry/bases/base/ui/checkbox";
import { ContentSwitcher, ContentSwitcherItem } from "@/registry/bases/base/ui/content-switcher";
import { Divider } from "@/registry/bases/base/ui/divider";
import { FeaturedIcon } from "@/registry/bases/base/ui/featured-icon";
import { InlineAlert } from "@/registry/bases/base/ui/inline-alert";
import { Input } from "@/registry/bases/base/ui/input";
import { Link } from "@/registry/bases/base/ui/link";
import { Notification } from "@/registry/bases/base/ui/notification";
import { NumberInput } from "@/registry/bases/base/ui/number-input";
import { Radio, RadioGroup } from "@/registry/bases/base/ui/radio";
import { SearchBox } from "@/registry/bases/base/ui/search-box";
import { Select, SelectTrigger, SelectValue } from "@/registry/bases/base/ui/select";
import { Skeleton } from "@/registry/bases/base/ui/skeleton";
import { Spinner } from "@/registry/bases/base/ui/spinner";
import { Switch } from "@/registry/bases/base/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/registry/bases/base/ui/tabs";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";
import { Textarea } from "@/registry/bases/base/ui/textarea";

/** `t(en, ar)` picks the text in the language of the page the thumbnail sits on. */
const thumbs = (t: (en: string, ar: string) => string): Record<string, ReactNode> => ({
  button: (
    <div className="flex flex-col gap-2">
      <Button>{t("Submit", "إرسال")}</Button>
      <Button variant="outline">{t("Cancel", "إلغاء")}</Button>
    </div>
  ),
  link: (
    <div className="flex flex-col items-start gap-2">
      <Link href="#">{t("Services", "الخدمات")}</Link>
      <Link href="#" variant="neutral" inline>
        {t("Policies", "السياسات")}
      </Link>
    </div>
  ),
  spinner: (
    <div className="flex items-center gap-3">
      <Spinner size="sm" label={null} />
      <Spinner size="xl" label={null} />
    </div>
  ),
  badge: (
    <div className="flex flex-col items-start gap-2">
      <Badge variant="success">{t("Approved", "مقبول")}</Badge>
      <Badge variant="warning" outlined>
        {t("Pending", "قيد الانتظار")}
      </Badge>
    </div>
  ),
  tag: (
    <div className="flex flex-col items-start gap-2">
      <Tag variant="info">{t("Riyadh", "الرياض")}</Tag>
      <StatusTag variant="success">{t("Completed", "مكتمل")}</StatusTag>
    </div>
  ),
  divider: (
    <div className="flex w-24 flex-col gap-2 text-xs text-text-default">
      <span>{t("Personal", "شخصي")}</span>
      <Divider />
      <span>{t("Business", "أعمال")}</span>
    </div>
  ),
  avatar: (
    <AvatarGroup>
      <Avatar size={40} initials={t("NQ", "ن ق")} />
      <Avatar size={40} initials={t("FA", "ف أ")} />
      <Avatar size={40} initials={t("+3", "٣+")} />
    </AvatarGroup>
  ),
  "featured-icon": (
    <div className="flex gap-2">
      <FeaturedIcon variant="success" size="md">
        <Icon icon={CheckmarkCircle02Icon} />
      </FeaturedIcon>
      <FeaturedIcon variant="info" appearance="outlined" circle size="md">
        <Icon icon={CheckmarkCircle02Icon} />
      </FeaturedIcon>
    </div>
  ),
  field: (
    <div className="flex w-32 flex-col gap-1.5">
      <span className="text-xs font-medium text-field-text-label">
        {t("Full name", "الاسم الكامل")} <span className="text-field-border-error">*</span>
      </span>
      <Input size="md" defaultValue={t("Noura", "نورة")} readOnly tabIndex={-1} />
      <span className="text-xs text-field-text-helper">{t("As on your ID", "كما في هويتك")}</span>
    </div>
  ),
  input: (
    <div className="flex w-32 flex-col gap-2">
      <Input size="md" placeholder={t("Placeholder", "نص مؤقت")} tabIndex={-1} />
      <Input size="md" appearance="darker" defaultValue={t("Filled", "معبأ")} tabIndex={-1} />
    </div>
  ),
  textarea: (
    <div className="w-32">
      <Textarea rows={3} defaultValue={t("Describe your request", "صف طلبك")} tabIndex={-1} />
    </div>
  ),
  select: (
    <div className="w-32">
      <Select defaultValue="renew">
        <SelectTrigger size="md" tabIndex={-1}>
          <SelectValue>{t("Renew", "تجديد")}</SelectValue>
        </SelectTrigger>
      </Select>
    </div>
  ),
  "number-input": (
    <div className="w-32">
      <NumberInput size="md" defaultValue={3} />
    </div>
  ),
  "search-box": (
    <div className="w-32">
      <SearchBox size="md" defaultValue={t("Permit", "رخصة")} />
    </div>
  ),
  checkbox: (
    <div className="flex flex-col gap-2 text-sm text-text-default">
      <span className="flex items-center gap-2">
        <Checkbox defaultChecked tabIndex={-1} /> {t("Agree", "أوافق")}
      </span>
      <span className="flex items-center gap-2">
        <Checkbox indeterminate tabIndex={-1} /> {t("Some", "بعض")}
      </span>
    </div>
  ),
  radio: (
    <RadioGroup defaultValue="a" className="gap-2 text-sm text-text-default">
      <span className="flex items-center gap-2">
        <Radio value="a" tabIndex={-1} /> {t("Email", "البريد")}
      </span>
      <span className="flex items-center gap-2">
        <Radio value="b" tabIndex={-1} /> {t("Phone", "الهاتف")}
      </span>
    </RadioGroup>
  ),
  switch: (
    <div className="flex flex-col gap-2 text-sm text-text-default">
      <span className="flex items-center gap-2">
        <Switch defaultChecked tabIndex={-1} /> {t("On", "مفعّل")}
      </span>
      <span className="flex items-center gap-2">
        <Switch tabIndex={-1} /> {t("Off", "معطّل")}
      </span>
    </div>
  ),
  "file-upload": (
    <div className="flex h-14 w-32 flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-field-border-default text-xs text-text-default">
      <Icon icon={Upload04Icon} />
      {t("Drop files", "أفلت الملفات")}
    </div>
  ),
  dialog: (
    <div className="flex w-32 flex-col gap-1.5 rounded-md bg-background-white p-2.5 text-xs shadow-3xl ring-1 ring-border-neutral-secondary">
      <span className="font-semibold text-text-display">
        {t("Cancel request?", "إلغاء الطلب؟")}
      </span>
      <span className="h-1.5 w-full rounded-full bg-background-neutral-200" />
      <span className="mt-1 flex justify-end gap-1">
        <span className="h-4 w-7 rounded-xs border border-border-neutral-primary" />
        <span className="h-4 w-7 rounded-xs bg-button-background-primary-default" />
      </span>
    </div>
  ),
  drawer: (
    <div className="flex h-20 w-32 overflow-hidden rounded-sm border border-border-neutral-primary">
      <span className="flex-1 bg-background-neutral-100" />
      <span className="flex w-14 flex-col gap-1.5 bg-background-menu p-2 shadow-lg">
        <span className="h-1.5 w-8 rounded-full bg-background-neutral-300" />
        <span className="h-1.5 w-full rounded-full bg-background-neutral-200" />
        <span className="h-1.5 w-10 rounded-full bg-background-neutral-200" />
      </span>
    </div>
  ),
  tooltip: (
    <div className="relative flex flex-col items-center gap-2">
      <span className="rounded-xs bg-tooltip-background-dark px-2 py-1 text-xs text-tooltip-text-heading-dark">
        {t("Tooltip", "تلميح")}
      </span>
      <Button size="sm" variant="outline" tabIndex={-1}>
        {t("Hover", "مرّر")}
      </Button>
    </div>
  ),
  menu: (
    <div className="flex w-28 flex-col gap-0.5 rounded-md border border-border-neutral-primary bg-background-menu p-1 text-xs text-text-default shadow-lg">
      <span className="rounded-sm bg-button-background-neutral-hovered px-2 py-1">
        {t("Edit", "تعديل")}
      </span>
      <span className="px-2 py-1">{t("Duplicate", "نسخ")}</span>
      <span className="px-2 py-1 text-text-default-disabled">{t("Share", "مشاركة")}</span>
    </div>
  ),
  tabs: (
    <Tabs defaultValue="a" className="w-32">
      <TabsList size="sm" scrollable={false} aria-hidden>
        <TabsTrigger value="a" tabIndex={-1}>
          {t("Details", "التفاصيل")}
        </TabsTrigger>
        <TabsTrigger value="b" tabIndex={-1}>
          {t("History", "السجل")}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
  accordion: (
    <Accordion size="sm" className="w-32" defaultValue={["a"]}>
      <AccordionItem value="a">
        <AccordionTrigger tabIndex={-1}>
          {t("Who can apply?", "من يستطيع التقديم؟")}
        </AccordionTrigger>
        <AccordionContent>{t("Residents.", "المقيمون.")}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger tabIndex={-1}>{t("Fees", "الرسوم")}</AccordionTrigger>
        <AccordionContent>{t("None.", "لا شيء.")}</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  "content-switcher": (
    <ContentSwitcher size="sm" defaultValue="b" aria-hidden>
      <ContentSwitcherItem value="a" tabIndex={-1}>
        {t("Day", "يوم")}
      </ContentSwitcherItem>
      <ContentSwitcherItem value="b" tabIndex={-1}>
        {t("Week", "أسبوع")}
      </ContentSwitcherItem>
    </ContentSwitcher>
  ),
  toast: (
    <div className="flex w-32 items-center gap-2 overflow-hidden rounded-md bg-background-notification-white py-2 pe-2 ps-4 text-xs text-text-display shadow-3xl ring-1 ring-border-neutral-secondary">
      <span className="absolute h-8 w-1.5 -translate-x-3.5 rounded-full bg-green-400" />
      <Icon icon={CheckmarkCircle02Icon} className="text-icon-success" />
      {t("Submitted", "تم الإرسال")}
    </div>
  ),
  notification: (
    <div className="w-36">
      <Notification
        variant="info"
        title={t("New:", "جديد:")}
        hideIcon
        className="px-2 py-1 text-xs"
      >
        {t("Track online", "تتبّع إلكترونيًا")}
      </Notification>
    </div>
  ),
  "inline-alert": (
    <div className="w-36">
      <InlineAlert
        variant="warning"
        tinted
        title={t("ID expires", "تنتهي الهوية")}
        hideIcon
        className="py-2 ps-5 text-xs"
      />
    </div>
  ),
  skeleton: (
    <div className="flex w-28 items-center gap-2">
      <Skeleton shape="circle" size={24} />
      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton shape="line" size="sm" />
        <Skeleton shape="line" size="sm" className="w-2/3" />
      </div>
    </div>
  ),
});

/** The small preview next to the title of a component page. Inert: the real preview is below. */
export function Thumb({ slug, lang }: { slug: string; lang: Locale }) {
  const content = thumbs((en, ar) => (lang === "ar" ? ar : en))[slug];
  if (!content) return null;
  return (
    <div
      inert
      aria-hidden
      className="hidden h-24 w-40 shrink-0 items-center justify-center rounded-md border border-border-neutral-secondary bg-background-white sm:flex"
    >
      {content}
    </div>
  );
}
