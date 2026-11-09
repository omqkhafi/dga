"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ArrowDown01Icon, Menu01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/dga/drawer";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/dga/menu";
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
  /** The page the person is on (`aria-current="page"`). A parent is marked when a child is current. */
  current?: boolean;
  disabled?: boolean;
  /** The sub-menu: one column per section. */
  sections?: HeaderSection[];
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

function SubLink({ link, linkStyle }: { link: HeaderSubLink; linkStyle: HeaderLinkStyle }) {
  return (
    <MenuPrimitive.Item
      data-slot="header-submenu-item"
      className="flex min-h-16 cursor-pointer items-center gap-4 rounded-md px-4 py-2 text-md font-medium text-text-display no-underline outline-hidden select-none data-highlighted:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black aria-[current=page]:font-bold aria-[current=page]:underline aria-[current=page]:underline-offset-4 data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-text-default-disabled in-data-[tone=green]:text-text-oncolor-primary in-data-[tone=green]:data-highlighted:bg-button-background-transparent-hovered in-data-[tone=green]:active:bg-button-background-transparent-pressed in-data-[tone=green]:focus-visible:outline-border-white"
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
        <span className="text-md font-medium">{link.label}</span>
        {link.description ? (
          <span className="text-sm font-normal text-text-primary-paragraph in-data-[tone=green]:text-text-oncolor-primary">{link.description}</span>
        ) : null}
      </span>
    </MenuPrimitive.Item>
  );
}

type HeaderLinkStyle = "text" | "icon" | "boxed-icon";
type HeaderSubmenuTone = "default" | "green";

function DesktopItem({
  item,
  linkStyle,
  submenuTone,
}: {
  item: HeaderNavItem;
  linkStyle: HeaderLinkStyle;
  submenuTone: HeaderSubmenuTone;
}) {
  const current = isCurrent(item);
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
        <MenuContent className="min-w-80 max-w-[calc(100vw-2rem)] rounded-md p-6 shadow-lg data-[tone=green]:bg-background-sa-flag data-[tone=green]:text-text-oncolor-primary" data-tone={submenuTone} sideOffset={0}>
          <div
            className="grid gap-8 [grid-template-columns:repeat(var(--header-columns,1),minmax(12rem,1fr))]"
            style={{ "--header-columns": item.sections.length } as React.CSSProperties}
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
                  <SubLink key={link.href} link={link} linkStyle={linkStyle} />
                ))}
              </MenuPrimitive.Group>
            ))}
          </div>
        </MenuContent>
      </Menu>
    </li>
  );
}

