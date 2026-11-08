"use client";

import {
  Add01Icon,
  Calendar03Icon,
  File01Icon,
  Home01Icon,
  Settings02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  type ComboboxGroupData,
  type ComboboxItemData,
  type ComboboxOption,
} from "@/registry/bases/base/ui/combobox";
import { Command, CommandDialog, type CommandGroupData } from "@/registry/bases/base/ui/command";
import { DigitalStamp, type DigitalStampDomain } from "@/registry/bases/base/ui/digital-stamp";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/registry/bases/base/ui/field";
import { Header } from "@/registry/bases/base/ui/header";
import { Bi, useBi, useLanguage } from "./bi";
import { Stack } from "./kit";

/* ------------------------------------------------------------ shared sample data */

type Pair = [string, string];

function useServices(): ComboboxOption[] {
  const arabic = useLanguage() === "ar";
  return useMemo(() => {
    const rows: Pair[] = [
      ["Renew passport", "تجديد جواز السفر"],
      ["Issue national ID", "إصدار هوية وطنية"],
      ["Driving licence", "رخصة قيادة"],
      ["Commercial register", "سجل تجاري"],
      ["Birth certificate", "شهادة ميلاد"],
      ["Residency permit", "إقامة"],
      ["Vehicle registration", "تسجيل مركبة"],
      ["Pay a traffic fine", "سداد مخالفة مرورية"],
    ];
    return rows.map(([en, ar], i) => ({ value: `s${i}`, label: arabic ? ar : en }));
  }, [arabic]);
}

function useCityGroups(): ComboboxGroupData[] {
  const arabic = useLanguage() === "ar";
  return useMemo(() => {
    const g = (en: string, ar: string, rows: [string, string, string][]): ComboboxGroupData => ({
      label: arabic ? ar : en,
      items: rows.map(([value, e, a]) => ({ value, label: arabic ? a : e })),
    });
    return [
      g("Riyadh Region", "منطقة الرياض", [
        ["riyadh", "Riyadh", "الرياض"],
        ["kharj", "Al Kharj", "الخرج"],
      ]),
      g("Makkah Region", "منطقة مكة المكرمة", [
        ["makkah", "Makkah", "مكة المكرمة"],
        ["jeddah", "Jeddah", "جدة"],
        ["taif", "Taif", "الطائف"],
      ]),
      g("Eastern Province", "المنطقة الشرقية", [
        ["dammam", "Dammam", "الدمام"],
        ["khobar", "Al Khobar", "الخبر"],
      ]),
    ];
  }, [arabic]);
}

/** The labels a combobox needs, by content language. */
function useComboText() {
  const t = useBi();
  return {
    placeholder: t("Search services", "ابحث في الخدمات"),
    clearLabel: t("Clear", "مسح"),
    triggerLabel: t("Show options", "عرض الخيارات"),
    emptyText: t("No services found.", "لا توجد خدمات مطابقة."),
    loadingText: t("Loading…", "جارٍ التحميل…"),
    removeLabel: (label: string) => t(`Remove ${label}`, `إزالة ${label}`),
    removeHint: t("Press Backspace or Delete to remove", "اضغط مفتاح الحذف للإزالة"),
    chipsLabel: t("Selected services", "الخدمات المختارة"),
    statusLabel: (n: number) =>
      n === 1 ? t("1 result", "نتيجة واحدة") : t(`${n} results`, `${n} نتائج`),
  };
}

function Labelled({
  label,
  helper,
  error,
  invalid,
  disabled,
  children,
}: {
  label: Pair;
  helper?: Pair;
  error?: Pair;
  invalid?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <Field invalid={invalid} disabled={disabled}>
      <FieldLabel>
        <Bi en={label[0]} ar={label[1]} />
      </FieldLabel>
      {children}
      {helper ? (
        <FieldDescription>
          <Bi en={helper[0]} ar={helper[1]} />
        </FieldDescription>
      ) : null}
      {error ? (
        <FieldError match={invalid}>
          <Bi en={error[0]} ar={error[1]} />
        </FieldError>
      ) : null}
    </Field>
  );
}

