"use client";

import {
  Building03Icon,
  CreditCardIcon,
  File01Icon,
  Globe02Icon,
  HelpCircleIcon,
  Home01Icon,
  Mail01Icon,
  Notification01Icon,
  Search01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/bases/base/ui/card";
import { Carousel } from "@/registry/bases/base/ui/carousel";
import {
  addDays,
  Calendar,
  DatePicker,
  type DateRange,
  todayIso,
} from "@/registry/bases/base/ui/date-picker";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/registry/bases/base/ui/field";
import {
  Filtration,
  type FiltrationGroup,
  type FiltrationValue,
} from "@/registry/bases/base/ui/filtration";
import {
  Header,
  HeaderAction,
  HeaderDrawerFooter,
  HeaderDrawerHeader,
  HeaderLogo,
  type HeaderNavItem,
} from "@/registry/bases/base/ui/header";
import { Input } from "@/registry/bases/base/ui/input";
import { Switch } from "@/registry/bases/base/ui/switch";
import { useBi, useLanguage } from "./bi";
import { Row, Stack } from "./kit";

/** Digits in the preview's content language: Arabic-Indic in RTL, Western in LTR. */
function useDigits() {
  const arabic = useLanguage() === "ar";
  return (value: number) =>
    arabic ? value.toLocaleString("ar-EG", { useGrouping: false }) : String(value);
}

function Logo({ onColor = false }: { onColor?: boolean }) {
  const t = useBi();
  return (
    <a
      href="#top"
      className={`inline-flex items-center gap-2 text-lg font-bold no-underline ${onColor ? "text-text-oncolor-primary" : "text-text-display"}`}
    >
      <span aria-hidden className="size-8 rounded-sm bg-background-primary" />
      <span className="max-sm:sr-only">{t("Digital Services", "الخدمات الرقمية")}</span>
    </a>
  );
}

function useHeaderItems(): HeaderNavItem[] {
  const t = useBi();
  return [
    { label: t("Home", "الرئيسية"), href: "#home", icon: Home01Icon, current: true },
    {
      label: t("Services", "الخدمات"),
      icon: File01Icon,
      sections: [
        {
          title: t("Individuals", "الأفراد"),
          links: [
            {
              label: t("Renew a licence", "تجديد ترخيص"),
              description: t("Renew online in minutes", "جدّد إلكترونيًا في دقائق"),
              href: "#renew",
              icon: File01Icon,
            },
            {
              label: t("Pay a fee", "سداد رسم"),
              description: t("Pay with a card or transfer", "ادفع ببطاقة أو بتحويل"),
              href: "#pay",
              icon: CreditCardIcon,
            },
          ],
        },
        {
          title: t("Businesses", "الأعمال"),
          links: [
            {
              label: t("Register a company", "تسجيل منشأة"),
              description: t("Start a new business", "ابدأ نشاطًا تجاريًا جديدًا"),
              href: "#register",
              icon: Building03Icon,
            },
            {
              label: t("Request a permit", "طلب تصريح"),
              description: t("Apply for an operating permit", "قدّم على تصريح تشغيل"),
              href: "#permit",
              icon: File01Icon,
              tag: t("New", "جديد"),
            },
          ],
        },
      ],
    },
    { label: t("About", "عن الجهة"), href: "#about", icon: Building03Icon, divider: true },
    { label: t("Contact", "تواصل معنا"), href: "#contact", icon: Mail01Icon, badge: "+9" },
  ];
}

function useHeaderSlots() {
  const t = useBi();
  return {
    logo: <Logo />,
    // The actions DGA's Header draws: icon and label.
    actions: [
      { label: t("Language", "اللغة"), icon: Globe02Icon, href: "#language" },
      { label: t("Sign in", "تسجيل الدخول"), icon: UserIcon, href: "#sign-in" },
    ],
    // The optional extras: an icon-only bell and a help action.
    extraActions: [
      {
        label: t("Notifications", "الإشعارات"),
        icon: Notification01Icon,
        href: "#notifications",
        iconOnly: true,
      },
      { label: t("Help", "المساعدة"), icon: HelpCircleIcon, href: "#help" },
    ],
    search: (
      <Input
        size="md"
        aria-label={t("Search the site", "ابحث في الموقع")}
        placeholder={t("Search", "بحث")}
        startAdornment={<HugeiconsIcon icon={Search01Icon} aria-hidden className="size-5" />}
      />
    ),
    language: (
      <Button variant="transparent" size="md">
        <HugeiconsIcon icon={Globe02Icon} aria-hidden />
        <span className="max-lg:sr-only">{t("Language", "اللغة")}</span>
      </Button>
    ),
    user: (
      <Button variant="primary" size="md">
        <HugeiconsIcon icon={UserIcon} aria-hidden />
        <span className="max-lg:sr-only">{t("Sign in", "تسجيل الدخول")}</span>
      </Button>
    ),
    labels: {
      skipLabel: t("Skip to main content", "تخطَّ إلى المحتوى الرئيسي"),
      navLabel: t("Main", "الرئيسية"),
      menuLabel: t("Menu", "القائمة"),
      moreLabel: t("More", "المزيد"),
      drawerTitle: t("Menu", "القائمة"),
      closeLabel: t("Close", "إغلاق"),
    },
  };
}

// ----------------------------------------------------------------------------- Header

/** The header at the width of the frame: brand logo, navigation links and actions only. */
export function HeaderBasic() {
  const slots = useHeaderSlots();
  const items = useHeaderItems();
  return (
    <div className="-m-4">
      <Header {...slots.labels} logo={slots.logo} items={items} actions={slots.actions} />
    </div>
  );
}

/** The navigation in the centre of the bar (`navPosition="center"`): logo, menu, actions. */
export function HeaderNavCenter() {
  const slots = useHeaderSlots();
  const items = useHeaderItems();
  return (
    <div className="-m-4">
      <Header
        {...slots.labels}
        logo={slots.logo}
        items={items}
        navPosition="center"
        actions={slots.actions}
      />
    </div>
  );
}

/** Menu items: selected (with its bar), a sub-menu parent with a chevron, no icon, disabled. */
export function HeaderMenuItems() {
  const slots = useHeaderSlots();
  const t = useBi();
  const items: HeaderNavItem[] = [
    { label: t("Selected", "محدد"), href: "#selected", icon: Home01Icon, current: true },
    { label: t("Default", "افتراضي"), href: "#default", icon: File01Icon },
    {
      label: t("Sub-menu", "قائمة فرعية"),
      icon: Building03Icon,
      sections: [{ links: [{ label: t("Link", "رابط"), href: "#link" }] }],
    },
    { label: t("No icon", "بلا أيقونة"), href: "#plain" },
    { label: t("Disabled", "معطل"), href: "#disabled", icon: Mail01Icon, disabled: true },
    {
      label: t("Selected, disabled", "محدد ومعطل"),
      href: "#sd",
      icon: Mail01Icon,
      current: true,
      disabled: true,
    },
  ];
  return (
    <div className="-m-4">
      <Header {...slots.labels} logo={slots.logo} items={items} />
    </div>
  );
}

function ActionBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="-m-4 flex flex-wrap items-center justify-center gap-2 bg-background-menu px-4">
      {children}
    </div>
  );
}

