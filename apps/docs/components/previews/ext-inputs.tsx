"use client";

import {
  ArrowDown01Icon,
  Copy01Icon,
  FilterIcon,
  GridViewIcon,
  ListViewIcon,
  Mail01Icon,
  Search01Icon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { type ComponentType, useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/registry/bases/base/ui/button-group";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/registry/bases/base/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupKbd,
  InputGroupText,
} from "@/registry/bases/base/ui/input-group";
import { InputOTP } from "@/registry/bases/base/ui/input-otp";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/bases/base/ui/menu";
import { Slider } from "@/registry/bases/base/ui/slider";
import { Toggle } from "@/registry/bases/base/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/registry/bases/base/ui/toggle-group";
import { Bi, useBi, useLanguage } from "./bi";
import { Row, Stack } from "./kit";

/** Locale for number formatting in the preview's content language. */
function useLocale() {
  return useLanguage() === "ar" ? "ar-EG" : "en";
}

/* --------------------------------------------------------------- Slider */

export function SliderBasic() {
  const t = useBi();
  const locale = useLocale();
  return (
    <Stack className="max-w-md">
      <Slider
        size="md"
        label={t("Processing priority", "أولوية المعالجة")}
        helperText={t("Higher values are handled first.", "تُعالَج القيم الأعلى أولًا.")}
        showValue
        locale={locale}
        defaultValue={50}
      />
      <Slider
        size="sm"
        label={t("Volume", "مستوى الصوت")}
        showValue
        locale={locale}
        defaultValue={20}
      />
      <Row
        label={t("Values from the DGA spec: 0, 20, 50, 100", "قيم من مواصفة DGA: 0 و20 و50 و100")}
      >
        <div className="flex w-full flex-col gap-4">
          {[0, 20, 50, 100].map((value) => (
            <Slider
              key={value}
              aria-label={t(`Value ${value}`, `القيمة ${value.toLocaleString("ar-EG")}`)}
              locale={locale}
              defaultValue={value}
            />
          ))}
        </div>
      </Row>
    </Stack>
  );
}

export function SliderRange() {
  const t = useBi();
  const locale = useLocale();
  return (
    <Stack className="max-w-md">
      <Slider
        label={t("Fee range (SAR)", "نطاق الرسوم (ريال)")}
        helperText={t(
          "Drag either handle, or use the arrow keys.",
          "اسحب أي مقبض أو استخدم مفاتيح الأسهم.",
        )}
        showValue
        locale={locale}
        defaultValue={[20, 70]}
        thumbLabels={[
          t("Minimum fee", "الحد الأدنى للرسوم"),
          t("Maximum fee", "الحد الأقصى للرسوم"),
        ]}
      />
      <Slider
        size="sm"
        label={t("Age", "العمر")}
        showValue
        locale={locale}
        min={18}
        max={65}
        defaultValue={[25, 40]}
        thumbLabels={[t("Minimum age", "الحد الأدنى للعمر"), t("Maximum age", "الحد الأقصى للعمر")]}
      />
    </Stack>
  );
}

export function SliderStates() {
  const t = useBi();
  const locale = useLocale();
  const [value, setValue] = useState(30);
  return (
    <Stack className="max-w-md">
      <Slider
        label={t("Controlled", "متحكَّم به")}
        showValue
        locale={locale}
        value={value}
        onValueChange={setValue}
        step={10}
        largeStep={25}
        helperText={t(
          "Step 10, Page Up and Down move by 25.",
          "الخطوة 10، ومفتاحا Page Up وDown يحركان بمقدار 25.",
        )}
      />
      <Slider
        label={t("Disabled", "معطّل")}
        showValue
        locale={locale}
        disabled
        defaultValue={[20, 60]}
        thumbLabels={[t("Minimum", "الحد الأدنى"), t("Maximum", "الحد الأقصى")]}
      />
      <Slider
        label={t("With an error", "مع خطأ")}
        showValue
        locale={locale}
        defaultValue={90}
        error={t("Choose 80 or less for this service.", "اختر 80 أو أقل لهذه الخدمة.")}
      />
      <Field>
        <FieldLabel>{t("Inside a Field", "داخل حقل")}</FieldLabel>
        <Slider locale={locale} defaultValue={40} />
        <FieldDescription>
          {t("The label and helper text come from the Field.", "التسمية والنص المساعد من الحقل.")}
        </FieldDescription>
      </Field>
    </Stack>
  );
}

/* --------------------------------------------------------------- Input OTP */

export function OtpBasic() {
  const t = useBi();
  return (
    <Stack>
      <Field className="w-fit">
        <FieldLabel>{t("Verification code", "رمز التحقق")}</FieldLabel>
        <InputOTP
          aria-label={t("Verification code", "رمز التحقق")}
          slotLabel={t("Digit {index} of {length}", "الرقم {index} من {length}")}
        />
        <FieldDescription>
          {t("We sent a 6-digit code to your phone.", "أرسلنا رمزًا من 6 أرقام إلى هاتفك.")}
        </FieldDescription>
      </Field>
    </Stack>
  );
}

export function OtpGroups() {
  const t = useBi();
  const slotLabel = t("Digit {index} of {length}", "الرقم {index} من {length}");
  return (
    <Stack>
      <Row label={t("Two groups of three", "مجموعتان من ثلاثة")}>
        <InputOTP
          aria-label={t("Code", "الرمز")}
          slotLabel={slotLabel}
          groups={[3]}
          defaultValue="123"
        />
      </Row>
      <Row label={t("Four digits, medium", "أربعة أرقام، متوسط")}>
        <InputOTP
          aria-label={t("PIN", "الرقم السري")}
          slotLabel={slotLabel}
          length={4}
          size="md"
          mask
        />
      </Row>
    </Stack>
  );
}

export function OtpStates() {
  const t = useBi();
  const slotLabel = t("Digit {index} of {length}", "الرقم {index} من {length}");
  return (
    <Stack>
      <Field invalid className="w-fit">
        <FieldLabel>{t("Wrong code", "رمز خاطئ")}</FieldLabel>
        <InputOTP
          aria-label={t("Wrong code", "رمز خاطئ")}
          slotLabel={slotLabel}
          defaultValue="482915"
          invalid
        />
        <FieldError match>
          {t("The code is incorrect. Try again.", "الرمز غير صحيح. حاول مرة أخرى.")}
        </FieldError>
      </Field>
      <Field disabled className="w-fit">
        <FieldLabel>{t("Disabled", "معطّل")}</FieldLabel>
        <InputOTP
          aria-label={t("Disabled", "معطّل")}
          slotLabel={slotLabel}
          disabled
          defaultValue="12"
        />
      </Field>
      <Field className="w-fit">
        <FieldLabel>{t("Read-only", "للقراءة فقط")}</FieldLabel>
        <InputOTP
          aria-label={t("Read-only", "للقراءة فقط")}
          slotLabel={slotLabel}
          readOnly
          defaultValue="204816"
        />
      </Field>
    </Stack>
  );
}

export function OtpVerify() {
  const t = useBi();
  const [status, setStatus] = useState<"idle" | "ok">("idle");
  return (
    <Field className="w-fit">
      <FieldLabel>{t("Enter the code", "أدخل الرمز")}</FieldLabel>
      <InputOTP
        aria-label={t("Enter the code", "أدخل الرمز")}
        slotLabel={t("Digit {index} of {length}", "الرقم {index} من {length}")}
        length={4}
        groups={[2]}
        onValueChange={() => setStatus("idle")}
        onValueComplete={() => setStatus("ok")}
      />
      <p role="status" className="min-h-5 text-sm text-text-success">
        {status === "ok" ? t("Code entered. Verifying…", "تم إدخال الرمز. جارٍ التحقق…") : ""}
      </p>
    </Field>
  );
}

/* --------------------------------------------------------------- Toggle */

export function ToggleVariants() {
  const t = useBi();
  const variants = ["outline", "subtle", "transparent", "secondary"] as const;
  return (
    <Stack>
      {variants.map((variant) => (
        <Row key={variant} label={variant}>
          <Toggle variant={variant}>
            <HugeiconsIcon icon={TextBoldIcon} aria-hidden />
            {t("Bold", "عريض")}
          </Toggle>
          <Toggle variant={variant} defaultPressed>
            <HugeiconsIcon icon={TextBoldIcon} aria-hidden />
            {t("Bold", "عريض")}
          </Toggle>
          <Toggle variant={variant} disabled>
            {t("Disabled", "معطّل")}
          </Toggle>
          <Toggle variant={variant} disabled defaultPressed>
            {t("Disabled", "معطّل")}
          </Toggle>
        </Row>
      ))}
    </Stack>
  );
}

export function ToggleSizes() {
  const t = useBi();
  return (
    <Stack>
      <Row label={t("Sizes", "الأحجام")}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Toggle key={size} size={size} defaultPressed={size === "md"}>
            {t("Filters", "التصفية")}
          </Toggle>
        ))}
      </Row>
      <Row label={t("Icon only", "أيقونة فقط")}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Toggle
            key={size}
            size={size}
            iconOnly
            variant="subtle"
            aria-label={t("Italic", "مائل")}
            defaultPressed={size === "lg"}
          >
            <HugeiconsIcon icon={TextItalicIcon} aria-hidden />
          </Toggle>
        ))}
      </Row>
    </Stack>
  );
}

