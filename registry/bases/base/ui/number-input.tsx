"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { Add01Icon, MinusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { inputVariants } from "@/components/dga/input";
import { cn } from "@/registry/bases/base/lib/utils";

const NON_WESTERN = /[٠-٩۰-۹٫٬،]/g;

/**
 * Turns Arabic-Indic (٠-٩) and Persian (۰-۹) digits into Western digits, and the Arabic
 * decimal and thousands separators into `.` and `,`. Everything else is left alone.
 */
function normalizeDigits(text: string) {
  return text.replace(NON_WESTERN, (char) => {
    if (char === "٫") return ".";
    if (char === "٬" || char === "،") return ",";
    return String(char.charCodeAt(0) & 15);
  });
}

type NumberInputProps = Omit<NumberFieldPrimitive.Root.Props, "render" | "children"> & {
  /** Height: `md` 32px, `lg` 40px. */
  size?: "md" | "lg";
  /** Fill style. `lighter` and `darker` keep the border. */
  appearance?: "default" | "lighter" | "darker";
  /** Hint text shown while the field is empty. */
  placeholder?: string;
  /** Accessible name of the decrease button. Translate it on Arabic pages. */
  decrementLabel?: string;
  /** Accessible name of the increase button. Translate it on Arabic pages. */
  incrementLabel?: string;
  /** Hides the − and + buttons and leaves a plain numeric field. */
  hideSteppers?: boolean;
  /** Class names for the native `<input>`. `className` styles the box around it. */
  inputClassName?: string;
};

/**
 * A numeric field with − and + buttons. Digits are always written left to right, also on
 * Arabic pages, and typing Arabic-Indic digits (٣) gives Western digits (3). Label it with a Field.
 */
function NumberInput({
  className,
  inputClassName,
  size,
  appearance,
  placeholder,
  decrementLabel = "Decrease",
  incrementLabel = "Increase",
  hideSteppers = false,
  locale = "en-u-nu-latn",
  ...props
}: NumberInputProps) {
  const field = React.useRef<HTMLInputElement | null>(null);

  // Type or paste an Arabic-Indic digit and it becomes a Western digit before the field sees it.
  React.useEffect(() => {
    const input = field.current;
    if (!input) return;
    const onBeforeInput = (event: InputEvent) => {
      const data = event.data;
      if (!data || normalizeDigits(data) === data) return;
      event.preventDefault();
      input.setRangeText(
        normalizeDigits(data),
        input.selectionStart ?? input.value.length,
        input.selectionEnd ?? input.value.length,
        "end",
      );
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };
    input.addEventListener("beforeinput", onBeforeInput);
    return () => input.removeEventListener("beforeinput", onBeforeInput);
  }, []);

  return (
    <NumberFieldPrimitive.Root data-slot="number-input" locale={locale} {...props}>
      <NumberFieldPrimitive.Group
        data-size={size ?? "lg"}
        className={cn(inputVariants({ size, appearance }), "cn-number-group", className)}
      >
        {hideSteppers ? null : (
          <NumberFieldPrimitive.Decrement
            data-slot="number-input-decrement"
            aria-label={decrementLabel}
            className="cn-number-step"
          >
            <HugeiconsIcon icon={MinusSignIcon} aria-hidden className="size-4" />
          </NumberFieldPrimitive.Decrement>
        )}
        <NumberFieldPrimitive.Input
          data-slot="input-field"
          ref={field}
          dir="ltr"
          placeholder={placeholder}
          className={cn("cn-input-field cn-number-field", inputClassName)}
        />
        {hideSteppers ? null : (
          <NumberFieldPrimitive.Increment
            data-slot="number-input-increment"
            aria-label={incrementLabel}
            className="cn-number-step"
          >
            <HugeiconsIcon icon={Add01Icon} aria-hidden className="size-4" />
          </NumberFieldPrimitive.Increment>
        )}
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  );
}

export type { NumberInputProps };
export { NumberInput, normalizeDigits };
