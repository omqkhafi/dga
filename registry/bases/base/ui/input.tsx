import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const inputVariants = cva("cn-input", {
  variants: {
    size: { md: "cn-input-size-md", lg: "cn-input-size-lg" },
    appearance: {
      default: "",
      lighter: "cn-input-lighter",
      darker: "cn-input-darker",
    },
  },
  defaultVariants: { size: "lg", appearance: "default" },
});

type InputProps = Omit<InputPrimitive.Props, "size"> &
  VariantProps<typeof inputVariants> & {
    /** An icon or a short prefix (for example `+966`) before the text, on the start side. */
    startAdornment?: React.ReactNode;
    /** An icon, suffix text or button after the text, on the end side. */
    endAdornment?: React.ReactNode;
    /** Class names for the native `<input>`. `className` styles the box around it. */
    inputClassName?: string;
  };

/**
 * A single-line text field in a bordered box. Label it with a Field. Use `type="email"`,
 * `"tel"`, `"url"` or `"password"` for the matching keyboard and autofill.
 */
function Input({
  className,
  inputClassName,
  size,
  appearance,
  startAdornment,
  endAdornment,
  ...props
}: InputProps) {
  return (
    <div
      data-slot="input"
      data-size={size ?? "lg"}
      className={cn(inputVariants({ size, appearance }), className)}
    >
      {startAdornment ? (
        <span data-slot="input-adornment" className="cn-input-adornment">
          {startAdornment}
        </span>
      ) : null}
      <InputPrimitive
        data-slot="input-field"
        className={cn("cn-input-field", inputClassName)}
        {...props}
      />
      {endAdornment ? (
        <span data-slot="input-adornment" className="cn-input-adornment">
          {endAdornment}
        </span>
      ) : null}
    </div>
  );
}

export type { InputProps };
export { Input, inputVariants };
