import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const inputVariants = cva("relative flex w-full min-w-0 items-center gap-2 rounded-sm border border-field-border-default bg-field-background-default px-3 text-field-text-filled transition-[background-color,border-color,box-shadow] duration-200 ease-[ease-in-out] [--field-placeholder:var(--field-text-placeholder)] [--field-underline:0] [outline:0_none] hover:border-field-border-hovered active:border-field-border-pressed active:bg-field-background-pressed active:[--field-placeholder:var(--field-text-placeholder-tinted)] active:[--field-underline:0.5] has-[input:focus]:border-field-border-pressed has-[input:focus]:not-active:shadow-md has-[input:focus]:not-active:[--field-underline:1] after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-center after:rounded-b-sm after:bg-field-border-pressed after:transition-transform after:duration-200 after:ease-[ease-in-out] after:[transform:scaleX(var(--field-underline))] has-[[aria-invalid=true]]:border-field-border-error! has-[[aria-invalid=true]]:after:bg-field-border-error has-[input[readonly]:not(:focus)]:border-border-neutral-primary has-[input[readonly]]:bg-field-background-default has-[input[readonly]]:text-field-text-readonly has-[input[readonly]]:active:bg-field-background-default has-[input[readonly]]:active:[--field-underline:0] has-[input[readonly]]:shadow-none has-[input:disabled]:cursor-not-allowed has-[input:disabled]:border-border-disabled has-[input:disabled]:bg-field-background-default has-[input:disabled]:text-text-default-disabled has-[input:disabled]:shadow-none has-[input:disabled]:after:hidden motion-reduce:transition-none motion-reduce:after:transition-none", {
  variants: {
    size: { md: "h-8 text-sm [&_svg:not([class*='size-'])]:size-5", lg: "h-10 text-md [&_svg:not([class*='size-'])]:size-6" },
    appearance: {
      default: "",
      lighter: "border-transparent bg-field-background-lighter hover:border-field-border-default active:border-field-border-default has-[input:focus]:border-field-border-default has-[input:focus]:bg-field-background-default has-[input[readonly]:not(:focus)]:border-border-neutral-primary has-[input[readonly]]:bg-field-background-lighter has-[input:disabled]:border-border-disabled has-[input:disabled]:bg-field-background-lighter",
      darker: "border-transparent bg-field-background-darker [--field-placeholder:var(--field-text-placeholder-tinted)] hover:border-field-border-default active:border-field-border-default has-[input:focus]:border-field-border-default has-[input:focus]:bg-field-background-default has-[input[readonly]:not(:focus)]:border-border-neutral-primary has-[input[readonly]]:bg-field-background-darker has-[input:disabled]:border-border-disabled has-[input:disabled]:bg-field-background-darker",
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
        className={cn("h-full min-w-0 flex-1 bg-transparent p-0 text-inherit [outline:0_none] placeholder:text-(--field-placeholder) disabled:cursor-not-allowed disabled:text-text-default-disabled disabled:placeholder:text-text-default-disabled read-only:text-field-text-readonly [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none", inputClassName)}
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
