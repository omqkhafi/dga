"use client";

import { InboxIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { Checkbox } from "@/components/dga/checkbox";
import { Pagination, type PaginationProps } from "@/components/dga/pagination";
import { Skeleton } from "@/components/dga/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  type TableProps,
  TableRow,
  TableSortButton,
} from "@/components/dga/table";

/** Every string the data table shows by itself. Translate them on Arabic pages. */
type DataTableLabels = {
  /** The name of the scrolling region around a wide table. */
  region: string;
  /** The name of the "select every row on this page" checkbox. */
  selectAll: string;
  /** The name of a row's checkbox, for example "Select row 3". */
  selectRow: (row: number) => string;
  /** The name of a sort button, for example "Sort by Name". */
  sortBy: (column: string) => string;
  /** The message when no rows match. */
  empty: string;
  /** Read out while the table loads. */
  loading: string;
  /** The line above the pagination, for example "1 to 10 of 42". */
  range: (from: number, to: number, total: number) => string;
  /** How many rows are selected, for example "3 selected". */
  selected: (count: number) => string;
  /** The labels of the pagination below the table. */
  pagination?: Pick<
    PaginationProps,
    "previousLabel" | "nextLabel" | "pageLabel" | "compactLabel" | "formatNumber"
  > & { label?: string };
};

const defaultLabels: DataTableLabels = {
  region: "Table, scrolls sideways",
  selectAll: "Select all rows on this page",
  selectRow: (row) => `Select row ${row}`,
  sortBy: (column) => `Sort by ${column}`,
  empty: "No results",
  loading: "Loading",
  range: (from, to, total) => `${from} to ${to} of ${total}`,
  selected: (count) => `${count} selected`,
};

type DataTableProps<TData> = Omit<TableProps, "children" | "onChange"> & {
  /** TanStack Table column definitions. Give each a string `header` or `meta: { label }`. */
  // biome-ignore lint/suspicious/noExplicitAny: each column has its own value type
  columns: ColumnDef<TData, any>[];
  /** The rows. */
  data: TData[];
  /** A stable id for a row, so selection survives sorting and paging. Default: its index. */
  getRowId?: (row: TData, index: number) => string;
  /** Rows per page. Default 10. Pass `0` to show every row and hide the pagination. */
  pageSize?: number;
  /** Text to filter the rows by, across every column (controlled). */
  globalFilter?: string;
  /** Adds a checkbox column and `aria-selected` rows. */
  selectable?: boolean;
  /** Called with the selected rows whenever the selection changes. */
  onSelectionChange?: (rows: TData[]) => void;
  /** The sort at first, for example `[{ id: "name", desc: false }]`. */
  defaultSorting?: SortingState;
  /** Shows placeholder rows and marks the table `aria-busy`. */
  loading?: boolean;
  /** What to show when there are no rows. A string or any content. */
  emptyState?: React.ReactNode;
  /** A visible title for the table, also its accessible name. */
  caption?: React.ReactNode;
  /** The strings the table shows by itself. */
  labels?: Partial<DataTableLabels>;
};

/** The text of a column for names such as "Sort by Name". */
function columnName<TData>(column: Column<TData, unknown>) {
  const meta = column.columnDef.meta as { label?: string } | undefined;
  const header = column.columnDef.header;
  return meta?.label ?? (typeof header === "string" ? header : column.id);
}

/**
 * A table of records with sorting, filtering, row selection and pagination (built on TanStack
 * Table, the DGA Table and the DGA Pagination). It is a plain `table` underneath: headings have
 * `aria-sort`, selection is real checkboxes, and a table wider than the screen scrolls sideways
 * inside a region you can reach with the keyboard. Columns follow the page direction, so they
 * run right to left on Arabic pages. Set `loading` while fetching.
 */
