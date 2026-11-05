"use client";

import {
  BookOpen01Icon,
  ContrastIcon,
  CursorPointer02Icon,
  DashedLine01Icon,
  Download04Icon,
  File01Icon,
  GitBranchIcon,
  GitCompareIcon,
  IconjarIcon,
  LabelIcon,
  Layers01Icon,
  Link01Icon,
  Loading03Icon,
  Moon02Icon,
  PaintBoardIcon,
  RectangularIcon,
  RulerIcon,
  SquareRoundCornerIcon,
  StarIcon,
  Tag01Icon,
  TextFontIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import type * as PageTree from "fumadocs-core/page-tree";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Icon } from "./icon";
import { SearchButton } from "./search-button";

const ICONS: Record<string, IconSvgElement> = {
  "/docs": BookOpen01Icon,
  "/docs/installation": Download04Icon,
  "/docs/deviations": GitCompareIcon,
  "/docs/contrast": ContrastIcon,
  "/docs/foundations/dark-mode": Moon02Icon,
  "/docs/foundations/colors": PaintBoardIcon,
  "/docs/foundations/typography": TextFontIcon,
  "/docs/foundations/spacing": RulerIcon,
  "/docs/foundations/radius": SquareRoundCornerIcon,
  "/docs/foundations/shadows": Layers01Icon,
  "/docs/foundations/icons": IconjarIcon,
  "/docs/components/button": CursorPointer02Icon,
  "/docs/components/spinner": Loading03Icon,
  "/docs/components/link": Link01Icon,
  "/docs/components/badge": LabelIcon,
  "/docs/components/tag": Tag01Icon,
  "/docs/components/divider": DashedLine01Icon,
  "/docs/components/avatar": UserCircleIcon,
  "/docs/components/featured-icon": StarIcon,
  "/docs/components/skeleton": RectangularIcon,
};

type Group = { title: ReactNode; items: PageTree.Item[] };

/** Separators start numbered groups; folders are flattened into their group. */
export function groupTree(tree: PageTree.Root): Group[] {
  const groups: Group[] = [];
  const push = (item: PageTree.Item) => {
    if (groups.length === 0) groups.push({ title: null, items: [] });
    groups.at(-1)?.items.push(item);
  };
  const walk = (nodes: PageTree.Node[]) => {
    for (const node of nodes) {
      if (node.type === "separator") groups.push({ title: node.name, items: [] });
      else if (node.type === "page") push(node);
      else {
        if (node.index) push(node.index);
        walk(node.children);
      }
    }
  };
  walk(tree.children);
  return groups.filter((g) => g.items.length > 0);
}

export function SidebarNav({
  tree,
  version,
  onNavigate,
}: {
  tree: PageTree.Root;
  version: string | null;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const groups = groupTree(tree);
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <Icon icon={GitBranchIcon} className="text-icon-default-500" />
        <Badge variant={version ? "success" : "neutral"} size="md" rounded>
          {version ? `v${version}` : "Unreleased"}
        </Badge>
        <span className="text-[0.8125rem] text-text-secondary-paragraph">Latest release</span>
      </div>
      <div className="px-4 pb-4">
        <SearchButton onOpen={onNavigate} />
      </div>
      <nav aria-label="Docs" className="flex flex-col gap-6 px-4 pb-8">
        {groups.map((group, i) => (
          <section key={String(group.title ?? i)} className="flex flex-col gap-0.5">
            {group.title ? (
              <h2 className="px-2 pb-1 text-[0.8125rem] font-semibold tracking-wider text-text-secondary-paragraph uppercase">
                {i + 1}. {group.title}
              </h2>
            ) : null}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = pathname === item.url;
                const icon = ICONS[item.url] ?? File01Icon;
                return (
                  <li key={item.url}>
                    <NextLink
                      href={item.url}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex min-h-9 items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                        // A 2px bar on the inline-start edge marks the current page.
                        "before:absolute before:inset-y-2 before:-start-2 before:w-0.5 before:rounded-full before:bg-border-primary before:transition-opacity before:duration-150",
                        active
                          ? "font-semibold text-text-default before:opacity-100"
                          : "text-text-primary-paragraph before:opacity-0 hover:bg-button-background-neutral-default hover:text-text-default active:bg-button-background-neutral-pressed",
                      )}
                    >
                      <Icon
                        icon={icon}
                        className={active ? "text-text-primary" : "text-icon-default-500"}
                      />
                      {item.name}
                    </NextLink>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </div>
  );
}