/** Header Action layouts: Inline, Top, Text only and Icon only. */
export function HeaderActionLayouts() {
  const t = useBi();
  return (
    <ActionBar>
      <HeaderAction label={t("Inline", "مضمّن")} icon={UserIcon} href="#a" />
      <HeaderAction label={t("Top", "علوي")} icon={UserIcon} iconPosition="top" href="#b" />
      <HeaderAction label={t("Text only", "نص فقط")} href="#c" />
      <HeaderAction label={t("Icon only", "أيقونة فقط")} icon={UserIcon} iconOnly href="#d" />
    </ActionBar>
  );
}

/** Header Action states you can see without interacting: default, selected, disabled. */
export function HeaderActionStates() {
  const t = useBi();
  return (
    <ActionBar>
      <HeaderAction label={t("Default", "افتراضي")} icon={Globe02Icon} href="#a" />
      <HeaderAction label={t("Selected", "محدد")} icon={Globe02Icon} selected href="#b" />
      <HeaderAction label={t("Disabled", "معطل")} icon={Globe02Icon} disabled />
      <HeaderAction
        label={t("Selected, disabled", "محدد ومعطل")}
        icon={Globe02Icon}
        selected
        disabled
      />
    </ActionBar>
  );
}

/** On a phone: menu button, centred logo and overflow (…) button. Mirrors on Arabic pages. */
export function HeaderMobile() {
  const slots = useHeaderSlots();
  const items = useHeaderItems();
  return (
    <div className="-m-4">
      <Header {...slots.labels} logo={slots.logo} items={items} actions={slots.actions} />
    </div>
  );
}

