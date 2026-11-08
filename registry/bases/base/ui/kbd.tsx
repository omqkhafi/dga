import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * A keyboard key or shortcut hint, such as Ctrl or ⌘K (Platform Code extension, not part of DGA).
 * It is a real `<kbd>` element, drawn as a small cap in the DGA neutral fill. Key names read left
 * to right even on Arabic pages; pass `dir="rtl"` for a key named in Arabic. It is a hint, not a
 * control: it takes no focus. Input Group's key addon is this component.
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-slot="kbd" dir="ltr" className={cn("cn-kbd", className)} {...props} />;
}

/** Keys that are pressed together, in order: `<Kbd>Ctrl</Kbd><Kbd>K</Kbd>`. */
function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="kbd-group" dir="ltr" className={cn("cn-kbd-group", className)} {...props} />
  );
}

export { Kbd, KbdGroup };
