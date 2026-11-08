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

const tableVariants = cva("cn-table", {
  variants: {
    compact: { true: "cn-table-compact", false: "" },
    contained: { true: "cn-table-contained", false: "" },
    striped: { true: "cn-table-striped", false: "" },
    rowDivider: { true: "cn-table-row-divider", false: "" },
    columnDivider: { true: "cn-table-column-divider", false: "" },
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
        "cn-table-container",
        contained && "cn-table-container-contained",
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
  return <thead data-slot="table-header" className={cn("cn-table-header", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("cn-table-body", className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("cn-table-footer", className)} {...props} />;
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
      className={cn("cn-table-row", className)}
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
      className={cn("cn-table-head", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("cn-table-cell", className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption data-slot="table-caption" className={cn("cn-table-caption", className)} {...props} />
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
      className={cn("cn-table-icon-button", className)}
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
      className={cn("cn-table-icon-button", className)}
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
