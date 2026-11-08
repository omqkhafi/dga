"use client";

import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import * as React from "react";
import { inputVariants } from "@/components/dga/input";
import { normalizeDigits } from "@/components/dga/number-input";
import { cn } from "@/registry/bases/base/lib/utils";

type InputOTPProps = Omit<
  OTPFieldPrimitive.Root.Props,
  "length" | "children" | "validationType" | "inputMode"
> & {
  /** How many characters. Default 6. */
  length?: number;
  /** Height of the boxes: `md` 32px or `lg` 40px (the Input sizes). */
  size?: "md" | "lg";
  /**
   * Where to put separators, as the number of boxes before each one. `[3]` on six boxes gives
   * 3 + 3. Default: none.
   */
  groups?: number[];
  /**
   * Accessible name of boxes 2 and up. `{index}` and `{length}` are replaced, for example
   * "Digit 2 of 6". The first box is named by the Field label or the group's `aria-label`.
   */
  slotLabel?: string;
  /** Marks the code as wrong: red border and underline on every box. */
  invalid?: boolean;
};

/**
 * A one-time code in separate boxes, for example an SMS code (Platform Code extension, on Base UI
 * OTP Field). Typing moves to the next box, Backspace to the previous one, and pasting fills them
 * all. Arabic-Indic digits (٣) become Western ones (3). The boxes always run left to right, also on
 * Arabic pages, because that is the order digits are read and sent. The boxes follow the Input
 * states and work inside a Field: the FieldLabel names the first box.
 */
function InputOTP({
  className,
  length = 6,
  size = "lg",
  groups,
  slotLabel = "Digit {index} of {length}",
  invalid,
  normalizeValue,
  ...props
}: InputOTPProps) {
  const separators = new Set(groups ?? []);
  return (
    <OTPFieldPrimitive.Root
      data-slot="input-otp"
      length={length}
      dir="ltr"
      // Base UI filters by validationType before it normalizes, so "numeric" would drop ٣ before
      // it could become 3. Filtering is done here instead: Western digits only.
      validationType="none"
      inputMode="numeric"
      normalizeValue={(value) =>
        normalizeDigits(normalizeValue ? normalizeValue(value) : value).replace(/\D/g, "")
      }
      className={cn("cn-otp", className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: boxes are positional
        <React.Fragment key={index}>
          {index > 0 && separators.has(index) ? (
            <OTPFieldPrimitive.Separator
              data-slot="input-otp-separator"
              className="cn-otp-separator"
            />
          ) : null}
          <div
            data-slot="input-otp-slot"
            data-size={size}
            className={cn(inputVariants({ size }), "cn-otp-slot")}
          >
            <OTPFieldPrimitive.Input
              data-slot="input-otp-input"
              // The first box is named by the Field label or the group name; Base UI ignores
              // aria-label there.
              aria-label={
                index === 0
                  ? undefined
                  : slotLabel
                      .replace("{index}", String(index + 1))
                      .replace("{length}", String(length))
              }
              aria-invalid={invalid ? true : undefined}
              className="cn-input-field cn-otp-input"
            />
          </div>
        </React.Fragment>
      ))}
    </OTPFieldPrimitive.Root>
  );
}

export type { InputOTPProps };
export { InputOTP };
