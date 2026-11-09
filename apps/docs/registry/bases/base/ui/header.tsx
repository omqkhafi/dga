"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ArrowDown01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/dga/menu";
import { NavDrawer, type NavDrawerProps } from "@/components/dga/nav-drawer";
import { Tag } from "@/components/dga/tag";
import { useDocumentDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

type IconSvg = React.ComponentProps<typeof HugeiconsIcon>["icon"];

/** One link inside a sub-menu. */
type HeaderSubLink = {
  label: string;
  href: string;
  /** A line of helper text under the label (the DGA Header Sub-menu Item helper text). */
  description?: string;
  /** Shown with `linkStyle="icon"` and `"boxed-icon"`. */
  icon?: IconSvg;
  /** A short label after the link text, such as "New" (the DGA Header Sub-menu Item With Tag). */
  tag?: string;
  /** A count or short label at the end of the item in the Nav Drawer, such as "+99" (the DGA Nav Drawer Item badge). Not shown in the sub-menu. */
  badge?: string;
  /** Marks the page the person is on: `aria-current="page"`. */
  current?: boolean;
  disabled?: boolean;
};

/** A column of a sub-menu. DGA allows up to four. */
type HeaderSection = {
  /** The column heading. */
  title?: string;
  links: HeaderSubLink[];
};

/** One item of the main navigation: a link, or a button that opens a sub-menu. */
type HeaderNavItem = {
  label: string;
  /** Makes the item a link. Leave it out when the item has `sections`. */
  href?: string;
  icon?: IconSvg;
  /** A count or short label at the end of a link in the Nav Drawer, such as "+99" (the DGA Nav Drawer Item badge). Not shown in the bar. */
  badge?: string;
  /** Draws a line above this item in the Nav Drawer (the DGA Nav Drawer Divider item). Not shown in the bar. */
  divider?: boolean;
  /** The page the person is on (`aria-current="page"`). A parent is marked when a child is current. */
  current?: boolean;
  disabled?: boolean;
  /** The sub-menu: one column per section. */
  sections?: HeaderSection[];
  /** Overrides the header's `submenuWidth` for this item's sub-menu. */
  submenuWidth?: HeaderSubmenuWidth;
  /** Opens the sub-menu on first render. For showing it in documentation. */
  defaultOpen?: boolean;
};

/** A header action: a link or button with an icon and a label. */
type HeaderActionItem = {
  label: string;
  icon?: IconSvg;
  href?: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  /** Hides the label (it stays as the accessible name). */
  iconOnly?: boolean;
  /** Puts the icon above the label. */
  iconPosition?: "inline" | "top";
};

function isCurrent(item: HeaderNavItem) {
  return (
    item.current ||
    item.sections?.some((section) => section.links.some((link) => link.current)) ||
    false
  );
}

type HeaderActionProps = Omit<React.ComponentProps<"a">, "children"> &
  HeaderActionItem & { children?: React.ReactNode };

/**
 * One action in the header bar (DGA: Header Action): Inline (icon beside the label), Top (icon
 * above the label), Text only (no icon) or Icon only, with default, hovered, pressed, focused and
 * disabled states and the selected block with its bottom bar. It renders a link when it has an
 * `href`, a button otherwise. Below the `lg` width the actions move into the overflow menu.
 */
function HeaderAction({
  label,
  icon,
  href,
  onClick,
  selected,
  disabled,
  iconOnly,
  iconPosition = "inline",
  className,
  ...props
}: HeaderActionProps) {
  const hideLabel = Boolean(iconOnly && icon);
  const content = (
    <>
      {icon ? <HugeiconsIcon icon={icon} aria-hidden className="size-5 shrink-0 text-icon-default" /> : null}
      <span className={cn("min-w-0", hideLabel && "sr-only")}>{label}</span>
    </>
  );
  const shared = {
    "data-slot": "header-action",
    "data-current": selected ? "" : undefined,
    "data-icon-position": icon && !hideLabel ? iconPosition : "inline",
    "data-icon-only": hideLabel ? "" : undefined,
    className: cn("data-[icon-position=top]:flex-col data-[icon-position=top]:gap-1 relative inline-flex h-18 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-sm border-0 bg-transparent px-4 py-2 text-md font-medium whitespace-nowrap text-text-default no-underline after:pointer-events-none after:absolute after:inset-x-2 after:bottom-0 after:h-1.5 after:rounded-full after:bg-transparent after:content-[''] hover:bg-button-background-neutral-hovered hover:after:bg-icon-default-500 active:bg-button-background-neutral-pressed active:after:bg-icon-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-current:bg-button-background-primary-default data-current:text-text-oncolor-primary data-current:after:bg-primary-sa-flag-200 data-current:[&_svg]:text-icon-oncolor data-current:hover:bg-button-background-primary-hovered data-current:hover:after:bg-primary-sa-flag-200 data-current:active:bg-button-background-primary-pressed data-current:active:after:bg-primary-sa-flag-200 data-current:focus-visible:after:bg-primary-sa-flag-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-text-default-disabled disabled:[&_svg]:text-icon-default-disabled disabled:data-current:bg-transparent disabled:data-current:text-text-default-disabled disabled:data-current:[&_svg]:text-icon-default-disabled disabled:data-current:after:bg-background-neutral-100 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-transparent aria-disabled:text-text-default-disabled aria-disabled:[&_svg]:text-icon-default-disabled aria-disabled:data-current:bg-transparent aria-disabled:data-current:text-text-default-disabled aria-disabled:data-current:[&_svg]:text-icon-default-disabled aria-disabled:data-current:after:bg-background-neutral-100 transition-colors motion-reduce:transition-none", className),
  };
  if (href && !disabled) {
    return (
      <a {...shared} href={href} aria-current={selected ? "page" : undefined} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button
      {...shared}
      type="button"
      disabled={disabled}
      aria-pressed={selected && !href ? true : undefined}
      onClick={onClick}
      {...(props as React.ComponentProps<"button">)}
    >
      {content}
    </button>
  );
}

/** One action inside the overflow menu on small screens. */
function OverflowAction({ action }: { action: HeaderActionItem }) {
  const { label, icon, href, onClick, selected, disabled } = action;
  return (
    <MenuItem
      data-slot="header-overflow-item"
      className="gap-2 data-current:bg-button-background-primary-default data-current:text-text-oncolor-primary data-current:[&_svg]:text-icon-oncolor"
      disabled={disabled}
      onClick={onClick}
      data-current={selected ? "" : undefined}
      render={
        href && !disabled ? (
          // biome-ignore lint/a11y/useAnchorContent: Base UI renders the item's children inside it.
          <a href={href} aria-current={selected ? "page" : undefined} />
        ) : undefined
      }
    >
      {icon ? <HugeiconsIcon icon={icon} aria-hidden className="size-5 shrink-0 text-icon-default" /> : null}
      {label}
    </MenuItem>
  );
}

function SubLink({
  link,
  linkStyle,
  submenuTone,
}: {
  link: HeaderSubLink;
  linkStyle: HeaderLinkStyle;
  submenuTone: HeaderSubmenuTone;
}) {
  return (
    <MenuPrimitive.Item
      data-slot="header-submenu-item"
      className="flex min-h-16 cursor-pointer items-center gap-4 rounded-md px-4 py-2 text-md font-medium text-text-display no-underline outline-hidden select-none data-highlighted:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-highlighted:[&_.cn-header-sub-label]:underline data-highlighted:[&_.cn-header-sub-label]:underline-offset-4 active:[&_.cn-header-sub-label]:underline active:[&_.cn-header-sub-label]:underline-offset-4 focus-visible:[&_.cn-header-sub-label]:underline focus-visible:[&_.cn-header-sub-label]:underline-offset-4 aria-[current=page]:font-bold aria-[current=page]:underline aria-[current=page]:underline-offset-4 data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-text-default-disabled in-data-[tone=green]:text-text-oncolor-primary in-data-[tone=green]:data-highlighted:bg-button-background-transparent-hovered in-data-[tone=green]:active:bg-button-background-transparent-pressed in-data-[tone=green]:focus-visible:outline-border-white"
      disabled={link.disabled}
      render={<a href={link.href} aria-current={link.current ? "page" : undefined} />}
    >
      {linkStyle !== "text" && link.icon ? (
        <span
          className="inline-flex shrink-0 items-center justify-center text-icon-default [&_svg]:size-6 data-boxed:size-12 data-boxed:rounded-md data-boxed:bg-background-primary-50 data-boxed:text-icon-primary in-data-[tone=green]:text-icon-oncolor in-data-[tone=green]:data-boxed:bg-alpha-white-10 in-data-[tone=green]:data-boxed:text-icon-oncolor"
          data-boxed={linkStyle === "boxed-icon" ? "" : undefined}
        >
          <HugeiconsIcon icon={link.icon} aria-hidden />
        </span>
      ) : null}
      <span className="flex min-w-0 flex-col">
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-md font-medium">{link.label}</span>
          {link.tag ? (
            <Tag size="sm" variant={submenuTone === "green" ? "on-color" : "success"}>
              {link.tag}
            </Tag>
          ) : null}
        </span>
        {link.description ? (
          <span className="text-sm font-normal text-text-primary-paragraph in-data-[tone=green]:text-text-oncolor-primary">{link.description}</span>
        ) : null}
      </span>
    </MenuPrimitive.Item>
  );
}

type HeaderLinkStyle = "text" | "icon" | "boxed-icon";
type HeaderSubmenuTone = "default" | "green";
type HeaderSubmenuWidth = "content" | "full";

/**
 * The sub-menu panel. `content` is a card as wide as its columns, under the trigger. `full` is a
 * panel as wide as the header, directly under the bar, with the columns lined up with the bar.
 */
function SubmenuPanel({
  tone,
  width,
  anchor,
  fullWidth,
  children,
}: {
  tone: HeaderSubmenuTone;
  width: HeaderSubmenuWidth;
  anchor: React.RefObject<HTMLElement | null>;
  fullWidth: boolean;
  children: React.ReactNode;
}) {
  if (width !== "full") {
    return (
      <MenuContent className="min-w-80 max-w-[calc(100vw-2rem)] rounded-md p-6 shadow-lg data-[tone=green]:bg-background-sa-flag data-[tone=green]:text-text-oncolor-primary" data-tone={tone} sideOffset={0}>
        {children}
      </MenuContent>
    );
  }
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        anchor={anchor}
        side="bottom"
        align="start"
        sideOffset={0}
        collisionAvoidance={{ side: "none", align: "none", fallbackAxisSide: "none" }}
        className="z-50 outline-hidden"
      >
        <MenuPrimitive.Popup
          data-slot="menu-content"
          data-tone={tone}
          data-width="full"
          className="max-h-(--available-height) min-w-52 origin-(--transform-origin) overflow-y-auto rounded-md border border-border-neutral-primary bg-background-menu p-1 text-text-default shadow-2xl outline-hidden transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none w-(--anchor-width) max-w-none rounded-none border-x-0 p-0 shadow-lg data-[tone=green]:border-0 data-[tone=green]:bg-background-sa-flag data-[tone=green]:text-text-oncolor-primary"
        >
          <div className="mx-auto w-full max-w-[1280px] px-8 py-6 data-full:max-w-none" data-full={fullWidth ? "" : undefined}>
            {children}
          </div>
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DesktopItem({
  item,
  linkStyle,
  submenuTone,
  submenuWidth,
  anchor,
  fullWidth,
}: {
  item: HeaderNavItem;
  linkStyle: HeaderLinkStyle;
  submenuTone: HeaderSubmenuTone;
  submenuWidth: HeaderSubmenuWidth;
  anchor: React.RefObject<HTMLElement | null>;
  fullWidth: boolean;
}) {
  const current = isCurrent(item);
  const width = item.submenuWidth ?? submenuWidth;
  const full = width === "full";
  const icon = item.icon ? (
    <HugeiconsIcon icon={item.icon} aria-hidden className="size-5 shrink-0 text-icon-default" />
  ) : null;
  if (!item.sections?.length) {
    return (
      <li>
        <a
          data-slot="header-item"
          data-header-item=""
          data-current={current ? "" : undefined}
          data-disabled={item.disabled ? "" : undefined}
          className="data-popup-open:bg-button-background-neutral-hovered data-popup-open:after:bg-icon-default relative inline-flex h-18 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-sm border-0 bg-transparent px-4 py-2 text-md font-medium whitespace-nowrap text-text-default no-underline after:pointer-events-none after:absolute after:inset-x-2 after:bottom-0 after:h-1.5 after:rounded-full after:bg-transparent after:content-[''] hover:bg-button-background-neutral-hovered hover:after:bg-icon-default-500 active:bg-button-background-neutral-pressed active:after:bg-icon-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-current:bg-button-background-primary-default data-current:text-text-oncolor-primary data-current:after:bg-primary-sa-flag-200 data-current:[&_svg]:text-icon-oncolor data-current:hover:bg-button-background-primary-hovered data-current:hover:after:bg-primary-sa-flag-200 data-current:active:bg-button-background-primary-pressed data-current:active:after:bg-primary-sa-flag-200 data-current:focus-visible:after:bg-primary-sa-flag-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-text-default-disabled disabled:[&_svg]:text-icon-default-disabled disabled:data-current:bg-transparent disabled:data-current:text-text-default-disabled disabled:data-current:[&_svg]:text-icon-default-disabled disabled:data-current:after:bg-background-neutral-100 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-transparent aria-disabled:text-text-default-disabled aria-disabled:[&_svg]:text-icon-default-disabled aria-disabled:data-current:bg-transparent aria-disabled:data-current:text-text-default-disabled aria-disabled:data-current:[&_svg]:text-icon-default-disabled aria-disabled:data-current:after:bg-background-neutral-100 transition-colors motion-reduce:transition-none"
          href={item.disabled ? undefined : item.href}
          aria-current={item.current ? "page" : undefined}
          aria-disabled={item.disabled ? true : undefined}
        >
          {icon}
          {item.label}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Menu defaultOpen={item.defaultOpen}>
        <MenuTrigger
          data-slot="header-item"
          data-header-item=""
          data-current={current ? "" : undefined}
          disabled={item.disabled}
          className="data-popup-open:bg-button-background-neutral-hovered data-popup-open:after:bg-icon-default relative inline-flex h-18 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-sm border-0 bg-transparent px-4 py-2 text-md font-medium whitespace-nowrap text-text-default no-underline after:pointer-events-none after:absolute after:inset-x-2 after:bottom-0 after:h-1.5 after:rounded-full after:bg-transparent after:content-[''] hover:bg-button-background-neutral-hovered hover:after:bg-icon-default-500 active:bg-button-background-neutral-pressed active:after:bg-icon-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-current:bg-button-background-primary-default data-current:text-text-oncolor-primary data-current:after:bg-primary-sa-flag-200 data-current:[&_svg]:text-icon-oncolor data-current:hover:bg-button-background-primary-hovered data-current:hover:after:bg-primary-sa-flag-200 data-current:active:bg-button-background-primary-pressed data-current:active:after:bg-primary-sa-flag-200 data-current:focus-visible:after:bg-primary-sa-flag-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-text-default-disabled disabled:[&_svg]:text-icon-default-disabled disabled:data-current:bg-transparent disabled:data-current:text-text-default-disabled disabled:data-current:[&_svg]:text-icon-default-disabled disabled:data-current:after:bg-background-neutral-100 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-transparent aria-disabled:text-text-default-disabled aria-disabled:[&_svg]:text-icon-default-disabled aria-disabled:data-current:bg-transparent aria-disabled:data-current:text-text-default-disabled aria-disabled:data-current:[&_svg]:text-icon-default-disabled aria-disabled:data-current:after:bg-background-neutral-100 transition-colors motion-reduce:transition-none"
        >
          {icon}
          {item.label}
          <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="size-4 shrink-0 text-icon-default transition-transform in-data-popup-open:rotate-180 motion-reduce:transition-none" />
        </MenuTrigger>
        <SubmenuPanel tone={submenuTone} width={width} anchor={anchor} fullWidth={fullWidth}>
          <div
            className="grid gap-8 [grid-template-columns:repeat(var(--header-columns,1),minmax(var(--header-column-min,12rem),1fr))]"
            style={
              {
                "--header-columns": item.sections.length,
                "--header-column-min": full ? "0px" : undefined,
              } as React.CSSProperties
            }
          >
            {item.sections.map((section) => (
              <MenuPrimitive.Group
                key={section.title ?? section.links.map((l) => l.href).join()}
                className="flex flex-col gap-1"
              >
                {section.title ? (
                  <MenuPrimitive.GroupLabel className="mb-2 text-lg font-bold text-text-primary in-data-[tone=green]:text-text-oncolor-primary">
                    {section.title}
                  </MenuPrimitive.GroupLabel>
                ) : null}
                {section.links.map((link) => (
                  <SubLink
                    key={link.href}
                    link={link}
                    linkStyle={linkStyle}
                    submenuTone={submenuTone}
                  />
                ))}
              </MenuPrimitive.Group>
            ))}
          </div>
        </SubmenuPanel>
      </Menu>
    </li>
  );
}

type HeaderLogoProps = Omit<React.ComponentProps<"a">, "children"> & {
  /** An image for the logo. For an SVG or your own markup use `children` instead. */
  src?: string;
  /** What the image shows, such as the name of the site. It is the link's name, so always set it with `src`. */
  alt?: string;
  children?: React.ReactNode;
};

/**
 * The logo as a link to the home page (`href`, default `/`): an image from `src` or your own
 * markup as `children`. Use it as the Header's `logo` and again inside a `NavDrawerHeader`.
 */
function HeaderLogo({ href = "/", src, alt = "", className, children, ...props }: HeaderLogoProps) {
  return (
    <a
      data-slot="header-logo-link"
      href={href}
      className={cn("inline-flex items-center gap-2 rounded-sm text-lg font-bold text-text-display no-underline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black", className)}
      {...props}
    >
      {src ? <img src={src} alt={alt} className="h-10 w-auto max-w-full object-contain" /> : null}
      {children}
    </a>
  );
}

type HeaderNavLinkProps = {
  href: string;
  /** A line of helper text under the label (the DGA Header Sub-menu Item helper text). */
  description?: string;
  /** Shown with `linkStyle="icon"` and `"boxed-icon"`. */
  icon?: IconSvg;
  /** A short label after the link text, such as "New" (the DGA Header Sub-menu Item With Tag). */
  tag?: string;
  /** A count or short label at the end of the item in the Nav Drawer, such as "+99". Not shown in the sub-menu. */
  badge?: string;
  current?: boolean;
  disabled?: boolean;
  /** The text of the link. */
  children?: React.ReactNode;
};

/** A link inside a sub-menu. Put it in a `HeaderNavSection`. The Header reads it and draws it. */
function HeaderNavLink(_props: HeaderNavLinkProps): null {
  return null;
}

type HeaderNavSectionProps = {
  /** The column heading. */
  title?: string;
  /** `HeaderNavLink` parts. */
  children?: React.ReactNode;
};

/** A column of a sub-menu, with an optional heading. DGA allows up to four. Put it in a `HeaderNavItem`. */
function HeaderNavSection(_props: HeaderNavSectionProps): null {
  return null;
}

type HeaderNavItemProps = {
  /** The text of a parent item. A link takes its text as `children`. */
  label?: string;
  /** Makes the item a link. Leave it out for a parent that has `HeaderNavSection` children. */
  href?: string;
  icon?: IconSvg;
  /** A count or short label at the end of a link in the Nav Drawer, such as "+99". Not shown in the bar. */
  badge?: string;
  /** The page the person is on (`aria-current="page"`). A parent is marked when a child is current. */
  current?: boolean;
  disabled?: boolean;
  /** Overrides the header's `submenuWidth` for this item's sub-menu. */
  submenuWidth?: HeaderSubmenuWidth;
  /** Opens the sub-menu on first render. For showing it in documentation. */
  defaultOpen?: boolean;
  /** The text of a link, or the `HeaderNavSection` parts of a parent. */
  children?: React.ReactNode;
};

/**
 * One item of the main navigation (DGA: Header Menu Item): a link with the text as `children`, or a
 * parent with a `label` and `HeaderNavSection` children that open as a sub-menu. Put it in a
 * `HeaderNav`. The Header reads it and draws it, in the bar and in the Nav Drawer.
 */
function HeaderNavItem(_props: HeaderNavItemProps): null {
  return null;
}

/** A line above the next item in the Nav Drawer. It does not show in the bar. Put it in a `HeaderNav`. */
function HeaderNavDivider(): null {
  return null;
}

type HeaderNavProps = {
  /** `HeaderNavItem` and `HeaderNavDivider` parts. */
  children?: React.ReactNode;
};

/**
 * The main navigation. Put `HeaderNavItem` and `HeaderNavDivider` parts in it, directly inside the
 * Header. The same items are in the bar from `lg` and in the Nav Drawer below it.
 */
function HeaderNav(_props: HeaderNavProps): null {
  return null;
}

function nodeText(children: React.ReactNode) {
  return React.Children.toArray(children)
    .filter(
      (child): child is string | number => typeof child === "string" || typeof child === "number",
    )
    .join("")
    .trim();
}

function parseHeaderLinks(children: React.ReactNode): HeaderSubLink[] {
  const links: HeaderSubLink[] = [];
  for (const node of React.Children.toArray(children)) {
    if (!React.isValidElement<HeaderNavLinkProps>(node) || node.type !== HeaderNavLink) continue;
    const { children: text, ...rest } = node.props;
    links.push({ ...rest, label: nodeText(text) });
  }
  return links;
}

function parseHeaderSections(children: React.ReactNode): HeaderSection[] {
  const sections: HeaderSection[] = [];
  let loose: React.ReactNode[] = [];
  const flush = () => {
    if (loose.length) sections.push({ links: parseHeaderLinks(loose) });
    loose = [];
  };
  for (const node of React.Children.toArray(children)) {
    if (!React.isValidElement(node)) continue;
    if (node.type === HeaderNavSection) {
      flush();
      const { title, children: inner } = node.props as HeaderNavSectionProps;
      sections.push({ title, links: parseHeaderLinks(inner) });
    } else if (node.type === HeaderNavLink) {
      loose.push(node);
    }
  }
  flush();
  return sections.filter((section) => section.links.length > 0);
}

function parseHeaderNav(children: React.ReactNode): HeaderNavItem[] {
  const items: HeaderNavItem[] = [];
  let divider = false;
  for (const node of React.Children.toArray(children)) {
    if (!React.isValidElement(node)) continue;
    if (node.type === HeaderNavDivider) {
      divider = true;
      continue;
    }
    if (node.type !== HeaderNavItem) continue;
    const { label, children: inner, ...rest } = node.props as HeaderNavItemProps;
    const sections = parseHeaderSections(inner);
    items.push({
      ...rest,
      label: label ?? nodeText(inner),
      divider: divider || undefined,
      sections: sections.length ? sections : undefined,
    });
    divider = false;
  }
  return items;
}

type HeaderProps = Omit<React.ComponentProps<"header">, "children"> & {
  /**
   * The parts of the header, placed directly inside it: a `HeaderNav` with the navigation items,
   * and a `NavDrawer` to shape the drawer that opens below `lg` (its header, its own items, its
   * footer). Nothing else is drawn.
   */
  children?: React.ReactNode;
  /** The logo, usually a link to the home page. Pass your own `img` or SVG. */
  logo?: React.ReactNode;
  /** The main navigation as data. A shortcut for a `HeaderNav`; both are used when both are given. */
  items?: HeaderNavItem[];
  /**
   * Where the navigation sits in the bar from `lg`: `start` (next to the logo, default) or
   * `center` (in the middle of the bar, with the logo at the start and the actions at the end).
   * Below `lg` the navigation is in the Drawer either way.
   */
  navPosition?: "start" | "center";
  /** Actions at the end of the bar. */
  actions?: HeaderActionItem[];
  /** A search field or a button that opens search. Shown in the bar from `lg`, and at the top of the drawer below it. */
  search?: React.ReactNode;
  /** The language switcher (for example a Menu or a link). */
  language?: React.ReactNode;
  /** The user area: a sign-in button or an account menu. */
  user?: React.ReactNode;
  /** The official-site strip above everything else: put a Digital Stamp here. */
  stamp?: React.ReactNode;
  /** A strip above the bar, below the stamp: put a Second Nav here. */
  top?: React.ReactNode;
  /** Spans the whole width. Default: centred, 1280px at most. */
  fullWidth?: boolean;
  /** The sub-menu panel: white, or the dark green of the DGA flag. */
  submenuTone?: HeaderSubmenuTone;
  /**
   * How wide the sub-menu is: `content` (default, a card under the item, as wide as its columns)
   * or `full` (a panel as wide as the header, directly under the bar, with the columns lined up
   * with the bar). An item can override it with its own `submenuWidth`.
   */
  submenuWidth?: HeaderSubmenuWidth;
  /** How sub-menu links look: text only, with a simple icon, or with an icon in a box. */
  linkStyle?: HeaderLinkStyle;
  /** Where the skip link goes. Default `#main-content`. Give your main element that id. */
  skipHref?: string;
  /** Text of the skip link. Translate it on Arabic pages. */
  skipLabel?: string;
  /** The name of the main navigation. Translate it on Arabic pages. */
  navLabel?: string;
  /** The name of the button that opens the menu on small screens. */
  menuLabel?: string;
  /** The name of the overflow (…) button on small screens, which opens the actions. */
  moreLabel?: string;
  /** The title of the drawer. */
  drawerTitle?: string;
  /** A line under the drawer title for screen readers. */
  drawerDescription?: string;
  /** The name of the drawer's close button. */
  closeLabel?: string;
  /** Opens the drawer on first render. For showing it in documentation. */
  defaultMenuOpen?: boolean;
};

/**
 * The site header (DGA: Nav Header): a logo, the main navigation with sub-menus, and actions,
 * search, a language switcher and a user area. A skip link comes first in the tab order. Left
 * and Right (swapped on Arabic pages), Home and End move between the items; Enter, Space or Down
 * opens a sub-menu, which is a DGA Menu. Below the `lg` width the navigation moves into a
 * NavDrawer: on a phone the overflow (…) button holding the actions is on the start side, the logo is
 * centred and the menu button is on the end side (as in Figma); the bar mirrors on Arabic pages. The page the
 * person is on has `aria-current="page"`.
 */
function Header({
  className,
  ref,
  children,
  logo,
  items: itemsProp = [],
  navPosition = "start",
  actions = [],
  search,
  language,
  user,
  stamp,
  top,
  fullWidth = false,
  submenuTone = "default",
  submenuWidth = "content",
  linkStyle = "text",
  skipHref = "#main-content",
  skipLabel = "Skip to main content",
  navLabel = "Main",
  menuLabel = "Menu",
  moreLabel = "More",
  drawerTitle = "Menu",
  drawerDescription,
  closeLabel = "Close",
  defaultMenuOpen = false,
  ...props
}: HeaderProps) {
  const parts = React.Children.toArray(children);
  const nav = parts.find((part) => React.isValidElement(part) && part.type === HeaderNav);
  const items = [
    ...itemsProp,
    ...(React.isValidElement<HeaderNavProps>(nav) ? parseHeaderNav(nav.props.children) : []),
  ];
  const custom = parts.find(
    (part): part is React.ReactElement<NavDrawerProps> =>
      React.isValidElement(part) && part.type === NavDrawer,
  );
  const drawerProps: NavDrawerProps = {
    items,
    search,
    end:
      language || user ? (
        <>
          {language}
          {user}
        </>
      ) : undefined,
    defaultOpen: defaultMenuOpen,
    title: drawerTitle,
    description: drawerDescription,
    navLabel,
    menuLabel,
    closeLabel,
    triggerClassName: "col-start-3 row-start-1 justify-self-end lg:hidden",
  };
  const drawer = custom ? (
    React.cloneElement(custom, {
      ...drawerProps,
      ...Object.fromEntries(
        Object.entries(custom.props).filter(([, value]) => value !== undefined),
      ),
      triggerClassName: cn(drawerProps.triggerClassName, custom.props.triggerClassName),
    })
  ) : (
    <NavDrawer {...drawerProps} />
  );
  const rtl = useDocumentDirection() === "rtl";
  const headerRef = React.useRef<HTMLElement | null>(null);
  const setHeaderRef = React.useCallback(
    (node: HTMLElement | null) => {
      headerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.defaultPrevented) return;
    const target = event.target as HTMLElement;
    if (!target.hasAttribute("data-header-item")) return;
    const nodes = [
      ...event.currentTarget.querySelectorAll<HTMLElement>(
        "[data-header-item]:not([aria-disabled='true']):not(:disabled)",
      ),
    ];
    const index = nodes.indexOf(target);
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const backward = rtl ? "ArrowRight" : "ArrowLeft";
    let next: number | undefined;
    if (event.key === forward) next = (index + 1) % nodes.length;
    else if (event.key === backward) next = (index - 1 + nodes.length) % nodes.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = nodes.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    nodes[next]?.focus();
  };

  return (
    <header ref={setHeaderRef} data-slot="header" className={cn("relative w-full bg-background-menu text-text-default", className)} {...props}>
      <a href={skipHref} data-slot="header-skip" className="sr-only focus:not-sr-only focus:absolute focus:inset-s-4 focus:top-2 focus:z-50 focus:rounded-sm focus:bg-background-primary focus:px-4 focus:py-2 focus:text-md focus:font-medium focus:text-text-oncolor-primary focus:no-underline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black">
        {skipLabel}
      </a>
      {stamp}
      {top}
      <div
        className="mx-auto grid h-18 w-full max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 data-full:max-w-none lg:flex lg:px-8 data-[nav=center]:lg:grid data-[nav=center]:lg:grid-cols-[1fr_auto_1fr]"
        data-full={fullWidth ? "" : undefined}
        data-nav={navPosition === "center" ? "center" : undefined}
      >
        {drawer}

        {logo ? (
          <div data-slot="header-logo" className="col-start-2 row-start-1 flex shrink-0 items-center justify-self-center lg:col-auto lg:row-auto">
            {logo}
          </div>
        ) : null}

        <nav aria-label={navLabel} data-slot="header-nav" className="hidden min-w-0 flex-1 lg:block">
          <ul className="m-0 flex list-none flex-col p-0 flex-row flex-nowrap items-center gap-1" onKeyDown={onKeyDown}>
            {items.map((item) => (
              <DesktopItem
                key={item.label}
                item={item}
                linkStyle={linkStyle}
                submenuTone={submenuTone}
                submenuWidth={submenuWidth}
                anchor={headerRef}
                fullWidth={fullWidth}
              />
            ))}
          </ul>
        </nav>

        {actions.length ? (
          <Menu>
            <MenuTrigger
              data-slot="header-overflow-button"
              aria-label={moreLabel}
              className="col-start-1 row-start-1 justify-self-start inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-icon-default lg:hidden [&_svg]:size-6 hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black"
            >
              <HugeiconsIcon icon={MoreHorizontalIcon} aria-hidden />
            </MenuTrigger>
            <MenuContent align="start" className="min-w-48 lg:hidden">
              {actions.map((action) => (
                <OverflowAction key={action.label} action={action} />
              ))}
            </MenuContent>
          </Menu>
        ) : null}

        <div data-slot="header-end" className="ms-auto flex shrink-0 items-center justify-self-end gap-2 max-lg:hidden">
          {search ? <div className="hidden w-48 shrink-0 lg:block xl:w-56">{search}</div> : null}
          {actions.map((action) => (
            <HeaderAction key={action.label} {...action} />
          ))}
          {language}
          {user}
        </div>
      </div>
    </header>
  );
}

export type {
  HeaderActionItem,
  HeaderActionProps,
  HeaderLinkStyle,
  HeaderLogoProps,
  HeaderNavItemProps,
  HeaderNavLinkProps,
  HeaderNavProps,
  HeaderNavSectionProps,
  HeaderProps,
  HeaderSection,
  HeaderSubLink,
  HeaderSubmenuTone,
  HeaderSubmenuWidth,
};
export {
  Header,
  HeaderAction,
  HeaderLogo,
  HeaderNav,
  HeaderNavDivider,
  HeaderNavItem,
  HeaderNavLink,
  HeaderNavSection,
};
