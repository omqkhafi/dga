"use client";

import {
  ArrowDown01Icon,
  ArrowUpRight01Icon,
  ChatGptIcon,
  ClaudeIcon,
  CodeXmlIcon,
  CommandLineIcon,
  Copy01Icon,
  Cursor01Icon,
  File01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { useT } from "@/lib/locale-context";
import { siteUrl } from "@/lib/shared";
import { Button } from "@/registry/bases/base/ui/button";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/bases/base/ui/menu";
import { Icon } from "./icon";

/** One "Open in …" link: the label key, the icon, and where it goes. App schemes stay in this window. */
function assistantLinks(prompt: string) {
  const link = (base: string, key: string) => `${base}?${new URLSearchParams({ [key]: prompt })}`;
  return [
    {
      key: "copy.chatgpt",
      icon: ChatGptIcon,
      href: link("https://chatgpt.com/", "q"),
      external: true,
    },
    { key: "copy.codex", icon: CodeXmlIcon, href: link("codex://new", "prompt"), external: false },
    {
      key: "copy.claude",
      icon: ClaudeIcon,
      href: link("https://claude.ai/new", "q"),
      external: true,
    },
    {
      key: "copy.claudeCode",
      icon: CommandLineIcon,
      href: link("claude-cli://open", "q"),
      external: false,
    },
    {
      key: "copy.cursor",
      icon: Cursor01Icon,
      href: link("https://cursor.com/link/prompt", "text"),
      external: true,
    },
  ] as const;
}

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
  const assistants = assistantLinks(t("copy.prompt", { url: `${siteUrl}${markdownUrl}` }));
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
      <Menu>
        <MenuTrigger
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
        </MenuTrigger>
        <MenuContent align="end" className="w-60">
          <MenuItem onClick={copy}>
            <Icon icon={Copy01Icon} />
            {t("copy.markdown")}
          </MenuItem>
          <MenuItem render={<a href={markdownUrl} />} nativeButton={false}>
            <Icon icon={File01Icon} />
            {t("copy.view")}
          </MenuItem>
          {assistants.map((assistant) => (
            <MenuItem
              key={assistant.key}
              render={
                <a
                  href={assistant.href}
                  {...(assistant.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                />
              }
              nativeButton={false}
            >
              <Icon icon={assistant.icon} />
              {t(assistant.key)}
              {assistant.external ? (
                <>
                  <Icon icon={ArrowUpRight01Icon} className="ms-auto rtl:-scale-x-100" />
                  <span className="sr-only">{t("newTab")}</span>
                </>
              ) : null}
            </MenuItem>
          ))}
        </MenuContent>
      </Menu>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? t("copy.done") : ""}
      </span>
    </div>
  );
}
