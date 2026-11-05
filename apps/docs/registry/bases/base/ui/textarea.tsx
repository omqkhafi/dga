import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const textareaVariants = cva("relative flex w-full min-w-0 rounded-sm border border-field-border-default bg-field-background-default text-sm text-field-text-filled transition-[background-color,border-color,box-shadow] duration-200 ease-[ease-in-out] [--field-placeholder:var(--field-text-placeholder)] [--field-underline:0] [outline:0_none] hover:border-field-border-hovered active:border-field-border-pressed active:bg-field-background-pressed active:[--field-placeholder:var(--field-text-placeholder-tinted)] active:[--field-underline:0.5] has-[textarea:focus]:border-field-border-pressed has-[textarea:focus]:not-active:shadow-md has-[textarea:focus]:not-active:[--field-underline:1] after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-center after:rounded-b-sm after:bg-field-border-pressed after:transition-transform after:duration-200 after:ease-[ease-in-out] after:[transform:scaleX(var(--field-underline))] has-[[aria-invalid=true]]:border-field-border-error! has-[[aria-invalid=true]]:after:bg-field-border-error has-[textarea[readonly]:not(:focus)]:border-border-neutral-primary has-[textarea[readonly]]:bg-field-background-default has-[textarea[readonly]]:text-field-text-readonly has-[textarea[readonly]]:active:bg-field-background-default has-[textarea[readonly]]:active:[--field-underline:0] has-[textarea[readonly]]:shadow-none has-[textarea:disabled]:cursor-not-allowed has-[textarea:disabled]:border-border-disabled has-[textarea:disabled]:bg-field-background-default has-[textarea:disabled]:text-text-default-disabled has-[textarea:disabled]:shadow-none has-[textarea:disabled]:after:hidden motion-reduce:transition-none motion-reduce:after:transition-none", {
  variants: {
    appearance: {
      default: "",
      lighter: "border-transparent bg-field-background-lighter hover:border-field-border-default active:border-field-border-default has-[textarea:focus]:border-field-border-default has-[textarea:focus]:bg-field-background-default has-[textarea[readonly]:not(:focus)]:border-border-neutral-primary has-[textarea[readonly]]:bg-field-background-lighter has-[textarea:disabled]:border-border-disabled has-[textarea:disabled]:bg-field-background-lighter",
      darker: "border-transparent bg-field-background-darker [--field-placeholder:var(--field-text-placeholder-tinted)] hover:border-field-border-default active:border-field-border-default has-[textarea:focus]:border-field-border-default has-[textarea:focus]:bg-field-background-default has-[textarea[readonly]:not(:focus)]:border-border-neutral-primary has-[textarea[readonly]]:bg-field-background-darker has-[textarea:disabled]:border-border-disabled has-[textarea:disabled]:bg-field-background-darker",
    },
    resize: {
      none: "[&_textarea]:resize-none",
      vertical: "[&_textarea]:resize-y",
    },
  },
  defaultVariants: { appearance: "default", resize: "vertical" },
});

type TextareaProps = Omit<React.ComponentProps<"textarea">, "className"> &
  VariantProps<typeof textareaVariants> & {
    /** Class names for the box around the field (border, fill and underline). */
    className?: string;
    /** Class names for the native `<textarea>`. */
    inputClassName?: string;
  };

/**
 * A multi-line text field that grows in height (it is resizable by default). Label it with a
 * Field. It is linked to the Field's label, helper text and error like any other control.
 */
function Textarea({
  className,
  inputClassName,
  appearance,
  resize,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <div data-slot="textarea" className={cn(textareaVariants({ appearance, resize }), className)}>
      <FieldPrimitive.Control
        data-slot="textarea-field"
        render={<textarea rows={rows} />}
        className={cn("block min-h-20 w-full min-w-0 resize-none rounded-sm border-0 bg-transparent px-4 py-3 text-inherit [outline:0_none] placeholder:text-(--field-placeholder) read-only:text-field-text-readonly disabled:cursor-not-allowed disabled:text-text-default-disabled disabled:placeholder:text-text-default-disabled", inputClassName)}
        {...(props as Record<string, unknown>)}
      />
    </div>
  );
}

export type { TextareaProps };
export { Textarea, textareaVariants };
