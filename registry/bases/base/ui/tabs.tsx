"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { AutoDirection } from "@/registry/bases/base/lib/direction";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * Switches between related panels of content on one page (DGA: Tabs). One tab is in the tab
 * order; the arrow keys move between tabs (Left and Right swap on Arabic pages, Up and Down in a
 * vertical list), and Home and End jump to the first and last. A tab opens its panel on focus.
 */
function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return (
    <AutoDirection>
      <TabsPrimitive.Root
        data-slot="tabs"
        orientation={orientation}
        className={cn("cn-tabs", orientation === "vertical" && "cn-tabs-vertical", className)}
        {...props}
      />
    </AutoDirection>
  );
}

const tabsListVariants = cva("cn-tabs-list", {
  variants: {
    size: { sm: "cn-tabs-size-sm", md: "cn-tabs-size-md", lg: "cn-tabs-size-lg" },
    divider: { true: "cn-tabs-divider", false: "" },
    flush: { true: "cn-tabs-flush", false: "" },
  },
  defaultVariants: { size: "md", divider: true, flush: false },
});

type TabsListProps = TabsPrimitive.List.Props &
  VariantProps<typeof tabsListVariants> & {
    /** Scrolls sideways instead of wrapping when the tabs do not fit. */
    scrollable?: boolean;
  };

/** The row (or column, in a vertical Tabs) of tabs. Give it an `aria-label` when there are several lists. */
function TabsList({
  className,
  size,
  divider,
  flush,
  scrollable = true,
  activateOnFocus = true,
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      activateOnFocus={activateOnFocus}
      data-size={size ?? "md"}
      className={cn(
        tabsListVariants({ size, divider, flush }),
        scrollable && "cn-tabs-scroll",
        className,
      )}
      {...props}
    />
  );
}

/** One tab. Put an icon first and the label after it. */
function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab data-slot="tabs-trigger" className={cn("cn-tab", className)} {...props} />
  );
}

/** The content a tab shows. It is hidden while its tab is not selected. */
function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("cn-tabs-content", className)}
      {...props}
    />
  );
}

export type { TabsListProps };
export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
