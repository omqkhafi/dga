"use client";

import { Copy01Icon, File01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";

/** Copies the page as Markdown (from /docs/<slug>.md), for pasting into an AI assistant. */
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
  return (
    <div className="flex shrink-0 items-center gap-1">
      <Button variant="outline" size="sm" loading={state === "loading"} onClick={copy}>
        <HugeiconsIcon
          icon={state === "copied" ? Tick02Icon : Copy01Icon}
          data-icon="inline-start"
        />
        {state === "copied" ? "Copied" : "Copy page"}
      </Button>
      <Button
        variant="subtle"
        size="sm"
        iconOnly
        nativeButton={false}
        aria-label="View as Markdown"
        render={<a href={markdownUrl} />}
      >
        <HugeiconsIcon icon={File01Icon} />
      </Button>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Page copied as Markdown" : ""}
      </span>
    </div>
  );
}
