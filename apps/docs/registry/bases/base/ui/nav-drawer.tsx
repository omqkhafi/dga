"use client";

import { ArrowDown01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { Badge } from "@/components/dga/badge";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/dga/drawer";
import { Tag } from "@/components/dga/tag";
import { cn } from "@/registry/bases/base/lib/utils";

type IconSvg = React.ComponentProps<typeof HugeiconsIcon>["icon"];

/** A Level 2 link of a Nav Drawer parent. */
type NavDrawerLinkData = {
  label: string;
  href: string;
  /** A short label after the text, such as "New". */
  tag?: string;
  /** A count or short label at the end, such as "+99". */
  badge?: string;
  /** Marks the page the person is on: `aria-current="page"`. */
  current?: boolean;
  disabled?: boolean;
};

/** A group of Level 2 links under an optional heading. */
type NavDrawerSectionData = {
  title?: string;
  links: NavDrawerLinkData[];
};

/** A Level 1 item: a link, or a parent that expands its sections. */
type NavDrawerItemData = {
  label: string;
  /** Makes the item a link. Leave it out when the item has `sections`. */
  href?: string;
  icon?: IconSvg;
  /** A count or short label at the end of a link, such as "+99". */
  badge?: string;
  /** Draws a line above this item (the DGA Nav Drawer Divider item). */
  divider?: boolean;
  /** The page the person is on. A parent is marked when a child is current. */
  current?: boolean;
  disabled?: boolean;
  sections?: NavDrawerSectionData[];
};

function isCurrent(item: NavDrawerItemData) {
  return (
    item.current ||
    item.sections?.some((section) => section.links.some((link) => link.current)) ||
    false
  );
}

/** The plain text of some children: strings and numbers, joined. */
function textOf(children: React.ReactNode) {
  return React.Children.toArray(children)
    .filter(
      (child): child is string | number => typeof child === "string" || typeof child === "number",
    )
    .join("")
    .trim();
}

// ------------------------------------------------------------------------------------------
// Parts. The NavDrawer reads these as its children and draws them: they render nothing by
// themselves, so put them directly inside the part that names them.
// ------------------------------------------------------------------------------------------

type NavDrawerLinkProps = {
  href: string;
  /** A short label after the text, such as "New". */
  tag?: string;
  /** A count or short label at the end, such as "+99". */
  badge?: string;
  current?: boolean;
  disabled?: boolean;
  /** The text of the link. */
  children?: React.ReactNode;
};

/** A Level 2 link (DGA: Nav Drawer Item, Level 2). Put it in a `NavDrawerItem` or a `NavDrawerSection`. */
function NavDrawerLink(_props: NavDrawerLinkProps): null {
  return null;
}

type NavDrawerSectionProps = {
  /** A small heading over the links. */
  title?: string;
  children?: React.ReactNode;
};

/** A group of Level 2 links with a heading. Put it in a `NavDrawerItem`. */
function NavDrawerSection(_props: NavDrawerSectionProps): null {
  return null;
}

type NavDrawerItemProps = {
  /** The text of a parent item. A link takes its text as `children`. */
  label?: string;
  /** Makes the item a link. Leave it out for a parent that has `NavDrawerLink` or `NavDrawerSection` children. */
  href?: string;
  icon?: IconSvg;
  /** A count or short label at the end of a link, such as "+99". */
  badge?: string;
  current?: boolean;
  disabled?: boolean;
  /** The text of a link, or the `NavDrawerLink` and `NavDrawerSection` parts of a parent. */
  children?: React.ReactNode;
};

/**
 * A Level 1 item (DGA: Nav Drawer Item): a link with the text as `children`, or a parent with a
 * `label` and `NavDrawerLink` or `NavDrawerSection` children that expand in place.
 */
function NavDrawerItem(_props: NavDrawerItemProps): null {
  return null;
}

/** A line above the next item (DGA: Nav Drawer Item, Divider). */
function NavDrawerDivider(): null {
  return null;
}

type NavDrawerNavProps = {
  /** `NavDrawerItem` and `NavDrawerDivider` parts. */
  children?: React.ReactNode;
};

/** The list of items. Put `NavDrawerItem` and `NavDrawerDivider` parts in it. */
function NavDrawerNav(_props: NavDrawerNavProps): null {
  return null;
}

/**
 * The top of the drawer, in place of the visible title. It takes any content: a logo, a user card,
 * a banner. The drawer keeps its `title` as its accessible name, hidden from view.
 */
function NavDrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="nav-drawer-header"
      className={cn("flex min-h-10 items-center", className)}
      {...props}
    />
  );
}

