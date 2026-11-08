"use client";

import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Radio, RadioGroup } from "@/components/dga/radio";
import { cn } from "@/registry/bases/base/lib/utils";

const listVariants = cva("cn-list", {
  variants: {
    tone: {
      primary: "cn-list-primary",
      neutral: "cn-list-neutral",
      onColor: "cn-list-on-color",
    },
  },
  defaultVariants: { tone: "neutral" },
});

type ListType = "unordered" | "ordered" | "icon";
type ListMarkers = "latin" | "arabic";

type ListContextValue = { type: ListType; markers: ListMarkers; level: number };
const ListContext = React.createContext<ListContextValue | null>(null);

const ARABIC_LETTERS = ["أ", "ب", "ج", "د", "هـ", "و", "ز", "ح", "ط", "ي"];

/** The marker text of an ordered item: 1-, 2- at the first level; a-, b- (أ-, ب-) at the second. */
function orderedMarker(index: number, level: number, markers: ListMarkers) {
  if (level <= 1) {
    const n = index + 1;
    return `${markers === "arabic" ? n.toLocaleString("ar-SA-u-nu-arab", { useGrouping: false }) : n}-`;
  }
  const letters = markers === "arabic" ? ARABIC_LETTERS : "abcdefghijklmnopqrstuvwxyz".split("");
  return `${letters[index % letters.length]}-`;
}

type ListProps = Omit<React.ComponentProps<"ul">, "type"> &
  VariantProps<typeof listVariants> & {
    /** `unordered` (bullets, default), `ordered` (numbers, then letters one level down) or `icon`. */
    type?: ListType;
    /** The script of ordered markers: `latin` (1-, a-) or `arabic` (١-, أ-). Default `latin`. */
    markers?: ListMarkers;
  };

/**
 * A short list of related items (DGA: List). `tone` is `primary`, `neutral` (default) or
 * `onColor` for brand fills. Put a `List` inside a `ListItem` for the second level. Ordered lists
 * are real `ol` elements, so a screen reader announces the position; the visual markers are
 * decoration. The markers sit on the start side, so they mirror on Arabic pages.
 */
function List({ className, type = "unordered", tone, markers, children, ...props }: ListProps) {
  const parent = React.useContext(ListContext);
  const level = (parent?.level ?? 0) + 1;
  const script = markers ?? parent?.markers ?? "latin";
  const Tag = type === "ordered" ? "ol" : "ul";
  const items = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <ListContext.Provider value={{ type, markers: script, level }}>
      <Tag
        data-slot="list"
        data-type={type}
        data-level={level}
        // The visual markers replace the browser's, so keep the list role for Safari.
        role="list"
        className={cn(listVariants({ tone }), level > 1 && "cn-list-nested", className)}
        {...(props as React.ComponentProps<"ol">)}
      >
        {items.map((item, index) =>
          React.cloneElement(item as React.ReactElement<{ "data-index"?: number }>, {
            "data-index": index,
          }),
        )}
      </Tag>
    </ListContext.Provider>
  );
}

/**
 * One item. In an icon list, `icon` replaces the default tick (any Hugeicons icon). Nest a
 * `List` after the text for the second level.
 */
