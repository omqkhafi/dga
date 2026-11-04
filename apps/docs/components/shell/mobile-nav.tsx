"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as PageTree from "fumadocs-core/page-tree";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";
import { Divider } from "@/registry/bases/base/ui/divider";
import { SidebarNav } from "./sidebar";
import { TABS } from "./tabs";

/** Below md: a drawer with the tabs and the docs navigation. */
export function MobileNav({ tree, version }: { tree: PageTree.Root; version: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={<Button variant="subtle" iconOnly aria-label="Open menu" className="md:hidden" />}
      >
        <HugeiconsIcon icon={Menu01Icon} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-alpha-black-50 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 end-0 z-50 flex w-[min(20rem,90vw)] flex-col overflow-y-auto bg-background-white shadow-xl transition-transform data-ending-style:translate-x-full data-starting-style:translate-x-full rtl:data-ending-style:-translate-x-full rtl:data-starting-style:-translate-x-full">
          <div className="flex h-12 items-center justify-between border-b border-border-neutral-secondary px-3">
            <Dialog.Title className="text-sm font-semibold text-text-default">Menu</Dialog.Title>
            <Dialog.Close render={<Button variant="subtle" iconOnly aria-label="Close menu" />}>
              <HugeiconsIcon icon={Cancel01Icon} />
            </Dialog.Close>
          </div>
          <nav aria-label="Main" className="flex flex-col p-3">
            {TABS.map((tab) => (
              <NextLink
                key={tab.href}
                href={tab.href}
                onClick={() => setOpen(false)}
                aria-current={tab.match(pathname) ? "page" : undefined}
                className="rounded-sm px-2 py-2 text-xs font-medium tracking-widest text-text-default hover:bg-button-background-neutral-default aria-[current=page]:text-text-primary"
              >
                {tab.label}
              </NextLink>
            ))}
          </nav>
          <Divider />
          <SidebarNav tree={tree} version={version} onNavigate={() => setOpen(false)} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
