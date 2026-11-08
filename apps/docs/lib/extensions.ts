import type { Locale } from "./i18n";

type Bilingual = Record<Locale, string>;

export type ExtensionEntry = {
  slug: string;
  title: Bilingual;
  /** The Base UI primitive (code, English in both languages). */
  builtOn: string;
  /** The DGA components its look follows. */
  from: Bilingual;
  /** The main DGA tokens it uses (code). */
  tokens: string[];
};

/**
 * Every Platform Code extension (components DGA does not define), for the Extensions page. The
 * order is the sidebar order. Kept in step with `EXTENSION_COMPONENTS` in `nav.ts`.
 */
export const EXTENSIONS: ExtensionEntry[] = [
  {
    slug: "popover",
    title: { en: "Popover", ar: "نافذة منبثقة" },
    builtOn: "Base UI Popover",
    from: {
      en: "Menu surface, border, radius and shadow, plus the Tooltip beak",
      ar: "سطح القائمة Menu وحدها وانحناؤها وظلها، وسهم تلميح الأداة Tooltip",
    },
    tokens: [
      "background-menu",
      "border-neutral-primary",
      "text-display",
      "text-primary-paragraph",
      "icon-default",
      "shadow-2xl",
    ],
  },
  {
    slug: "hover-card",
    title: { en: "Hover Card", ar: "بطاقة التمرير" },
    builtOn: "Base UI PreviewCard",
    from: {
      en: "Menu surface through the Popover, and the Link for the trigger",
      ar: "سطح القائمة Menu عبر Popover، والرابط Link للزر",
    },
    tokens: [
      "background-menu",
      "border-neutral-primary",
      "link-primary",
      "text-display",
      "text-primary-paragraph",
      "shadow-2xl",
    ],
  },
  {
    slug: "alert-dialog",
    title: { en: "Alert Dialog", ar: "حوار التنبيه" },
    builtOn: "Base UI AlertDialog",
    from: {
      en: "Dialog (Modal) for the window and Button for the actions",
      ar: "النافذة Dialog (Modal) للنافذة، والزر Button للإجراءات",
    },
    tokens: [
      "background-white",
      "alpha-black-50",
      "text-display",
      "text-primary-paragraph",
      "shadow-3xl",
      "button-background-danger-primary-default",
    ],
  },
  {
    slug: "context-menu",
    title: { en: "Context Menu", ar: "قائمة السياق" },
    builtOn: "Base UI ContextMenu",
    from: {
      en: "Menu: the list, items, groups and submenus",
      ar: "القائمة Menu: القائمة نفسها والعناصر والمجموعات والقوائم الفرعية",
    },
    tokens: [
      "background-menu",
      "border-neutral-primary",
      "button-background-neutral-hovered",
      "background-primary-50",
      "text-default",
      "shadow-2xl",
    ],
  },
  {
    slug: "toggle",
    title: { en: "Toggle", ar: "زر تبديل" },
    builtOn: "Base UI Toggle",
    from: {
      en: "Button: the outline, subtle and transparent styles and the pressed fill",
      ar: "الزر Button: أنماط الإطار والخفيف والشفاف ولون الضغط",
    },
    tokens: [
      "button-background-neutral-selected",
      "button-background-neutral-hovered",
      "button-label-transparent-selected",
      "border-black",
    ],
  },
  {
    slug: "toggle-group",
    title: { en: "Toggle Group", ar: "مجموعة أزرار التبديل" },
    builtOn: "Base UI Toggle Group",
    from: {
      en: "Button and Content Switcher: joined edges and a selected fill",
      ar: "الزر Button ومبدّل المحتوى Content Switcher: حواف متصلة ولون للمحدد",
    },
    tokens: [
      "button-background-neutral-selected",
      "border-neutral-primary",
      "button-background-neutral-hovered",
      "border-black",
    ],
  },
  {
    slug: "combobox",
    title: { en: "Combobox", ar: "صندوق اختيار مع بحث" },
    builtOn: "Base UI Combobox",
    from: {
      en: "Select (field, arrow, list), Input (box and states), Tag (chips)",
      ar: "Select (الحقل والسهم والقائمة) وInput (الإطار وحالاته) وTag (الرقائق)",
    },
    tokens: [
      "field-border-default",
      "field-background-default",
      "background-card",
      "border-neutral-primary",
      "tag-background-neutral-light",
      "button-background-neutral-default",
    ],
  },
  {
    slug: "command",
    title: { en: "Command", ar: "لوحة الأوامر" },
    builtOn: "Base UI Autocomplete",
    from: {
      en: "Menu (list and items), Search Box (field)",
      ar: "Menu (القائمة وعناصرها) وSearch Box (الحقل)",
    },
    tokens: [
      "background-menu",
      "border-neutral-primary",
      "button-background-neutral-hovered",
      "button-background-neutral-pressed",
      "text-primary-paragraph",
    ],
  },
  {
    slug: "input-otp",
    title: { en: "Input OTP", ar: "إدخال رمز التحقق" },
    builtOn: "Base UI OTP Field",
    from: { en: "Input and Number Input", ar: "الحقل Input وNumber Input" },
    tokens: [
      "field-background-default",
      "field-border-default",
      "field-border-pressed",
      "field-border-error",
      "field-text-filled",
    ],
  },
  {
    slug: "input-group",
    title: { en: "Input Group", ar: "مجموعة إدخال" },
    builtOn: "Base UI Input",
    from: {
      en: "Input: the box, its states and addons",
      ar: "الحقل Input: الإطار وحالاته والإضافات",
    },
    tokens: [
      "field-background-default",
      "field-border-default",
      "field-border-pressed",
      "field-border-error",
      "text-primary-paragraph",
    ],
  },
  {
    slug: "button-group",
    title: { en: "Button Group", ar: "مجموعة أزرار" },
    builtOn: "Button (no primitive)",
    from: { en: "Button: joined buttons", ar: "الزر Button: أزرار متصلة" },
    tokens: [
      "button-background-neutral-default",
      "border-neutral-primary",
      "background-neutral-100",
      "text-default",
    ],
  },
];

/**
 * Components added in Phase 7 that DGA does define. They follow the DGA specification and are not
 * extensions: the Slider and the Digital Stamp (the official site strip).
 */
export const DGA_DEFINED: { slug: string; title: Bilingual; source: Bilingual }[] = [
  {
    slug: "slider",
    title: { en: "Slider", ar: "شريط التمرير" },
    source: {
      en: "DGA Slider (Figma page Slider: label, helper text, sizes Small and Medium, single and range, RTL variants)",
      ar: "شريط التمرير في DGA (صفحة Slider في Figma: التسمية والنص المساعد وحجمان صغير ومتوسط، مفرد ونطاق، ونسخ RTL)",
    },
  },
  {
    slug: "digital-stamp",
    title: { en: "Digital Stamp", ar: "الختم الرقمي" },
    source: {
      en: "DGA Digital Stamp (Figma page Digital Stamp: the strip, the opened state and the domain Extension part)",
      ar: "الختم الرقمي في DGA (صفحة Digital Stamp في Figma: الشريط والحالة المفتوحة وجزء Extension للنطاق)",
    },
  },
];
