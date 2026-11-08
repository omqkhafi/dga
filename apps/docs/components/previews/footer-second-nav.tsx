"use client";

import {
  Call02Icon,
  ContrastIcon,
  InstagramIcon,
  Linkedin01Icon,
  Location01Icon,
  Mic01Icon,
  NewTwitterIcon,
  PrinterIcon,
  TextFontIcon,
  ViewIcon,
  YoutubeIcon,
  ZoomInAreaIcon,
  ZoomOutAreaIcon,
} from "@hugeicons/core-free-icons";
import { Footer } from "@/registry/bases/base/ui/footer";
import { SecondNav, SecondNavItem } from "@/registry/bases/base/ui/second-nav";
import { useBi, useLanguage } from "./bi";
import { Row } from "./kit";

function useDigits() {
  const arabic = useLanguage() === "ar";
  return (value: number) =>
    arabic ? value.toLocaleString("ar-EG", { useGrouping: false }) : String(value);
}

// ----------------------------------------------------------------------------- Second Nav

/** The four ready-made items. Date and time follow the Figma samples: 3-September-2024, 2:30 PM. */
function useStripItems() {
  const t = useBi();
  return [
    { kind: "weather" as const, label: t("Cloudy 24°", "غائم 24°") },
    { kind: "date" as const, label: t("3-September-2024", "3-سبتمبر-2024") },
    { kind: "time" as const, label: t("2:30 PM", "2:30 مساءً") },
    { kind: "location" as const, label: t("Riyadh", "الرياض") },
  ];
}

function useTools() {
  const t = useBi();
  return [
    { label: t("Voice reading", "القراءة الصوتية"), icon: Mic01Icon, iconOnly: true },
    { label: t("Zoom in", "تكبير"), icon: ZoomInAreaIcon, iconOnly: true },
    { label: t("Zoom out", "تصغير"), icon: ZoomOutAreaIcon, iconOnly: true },
    { label: t("Contrast", "التباين"), icon: ViewIcon, iconOnly: true },
  ].map((tool) => ({ ...tool, onClick: () => {} }));
}

export function SecondNavGray() {
  const t = useBi();
  return (
    <div className="-m-4">
      <SecondNav
        aria-label={t("Page information", "معلومات الصفحة")}
        items={useStripItems()}
        actions={useTools()}
      />
    </div>
  );
}

export function SecondNavPrimary() {
  const t = useBi();
  return (
    <div className="-m-4">
      <SecondNav
        aria-label={t("Page information", "معلومات الصفحة")}
        tone="primary"
        items={useStripItems()}
        actions={useTools()}
      />
    </div>
  );
}

export function SecondNavKinds() {
  const t = useBi();
  return (
    <div className="-m-4">
      <SecondNav aria-label={t("Page information", "معلومات الصفحة")} items={useStripItems()} />
    </div>
  );
}

export function SecondNavActions() {
  const t = useBi();
  const tools = useTools();
  return (
    <div className="-m-4">
      <SecondNav
        aria-label={t("Accessibility tools", "أدوات الوصول")}
        actions={[
          ...tools,
          {
            label: t("Text size", "حجم الخط"),
            icon: TextFontIcon,
            onClick: () => {},
          },
          { label: t("Contrast", "التباين"), icon: ContrastIcon, onClick: () => {} },
        ]}
      />
    </div>
  );
}

export function SecondNavItemDefault() {
  const items = useStripItems();
  return (
    <Row className="rounded-sm bg-background-neutral-100 px-4 py-2 text-text-primary-paragraph">
      {items.slice(0, 2).map((entry) => (
        <SecondNavItem key={entry.kind} entry={entry} />
      ))}
    </Row>
  );
}

export function SecondNavItemOnColor() {
  const items = useStripItems();
  return (
    <Row className="rounded-sm bg-background-primary px-4 py-2 text-text-oncolor-primary">
      {items.slice(0, 2).map((entry) => (
        <SecondNavItem key={entry.kind} entry={entry} tone="on-color" />
      ))}
    </Row>
  );
}

/** Optional, not from DGA: a row of links to the sibling pages of a section. */
export function SecondNavLinks() {
  const t = useBi();
  return (
    <div className="-m-4">
      <SecondNav
        aria-label={t("Related pages", "صفحات ذات صلة")}
        items={[
          { label: t("Overview", "نظرة عامة"), href: "#overview", current: true },
          { label: t("Requirements", "المتطلبات"), href: "#requirements" },
          { label: t("Fees", "الرسوم"), href: "#fees" },
          { label: t("Support", "الدعم"), href: "#support" },
        ]}
        actions={[{ label: t("Print", "طباعة"), icon: PrinterIcon, onClick: () => {} }]}
      />
    </div>
  );
}

