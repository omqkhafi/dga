import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const inputVariants = cva("relative flex w-full min-w-0 items-center gap-2 rounded-sm border border-field-border-default bg-field-background-default px-3 text-field-text-filled transition-colors hover:border-field-border-hovered has-[input:focus-visible]:border-field-border-pressed has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-solid has-[input:focus-visible]:outline-offset-1 has-[input:focus-visible]:outline-border-black has-[input[readonly]]:border-dashed has-[input[readonly]]:border-field-border-default has-[input[readonly]]:bg-field-background-default has-[input[readonly]]:text-field-text-readonly has-[input[readonly]]:hover:border-field-border-default has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-border-disabled has-[input:disabled]:text-text-default-disabled has-[[aria-invalid=true]]:border-field-border-error motion-reduce:transition-none", {
  variants: {
    size: { md: "h-8 text-sm [&_svg:not([class*='size-'])]:size-5", lg: "h-10 text-md [&_svg:not([class*='size-'])]:size-6" },
    appearance: {
      default: "",
      lighter: "bg-field-background-lighter focus-visible:bg-field-background-default has-[input:focus-visible]:bg-field-background-default",
      darker: "bg-field-background-darker focus-visible:bg-field-background-default has-[input:focus-visible]:bg-field-background-default",
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
        <span data-slot="input-adornment" className="inline-flex shrink-0 items-center text-text-primary-paragraph [&_svg]:shrink-0 [&_svg]:text-icon-default-500">
          {startAdornment}
        </span>
      ) : null}
      <InputPrimitive
        data-slot="input-field"
        className={cn("h-full min-w-0 flex-1 bg-transparent p-0 text-inherit outline-none placeholder:text-field-text-placeholder disabled:cursor-not-allowed disabled:text-text-default-disabled disabled:placeholder:text-text-default-disabled read-only:text-field-text-readonly [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none", inputClassName)}
        {...props}
      />
      {endAdornment ? (
        <span data-slot="input-adornment" className="inline-flex shrink-0 items-center text-text-primary-paragraph [&_svg]:shrink-0 [&_svg]:text-icon-default-500">
          {endAdornment}
        </span>
      ) : null}
    </div>
  );
}

export type { InputProps };
export { Input, inputVariants };
