import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const textareaVariants = cva("cn-textarea", {
  variants: {
    appearance: {
      default: "",
      lighter: "cn-input-lighter",
      darker: "cn-input-darker",
    },
    resize: {
      none: "cn-textarea-resize-none",
      vertical: "cn-textarea-resize-vertical",
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
