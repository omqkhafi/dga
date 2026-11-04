"use client";

import { LeftToRightListBulletIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "cn";
import { AnchorProvider, type TableOfContents, TOCItem, useActiveAnchor } from "fumadocs-core/toc";

function Items({ toc }: { toc: TableOfContents }) {
  const active = useActiveAnchor();
  return (
    <ul className="flex flex-col border-s border-border-neutral-secondary">
      {toc.map((item) => {
        const isActive = active === item.url.slice(1);
        return (
          <li key={item.url}>
            <TOCItem
              href={item.url}
              className={cn(
                "-ms-px block border-s-2 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-border-black",
                item.depth > 2 ? "ps-6" : "ps-3",
                isActive
                  ? "border-border-primary font-medium text-text-primary"
                  : "border-transparent text-text-secondary-paragraph hover:text-text-default",
              )}
            >
              {item.title}
            </TOCItem>
          </li>
        );
      })}
    </ul>
  );
}

/** "On this page": sticky on xl screens, a collapsible block above the content below that. */
export function Toc({ toc }: { toc: TableOfContents }) {
  if (toc.length === 0) return null;
  return (
    <AnchorProvider toc={toc}>
      <aside className="sticky top-12 hidden h-[calc(100dvh-3rem)] w-60 shrink-0 overflow-y-auto py-10 pe-4 xl:block">
        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-text-default">
          <HugeiconsIcon icon={LeftToRightListBulletIcon} className="size-4" aria-hidden />
          On this page
        </p>
        <Items toc={toc} />
      </aside>
    </AnchorProvider>
  );
}

export function InlineToc({ toc }: { toc: TableOfContents }) {
  if (toc.length === 0) return null;
  return (
    <AnchorProvider toc={toc}>
      <details className="group mb-6 rounded-md border border-border-neutral-secondary bg-background-card xl:hidden">
        <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium text-text-default">
          <HugeiconsIcon icon={LeftToRightListBulletIcon} className="size-4" aria-hidden />
          On this page
        </summary>
        <div className="px-3 pb-3">
          <Items toc={toc} />
        </div>
      </details>
    </AnchorProvider>
  );
}
