"use client";

import { Mail01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Checkbox } from "@/registry/bases/base/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/bases/base/ui/field";
import { FileUpload, type UploadFile } from "@/registry/bases/base/ui/file-upload";
import { Input } from "@/registry/bases/base/ui/input";
import { NumberInput } from "@/registry/bases/base/ui/number-input";
import { Radio, RadioGroup } from "@/registry/bases/base/ui/radio";
import { SearchBox } from "@/registry/bases/base/ui/search-box";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/base/ui/select";
import { Switch } from "@/registry/bases/base/ui/switch";
import { Textarea } from "@/registry/bases/base/ui/textarea";
import { Bi, useDirection } from "./bi";
import { Row, Stack } from "./kit";

/** Text for the components' own labels (they take them as props), by page direction. */
export function useFormText() {
  const rtl = useDirection() === "rtl";
  return {
    optional: rtl ? "اختياري" : "Optional",
    clear: rtl ? "مسح البحث" : "Clear search",
    decrease: rtl ? "إنقاص" : "Decrease",
    increase: rtl ? "زيادة" : "Increase",
    drop: rtl ? "اسحب الملفات وأفلتها هنا، أو اختر ملفات" : "Drag files here, or choose files",
    dropping: rtl ? "أفلت الملفات لإضافتها" : "Drop the files to add them",
    done: rtl ? "تم الرفع" : "Uploaded",
    uploading: rtl ? "جارٍ الرفع" : "Uploading",
    remove: (name: string) => (rtl ? `إزالة ${name}` : `Remove ${name}`),
    rejected: {
      type: rtl ? "نوع الملف غير مقبول." : "This file type is not accepted.",
      size: rtl ? "حجم الملف أكبر من المسموح." : "This file is too large.",
      count: rtl ? "عدد الملفات أكبر من المسموح." : "Too many files.",
    },
    rtl,
  };
}

const NAME = { en: "Noura Al-Qahtani", ar: "نورة القحطاني" };