/** The optional extras: a search field, a notifications bell, help, a language button and sign-in. */
export function HeaderExtras() {
  const slots = useHeaderSlots();
  const items = useHeaderItems();
  return (
    <div className="-m-4">
      <Header
        {...slots.labels}
        logo={slots.logo}
        items={items}
        actions={slots.extraActions}
        search={slots.search}
        language={slots.language}
        user={slots.user}
      />
    </div>
  );
}

/** The Services sub-menu open, with simple icons. */
export function HeaderSubmenu() {
  const slots = useHeaderSlots();
  const items = useHeaderItems().map((item) =>
    item.sections ? { ...item, defaultOpen: true } : item,
  );
  return (
    <div className="-m-4 min-h-96">
      <Header
        {...slots.labels}
        logo={slots.logo}
        items={items}
        linkStyle="icon"
        actions={slots.actions}
      />
    </div>
  );
}

/** The sub-menu on the dark green panel, with icons in boxes. */
export function HeaderSubmenuGreen() {
  const slots = useHeaderSlots();
  const items = useHeaderItems().map((item) =>
    item.sections ? { ...item, defaultOpen: true } : item,
  );
  return (
    <div className="-m-4 min-h-96">
      <Header
        {...slots.labels}
        logo={slots.logo}
        items={items}
        linkStyle="boxed-icon"
        submenuTone="green"
        actions={slots.actions}
      />
    </div>
  );
}

/** The sub-menu as wide as the header, on white, with simple icons. */
export function HeaderSubmenuFull() {
  const slots = useHeaderSlots();
  const items = useHeaderItems().map((item) =>
    item.sections ? { ...item, defaultOpen: true } : item,
  );
  return (
    <div className="-m-4 min-h-96">
      <Header
        {...slots.labels}
        logo={slots.logo}
        items={items}
        linkStyle="icon"
        submenuWidth="full"
        actions={slots.actions}
      />
    </div>
  );
}

/** The full-width sub-menu on the dark green panel, with icons in boxes. */
export function HeaderSubmenuFullGreen() {
  const slots = useHeaderSlots();
  const items = useHeaderItems().map((item) =>
    item.sections ? { ...item, defaultOpen: true } : item,
  );
  return (
    <div className="-m-4 min-h-96">
      <Header
        {...slots.labels}
        logo={slots.logo}
        items={items}
        linkStyle="boxed-icon"
        submenuTone="green"
        submenuWidth="full"
        actions={slots.actions}
      />
    </div>
  );
}

/** The navigation in the Drawer, open. */
export function HeaderDrawerOpen() {
  const slots = useHeaderSlots();
  const items = useHeaderItems();
  return (
    <div className="-m-4 min-h-96">
      <Header
        {...slots.labels}
        logo={slots.logo}
        items={items}
        actions={slots.actions}
        defaultMenuOpen
      />
    </div>
  );
}