/** A combobox with the labels already wired. */
function ServiceCombobox({
  items,
  size,
  appearance,
  readOnly,
  disabled,
  placeholder,
  ...rest
}: {
  items?: ComboboxItemData[];
  size?: "md" | "lg";
  appearance?: "default" | "lighter" | "darker";
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: ComboboxOption | null;
  defaultOpen?: boolean;
}) {
  const services = useServices();
  const text = useComboText();
  const lang = useLanguage();
  return (
    <Combobox
      key={lang}
      items={items ?? services}
      readOnly={readOnly}
      disabled={disabled}
      {...rest}
    >
      <ComboboxControl
        size={size}
        appearance={appearance}
        placeholder={placeholder ?? text.placeholder}
        clearLabel={text.clearLabel}
        triggerLabel={text.triggerLabel}
      />
      <ComboboxContent emptyText={text.emptyText} statusLabel={text.statusLabel} />
    </Combobox>
  );
}

/* ------------------------------------------------------------ Combobox */

export function ComboboxBasic() {
  return (
    <div className="max-w-sm">
      <Labelled
        label={["Service", "الخدمة"]}
        helper={["Type to search, or open the list.", "اكتب للبحث أو افتح القائمة."]}
      >
        <ServiceCombobox />
      </Labelled>
    </div>
  );
}

export function ComboboxStates() {
  const services = useServices();
  const chosen = services[0];
  return (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <Labelled label={["Default", "افتراضي"]}>
        <ServiceCombobox />
      </Labelled>
      <Labelled label={["Filled", "معبأ"]}>
        <ServiceCombobox defaultValue={chosen} />
      </Labelled>
      <Labelled label={["Read-only", "للقراءة فقط"]}>
        <ServiceCombobox defaultValue={chosen} readOnly />
      </Labelled>
      <Labelled label={["Disabled", "معطّل"]} disabled>
        <ServiceCombobox defaultValue={chosen} disabled />
      </Labelled>
      <Labelled label={["Error", "خطأ"]} invalid error={["Choose a service.", "اختر خدمة."]}>
        <ServiceCombobox />
      </Labelled>
      <Labelled label={["Medium, filled darker", "متوسط، تعبئة أغمق"]}>
        <ServiceCombobox size="md" appearance="darker" />
      </Labelled>
    </div>
  );
}

/** The list open from the start, so the item states are visible. */
export function ComboboxOpen() {
  return (
    <div className="min-h-80 max-w-sm">
      <Labelled label={["Service", "الخدمة"]}>
        <ServiceCombobox defaultOpen />
      </Labelled>
    </div>
  );
}

export function ComboboxMultiple() {
  const services = useServices();
  const text = useComboText();
  const lang = useLanguage();
  return (
    <div className="max-w-md">
      <Labelled
        label={["Services", "الخدمات"]}
        helper={[
          "Choose several. Backspace removes the last one.",
          "اختر أكثر من خدمة. يحذف مفتاح الحذف الخلفي آخر خدمة.",
        ]}
      >
        <Combobox
          key={lang}
          multiple
          items={services}
          defaultValue={[services[0] as ComboboxOption, services[2] as ComboboxOption]}
        >
          <ComboboxControl
            placeholder={text.placeholder}
            clearLabel={text.clearLabel}
            triggerLabel={text.triggerLabel}
            removeLabel={text.removeLabel}
            removeHint={text.removeHint}
            chipsLabel={text.chipsLabel}
          />
          <ComboboxContent emptyText={text.emptyText} statusLabel={text.statusLabel} />
        </Combobox>
      </Labelled>
    </div>
  );
}

export function ComboboxGroups() {
  const cities = useCityGroups();
  const t = useBi();
  return (
    <div className="max-w-sm">
      <Labelled label={["City", "المدينة"]}>
        <ServiceCombobox items={cities} placeholder={t("Choose a city", "اختر مدينة")} />
      </Labelled>
    </div>
  );
}

