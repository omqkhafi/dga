import { Field as FieldPrimitive } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const textareaVariants = cva("cn-textarea", {
  variants: {
    appearance: {
      default: "",
      lighter: "cn-textarea-lighter",
      darker: "cn-textarea-darker",
    },
    resize: {
      none: "cn-textarea-resize-none",
      vertical: "cn-textarea-resize-vertical",
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
        className={cn("cn-textarea-field", inputClassName)}
        {...(props as Record<string, unknown>)}
      />
    </div>
  );
}

export type { TextareaProps };
export { Textarea, textareaVariants };
