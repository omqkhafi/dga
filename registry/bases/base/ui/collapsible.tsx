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
      className={cn("cn-collapsible-trigger", className)}
      {...props}
    >
      {children}
      {showChevron ? (
        <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="cn-collapsible-chevron" />
      ) : null}
    </CollapsiblePrimitive.Trigger>
  );
}

/** The panel. Its height animates, unless the user prefers reduced motion. */
function CollapsibleContent({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn("cn-collapsible-content", className)}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