/** The Nav Drawer with a logo at the top and your own content at the bottom. */
export function HeaderDrawerSlots() {
  const slots = useHeaderSlots();
  const items = useHeaderItems();
  const t = useBi();
  const mark = (
    <>
      <span aria-hidden className="size-8 rounded-sm bg-background-primary" />
      <span className="max-sm:sr-only">{t("Digital Services", "الخدمات الرقمية")}</span>
    </>
  );
  return (
    <div className="-m-4 min-h-96">
      <Header
        {...slots.labels}
        logo={<HeaderLogo href="#top">{mark}</HeaderLogo>}
        items={items}
        actions={slots.actions}
        defaultMenuOpen
      >
        <HeaderDrawerHeader>
          <HeaderLogo href="#top">{mark}</HeaderLogo>
        </HeaderDrawerHeader>
        <HeaderDrawerFooter>
          <p className="m-0 text-xs text-text-primary-paragraph">
            {t("Need help? Call 920000000.", "تحتاج مساعدة؟ اتصل على ٩٢٠٠٠٠٠٠٠.")}
          </p>
        </HeaderDrawerFooter>
      </Header>
    </div>
  );
}

// ----------------------------------------------------------------------------- Date Picker

function useDateText() {
  const t = useBi();
  const arabic = useLanguage() === "ar";
  return {
    numerals: (arabic ? "arab" : "latn") as "arab" | "latn",
    placeholder: t("YYYY-MM-DD", "سسسس-شش-يي"),
    labels: {
      open: t("Open calendar", "افتح التقويم"),
      start: t("Start date", "تاريخ البداية"),
      end: t("End date", "تاريخ النهاية"),
      dialog: t("Calendar", "التقويم"),
      apply: t("Apply", "تطبيق"),
      cancel: t("Cancel", "إلغاء"),
      previousMonth: t("Previous month", "الشهر السابق"),
      nextMonth: t("Next month", "الشهر التالي"),
      calendarSwitch: t("Calendar type", "نوع التقويم"),
      year: t("Year", "السنة"),
      gregorian: t("Gregorian", "ميلادي"),
      hijri: t("Hijri", "هجري"),
    },
  };
}

export function DatePickerBasic() {
  const text = useDateText();
  const t = useBi();
  const [value, setValue] = useState<string | null>(null);
  return (
    <Stack className="mx-auto w-full max-w-sm">
      <Field>
        <FieldLabel>{t("Appointment date", "تاريخ الموعد")}</FieldLabel>
        <DatePicker
          value={value}
          onValueChange={setValue}
          placeholder={text.placeholder}
          numerals={text.numerals}
          labels={text.labels}
        />
        <FieldDescription>
          {t("Type a date or choose it from the calendar.", "اكتب التاريخ أو اخترْه من التقويم.")}
        </FieldDescription>
      </Field>
    </Stack>
  );
}

export function DatePickerRange() {
  const text = useDateText();
  const t = useBi();
  const [value, setValue] = useState<DateRange>({ start: null, end: null });
  return (
    <Stack className="mx-auto w-full max-w-lg">
      <Field>
        <FieldLabel>{t("Stay dates", "فترة الإقامة")}</FieldLabel>
        <DatePicker
          mode="range"
          value={value}
          onValueChange={setValue}
          placeholder={text.placeholder}
          numerals={text.numerals}
          labels={text.labels}
        />
      </Field>
    </Stack>
  );
}

export function DatePickerError() {
  const text = useDateText();
  const t = useBi();
  return (
    <Stack className="mx-auto w-full max-w-sm">
      <Field invalid>
        <FieldLabel required>{t("Date of birth", "تاريخ الميلاد")}</FieldLabel>
        <DatePicker
          defaultCalendar="hijri"
          placeholder={text.placeholder}
          numerals={text.numerals}
          labels={text.labels}
          invalid
        />
        <FieldError match>{t("Choose your date of birth.", "اختر تاريخ ميلادك.")}</FieldError>
      </Field>
    </Stack>
  );
}

export function CalendarStandalone() {
  const text = useDateText();
  const [value, setValue] = useState<string | null>(null);
  return (
    <div className="mx-auto w-fit">
      <Calendar
        value={value}
        onValueChange={setValue}
        numerals={text.numerals}
        labels={text.labels}
        secondaryDate
      />
    </div>
  );
}

