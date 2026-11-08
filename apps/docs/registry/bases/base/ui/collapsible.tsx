"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * One panel that opens and closes (Platform Code extension, not part of DGA). Built on the Base UI
 * Collapsible; the Card's Expandable uses it too. The trigger is a real button with
 * `aria-expanded` and `aria-controls`, Enter and Space toggle it, and a closed panel is hidden
 * from the keyboard and from screen readers. For a set of panels where only one is open, use an
 * Accordion.
 */
function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" className={cn(className)} {...props} />;
}

type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props & {
  /** Adds the chevron that turns when the panel is open. Off by default. */
  showChevron?: boolean;
};

/** The button that opens and closes the panel. Render your own with `render`. */
function CollapsibleTrigger({
  className,
  children,
  showChevron = false,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn("inline-flex cursor-pointer items-center justify-between gap-3 rounded-xs border-0 bg-transparent p-0 text-start text-lg font-bold text-text-display focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-border-black disabled:cursor-not-allowed disabled:text-text-default-disabled", className)}
      {...props}
    >
      {children}
      {showChevron ? (
        <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="size-5 shrink-0 text-icon-default transition-transform in-data-panel-open:rotate-180 motion-reduce:transition-none" />
      ) : null}
    </CollapsiblePrimitive.Trigger>
  );
}

/** The panel. Its height animates, unless the user prefers reduced motion. */
function CollapsibleContent({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn("h-(--collapsible-panel-height) overflow-hidden text-md text-text-primary-paragraph transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none", className)}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