function DataTable<TData>({
  columns: columnDefs,
  data,
  getRowId,
  pageSize = 10,
  globalFilter,
  selectable,
  onSelectionChange,
  defaultSorting = [],
  loading,
  emptyState,
  caption,
  labels: labelOverrides,
  className,
  striped = true,
  ...tableProps
}: DataTableProps<TData>) {
  const labels = { ...defaultLabels, ...labelOverrides };
  const { label: paginationLabel, ...paginationLabels } = labels.pagination ?? {};
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);
  const [columnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const columns = React.useMemo(() => {
    const base = columnDefs as ColumnDef<TData, unknown>[];
    if (!selectable) return base;
    const select: ColumnDef<TData, unknown> = {
      id: "select",
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          aria-label={labels.selectAll}
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onCheckedChange={(next) => table.toggleAllPageRowsSelected(next)}
        />
      ),
      cell: ({ row, table }) => (
        <Checkbox
          aria-label={labels.selectRow(
            row.index +
              1 +
              table.getState().pagination.pageIndex * table.getState().pagination.pageSize,
          )}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(next) => row.toggleSelected(next)}
        />
      ),
    };
    return [select, ...base];
    // biome-ignore lint/correctness/useExhaustiveDependencies: the labels object is rebuilt each render
  }, [columnDefs, selectable, labels.selectAll, labels.selectRow]);

  const table = useReactTable<TData>({
    data,
    columns,
    getRowId,
    state: { sorting, columnFilters, globalFilter, rowSelection },
    initialState: { pagination: { pageIndex: 0, pageSize: pageSize || data.length || 1 } },
    onSortingChange: setSorting,
    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
      onSelectionChange?.(
        data.filter((row, index) => next[getRowId ? getRowId(row, index) : String(index)]),
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
  });

  const rows = table.getRowModel().rows;
  const total = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize: size } = table.getState().pagination;
  const from = total === 0 ? 0 : pageIndex * size + 1;
  const to = Math.min((pageIndex + 1) * size, total);
  const selectedCount = Object.keys(rowSelection).length;
  const columnCount = table.getVisibleLeafColumns().length;
  const showPagination = pageSize !== 0 && table.getPageCount() > 1;

  return (
    <div data-slot="data-table" className="flex w-full min-w-0 flex-col gap-3">
      <Table
        striped={striped}
        scrollLabel={labels.region}
        aria-busy={loading || undefined}
        className={className}
        {...tableProps}
      >
        {caption ? <TableCaption>{caption}</TableCaption> : null}
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => {
                const sort = header.column.getIsSorted();
                const name = columnName(header.column);
                return (
                  <TableHead
                    key={header.id}
                    aria-sort={
                      sort === "asc" ? "ascending" : sort === "desc" ? "descending" : undefined
                    }
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() ? (
                        <TableSortButton
                          direction={sort}
                          aria-label={labels.sortBy(name)}
                          onClick={header.column.getToggleSortingHandler()}
                        />
                      ) : null}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: Math.min(size, 5) }, (_, row) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder rows
              <TableRow key={row}>
                {Array.from({ length: columnCount }, (_, cell) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder cells
                  <TableCell key={cell}>
                    <Skeleton shape="line" size="sm" className="w-full max-w-40" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columnCount} className="h-40 text-center text-text-primary-paragraph [&_svg]:mx-auto [&_svg]:mb-2 [&_svg]:size-8 [&_svg]:text-icon-default-500">
                {emptyState ?? (
                  <>
                    <HugeiconsIcon icon={InboxIcon} aria-hidden />
                    <span>{labels.empty}</span>
                  </>
                )}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id} selected={row.getIsSelected()}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {loading ? (
        <p role="status" className="sr-only">
          {labels.loading}
        </p>
      ) : null}
      {showPagination || selectable ? (
        <div data-slot="data-table-footer" className="flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-sm text-text-primary-paragraph tabular-nums" aria-live="polite">
            {selectable && selectedCount > 0 ? `${labels.selected(selectedCount)} · ` : null}
            {labels.range(from, to, total)}
          </p>
          {showPagination ? (
            <Pagination
              page={pageIndex + 1}
              pageCount={table.getPageCount()}
              onPageChange={(page) => table.setPageIndex(page - 1)}
              aria-label={paginationLabel}
              {...paginationLabels}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export type { DataTableLabels, DataTableProps };
export { DataTable };
