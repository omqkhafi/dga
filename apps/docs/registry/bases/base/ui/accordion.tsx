"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/bases/base/lib/utils";

const accordionVariants = cva("flex w-full min-w-0 flex-col border-b border-border-neutral-primary", {
  variants: {
    size: { sm: "[--acc-h:2.5rem] [--acc-px:var(--spacing-accordion-lg-header-padding)] [--acc-py:var(--spacing-accordion-sm-header-padding)]", md: "[--acc-h:3rem] [--acc-px:var(--spacing-accordion-lg-header-padding)] [--acc-py:var(--spacing-accordion-md-header-padding)]", lg: "[--acc-h:3.5rem] [--acc-px:var(--spacing-accordion-lg-header-padding)] [--acc-py:var(--spacing-accordion-lg-header-padding)]" },
    iconPosition: { trailing: "[--acc-body-pe:3rem] [--acc-body-ps:var(--acc-px)]", leading: "[--acc-body-ps:3rem] [--acc-body-pe:var(--acc-px)] [&_[data-slot=accordion-trigger]]:flex-row-reverse [&_[data-slot=accordion-trigger]]:justify-end" },
    variant: { white: "[&_[data-slot=accordion-item]]:bg-transparent", filled: "[&_[data-slot=accordion-item]]:bg-background-neutral-50" },
    flush: { true: "border-b-0 [&_[data-slot=accordion-item]]:border-t-0 [&_[data-slot=accordion-item]]:before:absolute [&_[data-slot=accordion-item]]:before:inset-x-4 [&_[data-slot=accordion-item]]:before:top-0 [&_[data-slot=accordion-item]]:before:h-px [&_[data-slot=accordion-item]]:before:bg-border-neutral-primary [&_[data-slot=accordion-item]]:before:content-['']", false: "" },
  },
  defaultVariants: { size: "lg", iconPosition: "trailing", variant: "white", flush: false },
});

type AccordionProps = AccordionPrimitive.Root.Props & VariantProps<typeof accordionVariants>;

/**
 * Shows and hides sections of content under their headings (DGA: Accordion). Each heading is a
 * button: Tab moves between headings and Enter or Space opens or closes the section. One section
 * is open at a time unless you set `multiple`. `variant` is `white` (no fill) or `filled`; `flush`
 * keeps the lines short of the edges. Sizes are 56, 48 and 40px tall when closed.
 */
function Accordion({ className, size, iconPosition, variant, flush, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-size={size ?? "lg"}
      className={cn(accordionVariants({ size, iconPosition, variant, flush }), className)}
      {...props}
    />
  );
}

/** One section: a heading and its panel. Give it a `value` to control which are open. */
function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("relative border-t border-border-neutral-primary data-disabled:[&_[data-slot=accordion-content]]:text-text-default-disabled", className)}
      {...props}
    />
  );
}

/** The heading button. It shows a chevron that turns when the section is open. */
function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="m-0 flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn("flex min-h-(--acc-h) w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-(--acc-px) py-(--acc-py) text-start text-md font-semibold text-text-default transition-colors hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-text-default-disabled data-disabled:[&_svg]:text-icon-default-disabled motion-reduce:transition-none", className)}
        {...props}
      >
        <span className="min-w-0 flex-1">{children}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="size-5 shrink-0 text-icon-default transition-transform in-data-panel-open:rotate-180 motion-reduce:transition-none" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/** The content of a section. It animates its height and is hidden from screen readers while closed. */
function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-md text-text-primary-paragraph transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("pt-accordion-sm-header-padding pe-(--acc-body-pe) pb-6 ps-(--acc-body-ps)", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export type { AccordionProps };
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, accordionVariants };
