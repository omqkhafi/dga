"use client";

import { Menu } from "@base-ui/react/menu";
import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  ChatGptIcon,
  Copy01Icon,
  File01Icon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { siteUrl } from "@/lib/shared";
import { Button } from "@/registry/bases/base/ui/button";
import { Icon } from "./icon";

const item =
  "flex min-h-10 cursor-pointer items-center gap-2 rounded-sm px-2 text-sm text-text-default outline-none data-highlighted:bg-button-background-neutral-default data-highlighted:outline-2 data-highlighted:-outline-offset-2 data-highlighted:outline-border-black";

/**
 * "Copy page": copies the page as Markdown (from /docs/<slug>.md), and a menu with
 * more ways to use it: view the Markdown, or open it in an AI assistant.
 */
export function CopyPage({ markdownUrl }: { markdownUrl: string }) {
  const [state, setState] = useState<"idle" | "loading" | "copied">("idle");
  const copy = async () => {
    setState("loading");
    try {
      const text = await (await fetch(markdownUrl)).text();
      await navigator.clipboard.writeText(text);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("idle");
    }
  };
  const prompt = encodeURIComponent(
    `Read ${siteUrl}${markdownUrl} so I can ask questions about it.`,
  );
  return (
    <div className="flex shrink-0 items-center">
      <Button
        variant="outline"
        size="sm"
        loading={state === "loading"}
        onClick={copy}
        className="rounded-e-none"
      >
        <Icon icon={state === "copied" ? Tick02Icon : Copy01Icon} data-icon="inline-start" />
        {state === "copied" ? "Copied" : "Copy page"}
      </Button>
      <Menu.Root>
        <Menu.Trigger
          render={
            <Button
              variant="outline"
              size="sm"
              iconOnly
              aria-label="More ways to copy or open this page"
              className="-ms-px rounded-s-none"
            />
          }
        >
          <Icon icon={ArrowDown01Icon} />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="end" sideOffset={4} className="z-50">
            <Menu.Popup className="w-60 rounded-md border border-border-neutral-primary bg-background-menu p-1 shadow-lg outline-none">
              <Menu.Item className={item} onClick={copy}>
                <Icon icon={Copy01Icon} />
                Copy page as Markdown
              </Menu.Item>
              <Menu.LinkItem className={item} href={markdownUrl}>
                <Icon icon={File01Icon} />
                View as Markdown
              </Menu.LinkItem>
              <Menu.LinkItem
                className={item}
                href={`https://chatgpt.com/?q=${prompt}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={ChatGptIcon} />
                Open in ChatGPT
                <Icon icon={ArrowUpRight01Icon} className="ms-auto  rtl:-scale-x-100" />
                <span className="sr-only">(opens in a new tab)</span>
              </Menu.LinkItem>
              <Menu.LinkItem
                className={item}
                href={`https://claude.ai/new?q=${prompt}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={SparklesIcon} />
                Open in Claude
                <Icon icon={ArrowUpRight01Icon} className="ms-auto  rtl:-scale-x-100" />
                <span className="sr-only">(opens in a new tab)</span>
              </Menu.LinkItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Page copied as Markdown" : ""}
      </span>
    </div>
  );
}