/* --------------------------------------------------------------- Toggle Group */

export function ToggleGroupSingle() {
  const t = useBi();
  return (
    <Stack>
      <ToggleGroup aria-label={t("Text alignment", "محاذاة النص")} defaultValue={["start"]}>
        <ToggleGroupItem
          value="start"
          iconOnly
          aria-label={t("Align to start", "محاذاة إلى البداية")}
        >
          <HugeiconsIcon icon={TextAlignLeftIcon} aria-hidden className="rtl:-scale-x-100" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" iconOnly aria-label={t("Center", "توسيط")}>
          <HugeiconsIcon icon={TextAlignCenterIcon} aria-hidden />
        </ToggleGroupItem>
        <ToggleGroupItem value="end" iconOnly aria-label={t("Align to end", "محاذاة إلى النهاية")}>
          <HugeiconsIcon icon={TextAlignRightIcon} aria-hidden className="rtl:-scale-x-100" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup aria-label={t("View", "العرض")} variant="subtle" defaultValue={["list"]}>
        <ToggleGroupItem value="list">
          <HugeiconsIcon icon={ListViewIcon} aria-hidden />
          {t("List", "قائمة")}
        </ToggleGroupItem>
        <ToggleGroupItem value="grid">
          <HugeiconsIcon icon={GridViewIcon} aria-hidden />
          {t("Grid", "شبكة")}
        </ToggleGroupItem>
        <ToggleGroupItem value="map" disabled>
          {t("Map", "خريطة")}
        </ToggleGroupItem>
      </ToggleGroup>
    </Stack>
  );
}

