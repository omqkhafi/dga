"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { AutoDirection } from "@/lib/dga/direction";
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
        className={cn("flex w-full min-w-0 flex-col gap-4", orientation === "vertical" && "flex-row items-start gap-6", className)}
        {...props}
      />
    </AutoDirection>
  );
}

const tabsListVariants = cva("relative flex min-w-0 shrink-0 gap-0.75 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col", {
  variants: {
    size: { sm: "[--tab-icon:1rem] [--tab-px:var(--spacing-horizontal-tab-sm-button-h-padding)] [--tab-py:var(--spacing-horizontal-tab-sm-button-v-padding)] [--tab-text:var(--text-sm)] data-[orientation=vertical]:[--tab-px:var(--spacing-vertical-tab-sm-button-h-padding)] data-[orientation=vertical]:[--tab-py:var(--spacing-vertical-tab-sm-button-v-padding)]", md: "[--tab-icon:1.25rem] [--tab-px:var(--spacing-horizontal-tab-md-button-h-padding)] [--tab-py:var(--spacing-horizontal-tab-md-button-v-padding)] [--tab-text:var(--text-sm)] data-[orientation=vertical]:[--tab-px:var(--spacing-vertical-tab-md-button-h-padding)] data-[orientation=vertical]:[--tab-py:var(--spacing-vertical-tab-md-button-v-padding)]", lg: "[--tab-icon:1.5rem] [--tab-px:var(--spacing-horizontal-tab-md-button-h-padding)] [--tab-py:var(--spacing-horizontal-tab-md-button-h-padding)] [--tab-text:var(--text-md)] data-[orientation=vertical]:[--tab-px:var(--spacing-vertical-tab-md-button-h-padding)] data-[orientation=vertical]:[--tab-py:0.5rem]" },
    divider: { true: "data-[orientation=horizontal]:shadow-[inset_0_-3px_0_0_var(--border-neutral-primary)] data-[orientation=vertical]:shadow-[inset_-3px_0_0_0_var(--border-neutral-primary)] data-[orientation=vertical]:rtl:shadow-[inset_3px_0_0_0_var(--border-neutral-primary)]", false: "" },
    flush: { true: "data-[orientation=horizontal]:ps-0", false: "" },
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
        scrollable && "data-[orientation=horizontal]:overflow-x-auto",
        className,
      )}
      {...props}
    />
  );
}

/** One tab. Put an icon first and the label after it. */
function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab data-slot="tabs-trigger" className={cn("relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-tab-button-gap rounded-sm border-0 bg-transparent px-(--tab-px) py-(--tab-py) text-(length:--tab-text) font-medium whitespace-nowrap text-text-primary-paragraph transition-colors select-none hover:bg-button-background-neutral-hovered hover:text-text-default active:bg-button-background-neutral-pressed active:text-text-default focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-active:font-bold data-active:text-text-default data-active:hover:bg-transparent data-active:active:bg-button-background-neutral-pressed data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-text-default-disabled data-disabled:hover:bg-transparent [&_svg]:size-(--tab-icon) [&_svg]:shrink-0 [&_svg]:text-unselected-tab-icon data-active:[&_svg]:text-icon-default data-disabled:[&_svg]:text-icon-default-disabled after:pointer-events-none after:absolute after:rounded-full after:bg-border-primary after:opacity-0 after:transition-opacity data-active:after:opacity-100 motion-reduce:transition-none motion-reduce:after:transition-none data-[orientation=horizontal]:after:inset-x-0 data-[orientation=horizontal]:after:bottom-0 data-[orientation=horizontal]:after:h-0.75 data-[orientation=vertical]:justify-start data-[orientation=vertical]:after:inset-y-2 data-[orientation=vertical]:after:end-0 data-[orientation=vertical]:after:min-h-4 data-[orientation=vertical]:after:w-0.75 data-[orientation=vertical]:hover:after:bg-border-neutral-primary data-[orientation=vertical]:hover:after:opacity-100 data-[orientation=vertical]:active:after:opacity-100 data-[orientation=vertical]:data-active:after:bg-border-primary", className)} {...props} />
  );
}

/** The content a tab shows. It is hidden while its tab is not selected. */
function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("min-w-0 flex-1 text-text-default outline-hidden focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black", className)}
      {...props}
    />
  );
}

export type { TabsListProps };
export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
