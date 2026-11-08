"use client";

import {
  ArrowDown02Icon,
  ArrowUp02Icon,
  ArrowUpDownIcon,
  FilterHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const tableVariants = cva("w-full caption-bottom border-collapse text-start text-md text-table-text-body [--t-row:4rem] [--t-head:3rem]", {
  variants: {
    compact: { true: "[--t-head:2.5rem] [--t-row:3rem]", false: "" },
    contained: { true: "[&_:is([data-slot=table-cell],[data-slot=table-head])]:border-table-cell-border", false: "" },
    striped: { true: "[&_[data-slot=table-body]>[data-slot=table-row]:nth-child(even):not([data-selected]):not(:hover)]:bg-table-background-row-alt", false: "" },
    rowDivider: { true: "[&_:is([data-slot=table-cell],[data-slot=table-head])]:border-b [&_:is([data-slot=table-cell],[data-slot=table-head])]:border-table-cell-border", false: "" },
    columnDivider: { true: "[&_:is([data-slot=table-cell],[data-slot=table-head])]:border-e [&_:is([data-slot=table-cell],[data-slot=table-head])]:border-table-cell-border [&_:is([data-slot=table-cell],[data-slot=table-head]):last-child]:border-e-0", false: "" },
  },
  defaultVariants: {
    compact: false,
    contained: false,
    striped: false,
    rowDivider: true,
    columnDivider: false,
  },
});

type TableProps = React.ComponentProps<"table"> &
  VariantProps<typeof tableVariants> & {
    /** Classes for the scrolling wrapper around the table. */
    containerClassName?: string;
    /**
     * The name of the scrolling region, read by screen readers when the table is wider than its
     * container. Leave it out for a table that always fits.
     */
    scrollLabel?: string;
  };

/**
 * A plain semantic HTML table (DGA: Table). `compact` shrinks the rows, `striped` shades every
 * other row (DGA: alternating rows), `contained` adds a border and rounded corners, and
 * `rowDivider` (default) and `columnDivider` draw the lines. The table scrolls sideways inside
 * its own wrapper when the screen is narrow, and columns follow the page direction. Give it a
 * `TableCaption` or an `aria-label`.
 */
function Table({
  className,
  containerClassName,
  scrollLabel,
  compact,
  contained,
  striped,
  rowDivider,
  columnDivider,
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-container"
      // A scrolling region must be reachable by keyboard (WCAG 2.1.1).
      {...(scrollLabel ? { role: "region", "aria-label": scrollLabel, tabIndex: 0 } : {})}
      className={cn(
        "relative w-full overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black",
        contained && "rounded-md border border-table-cell-border",
        containerClassName,
      )}
    >
      <table
        data-slot="table"
        className={cn(
          tableVariants({ compact, contained, striped, rowDivider, columnDivider }),
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("bg-table-background-header text-xs font-medium text-table-text-head [&_[data-slot=table-row]]:bg-table-background-header [&_[data-slot=table-row]:hover]:bg-table-background-header", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child>*]:border-b-0", className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("bg-table-background-header font-medium", className)} {...props} />;
}

/** A row. `selected` shades it; rows also darken on hover and when they hold the focus. */
function TableRow({
  className,
  selected,
  ...props
}: React.ComponentProps<"tr"> & {
  /** Marks the row as selected: the selected fill and `aria-selected`. */
  selected?: boolean;
}) {
  return (
    <tr
      data-slot="table-row"
      data-selected={selected ? "" : undefined}
      aria-selected={selected || undefined}
      className={cn("bg-table-background-row transition-colors hover:bg-table-background-row-hovered motion-reduce:transition-none data-selected:bg-table-background-row-select data-selected:hover:bg-table-background-row-selected-hovered data-selected:hover:shadow-[inset_0_-1px_0_0_var(--table-border-row-selected-hovered)]", className)}
      {...props}
    />
  );
}

/** A column or row heading. `scope` is `col` by default; pass `scope="row"` for a row heading. */
function TableHead({ className, scope = "col", ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      scope={scope}
      className={cn("h-(--t-head) whitespace-nowrap px-table-cell-h-padding py-table-cell-v-padding text-start align-middle font-medium", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("h-(--t-row) px-table-cell-h-padding py-table-cell-v-padding align-middle", className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption data-slot="table-caption" className={cn("px-table-cell-h-padding py-3 text-start text-sm text-text-primary-paragraph", className)} {...props} />
  );
}

type SortDirection = false | "asc" | "desc";

/**
 * The sort button in a column heading (DGA: Table Header Cell, Sort). `direction` is `false`
 * (not sorted), `"asc"` or `"desc"`. Put it in the `TableHead` and set `aria-sort` on that
 * heading. Name it, for example "Sort by Name".
 */
function TableSortButton({
  className,
  direction = false,
  ...props
}: React.ComponentProps<"button"> & { direction?: SortDirection }) {
  return (
    <button
      type="button"
      data-slot="table-sort"
      data-sort={direction || "off"}
      className={cn("inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-xs border-0 bg-button-background-neutral-default p-0 text-icon-default transition-colors [&_svg]:size-4 hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black data-[sort=asc]:bg-button-background-black-default data-[sort=asc]:text-icon-oncolor data-[sort=asc]:hover:bg-button-background-black-hovered data-[sort=asc]:active:bg-button-background-black-pressed data-[sort=desc]:bg-button-background-black-default data-[sort=desc]:text-icon-oncolor data-[sort=desc]:hover:bg-button-background-black-hovered data-[sort=desc]:active:bg-button-background-black-pressed data-active:bg-button-background-black-default data-active:text-icon-oncolor data-active:hover:bg-button-background-black-hovered data-active:active:bg-button-background-black-pressed disabled:pointer-events-none disabled:bg-transparent disabled:text-icon-default-disabled motion-reduce:transition-none", className)}
      {...props}
    >
      <HugeiconsIcon
        icon={
          direction === "asc"
            ? ArrowUp02Icon
            : direction === "desc"
              ? ArrowDown02Icon
              : ArrowUpDownIcon
        }
        aria-hidden
      />
    </button>
  );
}

/**
 * The filter button in a column heading (DGA: Table Header Cell, Filter). `active` is true while
 * a filter is applied; set `aria-pressed` or `aria-expanded` to match what the button does.
 */
function TableFilterButton({
  className,
  active = false,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      type="button"
      data-slot="table-filter"
      data-active={active ? "" : undefined}
      className={cn("inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-xs border-0 bg-button-background-neutral-default p-0 text-icon-default transition-colors [&_svg]:size-4 hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black data-[sort=asc]:bg-button-background-black-default data-[sort=asc]:text-icon-oncolor data-[sort=asc]:hover:bg-button-background-black-hovered data-[sort=asc]:active:bg-button-background-black-pressed data-[sort=desc]:bg-button-background-black-default data-[sort=desc]:text-icon-oncolor data-[sort=desc]:hover:bg-button-background-black-hovered data-[sort=desc]:active:bg-button-background-black-pressed data-active:bg-button-background-black-default data-active:text-icon-oncolor data-active:hover:bg-button-background-black-hovered data-active:active:bg-button-background-black-pressed disabled:pointer-events-none disabled:bg-transparent disabled:text-icon-default-disabled motion-reduce:transition-none", className)}
      {...props}
    >
      <HugeiconsIcon icon={FilterHorizontalIcon} aria-hidden />
    </button>
  );
}

export type { SortDirection, TableProps };
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFilterButton,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableSortButton,
  tableVariants,
};
