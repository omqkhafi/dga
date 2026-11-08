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
  {
    slug: "menubar",
    title: { en: "Menubar", ar: "شريط القوائم" },
    builtOn: "Base UI Menubar",
    from: {
      en: "Menu for every list, and the Header navigation items for the triggers",
      ar: "القائمة Menu لكل قائمة، وعناصر تنقل Header للأزرار",
    },
    tokens: [
      "background-menu",
      "border-neutral-primary",
      "button-background-neutral-hovered",
      "button-background-neutral-pressed",
      "text-default",
      "shadow-2xl",
    ],
  },
  {
    slug: "navigation-menu",
    title: { en: "Navigation Menu", ar: "قائمة التنقل" },
    builtOn: "Base UI Navigation Menu",
    from: {
      en: "Header navigation items for the bar and the Menu surface for the panel",
      ar: "عناصر تنقل Header للشريط، وسطح القائمة Menu للوحة",
    },
    tokens: [
      "background-menu",
      "border-neutral-primary",
      "button-background-neutral-hovered",
      "button-background-primary-default",
      "text-default",
      "text-primary-paragraph",
      "shadow-2xl",
    ],
  },
  {
    slug: "sidebar",
    title: { en: "Sidebar", ar: "الشريط الجانبي" },
    builtOn: "Collapsible, Drawer and Tooltip",
    from: {
      en: "Header Nav Drawer items and the Second Nav states",
      ar: "عناصر قائمة Drawer في Header وحالات Second Nav",
    },
    tokens: [
      "background-menu",
      "border-neutral-primary",
      "button-background-neutral-hovered",
      "button-background-neutral-selected",
      "link-primary-pressed",
      "text-default",
      "text-primary-paragraph",
    ],
  },
  {
    slug: "collapsible",
    title: { en: "Collapsible", ar: "قسم قابل للطي" },
    builtOn: "Base UI Collapsible",
    from: {
      en: "The Card's Expandable: its trigger, chevron and panel (the Card now uses this component)",
      ar: "القسم القابل للتوسيع في البطاقة Card: زره وسهمه ولوحته (والبطاقة تستخدم هذا المكوّن الآن)",
    },
    tokens: ["text-display", "text-primary-paragraph", "icon-default", "border-black"],
  },
  {
    slug: "scroll-area",
    title: { en: "Scroll Area", ar: "منطقة التمرير" },
    builtOn: "Base UI Scroll Area",
    from: {
      en: "The DGA gray text tokens for the thumb (DGA has no scrollbar), and the focus ring",
      ar: "رموز النص الرمادية في DGA للمؤشر (لا شريط تمرير في DGA)، وحلقة التركيز",
    },
    tokens: ["text-secondary-paragraph", "text-primary-paragraph", "icon-default", "border-black"],
  },
  {
    slug: "resizable",
    title: { en: "Resizable", ar: "لوحات قابلة لتغيير الحجم" },
    builtOn: "react-resizable-panels",
    from: {
      en: "The Divider for the line, made darker so the handle can be found, and the focus ring",
      ar: "الفاصل Divider للخط، أغمق ليسهل العثور على المقبض، وحلقة التركيز",
    },
    tokens: ["text-secondary-paragraph", "icon-default", "border-black", "background-white"],
  },
  {
    slug: "aspect-ratio",
    title: { en: "Aspect Ratio", ar: "نسبة العرض إلى الارتفاع" },
    builtOn: "CSS aspect-ratio (a plain element)",
    from: {
      en: "The Card's radius; it draws no colour of its own",
      ar: "انحناء البطاقة Card؛ ولا يرسم أي لون بنفسه",
    },
    tokens: ["radius-md"],
  },
  {
    slug: "kbd",
    title: { en: "Kbd", ar: "مفتاح لوحة المفاتيح" },
    builtOn: "HTML kbd",
    from: {
      en: "The key addon of Input Group, with the neutral fill and border",
      ar: "إضافة المفتاح في Input Group، بالتعبئة والحد المحايدين",
    },
    tokens: ["background-neutral-100", "border-neutral-primary", "text-default"],
  },
  {
    slug: "empty",
    title: { en: "Empty", ar: "حالة فارغة" },
    builtOn: "HTML",
    from: {
      en: "The empty state of Data Table: icon, text colours and centring",
      ar: "الحالة الفارغة في Data Table: الأيقونة وألوان النص والتوسيط",
    },
    tokens: [
      "icon-default-500",
      "text-display",
      "text-primary-paragraph",
      "background-neutral-100",
    ],
  },
  {
    slug: "item",
    title: { en: "Item", ar: "عنصر" },
    builtOn: "HTML, Base UI render",
    from: {
      en: "List for the text and icons, Card for the border and the link hover tint",
      ar: "القائمة List للنص والأيقونات، والبطاقة Card للحد ولون التمرير على الرابط",
    },
    tokens: [
      "text-display",
      "text-primary-paragraph",
      "icon-default",
      "background-neutral-50",
      "border-neutral-primary",
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
    slug: "chart",
    title: { en: "Chart", ar: "مخطط" },
    source: {
      en: "DGA Charts (Figma page Charts: pie with and without a hole, line and bar, legend, axis labels, the charts-* colours)",
      ar: "المخططات في DGA (صفحة Charts في Figma: دائري بثقب ودونه، وخطي وأعمدة، ووسيلة الإيضاح وتسميات المحاور وألوان charts-*)",
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
