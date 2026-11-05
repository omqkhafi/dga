"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/bases/base/lib/utils";

const accordionVariants = cva("cn-accordion", {
  variants: {
    size: { sm: "cn-accordion-size-sm", md: "cn-accordion-size-md", lg: "cn-accordion-size-lg" },
    iconPosition: { trailing: "cn-accordion-trailing", leading: "cn-accordion-leading" },
    flush: { true: "cn-accordion-flush", false: "" },
  },
  defaultVariants: { size: "lg", iconPosition: "trailing", flush: false },
});

type AccordionProps = AccordionPrimitive.Root.Props & VariantProps<typeof accordionVariants>;

/**
 * Shows and hides sections of content under their headings (DGA: Accordion). Each heading is a
 * button: Tab moves between headings and Enter or Space opens or closes the section. One section
 * is open at a time unless you set `multiple`.
 */
function Accordion({ className, size, iconPosition, flush, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-size={size ?? "lg"}
      className={cn(accordionVariants({ size, iconPosition, flush }), className)}
      {...props}
    />
  );
}

/** One section: a heading and its panel. Give it a `value` to control which are open. */
function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("cn-accordion-item", className)}
      {...props}
    />
  );
}

/** The heading button. It shows a chevron that turns when the section is open. */
function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="cn-accordion-header">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn("cn-accordion-trigger", className)}
        {...props}
      >
        <span className="cn-accordion-title">{children}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="cn-accordion-chevron" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/** The content of a section. It animates its height and is hidden from screen readers while closed. */
function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="cn-accordion-panel"
      {...props}
    >
      <div className={cn("cn-accordion-body", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export type { AccordionProps };
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, accordionVariants };
