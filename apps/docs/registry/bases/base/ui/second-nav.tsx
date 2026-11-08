import { Calendar03Icon, Clock01Icon, CloudIcon, Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

type IconSvg = React.ComponentProps<typeof HugeiconsIcon>["icon"];

const secondNavVariants = cva("w-full text-md", {
  variants: {
    tone: { gray: "bg-background-neutral-100 text-text-primary-paragraph", primary: "bg-background-primary text-text-oncolor-primary" },
  },
  defaultVariants: { tone: "gray" },
});

/** The ready-made kinds of contextual item. Each one brings its own icon. */
type SecondNavKind = "weather" | "date" | "time" | "location";

const kindIcons: Record<SecondNavKind, IconSvg> = {
  weather: CloudIcon,
  date: Calendar03Icon,
  time: Clock01Icon,
  location: Location01Icon,
};

/** One entry of the strip: contextual text (a date, the weather), an icon action or a link. */
type SecondNavEntry = {
  /** The text. With `iconOnly` it is the accessible name. */
  label: string;
  icon?: IconSvg;
  /** A ready-made item: its icon is used unless you pass `icon`. */
  kind?: SecondNavKind;
  /** Shows only the icon. The label stays as the accessible name. */
  iconOnly?: boolean;
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
    /** Contextual items at the start: the weather, date, time or location (`kind`). */
    items?: SecondNavEntry[];
    /** Actions at the end: icon-only (`iconOnly`) or icon and text, such as zoom or contrast. */
    actions?: SecondNavEntry[];
    /** Spans the whole width. Default: centred, 1280px at most. */
    fullWidth?: boolean;
    /** Shows the divider between items and actions. Default true. */
    divider?: boolean;
  };

type SecondNavItemProps = {
  entry: SecondNavEntry;
  /** `on-color` is for the primary (green) strip. Inside a `SecondNav` it follows the strip. */
  tone?: "default" | "on-color";
};

/**
 * One item of the strip (DGA: sub-header-Item): an optional icon and text, 4px apart, in the
 * default or on-colour state. `SecondNav` renders its entries with it; use it alone to build your
 * own strip.
 */
function SecondNavItem({ entry, tone }: SecondNavItemProps) {
  const icon = entry.icon ?? (entry.kind ? kindIcons[entry.kind] : undefined);
  const content = (
    <>
      {icon ? <HugeiconsIcon icon={icon} aria-hidden /> : null}
      {entry.iconOnly ? <span className="sr-only">{entry.label}</span> : entry.label}
    </>
  );
  const shared = {
    "data-slot": "second-nav-item",
    "data-tone": tone,
    "data-icon-only": entry.iconOnly && icon ? "" : undefined,
    "data-kind": entry.kind,
    className: "inline-flex h-6 shrink-0 items-center gap-1 rounded-xs border-0 bg-transparent p-0 text-md font-normal text-inherit no-underline [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-icon-neutral in-data-[tone=primary]:[&_svg]:text-icon-oncolor data-[tone=on-color]:text-text-oncolor-primary data-[tone=on-color]:[&_svg]:text-icon-oncolor data-icon-only:min-w-6 data-icon-only:justify-center [&:is(a,button)]:cursor-pointer [&:is(a,button)]:hover:underline [&:is(a,button)]:hover:underline-offset-4 [&:is(a,button)]:active:underline [&:is(a,button)]:active:underline-offset-4 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black in-data-[tone=primary]:focus-visible:outline-border-white data-[tone=on-color]:focus-visible:outline-border-white aria-[current=page]:font-bold aria-[current=page]:underline aria-[current=page]:underline-offset-4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-text-default-disabled aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-text-default-disabled",
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
 * weather, date, time and location, then actions (icon-only or icon and text), 40px high, gray or
 * primary. Entries with an `href` are links, with `onClick` buttons, and the rest plain text. On narrow screens it scrolls
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
      <div className="mx-auto flex h-10 w-full max-w-[1280px] items-center gap-4 overflow-x-auto overflow-y-hidden px-4 whitespace-nowrap lg:px-8 data-full:max-w-none [scrollbar-width:none]" data-full={fullWidth ? "" : undefined}>
        {items.length > 0 ? (
          <ul className="m-0 flex list-none items-center gap-4 p-0">
            {items.map((entry) => (
              <li key={entry.label}>
                <SecondNavItem entry={entry} />
              </li>
            ))}
          </ul>
        ) : null}
        {divider && items.length > 0 && actions.length > 0 ? (
          <span aria-hidden className="h-5 w-px shrink-0 bg-border-neutral-primary in-data-[tone=primary]:bg-alpha-white-30 ms-auto" />
        ) : null}
        {actions.length > 0 ? (
          <ul
            className={cn(
              "m-0 flex list-none items-center gap-4 p-0",
              !(divider && items.length > 0) && "ms-auto",
            )}
          >
            {actions.map((entry) => (
              <li key={entry.label}>
                <SecondNavItem entry={entry} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </nav>
  );
}

export type { SecondNavEntry, SecondNavItemProps, SecondNavKind, SecondNavProps };
export { SecondNav, SecondNavItem, secondNavVariants };
