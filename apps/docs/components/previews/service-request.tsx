"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";
import { Checkbox } from "@/registry/bases/base/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldItem,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/bases/base/ui/field";
import { FileUpload } from "@/registry/bases/base/ui/file-upload";
import { Input } from "@/registry/bases/base/ui/input";
import { Radio, RadioGroup } from "@/registry/bases/base/ui/radio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/base/ui/select";
import { Switch } from "@/registry/bases/base/ui/switch";
import { Textarea } from "@/registry/bases/base/ui/textarea";
import { Bi, useDirection } from "./bi";

type Errors = Partial<Record<"name" | "id" | "service" | "details" | "consent", boolean>>;

/**
 * A citizen service request built only from Field-based controls. In Arabic every digit is an
 * Arabic-Indic digit (citizen-facing sample content) and there is no Western technical value
 * in the view; in English every digit is Western.
 */
export function ServiceRequestForm() {
  const rtl = useDirection() === "rtl";
  const [errors, setErrors] = useState<Errors>({ id: true });
  const [sent, setSent] = useState(false);
  const services = [
    { value: "issue", label: rtl ? "إصدار رخصة بناء" : "Issue a building permit" },
    { value: "renew", label: rtl ? "تجديد رخصة بناء" : "Renew a building permit" },
    { value: "amend", label: rtl ? "تعديل بيانات رخصة" : "Amend permit details" },
  ];
  const ID_PATTERN = rtl ? /^[٠-٩]{10}$/ : /^\d{10}$/;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {
      name: !String(data.get("name") ?? "").trim(),
      id: !ID_PATTERN.test(String(data.get("id") ?? "").trim()),
      service: !data.get("service"),
      details: !String(data.get("details") ?? "").trim(),
      consent: data.get("consent") !== "on",
    };
    const failed = Object.fromEntries(Object.entries(next).filter(([, v]) => v)) as Errors;
    setErrors(failed);
    setSent(Object.keys(failed).length === 0);
  }

  return (
    <form
      key={rtl ? "ar" : "en"}
      noValidate
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-md border border-border-neutral-secondary bg-background-card p-6"
    >
      <div className="flex flex-col gap-1">
        <h3 className="m-0 text-xl font-semibold text-text-display">
          <Bi en="Building permit request" ar="طلب رخصة بناء" />
        </h3>
        <p className="m-0 text-sm text-text-secondary-paragraph">
          <Bi en="Fields marked * are required." ar="الحقول المعلّمة بعلامة * مطلوبة." />
        </p>
      </div>
      <FieldGroup>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="name" invalid={errors.name}>
            <FieldLabel required>
              <Bi en="Full name" ar="الاسم الكامل" />
            </FieldLabel>
            <Input
              required
              autoComplete="name"
              defaultValue={rtl ? "نورة القحطاني" : "Noura Al-Qahtani"}
            />
            <FieldError match={errors.name}>
              <Bi en="Enter your full name." ar="أدخل اسمك الكامل." />
            </FieldError>
          </Field>
          <Field name="id" invalid={errors.id}>
            <FieldLabel required>
              <Bi en="National ID" ar="رقم الهوية الوطنية" />
            </FieldLabel>
            <Input
              required
              inputMode="numeric"
              defaultValue={rtl ? "١٢٣٤٥" : "12345"}
              onChange={() => setErrors((e) => ({ ...e, id: false }))}
            />
            <FieldDescription>
              <Bi en="10 digits, starting with 1 or 2." ar="١٠ أرقام تبدأ بالرقم ١ أو ٢." />
            </FieldDescription>
            <FieldError match={errors.id}>
              <Bi
                en="The National ID must be 10 digits."
                ar="يجب أن يتكون رقم الهوية الوطنية من ١٠ أرقام."
              />
            </FieldError>
          </Field>
        </div>
        <Field name="service" invalid={errors.service}>
          <FieldLabel required>
            <Bi en="Service" ar="الخدمة" />
          </FieldLabel>
          <Select items={services} required>
            <SelectTrigger>
              <SelectValue placeholder={rtl ? "اختر خدمة" : "Choose a service"} />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError match={errors.service}>
            <Bi en="Choose a service." ar="اختر خدمة." />
          </FieldError>
        </Field>
        <Field name="details" invalid={errors.details}>
          <FieldLabel required>
            <Bi en="Request details" ar="تفاصيل الطلب" />
          </FieldLabel>
          <Textarea required rows={3} />
          <FieldDescription>
            <Bi en="Include the plot number and the street." ar="اذكر رقم القطعة واسم الشارع." />
          </FieldDescription>
          <FieldError match={errors.details}>
            <Bi en="Describe your request." ar="صف طلبك." />
          </FieldError>
        </Field>
        <Field name="contact">
          <FieldSet render={<RadioGroup defaultValue="sms" />}>
            <FieldLegend optional optionalLabel={rtl ? "اختياري" : "Optional"}>
              <Bi en="Preferred contact" ar="وسيلة التواصل المفضلة" />
            </FieldLegend>
            {[
              { value: "sms", en: "Text message", ar: "رسالة نصية" },
              { value: "email", en: "Email", ar: "البريد الإلكتروني" },
            ].map((o) => (
              <FieldItem key={o.value}>
                <FieldLabel>
                  <Radio value={o.value} />
                  <Bi en={o.en} ar={o.ar} />
                </FieldLabel>
              </FieldItem>
            ))}
          </FieldSet>
        </Field>
        <Field name="documents">
          <FieldLabel optional optionalLabel={rtl ? "اختياري" : "Optional"}>
            <Bi en="Supporting documents" ar="المستندات الداعمة" />
          </FieldLabel>
          <FileUpload
            accept=".pdf,.jpg,.png"
            hint={
              <Bi
                en="PDF, JPG or PNG, up to 5 MB each."
                ar="PDF أو JPG أو PNG، حتى ٥ ميغابايت للملف."
              />
            }
            messages={{
              drop: rtl
                ? "اسحب الملفات وأفلتها هنا، أو اختر ملفات"
                : "Drag files here, or choose files",
              dropping: rtl ? "أفلت الملفات لإضافتها" : "Drop the files to add them",
            }}
          />
        </Field>
        <Field orientation="horizontal" className="items-center justify-between">
          <FieldContent>
            <FieldLabel>
              <Bi en="Send me updates about this request" ar="أرسل لي تحديثات عن هذا الطلب" />
            </FieldLabel>
          </FieldContent>
          <Switch name="updates" defaultChecked />
        </Field>
        <Field orientation="horizontal" name="consent" invalid={errors.consent}>
          <Checkbox name="consent" required />
          <FieldContent>
            <FieldLabel>
              <Bi en="I confirm that the information is correct" ar="أقرّ بأن المعلومات صحيحة" />
            </FieldLabel>
            <FieldError match={errors.consent}>
              <Bi en="You must confirm to continue." ar="يجب الإقرار للمتابعة." />
            </FieldError>
          </FieldContent>
        </Field>
      </FieldGroup>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">
          <Bi en="Submit request" ar="إرسال الطلب" />
        </Button>
        <Button
          type="reset"
          variant="outline"
          onClick={() => {
            setErrors({});
            setSent(false);
          }}
        >
          <Bi en="Cancel" ar="إلغاء" />
        </Button>
        {sent ? (
          <p role="status" className="m-0 text-sm text-text-success">
            <Bi en="Request submitted." ar="تم إرسال الطلب." />
          </p>
        ) : null}
      </div>
    </form>
  );
}
