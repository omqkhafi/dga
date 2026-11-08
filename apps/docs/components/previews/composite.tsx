"use client";

import {
  Building03Icon,
  Calendar03Icon,
  Call02Icon,
  CloudIcon,
  ContrastIcon,
  CreditCardIcon,
  File01Icon,
  Globe02Icon,
  HelpCircleIcon,
  Home01Icon,
  InstagramIcon,
  Linkedin01Icon,
  Location01Icon,
  Mail01Icon,
  Notification01Icon,
  Search01Icon,
  TextFontIcon,
  UserIcon,
  YoutubeIcon,
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
import { Filtration, type FiltrationValue } from "@/registry/bases/base/ui/filtration";
import { Footer } from "@/registry/bases/base/ui/footer";
import { Header, type HeaderNavItem } from "@/registry/bases/base/ui/header";
import { Input } from "@/registry/bases/base/ui/input";
import { SecondNav } from "@/registry/bases/base/ui/second-nav";
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
            },
          ],
        },
      ],
    },
    { label: t("About", "عن الجهة"), href: "#about", icon: Building03Icon },
    { label: t("Contact", "تواصل معنا"), href: "#contact", icon: Mail01Icon },
  ];
}

function useHeaderSlots() {
  const t = useBi();
  return {
    logo: <Logo />,
    actions: [
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
      drawerTitle: t("Menu", "القائمة"),
      closeLabel: t("Close", "إغلاق"),
    },
  };
}

function useSecondNavEntries() {
  const t = useBi();
  const digits = useDigits();
  return {
    items: [
      {
        label: `${t("Sunday", "الأحد")} ${digits(8)} ${t("November", "نوفمبر")}`,
        icon: Calendar03Icon,
      },
      { label: `${digits(24)}° ${t("Cloudy", "غائم")}`, icon: CloudIcon },
    ],
    actions: [
      { label: t("Text size", "حجم الخط"), icon: TextFontIcon, onClick: () => {} },
      { label: t("Contrast", "التباين"), icon: ContrastIcon, onClick: () => {} },
    ],
    label: t("Page information", "معلومات الصفحة"),
  };
}

// ----------------------------------------------------------------------------- Header

/** The header at the width of the frame: use the viewport toggle for the drawer. */
export function HeaderBasic() {
  const slots = useHeaderSlots();
  const items = useHeaderItems();
  const strip = useSecondNavEntries();
  return (
    <div className="-m-4">
      <Header
        {...slots.labels}
        logo={slots.logo}
        items={items}
        actions={slots.actions}
        search={slots.search}
        language={slots.language}
        user={slots.user}
        top={<SecondNav aria-label={strip.label} items={strip.items} actions={strip.actions} />}
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
        language={slots.language}
        user={slots.user}
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
        language={slots.language}
        user={slots.user}
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
        search={slots.search}
        language={slots.language}
        defaultMenuOpen
      />
    </div>
  );
}

// ----------------------------------------------------------------------------- Second nav

export function SecondNavTones() {
  const strip = useSecondNavEntries();
  const t = useBi();
  return (
    <Stack className="-m-4">
      <SecondNav aria-label={strip.label} items={strip.items} actions={strip.actions} />
      <SecondNav
        aria-label={strip.label}
        tone="primary"
        items={strip.items}
        actions={strip.actions}
      />
      <SecondNav
        aria-label={t("Related pages", "صفحات ذات صلة")}
        items={[
          { label: t("Overview", "نظرة عامة"), href: "#overview", current: true },
          { label: t("Requirements", "المتطلبات"), href: "#requirements" },
          { label: t("Fees", "الرسوم"), href: "#fees" },
          { label: t("Support", "الدعم"), href: "#support" },
          { label: t("Frequently asked questions", "الأسئلة الشائعة"), href: "#faq" },
        ]}
        actions={[{ label: t("Print", "طباعة"), onClick: () => {} }]}
      />
    </Stack>
  );
}

/** A narrow strip: more entries than fit, so it scrolls sideways. */
export function SecondNavOverflow() {
  const t = useBi();
  const names = [
    t("Overview", "نظرة عامة"),
    t("Requirements", "المتطلبات"),
    t("Fees", "الرسوم"),
    t("Support", "الدعم"),
    t("Frequently asked questions", "الأسئلة الشائعة"),
    t("Terms of use", "شروط الاستخدام"),
    t("Contact us", "تواصل معنا"),
  ];
  return (
    <div className="-m-4 w-72 max-w-full">
      <SecondNav
        aria-label={t("Related pages", "صفحات ذات صلة")}
        items={names.map((label, i) => ({ label, href: `#page-${i}`, current: i === 0 }))}
      />
    </div>
  );
}

