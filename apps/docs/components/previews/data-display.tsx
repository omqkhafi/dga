"use client";

import { Edit02Icon, File01Icon, Home01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Avatar } from "@/registry/bases/base/ui/avatar";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Button } from "@/registry/bases/base/ui/button";
import {
  Card,
  CardActions,
  CardContent,
  CardDescription,
  CardExpandable,
  CardExpandablePanel,
  CardExpandableTrigger,
  CardHeader,
  CardIcon,
  CardLink,
  CardMedia,
  CardTitle,
  SelectableCard,
} from "@/registry/bases/base/ui/card";
import { Checkbox } from "@/registry/bases/base/ui/checkbox";
import { DataTable } from "@/registry/bases/base/ui/data-table";
import { FeaturedIcon } from "@/registry/bases/base/ui/featured-icon";
import { Link } from "@/registry/bases/base/ui/link";
import {
  List,
  ListItem,
  StructuredList,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListHeader,
  StructuredListRow,
} from "@/registry/bases/base/ui/list";
import { Progress, ProgressCircle } from "@/registry/bases/base/ui/progress";
import { Rating } from "@/registry/bases/base/ui/rating";
import { SearchBox } from "@/registry/bases/base/ui/search-box";
import { Switch } from "@/registry/bases/base/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFilterButton,
  TableHead,
  TableHeader,
  TableRow,
  TableSortButton,
} from "@/registry/bases/base/ui/table";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";
import { Bi, useBi, useLanguage } from "./bi";
import { OnColorSurface, Row, Stack } from "./kit";
import { useNumber } from "./navigation";

// ------------------------------------------------------------------------------- Card

