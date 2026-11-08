"use client";

import {
  Add01Icon,
  Download01Icon,
  File01Icon,
  FileSearchIcon,
  Folder01Icon,
  InboxIcon,
  Mail01Icon,
  Notification01Icon,
  Search01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { Avatar } from "@/registry/bases/base/ui/avatar";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Button } from "@/registry/bases/base/ui/button";
import {
  CHART_MARKERS,
  CHART_SERIES,
  type ChartConfig,
  ChartContainer,
  ChartDataTable,
  ChartDot,
  ChartLegend,
  ChartLegendContent,
  ChartSwatch,
  ChartTooltip,
  ChartTooltipContent,
  useChartAnimation,
  useChartDirection,
} from "@/registry/bases/base/ui/chart";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/bases/base/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupKbd,
} from "@/registry/bases/base/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/bases/base/ui/item";
import { Kbd, KbdGroup } from "@/registry/bases/base/ui/kbd";
import { Bi, useBi, useLanguage } from "./bi";
import { Row, Stack } from "./kit";

/* ----------------------------------------------------------------------- Kbd */

export function KbdBasic() {
  return (
    <Stack>
      <Row label={<Bi en="Single keys" ar="مفاتيح مفردة" />}>
        <Kbd>Ctrl</Kbd>
        <Kbd>⌘</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>→</Kbd>
      </Row>
      <Row label={<Bi en="Combinations" ar="تركيبات" />}>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </Row>
    </Stack>
  );
}

export function KbdInContext() {
  const t = useBi();
  return (
    <Stack>
      <p className="m-0 text-md text-text-primary-paragraph">
        <Bi en="Press " ar="اضغط " />
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <Bi en=" to search, or " ar=" للبحث، أو " />
        <Kbd>Esc</Kbd>
        <Bi en=" to close." ar=" للإغلاق." />
      </p>
      <InputGroup className="max-w-sm">
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01Icon} aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          aria-label={t("Search services", "ابحث في الخدمات")}
          placeholder={t("Search services", "ابحث في الخدمات")}
        />
        <InputGroupAddon>
          <InputGroupKbd>⌘K</InputGroupKbd>
        </InputGroupAddon>
      </InputGroup>
      <Row label={<Bi en="In a button" ar="داخل زر" />}>
        <Button variant="outline">
          <Bi en="Save draft" ar="حفظ المسودة" />
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </Button>
      </Row>
    </Stack>
  );
}

/* --------------------------------------------------------------------- Empty */

export function EmptyBasic() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={InboxIcon} aria-hidden />
        </EmptyMedia>
        <EmptyTitle>
          <Bi en="No requests yet" ar="لا توجد طلبات بعد" />
        </EmptyTitle>
        <EmptyDescription>
          <Bi
            en="Requests you submit appear here. Start a new one to track its progress."
            ar="تظهر هنا الطلبات التي تقدمها. ابدأ طلبًا جديدًا لتتابع حالته."
          />
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap justify-center gap-2">
          <Button>
            <HugeiconsIcon icon={Add01Icon} data-icon="inline-start" aria-hidden />
            <Bi en="New request" ar="طلب جديد" />
          </Button>
          <Button variant="outline">
            <Bi en="Import" ar="استيراد" />
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}