export function ToggleGroupMultiple() {
  const t = useBi();
  return (
    <Stack>
      <ToggleGroup
        multiple
        aria-label={t("Text style", "نمط النص")}
        defaultValue={["bold", "underline"]}
      >
        <ToggleGroupItem value="bold" iconOnly aria-label={t("Bold", "عريض")}>
          <HugeiconsIcon icon={TextBoldIcon} aria-hidden />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" iconOnly aria-label={t("Italic", "مائل")}>
          <HugeiconsIcon icon={TextItalicIcon} aria-hidden />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" iconOnly aria-label={t("Underline", "تسطير")}>
          <HugeiconsIcon icon={TextUnderlineIcon} aria-hidden />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        multiple
        attached={false}
        aria-label={t("Filters", "عوامل التصفية")}
        variant="outline"
      >
        <ToggleGroupItem value="open">{t("Open", "مفتوح")}</ToggleGroupItem>
        <ToggleGroupItem value="paid">{t("Paid", "مدفوع")}</ToggleGroupItem>
        <ToggleGroupItem value="urgent">{t("Urgent", "عاجل")}</ToggleGroupItem>
      </ToggleGroup>
    </Stack>
  );
}

export function ToggleGroupVertical() {
  const t = useBi();
  return (
    <ToggleGroup
      orientation="vertical"
      aria-label={t("Sort by", "الترتيب حسب")}
      defaultValue={["date"]}
    >
      <ToggleGroupItem value="date">{t("Date", "التاريخ")}</ToggleGroupItem>
      <ToggleGroupItem value="name">{t("Name", "الاسم")}</ToggleGroupItem>
      <ToggleGroupItem value="status">{t("Status", "الحالة")}</ToggleGroupItem>
    </ToggleGroup>
  );
}

