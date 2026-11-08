"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import {
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "@/components/dga/menu";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

/** What a `TabsList` with `overflow="menu"` needs from its `Tabs`: the value and a way to set it. */
const TabsValueContext = React.createContext<{
  value: unknown;
  select: (value: string | number) => void;
} | null>(null);

/**
 * Switches between related panels of content on one page (DGA: Tabs). One tab is in the tab
 * order; the arrow keys move between tabs (Left and Right swap on Arabic pages, Up and Down in a
 * vertical list), and Home and End jump to the first and last. A tab opens its panel on focus.
 */
function Tabs({
  className,
  orientation = "horizontal",
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}: TabsPrimitive.Root.Props) {
  // Tracked here so a "More" menu can read and change the selection (see TabsList `overflow`).
  const [inner, setInner] = React.useState<unknown>(defaultValue);
  const value = valueProp !== undefined ? valueProp : inner;
  const change = (next: unknown, details: Parameters<NonNullable<typeof onValueChange>>[1]) => {
    if (valueProp === undefined && inner !== undefined) setInner(next);
    onValueChange?.(next as never, details);
  };
  const context = React.useMemo(
    () => ({
      value,
      select: (next: string | number) => {
        if (valueProp === undefined) setInner(next);
        onValueChange?.(next as never, undefined as never);
      },
    }),
    [value, valueProp, onValueChange],
  );
  return (
    <AutoDirection>
      <TabsValueContext.Provider value={context}>
        <TabsPrimitive.Root
          data-slot="tabs"
          orientation={orientation}
          className={cn("cn-tabs", orientation === "vertical" && "cn-tabs-vertical", className)}
          {...(value !== undefined ? { value: value as never } : {})}
          {...(value === undefined && defaultValue !== undefined ? { defaultValue } : {})}
          onValueChange={change}
          {...props}
        />
      </TabsValueContext.Provider>
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
    /**
     * What happens to tabs that do not fit (horizontal lists). `scroll` (default) scrolls
     * sideways. `menu` is the DGA More tab: the tabs that do not fit collapse into a "More"
     * menu at the end of the list, and the More tab is shown as selected while one of them is.
     * Give the `Tabs` a `defaultValue` or `value` when you use it.
     */
    overflow?: "scroll" | "menu";
    /** The text of the More tab. Translate it on Arabic pages. Default "More". */
    moreLabel?: string;
  };

/** The row (or column, in a vertical Tabs) of tabs. Give it an `aria-label` when there are several lists. */
function TabsList({
  className,
  size,
  divider,
  flush,
  scrollable = true,
  activateOnFocus = true,
  overflow = "scroll",
  moreLabel = "More",
  children,
  ...props
}: TabsListProps) {
  if (overflow === "menu") {
    return (
      <OverflowTabsList
        className={className}
        size={size}
        divider={divider}
        flush={flush}
        activateOnFocus={activateOnFocus}
        moreLabel={moreLabel}
        {...props}
      >
        {children}
      </OverflowTabsList>
    );
  }
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
    >
      {children}
    </TabsPrimitive.List>
  );
}

type TriggerElement = React.ReactElement<{
  value: string | number;
  disabled?: boolean;
  children?: React.ReactNode;
}>;

/** A list that keeps the tabs that fit and puts the rest in a More menu (Base UI Menu). */
function OverflowTabsList({
  className,
  size,
  divider,
  flush,
  moreLabel,
  children,
  ...props
}: Omit<TabsListProps, "overflow" | "scrollable"> & { moreLabel: string }) {
  const tabs = useTabsValue();
  const items = React.Children.toArray(children).filter(React.isValidElement) as TriggerElement[];
  const signature = items.map((item) => String(item.props.value)).join("|");
  const [visible, setVisible] = React.useState(items.length);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const moreRef = React.useRef<HTMLButtonElement>(null);
  const widths = React.useRef<number[]>([]);
  const moreWidth = React.useRef(0);

  const fit = React.useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap || widths.current.length < items.length) return;
    const gap = Number.parseFloat(getComputedStyle(wrap).columnGap) || 0;
    const total = widths.current.reduce((sum, w) => sum + w, 0) + gap * (items.length - 1);
    if (total <= wrap.clientWidth) {
      setVisible(items.length);
      return;
    }
    const room = wrap.clientWidth - (moreWidth.current || 96) - gap;
    let used = 0;
    let count = 0;
    for (const w of widths.current) {
      if (used + w > room) break;
      used += w + gap;
      count += 1;
    }
    setVisible(Math.max(1, count));
  }, [items.length]);

  // New set of tabs: show them all again so each one can be measured.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `signature` is the trigger.
  React.useLayoutEffect(() => {
    widths.current = [];
    setVisible(items.length);
  }, [signature]);

  // Measure what is rendered (the first `visible` tabs), then fit.
  React.useLayoutEffect(() => {
    const tabsEls = listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]');
    tabsEls?.forEach((el, index) => {
      widths.current[index] = Math.max(widths.current[index] ?? 0, el.offsetWidth);
    });
    if (moreRef.current && moreRef.current.offsetWidth > 0)
      moreWidth.current = moreRef.current.offsetWidth;
    fit();
  });

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => fit());
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [fit]);

  const shown = items.slice(0, visible);
  const hidden = items.slice(visible);
  const selectedHidden = hidden.some((item) => item.props.value === tabs?.value);

  return (
    <div
      ref={wrapRef}
      data-slot="tabs-list-wrapper"
      data-orientation="horizontal"
      data-size={size ?? "md"}
      className={cn(tabsListVariants({ size, divider, flush }), "cn-tabs-overflow", className)}
    >
      <TabsPrimitive.List
        ref={listRef}
        data-slot="tabs-list"
        className="cn-tabs-overflow-list"
        {...props}
      >
        {shown}
      </TabsPrimitive.List>
      <Menu>
        <MenuTrigger
          ref={moreRef}
          data-slot="tabs-more"
          data-orientation="horizontal"
          data-active={selectedHidden ? "" : undefined}
          hidden={hidden.length === 0}
          className="cn-tab cn-tabs-more"
        >
          {moreLabel}
          <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden />
        </MenuTrigger>
        <MenuContent align="end">
          <MenuRadioGroup
            value={String(tabs?.value ?? "")}
            onValueChange={(next) => {
              const match = hidden.find((item) => String(item.props.value) === next);
              if (match) tabs?.select(match.props.value);
            }}
          >
            {hidden.map((item) => (
              <MenuRadioItem
                key={item.props.value}
                value={String(item.props.value)}
                disabled={item.props.disabled}
              >
                {item.props.children}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    </div>
  );
}

function useTabsValue() {
  return React.useContext(TabsValueContext);
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
