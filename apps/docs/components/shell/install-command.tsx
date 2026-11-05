"use client";

import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";
import { Icon } from "./icon";

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      dir="ltr"
      className="flex h-10 min-w-0 items-center gap-2 rounded-sm border border-border-neutral-secondary bg-background-white ps-3 pe-1"
    >
      <span aria-hidden className="font-mono text-sm text-text-secondary-paragraph">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-start font-mono text-sm text-text-default">
        {command}
      </code>
      <Button
        variant="subtle"
        size="sm"
        iconOnly
        aria-label={copied ? "Copied" : "Copy command"}
        onClick={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        <Icon icon={copied ? Tick02Icon : Copy01Icon} />
      </Button>
    </div>
  );
}