/** A single labelled field. */
function Labelled({
  label,
  helper,
  error,
  required,
  optional,
  children,
  invalid,
  disabled,
}: {
  label: [string, string];
  helper?: [string, string];
  error?: [string, string];
  required?: boolean;
  optional?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const text = useFormText();
  return (
    <Field invalid={invalid} disabled={disabled}>
      <FieldLabel required={required} optional={optional} optionalLabel={text.optional}>
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

/* ---------------------------------------------------------------- Field */

export function FieldAnatomy() {
  return (
    <Stack className="max-w-sm">
      <Labelled
        label={["Full name", "الاسم الكامل"]}
        helper={["As it appears on your national ID.", "كما يظهر في بطاقة الهوية الوطنية."]}
        required
      >
        <Input name="name" required defaultValue="" placeholder={NAME.en} />
      </Labelled>
      <Labelled
        label={["Job title", "المسمى الوظيفي"]}
        helper={["Leave this empty if you are not employed.", "اتركه فارغًا إن لم تكن موظفًا."]}
        optional
      >
        <Input name="title" />
      </Labelled>
      <Labelled
        label={["National ID", "رقم الهوية الوطنية"]}
        error={[
          "The National ID must be 10 digits.",
          "يجب أن يتكون رقم الهوية الوطنية من 10 أرقام.",
        ]}
        invalid
        required
      >
        <Input name="id" inputMode="numeric" defaultValue="" />
      </Labelled>
    </Stack>
  );
}

/* ---------------------------------------------------------------- Input */

export function InputSizes() {
  return (
    <Stack className="max-w-sm">
      <Labelled label={["Large (40px)", "كبير (40px)"]}>
        <Input size="lg" placeholder="Placeholder" />
      </Labelled>
      <Labelled label={["Medium (32px)", "متوسط (32px)"]}>
        <Input size="md" placeholder="Placeholder" />
      </Labelled>
    </Stack>
  );
}

export function InputStates() {
  const rtl = useFormText().rtl;
  const name = rtl ? NAME.ar : NAME.en;
  return (
    <div key={rtl ? "ar" : "en"} className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <Labelled label={["Default", "افتراضي"]}>
        <Input placeholder={rtl ? "نص تلميحي" : "Placeholder"} />
      </Labelled>
      <Labelled label={["Filled", "معبأ"]}>
        <Input defaultValue={name} />
      </Labelled>
      <Labelled label={["Read-only", "للقراءة فقط"]}>
        <Input readOnly defaultValue={name} />
      </Labelled>
      <Labelled label={["Disabled", "معطّل"]} disabled>
        <Input disabled defaultValue={name} />
      </Labelled>
      <Labelled
        label={["Error", "خطأ"]}
        invalid
        error={["Enter your full name.", "أدخل اسمك الكامل."]}
      >
        <Input />
      </Labelled>
      <Labelled label={["Filled darker", "تعبئة أغمق"]}>
        <Input appearance="darker" placeholder={rtl ? "نص تلميحي" : "Placeholder"} />
      </Labelled>
      <Labelled label={["Filled lighter", "تعبئة أفتح"]}>
        <Input appearance="lighter" placeholder={rtl ? "نص تلميحي" : "Placeholder"} />
      </Labelled>
    </div>
  );
}

export function InputAdornments() {
  return (
    <Stack className="max-w-sm">
      <Labelled label={["Mobile number", "رقم الجوال"]}>
        <Input
          type="tel"
          inputMode="tel"
          dir="ltr"
          placeholder="5X XXX XXXX"
          startAdornment={<bdi dir="ltr">+966</bdi>}
        />
      </Labelled>
      <Labelled label={["Email", "البريد الإلكتروني"]}>
        <Input
          type="email"
          startAdornment={<HugeiconsIcon icon={Mail01Icon} aria-hidden />}
          placeholder="name@example.gov.sa"
          dir="ltr"
        />
      </Labelled>
      <Labelled label={["Username", "اسم المستخدم"]}>
        <Input endAdornment={<HugeiconsIcon icon={UserIcon} aria-hidden />} />
      </Labelled>
    </Stack>
  );
}

/* ------------------------------------------------------------- Textarea */

export function TextareaStates() {
  const text = useFormText();
  const sample = text.rtl
    ? "أحتاج إلى تجديد رخصة البناء الخاصة بالمبنى."
    : "I need to renew the building permit for my property.";
  return (
    <div key={text.rtl ? "ar" : "en"} className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <Labelled label={["Default", "افتراضي"]} helper={["Up to 500 characters.", "حتى 500 حرف."]}>
        <Textarea placeholder={text.rtl ? "اكتب هنا" : "Write here"} />
      </Labelled>
      <Labelled label={["Filled", "معبأ"]}>
        <Textarea defaultValue={sample} />
      </Labelled>
      <Labelled label={["Read-only", "للقراءة فقط"]}>
        <Textarea readOnly defaultValue={sample} />
      </Labelled>
      <Labelled label={["Disabled", "معطّل"]} disabled>
        <Textarea disabled defaultValue={sample} />
      </Labelled>
      <Labelled label={["Error", "خطأ"]} invalid error={["Describe your request.", "صف طلبك."]}>
        <Textarea />
      </Labelled>
      <Labelled label={["Filled darker, no resize", "تعبئة أغمق، بلا تغيير حجم"]}>
        <Textarea
          appearance="darker"
          resize="none"
          placeholder={text.rtl ? "اكتب هنا" : "Write here"}
        />
      </Labelled>
    </div>
  );
}

/* --------------------------------------------------------------- Select */

const SERVICES = [
  { value: "issue", en: "Issue a licence", ar: "إصدار رخصة" },
  { value: "renew", en: "Renew a licence", ar: "تجديد رخصة" },
  { value: "cancel", en: "Cancel a licence", ar: "إلغاء رخصة" },
  { value: "amend", en: "Amend licence details", ar: "تعديل بيانات الرخصة" },
];

function ServiceSelect({
  size,
  appearance,
  disabled,
  readOnly,
  defaultValue,
  placeholder,
}: {
  size?: "md" | "lg";
  appearance?: "default" | "lighter" | "darker";
  disabled?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  const rtl = useFormText().rtl;
  const items = SERVICES.map((s) => ({ value: s.value, label: rtl ? s.ar : s.en }));
  return (
    <Select items={items} defaultValue={defaultValue} disabled={disabled} readOnly={readOnly}>
      <SelectTrigger size={size} appearance={appearance}>
        <SelectValue placeholder={placeholder ?? (rtl ? "اختر خدمة" : "Choose a service")} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function SelectBasic() {
  return (
    <div className="max-w-sm">
      <Labelled
        label={["Service", "الخدمة"]}
        helper={["Choose what you need.", "اختر ما تحتاج إليه."]}
      >
        <ServiceSelect />
      </Labelled>
    </div>
  );
}

export function SelectStates() {
  return (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <Labelled label={["Default", "افتراضي"]}>
        <ServiceSelect />
      </Labelled>
      <Labelled label={["Filled", "معبأ"]}>
        <ServiceSelect defaultValue="renew" />
      </Labelled>
      <Labelled label={["Read-only", "للقراءة فقط"]}>
        <ServiceSelect defaultValue="renew" readOnly />
      </Labelled>
      <Labelled label={["Disabled", "معطّل"]} disabled>
        <ServiceSelect defaultValue="renew" disabled />
      </Labelled>
      <Labelled label={["Error", "خطأ"]} invalid error={["Choose a service.", "اختر خدمة."]}>
        <ServiceSelect />
      </Labelled>
      <Labelled label={["Medium, filled darker", "متوسط، تعبئة أغمق"]}>
        <ServiceSelect size="md" appearance="darker" />
      </Labelled>
    </div>
  );
}

export function SelectGroups() {
  const rtl = useFormText().rtl;
  const groups = [
    {
      en: "Riyadh Region",
      ar: "منطقة الرياض",
      items: [
        { value: "riyadh", en: "Riyadh", ar: "الرياض" },
        { value: "kharj", en: "Al Kharj", ar: "الخرج" },
      ],
    },
    {
      en: "Makkah Region",
      ar: "منطقة مكة المكرمة",
      items: [
        { value: "makkah", en: "Makkah", ar: "مكة المكرمة" },
        { value: "jeddah", en: "Jeddah", ar: "جدة" },
      ],
    },
  ];
  return (
    <div className="max-w-sm">
      <Labelled label={["City", "المدينة"]}>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={rtl ? "اختر مدينة" : "Choose a city"} />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group, i) => (
              <SelectGroup key={group.en}>
                {i > 0 ? <SelectSeparator /> : null}
                <SelectLabel>{rtl ? group.ar : group.en}</SelectLabel>
                {group.items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {rtl ? item.ar : item.en}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </Labelled>
    </div>
  );
}

/* ---------------------------------------------------------- Number Input */

export function NumberInputDemo() {
  const text = useFormText();
  return (
    <Stack className="max-w-sm">
      <Labelled
        label={["Quantity", "الكمية"]}
        helper={[
          "Between 1 and 10. Type digits in any numeral system.",
          "بين 1 و10. اكتب الأرقام بأي نظام أرقام.",
        ]}
      >
        <NumberInput
          defaultValue={1}
          min={1}
          max={10}
          decrementLabel={text.decrease}
          incrementLabel={text.increase}
        />
      </Labelled>
      <Labelled label={["Without buttons", "بلا أزرار"]}>
        <NumberInput hideSteppers placeholder="0" />
      </Labelled>
    </Stack>
  );
}

export function NumberInputStates() {
  const text = useFormText();
  const labels = { decrementLabel: text.decrease, incrementLabel: text.increase };
  return (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <Labelled label={["Default", "افتراضي"]}>
        <NumberInput placeholder="0" {...labels} />
      </Labelled>
      <Labelled label={["Filled", "معبأ"]}>
        <NumberInput defaultValue={1250.5} {...labels} />
      </Labelled>
      <Labelled label={["Read-only", "للقراءة فقط"]}>
        <NumberInput readOnly defaultValue={3} {...labels} />
      </Labelled>
      <Labelled label={["Disabled", "معطّل"]} disabled>
        <NumberInput disabled defaultValue={3} {...labels} />
      </Labelled>
      <Labelled label={["Error", "خطأ"]} invalid error={["Enter a quantity.", "أدخل الكمية."]}>
        <NumberInput {...labels} />
      </Labelled>
      <Labelled label={["Medium, filled darker", "متوسط، تعبئة أغمق"]}>
        <NumberInput size="md" appearance="darker" defaultValue={2} {...labels} />
      </Labelled>
    </div>
  );
}

/* ------------------------------------------------------------ Search Box */

export function SearchBoxDemo() {
  const text = useFormText();
  const [value, setValue] = useState("");
  return (
    <Stack className="max-w-sm">
      <Labelled label={["Search services", "البحث في الخدمات"]}>
        <SearchBox
          value={value}
          onValueChange={setValue}
          clearLabel={text.clear}
          placeholder={text.rtl ? "ابحث في الخدمات" : "Search services"}
        />
      </Labelled>
      <p className="text-sm text-text-secondary-paragraph">
        <Bi en="Type to show the clear button." ar="اكتب لإظهار زر المسح." />
      </p>
    </Stack>
  );
}

export function SearchBoxStates() {
  const text = useFormText();
  const placeholder = text.rtl ? "ابحث" : "Search";
  return (
    <div key={text.rtl ? "ar" : "en"} className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <Labelled label={["Default", "افتراضي"]}>
        <SearchBox placeholder={placeholder} clearLabel={text.clear} />
      </Labelled>
      <Labelled label={["Filled, with clear button", "معبأ، مع زر المسح"]}>
        <SearchBox
          defaultValue={text.rtl ? "تجديد رخصة" : "Licence renewal"}
          clearLabel={text.clear}
        />
      </Labelled>
      <Labelled label={["Read-only", "للقراءة فقط"]}>
        <SearchBox readOnly defaultValue={text.rtl ? "تجديد رخصة" : "Licence renewal"} />
      </Labelled>
      <Labelled label={["Disabled", "معطّل"]} disabled>
        <SearchBox disabled placeholder={placeholder} />
      </Labelled>
      <Labelled label={["Medium, filled darker", "متوسط، تعبئة أغمق"]}>
        <SearchBox size="md" appearance="darker" placeholder={placeholder} />
      </Labelled>
    </div>
  );
}

/* ------------------------------------------------------------- Checkbox */

function CheckRow({
  label,
  helper,
  error,
  children,
  invalid,
  disabled,
}: {
  label: [string, string];
  helper?: [string, string];
  error?: [string, string];
  children: React.ReactNode;
  invalid?: boolean;
  disabled?: boolean;
}) {
  return (
    <Field orientation="horizontal" invalid={invalid} disabled={disabled}>
      {children}
      <FieldContent>
        <FieldLabel>
          <Bi en={label[0]} ar={label[1]} />
        </FieldLabel>
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
      </FieldContent>
    </Field>
  );
}

export function CheckboxStates() {
  return (
    <div className="grid max-w-3xl gap-x-6 gap-y-4 sm:grid-cols-2">
      <CheckRow label={["Unchecked", "غير محدد"]}>
        <Checkbox />
      </CheckRow>
      <CheckRow label={["Checked", "محدد"]} helper={["Helper text.", "نص مساعد."]}>
        <Checkbox defaultChecked />
      </CheckRow>
      <CheckRow label={["Indeterminate", "محدد جزئيًا"]}>
        <Checkbox indeterminate />
      </CheckRow>
      <CheckRow label={["Read-only", "للقراءة فقط"]}>
        <Checkbox readOnly defaultChecked />
      </CheckRow>
      <CheckRow label={["Disabled", "معطّل"]} disabled>
        <Checkbox disabled />
      </CheckRow>
      <CheckRow label={["Disabled, checked", "معطّل ومحدد"]} disabled>
        <Checkbox disabled defaultChecked />
      </CheckRow>
      <CheckRow
        label={["I agree to the terms", "أوافق على الشروط"]}
        invalid
        error={["You must agree to continue.", "يجب الموافقة للمتابعة."]}
      >
        <Checkbox />
      </CheckRow>
      <CheckRow label={["Neutral style", "النمط المحايد"]}>
        <Checkbox tone="neutral" defaultChecked />
      </CheckRow>
    </div>
  );
}

export function CheckboxSizes() {
  return (
    <Row>
      {(["md", "sm", "xs"] as const).map((size) => (
        <Field key={size} orientation="horizontal" className="w-auto">
          <Checkbox size={size} defaultChecked />
          <FieldContent>
            <FieldLabel>{size === "md" ? "24px" : size === "sm" ? "20px" : "16px"}</FieldLabel>
          </FieldContent>
        </Field>
      ))}
    </Row>
  );
}

export function CheckboxGroupDemo() {
  const options = [
    { value: "sms", en: "Text message", ar: "رسالة نصية" },
    { value: "email", en: "Email", ar: "بريد إلكتروني" },
    { value: "app", en: "App notification", ar: "إشعار في التطبيق" },
  ];
  const [checked, setChecked] = useState<string[]>(["email"]);
  const all = checked.length === options.length;
  const none = checked.length === 0;
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend>
        <Bi en="Notify me by" ar="أبلغني عبر" />
      </FieldLegend>
      <Field orientation="horizontal">
        <Checkbox
          checked={all}
          indeterminate={!all && !none}
          onCheckedChange={(next) => setChecked(next ? options.map((o) => o.value) : [])}
        />
        <FieldContent>
          <FieldLabel>
            <Bi en="All channels" ar="كل القنوات" />
          </FieldLabel>
        </FieldContent>
      </Field>
      <div className="flex flex-col gap-3 ps-9">
        {options.map((option) => (
          <Field key={option.value} orientation="horizontal">
            <Checkbox
              checked={checked.includes(option.value)}
              onCheckedChange={(next) =>
                setChecked((current) =>
                  next ? [...current, option.value] : current.filter((v) => v !== option.value),
                )
              }
            />
            <FieldContent>
              <FieldLabel>
                <Bi en={option.en} ar={option.ar} />
              </FieldLabel>
            </FieldContent>
          </Field>
        ))}
      </div>
    </FieldSet>
  );
}

/* ---------------------------------------------------------------- Radio */

export function RadioGroupDemo() {
  return (
    <Field className="max-w-sm">
      <FieldSet render={<RadioGroup defaultValue="email" />}>
        <FieldLegend>
          <Bi en="Preferred contact" ar="وسيلة التواصل المفضلة" />
        </FieldLegend>
        <FieldItem>
          <FieldLabel>
            <Radio value="sms" />
            <Bi en="Text message" ar="رسالة نصية" />
          </FieldLabel>
          <FieldDescription>
            <Bi en="Sent to your registered mobile number." ar="تُرسل إلى رقم جوالك المسجل." />
          </FieldDescription>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Radio value="email" />
            <Bi en="Email" ar="البريد الإلكتروني" />
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Radio value="call" />
            <Bi en="Phone call" ar="مكالمة هاتفية" />
          </FieldLabel>
        </FieldItem>
      </FieldSet>
    </Field>
  );
}

function RadioItem({
  value,
  label,
  ...props
}: { value: string; label: [string, string] } & Partial<React.ComponentProps<typeof Radio>>) {
  return (
    <FieldItem>
      <FieldLabel>
        <Radio value={value} {...props} />
        <Bi en={label[0]} ar={label[1]} />
      </FieldLabel>
    </FieldItem>
  );
}

export function RadioStates() {
  return (
    <Field className="max-w-3xl">
      <div className="grid gap-6 sm:grid-cols-2">
        <RadioGroup defaultValue="on" aria-label="States">
          <RadioItem value="off" label={["Unselected", "غير محدد"]} />
          <RadioItem value="on" label={["Selected", "محدد"]} />
        </RadioGroup>
        <RadioGroup defaultValue="on" aria-label="Neutral">
          <RadioItem
            value="off"
            label={["Neutral, unselected", "محايد، غير محدد"]}
            tone="neutral"
          />
          <RadioItem value="on" label={["Neutral, selected", "محايد، محدد"]} tone="neutral" />
        </RadioGroup>
        <RadioGroup defaultValue="on" readOnly aria-label="Read-only">
          <RadioItem value="off" label={["Read-only", "للقراءة فقط"]} />
          <RadioItem value="on" label={["Read-only, selected", "للقراءة فقط، محدد"]} />
        </RadioGroup>
        <RadioGroup defaultValue="on" disabled aria-label="Disabled">
          <RadioItem value="off" label={["Disabled", "معطّل"]} />
          <RadioItem value="on" label={["Disabled, selected", "معطّل ومحدد"]} />
        </RadioGroup>
      </div>
    </Field>
  );
}

/* --------------------------------------------------------------- Switch */

export function SwitchStates() {
  return (
    <div className="grid max-w-3xl gap-x-6 gap-y-4 sm:grid-cols-2">
      <CheckRow label={["Off", "متوقف"]}>
        <Switch />
      </CheckRow>
      <CheckRow label={["On", "قيد التشغيل"]} helper={["Helper text.", "نص مساعد."]}>
        <Switch defaultChecked />
      </CheckRow>
      <CheckRow label={["With check icon", "مع أيقونة"]}>
        <Switch defaultChecked icon />
      </CheckRow>
      <CheckRow label={["Read-only", "للقراءة فقط"]}>
        <Switch readOnly defaultChecked />
      </CheckRow>
      <CheckRow label={["Disabled", "معطّل"]} disabled>
        <Switch disabled />
      </CheckRow>
      <CheckRow label={["Disabled, on", "معطّل وقيد التشغيل"]} disabled>
        <Switch disabled defaultChecked />
      </CheckRow>
      <CheckRow
        label={["Accept the agreement", "قبول الاتفاقية"]}
        invalid
        error={["Turn this on to continue.", "فعّل هذا الخيار للمتابعة."]}
      >
        <Switch />
      </CheckRow>
    </div>
  );
}

export function SwitchTrailing() {
  return (
    <FieldSet className="max-w-sm gap-4">
      <FieldLegend>
        <Bi en="Notifications" ar="الإشعارات" />
      </FieldLegend>
      {[
        { en: "Request updates", ar: "تحديثات الطلب", on: true },
        { en: "Reminders", ar: "التذكيرات", on: false },
      ].map((row) => (
        <Field key={row.en} orientation="horizontal" className="items-center justify-between">
          <FieldContent>
            <FieldLabel>
              <Bi en={row.en} ar={row.ar} />
            </FieldLabel>
          </FieldContent>
          <Switch defaultChecked={row.on} />
        </Field>
      ))}
    </FieldSet>
  );
}

/* ---------------------------------------------------------- File Upload */

function useUploadMessages() {
  const t = useFormText();
  return {
    drop: t.drop,
    dropping: t.dropping,
    done: t.done,
    uploading: t.uploading,
    remove: t.remove,
    rejected: t.rejected,
  };
}

export function FileUploadDemo() {
  const messages = useUploadMessages();
  return (
    <div className="max-w-lg">
      <Labelled
        label={["Supporting documents", "المستندات الداعمة"]}
        helper={["PDF, JPG or PNG, up to 5 MB each.", "PDF أو JPG أو PNG، بحد أقصى 5 MB للملف."]}
      >
        <FileUpload
          accept=".pdf,.jpg,.jpeg,.png"
          maxSize={5 * 1024 * 1024}
          maxFiles={3}
          messages={messages}
        />
      </Labelled>
    </div>
  );
}

export function FileUploadStates() {
  const messages = useUploadMessages();
  const rtl = useFormText().rtl;
  const files: UploadFile[] = [
    {
      id: "1",
      name: rtl ? "عقد الإيجار.pdf" : "lease-contract.pdf",
      size: 2_400_000,
      status: "done",
    },
    {
      id: "2",
      name: rtl ? "صورة الهوية.jpg" : "id-photo.jpg",
      size: 3_100_000,
      status: "uploading",
      progress: 64,
    },
    {
      id: "3",
      name: rtl ? "مخطط الموقع.dwg" : "site-plan.dwg",
      size: 800_000,
      status: "error",
      error: messages.rejected.type,
    },
    { id: "4", name: rtl ? "طلب.pdf" : "request.pdf", size: 120_000, status: "pending" },
  ];
  return (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Labelled
          label={[
            "File list: done, uploading, error, pending",
            "قائمة الملفات: تم، جارٍ الرفع، خطأ، بانتظار الرفع",
          ]}
        >
          <FileUpload files={files} messages={messages} />
        </Labelled>
      </div>
      <Labelled label={["Disabled", "معطّل"]} disabled>
        <FileUpload disabled messages={messages} />
      </Labelled>
      <Labelled
        label={["Error", "خطأ"]}
        invalid
        error={["Attach at least one document.", "أرفق مستندًا واحدًا على الأقل."]}
      >
        <FileUpload messages={messages} />
      </Labelled>
    </div>
  );
}
