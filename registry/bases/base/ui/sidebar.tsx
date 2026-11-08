"use client";

import { SidebarLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { Button } from "@/components/dga/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/dga/collapsible";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/dga/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/dga/tooltip";
import { cn } from "@/registry/bases/base/lib/utils";

/** The cookie that remembers whether the sidebar is open. Change it with `cookieName`. */
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Reads the saved open state from a cookie header, for example `await cookies()` on the server:
 * `parseSidebarState(cookieHeader)`. Returns `undefined` when nothing is saved. Pass the result as
 * `defaultOpen` so the first paint already has the saved state.
 */
function parseSidebarState(cookieHeader: string, cookieName = SIDEBAR_COOKIE_NAME) {
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === cookieName) {
      const value = rest.join("=");
      if (value === "true") return true;
      if (value === "false") return false;
    }
  }
  return undefined;
}

type SidebarContextValue = {
  /** `expanded` or `collapsed` (an icon rail, or hidden). */
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Whether the phone drawer form is open. */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  /** True below the mobile breakpoint, where the sidebar is a Drawer. */
  isMobile: boolean;
  /** Opens or closes the sidebar, or the Drawer on a phone. */
  toggleSidebar: () => void;
  /** The id of the sidebar, for `aria-controls` on a trigger. */
  id: string;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

/** The state of the closest SidebarProvider. */
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar needs a SidebarProvider around it.");
  return context;
}

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener("change", callback);
    return () => list.removeEventListener("change", callback);
  };
}

function useIsMobile(breakpoint: number) {
  const query = `(max-width: ${breakpoint - 1}px)`;
  const subscribe = React.useMemo(() => subscribeMedia(query), [query]);
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

type SidebarProviderProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  /** Whether the sidebar is open at first (uncontrolled). */
  defaultOpen?: boolean;
  /** Whether the sidebar is open (controlled). */
  open?: boolean;
  /** Called with the new state. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Remembers the open state in a cookie and restores it on the next visit. Turn it off for a
   * sidebar that should always start the same way.
   */
  persist?: boolean;
  /** The name of the cookie. Give each sidebar of your app its own. */
  cookieName?: string;
  /**
   * The key that, with Ctrl or Command, opens and closes the sidebar. Pass `false` to turn the
   * shortcut off.
   */
  shortcut?: string | false;
  /** Below this width in pixels the sidebar is a Drawer. */
  mobileBreakpoint?: number;
};

/**
 * Holds the state of a sidebar and lays out the sidebar and the page beside it (Platform Code
 * extension, not part of DGA). Put one around the Sidebar and the SidebarInset. The sidebar can be
 * an icon rail, hide completely, or become a Drawer on a phone; the open state is remembered in
 * a cookie, and Ctrl or Command with B toggles it. Tooltips of the icon rail share one provider.
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  persist = true,
  cookieName = SIDEBAR_COOKIE_NAME,
  shortcut = "b",
  mobileBreakpoint = 768,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const id = React.useId();
  const isMobile = useIsMobile(mobileBreakpoint);
  const [openMobile, setOpenMobile] = React.useState(false);
  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = openProp ?? openState;

  // The saved state is applied after the first paint, so the server and client markup match.
  // On the server, read it with parseSidebarState and pass it as defaultOpen to skip the flash.
  React.useEffect(() => {
    if (openProp !== undefined || !persist) return;
    const saved = parseSidebarState(document.cookie, cookieName);
    if (saved !== undefined) setOpenState(saved);
  }, [openProp, persist, cookieName]);

  const setOpen = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
      if (openProp === undefined) setOpenState(next);
      if (persist) {
        // biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API is not in every browser
        document.cookie = `${cookieName}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; samesite=lax`;
      }
    },
    [onOpenChange, openProp, persist, cookieName],
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((value) => !value);
    else setOpen(!open);
  }, [isMobile, open, setOpen]);

  React.useEffect(() => {
    if (shortcut === false) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === shortcut.toLowerCase() && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcut, toggleSidebar]);

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
      id,
    }),
    [open, setOpen, openMobile, isMobile, toggleSidebar, id],
  );

  return (
    <SidebarContext.Provider value={value}>
      <TooltipProvider delay={0}>
        <div
          data-slot="sidebar-provider"
          className={cn("cn-sidebar-provider", className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

type SidebarProps = React.ComponentProps<"aside"> & {
  /** The edge it sits on. `start` and `end` follow the page direction, so `start` is on the right in Arabic. */
  side?: "start" | "end";
  /**
   * What happens when it closes. `offcanvas` hides it, `icon` leaves a rail with only the icons,
   * and `none` makes it always open.
   */
  collapsible?: "offcanvas" | "icon" | "none";
  /** The name of the Drawer on a phone, read by screen readers. */
  mobileTitle?: string;
  /** A short description of the Drawer on a phone. */
  mobileDescription?: string;
  /** Accessible name of the Drawer's close button. */
  closeLabel?: string;
};

