"use client";

import { ArrowLeft01Icon, ArrowRight01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const paginationVariants = cva("max-w-full", {
  variants: {
    size: { sm: "[--pg-size:1.5rem] [--pg-text:var(--text-sm)]", md: "[--pg-size:2rem] [--pg-text:var(--text-md)]", lg: "[--pg-size:2.5rem] [--pg-text:var(--text-md)]" },
  },
  defaultVariants: { size: "md" },
});

type PageItem = number | "start-ellipsis" | "end-ellipsis";

/**
 * The page numbers to show: the first and last page, the current one with `siblingCount` pages on
 * each side, and an ellipsis where pages are skipped. The row always has the same number of slots
 * (`2 * siblingCount + 5`) while there are enough pages, so it does not jump as you page.
 */
function getPaginationRange(page: number, pageCount: number, siblingCount = 1): PageItem[] {
  const slots = siblingCount * 2 + 5;
  const range = (from: number, to: number) =>
    Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);
  if (pageCount <= slots) return range(1, pageCount);
  const current = Math.min(Math.max(page, 1), pageCount);
  const left = Math.max(current - siblingCount, 1);
  const right = Math.min(current + siblingCount, pageCount);
  const edge = siblingCount * 2 + 3;
  if (left <= 3) return [...range(1, edge), "end-ellipsis", pageCount];
  if (right >= pageCount - 2)
    return [1, "start-ellipsis", ...range(pageCount - edge + 1, pageCount)];
  return [1, "start-ellipsis", ...range(left, right), "end-ellipsis", pageCount];
}

type PaginationProps = Omit<React.ComponentProps<"nav">, "onChange"> &
  VariantProps<typeof paginationVariants> & {
    /** The current page, from 1 (controlled). */
    page?: number;
    /** The page shown at first (uncontrolled). Default 1. */
    defaultPage?: number;
    /** How many pages there are. */
    pageCount: number;
    /** Called with the page the person chose. */
    onPageChange?: (page: number) => void;
    /** Pages shown on each side of the current one. Default 1. */
    siblingCount?: number;
    /**
     * Makes each control a link to this address instead of a button, for server-rendered or
     * router-driven pagination. `onPageChange` still runs on click.
     */
    getHref?: (page: number) => string;
    /** The name of the previous button. Translate it on Arabic pages. */
    previousLabel?: string;
    /** The name of the next button. Translate it on Arabic pages. */
    nextLabel?: string;
    /** The name of a page button, for example "Page 3". Translate it on Arabic pages. */
    pageLabel?: (page: number) => string;
    /** The text between the arrows on narrow screens, for example "3 of 12". */
    compactLabel?: (page: number, pageCount: number) => string;
    /** Turns a number into the digits shown, for example Arabic-Indic digits on Arabic pages. */
    formatNumber?: (value: number) => string;
  };

/**
 * Moves through a long list one page at a time (DGA: Pagination). Name it with `aria-label`.
 * The current page has `aria-current="page"`. Below the `sm` width the numbers fold into a
 * compact "3 of 12" between the previous and next arrows. The arrows mirror on Arabic pages.
 */
function Pagination({
  className,
  size,
  page: pageProp,
  defaultPage = 1,
  pageCount,
  onPageChange,
  siblingCount = 1,
  getHref,
  previousLabel = "Previous page",
  nextLabel = "Next page",
  pageLabel = (n) => `Page ${n}`,
  compactLabel = (n, count) => `${n} of ${count}`,
  formatNumber = String,
  ...props
}: PaginationProps) {
  const [inner, setInner] = React.useState(defaultPage);
  const page = Math.min(Math.max(pageProp ?? inner, 1), Math.max(pageCount, 1));
  const go = (next: number) => {
    if (next < 1 || next > pageCount || next === page) return;
    if (pageProp === undefined) setInner(next);
    onPageChange?.(next);
  };

  const control = (
    target: number,
    content: React.ReactNode,
    label: string,
    { current = false, disabled = false, slot = "pagination-link" } = {},
  ) => {
    const common = {
      "data-slot": slot,
      "aria-label": label,
      "aria-current": current ? ("page" as const) : undefined,
      "data-current": current ? "" : undefined,
      className: "inline-flex size-(--pg-size) min-w-(--pg-size) cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 font-normal text-(length:--pg-text) text-text-default no-underline transition-colors tabular-nums hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black data-current:bg-background-primary data-current:font-semibold data-current:text-text-oncolor-primary data-current:hover:bg-button-background-primary-hovered data-current:active:bg-button-background-primary-pressed disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-text-default-disabled motion-reduce:transition-none",
    };
    if (getHref && !disabled) {
      return (
        <a
          {...common}
          href={getHref(target)}
          onClick={() => {
            if (pageProp === undefined) setInner(target);
            onPageChange?.(target);
          }}
        >
          {content}
        </a>
      );
    }
    return (
      <button type="button" {...common} disabled={disabled} onClick={() => go(target)}>
        {content}
      </button>
    );
  };

  const items = getPaginationRange(page, pageCount, siblingCount);
  return (
    <nav
      data-slot="pagination"
      data-size={size ?? "md"}
      aria-label="Pagination"
      className={cn(paginationVariants({ size }), className)}
      {...props}
    >
      <ul data-slot="pagination-content" className="m-0 flex list-none flex-wrap items-center justify-center gap-pagination-items-padding p-0">
        <li>
          {control(
            page - 1,
            <HugeiconsIcon icon={ArrowLeft01Icon} aria-hidden className="size-5 shrink-0 text-icon-default rtl:-scale-x-100 in-disabled:text-icon-default-disabled" />,
            previousLabel,
            { disabled: page <= 1, slot: "pagination-previous" },
          )}
        </li>
        {items.map((item) =>
          typeof item === "number" ? (
            <li key={item} className="max-sm:hidden">
              {control(item, formatNumber(item), pageLabel(item), { current: item === page })}
            </li>
          ) : (
            <li key={item} className="max-sm:hidden" data-slot="pagination-ellipsis">
              <span className="inline-flex size-(--pg-size) items-center justify-center text-icon-default [&_svg]:size-4" aria-hidden>
                <HugeiconsIcon icon={MoreHorizontalIcon} />
              </span>
            </li>
          ),
        )}
        <li className="flex min-w-20 items-center justify-center text-(length:--pg-text) font-medium text-text-default tabular-nums sm:hidden" data-slot="pagination-compact">
          <span aria-current="page">{compactLabel(page, pageCount)}</span>
        </li>
        <li>
          {control(
            page + 1,
            <HugeiconsIcon icon={ArrowRight01Icon} aria-hidden className="size-5 shrink-0 text-icon-default rtl:-scale-x-100 in-disabled:text-icon-default-disabled" />,
            nextLabel,
            { disabled: page >= pageCount, slot: "pagination-next" },
          )}
        </li>
      </ul>
    </nav>
  );
}

export type { PageItem, PaginationProps };
export { getPaginationRange, Pagination, paginationVariants };