export function ComboboxCreatable() {
  const services = useServices();
  const text = useComboText();
  const t = useBi();
  const [items, setItems] = useState<ComboboxOption[]>(services);
  const lang = useLanguage();
  // The sample list changes with the content language: start over.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on language only
  useEffect(() => setItems(services), [lang]);
  return (
    <div className="max-w-md">
      <Labelled
        label={["Tags", "الوسوم"]}
        helper={[
          "Type a new tag and press Enter to add it.",
          "اكتب وسمًا جديدًا واضغط Enter لإضافته.",
        ]}
      >
        <Combobox
          key={lang}
          multiple
          creatable
          items={items}
          createLabel={(query) => t(`Add "${query}"`, `إضافة «${query}»`)}
          onCreate={(label) => {
            const option = { value: `new-${label}`, label };
            setItems((current) => [...current, option]);
            return option;
          }}
        >
          <ComboboxControl
            placeholder={t("Add a tag", "أضف وسمًا")}
            clearLabel={text.clearLabel}
            triggerLabel={text.triggerLabel}
            removeLabel={text.removeLabel}
            removeHint={text.removeHint}
            chipsLabel={t("Selected tags", "الوسوم المختارة")}
          />
          <ComboboxContent emptyText={text.emptyText} statusLabel={text.statusLabel} />
        </Combobox>
      </Labelled>
    </div>
  );
}

export function ComboboxAsync() {
  const all = useServices();
  const text = useComboText();
  const [items, setItems] = useState<ComboboxOption[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const search = (query: string) => {
    clearTimeout(timer.current);
    if (!query.trim()) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(() => {
      setItems(all.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())));
      setLoading(false);
    }, 600);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <div className="max-w-sm">
      <Labelled
        label={["Service", "الخدمة"]}
        helper={[
          "The list loads from a server: results appear after a short wait.",
          "تُحمَّل القائمة من خادم: تظهر النتائج بعد انتظار قصير.",
        ]}
      >
        <Combobox items={items} filter={null} onInputValueChange={search}>
          <ComboboxControl
            placeholder={text.placeholder}
            clearLabel={text.clearLabel}
            triggerLabel={text.triggerLabel}
          />
          <ComboboxContent
            loading={loading}
            loadingText={text.loadingText}
            emptyText={text.emptyText}
            statusLabel={text.statusLabel}
          />
        </Combobox>
      </Labelled>
    </div>
  );
}

/* ------------------------------------------------------------ Command */

function useCommands(): CommandGroupData[] {
  const arabic = useLanguage() === "ar";
  return useMemo(() => {
    const o = (
      value: string,
      en: string,
      ar: string,
      extra: Partial<CommandGroupData["items"][number]> = {},
    ) => ({
      value,
      label: arabic ? ar : en,
      ...extra,
    });
    return [
      {
        label: arabic ? "الخدمات" : "Services",
        items: [
          o("renew", "Renew a licence", "تجديد رخصة", { icon: File01Icon, shortcut: "⌘R" }),
          o("pay", "Pay a fee", "سداد رسم", { icon: Calendar03Icon, shortcut: "⌘P" }),
          o("new", "Start a new request", "بدء طلب جديد", {
            icon: Add01Icon,
            keywords: ["create"],
          }),
        ],
      },
      {
        label: arabic ? "التنقل" : "Navigate",
        items: [
          o("home", "Go to the home page", "الانتقال إلى الصفحة الرئيسية", { icon: Home01Icon }),
          o("account", "My account", "حسابي", { icon: UserIcon, shortcut: "⌘A" }),
          o("settings", "Settings (unavailable)", "الإعدادات (غير متاحة)", {
            icon: Settings02Icon,
            disabled: true,
          }),
        ],
      },
    ];
  }, [arabic]);
}

function useCommandText() {
  const t = useBi();
  return {
    placeholder: t("Type a command or search…", "اكتب أمرًا أو ابحث…"),
    inputLabel: t("Search commands", "البحث في الأوامر"),
    emptyText: t("No commands found.", "لا توجد أوامر مطابقة."),
    countLabel: (n: number) =>
      n === 1 ? t("1 result", "نتيجة واحدة") : t(`${n} results`, `${n} نتائج`),
  };
}

export function CommandBasic() {
  const commands = useCommands();
  const text = useCommandText();
  const t = useBi();
  const [last, setLast] = useState<string | null>(null);
  return (
    <div className="flex max-w-md flex-col gap-3">
      <Command items={commands} {...text} onSelect={(option) => setLast(option.label)} />
      <p aria-live="polite" className="m-0 min-h-5 text-sm text-text-primary-paragraph">
        {last
          ? t(`Ran: ${last}`, `نُفّذ: ${last}`)
          : t("Press Enter on an action.", "اضغط Enter على أحد الأوامر.")}
      </p>
    </div>
  );
}