/** The year dropdown with limits: only 2020 to 2030 is listed, and a year outside them is not offered. */
export function CalendarYear() {
  const text = useDateText();
  const [value, setValue] = useState<string | null>(null);
  return (
    <div className="mx-auto w-fit">
      <Calendar
        value={value}
        onValueChange={setValue}
        defaultMonth="2026-11-08"
        min="2020-01-01"
        max="2030-12-31"
        numerals={text.numerals}
        labels={text.labels}
      />
    </div>
  );
}

export function CalendarRange() {
  const text = useDateText();
  const [value, setValue] = useState<DateRange>({ start: null, end: null });
  return (
    <div className="mx-auto w-fit max-w-full overflow-x-auto">
      <Calendar
        mode="range"
        months={2}
        defaultCalendar="hijri"
        value={value}
        onValueChange={setValue}
        numerals={text.numerals}
        labels={text.labels}
      />
    </div>
  );
}

/** Only the next 60 days, no Fridays or Saturdays, a Cancel and Apply step and shortcuts. */
export function DatePickerOptions() {
  const text = useDateText();
  const t = useBi();
  const today = todayIso();
  const weekend = (iso: string) => {
    const day = new Date(`${iso}T12:00:00Z`).getUTCDay();
    return day === 5 || day === 6;
  };
  return (
    <Stack className="mx-auto w-full max-w-sm">
      <Field>
        <FieldLabel>{t("Booking date", "تاريخ الحجز")}</FieldLabel>
        <DatePicker
          min={today}
          max={addDays(today, 60)}
          isDateDisabled={weekend}
          confirm
          quickOptions={[
            { label: t("Today", "اليوم"), value: today },
            { label: t("In a week", "بعد أسبوع"), value: addDays(today, 7) },
            { label: t("In a month", "بعد شهر"), value: addDays(today, 30) },
          ]}
          quickOptionsLabel={t("Shortcuts", "اختصارات")}
          placeholder={text.placeholder}
          numerals={text.numerals}
          labels={text.labels}
        />
        <FieldDescription>
          {t("Weekends are not available.", "عطلة نهاية الأسبوع غير متاحة.")}
        </FieldDescription>
      </Field>
    </Stack>
  );
}

// ----------------------------------------------------------------------------- Carousel

function useSlides() {
  const t = useBi();
  const digits = useDigits();
  const slides = [
    [
      t("Renew your licence online", "جدّد ترخيصك إلكترونيًا"),
      t("It takes about five minutes.", "تستغرق العملية نحو خمس دقائق."),
    ],
    [
      t("Track your request", "تابع طلبك"),
      t("See every step and who is handling it.", "اطّلع على كل خطوة ومن يتولى معالجتها."),
    ],
    [
      t("Pay securely", "ادفع بأمان"),
      t("Cards, transfers and instalments.", "بطاقات وتحويلات وأقساط."),
    ],
    [
      t("Get help", "احصل على المساعدة"),
      t("Chat with us any day of the week.", "تحدث معنا في أي يوم من أيام الأسبوع."),
    ],
  ];
  return {
    slides: slides.map(([title, text], i) => (
      <Card key={title} className="mx-1">
        <CardHeader>
          <CardTitle>
            {digits(i + 1)}. {title}
          </CardTitle>
          <CardDescription>{text}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm">
            {t("Start", "ابدأ")}
          </Button>
        </CardContent>
      </Card>
    )),
    labels: {
      previousLabel: t("Previous slide", "الشريحة السابقة"),
      nextLabel: t("Next slide", "الشريحة التالية"),
      pauseLabel: t("Pause slideshow", "إيقاف العرض مؤقتًا"),
      playLabel: t("Start slideshow", "تشغيل العرض"),
      dotsLabel: t("Slides", "الشرائح"),
      slideLabel: (i: number, n: number) => `${digits(i + 1)} ${t("of", "من")} ${digits(n)}`,
      dotLabel: (i: number) => `${t("Go to slide", "انتقل إلى الشريحة")} ${digits(i + 1)}`,
    },
  };
}

