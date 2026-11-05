"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import type * as PageTree from "fumadocs-core/page-tree";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useT } from "@/lib/locale-context";
import { Button } from "@/registry/bases/base/ui/button";
import { Divider } from "@/registry/bases/base/ui/divider";
import { Icon } from "./icon";
import { SidebarNav } from "./sidebar";
import { useTabs } from "./tabs";

/** Below md: a bottom sheet with the tabs and the docs navigation. */
export function MobileNav({ tree, version }: { tree: PageTree.Root; version: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const tabs = useTabs();
  const t = useT();
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button variant="subtle" iconOnly aria-label={t("menu.open")} className="md:hidden" />
        }
      >
        <Icon icon={Menu01Icon} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-alpha-black-50 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col overflow-hidden rounded-t-xl border border-b-0 border-border-neutral-secondary bg-background-white shadow-xl transition-transform duration-200 data-ending-style:translate-y-full data-starting-style:translate-y-full">
          <div
            aria-hidden
            className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-border-neutral-primary"
          />
          <div className="flex h-12 shrink-0 items-center justify-between px-3">
            <Dialog.Title className="text-md font-semibold text-text-default">
              {t("menu.title")}
            </Dialog.Title>
            <Dialog.Close
              render={<Button variant="subtle" iconOnly aria-label={t("menu.close")} />}
            >
              <Icon icon={Cancel01Icon} />
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
            <nav aria-label={t("nav.main")} className="flex flex-col p-3 pt-0">
              {tabs.map((tab) => (
                <NextLink
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setOpen(false)}
                  aria-current={tab.match(pathname) ? "page" : undefined}
                  className="flex min-h-11 items-center rounded-sm px-2 text-[0.8125rem] font-medium tracking-widest text-text-default hover:bg-button-background-neutral-default active:bg-button-background-neutral-pressed aria-[current=page]:text-text-primary"
                >
                  {tab.label}
                </NextLink>
              ))}
            </nav>
            <Divider />
            <SidebarNav tree={tree} version={version} onNavigate={() => setOpen(false)} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