/** The bottom of the drawer, at its bottom edge, below the items. It takes any content. */
function NavDrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="nav-drawer-footer"
      className={cn("mt-auto border-t border-border-neutral-secondary pt-4", className)}
      {...props}
    />
  );
}

function parseLinks(children: React.ReactNode): NavDrawerLinkData[] {
  const links: NavDrawerLinkData[] = [];
  for (const node of React.Children.toArray(children)) {
    if (!React.isValidElement<NavDrawerLinkProps>(node) || node.type !== NavDrawerLink) continue;
    const { href, tag, badge, current, disabled, children: text } = node.props;
    links.push({ label: textOf(text), href, tag, badge, current, disabled });
  }
  return links;
}

function parseSections(children: React.ReactNode): NavDrawerSectionData[] {
  const sections: NavDrawerSectionData[] = [];
  let loose: React.ReactNode[] = [];
  const flush = () => {
    if (loose.length) sections.push({ links: parseLinks(loose) });
    loose = [];
  };
  for (const node of React.Children.toArray(children)) {
    if (!React.isValidElement(node)) continue;
    if (node.type === NavDrawerSection) {
      flush();
      const { title, children: inner } = node.props as NavDrawerSectionProps;
      sections.push({ title, links: parseLinks(inner) });
    } else if (node.type === NavDrawerLink) {
      loose.push(node);
    }
  }
  flush();
  return sections.filter((section) => section.links.length > 0);
}

function parseItems(children: React.ReactNode): NavDrawerItemData[] {
  const items: NavDrawerItemData[] = [];
  let divider = false;
  for (const node of React.Children.toArray(children)) {
    if (!React.isValidElement(node)) continue;
    if (node.type === NavDrawerDivider) {
      divider = true;
      continue;
    }
    if (node.type !== NavDrawerItem) continue;
    const {
      label,
      href,
      icon,
      badge,
      current,
      disabled,
      children: inner,
    } = node.props as NavDrawerItemProps;
    const sections = parseSections(inner);
    items.push({
      label: label ?? textOf(inner),
      href,
      icon,
      badge,
      current,
      disabled,
      divider: divider || undefined,
      sections: sections.length ? sections : undefined,
    });
    divider = false;
  }
  return items;
}

function DrawerBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge size="sm" rounded className="ms-auto in-aria-disabled:opacity-60">
      {children}
    </Badge>
  );
}

/**
 * One item of the drawer (DGA: Nav Drawer Item): a Level 1 link, a Level 1 parent that expands its
 * Level 2 links, or a Level 2 link. Each has default, hovered, pressed, focused, selected and
 * disabled states; hovered, pressed and selected show the bar at the start edge.
 */
