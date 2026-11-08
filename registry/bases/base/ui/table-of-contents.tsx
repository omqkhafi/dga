"use client";

import * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

type TableOfContentsItem = {
  /** The `id` of the heading or section on the page. */
  id: string;
  /** The text of the link. */
  title: string;
  /** 1 for an h2, 2 for an h3, 3 for an h4. Default 1. */
  level?: 1 | 2 | 3;
};

/**
 * The id of the section being read: the first one whose top has passed the line at `offset`
 * pixels from the top of the viewport. Returns `undefined` until the page has scrolled to the
 * first section. Respects the document, so it works in any scroll container that is the viewport.
 */
function useActiveSection(ids: string[], offset = 96) {
  const [active, setActive] = React.useState<string | undefined>(undefined);
  const key = ids.join("|");
  React.useEffect(() => {
    const sections = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const update = () => {
      let current: string | undefined;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
      }
      setActive(current ?? sections[0]?.id);
    };
    update();
    // Scroll drives the section, not intersection ratios: it is exact for short and long sections.
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [key, offset]);
  return active;
}

type TableOfContentsProps = Omit<React.ComponentProps<"nav">, "children"> & {
  /** The sections, in page order. Levels nest by indentation. */
  items: TableOfContentsItem[];
  /** The heading of the list, for example "On this page". Also names the navigation. */
  title?: string;
  /** The active section (controlled). Leave it out to follow the scroll position. */
  activeId?: string;
  /** Called when the active section changes, by scrolling or by choosing a link. */
  onActiveChange?: (id: string) => void;
  /** Pixels from the top of the viewport at which a section counts as reached. Default 96. */
  offset?: number;
};

/**
 * An outline of the page with links to its sections (DGA: Table of Content). The section being
 * read is highlighted and has `aria-current="location"`. Tab moves through the links; the Up and
 * Down arrows, Home and End move between them too. Pair each link with an element that has the
 * matching `id`, and add `scroll-margin-top` to those elements for a sticky header.
 */
function TableOfContents({
  className,
  items,
  title,
  activeId,
  onActiveChange,
  offset = 96,
  ...props
}: TableOfContentsProps) {
  const tracked = useActiveSection(
    items.map((item) => item.id),
    offset,
  );
  const [chosen, setChosen] = React.useState<string | undefined>(undefined);
  // A link you chose stays active until the scroll position catches up with it.
  const active = activeId ?? chosen ?? tracked;
  // biome-ignore lint/correctness/useExhaustiveDependencies: forget the chosen link once scrolling catches up
  React.useEffect(() => {
    setChosen(undefined);
  }, [tracked]);
  const reported = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    if (active && active !== reported.current) {
      reported.current = active;
      onActiveChange?.(active);
    }
  }, [active, onActiveChange]);

  const titleId = React.useId();
  const listRef = React.useRef<HTMLUListElement>(null);
  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const links = [...(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];
    const at = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (at === -1) return;
    const next =
      event.key === "ArrowDown"
        ? at + 1
        : event.key === "ArrowUp"
          ? at - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? links.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    links[Math.min(Math.max(next, 0), links.length - 1)]?.focus();
  };

  return (
    <nav
      data-slot="table-of-contents"
      aria-labelledby={title ? titleId : undefined}
      className={cn("cn-toc", className)}
      {...props}
    >
      {title ? (
        <p id={titleId} data-slot="table-of-contents-title" className="cn-toc-title">
          {title}
        </p>
      ) : null}
      <ul ref={listRef} className="cn-toc-list" onKeyDown={onKeyDown}>
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id} data-level={item.level ?? 1}>
              <a
                data-slot="table-of-contents-link"
                data-level={item.level ?? 1}
                data-active={current ? "" : undefined}
                aria-current={current ? "location" : undefined}
                href={`#${item.id}`}
                className="cn-toc-link"
                onClick={() => setChosen(item.id)}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export type { TableOfContentsItem, TableOfContentsProps };
export { TableOfContents, useActiveSection };