/* --------------------------------------------------------------- Input Group */

export function InputGroupAddons() {
  const t = useBi();
  const rtl = useLanguage() === "ar";
  return (
    <Stack className="max-w-md">
      <Field>
        <FieldLabel>{t("Search", "بحث")}</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <HugeiconsIcon icon={Search01Icon} aria-hidden />
          </InputGroupAddon>
          <InputGroupInput placeholder={t("Search services", "ابحث في الخدمات")} />
          <InputGroupAddon>
            <InputGroupKbd>{rtl ? "/" : "⌘K"}</InputGroupKbd>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel>{t("Amount", "المبلغ")}</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>{t("SAR", "ر.س")}</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput inputMode="decimal" placeholder="0.00" dir="ltr" />
        </InputGroup>
        <FieldDescription>
          {t("Digits stay left to right.", "تبقى الأرقام من اليسار إلى اليمين.")}
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>{t("Mobile number", "رقم الجوال")}</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <HugeiconsIcon icon={Mail01Icon} aria-hidden />
            <InputGroupText dir="ltr">+966</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput type="tel" inputMode="numeric" placeholder="501234567" dir="ltr" />
        </InputGroup>
      </Field>
    </Stack>
  );
}

export function InputGroupButtons() {
  const t = useBi();
  return (
    <Stack className="max-w-md">
      <Field>
        <FieldLabel>{t("Request number", "رقم الطلب المرجعي")}</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>{t("Request no.", "رقم الطلب")}</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput readOnly defaultValue="48213" dir="ltr" />
          <InputGroupAddon>
            <Button size="sm" variant="subtle" iconOnly aria-label={t("Copy number", "نسخ الرقم")}>
              <HugeiconsIcon icon={Copy01Icon} aria-hidden />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel>{t("Coupon", "رمز الخصم")}</FieldLabel>
        <InputGroup size="md">
          <InputGroupInput placeholder={t("Enter a code", "أدخل الرمز")} />
          <InputGroupAddon>
            <Button size="sm" variant="primary">
              {t("Apply", "تطبيق")}
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </Stack>
  );
}

export function InputGroupStates() {
  const t = useBi();
  return (
    <Stack className="max-w-md">
      <Field invalid>
        <FieldLabel>{t("Invalid", "غير صالح")}</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>{t("SAR", "ر.س")}</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput defaultValue="-5" dir="ltr" aria-invalid />
        </InputGroup>
        <FieldError match>
          {t("Enter an amount above zero.", "أدخل مبلغًا أكبر من الصفر.")}
        </FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>{t("Disabled", "معطّل")}</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <HugeiconsIcon icon={Search01Icon} aria-hidden />
          </InputGroupAddon>
          <InputGroupInput disabled placeholder={t("Not available", "غير متاح")} />
        </InputGroup>
      </Field>
      <Row label={t("Filled darker, medium", "معبّأ أغمق، متوسط")}>
        <InputGroup size="md" appearance="darker">
          <InputGroupAddon>
            <HugeiconsIcon icon={Search01Icon} aria-hidden />
          </InputGroupAddon>
          <InputGroupInput aria-label={t("Search", "بحث")} placeholder={t("Search", "بحث")} />
        </InputGroup>
      </Row>
    </Stack>
  );
}