export function EmptyBordered() {
  return (
    <Empty bordered>
      <EmptyHeader>
        <EmptyMedia>
          <HugeiconsIcon icon={Folder01Icon} className="size-10" aria-hidden />
        </EmptyMedia>
        <EmptyTitle>
          <Bi en="This folder is empty" ar="هذا المجلد فارغ" />
        </EmptyTitle>
        <EmptyDescription>
          <Bi en="Upload a document or drop one here." ar="ارفع مستندًا أو أفلته هنا." />
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <HugeiconsIcon icon={Download01Icon} data-icon="inline-start" aria-hidden />
          <Bi en="Upload a document" ar="رفع مستند" />
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export function EmptySearch() {
  const t = useBi();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={FileSearchIcon} aria-hidden />
        </EmptyMedia>
        <EmptyTitle>
          <Bi en="No results for “passport”" ar="لا نتائج لعبارة «جواز»" />
        </EmptyTitle>
        <EmptyDescription>
          <Bi
            en="Check the spelling or try a shorter word. You can also browse all services."
            ar="تحقق من الإملاء أو جرّب كلمة أقصر. يمكنك أيضًا تصفح كل الخدمات."
          />
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup>
          <InputGroupAddon>
            <HugeiconsIcon icon={Search01Icon} aria-hidden />
          </InputGroupAddon>
          <InputGroupInput
            aria-label={t("Search services", "ابحث في الخدمات")}
            placeholder={t("Search services", "ابحث في الخدمات")}
          />
        </InputGroup>
      </EmptyContent>
    </Empty>
  );
}

export function EmptyError() {
  return (
    <Empty bordered>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={Notification01Icon} aria-hidden />
        </EmptyMedia>
        <EmptyTitle>
          <Bi en="We could not load your requests" ar="تعذر تحميل طلباتك" />
        </EmptyTitle>
        <EmptyDescription>
          <Bi en="Check your connection and try again." ar="تحقق من اتصالك وحاول مرة أخرى." />
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <Bi en="Try again" ar="إعادة المحاولة" />
        </Button>
      </EmptyContent>
    </Empty>
  );
}

/* ---------------------------------------------------------------------- Item */

function Sample({
  variant,
  size,
}: {
  variant?: "default" | "outline" | "muted";
  size?: "default" | "sm";
}) {
  return (
    <Item variant={variant} size={size}>
      <ItemMedia variant="icon">
        <HugeiconsIcon icon={File01Icon} aria-hidden />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Bi en="Passport renewal" ar="تجديد جواز السفر" />
        </ItemTitle>
        <ItemDescription>
          <Bi
            en="Submitted on 8 November. Awaiting review."
            ar="قُدّم في ٨ نوفمبر. بانتظار المراجعة."
          />
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          <Bi en="View" ar="عرض" />
        </Button>
      </ItemActions>
    </Item>
  );
}

export function ItemVariants() {
  return (
    <Stack className="max-w-xl">
      <Sample variant="default" />
      <Sample variant="outline" />
      <Sample variant="muted" />
    </Stack>
  );
}

export function ItemSizes() {
  return (
    <Stack className="max-w-xl">
      <Sample variant="outline" size="default" />
      <Sample variant="outline" size="sm" />
    </Stack>
  );
}

export function ItemMediaKinds() {
  return (
    <Stack className="max-w-xl">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={Mail01Icon} aria-hidden />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <Bi en="Email notifications" ar="إشعارات البريد" />
          </ItemTitle>
          <ItemDescription>
            <Bi
              en="Receive an email when a request changes."
              ar="استلم بريدًا عند تغيّر حالة الطلب."
            />
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <Avatar initials={useLanguage() === "ar" ? "ع م" : "AM"} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <Bi en="Amal Al-Mutairi" ar="أمل المطيري" />
            <Badge variant="success" size="sm">
              <Bi en="Reviewer" ar="مراجع" />
            </Badge>
          </ItemTitle>
          <ItemDescription>
            <Bi
              en="Reviews applications for the Riyadh region."
              ar="تراجع الطلبات في منطقة الرياض."
            />
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="image">
          {/* biome-ignore lint/performance/noImgElement: a docs preview with an inline data URI */}
          <img
            alt=""
            src={`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#1b8354"/><circle cx="20" cy="20" r="9" fill="#f5bd02"/></svg>')}`}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <Bi en="Service guide" ar="دليل الخدمات" />
          </ItemTitle>
          <ItemDescription>
            <Bi en="Everything you need before you apply." ar="كل ما تحتاجه قبل التقديم." />
          </ItemDescription>
        </ItemContent>
      </Item>
    </Stack>
  );
}

export function ItemLink() {
  return (
    <Stack className="max-w-xl">
      <Item variant="outline" render={<a href="#item-link" />}>
        <ItemMedia variant="icon">
          <HugeiconsIcon icon={Settings02Icon} aria-hidden />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <Bi en="Account settings" ar="إعدادات الحساب" />
          </ItemTitle>
          <ItemDescription>
            <Bi en="The whole row is the link." ar="الصف كله هو الرابط." />
          </ItemDescription>
        </ItemContent>
      </Item>
    </Stack>
  );
}

export function ItemGroupDemo() {
  const rows: [string, string, string, string][] = [
    ["Passport renewal", "تجديد جواز السفر", "In review", "قيد المراجعة"],
    ["National ID", "الهوية الوطنية", "Approved", "تمت الموافقة"],
    ["Driving licence", "رخصة القيادة", "Needs a document", "تحتاج إلى مستند"],
  ];
  return (
    <ItemGroup render={<ul />} className="max-w-xl">
      {rows.map(([en, ar, statusEn, statusAr], i) => (
        <li key={en} className="contents">
          <Item render={<div />}>
            <ItemMedia variant="icon">
              <HugeiconsIcon icon={File01Icon} aria-hidden />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                <Bi en={en} ar={ar} />
              </ItemTitle>
            </ItemContent>
            <ItemActions>
              <Bi en={statusEn} ar={statusAr} />
            </ItemActions>
          </Item>
          {i < rows.length - 1 ? <ItemSeparator /> : null}
        </li>
      ))}
    </ItemGroup>
  );
}

export function ItemHeaderFooter() {
  return (
    <Stack className="max-w-xl">
      <Item variant="muted">
        <ItemHeader>
          <ItemTitle>
            <Bi en="Request 24810" ar="الطلب ٢٤٨١٠" />
          </ItemTitle>
          <Badge variant="info" size="sm">
            <Bi en="In review" ar="قيد المراجعة" />
          </Badge>
        </ItemHeader>
        <ItemContent>
          <ItemDescription>
            <Bi
              en="A reviewer will reply within three working days."
              ar="سيردّ المراجع خلال ثلاثة أيام عمل."
            />
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="text-sm text-text-primary-paragraph">
            <Bi en="Updated 8 November" ar="حُدّث في ٨ نوفمبر" />
          </span>
          <Button variant="outline" size="sm">
            <Bi en="Open" ar="فتح" />
          </Button>
        </ItemFooter>
      </Item>
    </Stack>
  );
}

/* --------------------------------------------------------------------- Chart */

type Datum = Record<string, string | number>;

const MONTHS: [string, string][] = [
  ["Jan", "يناير"],
  ["Feb", "فبراير"],
  ["Mar", "مارس"],
  ["Apr", "أبريل"],
  ["May", "مايو"],
  ["Jun", "يونيو"],
];
const SERIES_VALUES = [
  [186, 305, 237, 273, 209, 314],
  [80, 200, 120, 190, 130, 140],
  [42, 63, 51, 70, 58, 66],
  [120, 150, 135, 170, 160, 185],
];

function useChartSample() {
  const arabic = useLanguage() === "ar";
  const t = useBi();
  const data: Datum[] = MONTHS.map(([en, ar], i) => ({
    month: arabic ? ar : en,
    applications: SERIES_VALUES[0]?.[i] ?? 0,
    renewals: SERIES_VALUES[1]?.[i] ?? 0,
    appeals: SERIES_VALUES[2]?.[i] ?? 0,
    payments: SERIES_VALUES[3]?.[i] ?? 0,
  }));
  const config = {
    applications: { label: t("Applications", "الطلبات"), color: CHART_SERIES[0], marker: "circle" },
    renewals: { label: t("Renewals", "التجديدات"), color: CHART_SERIES[1], marker: "square" },
    appeals: { label: t("Appeals", "الاعتراضات"), color: CHART_SERIES[2], marker: "triangle" },
    payments: { label: t("Payments", "المدفوعات"), color: CHART_SERIES[3], marker: "diamond" },
  } satisfies ChartConfig;
  const table = { data, categoryKey: "month", categoryLabel: t("Month", "الشهر") };
  return { data, config, table, t };
}

const tableLabels = (t: (en: string, ar: string) => string) => ({
  show: t("View as table", "عرض كجدول"),
  hide: t("Hide table", "إخفاء الجدول"),
});

export function ChartBar() {
  const { data, config, table, t } = useChartSample();
  const { xAxisProps, yAxisProps } = useChartDirection();
  const animate = useChartAnimation();
  return (
    <ChartContainer
      config={config}
      title={t("Applications and renewals by month", "الطلبات والتجديدات حسب الشهر")}
      description={t(
        "Applications peak in June at 314 and renewals in February at 200.",
        "تبلغ الطلبات ذروتها في يونيو عند ٣١٤ والتجديدات في فبراير عند ٢٠٠.",
      )}
      table={{ ...table, keys: ["applications", "renewals"] }}
      tableLabels={tableLabels(t)}
    >
      <BarChart data={data} barGap={4}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} {...xAxisProps} />
        <YAxis tickLine={false} axisLine={false} width={36} {...yAxisProps} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="applications"
          fill="var(--color-applications)"
          radius={3}
          isAnimationActive={animate}
        />
        <Bar
          dataKey="renewals"
          fill="var(--color-renewals)"
          radius={3}
          isAnimationActive={animate}
        />
      </BarChart>
    </ChartContainer>
  );
}

