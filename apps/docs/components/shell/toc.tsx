"use client";

import { Popover } from "@base-ui/react/popover";
import { ArrowDown01Icon, LeftToRightListBulletIcon } from "@hugeicons/core-free-icons";
import { cn } from "cn";
import { AnchorProvider, type TableOfContents, TOCItem, useActiveAnchor } from "fumadocs-core/toc";
import { useState } from "react";
import { useT } from "@/lib/locale-context";
import { Icon } from "./icon";

function Items({ toc, onSelect }: { toc: TableOfContents; onSelect?: () => void }) {
  const active = useActiveAnchor();
  return (
    <ul className="flex flex-col border-s border-border-neutral-secondary">
      {toc.map((item) => {
        const isActive = active === item.url.slice(1);
        return (
          <li key={item.url}>
            <TOCItem
              href={item.url}
              onClick={onSelect}
              className={cn(
                "-ms-px block min-h-8 border-s-2 py-1 pe-2 text-sm transition-colors",
                item.depth > 2 ? "ps-6" : "ps-3",
                isActive
                  ? "border-border-primary font-medium text-text-primary"
                  : "border-transparent text-text-secondary-paragraph hover:bg-button-background-neutral-default hover:text-text-default active:bg-button-background-neutral-pressed",
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

/** "On this page": sticky on xl screens. */
export function Toc({ toc }: { toc: TableOfContents }) {
  const t = useT();
  if (toc.length === 0) return null;
  return (
    <AnchorProvider toc={toc}>
      <aside
        aria-label={t("toc.title")}
        className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 pe-4 xl:block"
      >
        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-text-default">
          <Icon icon={LeftToRightListBulletIcon} />
          {t("toc.title")}
        </p>
        <Items toc={toc} />
      </aside>
    </AnchorProvider>
  );
}

function CurrentSection({ toc }: { toc: TableOfContents }) {
  const active = useActiveAnchor();
  const t = useT();
  return <>{toc.find((item) => item.url.slice(1) === active)?.title ?? t("toc.title")}</>;
}

/** Below xl: a sticky bar under the header that opens the table of contents as a dropdown. */
export function InlineToc({ toc }: { toc: TableOfContents }) {
  const [open, setOpen] = useState(false);
  const t = useT();
  if (toc.length === 0) return null;
  return (
    <AnchorProvider toc={toc}>
      <div className="sticky top-14 z-30 -mx-4 mb-6 border-b border-border-neutral-secondary bg-background-white sm:-mx-8 lg:-mx-8 xl:hidden">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger className="flex min-h-11 w-full items-center gap-2 px-4 text-start text-sm font-medium text-text-default hover:bg-button-background-neutral-default active:bg-button-background-neutral-pressed sm:px-8 lg:px-8">
            <Icon icon={LeftToRightListBulletIcon} className=" shrink-0" />
            <span className="min-w-0 flex-1 truncate">
              <CurrentSection toc={toc} />
            </span>
            <Icon icon={ArrowDown01Icon} className=" shrink-0" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner sideOffset={0} align="start" className="z-40">
              <Popover.Popup className="max-h-[60dvh] w-(--anchor-width) min-w-64 overflow-y-auto border border-border-neutral-secondary bg-background-menu p-3 outline-none">
                <Popover.Title className="sr-only">{t("toc.title")}</Popover.Title>
                <Items toc={toc} onSelect={() => setOpen(false)} />
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </AnchorProvider>
  );
}
