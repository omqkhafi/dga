"use client";

import { type ReactNode, useState } from "react";
import type { PhoneDetails } from "@/lib/dga/phone";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/registry/bases/base/ui/field";
import { PhoneInput, type PhoneInputProps } from "@/registry/bases/base/ui/phone-input";
import { Bi, useBi, useLanguage } from "./bi";

/** The labels a phone input needs, by content language. */
function usePhoneText() {
  const t = useBi();
  const locale = useLanguage();
  return {
    locale,
    countryLabel: (country: string) =>
      t(`Country calling code, ${country}`, `مفتاح الدولة، ${country}`),
    searchPlaceholder: t("Search country or code", "ابحث عن دولة أو مفتاح"),
    emptyText: t("No countries found.", "لا توجد دول مطابقة."),
    preferredLabel: t("Suggested", "مقترحة"),
    allLabel: t("All countries", "كل الدول"),
    statusLabel: (n: number) =>
      n === 1 ? t("1 country", "دولة واحدة") : t(`${n} countries`, `${n} دول`),
  };
}

/** A phone input with the labels already wired. */
function Phone(props: PhoneInputProps) {
  const text = usePhoneText();
  return <PhoneInput {...text} {...props} />;
}

type Pair = [string, string];

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

export function PhoneBasic() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Labelled
        label={["Mobile number", "رقم الجوال"]}
        helper={["We send the verification code here.", "نرسل رمز التحقق إلى هذا الرقم."]}
      >
        <Phone name="mobile" defaultCountry="SA" />
      </Labelled>
    </div>
  );
}

export function PhoneStates() {
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <Labelled label={["Default", "افتراضي"]}>
        <Phone />
      </Labelled>
      <Labelled label={["Filled", "معبأ"]}>
        <Phone defaultValue="+966512345678" />
      </Labelled>
      <Labelled label={["Read-only", "للقراءة فقط"]}>
        <Phone defaultValue="+966512345678" readOnly />
      </Labelled>
      <Labelled label={["Disabled", "معطّل"]} disabled>
        <Phone defaultValue="+966512345678" disabled />
      </Labelled>
      <Labelled
        label={["Error", "خطأ"]}
        invalid
        error={["Enter a valid mobile number.", "أدخل رقم جوال صحيحًا."]}
      >
        <Phone defaultValue="+96651234" invalid />
      </Labelled>
      <Labelled label={["Medium, filled darker", "متوسط، تعبئة أغمق"]}>
        <Phone size="md" appearance="darker" />
      </Labelled>
    </div>
  );
}

export function PhoneOpen() {
  return (
    <div className="mx-auto min-h-96 w-full max-w-md">
      <Labelled label={["Mobile number", "رقم الجوال"]}>
        <Phone defaultOpen defaultValue="+966512345678" />
      </Labelled>
    </div>
  );
}

export function PhoneCountries() {
  const t = useBi();
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <Labelled
        label={["Gulf countries only", "دول الخليج فقط"]}
        helper={["onlyCountries offers six countries.", "تعرض onlyCountries ست دول فقط."]}
      >
        <Phone
          onlyCountries={["SA", "AE", "KW", "QA", "BH", "OM"]}
          aria-label={t("Gulf", "الخليج")}
        />
      </Labelled>
      <Labelled
        label={["Without some countries", "من دون بعض الدول"]}
        helper={[
          "excludeCountries removes the United States and Canada.",
          "تحذف excludeCountries الولايات المتحدة وكندا.",
        ]}
      >
        <Phone excludeCountries={["US", "CA"]} />
      </Labelled>
      <Labelled
        label={["Suggested countries first", "الدول المقترحة أولًا"]}
        helper={[
          "preferredCountries pins the countries people use most.",
          "تثبّت preferredCountries الدول الأكثر استخدامًا في الأعلى.",
        ]}
      >
        <Phone preferredCountries={["SA", "AE", "EG", "JO"]} />
      </Labelled>
      <Labelled
        label={["With flags", "مع الأعلام"]}
        helper={["showFlag adds the flag emoji.", "تضيف showFlag رمز العلم."]}
      >
        <Phone showFlag defaultCountry="AE" />
      </Labelled>
    </div>
  );
}

export function PhoneForm() {
  const [details, setDetails] = useState<PhoneDetails | null>(null);
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const invalid = touched && value !== "" && !details?.isValid;
  return (
    <div className="mx-auto w-full max-w-md">
      <Labelled
        label={["Mobile number", "رقم الجوال"]}
        helper={["Try pasting a number that starts with +.", "جرّب لصق رقم يبدأ بعلامة +."]}
        invalid={invalid}
        error={["Enter a complete number.", "أدخل رقمًا كاملًا."]}
      >
        <Phone
          value={value}
          onValueChange={(next, info) => {
            setValue(next);
            setDetails(info);
          }}
          onBlur={() => setTouched(true)}
          preferredCountries={["SA"]}
        />
      </Labelled>
      <p className="mt-3 text-sm text-text-secondary-paragraph" dir="ltr">
        <bdi>{value || "—"}</bdi>
      </p>
    </div>
  );
}