/**
 * The panel of navigation. On a desktop it sits beside the page and animates its width; below the
 * mobile breakpoint it is a Drawer that slides in from its side. Give it an `aria-label`.
 */
function Sidebar({
  side = "start",
  collapsible = "offcanvas",
  mobileTitle = "Navigation",
  mobileDescription = "The main navigation of the site.",
  closeLabel = "Close",
  className,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile, id } = useSidebar();

  if (collapsible === "none") {
    return (
      <aside
        id={id}
        data-slot="sidebar"
        data-side={side}
        data-state="expanded"
        data-collapsible=""
        className={cn("cn-sidebar cn-sidebar-static", className)}
        {...props}
      >
        <div data-sidebar="sidebar" className="cn-sidebar-inner">
          {children}
        </div>
      </aside>
    );
  }

  if (isMobile) {
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile} side={side}>
        <DrawerContent
          id={id}
          data-slot="sidebar"
          showCloseButton
          closeLabel={closeLabel}
          className={cn("cn-sidebar-drawer", className)}
        >
          <DrawerHeader className="sr-only">
            <DrawerTitle>{mobileTitle}</DrawerTitle>
            <DrawerDescription>{mobileDescription}</DrawerDescription>
          </DrawerHeader>
          <div data-sidebar="sidebar" data-mobile="" className="cn-sidebar-mobile">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  const collapsed = state === "collapsed";
  return (
    <aside
      id={id}
      data-slot="sidebar"
      data-side={side}
      data-state={state}
      data-collapsible={collapsed ? collapsible : ""}
      className={cn("cn-sidebar", className)}
      {...props}
    >
      <div
        data-sidebar="sidebar"
        inert={collapsed && collapsible === "offcanvas"}
        className="cn-sidebar-inner"
      >
        {children}
      </div>
    </aside>
  );
}

type SidebarTriggerProps = Omit<React.ComponentProps<typeof Button>, "iconOnly" | "children"> & {
  /** Accessible name of the button. Translate it on Arabic pages. */
  label?: string;
};

/** The button that opens and closes the sidebar. Its `aria-expanded` follows the state. */
function SidebarTrigger({
  className,
  label = "Toggle sidebar",
  onClick,
  variant = "subtle",
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar, isMobile, open, openMobile, id } = useSidebar();
  return (
    <Button
      data-slot="sidebar-trigger"
      variant={variant}
      iconOnly
      aria-label={label}
      aria-controls={id}
      aria-expanded={isMobile ? openMobile : open}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <HugeiconsIcon icon={SidebarLeftIcon} aria-hidden className="rtl:-scale-x-100" />
    </Button>
  );
}

/** The page beside the sidebar. Put your `<main>` inside it. */
function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-inset" className={cn("cn-sidebar-inset", className)} {...props} />;
}

/** The top of the sidebar, for a logo or a switcher. */
function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="sidebar-header" className={cn("cn-sidebar-header", className)} {...props} />
  );
}

/** The bottom of the sidebar, for the signed-in user or help links. */
function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="sidebar-footer" className={cn("cn-sidebar-footer", className)} {...props} />
  );
}

/** The scrolling middle of the sidebar. Put the groups inside. */
function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="sidebar-content" className={cn("cn-sidebar-content", className)} {...props} />
  );
}

/** A line between parts of the sidebar. */
function SidebarSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="sidebar-separator"
      className={cn("cn-sidebar-separator", className)}
      {...props}
    />
  );
}

const GroupContext = React.createContext<string | undefined>(undefined);

/** A set of related items with an optional SidebarGroupLabel that names it. */
function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  const labelId = React.useId();
  return (
    <GroupContext.Provider value={labelId}>
      {/* biome-ignore lint/a11y/useSemanticElements: a fieldset would add form semantics and a border */}
      <div
        role="group"
        aria-labelledby={labelId}
        data-slot="sidebar-group"
        className={cn("cn-sidebar-group", className)}
        {...props}
      />
    </GroupContext.Provider>
  );
}