/* --------------------------------------------------------------- Button Group */

export function ButtonGroupBasic() {
  const t = useBi();
  return (
    <Stack>
      <ButtonGroup aria-label={t("Page actions", "إجراءات الصفحة")}>
        <Button variant="outline">{t("Save", "حفظ")}</Button>
        <Button variant="outline">{t("Print", "طباعة")}</Button>
        <Button variant="outline">{t("Share", "مشاركة")}</Button>
      </ButtonGroup>
      <ButtonGroup aria-label={t("Primary and secondary", "رئيسي وثانوي")}>
        <Button>{t("Submit", "إرسال")}</Button>
        <ButtonGroupSeparator />
        <Button variant="secondary" iconOnly aria-label={t("More options", "خيارات أخرى")}>
          <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden />
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

export function ButtonGroupParts() {
  const t = useBi();
  return (
    <Stack>
      <ButtonGroup aria-label={t("Notifications", "الإشعارات")}>
        <Button variant="outline">
          <HugeiconsIcon icon={FilterIcon} aria-hidden data-icon="inline-start" />
          {t("Filters", "التصفية")}
        </Button>
        <ButtonGroupText>{t("3 active", "3 مفعّلة")}</ButtonGroupText>
      </ButtonGroup>
      <ButtonGroup aria-label={t("Split button", "زر مقسوم")}>
        <Button variant="outline">{t("Approve", "اعتماد")}</Button>
        <Menu>
          <MenuTrigger
            render={
              <Button variant="outline" iconOnly aria-label={t("More actions", "إجراءات أخرى")} />
            }
          >
            <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden />
          </MenuTrigger>
          <MenuContent align="end">
            <MenuItem>{t("Approve and close", "اعتماد وإغلاق")}</MenuItem>
            <MenuItem>{t("Reject", "رفض")}</MenuItem>
          </MenuContent>
        </Menu>
      </ButtonGroup>
    </Stack>
  );
}

export function ButtonGroupVertical() {
  const t = useBi();
  return (
    <Row>
      <ButtonGroup orientation="vertical" aria-label={t("Zoom", "التكبير")}>
        <Button variant="outline" size="lg">
          {t("Zoom in", "تكبير")}
        </Button>
        <Button variant="outline" size="lg">
          {t("Zoom out", "تصغير")}
        </Button>
        <Button variant="outline" size="lg">
          {t("Reset", "إعادة ضبط")}
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label={t("Sizes", "الأحجام")}>
        <Button variant="secondary" size="sm">
          {t("Small", "صغير")}
        </Button>
        <Button variant="secondary" size="sm">
          {t("Small", "صغير")}
        </Button>
      </ButtonGroup>
    </Row>
  );
}

export const inputsPreviews = {
  "slider-basic": SliderBasic,
  "slider-range": SliderRange,
  "slider-states": SliderStates,
  "input-otp-basic": OtpBasic,
  "input-otp-groups": OtpGroups,
  "input-otp-states": OtpStates,
  "input-otp-verify": OtpVerify,
  "toggle-variants": ToggleVariants,
  "toggle-sizes": ToggleSizes,
  "toggle-group-single": ToggleGroupSingle,
  "toggle-group-multiple": ToggleGroupMultiple,
  "toggle-group-vertical": ToggleGroupVertical,
  "input-group-addons": InputGroupAddons,
  "input-group-buttons": InputGroupButtons,
  "input-group-states": InputGroupStates,
  "button-group-basic": ButtonGroupBasic,
  "button-group-parts": ButtonGroupParts,
  "button-group-vertical": ButtonGroupVertical,
} satisfies Record<string, ComponentType>;