/** A narrow strip: more entries than fit, so it scrolls sideways. */
export function SecondNavOverflow() {
  const t = useBi();
  return (
    <div className="-m-4 w-72 max-w-full">
      <SecondNav
        aria-label={t("Page information", "معلومات الصفحة")}
        items={useStripItems().map((entry, i) => ({ ...entry, current: i === 0 }))}
        actions={useTools()}
      />
    </div>
  );
}

// ----------------------------------------------------------------------------- Footer

function Logo({ onColor = false }: { onColor?: boolean }) {
  const t = useBi();
  return (
    <a
      href="#top"
      className={`inline-flex items-center gap-2 text-lg font-bold no-underline ${onColor ? "text-text-oncolor-primary" : "text-text-display"}`}
    >
      <span aria-hidden className="size-8 rounded-sm bg-background-primary" />
      <span>{t("Digital Services", "الخدمات الرقمية")}</span>
    </a>
  );
}

/** Stand-ins for the platform logos: two marks with a name. */
function PlatformLogos() {
  const t = useBi();
  return (
    <>
      <span className="inline-flex items-center gap-2 text-sm font-bold">
        <span aria-hidden className="size-6 rounded-full bg-background-sa-flag" />
        {t("National platform", "المنصة الوطنية")}
      </span>
      <span className="inline-flex items-center gap-2 text-sm font-bold">
        <span aria-hidden className="size-6 rounded-sm bg-background-primary" />
        {t("Vision 2030", "رؤية 2030")}
      </span>
    </>
  );
}

function useFooter(tone: "default" | "green" = "default") {
  const t = useBi();
  const digits = useDigits();
  return {
    logo: <Logo onColor={tone === "green"} />,
    partnerLogos: <PlatformLogos />,
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
    socialTitle: t("Social media", "وسائل التواصل الاجتماعي"),
    social: [
      { label: t("X", "إكس"), href: "#x", icon: NewTwitterIcon },
      { label: t("YouTube", "يوتيوب"), href: "#youtube", icon: YoutubeIcon },
      { label: t("LinkedIn", "لينكدإن"), href: "#linkedin", icon: Linkedin01Icon },
      { label: t("Instagram", "إنستغرام"), href: "#instagram", icon: InstagramIcon },
    ],
    socialLabel: t("Social media accounts", "حسابات وسائل التواصل"),
    accessibilityTitle: t("Accessibility tools", "أدوات الوصول"),
    accessibilityTools: [
      { label: t("Zoom in", "تكبير"), icon: ZoomInAreaIcon, onClick: () => {} },
      { label: t("Zoom out", "تصغير"), icon: ZoomOutAreaIcon, onClick: () => {} },
      { label: t("Contrast", "التباين"), icon: ContrastIcon, onClick: () => {} },
    ],
    bottomLabel: t("More links", "روابط إضافية"),
    bottomLinks: [
      { label: t("Sitemap", "خريطة الموقع"), href: "#sitemap" },
      { label: t("Open data", "البيانات المفتوحة"), href: "#open-data" },
      { label: t("Digital participation", "المشاركة الرقمية"), href: "#participation" },
    ],
    legalLinks: [
      { label: t("Terms and conditions", "الشروط والأحكام"), href: "#terms" },
      { label: t("Privacy policy", "سياسة الخصوصية"), href: "#privacy" },
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
  return (
    <div className="-m-4">
      <Footer {...useFooter()} />
    </div>
  );
}

export function FooterGreen() {
  return (
    <div className="-m-4">
      <Footer {...useFooter("green")} tone="green" />
    </div>
  );
}

/** The parts DGA does not draw: a description, contact details and app badges. */
export function FooterOptional() {
  const t = useBi();
  const digits = useDigits();
  const base = useFooter();
  const badge = "rounded-sm border border-current px-3 py-2 text-sm no-underline";
  return (
    <div className="-m-4">
      <Footer
        {...base}
        description={t(
          "The digital services of the government, in one place.",
          "الخدمات الرقمية للجهات الحكومية في مكان واحد.",
        )}
        contactTitle={t("Contact", "التواصل")}
        contact={[
          {
            label: t("Phone", "الهاتف"),
            value: digits(920000000),
            href: "#call",
            icon: Call02Icon,
          },
          {
            label: t("Address", "العنوان"),
            value: t("Riyadh, Saudi Arabia", "الرياض، المملكة العربية السعودية"),
            icon: Location01Icon,
          },
        ]}
        badgesTitle={t("Get the app", "حمّل التطبيق")}
        badges={
          <>
            <a href="#ios" className={badge}>
              {t("Download for iPhone", "حمّل لهواتف آيفون")}
            </a>
            <a href="#android" className={badge}>
              {t("Download for Android", "حمّل لهواتف أندرويد")}
            </a>
          </>
        }
      />
    </div>
  );
}

/** Optional: the link groups fold into an Accordion on narrow screens. */
export function FooterAccordion() {
  return (
    <div className="-m-4">
      <Footer {...useFooter()} collapsible />
    </div>
  );
}
