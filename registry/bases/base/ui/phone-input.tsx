"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { ArrowDown01Icon, Search01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { normalizeArabic } from "@/components/dga/combobox";
import { inputVariants } from "@/components/dga/input";
import { AutoDirection, useDocumentDirection } from "@/lib/dga/direction";
import {
  countryName,
  detectCountry,
  digitsOf,
  examplePattern,
  filterCountries,
  flagOf,
  formatNational,
  getCountry,
  getPhoneDetails,
  maxNationalDigits,
  type PhoneCountry,
  type PhoneDetails,
  parsePhone,
  stripTrunkPrefix,
} from "@/lib/dga/phone";
import { cn } from "@/registry/bases/base/lib/utils";

/** One row of the country list. */
type CountryOption = {
  /** ISO code. */
  value: string;
  /** The country's name in the list's language. */
  label: string;
  /** Calling code with the plus sign (`+966`). */
  dial: string;
  /** Names in both languages, the code and the ISO code, so every spelling finds the country. */
  keywords: string[];
};

type CountryGroup = { label: string; items: CountryOption[] };

const isGroup = (item: CountryOption | CountryGroup): item is CountryGroup => "items" in item;

type PhoneInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "size" | "value" | "defaultValue" | "onChange" | "type" | "name" | "dir"
> & {
  /** Height: `md` 32px, `lg` 40px. */
  size?: "md" | "lg";
  /** Fill style. `lighter` and `darker` keep the border. */
  appearance?: "default" | "lighter" | "darker";
  /** The number in international format (`+966512345678`). Controlled. Empty string for none. */
  value?: string;
  /** The number at first (uncontrolled), in international format. */
  defaultValue?: string;
  /** Called on every change with the international number and its details. */
  onValueChange?: (value: string, details: PhoneDetails) => void;
  /** The chosen country (ISO code, `SA`). Controlled. */
  country?: string;
  /** The country at first (uncontrolled). Default: the first of `preferredCountries`, else `SA`. */
  defaultCountry?: string;
  /** Called when the country changes, by choosing it or by typing or pasting a `+` number. */
  onCountryChange?: (country: string) => void;
  /** Leaves these countries (ISO codes) out of the list. A number that starts with their code is not recognised either. */
  excludeCountries?: readonly string[];
  /** Offers only these countries (ISO codes). Combined with `excludeCountries`. */
  onlyCountries?: readonly string[];
  /** Countries (ISO codes) listed first, in this order, under `preferredLabel`. */
  preferredCountries?: readonly string[];
  /** Shows the flag before the calling code. Off by default: Windows draws flag emoji as letters. */
  showFlag?: boolean;
  /** Language of the country names (`en`, `ar`). Default: the `lang` of the page, else `en`. Search always matches both. */
  locale?: string;
  /** Recognises a country when someone types or pastes a number that starts with `+` or `00`. Default `true`. */
  detectCountry?: boolean;
  /** Drops the leading 0 people dial inside their own country (`05…` is `5…`). Default `true`. */
  stripTrunkPrefix?: boolean;
  /** Groups the digits as they are typed (`51 234 5678`). Default `true`. */
  format?: boolean;
  /** Shows a sample number as the hint until something is typed. Default `true`; `placeholder` overrides it. */
  examplePlaceholder?: boolean;
  /** Marks the field invalid. By default it turns invalid after leaving the field with a number of the wrong length. */
  invalid?: boolean;
  /** Replaces the built-in length check. Receives the details, returns whether the number is valid. */
  validate?: (details: PhoneDetails) => boolean;
  /** Name of the hidden field that is submitted with the form: the international number. */
  name?: string;
  /** Name of a second hidden field that submits the country's ISO code. */
  countryName?: string;
  /** Accessible name of the country button. Gets the country name. Translate it on Arabic pages. */
  countryLabel?: (country: string) => string;
  /** Hint of the search box in the list. Translate it on Arabic pages. */
  searchPlaceholder?: string;
  /** Shown when no country matches. Translate it on Arabic pages. */
  emptyText?: React.ReactNode;
  /** Heading of the preferred countries. Translate it on Arabic pages. */
  preferredLabel?: string;
  /** Heading of the other countries, shown only with `preferredCountries`. Translate it on Arabic pages. */
  allLabel?: string;
  /** The text read to screen readers when the number of results changes. */
  statusLabel?: (count: number) => string;
  /** Class names for the native number `<input>`. `className` styles the box around it. */
  inputClassName?: string;
  /** Disables the country list but leaves the number editable. */
  countryDisabled?: boolean;
  /** Opens the country list at first. */
  defaultOpen?: boolean;
};

const DEFAULT_COUNTRY = "SA";

function useDocumentLang() {
  return React.useSyncExternalStore(
    (callback) => {
      const observer = new MutationObserver(callback);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
      return () => observer.disconnect();
    },
    () => document.documentElement.lang.split("-")[0] || "en",
    () => "en",
  );
}

/** The caret position after `digits` digits have been typed, in a formatted string. */
function caretAfterDigits(formatted: string, digits: number) {
  if (digits <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i] as string)) seen++;
    if (seen === digits) return i + 1;
  }
  return formatted.length;
}

/**
 * A phone number field: a searchable list of every country with its calling code, and the
 * number. The number is written left to right on Arabic pages too, Arabic-Indic digits typed or
 * pasted become Western digits, and the value is the international number (`+966512345678`),
 * ready to send to a server. Platform Code extension. Label it with a Field.
 */
function PhoneInput({
  className,
  inputClassName,
  size,
  appearance,
  value: valueProp,
  defaultValue,
  onValueChange,
  country: countryProp,
  defaultCountry,
  onCountryChange,
  excludeCountries,
  onlyCountries,
  preferredCountries,
  showFlag = false,
  locale: localeProp,
  detectCountry: detect = true,
  stripTrunkPrefix: stripTrunk = true,
  format = true,
  examplePlaceholder = true,
  invalid: invalidProp,
  validate,
  name,
  countryName: countryFieldName,
  countryLabel = (country) => `Country calling code, ${country}`,
  searchPlaceholder = "Search country or code",
  emptyText = "No countries found.",
  preferredLabel = "Suggested",
  allLabel = "All countries",
  statusLabel = (count) => (count === 1 ? "1 country" : `${count} countries`),
  placeholder,
  disabled,
  readOnly,
  required,
  countryDisabled,
  defaultOpen,
  onBlur,
  ...props
}: PhoneInputProps) {
  const pageLang = useDocumentLang();
  const locale = localeProp ?? pageLang;
  const direction = useDocumentDirection();
  const box = React.useRef<HTMLDivElement | null>(null);
  const field = React.useRef<HTMLInputElement | null>(null);
  const pendingCaret = React.useRef<number | null>(null);

  const countries = React.useMemo(
    () => filterCountries({ only: onlyCountries, exclude: excludeCountries }),
    [onlyCountries, excludeCountries],
  );
  const firstAllowed = (iso: string | undefined) =>
    countries.find((c) => c.iso === iso?.toUpperCase());
  const fallbackIso =
    firstAllowed(defaultCountry)?.iso ??
    firstAllowed(preferredCountries?.[0])?.iso ??
    firstAllowed(DEFAULT_COUNTRY)?.iso ??
    countries[0]?.iso ??
    "";

  // The state is the country and the national digits; `value` is derived from them.
  const [state, setState] = React.useState(() =>
    defaultValue
      ? parsePhone(defaultValue, fallbackIso, countries)
      : getPhoneDetails(fallbackIso, ""),
  );
  const controlledValue = valueProp !== undefined;
  const view = React.useMemo(() => {
    if (!controlledValue) return state;
    const parsed = parsePhone(valueProp ?? "", countryProp ?? state.country, countries);
    return parsed.country ? parsed : getPhoneDetails(state.country, "");
  }, [controlledValue, valueProp, countryProp, state, countries]);
  const iso = (countryProp ? firstAllowed(countryProp)?.iso : undefined) ?? view.country;
  const current = getCountry(iso) ?? getCountry(fallbackIso);
  const details = React.useMemo(
    () => getPhoneDetails(current?.iso, view.national),
    [current, view.national],
  );

  const commit = (next: PhoneDetails, previousCountry: string) => {
    setState(next);
    if (next.country !== previousCountry) onCountryChange?.(next.country);
    onValueChange?.(next.e164, next);
  };

  const [touched, setTouched] = React.useState(false);
  const valid = validate ? validate(details) : details.isValid;
  const invalid = invalidProp ?? (touched && details.national !== "" && !valid);

  // The country list lives in a Field of its own, so it learns from the number whether the Field
  // around both is disabled.
  const [fieldDisabled, setFieldDisabled] = React.useState(false);
  React.useLayoutEffect(() => {
    const off = field.current?.disabled ?? false;
    if (off !== fieldDisabled) setFieldDisabled(off);
  });

  // Keep the caret next to the same digit after the digits are regrouped.
  React.useLayoutEffect(() => {
    const input = field.current;
    if (input && pendingCaret.current !== null && document.activeElement === input) {
      input.setSelectionRange(pendingCaret.current, pendingCaret.current);
    }
    pendingCaret.current = null;
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!current) return;
    const input = event.currentTarget;
    const raw = input.value;
    const caret = input.selectionStart ?? raw.length;
    const digitsBeforeCaret = digitsOf(raw.slice(0, caret)).length;
    const typedPlus = raw.trim().startsWith("+") || /^\s*(00|٠٠|۰۰)/.test(raw);

    let target: PhoneCountry = current;
    let national = digitsOf(raw);
    let removed = 0;
    if (detect && typedPlus) {
      const found = detectCountry(national.replace(/^00/, ""), countries);
      if (found) {
        target = found.country;
        removed = national.length - found.rest.length;
        national = found.rest;
      }
    } else if (stripTrunk) {
      const stripped = stripTrunkPrefix(target, national);
      removed = national.length - stripped.length;
      national = stripped;
    }
    const capped = national.slice(0, maxNationalDigits(target));
    const next = getPhoneDetails(target.iso, capped);
    pendingCaret.current = format
      ? caretAfterDigits(next.formatted, Math.max(0, digitsBeforeCaret - removed))
      : null;
    commit(next, current.iso);
  };

  // Typing a digit with the browser's own text changes is fine; only block the characters that
  // can never be part of a number so the box does not fill with letters.
  const handleBeforeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const data = (event.nativeEvent as InputEvent).data;
    if (data && !/^[\d\s+()\-.٠-٩۰-۹]+$/.test(data)) event.preventDefault();
  };

  const chooseCountry = (nextIso: string | undefined) => {
    const next = getCountry(nextIso);
    if (!next || !current) return;
    const kept = view.national.slice(0, maxNationalDigits(next));
    commit(getPhoneDetails(next.iso, kept), current.iso);
    window.setTimeout(() => field.current?.focus(), 0);
  };

  // The country list. Names are in the page language; search matches both languages.
  const options = React.useMemo<(CountryOption | CountryGroup)[]>(() => {
    const collator = new Intl.Collator(locale);
    const make = (c: PhoneCountry): CountryOption => ({
      value: c.iso,
      label: countryName(c.iso, locale),
      dial: `+${c.dial}`,
      keywords: [
        countryName(c.iso, "en"),
        countryName(c.iso, "ar"),
        c.iso,
        `+${c.dial}`,
        c.dial,
        `00${c.dial}`,
      ],
    });
    const preferred = (preferredCountries ?? [])
      .map((code) => countries.find((c) => c.iso === code.toUpperCase()))
      .filter((c): c is PhoneCountry => c !== undefined)
      .filter((c, i, all) => all.indexOf(c) === i);
    const rest = countries
      .filter((c) => !preferred.includes(c))
      .map(make)
      .sort((a, b) => collator.compare(a.label, b.label));
    if (preferred.length === 0) return rest;
    return [
      { label: preferredLabel, items: preferred.map(make) },
      { label: allLabel, items: rest },
    ];
  }, [countries, locale, preferredCountries, preferredLabel, allLabel]);

  const flat = React.useMemo(
    () => options.flatMap((item) => (isGroup(item) ? item.items : [item])),
    [options],
  );
  const selected = flat.find((option) => option.value === current?.iso) ?? null;
  const [query, setQuery] = React.useState("");

  const hint = placeholder ?? (examplePlaceholder && current ? examplePattern(current) : undefined);
  const shown = format && current ? formatNational(current, details.national) : details.national;

  return (
    <AutoDirection>
      <div
        ref={box}
        data-slot="phone-input"
        data-size={size ?? "lg"}
        className={cn(inputVariants({ size, appearance }), "cn-phone", className)}
      >
        {/* A Field of its own, so the list does not take the label of the Field around the number. */}
        <FieldPrimitive.Root className="contents">
          <ComboboxPrimitive.Root
            items={options}
            value={selected}
            onValueChange={(next: unknown) => chooseCountry((next as CountryOption | null)?.value)}
            inputValue={query}
            onInputValueChange={(text) => setQuery(text)}
            onOpenChange={(open) => {
              if (!open) setQuery("");
            }}
            itemToStringLabel={(item: unknown) => (item as CountryOption | null)?.label ?? ""}
            isItemEqualToValue={(a: unknown, b: unknown) =>
              (a as CountryOption)?.value === (b as CountryOption)?.value
            }
            filter={(item: unknown, text: string) => {
              const option = item as CountryOption;
              const needle = normalizeArabic(text.replace(/^00/, "+"));
              if (!needle) return true;
              return [option.label, ...option.keywords].some((word) =>
                normalizeArabic(word).includes(needle),
              );
            }}
            defaultOpen={defaultOpen}
            disabled={disabled || fieldDisabled || countryDisabled}
            readOnly={readOnly}
          >
            <ComboboxPrimitive.Trigger
              data-slot="phone-country"
              aria-label={countryLabel(selected?.label ?? current?.iso ?? "")}
              className="cn-phone-country"
            >
              {showFlag && current ? (
                <span aria-hidden className="cn-phone-flag">
                  {flagOf(current.iso)}
                </span>
              ) : null}
              <bdi dir="ltr" className="cn-phone-dial">
                {current ? `+${current.dial}` : ""}
              </bdi>
              <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="cn-phone-arrow" />
            </ComboboxPrimitive.Trigger>
            <ComboboxPrimitive.Portal>
              <ComboboxPrimitive.Positioner
                anchor={box}
                side="bottom"
                align="start"
                sideOffset={4}
                className="cn-phone-positioner"
              >
                <ComboboxPrimitive.Popup data-slot="phone-content" className="cn-phone-content">
                  <div className="cn-phone-search">
                    <HugeiconsIcon icon={Search01Icon} aria-hidden />
                    <ComboboxPrimitive.Input
                      data-slot="phone-search"
                      aria-label={searchPlaceholder}
                      placeholder={searchPlaceholder}
                      className="cn-phone-search-input"
                    />
                  </div>
                  <PhoneStatus statusLabel={statusLabel} />
                  <ComboboxPrimitive.Empty data-slot="phone-empty" className="cn-phone-empty">
                    {emptyText}
                  </ComboboxPrimitive.Empty>
                  <ComboboxPrimitive.List data-slot="phone-list" className="cn-phone-list">
                    {(item: CountryOption | CountryGroup) =>
                      isGroup(item) ? (
                        <ComboboxPrimitive.Group
                          key={item.label}
                          items={item.items}
                          className="cn-phone-group"
                        >
                          <ComboboxPrimitive.GroupLabel className="cn-phone-label">
                            {item.label}
                          </ComboboxPrimitive.GroupLabel>
                          <ComboboxPrimitive.Collection>
                            {(option: CountryOption) => (
                              <CountryItem key={option.value} option={option} showFlag={showFlag} />
                            )}
                          </ComboboxPrimitive.Collection>
                        </ComboboxPrimitive.Group>
                      ) : (
                        <CountryItem key={item.value} option={item} showFlag={showFlag} />
                      )
                    }
                  </ComboboxPrimitive.List>
                </ComboboxPrimitive.Popup>
              </ComboboxPrimitive.Positioner>
            </ComboboxPrimitive.Portal>
          </ComboboxPrimitive.Root>
        </FieldPrimitive.Root>
        <span aria-hidden className="cn-phone-divider" />
        <InputPrimitive
          {...props}
          ref={field}
          data-slot="input-field"
          type="tel"
          inputMode="tel"
          autoComplete={props.autoComplete ?? "tel-national"}
          dir="ltr"
          value={shown}
          placeholder={hint}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={invalid ? true : undefined}
          data-direction={direction}
          onChange={handleInput}
          onBeforeInput={handleBeforeInput}
          onBlur={(event) => {
            setTouched(true);
            onBlur?.(event);
          }}
          className={cn("cn-input-field cn-phone-field", inputClassName)}
        />
        {name ? <input type="hidden" name={name} value={details.e164} /> : null}
        {countryFieldName ? (
          <input type="hidden" name={countryFieldName} value={details.country} />
        ) : null}
      </div>
    </AutoDirection>
  );
}

function PhoneStatus({ statusLabel }: { statusLabel: (count: number) => string }) {
  const filtered = ComboboxPrimitive.useFilteredItems<CountryOption | CountryGroup>();
  const count = filtered.reduce((n, item) => n + (isGroup(item) ? item.items.length : 1), 0);
  return (
    <ComboboxPrimitive.Status className="sr-only">{statusLabel(count)}</ComboboxPrimitive.Status>
  );
}

/** One country: the calling code in a column of fixed width, then the name, on one line. */
function CountryItem({ option, showFlag }: { option: CountryOption; showFlag: boolean }) {
  return (
    <ComboboxPrimitive.Item data-slot="phone-item" value={option} className="cn-phone-item">
      {showFlag ? (
        <span aria-hidden className="cn-phone-flag">
          {flagOf(option.value)}
        </span>
      ) : null}
      <bdi dir="ltr" className="cn-phone-item-dial">
        {option.dial}
      </bdi>
      <span className="cn-phone-item-name">{option.label}</span>
      <ComboboxPrimitive.ItemIndicator className="cn-phone-item-indicator">
        <HugeiconsIcon icon={Tick02Icon} aria-hidden className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

export type { CountryOption, PhoneInputProps };
export { PhoneInput };
