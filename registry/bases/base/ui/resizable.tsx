"use client";

import { GripVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import {
  Group,
  type GroupProps,
  Panel,
  type PanelImperativeHandle,
  type PanelProps,
  Separator,
  type SeparatorProps,
  useDefaultLayout,
} from "react-resizable-panels";
import { type Direction, useDocumentDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const GroupDirection = React.createContext<Direction>("ltr");
/** The panels of the group by id, so Enter on a handle can collapse the start panel in Arabic. */
const PanelHandles = React.createContext<Map<string, PanelImperativeHandle>>(new Map());
/** Keys this file sent itself, so its own key handler lets them through. */
const sentKeys = new WeakSet<Event>();

type ResizablePanelGroupProps = Omit<GroupProps, "dir"> & {
  /** Reading direction of the panels. Defaults to the page direction. */
  dir?: Direction;
  /**
   * Remembers the sizes in `localStorage` under this key, so a reload keeps the layout. Each
   * group on a page needs its own key, and every panel needs an `id`.
   */
  autoSaveId?: string;
};

/** The library works left to right. In Arabic the panels are reversed, so Home and End swap. */
function mirrorKeys(handles: Map<string, PanelImperativeHandle>) {
  return (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.matches?.("[data-separator]") || sentKeys.has(event.nativeEvent)) return;
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      event.stopPropagation();
      const swapped = new KeyboardEvent("keydown", {
        key: event.key === "Home" ? "End" : "Home",
        bubbles: true,
        cancelable: true,
      });
      sentKeys.add(swapped);
      target.dispatchEvent(swapped);
    } else if (event.key === "Enter") {
      // The start panel is the next element in Arabic.
      event.preventDefault();
      event.stopPropagation();
      const handle = handles.get(target.nextElementSibling?.id ?? "");
      if (handle?.isCollapsed()) handle.expand();
      else handle?.collapse();
    }
  };
}

const noStorage = { getItem: () => null, setItem: () => {} };

/**
 * Panels that the user resizes by dragging a handle or with the arrow keys (Platform Code
 * extension, not part of DGA). Built on react-resizable-panels. The first panel is the start
 * panel: on the left in English and on the right in Arabic. The library works in physical
 * left to right, so in Arabic the group lays itself out left to right and puts the panels in
 * reverse order, which keeps dragging and the arrow keys true to what the eye sees.
 */
function ResizablePanelGroup({
  className,
  orientation = "horizontal",
  dir,
  autoSaveId,
  children,
  ...props
}: ResizablePanelGroupProps) {
  const pageDir = useDocumentDirection();
  const direction = dir ?? pageDir;
  const reverse = direction === "rtl" && orientation === "horizontal";
  const saved = useDefaultLayout({
    id: autoSaveId ?? "resizable",
    storage: autoSaveId && typeof window !== "undefined" ? window.localStorage : noStorage,
  });
  const persist = autoSaveId
    ? { defaultLayout: saved.defaultLayout, onLayoutChanged: saved.onLayoutChanged }
    : {};
  const handles = React.useMemo(() => new Map<string, PanelImperativeHandle>(), []);
  const panels = reverse ? React.Children.toArray(children).reverse() : children;
  return (
    <GroupDirection.Provider value={direction}>
      <PanelHandles.Provider value={handles}>
        <Group
          data-slot="resizable-panel-group"
          orientation={orientation}
          dir="ltr"
          className={cn("cn-resizable", className)}
          {...(reverse ? { onKeyDownCapture: mirrorKeys(handles) } : {})}
          {...persist}
          {...props}
        >
          {panels}
        </Group>
      </PanelHandles.Provider>
    </GroupDirection.Provider>
  );
}

/** One panel. Give it `defaultSize`, `minSize` and `maxSize` as numbers (pixels) or strings ("30%"). */
function ResizablePanel({ className, id, panelRef, ...props }: PanelProps) {
  const direction = React.useContext(GroupDirection);
  const handles = React.useContext(PanelHandles);
  const setRef = React.useCallback(
    (handle: PanelImperativeHandle | null) => {
      if (id !== undefined) {
        if (handle) handles.set(String(id), handle);
        else handles.delete(String(id));
      }
      if (typeof panelRef === "function") panelRef(handle);
      else if (panelRef) panelRef.current = handle;
    },
    [id, handles, panelRef],
  );
  return (
    <Panel
      data-slot="resizable-panel"
      dir={direction}
      id={id}
      panelRef={setRef}
      className={cn("cn-resizable-panel", className)}
      {...props}
    />
  );
}

type ResizableHandleProps = SeparatorProps & {
  /** Shows a grip on the handle. */
  withHandle?: boolean;
};

/**
 * The handle between two panels: a focusable separator with `aria-valuenow`, the size of the
 * panel before it. Arrow keys move it 5%, Home and End send it to either end, and Enter collapses
 * a collapsible panel. Pass `aria-label` to name it.
 */
function ResizableHandle({ withHandle = false, className, ...props }: ResizableHandleProps) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn("cn-resizable-handle", className)}
      {...props}
    >
      {withHandle ? (
        <span className="cn-resizable-grip" aria-hidden>
          <HugeiconsIcon icon={GripVerticalIcon} />
        </span>
      ) : null}
    </Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