export function CarouselBasic() {
  const { slides, labels } = useSlides();
  const t = useBi();
  return (
    <Carousel aria-label={t("Featured services", "خدمات مميزة")} controls="dots" {...labels}>
      {slides}
    </Carousel>
  );
}

export function CarouselVariants() {
  const { slides, labels } = useSlides();
  const t = useBi();
  return (
    <Stack className="gap-8">
      <Row label={t("Arrows", "أسهم")}>
        <div className="w-full">
          <Carousel
            aria-label={t("Arrows only", "أسهم فقط")}
            controls="arrows"
            arrowStyle="subtle"
            size="sm"
            {...labels}
          >
            {slides}
          </Carousel>
        </div>
      </Row>
      <Row label={t("Dots only, large", "نقاط فقط، كبيرة")}>
        <div className="w-full">
          <Carousel
            aria-label={t("Dots only", "نقاط فقط")}
            controls="dots-only"
            dotSize="lg"
            loop
            {...labels}
          >
            {slides}
          </Carousel>
        </div>
      </Row>
    </Stack>
  );
}

export function CarouselAutoplay() {
  const { slides, labels } = useSlides();
  const t = useBi();
  return (
    <Carousel
      aria-label={t("Autoplay slides", "شرائح تلقائية")}
      controls="dots"
      autoPlay={4000}
      loop
      size="lg"
      {...labels}
    >
      {slides}
    </Carousel>
  );
}

// ----------------------------------------------------------------------------- Filtration

const SERVICES = [
  {
    id: 1,
    city: "riyadh",
    kind: "licence",
    en: "Renew a trade licence",
    ar: "تجديد رخصة تجارية",
    price: 400,
  },
  { id: 2, city: "riyadh", kind: "permit", en: "Operating permit", ar: "تصريح تشغيل", price: 900 },
  {
    id: 3,
    city: "jeddah",
    kind: "licence",
    en: "Renew a driving licence",
    ar: "تجديد رخصة قيادة",
    price: 150,
  },
  {
    id: 4,
    city: "dammam",
    kind: "certificate",
    en: "Birth certificate",
    ar: "شهادة ميلاد",
    price: 50,
  },
  { id: 5, city: "jeddah", kind: "permit", en: "Building permit", ar: "رخصة بناء", price: 1200 },
  {
    id: 6,
    city: "riyadh",
    kind: "certificate",
    en: "Residence certificate",
    ar: "شهادة سكن",
    price: 80,
  },
];