export function CardEffects() {
  const t = useBi();
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {(["shadow", "stroke", "none"] as const).map((effect) => (
        <Card key={effect} effect={effect}>
          <CardIcon>
            <FeaturedIcon variant="success" aria-hidden>
              <HugeiconsIcon icon={File01Icon} />
            </FeaturedIcon>
          </CardIcon>
          <CardHeader>
            <CardTitle>{t("Service request", "طلب خدمة")}</CardTitle>
            <CardDescription>
              {t("Track the status of your application.", "تابع حالة طلبك.")}
            </CardDescription>
          </CardHeader>
          <CardActions>
            <Button size="sm">{t("Open", "فتح")}</Button>
            <Button size="sm" variant="outline">
              {t("Details", "التفاصيل")}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export function CardMediaDemo() {
  const t = useBi();
  const number = useNumber();
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card className="max-w-sm">
        <CardMedia>
          <div
            role="img"
            aria-label={t("A building", "مبنى")}
            className="h-36 w-full bg-linear-to-br from-background-primary-200 to-background-primary-50"
          />
        </CardMedia>
        <CardHeader>
          <CardTitle>{t("Digital services centre", "مركز الخدمات الرقمية")}</CardTitle>
          <CardDescription>
            {t("Open every day from 8 am to 4 pm.", "مفتوح يوميًا من ٨ صباحًا إلى ٤ مساءً.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Row>
            <Tag variant="success">{t("Open", "مفتوح")}</Tag>
            <Tag>{t("Riyadh", "الرياض")}</Tag>
          </Row>
          <Rating
            readOnly
            value={4}
            size="sm"
            brand
            summaryLabel={(v, m) =>
              t(`Rated ${v} out of ${m}`, `التقييم ${number(v)} من ${number(m)}`)
            }
          />
        </CardContent>
        <CardActions>
          <Button size="sm">{t("Book a visit", "احجز زيارة")}</Button>
          <Button size="sm" variant="outline">
            {t("Directions", "الاتجاهات")}
          </Button>
        </CardActions>
      </Card>
      <Card size="sm" effect="stroke" className="max-w-sm">
        <CardHeader>
          <CardTitle level={4}>{t("Compact card", "بطاقة مضغوطة")}</CardTitle>
          <CardDescription>
            {t("Size sm uses the smaller padding and gap.", "المقاس الصغير بحشو وفجوة أصغر.")}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export function CardLinkDemo() {
  const t = useBi();
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card className="max-w-sm">
        <CardIcon>
          <FeaturedIcon variant="brand" aria-hidden>
            <HugeiconsIcon icon={Home01Icon} />
          </FeaturedIcon>
        </CardIcon>
        <CardHeader>
          <CardTitle>
            <CardLink href="#housing">{t("Housing support", "الدعم السكني")}</CardLink>
          </CardTitle>
          <CardDescription>
            {t(
              "The whole card is one link, named by the title.",
              "البطاقة كلها رابط واحد يحمل اسم العنوان.",
            )}
          </CardDescription>
        </CardHeader>
        <CardActions>
          <Button size="sm" variant="outline" onClick={() => undefined}>
            {t("Save", "حفظ")}
          </Button>
        </CardActions>
      </Card>
      <Card className="max-w-sm" disabled>
        <CardHeader>
          <CardTitle>{t("Unavailable service", "خدمة غير متاحة")}</CardTitle>
          <CardDescription>{t("Disabled card.", "بطاقة معطّلة.")}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export function CardExpandableDemo() {
  const t = useBi();
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <CardExpandable className="max-w-sm">
        <CardHeader>
          <CardExpandableTrigger>
            {t("Required documents", "المستندات المطلوبة")}
          </CardExpandableTrigger>
          <CardDescription>
            {t("Three documents are needed.", "يلزم ثلاثة مستندات.")}
          </CardDescription>
        </CardHeader>
        <CardExpandablePanel>
          <List type="ordered" markers={useLanguage() === "ar" ? "arabic" : "latin"}>
            <ListItem>{t("National ID", "الهوية الوطنية")}</ListItem>
            <ListItem>{t("Proof of address", "إثبات العنوان")}</ListItem>
            <ListItem>{t("Recent photo", "صورة حديثة")}</ListItem>
          </List>
        </CardExpandablePanel>
      </CardExpandable>
      <CardExpandable className="max-w-sm" defaultOpen>
        <CardHeader>
          <CardExpandableTrigger>{t("Open at first", "مفتوحة في البداية")}</CardExpandableTrigger>
        </CardHeader>
        <CardExpandablePanel>
          <p className="m-0 text-md">{t("Details are visible.", "التفاصيل ظاهرة.")}</p>
        </CardExpandablePanel>
      </CardExpandable>
    </div>
  );
}

export function CardSelectableDemo() {
  const t = useBi();
  const [chosen, setChosen] = useState<string[]>(["standard"]);
  const options = [
    {
      id: "standard",
      title: t("Standard delivery", "التوصيل العادي"),
      text: t("Within 5 days.", "خلال ٥ أيام."),
    },
    {
      id: "express",
      title: t("Express delivery", "التوصيل السريع"),
      text: t("Within 24 hours.", "خلال ٢٤ ساعة."),
    },
    {
      id: "pickup",
      title: t("Pick up", "الاستلام"),
      text: t("From the service centre.", "من مركز الخدمة."),
      disabled: true,
    },
  ];
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {options.map((option) => (
        <SelectableCard
          key={option.id}
          checked={chosen.includes(option.id)}
          disabled={option.disabled}
          onCheckedChange={(on) =>
            setChosen((current) =>
              on ? [...current, option.id] : current.filter((id) => id !== option.id),
            )
          }
        >
          <CardHeader>
            <CardTitle level={4}>{option.title}</CardTitle>
            <CardDescription>{option.text}</CardDescription>
          </CardHeader>
        </SelectableCard>
      ))}
    </div>
  );
}

// ------------------------------------------------------------------------------- List

export function ListBasic() {
  const t = useBi();
  const markers = useLanguage() === "ar" ? "arabic" : "latin";
  const items = [
    t("Create an account", "أنشئ حسابًا"),
    t("Verify your ID", "وثّق هويتك"),
    t("Submit the form", "أرسل النموذج"),
  ];
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {(["primary", "neutral"] as const).map((tone) => (
        <Stack key={tone}>
          <List tone={tone} aria-label={t("Steps", "الخطوات")}>
            {items.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
          <List tone={tone} type="ordered" markers={markers} aria-label={t("Steps", "الخطوات")}>
            {items.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
          <List tone={tone} type="icon" aria-label={t("Steps", "الخطوات")}>
            {items.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        </Stack>
      ))}
      <OnColorSurface>
        <div className="flex flex-col gap-4">
          <List tone="onColor" aria-label={t("Steps", "الخطوات")}>
            {items.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
          <List tone="onColor" type="ordered" markers={markers} aria-label={t("Steps", "الخطوات")}>
            {items.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
          <List tone="onColor" type="icon" aria-label={t("Steps", "الخطوات")}>
            {items.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        </div>
      </OnColorSurface>
    </div>
  );
}

export function ListNested() {
  const t = useBi();
  const markers = useLanguage() === "ar" ? "arabic" : "latin";
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <List type="ordered" markers={markers} aria-label={t("Application", "التقديم")}>
        <ListItem>
          {t("Prepare your documents", "جهّز مستنداتك")}
          <List type="ordered">
            <ListItem>{t("National ID", "الهوية الوطنية")}</ListItem>
            <ListItem>{t("Proof of address", "إثبات العنوان")}</ListItem>
          </List>
        </ListItem>
        <ListItem>{t("Submit online", "قدّم إلكترونيًا")}</ListItem>
      </List>
      <List aria-label={t("Notes", "ملاحظات")}>
        <ListItem>
          {t("Fees are paid after approval", "تُدفع الرسوم بعد الموافقة")}
          <List>
            <ListItem>{t("Card or bank transfer", "بطاقة أو تحويل بنكي")}</ListItem>
          </List>
        </ListItem>
        <ListItem>{t("Processing takes five days", "تستغرق المعالجة خمسة أيام")}</ListItem>
      </List>
    </div>
  );
}

function useRequests() {
  const arabic = useLanguage() === "ar";
  return arabic
    ? [
        { id: "طلب-١٠٠١", service: "تجديد رخصة تجارية", status: "approved", date: "١٢ مارس ٢٠٢٦" },
        { id: "طلب-١٠٠٢", service: "تسجيل علامة تجارية", status: "pending", date: "١٥ مارس ٢٠٢٦" },
        { id: "طلب-١٠٠٣", service: "شهادة سجل تجاري", status: "rejected", date: "١٦ مارس ٢٠٢٦" },
        {
          id: "طلب-١٠٠٤",
          service: "تعديل بيانات المنشأة",
          status: "approved",
          date: "٢٠ مارس ٢٠٢٦",
        },
        { id: "طلب-١٠٠٥", service: "إصدار تصريح", status: "pending", date: "٢٢ مارس ٢٠٢٦" },
        { id: "طلب-١٠٠٦", service: "نقل ملكية", status: "approved", date: "٢٥ مارس ٢٠٢٦" },
        { id: "طلب-١٠٠٧", service: "طلب شهادة", status: "pending", date: "٢٨ مارس ٢٠٢٦" },
        { id: "طلب-١٠٠٨", service: "إلغاء رخصة", status: "rejected", date: "٣٠ مارس ٢٠٢٦" },
        { id: "طلب-١٠٠٩", service: "تحديث العنوان", status: "approved", date: "١ أبريل ٢٠٢٦" },
        { id: "طلب-١٠١٠", service: "إضافة فرع", status: "pending", date: "٣ أبريل ٢٠٢٦" },
        { id: "طلب-١٠١١", service: "تجديد سجل", status: "approved", date: "٦ أبريل ٢٠٢٦" },
        { id: "طلب-١٠١٢", service: "استعلام عن رخصة", status: "approved", date: "٨ أبريل ٢٠٢٦" },
      ]
    : [
        {
          id: "REQ-1001",
          service: "Renew commercial licence",
          status: "approved",
          date: "12 Mar 2026",
        },
        { id: "REQ-1002", service: "Register a trademark", status: "pending", date: "15 Mar 2026" },
        {
          id: "REQ-1003",
          service: "Commercial register certificate",
          status: "rejected",
          date: "16 Mar 2026",
        },
        {
          id: "REQ-1004",
          service: "Update business details",
          status: "approved",
          date: "20 Mar 2026",
        },
        { id: "REQ-1005", service: "Issue a permit", status: "pending", date: "22 Mar 2026" },
        { id: "REQ-1006", service: "Transfer ownership", status: "approved", date: "25 Mar 2026" },
        {
          id: "REQ-1007",
          service: "Request a certificate",
          status: "pending",
          date: "28 Mar 2026",
        },
        { id: "REQ-1008", service: "Cancel a licence", status: "rejected", date: "30 Mar 2026" },
        { id: "REQ-1009", service: "Update the address", status: "approved", date: "1 Apr 2026" },
        { id: "REQ-1010", service: "Add a branch", status: "pending", date: "3 Apr 2026" },
        { id: "REQ-1011", service: "Renew a register", status: "approved", date: "6 Apr 2026" },
        { id: "REQ-1012", service: "Look up a licence", status: "approved", date: "8 Apr 2026" },
      ];
}

function useStatusName() {
  const t = useBi();
  return {
    approved: t("Approved", "مقبول"),
    pending: t("Pending", "قيد المراجعة"),
    rejected: t("Rejected", "مرفوض"),
  } as Record<string, string>;
}

const STATUS_VARIANT = { approved: "success", pending: "warning", rejected: "error" } as const;

export function StructuredListDemo() {
  const t = useBi();
  const rows = useRequests().slice(0, 4);
  return (
    <Stack>
      <StructuredList aria-label={t("Requests", "الطلبات")} rowDivider>
        <StructuredListHeader>
          <tr>
            <StructuredListHead>{t("Request", "الطلب")}</StructuredListHead>
            <StructuredListHead>{t("Service", "الخدمة")}</StructuredListHead>
            <StructuredListHead>{t("Date", "التاريخ")}</StructuredListHead>
          </tr>
        </StructuredListHeader>
        <StructuredListBody>
          {rows.map((row) => (
            <StructuredListRow key={row.id}>
              <StructuredListCell>{row.id}</StructuredListCell>
              <StructuredListCell>{row.service}</StructuredListCell>
              <StructuredListCell>{row.date}</StructuredListCell>
            </StructuredListRow>
          ))}
        </StructuredListBody>
      </StructuredList>
      <StructuredList
        compact
        contained
        columnDivider
        aria-label={t("Requests, compact", "الطلبات، مضغوطة")}
      >
        <StructuredListBody>
          {rows.slice(0, 2).map((row) => (
            <StructuredListRow key={row.id}>
              <StructuredListCell>{row.id}</StructuredListCell>
              <StructuredListCell>{row.service}</StructuredListCell>
            </StructuredListRow>
          ))}
        </StructuredListBody>
      </StructuredList>
    </Stack>
  );
}

export function StructuredListSelectable() {
  const t = useBi();
  const rows = useRequests().slice(0, 3);
  const [value, setValue] = useState(rows[0]?.id ?? "");
  return (
    <StructuredList
      selectable
      groupLabel={t("Choose a request", "اختر طلبًا")}
      value={value}
      onValueChange={setValue}
      contained
    >
      <StructuredListHeader>
        <tr>
          <StructuredListHead>
            <span className="sr-only">{t("Choose", "اختيار")}</span>
          </StructuredListHead>
          <StructuredListHead>{t("Request", "الطلب")}</StructuredListHead>
          <StructuredListHead>{t("Service", "الخدمة")}</StructuredListHead>
        </tr>
      </StructuredListHeader>
      <StructuredListBody>
        {rows.map((row, index) => (
          <StructuredListRow key={row.id} value={row.id} label={row.id} disabled={index === 2}>
            <StructuredListCell>{row.id}</StructuredListCell>
            <StructuredListCell>{row.service}</StructuredListCell>
          </StructuredListRow>
        ))}
      </StructuredListBody>
    </StructuredList>
  );
}

// ------------------------------------------------------------------------------- Table

export function TableBasic() {
  const t = useBi();
  const status = useStatusName();
  const rows = useRequests().slice(0, 5);
  return (
    <Table aria-label={t("Requests", "الطلبات")}>
      <TableHeader>
        <TableRow>
          <TableHead>{t("Request", "الطلب")}</TableHead>
          <TableHead>{t("Service", "الخدمة")}</TableHead>
          <TableHead>{t("Status", "الحالة")}</TableHead>
          <TableHead>{t("Date", "التاريخ")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.service}</TableCell>
            <TableCell>
              <StatusTag variant={STATUS_VARIANT[row.status as keyof typeof STATUS_VARIANT]}>
                {status[row.status]}
              </StatusTag>
            </TableCell>
            <TableCell>{row.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableVariants() {
  const t = useBi();
  const rows = useRequests().slice(0, 4);
  const variants: { label: string; props: Record<string, boolean> }[] = [
    { label: t("Striped", "صفوف متبادلة"), props: { striped: true } },
    {
      label: t("Compact and contained", "مضغوط ومحاط بحدّ"),
      props: { compact: true, contained: true },
    },
    { label: t("Column dividers", "فواصل أعمدة"), props: { columnDivider: true } },
    { label: t("No row dividers", "بلا فواصل صفوف"), props: { rowDivider: false } },
  ];
  return (
    <Stack className="gap-8">
      {variants.map(({ label, props }) => (
        <Table key={label} aria-label={label} {...props}>
          <TableCaption>{label}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Request", "الطلب")}</TableHead>
              <TableHead>{t("Service", "الخدمة")}</TableHead>
              <TableHead>{t("Date", "التاريخ")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} selected={index === 1 && Boolean(props.contained)}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}
    </Stack>
  );
}

export function TableCells() {
  const t = useBi();
  const status = useStatusName();
  const rows = useRequests().slice(0, 3);
  const arabic = useLanguage() === "ar";
  return (
    <Table
      aria-label={t("Cell types", "أنواع الخلايا")}
      scrollLabel={t("Table, scrolls sideways", "جدول، يتمرّر أفقيًا")}
    >
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox aria-label={t("Select all", "تحديد الكل")} />
          </TableHead>
          <TableHead>{t("Person", "الشخص")}</TableHead>
          <TableHead>{t("Request", "الطلب")}</TableHead>
          <TableHead>{t("Status", "الحالة")}</TableHead>
          <TableHead>{t("Type", "النوع")}</TableHead>
          <TableHead>{t("Notify", "الإشعار")}</TableHead>
          <TableHead>
            <span className="sr-only">{t("Actions", "الإجراءات")}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>
              <Checkbox aria-label={t(`Select ${row.id}`, `تحديد ${row.id}`)} />
            </TableCell>
            <TableCell>
              <span className="flex items-center gap-3">
                <Avatar size={32} initials={arabic ? "ن" : "N"} alt="" />
                {arabic ? "نورة القحطاني" : "Noura Al-Qahtani"}
              </span>
            </TableCell>
            <TableCell>
              <Link href="#request">{row.id}</Link>
            </TableCell>
            <TableCell>
              <StatusTag variant={STATUS_VARIANT[row.status as keyof typeof STATUS_VARIANT]}>
                {status[row.status]}
              </StatusTag>
            </TableCell>
            <TableCell>
              <Badge variant={index === 0 ? "success" : "neutral"}>
                {index === 0 ? t("Renewal", "تجديد") : t("New", "جديد")}
              </Badge>
            </TableCell>
            <TableCell>
              <Switch aria-label={t(`Notify for ${row.id}`, `إشعار لـ ${row.id}`)} />
            </TableCell>
            <TableCell>
              <span className="flex gap-1">
                <Button iconOnly variant="transparent" size="sm" aria-label={t("Edit", "تعديل")}>
                  <HugeiconsIcon icon={Edit02Icon} aria-hidden />
                </Button>
                <Button iconOnly variant="transparent" size="sm" aria-label={t("More", "المزيد")}>
                  <HugeiconsIcon icon={MoreHorizontalIcon} aria-hidden />
                </Button>
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableSortFilter() {
  const t = useBi();
  const [sort, setSort] = useState<false | "asc" | "desc">("asc");
  const [filtered, setFiltered] = useState(true);
  const rows = [...useRequests().slice(0, 5)].sort((a, b) =>
    sort === "desc" ? b.service.localeCompare(a.service) : a.service.localeCompare(b.service),
  );
  return (
    <Table aria-label={t("Sortable table", "جدول قابل للترتيب")}>
      <TableHeader>
        <TableRow>
          <TableHead
            aria-sort={sort === "asc" ? "ascending" : sort === "desc" ? "descending" : undefined}
          >
            <span className="flex items-center gap-2">
              {t("Service", "الخدمة")}
              <TableSortButton
                direction={sort}
                aria-label={t("Sort by service", "ترتيب حسب الخدمة")}
                onClick={() => setSort((s) => (s === "asc" ? "desc" : "asc"))}
              />
            </span>
          </TableHead>
          <TableHead>
            <span className="flex items-center gap-2">
              {t("Status", "الحالة")}
              <TableFilterButton
                active={filtered}
                aria-pressed={filtered}
                aria-label={t("Filter by status", "تصفية حسب الحالة")}
                onClick={() => setFiltered((f) => !f)}
              />
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.service}</TableCell>
            <TableCell>
              {filtered
                ? row.status === "approved"
                  ? t("Approved", "مقبول")
                  : row.status === "pending"
                    ? t("Pending", "قيد المراجعة")
                    : t("Rejected", "مرفوض")
                : "–"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ------------------------------------------------------------------------------- Data Table

type Request = ReturnType<typeof useRequests>[number];

function useColumns(): ColumnDef<Request>[] {
  const t = useBi();
  const status = useStatusName();
  return [
    { accessorKey: "id", header: t("Request", "الطلب"), enableSorting: true },
    { accessorKey: "service", header: t("Service", "الخدمة") },
    {
      accessorKey: "status",
      header: t("Status", "الحالة"),
      cell: ({ getValue }) => {
        const key = String(getValue());
        return (
          <StatusTag variant={STATUS_VARIANT[key as keyof typeof STATUS_VARIANT]}>
            {status[key]}
          </StatusTag>
        );
      },
    },
    { accessorKey: "date", header: t("Date", "التاريخ"), enableSorting: false },
  ];
}

function useDataTableLabels() {
  const t = useBi();
  const n = useNumber();
  return {
    region: t("Requests table, scrolls sideways", "جدول الطلبات، يتمرّر أفقيًا"),
    selectAll: t("Select all rows on this page", "تحديد كل صفوف هذه الصفحة"),
    selectRow: (row: number) => t(`Select row ${row}`, `تحديد الصف ${n(row)}`),
    sortBy: (column: string) => t(`Sort by ${column}`, `ترتيب حسب ${column}`),
    empty: t("No requests match your search", "لا توجد طلبات تطابق بحثك"),
    loading: t("Loading requests", "جارٍ تحميل الطلبات"),
    range: (from: number, to: number, total: number) =>
      t(`${from} to ${to} of ${total}`, `${n(from)} إلى ${n(to)} من ${n(total)}`),
    selected: (count: number) => t(`${count} selected`, `${n(count)} محدد`),
    pagination: {
      label: t("Requests pages", "صفحات الطلبات"),
      previousLabel: t("Previous page", "الصفحة السابقة"),
      nextLabel: t("Next page", "الصفحة التالية"),
      pageLabel: (page: number) => t(`Page ${page}`, `الصفحة ${n(page)}`),
      compactLabel: (page: number, count: number) =>
        t(`${page} of ${count}`, `${n(page)} من ${n(count)}`),
      formatNumber: n,
    },
  };
}

export function DataTableBasic() {
  const t = useBi();
  const columns = useColumns();
  const data = useRequests();
  const labels = useDataTableLabels();
  const [filter, setFilter] = useState("");
  return (
    <Stack>
      <SearchBox
        value={filter}
        onValueChange={setFilter}
        placeholder={t("Search requests", "ابحث في الطلبات")}
        aria-label={t("Search requests", "ابحث في الطلبات")}
        clearLabel={t("Clear search", "مسح البحث")}
        className="max-w-sm"
      />
      <DataTable
        aria-label={t("Requests", "الطلبات")}
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        pageSize={5}
        selectable
        globalFilter={filter}
        defaultSorting={[{ id: "id", desc: false }]}
        labels={labels}
      />
    </Stack>
  );
}

export function DataTableStates() {
  const t = useBi();
  const columns = useColumns();
  const data = useRequests();
  const labels = useDataTableLabels();
  return (
    <Stack className="gap-8">
      <DataTable
        aria-label={t("Loading", "جارٍ التحميل")}
        caption={t("Loading", "جارٍ التحميل")}
        columns={columns}
        data={[]}
        loading
        labels={labels}
      />
      <DataTable
        aria-label={t("Empty", "فارغ")}
        caption={t("Empty", "فارغ")}
        columns={columns}
        data={[]}
        labels={labels}
      />
      <DataTable
        aria-label={t("Compact", "مضغوط")}
        caption={t("Compact, no pagination", "مضغوط، بلا ترقيم")}
        columns={columns}
        data={data.slice(0, 3)}
        pageSize={0}
        compact
        contained
        labels={labels}
      />
    </Stack>
  );
}

// ------------------------------------------------------------------------------- Rating

function useRatingLabels() {
  const t = useBi();
  const n = useNumber();
  return {
    starLabel: (value: number) =>
      t(value === 1 ? "1 star" : `${value} stars`, `${n(value)} من النجوم`),
    summaryLabel: (value: number, max: number) =>
      t(`Rated ${value} out of ${max}`, `التقييم ${n(value)} من ${n(max)}`),
  };
}

export function RatingBasic() {
  const t = useBi();
  const labels = useRatingLabels();
  const number = useNumber();
  const [value, setValue] = useState(3);
  return (
    <Stack>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Row key={size}>
          <Rating
            size={size}
            defaultValue={3}
            aria-label={t(`Rate the service (${size})`, `قيّم الخدمة (${size})`)}
            {...labels}
          />
        </Row>
      ))}
      <Row label={<Bi en="Brand colour, controlled" ar="بلون العلامة، بتحكّم خارجي" />}>
        <Rating
          brand
          value={value}
          onValueChange={setValue}
          aria-label={t("Your rating", "تقييمك")}
          {...labels}
        />
        <span className="text-md text-text-primary-paragraph tabular-nums">
          <Bi en={`${value} of 5`} ar={`${number(value)} من ٥`} />
        </span>
      </Row>
    </Stack>
  );
}

export function RatingStates() {
  const t = useBi();
  const labels = useRatingLabels();
  return (
    <Stack>
      <Row label={<Bi en="Read-only" ar="للقراءة فقط" />}>
        <Rating readOnly value={4} {...labels} />
        <Rating readOnly value={4} brand {...labels} />
      </Row>
      <Row label={<Bi en="Disabled" ar="معطّل" />}>
        <Rating disabled defaultValue={2} aria-label={t("Rating", "التقييم")} {...labels} />
      </Row>
      <Row label={<Bi en="Not rated yet" ar="لم يُقيَّم بعد" />}>
        <Rating aria-label={t("Rate this page", "قيّم هذه الصفحة")} {...labels} />
      </Row>
    </Stack>
  );
}

// ------------------------------------------------------------------------------- Progress

function useProgressFormat() {
  const n = useNumber();
  const arabic = useLanguage() === "ar";
  return (value: number) => (arabic ? `${n(Math.round(value))}٪` : `${Math.round(value)}%`);
}

export function ProgressLinear() {
  const t = useBi();
  const format = useProgressFormat();
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Progress
          key={size}
          size={size}
          value={50}
          label={t(`Uploading (${size})`, `جارٍ الرفع (${size})`)}
          helperText={t("Keep this page open.", "أبقِ هذه الصفحة مفتوحة.")}
          formatValue={format}
        />
      ))}
      <Progress
        tone="neutral"
        value={20}
        label={t("Profile completeness", "اكتمال الملف")}
        formatValue={format}
      />
    </div>
  );
}

export function ProgressStates() {
  const t = useBi();
  const format = useProgressFormat();
  const [value, setValue] = useState(30);
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <Progress
        value={100}
        status="success"
        label={t("Upload", "الرفع")}
        helperText={t("Upload complete.", "اكتمل الرفع.")}
        formatValue={format}
      />
      <Progress
        value={0}
        status="error"
        label={t("Upload", "الرفع")}
        helperText={t("Upload failed. Try again.", "فشل الرفع. حاول مرة أخرى.")}
        formatValue={format}
      />
      <Progress
        value={null}
        label={t("Preparing your file", "جارٍ تجهيز ملفك")}
        helperText={t("This takes a moment.", "يستغرق هذا لحظات.")}
      />
      <Stack>
        <Progress value={value} label={t("Controlled", "بتحكّم خارجي")} formatValue={format} />
        <Row>
          <Button size="sm" variant="outline" onClick={() => setValue((v) => Math.max(0, v - 10))}>
            <Bi en="Less" ar="أقل" />
          </Button>
          <Button size="sm" onClick={() => setValue((v) => Math.min(100, v + 10))}>
            <Bi en="More" ar="أكثر" />
          </Button>
        </Row>
      </Stack>
    </div>
  );
}

export function ProgressCircleDemo() {
  const t = useBi();
  const format = useProgressFormat();
  return (
    <Stack>
      <Row className="items-end gap-6">
        {([64, 80, 120, 160, 200] as const).map((size) => (
          <ProgressCircle
            key={size}
            size={size}
            value={65}
            label={t("Active users", "مستخدم نشط")}
            aria-label={t(`Active users (${size})`, `مستخدم نشط (${size})`)}
            formatValue={format}
          />
        ))}
      </Row>
      <Row className="gap-6">
        <ProgressCircle
          value={40}
          tone="neutral"
          label={t("Neutral", "محايد")}
          formatValue={format}
        />
        <ProgressCircle
          value={100}
          status="success"
          label={t("Done", "اكتمل")}
          aria-label={t("Done", "اكتمل")}
        />
        <ProgressCircle
          value={20}
          status="error"
          label={t("Failed", "فشل")}
          aria-label={t("Failed", "فشل")}
        />
        <ProgressCircle
          value={null}
          label={t("Loading", "جارٍ التحميل")}
          aria-label={t("Loading", "جارٍ التحميل")}
        />
      </Row>
    </Stack>
  );
}