/** The heading of a group. It is hidden on the icon rail but still names the group. */
function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useContext(GroupContext);
  return (
    <div
      id={id}
      data-slot="sidebar-group-label"
      className={cn("cn-sidebar-group-label", className)}
      {...props}
    />
  );
}

/** Holds the menu of a group. */
function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn("cn-sidebar-group-content", className)}
      {...props}
    />
  );
}

/** A list of items. */
function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("cn-sidebar-menu", className)} {...props} />;
}

/** One entry of a menu. */
function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("cn-sidebar-menu-item", className)}
      {...props}
    />
  );
}

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  /** This is the current page: it sets `aria-current="page"` and the selected look. */
  isActive?: boolean;
  /** The label shown beside the icon on the icon rail. Without it the rail shows no tooltip. */
  tooltip?: React.ReactNode;
  /** Render your own link component, for example `<a href="/" />` or a Next.js `Link`. */
  render?: React.ReactElement<Record<string, unknown>>;
};

/**
 * One link or button of the menu: an icon and a label. On the icon rail the label is hidden but
 * still read by screen readers, and `tooltip` shows it on hover and focus.
 */
function SidebarMenuButton({
  isActive = false,
  tooltip,
  render,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const merged = {
    "data-slot": "sidebar-menu-button",
    "data-active": isActive ? "" : undefined,
    "aria-current": isActive ? "page" : undefined,
    className: cn("cn-sidebar-menu-button", className),
    ...props,
  } as React.ComponentProps<"button">;
  const button = render ? (
    React.cloneElement(render, merged as Record<string, unknown>, children)
  ) : (
    <button type="button" {...merged}>
      {children}
    </button>
  );
  if (!tooltip || isMobile || state !== "collapsed") return button;
  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipContent side="end" showArrow={false} sideOffset={8}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

/** A count or tag at the end of an item. Hidden on the icon rail. */
function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className={cn("cn-sidebar-menu-badge", className)}
      {...props}
    />
  );
}

/** An item that opens a nested group. Put a SidebarMenuCollapsibleTrigger and a content inside. */
function SidebarMenuCollapsible({ className, ...props }: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      data-slot="sidebar-menu-collapsible"
      className={cn("cn-sidebar-menu-collapsible", className)}
      {...props}
    />
  );
}

/**
 * The button that opens a nested group, with a chevron. On the icon rail, pressing it opens the
 * sidebar so the group can be seen.
 */
function SidebarMenuCollapsibleTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger>) {
  const { isMobile, state, setOpen } = useSidebar();
  return (
    <CollapsibleTrigger
      data-slot="sidebar-menu-button"
      showChevron
      className={cn("cn-sidebar-menu-button cn-sidebar-menu-collapsible-trigger", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!isMobile && state === "collapsed") setOpen(true);
      }}
      {...props}
    />
  );
}

/** The nested group. Put a SidebarMenuSub inside. */
function SidebarMenuCollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="sidebar-menu-collapsible-content"
      className={cn("cn-sidebar-menu-collapsible-content", className)}
      {...props}
    />
  );
}

/** The list of a nested group. */
function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul data-slot="sidebar-menu-sub" className={cn("cn-sidebar-menu-sub", className)} {...props} />
  );
}

/** One entry of a nested group. */
function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={cn("cn-sidebar-menu-sub-item", className)}
      {...props}
    />
  );
}

/** A link or button of a nested group. */
function SidebarMenuSubButton({
  isActive = false,
  render,
  className,
  children,
  ...props
}: Omit<SidebarMenuButtonProps, "tooltip">) {
  const merged = {
    "data-slot": "sidebar-menu-sub-button",
    "data-active": isActive ? "" : undefined,
    "aria-current": isActive ? "page" : undefined,
    className: cn("cn-sidebar-menu-sub-button", className),
    ...props,
  } as React.ComponentProps<"button">;
  return render ? (
    React.cloneElement(render, merged as Record<string, unknown>, children)
  ) : (
    <button type="button" {...merged}>
      {children}
    </button>
  );
}

export type { SidebarProps, SidebarProviderProps };
export {
  parseSidebarState,
  SIDEBAR_COOKIE_NAME,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuCollapsible,
  SidebarMenuCollapsibleContent,
  SidebarMenuCollapsibleTrigger,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
