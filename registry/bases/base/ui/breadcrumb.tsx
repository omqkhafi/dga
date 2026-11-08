"use client";

import { ArrowRight01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

type BreadcrumbProps = React.ComponentProps<"nav"> & {
  /**
   * The most levels shown before the middle ones fold into an ellipsis button. DGA folds above 5
   * levels. The first level and the last two are always kept. Default 5.
   */
  maxItems?: number;
  /** The name of the ellipsis button that shows the folded levels. Translate it on Arabic pages. */
  expandLabel?: string;
};

/**
 * The path to the current page (DGA: Breadcrumb). Put `BreadcrumbItem`s in order, the last one
 * holding a `BreadcrumbPage`. Name it with `aria-label` ("Breadcrumb"). Above `maxItems` levels
 * the middle ones fold behind an ellipsis button, and below the `sm` width everything between
 * the first level and the last two folds the same way. The separators mirror on Arabic pages.
 */
function Breadcrumb({
  className,
  children,
  maxItems = 5,
  expandLabel = "Show full path",
  ...props
}: BreadcrumbProps) {
  const [expanded, setExpanded] = React.useState(false);
  const items = React.Children.toArray(children).filter(React.isValidElement);
  const total = items.length;
  // The levels that can fold: everything between the first and the last two.
  const foldable = Math.max(0, total - 3);
  const foldedOnDesktop = total > maxItems && foldable > 0;
  const foldedOnMobile = foldable > 0;

  const content: React.ReactNode[] = [];
  items.forEach((item, index) => {
    const folds = index >= 1 && index <= foldable;
    const hidden = folds && !expanded && (foldedOnDesktop ? "hidden" : "max-sm:hidden");
    content.push(
      <React.Fragment key={item.key ?? index}>
        {React.cloneElement(
          item as React.ReactElement<{ className?: string; separator?: boolean }>,
          {
            className: cn((item.props as { className?: string }).className, hidden || undefined),
            separator: index < total - 1,
          },
        )}
      </React.Fragment>,
    );
    if (index === 0 && foldedOnMobile && !expanded) {
      content.push(
        <li
          key="ellipsis"
          data-slot="breadcrumb-ellipsis-item"
          className={cn("cn-breadcrumb-item", !foldedOnDesktop && "sm:hidden")}
        >
          <button
            type="button"
            data-slot="breadcrumb-ellipsis"
            aria-label={expandLabel}
            className="cn-breadcrumb-ellipsis"
            onClick={() => setExpanded(true)}
          >
            <HugeiconsIcon icon={MoreHorizontalIcon} aria-hidden />
          </button>
          <BreadcrumbSeparator />
        </li>,
      );
    }
  });

  return (
    <nav data-slot="breadcrumb" className={cn("cn-breadcrumb", className)} {...props}>
      <ol data-slot="breadcrumb-list" className="cn-breadcrumb-list">
        {content}
      </ol>
    </nav>
  );
}

/** One level. Holds a `BreadcrumbLink`, or a `BreadcrumbPage` for the current page. */
function BreadcrumbItem({
  className,
  children,
  separator = true,
  ...props
}: React.ComponentProps<"li"> & {
  /** Draws the separator after the item. `Breadcrumb` turns it off for the last item. */
  separator?: boolean;
}) {
  return (
    <li data-slot="breadcrumb-item" className={cn("cn-breadcrumb-item", className)} {...props}>
      {children}
      {separator ? <BreadcrumbSeparator /> : null}
    </li>
  );
}

/** A link to an ancestor page. Pass `render` to use your router's link. */
function BreadcrumbLink({
  className,
  render,
  ...props
}: React.ComponentProps<"a"> & { render?: React.ReactElement<React.ComponentProps<"a">> }) {
  const merged = {
    "data-slot": "breadcrumb-link",
    className: cn("cn-breadcrumb-link", className),
    ...props,
  };
  return render ? React.cloneElement(render, merged) : <a {...merged} />;
}

/** The current page: plain text with `aria-current="page"`. */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("cn-breadcrumb-page", className)}
      {...props}
    />
  );
}

/** The chevron between levels. It mirrors on Arabic pages and is hidden from screen readers. */
function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-separator"
      aria-hidden
      className={cn("cn-breadcrumb-separator", className)}
      {...props}
    >
      <HugeiconsIcon icon={ArrowRight01Icon} />
    </span>
  );
}

export type { BreadcrumbProps };
export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator };
