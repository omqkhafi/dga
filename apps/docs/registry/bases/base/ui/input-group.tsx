"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { inputVariants } from "@/components/dga/input";
import { Kbd } from "@/components/dga/kbd";
import { cn } from "@/registry/bases/base/lib/utils";

type InputGroupProps = React.ComponentProps<"div"> & VariantProps<typeof inputVariants>;

/**
 * An Input box that holds more than text: addons before and after the field, such as a prefix,
 * an icon, a unit, a shortcut hint or a button (Platform Code extension; the box is the DGA
 * Input, with the same states). Put one InputGroupInput and any InputGroupAddon inside. The focus
 * underline, border and error state belong to the whole group. Use the Input's own
 * `startAdornment` and `endAdornment` when a single icon or short prefix is enough. Label it with a Field.
 */
function InputGroup({ className, size, appearance, ...props }: InputGroupProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset would add its own border and legend layout
    <div
      role="group"
      data-slot="input-group"
      data-size={size ?? "lg"}
      className={cn(inputVariants({ size, appearance }), "gap-1.5", className)}
      {...props}
    />
  );
}

/** The text field inside an InputGroup. It takes the Field's label, helper text and error. */
function InputGroupInput({ className, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      data-slot="input-group-input"
      className={cn("h-full min-w-0 flex-1 bg-transparent p-0 text-inherit [outline:0_none] placeholder:text-(--field-placeholder) disabled:cursor-not-allowed disabled:text-text-default-disabled disabled:placeholder:text-text-default-disabled read-only:text-field-text-readonly [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none", className)}
      {...props}
    />
  );
}

/** Holds an icon, text, a Kbd or a Button at the start or end of the group. */
function InputGroupAddon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group-addon"
      className={cn("inline-flex shrink-0 items-center text-text-primary-paragraph [&_svg]:shrink-0 [&_svg]:text-icon-default-500 gap-1.5 [&_[data-slot=button]]:-mx-1.5", className)}
      {...props}
    />
  );
}

/** Plain text in an addon, such as `https://`, `SAR` or `kg`. Keeps its own reading direction. */
function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn("text-inherit whitespace-nowrap [unicode-bidi:plaintext]", className)}
      {...props}
    />
  );
}

/** A keyboard shortcut hint in an addon, such as ⌘K. Always left to right. This is the Kbd. */
function InputGroupKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <Kbd data-slot="input-group-kbd" className={className} {...props} />;
}

export type { InputGroupProps };
export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupKbd, InputGroupText };