// ----------------------------------------------------------------------------- Footer

function useFooter(tone: "default" | "green" = "default") {
  const t = useBi();
  const digits = useDigits();
  const arabic = useLanguage() === "ar";
  return {
    logo: <Logo onColor={tone === "green"} />,
    description: t(
      "The digital services of the government, in one place.",
      "الخدمات الرقمية للجهات الحكومية في مكان واحد.",
    ),
    columns: [
      {
        title: t("Services", "الخدمات"),
        links: [
          { label: t("Renew a licence", "تجديد ترخيص"), href: "#renew" },
          { label: t("Pay a fee", "سداد رسم"), href: "#pay" },
          { label: t("Request a permit", "طلب تصريح"), href: "#permit" },
        ],
      },
      {
        title: t("About", "عن الجهة"),
        links: [
          { label: t("Who we are", "من نحن"), href: "#who" },
          { label: t("News", "الأخبار"), href: "#news" },
          { label: t("Careers", "الوظائف"), href: "#careers" },
        ],
      },
      {
        title: t("Support", "الدعم"),
        links: [
          { label: t("Help centre", "مركز المساعدة"), href: "#help" },
          { label: t("Contact us", "تواصل معنا"), href: "#contact" },
          {
            label: t("Open data portal", "بوابة البيانات المفتوحة"),
            href: "#data",
            external: true,
          },
        ],
      },
    ],
    columnsLabel: t("Footer links", "روابط التذييل"),
    social: [
      { label: t("YouTube", "يوتيوب"), href: "#youtube", icon: YoutubeIcon },
      { label: t("LinkedIn", "لينكدإن"), href: "#linkedin", icon: Linkedin01Icon },
      { label: t("Instagram", "إنستغرام"), href: "#instagram", icon: InstagramIcon },
    ],
    socialLabel: t("Social media", "وسائل التواصل الاجتماعي"),
    contactTitle: t("Contact", "التواصل"),
    contact: [
      {
        label: t("Phone", "الهاتف"),
        value: arabic ? "٩٢٠٠٠٠٠٠٠" : "920000000",
        href: "#call",
        icon: Call02Icon,
      },
      {
        label: t("Address", "العنوان"),
        value: t("Riyadh, Saudi Arabia", "الرياض، المملكة العربية السعودية"),
        icon: Location01Icon,
      },
    ],
    badgesTitle: t("Get the app", "حمّل التطبيق"),
    badges: (
      <>
        <a href="#ios" className="rounded-sm border border-current px-3 py-2 text-sm no-underline">
          {t("Download for iPhone", "حمّل لهواتف آيفون")}
        </a>
        <a
          href="#android"
          className="rounded-sm border border-current px-3 py-2 text-sm no-underline"
        >
          {t("Download for Android", "حمّل لهواتف أندرويد")}
        </a>
      </>
    ),
    legalLinks: [
      { label: t("Privacy", "الخصوصية"), href: "#privacy" },
      { label: t("Terms of use", "شروط الاستخدام"), href: "#terms" },
      { label: t("Accessibility", "إمكانية الوصول"), href: "#accessibility" },
    ],
    legalLabel: t("Legal", "قانوني"),
    copyright: t(
      `© ${digits(2026)} Digital Services. All rights reserved.`,
      `© ${digits(2026)} الخدمات الرقمية. جميع الحقوق محفوظة.`,
    ),
    externalLabel: t("(opens in a new tab)", "(يفتح في تبويب جديد)"),
  };
}

export function FooterDefault() {
  const footer = useFooter();
  return (
    <div className="-m-4">
      <Footer {...footer} />
    </div>
  );
}

export function FooterGreen() {
  const footer = useFooter("green");
  return (
    <div className="-m-4">
      <Footer {...footer} tone="green" />
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
    <Stack className="max-w-sm">
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
    <Stack className="max-w-lg">
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
    <Stack className="max-w-sm">
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
    <Row>
      <Calendar
        value={value}
        onValueChange={setValue}
        numerals={text.numerals}
        labels={text.labels}
        secondaryDate
      />
    </Row>
  );
}

export function CalendarRange() {
  const text = useDateText();
  const [value, setValue] = useState<DateRange>({ start: null, end: null });
  return (
    <Calendar
      mode="range"
      months={2}
      defaultCalendar="hijri"
      value={value}
      onValueChange={setValue}
      numerals={text.numerals}
      labels={text.labels}
    />
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
    <Stack className="max-w-sm">
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
