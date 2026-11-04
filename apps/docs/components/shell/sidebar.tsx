"use client";

import {
  BookOpen01Icon,
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
  PaintBoardIcon,
  RectangularIcon,
  RulerIcon,
  SquareRoundCornerIcon,
  StarIcon,
  Tag01Icon,
  TextFontIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import type * as PageTree from "fumadocs-core/page-tree";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Badge } from "@/registry/bases/base/ui/badge";
import { SearchButton } from "./search-button";

const ICONS: Record<string, IconSvgElement> = {
  "/docs": BookOpen01Icon,
  "/docs/installation": Download04Icon,
  "/docs/deviations": GitCompareIcon,
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
      <div className="flex items-center gap-2 border-b border-border-neutral-secondary px-4 py-2.5">
        <HugeiconsIcon icon={GitBranchIcon} className="size-4 text-icon-default-500" aria-hidden />
        <Badge variant={version ? "success" : "neutral"} size="sm" rounded>
          {version ? `v${version}` : "Unreleased"}
        </Badge>
        <span className="text-xs text-text-secondary-paragraph">Latest release</span>
      </div>
      <div className="border-b border-border-neutral-secondary p-3">
        <SearchButton />
      </div>
      <nav aria-label="Docs" className="flex flex-col gap-4 px-3 py-4">
        {groups.map((group, i) => (
          <section key={String(group.title ?? i)} className="flex flex-col gap-0.5">
            {group.title ? (
              <h2 className="flex items-center gap-2 px-2 pb-1 text-2xs font-semibold tracking-widest text-text-secondary-paragraph uppercase">
                <span>
                  {i + 1}. {group.title}
                </span>
                <span aria-hidden className="h-px flex-1 bg-border-neutral-secondary" />
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
                        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors",
                        "focus-visible:outline-2 focus-visible:outline-border-black",
                        active
                          ? "bg-background-primary-50 font-medium text-text-primary"
                          : "text-text-primary-paragraph hover:bg-button-background-neutral-default hover:text-text-default",
                      )}
                    >
                      <HugeiconsIcon icon={icon} className="size-4 shrink-0" aria-hidden />
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