export function ChartLine() {
  const { data, config, table, t } = useChartSample();
  const { xAxisProps, yAxisProps } = useChartDirection();
  const animate = useChartAnimation();
  const dashes = [undefined, "6 4", "2 3", "10 3 2 3"];
  return (
    <ChartContainer
      config={config}
      title={t("Four services by month", "أربع خدمات حسب الشهر")}
      description={t(
        "Applications lead every month; appeals stay lowest.",
        "تتصدر الطلبات كل الأشهر، وتبقى الاعتراضات الأدنى.",
      )}
      table={{ ...table }}
      tableLabels={tableLabels(t)}
    >
      <LineChart data={data} margin={{ left: 8, right: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} {...xAxisProps} />
        <YAxis tickLine={false} axisLine={false} width={36} {...yAxisProps} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {(["applications", "renewals", "appeals", "payments"] as const).map((key, i) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            strokeDasharray={dashes[i]}
            dot={<ChartDot marker={CHART_MARKERS[i]} size={4} />}
            activeDot={<ChartDot marker={CHART_MARKERS[i]} size={6} />}
            isAnimationActive={animate}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

export function ChartArea() {
  const { data, config, table, t } = useChartSample();
  const { xAxisProps, yAxisProps } = useChartDirection();
  const animate = useChartAnimation();
  return (
    <ChartContainer
      config={config}
      title={t("Applications and renewals, stacked", "الطلبات والتجديدات متراكمة")}
      description={t(
        "Together they rise from 266 in January to 454 in June.",
        "يرتفع مجموعهما من ٢٦٦ في يناير إلى ٤٥٤ في يونيو.",
      )}
      table={{ ...table, keys: ["applications", "renewals"] }}
      tableLabels={tableLabels(t)}
    >
      <AreaChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} {...xAxisProps} />
        <YAxis tickLine={false} axisLine={false} width={36} {...yAxisProps} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="renewals"
          type="monotone"
          stackId="a"
          stroke="var(--color-renewals)"
          strokeWidth={2}
          fill="var(--color-renewals)"
          fillOpacity={0.3}
          isAnimationActive={animate}
        />
        <Area
          dataKey="applications"
          type="monotone"
          stackId="a"
          stroke="var(--color-applications)"
          strokeWidth={2}
          fill="var(--color-applications)"
          fillOpacity={0.3}
          isAnimationActive={animate}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export function ChartPie() {
  const t = useBi();
  const { pieProps } = useChartDirection();
  const animate = useChartAnimation();
  const config = {
    online: { label: t("Online", "عبر الإنترنت"), color: CHART_SERIES[0], marker: "circle" },
    branch: { label: t("Branch", "في الفرع"), color: CHART_SERIES[1], marker: "square" },
    phone: { label: t("Phone", "بالهاتف"), color: CHART_SERIES[2], marker: "triangle" },
    kiosk: { label: t("Kiosk", "في الجهاز الذاتي"), color: CHART_SERIES[3], marker: "diamond" },
  } satisfies ChartConfig;
  const data: Datum[] = [
    { channel: "online", requests: 420 },
    { channel: "branch", requests: 260 },
    { channel: "phone", requests: 140 },
    { channel: "kiosk", requests: 180 },
  ];
  const table = {
    data: data.map((d) => ({
      channel: config[d.channel as keyof typeof config].label as string,
      requests: Number(d.requests),
    })),
    categoryKey: "channel",
    categoryLabel: t("Channel", "القناة"),
    keys: ["requests"],
  };
  return (
    <ChartContainer
      config={{ ...config, requests: { label: t("Requests", "الطلبات") } }}
      title={t("Requests by channel", "الطلبات حسب القناة")}
      description={t(
        "Online is the largest channel at 420 of 1,000 requests.",
        "القناة الأكبر هي الإنترنت بـ ٤٢٠ من ١٠٠٠ طلب.",
      )}
      table={table}
      tableLabels={tableLabels(t)}
      className="mx-auto max-h-72"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="channel" />} />
        <Pie
          data={data}
          dataKey="requests"
          nameKey="channel"
          innerRadius={48}
          strokeWidth={3}
          isAnimationActive={animate}
          {...pieProps}
        >
          {data.map((d) => (
            <Cell key={String(d.channel)} fill={`var(--color-${d.channel})`} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="channel" />} />
      </PieChart>
    </ChartContainer>
  );
}

export function ChartInteractive() {
  const { data, config, table, t } = useChartSample();
  const { xAxisProps, yAxisProps } = useChartDirection();
  const animate = useChartAnimation();
  return (
    <Stack>
      <p className="m-0 text-sm text-text-primary-paragraph">
        <Bi
          en="Tab to the chart, then use the arrow keys to move between months. Escape leaves the tooltip."
          ar="انتقل بمفتاح Tab إلى الرسم ثم استخدم مفاتيح الأسهم للتنقل بين الأشهر."
        />
      </p>
      <ChartContainer
        interactive
        config={config}
        title={t("Applications by month, keyboard", "الطلبات حسب الشهر، بلوحة المفاتيح")}
        table={{ ...table, keys: ["applications"] }}
        tableLabels={tableLabels(t)}
      >
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} {...xAxisProps} />
          <YAxis tickLine={false} axisLine={false} width={36} {...yAxisProps} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="applications"
            fill="var(--color-applications)"
            radius={3}
            isAnimationActive={animate}
          />
        </BarChart>
      </ChartContainer>
    </Stack>
  );
}

export function ChartTableDemo() {
  const { config, table, t } = useChartSample();
  return (
    <ChartDataTable
      config={config}
      table={{ ...table, keys: ["applications", "renewals", "appeals", "payments"] }}
      caption={t("Services by month", "الخدمات حسب الشهر")}
    />
  );
}

export function ChartPalette() {
  const t = useBi();
  const names: [string, string][] = [
    ["Series 1", "السلسلة ١"],
    ["Series 2", "السلسلة ٢"],
    ["Series 3", "السلسلة ٣"],
    ["Series 4", "السلسلة ٤"],
  ];
  return (
    <Stack>
      <div className="flex flex-wrap gap-4" data-testid="chart-palette">
        {CHART_SERIES.map((color, i) => (
          <div key={color} className="flex items-center gap-2 text-sm text-text-primary-paragraph">
            <span
              className="size-10 rounded-sm border border-border-neutral-primary"
              style={{ background: color }}
            />
            <ChartSwatch marker={CHART_MARKERS[i]} color={color} className="size-4" />
            <span>{t(names[i]?.[0] ?? "", names[i]?.[1] ?? "")}</span>
          </div>
        ))}
      </div>
      <div className="flex max-w-md overflow-hidden rounded-md">
        {CHART_SERIES.map((color) => (
          <span key={color} className="h-10 flex-1" style={{ background: color }} />
        ))}
      </div>
    </Stack>
  );
}
