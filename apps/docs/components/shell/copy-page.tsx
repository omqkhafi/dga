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
import { useT } from "@/lib/locale-context";
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
  const t = useT();
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
  const prompt = encodeURIComponent(t("copy.prompt", { url: `${siteUrl}${markdownUrl}` }));
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
        {state === "copied" ? t("copy.copied") : t("copy.page")}
      </Button>
      <Menu.Root>
        <Menu.Trigger
          render={
            <Button
              variant="outline"
              size="sm"
              iconOnly
              aria-label={t("copy.more")}
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
                {t("copy.markdown")}
              </Menu.Item>
              <Menu.LinkItem className={item} href={markdownUrl}>
                <Icon icon={File01Icon} />
                {t("copy.view")}
              </Menu.LinkItem>
              <Menu.LinkItem
                className={item}
                href={`https://chatgpt.com/?q=${prompt}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={ChatGptIcon} />
                {t("copy.chatgpt")}
                <Icon icon={ArrowUpRight01Icon} className="ms-auto  rtl:-scale-x-100" />
                <span className="sr-only">{t("newTab")}</span>
              </Menu.LinkItem>
              <Menu.LinkItem
                className={item}
                href={`https://claude.ai/new?q=${prompt}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={SparklesIcon} />
                {t("copy.claude")}
                <Icon icon={ArrowUpRight01Icon} className="ms-auto  rtl:-scale-x-100" />
                <span className="sr-only">{t("newTab")}</span>
              </Menu.LinkItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? t("copy.done") : ""}
      </span>
    </div>
  );
}
