import { Calendar03Icon, Clock01Icon, CloudIcon, Location01Icon } from "@hugeicons/core-free-icons";
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
    /** An optional menu of links (not part of DGA's Second Nav). */
    links?: SecondNavEntry[];
    /**
     * Where the `links` menu sits: `start` (before the items, default) or `center` (in the middle
     * of the strip, between the items and the actions).
     */
    linksPosition?: "start" | "center";
    /** Spans the whole width. Default: centred, 1280px at most. */
    fullWidth?: boolean;
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
 * weather, date, time and location at the start and actions (icon-only or icon and text) at the
 * end, spread apart, 40px high, gray or primary. An optional `links` menu can sit at the start or
 * in the centre. Entries with an `href` are links, with `onClick` buttons, and the rest plain
 * text. On narrow screens it scrolls sideways instead of wrapping. Name it with `aria-label`.
 */
function SecondNav({
  className,
  tone,
  items = [],
  actions = [],
  links = [],
  linksPosition = "start",
  fullWidth = false,
  ...props
}: SecondNavProps) {
  const linksGroup =
    links.length > 0 ? (
      <ul className="cn-second-nav-group cn-second-nav-links" data-slot="second-nav-links">
        {links.map((entry) => (
          <li key={entry.label} className="flex items-center">
            <SecondNavItem entry={entry} />
          </li>
        ))}
      </ul>
    ) : null;
  return (
    <nav
      data-slot="second-nav"
      data-tone={tone ?? "gray"}
      className={cn(secondNavVariants({ tone }), className)}
      {...props}
    >
      <div
        className="cn-second-nav-inner"
        data-full={fullWidth ? "" : undefined}
        data-links={links.length > 0 ? linksPosition : undefined}
      >
        {linksPosition === "start" ? linksGroup : null}
        {items.length > 0 ? (
          <ul className="cn-second-nav-group cn-second-nav-items">
            {items.map((entry) => (
              <li key={entry.label} className="flex items-center">
                <SecondNavItem entry={entry} />
              </li>
            ))}
          </ul>
        ) : null}
        {linksPosition === "center" ? linksGroup : null}
        {actions.length > 0 ? (
          <ul className="cn-second-nav-group cn-second-nav-actions">
            {actions.map((entry) => (
              <li key={entry.label} className="flex items-center">
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