function DrawerItem({ item, onNavigate }: { item: HeaderNavItem; onNavigate: () => void }) {
  const [expanded, setExpanded] = React.useState(isCurrent(item));
  const id = React.useId();
  const icon = item.icon ? (
    <HugeiconsIcon icon={item.icon} aria-hidden className="size-5 shrink-0 text-icon-default" />
  ) : null;
  if (!item.sections?.length) {
    return (
      <li>
        <a
          data-slot="header-drawer-item"
          data-level="1"
          data-current={item.current ? "" : undefined}
          data-disabled={item.disabled ? "" : undefined}
          className="flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-sm border-0 bg-transparent px-4 py-2 text-start text-sm font-semibold text-text-default no-underline hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-current:bg-button-background-neutral-selected data-current:text-link-primary-pressed data-[level=2]:ps-8 data-[level=2]:font-normal data-[level=2]:data-current:font-semibold disabled:cursor-not-allowed disabled:text-text-default-disabled aria-disabled:pointer-events-none aria-disabled:text-text-default-disabled"
          href={item.disabled ? undefined : item.href}
          aria-current={item.current ? "page" : undefined}
          aria-disabled={item.disabled ? true : undefined}
          onClick={onNavigate}
        >
          {icon}
          {item.label}
        </a>
      </li>
    );
  }
  return (
    <li>
      <button
        type="button"
        data-slot="header-drawer-item"
        data-level="1"
        data-current={isCurrent(item) ? "" : undefined}
        className="flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-sm border-0 bg-transparent px-4 py-2 text-start text-sm font-semibold text-text-default no-underline hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-current:bg-button-background-neutral-selected data-current:text-link-primary-pressed data-[level=2]:ps-8 data-[level=2]:font-normal data-[level=2]:data-current:font-semibold disabled:cursor-not-allowed disabled:text-text-default-disabled aria-disabled:pointer-events-none aria-disabled:text-text-default-disabled"
        aria-expanded={expanded}
        aria-controls={id}
        disabled={item.disabled}
        onClick={() => setExpanded((value) => !value)}
      >
        {icon}
        {item.label}
        <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="ms-auto size-4 shrink-0 text-icon-default transition-transform in-aria-expanded:rotate-180 motion-reduce:transition-none" />
      </button>
      <div id={id} hidden={!expanded} className="flex flex-col">
        {item.sections.map((section) => (
          <ul
            key={section.title ?? section.links.map((l) => l.href).join()}
            className="m-0 flex list-none flex-col p-0"
          >
            {section.title ? <li className="px-4 pt-2 ps-8 text-xs font-bold text-text-primary-paragraph">{section.title}</li> : null}
            {section.links.map((link) => (
              <li key={link.href}>
                <a
                  data-slot="header-drawer-item"
                  data-level="2"
                  data-current={link.current ? "" : undefined}
                  data-disabled={link.disabled ? "" : undefined}
                  className="flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-sm border-0 bg-transparent px-4 py-2 text-start text-sm font-semibold text-text-default no-underline hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-current:bg-button-background-neutral-selected data-current:text-link-primary-pressed data-[level=2]:ps-8 data-[level=2]:font-normal data-[level=2]:data-current:font-semibold disabled:cursor-not-allowed disabled:text-text-default-disabled aria-disabled:pointer-events-none aria-disabled:text-text-default-disabled"
                  href={link.disabled ? undefined : link.href}
                  aria-current={link.current ? "page" : undefined}
                  aria-disabled={link.disabled ? true : undefined}
                  onClick={onNavigate}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </li>
  );
}

type HeaderProps = Omit<React.ComponentProps<"header">, "children"> & {
  /** The logo, usually a link to the home page. Pass your own `img` or SVG. */
  logo?: React.ReactNode;
  /** The main navigation. */
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
 * Drawer: on a phone the overflow (…) button holding the actions is on the start side, the logo is
 * centred and the menu button is on the end side (as in Figma); the bar mirrors on Arabic pages. The page the
 * person is on has `aria-current="page"`.
 */
function Header({
  className,
  logo,
  items = [],
  navPosition = "start",
  actions = [],
  search,
  language,
  user,
  stamp,
  top,
  fullWidth = false,
  submenuTone = "default",
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
  const [open, setOpen] = React.useState(defaultMenuOpen);
  const rtl = useDocumentDirection() === "rtl";

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
    <header data-slot="header" className={cn("relative w-full bg-background-menu text-text-default", className)} {...props}>
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
        <Drawer open={open} onOpenChange={setOpen} side="start">
          <DrawerTrigger
            data-slot="header-menu-button"
            aria-label={menuLabel}
            className="col-start-3 row-start-1 justify-self-end inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-icon-default lg:hidden [&_svg]:size-6 hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black"
          >
            <HugeiconsIcon icon={Menu01Icon} aria-hidden />
          </DrawerTrigger>
          <DrawerContent closeLabel={closeLabel}>
            <DrawerHeader>
              <DrawerTitle>{drawerTitle}</DrawerTitle>
              {drawerDescription ? (
                <DrawerDescription>{drawerDescription}</DrawerDescription>
              ) : (
                <DrawerDescription className="sr-only">{navLabel}</DrawerDescription>
              )}
            </DrawerHeader>
            {search ? <div className="mb-4">{search}</div> : null}
            <nav aria-label={navLabel} data-slot="header-drawer-nav">
              <ul className="m-0 flex list-none flex-col p-0">
                {items.map((item) => (
                  <DrawerItem key={item.label} item={item} onNavigate={() => setOpen(false)} />
                ))}
              </ul>
            </nav>
            {language || user ? (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border-neutral-secondary pt-4">
                {language}
                {user}
              </div>
            ) : null}
          </DrawerContent>
        </Drawer>

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
  HeaderNavItem,
  HeaderProps,
  HeaderSection,
  HeaderSubLink,
  HeaderSubmenuTone,
};
export { Header, HeaderAction };
