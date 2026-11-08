"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ArrowDown01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
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
import { Menu, MenuContent, MenuTrigger } from "@/components/dga/menu";
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
 * One action in the header bar (DGA: Header Action): an icon and a label, inline or with the icon
 * above. It renders a link when it has an `href`, a button otherwise. Below the `lg` width the
 * label is hidden and stays as the accessible name.
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
  const content = (
    <>
      {icon ? <HugeiconsIcon icon={icon} aria-hidden className="cn-header-icon" /> : null}
      <span className={cn("cn-header-action-label", iconOnly && "sr-only")}>{label}</span>
    </>
  );
  const shared = {
    "data-slot": "header-action",
    "data-current": selected ? "" : undefined,
    "data-icon-position": iconPosition,
    className: cn("cn-header-action", className),
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
    >
      {content}
    </button>
  );
}

function SubLink({ link, linkStyle }: { link: HeaderSubLink; linkStyle: HeaderLinkStyle }) {
  return (
    <MenuPrimitive.Item
      data-slot="header-submenu-item"
      className="cn-header-sub-item"
      disabled={link.disabled}
      render={<a href={link.href} aria-current={link.current ? "page" : undefined} />}
    >
      {linkStyle !== "text" && link.icon ? (
        <span
          className="cn-header-sub-icon"
          data-boxed={linkStyle === "boxed-icon" ? "" : undefined}
        >
          <HugeiconsIcon icon={link.icon} aria-hidden />
        </span>
      ) : null}
      <span className="cn-header-sub-text">
        <span className="cn-header-sub-label">{link.label}</span>
        {link.description ? (
          <span className="cn-header-sub-description">{link.description}</span>
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
    <HugeiconsIcon icon={item.icon} aria-hidden className="cn-header-icon" />
  ) : null;
  if (!item.sections?.length) {
    return (
      <li>
        <a
          data-slot="header-item"
          data-header-item=""
          data-current={current ? "" : undefined}
          data-disabled={item.disabled ? "" : undefined}
          className="cn-header-item"
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
          className="cn-header-item"
        >
          {icon}
          {item.label}
          <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="cn-header-chevron" />
        </MenuTrigger>
        <MenuContent className="cn-header-submenu" data-tone={submenuTone} sideOffset={0}>
          <div
            className="cn-header-submenu-grid"
            style={{ "--header-columns": item.sections.length } as React.CSSProperties}
          >
            {item.sections.map((section) => (
              <MenuPrimitive.Group
                key={section.title ?? section.links.map((l) => l.href).join()}
                className="cn-header-submenu-column"
              >
                {section.title ? (
                  <MenuPrimitive.GroupLabel className="cn-header-submenu-title">
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
    <HugeiconsIcon icon={item.icon} aria-hidden className="cn-header-icon" />
  ) : null;
  if (!item.sections?.length) {
    return (
      <li>
        <a
          data-slot="header-drawer-item"
          data-level="1"
          data-current={item.current ? "" : undefined}
          data-disabled={item.disabled ? "" : undefined}
          className="cn-header-drawer-item"
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
        className="cn-header-drawer-item"
        aria-expanded={expanded}
        aria-controls={id}
        disabled={item.disabled}
        onClick={() => setExpanded((value) => !value)}
      >
        {icon}
        {item.label}
        <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="cn-header-drawer-chevron" />
      </button>
      <div id={id} hidden={!expanded} className="cn-header-drawer-sub">
        {item.sections.map((section) => (
          <ul
            key={section.title ?? section.links.map((l) => l.href).join()}
            className="cn-header-list"
          >
            {section.title ? <li className="cn-header-drawer-heading">{section.title}</li> : null}
            {section.links.map((link) => (
              <li key={link.href}>
                <a
                  data-slot="header-drawer-item"
                  data-level="2"
                  data-current={link.current ? "" : undefined}
                  data-disabled={link.disabled ? "" : undefined}
                  className="cn-header-drawer-item"
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
 * Drawer. The page the person is on has `aria-current="page"`.
 */
function Header({
  className,
  logo,
  items = [],
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
    <header data-slot="header" className={cn("cn-header", className)} {...props}>
      <a href={skipHref} data-slot="header-skip" className="cn-header-skip">
        {skipLabel}
      </a>
      {stamp}
      {top}
      <div className="cn-header-bar" data-full={fullWidth ? "" : undefined}>
        <Drawer open={open} onOpenChange={setOpen} side="start">
          <DrawerTrigger
            data-slot="header-menu-button"
            aria-label={menuLabel}
            className="cn-header-menu-button"
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
            {search ? <div className="cn-header-drawer-search">{search}</div> : null}
            <nav aria-label={navLabel} data-slot="header-drawer-nav">
              <ul className="cn-header-list">
                {items.map((item) => (
                  <DrawerItem key={item.label} item={item} onNavigate={() => setOpen(false)} />
                ))}
              </ul>
            </nav>
          </DrawerContent>
        </Drawer>

        {logo ? (
          <div data-slot="header-logo" className="cn-header-logo">
            {logo}
          </div>
        ) : null}

        <nav aria-label={navLabel} data-slot="header-nav" className="cn-header-nav">
          <ul className="cn-header-list cn-header-items" onKeyDown={onKeyDown}>
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

        <div data-slot="header-end" className="cn-header-end">
          {search ? <div className="cn-header-search">{search}</div> : null}
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