function DrawerItem({ item, onNavigate }: { item: NavDrawerItemData; onNavigate: () => void }) {
  const [expanded, setExpanded] = React.useState(isCurrent(item));
  const id = React.useId();
  const icon = item.icon ? (
    <HugeiconsIcon icon={item.icon} aria-hidden className="size-5 shrink-0 text-icon-default" />
  ) : null;
  const divider = item.divider ? <li aria-hidden className="mx-4 my-2 h-px list-none bg-border-neutral-secondary" /> : null;
  if (!item.sections?.length) {
    return (
      <>
        {divider}
        <li>
          <a
            data-slot="nav-drawer-item"
            data-level="1"
            data-current={item.current ? "" : undefined}
            data-disabled={item.disabled ? "" : undefined}
            className="relative flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-sm border-0 bg-transparent px-4 py-2 text-start text-sm font-semibold text-text-default no-underline before:pointer-events-none before:absolute before:inset-y-1.5 before:start-0 before:w-1.5 before:rounded-full before:bg-transparent before:content-[''] [&_svg]:size-4 hover:bg-button-background-neutral-hovered hover:before:bg-icon-default-500 active:bg-button-background-neutral-pressed active:before:bg-icon-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black focus-visible:before:bg-transparent data-current:bg-button-background-neutral-selected data-current:text-link-primary-pressed data-current:before:bg-icon-primary data-current:[&_svg]:text-icon-primary data-current:hover:bg-button-background-neutral-selected data-current:hover:before:bg-icon-primary data-current:active:bg-button-background-neutral-selected data-current:active:before:bg-icon-primary data-[level=2]:ps-10 data-[level=2]:font-normal data-[level=2]:data-current:font-semibold disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-text-default-disabled disabled:before:bg-transparent disabled:[&_svg]:text-icon-default-disabled disabled:data-current:bg-transparent disabled:data-current:[&_svg]:text-icon-default-disabled disabled:data-current:before:bg-background-neutral-100 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-transparent aria-disabled:text-text-default-disabled aria-disabled:before:bg-transparent aria-disabled:[&_svg]:text-icon-default-disabled aria-disabled:data-current:bg-transparent aria-disabled:data-current:[&_svg]:text-icon-default-disabled aria-disabled:data-current:before:bg-background-neutral-100 transition-colors motion-reduce:transition-none"
            href={item.disabled ? undefined : item.href}
            aria-current={item.current ? "page" : undefined}
            aria-disabled={item.disabled ? true : undefined}
            onClick={onNavigate}
          >
            {icon}
            <span className="min-w-0 flex-1 text-start">{item.label}</span>
            {item.badge ? <DrawerBadge>{item.badge}</DrawerBadge> : null}
          </a>
        </li>
      </>
    );
  }
  return (
    <>
      {divider}
      <li>
        <button
          type="button"
          data-slot="nav-drawer-item"
          data-level="1"
          data-current={isCurrent(item) ? "" : undefined}
          className="relative flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-sm border-0 bg-transparent px-4 py-2 text-start text-sm font-semibold text-text-default no-underline before:pointer-events-none before:absolute before:inset-y-1.5 before:start-0 before:w-1.5 before:rounded-full before:bg-transparent before:content-[''] [&_svg]:size-4 hover:bg-button-background-neutral-hovered hover:before:bg-icon-default-500 active:bg-button-background-neutral-pressed active:before:bg-icon-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black focus-visible:before:bg-transparent data-current:bg-button-background-neutral-selected data-current:text-link-primary-pressed data-current:before:bg-icon-primary data-current:[&_svg]:text-icon-primary data-current:hover:bg-button-background-neutral-selected data-current:hover:before:bg-icon-primary data-current:active:bg-button-background-neutral-selected data-current:active:before:bg-icon-primary data-[level=2]:ps-10 data-[level=2]:font-normal data-[level=2]:data-current:font-semibold disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-text-default-disabled disabled:before:bg-transparent disabled:[&_svg]:text-icon-default-disabled disabled:data-current:bg-transparent disabled:data-current:[&_svg]:text-icon-default-disabled disabled:data-current:before:bg-background-neutral-100 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-transparent aria-disabled:text-text-default-disabled aria-disabled:before:bg-transparent aria-disabled:[&_svg]:text-icon-default-disabled aria-disabled:data-current:bg-transparent aria-disabled:data-current:[&_svg]:text-icon-default-disabled aria-disabled:data-current:before:bg-background-neutral-100 transition-colors motion-reduce:transition-none"
          aria-expanded={expanded}
          aria-controls={id}
          disabled={item.disabled}
          onClick={() => setExpanded((value) => !value)}
        >
          {icon}
          <span className="min-w-0 flex-1 text-start">{item.label}</span>
          <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="ms-auto size-4 shrink-0 text-icon-default transition-transform in-aria-expanded:rotate-180 in-disabled:text-icon-default-disabled motion-reduce:transition-none" />
        </button>
        <div id={id} hidden={!expanded} className="flex flex-col">
          {item.sections.map((section) => (
            <ul
              key={section.title ?? section.links.map((l) => l.href).join()}
              className="m-0 flex list-none flex-col p-0"
            >
              {section.title ? <li className="px-4 pt-2 ps-10 text-xs font-bold text-text-primary-paragraph">{section.title}</li> : null}
              {section.links.map((link) => (
                <li key={link.href}>
                  <a
                    data-slot="nav-drawer-item"
                    data-level="2"
                    data-current={link.current ? "" : undefined}
                    data-disabled={link.disabled ? "" : undefined}
                    className="relative flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-sm border-0 bg-transparent px-4 py-2 text-start text-sm font-semibold text-text-default no-underline before:pointer-events-none before:absolute before:inset-y-1.5 before:start-0 before:w-1.5 before:rounded-full before:bg-transparent before:content-[''] [&_svg]:size-4 hover:bg-button-background-neutral-hovered hover:before:bg-icon-default-500 active:bg-button-background-neutral-pressed active:before:bg-icon-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black focus-visible:before:bg-transparent data-current:bg-button-background-neutral-selected data-current:text-link-primary-pressed data-current:before:bg-icon-primary data-current:[&_svg]:text-icon-primary data-current:hover:bg-button-background-neutral-selected data-current:hover:before:bg-icon-primary data-current:active:bg-button-background-neutral-selected data-current:active:before:bg-icon-primary data-[level=2]:ps-10 data-[level=2]:font-normal data-[level=2]:data-current:font-semibold disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-text-default-disabled disabled:before:bg-transparent disabled:[&_svg]:text-icon-default-disabled disabled:data-current:bg-transparent disabled:data-current:[&_svg]:text-icon-default-disabled disabled:data-current:before:bg-background-neutral-100 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-transparent aria-disabled:text-text-default-disabled aria-disabled:before:bg-transparent aria-disabled:[&_svg]:text-icon-default-disabled aria-disabled:data-current:bg-transparent aria-disabled:data-current:[&_svg]:text-icon-default-disabled aria-disabled:data-current:before:bg-background-neutral-100 transition-colors motion-reduce:transition-none"
                    href={link.disabled ? undefined : link.href}
                    aria-current={link.current ? "page" : undefined}
                    aria-disabled={link.disabled ? true : undefined}
                    onClick={onNavigate}
                  >
                    <span className="min-w-0 flex-1 text-start">{link.label}</span>
                    {link.tag ? (
                      <Tag size="sm" variant="success">
                        {link.tag}
                      </Tag>
                    ) : null}
                    {link.badge ? <DrawerBadge>{link.badge}</DrawerBadge> : null}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </li>
    </>
  );
}

type NavDrawerProps = {
  /**
   * The parts of the drawer: a `NavDrawerHeader` for the top (in place of the visible title), a
   * `NavDrawerNav` with `NavDrawerItem` and `NavDrawerDivider` parts, and a `NavDrawerFooter` for
   * the bottom edge. Put them directly inside the NavDrawer. Nothing else is drawn.
   */
  children?: React.ReactNode;
  /** The items as data, instead of a `NavDrawerNav`. A `NavDrawerNav` wins when both are given. */
  items?: NavDrawerItemData[];
  /** A search field at the top of the drawer, above the items. */
  search?: React.ReactNode;
  /** A row after the items and above the footer, such as a language switcher and a user area. */
  end?: React.ReactNode;
  /** Controls whether the drawer is open. */
  open?: boolean;
  /** Opens the drawer on first render. For showing it in documentation. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The edge the drawer slides from: `start` (default) or `end`. Both follow the page direction. */
  side?: "start" | "end";
  /** The name of the drawer for screen readers, shown as a visible title unless there is a `NavDrawerHeader`. */
  title?: string;
  /** A line under the title. Without it screen readers get the `navLabel`. */
  description?: string;
  /** The name of the navigation. Translate it on Arabic pages. */
  navLabel?: string;
  /** The name of the button that opens the drawer. Translate it on Arabic pages. */
  menuLabel?: string;
  /** The name of the close button. Translate it on Arabic pages. */
  closeLabel?: string;
  /** Leaves out the menu button, for a drawer you open with `open`. */
  hideTrigger?: boolean;
  /** Classes for the menu button, to place it. */
  triggerClassName?: string;
};

/**
 * The navigation drawer (DGA: Navigation Drawer): a panel that slides in from the start edge with
 * a header, the navigation items and a footer. Parents expand in place, Level 2 links are indented,
 * the page the person is on has `aria-current="page"`, and Escape closes it. It draws its own menu
 * button, or none with `hideTrigger`. Inside a Header it opens from the Header's menu button and
 * shows the Header's items unless it has its own.
 */
function NavDrawer({
  children,
  items = [],
  search,
  end,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  side = "start",
  title = "Menu",
  description,
  navLabel = "Main",
  menuLabel = "Menu",
  closeLabel = "Close",
  hideTrigger = false,
  triggerClassName,
}: NavDrawerProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : inner;
  const setOpen = (next: boolean) => {
    if (!controlled) setInner(next);
    onOpenChange?.(next);
  };

  const parts = React.Children.toArray(children);
  const header = parts.find((part) => React.isValidElement(part) && part.type === NavDrawerHeader);
  const footer = parts.find((part) => React.isValidElement(part) && part.type === NavDrawerFooter);
  const nav = parts.find((part) => React.isValidElement(part) && part.type === NavDrawerNav);
  const list = React.isValidElement<NavDrawerNavProps>(nav)
    ? parseItems(nav.props.children)
    : items;

  return (
    <Drawer open={open} onOpenChange={setOpen} side={side}>
      {hideTrigger ? null : (
        <DrawerTrigger
          data-slot="nav-drawer-trigger"
          aria-label={menuLabel}
          className={cn("inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-icon-default [&_svg]:size-6 hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black", triggerClassName)}
        >
          <HugeiconsIcon icon={Menu01Icon} aria-hidden />
        </DrawerTrigger>
      )}
      <DrawerContent closeLabel={closeLabel}>
        <DrawerHeader>
          {header}
          <DrawerTitle className={header ? "sr-only" : undefined}>{title}</DrawerTitle>
          {description ? (
            <DrawerDescription>{description}</DrawerDescription>
          ) : (
            <DrawerDescription className="sr-only">{navLabel}</DrawerDescription>
          )}
        </DrawerHeader>
        {search ? <div className="mb-4">{search}</div> : null}
        <nav aria-label={navLabel} data-slot="nav-drawer-nav">
          <ul className="m-0 flex list-none flex-col p-0">
            {list.map((item) => (
              <DrawerItem key={item.label} item={item} onNavigate={() => setOpen(false)} />
            ))}
          </ul>
        </nav>
        {end ? <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border-neutral-secondary pt-4">{end}</div> : null}
        {footer}
      </DrawerContent>
    </Drawer>
  );
}

export type {
  NavDrawerItemData,
  NavDrawerItemProps,
  NavDrawerLinkData,
  NavDrawerLinkProps,
  NavDrawerNavProps,
  NavDrawerProps,
  NavDrawerSectionData,
  NavDrawerSectionProps,
};
export {
  NavDrawer,
  NavDrawerDivider,
  NavDrawerFooter,
  NavDrawerHeader,
  NavDrawerItem,
  NavDrawerLink,
  NavDrawerNav,
  NavDrawerSection,
};
