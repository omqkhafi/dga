import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const textareaVariants = cva("block min-h-20 w-full min-w-0 rounded-sm border border-field-border-default bg-field-background-default px-4 py-3 text-sm text-field-text-filled transition-colors outline-none placeholder:text-field-text-placeholder hover:border-field-border-hovered focus-visible:border-field-border-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black read-only:border-dashed read-only:border-field-border-default read-only:bg-field-background-default read-only:text-field-text-readonly read-only:hover:border-field-border-default disabled:cursor-not-allowed disabled:border-border-disabled disabled:text-text-default-disabled disabled:placeholder:text-text-default-disabled aria-invalid:border-field-border-error motion-reduce:transition-none", {
  variants: {
    appearance: {
      default: "",
      lighter: "bg-field-background-lighter focus-visible:bg-field-background-default has-[input:focus-visible]:bg-field-background-default",
      darker: "bg-field-background-darker focus-visible:bg-field-background-default has-[input:focus-visible]:bg-field-background-default",
    },
    resize: {
      none: "resize-none",
      vertical: "resize-y",
    },
  },
  defaultVariants: { appearance: "default", resize: "vertical" },
});

type TextareaProps = React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>;

/**
 * A multi-line text field that grows in height (it is resizable by default). Label it with a
 * Field. It is linked to the Field's label, helper text and error like any other control.
 */
function Textarea({ className, appearance, resize, rows = 4, ...props }: TextareaProps) {
  return (
    <FieldPrimitive.Control
      data-slot="textarea"
      render={<textarea rows={rows} />}
      className={cn(textareaVariants({ appearance, resize }), className)}
      {...(props as Record<string, unknown>)}
    />
  );
}

export type { TextareaProps };
export { Textarea, textareaVariants };