function ListItem({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<"li"> & {
  /** The icon of an item in an icon list. Default a tick. */
  icon?: IconSvgElement;
}) {
  const context = React.useContext(ListContext);
  const index = Number((props as { "data-index"?: number })["data-index"] ?? 0);
  const type = context?.type ?? "unordered";
  // The text and any nested list share one column next to the marker.
  const nodes = React.Children.toArray(children);
  const nested = nodes.filter((n) => React.isValidElement(n) && n.type === List);
  const text = nodes.filter((n) => !(React.isValidElement(n) && n.type === List));
  return (
    <li data-slot="list-item" className={cn("cn-list-item", className)} {...props}>
      <div className="cn-list-row">
        {type === "ordered" ? (
          <span aria-hidden className="cn-list-marker cn-list-marker-text">
            {orderedMarker(index, context?.level ?? 1, context?.markers ?? "latin")}
          </span>
        ) : type === "icon" ? (
          <HugeiconsIcon
            icon={icon ?? Tick02Icon}
            aria-hidden
            className="cn-list-marker cn-list-marker-icon"
          />
        ) : (
          <span aria-hidden className="cn-list-marker cn-list-marker-dot" />
        )}
        <span className="cn-list-text">{text}</span>
      </div>
      {nested}
    </li>
  );
}

// ---------------------------------------------------------------------------------------------
// Structured List
// ---------------------------------------------------------------------------------------------

const structuredListVariants = cva("cn-structured-list", {
  variants: {
    compact: { true: "cn-structured-list-compact", false: "" },
    contained: { true: "cn-structured-list-contained", false: "" },
    rowDivider: { true: "cn-structured-list-row-divider", false: "" },
    columnDivider: { true: "cn-structured-list-column-divider", false: "" },
  },
  defaultVariants: { compact: false, contained: false, rowDivider: true, columnDivider: false },
});

type StructuredListProps = Omit<React.ComponentProps<"table">, "onChange"> &
  VariantProps<typeof structuredListVariants> & {
    /**
     * Makes the rows choosable, one at a time (a radio button in the first column). Pair it with
     * `StructuredListRow value`.
     */
    selectable?: boolean;
    /** The chosen row's `value` (controlled). */
    value?: string;
    /** The row chosen at first (uncontrolled). */
    defaultValue?: string;
    /** Called with the chosen row's `value`. */
    onValueChange?: (value: string) => void;
    /** Names the group of radio buttons when `selectable`. */
    groupLabel?: string;
  };

/**
 * Rows of text in columns (DGA: Structured List), an HTML table with a lighter look. Use it for
 * short, read-only facts or for a single choice among rows; for data to sort and filter use
 * `Table` or `DataTable`. With `selectable` each row has a radio button and the arrow keys move
 * between rows.
 */
function StructuredList({
  className,
  compact,
  contained,
  rowDivider,
  columnDivider,
  selectable,
  value,
  defaultValue,
  onValueChange,
  groupLabel,
  children,
  ...props
}: StructuredListProps) {
  const table = (
    <table
      data-slot="structured-list"
      className={cn(
        structuredListVariants({ compact, contained, rowDivider, columnDivider }),
        className,
      )}
      {...props}
    >
      {children}
    </table>
  );
  if (!selectable) return table;
  return (
    <RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(String(next))}
      aria-label={groupLabel}
      className="cn-structured-list-group"
    >
      {table}
    </RadioGroup>
  );
}

function StructuredListHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="structured-list-header"
      className={cn("cn-structured-list-header", className)}
      {...props}
    />
  );
}

function StructuredListBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="structured-list-body" className={className} {...props} />;
}

function StructuredListRow({
  className,
  value,
  label,
  disabled,
  children,
  ...props
}: React.ComponentProps<"tr"> & {
  /** What identifies the row in a `selectable` list. */
  value?: string;
  /** The name a screen reader reads for the row's radio button, for example the row's title. */
  label?: string;
  /** The row cannot be chosen. */
  disabled?: boolean;
}) {
  return (
    <tr
      data-slot="structured-list-row"
      data-disabled={disabled ? "" : undefined}
      className={cn("cn-structured-list-row", className)}
      {...props}
    >
      {value !== undefined ? (
        <td data-slot="structured-list-select" className="cn-structured-list-select">
          <Radio value={value} disabled={disabled} aria-label={label} />
        </td>
      ) : null}
      {children}
    </tr>
  );
}

/** A column heading. Use `scope="col"` (the default). */
function StructuredListHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="structured-list-head"
      scope="col"
      className={cn("cn-structured-list-head", className)}
      {...props}
    />
  );
}

function StructuredListCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="structured-list-cell"
      className={cn("cn-structured-list-cell", className)}
      {...props}
    />
  );
}

export type { ListProps, StructuredListProps };
export {
  List,
  ListItem,
  listVariants,
  StructuredList,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListHeader,
  StructuredListRow,
  structuredListVariants,
};
