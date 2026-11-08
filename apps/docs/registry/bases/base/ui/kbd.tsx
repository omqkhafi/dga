import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * A keyboard key or shortcut hint, such as Ctrl or ⌘K (Platform Code extension, not part of DGA).
 * It is a real `<kbd>` element, drawn as a small cap in the DGA neutral fill. Key names read left
 * to right even on Arabic pages; pass `dir="rtl"` for a key named in Arabic. It is a hint, not a
 * control: it takes no focus. Input Group's key addon is this component.
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="kbd" dir="ltr" className={cn("inline-flex h-5 min-w-5 w-fit items-center justify-center rounded-xs border border-border-neutral-primary bg-background-neutral-100 px-1 font-sans text-xs font-medium text-text-default select-none", className)} {...props} />;
}

/** Keys that are pressed together, in order: `<Kbd>Ctrl</Kbd><Kbd>K</Kbd>`. */
function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="kbd-group" dir="ltr" className={cn("inline-flex items-center gap-1", className)} {...props} />
  );
}

export { Kbd, KbdGroup };