export function CommandEmpty() {
  const commands = useCommands();
  const text = useCommandText();
  const t = useBi();
  return (
    <div className="max-w-md">
      <Command items={commands} {...text} query={t("zzz", "ززز")} />
    </div>
  );
}

export function CommandDialogDemo() {
  const commands = useCommands();
  const text = useCommandText();
  const t = useBi();
  const [last, setLast] = useState<string | null>(null);
  return (
    <Stack className="items-center">
      <CommandDialog
        items={commands}
        {...text}
        title={t("Command menu", "قائمة الأوامر")}
        description={t(
          "Search for an action and press Enter to run it.",
          "ابحث عن أمر واضغط Enter لتنفيذه.",
        )}
        trigger={<Button variant="outline">{t("Open command menu", "افتح قائمة الأوامر")}</Button>}
        onSelect={(option) => setLast(option.label)}
      />
      <p aria-live="polite" className="m-0 min-h-5 text-sm text-text-primary-paragraph">
        {last ? t(`Ran: ${last}`, `نُفّذ: ${last}`) : null}
      </p>
    </Stack>
  );
}

/* ------------------------------------------------------------ Digital Stamp */

function useStampText() {
  const t = useBi();
  return {
    label: t("An official website of the Saudi government", "موقع رسمي تابع للحكومة السعودية"),
    toggleLabel: t("How to check", "كيف تتحقق"),
    domainTitle: t("Official websites end in a Saudi domain", "المواقع الرسمية تنتهي بنطاق سعودي"),
    domainText: t(
      "Check that the address of the site ends in the suffix shown here.",
      "تأكد أن عنوان الموقع ينتهي باللاحقة الظاهرة هنا.",
    ),
    httpsTitle: t("Secure websites use https", "المواقع الآمنة تستخدم https"),
    httpsText: t(
      "Look for the padlock and https:// before the address. It means the connection is encrypted.",
      "ابحث عن القفل وعن https:// قبل العنوان. فهذا يعني أن الاتصال مشفّر.",
    ),
    registrationTitle: t(
      "Registered with the Digital Government Authority",
      "مسجّل لدى هيئة الحكومة الرقمية",
    ),
    registrationText: t(
      "Government websites are registered with the Digital Government Authority.",
      "تُسجَّل المواقع الحكومية لدى هيئة الحكومة الرقمية.",
    ),
  };
}

export function DigitalStampClosed() {
  const text = useStampText();
  return (
    <div className="-m-4">
      <DigitalStamp {...text} />
    </div>
  );
}

export function DigitalStampOpen() {
  const text = useStampText();
  return (
    <div className="-m-4">
      <DigitalStamp {...text} defaultOpen />
    </div>
  );
}

const DOMAINS: DigitalStampDomain[] = ["gov.sa", "edu.sa", "med.sa", "org.sa", "sch.sa", ".sa"];

export function DigitalStampDomains() {
  const text = useStampText();
  return (
    <div className="-m-4 flex flex-col gap-px">
      {DOMAINS.map((domain) => (
        <DigitalStamp key={domain} {...text} domain={domain} defaultOpen registrationTitle={null} />
      ))}
    </div>
  );
}

export function HeaderStamp() {
  const text = useStampText();
  const t = useBi();
  return (
    <div className="-m-4">
      <Header
        stamp={<DigitalStamp {...text} />}
        logo={
          <a href="#home" className="text-lg font-bold text-text-display no-underline">
            {t("Ministry of Services", "وزارة الخدمات")}
          </a>
        }
        items={[
          { label: t("Home", "الرئيسية"), href: "#home", icon: Home01Icon, current: true },
          { label: t("Services", "الخدمات"), href: "#services", icon: File01Icon },
        ]}
        skipLabel={t("Skip to main content", "تخطَّ إلى المحتوى الرئيسي")}
        navLabel={t("Main", "الرئيسية")}
        menuLabel={t("Menu", "القائمة")}
        drawerTitle={t("Menu", "القائمة")}
        closeLabel={t("Close", "إغلاق")}
      />
    </div>
  );
}
