import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

type IconSvg = React.ComponentProps<typeof HugeiconsIcon>["icon"];

const secondNavVariants = cva("cn-second-nav", {
  variants: {
    tone: { gray: "cn-second-nav-tone-gray", primary: "cn-second-nav-tone-primary" },
  },
  defaultVariants: { tone: "gray" },
});

/** One entry of the strip: contextual text (a date, the weather) or a link. */
type SecondNavEntry = {
  label: string;
  icon?: IconSvg;
  /** Makes the entry a link. */
  href?: string;
  /** Makes the entry a button. */
  onClick?: () => void;
  /** The page the person is on: `aria-current="page"`. */
  current?: boolean;
  disabled?: boolean;
};

type SecondNavProps = Omit<React.ComponentProps<"nav">, "children"> &
  VariantProps<typeof secondNavVariants> & {
    /** Contextual items at the start: a date, the weather, a location, or links to sibling pages. */
    items?: SecondNavEntry[];
    /** Actions at the end: text size, contrast, a help link. */
    actions?: SecondNavEntry[];
    /** Spans the whole width. Default: centred, 1280px at most. */
    fullWidth?: boolean;
    /** Shows the divider between items and actions. Default true. */
    divider?: boolean;
  };

function Entry({ entry }: { entry: SecondNavEntry }) {
  const content = (
    <>
      {entry.icon ? <HugeiconsIcon icon={entry.icon} aria-hidden /> : null}
      {entry.label}
    </>
  );
  const shared = {
    "data-slot": "second-nav-item",
    className: "cn-second-nav-item",
    "aria-current": entry.current ? ("page" as const) : undefined,
  };
  if (entry.href && !entry.disabled) {
    return (
      <a {...shared} href={entry.href}>
        {content}
      </a>
    );
  }
  if (entry.onClick || entry.disabled) {
    return (
      <button {...shared} type="button" disabled={entry.disabled} onClick={entry.onClick}>
        {content}
      </button>
    );
  }
  return <span {...shared}>{content}</span>;
}

/**
 * The secondary strip above the header (DGA: Second Nav Header): contextual items such as the
 * date, the weather or sibling pages, then actions, 40px high, gray or primary. Entries with an
 * `href` are links, with `onClick` buttons, and the rest plain text. On narrow screens it scrolls
 * sideways instead of wrapping. Name it with `aria-label`.
 */
function SecondNav({
  className,
  tone,
  items = [],
  actions = [],
  fullWidth = false,
  divider = true,
  ...props
}: SecondNavProps) {
  return (
    <nav
      data-slot="second-nav"
      data-tone={tone ?? "gray"}
      className={cn(secondNavVariants({ tone }), className)}
      {...props}
    >
      <div className="cn-second-nav-inner" data-full={fullWidth ? "" : undefined}>
        {items.length > 0 ? (
          <ul className="cn-second-nav-group">
            {items.map((entry) => (
              <li key={entry.label}>
                <Entry entry={entry} />
              </li>
            ))}
          </ul>
        ) : null}
        {divider && items.length > 0 && actions.length > 0 ? (
          <span aria-hidden className="cn-second-nav-divider ms-auto" />
        ) : null}
        {actions.length > 0 ? (
          <ul
            className={cn(
              "cn-second-nav-group",
              !(divider && items.length > 0) && "cn-second-nav-actions",
            )}
          >
            {actions.map((entry) => (
              <li key={entry.label}>
                <Entry entry={entry} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </nav>
  );
}

export type { SecondNavEntry, SecondNavProps };
export { SecondNav, secondNavVariants };