function useFiltration() {
  const t = useBi();
  const digits = useDigits();
  const arabic = useLanguage() === "ar";
  const groups = [
    {
      id: "city",
      type: "checkbox" as const,
      label: t("City", "المدينة"),
      options: [
        { value: "riyadh", label: t("Riyadh", "الرياض") },
        { value: "jeddah", label: t("Jeddah", "جدة") },
        { value: "dammam", label: t("Dammam", "الدمام") },
      ].map((o) => ({
        ...o,
        count: digits(SERVICES.filter((s) => s.city === o.value).length),
      })),
    },
    {
      id: "kind",
      type: "radio" as const,
      label: t("Type", "النوع"),
      options: [
        { value: "licence", label: t("Licence", "رخصة") },
        { value: "permit", label: t("Permit", "تصريح") },
        { value: "certificate", label: t("Certificate", "شهادة") },
      ],
    },
    {
      id: "sort",
      type: "select" as const,
      label: t("Sort by", "الترتيب حسب"),
      placeholder: t("Choose", "اختر"),
      options: [
        { value: "name", label: t("Name", "الاسم") },
        { value: "price", label: t("Fee", "الرسوم") },
      ],
    },
    {
      id: "q",
      type: "input" as const,
      label: t("Keyword", "كلمة مفتاحية"),
      placeholder: t("Search services", "ابحث في الخدمات"),
    },
    {
      id: "fee",
      type: "range" as const,
      label: t("Fee (SAR)", "الرسوم (ريال)"),
      minLabel: t("From", "من"),
      maxLabel: t("To", "إلى"),
    },
  ];
  const labels = {
    title: t("Filters", "المرشحات"),
    clearAllLabel: t("Clear all", "مسح الكل"),
    appliedLabel: t("Applied filters", "المرشحات المطبّقة"),
    removeLabel: (name: string) => `${t("Remove", "إزالة")} ${name}`,
    triggerLabel: t("Filters", "المرشحات"),
    applyLabel: (n?: number) =>
      n === undefined
        ? t("Show results", "عرض النتائج")
        : `${t("Show", "عرض")} ${digits(n)} ${t("results", "نتيجة")}`,
    resultLabel: (n: number) => `${digits(n)} ${t("results", "نتيجة")}`,
    closeLabel: t("Close", "إغلاق"),
    drawerDescription: t("Narrow the list of services.", "ضيّق قائمة الخدمات."),
  };
  const filter = (value: FiltrationValue) => {
    const cities = (value.city as string[] | undefined) ?? [];
    const [min, max] = (value.fee as string[] | undefined) ?? [];
    const q = ((value.q as string | undefined) ?? "").trim().toLowerCase();
    const rows = SERVICES.filter(
      (s) =>
        (cities.length === 0 || cities.includes(s.city)) &&
        (!value.kind || s.kind === value.kind) &&
        (!q || (arabic ? s.ar : s.en).toLowerCase().includes(q)) &&
        (!min || s.price >= Number(min)) &&
        (!max || s.price <= Number(max)),
    );
    if (value.sort === "price") rows.sort((a, b) => a.price - b.price);
    return rows;
  };
  return {
    groups,
    labels,
    filter,
    name: (s: (typeof SERVICES)[number]) => (arabic ? s.ar : s.en),
    digits,
    t,
  };
}

function ResultList({
  rows,
  name,
  digits,
  empty,
}: {
  rows: typeof SERVICES;
  name: (s: (typeof SERVICES)[number]) => string;
  digits: (n: number) => string;
  empty: string;
}) {
  if (rows.length === 0) return <p className="text-text-primary-paragraph">{empty}</p>;
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {rows.map((s) => (
        <li
          key={s.id}
          className="flex justify-between rounded-md border border-border-neutral-primary bg-background-card px-4 py-3 text-text-default"
        >
          <span>{name(s)}</span>
          <span className="tabular-nums">{digits(s.price)}</span>
        </li>
      ))}
    </ul>
  );
}

export function FiltrationBasic() {
  const f = useFiltration();
  const [value, setValue] = useState<FiltrationValue>({});
  const rows = f.filter(value);
  return (
    <Filtration
      {...f.labels}
      groups={f.groups}
      value={value}
      onValueChange={setValue}
      resultCount={rows.length}
    >
      <ResultList
        rows={rows}
        name={f.name}
        digits={f.digits}
        empty={f.t("No services match these filters.", "لا توجد خدمات مطابقة لهذه المرشحات.")}
      />
    </Filtration>
  );
}

export function FiltrationUncontrolled() {
  const f = useFiltration();
  return (
    <Filtration
      {...f.labels}
      groups={f.groups.slice(0, 2)}
      defaultValue={{ city: ["riyadh", "jeddah"], kind: "licence" }}
      resultCount={2}
    >
      <p className="m-0 text-text-primary-paragraph">
        {f.t("Your results appear here.", "تظهر نتائجك هنا.")}
      </p>
    </Filtration>
  );
}

/** Groups that need the Date Picker's own texts, in the language of the preview. */
function useDateGroupProps() {
  const text = useDateText();
  return { placeholder: text.placeholder, numerals: text.numerals, labels: text.labels };
}

export function FiltrationSearch() {
  const f = useFiltration();
  const t = f.t;
  const digits = f.digits;
  const cities: [string, string, string][] = [
    ["riyadh", "Riyadh", "الرياض"],
    ["jeddah", "Jeddah", "جدة"],
    ["dammam", "Dammam", "الدمام"],
    ["makkah", "Makkah", "مكة المكرمة"],
    ["madinah", "Madinah", "المدينة المنورة"],
    ["abha", "Abha", "أبها"],
    ["tabuk", "Tabuk", "تبوك"],
    ["hail", "Hail", "حائل"],
  ];
  const groups: FiltrationGroup[] = [
    {
      id: "city",
      type: "checkbox",
      label: t("City", "المدينة"),
      searchable: true,
      searchPlaceholder: t("Search cities", "ابحث في المدن"),
      searchLabel: t("Search cities", "ابحث في المدن"),
      searchClearLabel: t("Clear search", "مسح البحث"),
      noMatchLabel: t("No matching city", "لا توجد مدينة مطابقة"),
      initialCount: 4,
      showMoreLabel: t("Show more", "عرض المزيد"),
      showLessLabel: t("Show less", "عرض أقل"),
      options: cities.map(([value, en, ar], i) => ({
        value,
        label: t(en, ar),
        count: digits(i + 2),
      })),
    },
  ];
  return (
    <Filtration {...f.labels} groups={groups} defaultValue={{ city: ["jeddah"] }} resultCount={3}>
      <p className="m-0 text-text-primary-paragraph">
        {t("Your results appear here.", "تظهر نتائجك هنا.")}
      </p>
    </Filtration>
  );
}

/** Date, rating and a control you draw yourself (a Switch) in the same panel. */
export function FiltrationControls() {
  const f = useFiltration();
  const t = f.t;
  const digits = f.digits;
  const date = useDateGroupProps();
  const groups: FiltrationGroup[] = [
    {
      id: "date",
      type: "date",
      mode: "range",
      label: t("Issued between", "تاريخ الإصدار بين"),
      datePickerProps: date,
    },
    {
      id: "rating",
      type: "rating",
      label: t("Rating", "التقييم"),
      starLabel: (n) => `${digits(n)} ${t(n === 1 ? "star" : "stars", n <= 2 ? "نجمة" : "نجوم")}`,
      formatApplied: (n) => `${digits(n)} ${t("stars and up", "نجوم فأكثر")}`,
    },
    {
      id: "online",
      type: "custom",
      label: t("Availability", "التوفر"),
      formatApplied: () => t("Online only", "عبر الإنترنت فقط"),
      render: ({ labelId, value, onValueChange }) => (
        // biome-ignore lint/a11y/noLabelWithoutControl: the Switch inside is the control
        <label className="flex items-center gap-2 text-md text-text-default">
          <Switch
            aria-labelledby={labelId}
            checked={value === "yes"}
            onCheckedChange={(checked) => onValueChange(checked ? "yes" : undefined)}
          />
          {t("Online only", "عبر الإنترنت فقط")}
        </label>
      ),
    },
  ];
  return (
    <Filtration
      {...f.labels}
      groups={groups}
      defaultValue={{ rating: "4", online: "yes" }}
      resultCount={4}
    >
      <p className="m-0 text-text-primary-paragraph">
        {t("Your results appear here.", "تظهر نتائجك هنا.")}
      </p>
    </Filtration>
  );
}

function FiltrationPlaced({ placement }: { placement: "start" | "end" | "center" }) {
  const f = useFiltration();
  return (
    <Filtration
      {...f.labels}
      placement={placement}
      groups={f.groups.slice(0, 3)}
      defaultValue={{ city: ["riyadh"] }}
      resultCount={3}
    >
      <p className="m-0 text-text-primary-paragraph">
        {f.t("Your results appear here.", "تظهر نتائجك هنا.")}
      </p>
    </Filtration>
  );
}

export function FiltrationStart() {
  return <FiltrationPlaced placement="start" />;
}

export function FiltrationEnd() {
  return <FiltrationPlaced placement="end" />;
}

export function FiltrationCenter() {
  return <FiltrationPlaced placement="center" />;
}
