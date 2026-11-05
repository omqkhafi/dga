"use client";

import { Tabs } from "@base-ui/react/tabs";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { type ReactNode, useEffect, useState } from "react";
import { Icon } from "@/components/shell/icon";
import { useT } from "@/lib/locale-context";
import { Button } from "@/registry/bases/base/ui/button";

const MANAGERS = ["bun", "npm", "pnpm", "yarn"] as const;
type Manager = (typeof MANAGERS)[number];
const KEY = "dga-package-manager";
const EVENT = "dga-package-manager";

/** The shadcn CLI runner for each package manager. */
export const RUNNERS: Record<Manager, string> = {
  bun: "bunx --bun shadcn@latest",
  npm: "npx shadcn@latest",
  pnpm: "pnpm dlx shadcn@latest",
  yarn: "yarn dlx shadcn@latest",
};

/** Remembers the package manager across every install block on the site. */
function useManager() {
  const [manager, setManager] = useState<Manager>("bun");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (MANAGERS.includes(saved as Manager)) setManager(saved as Manager);
    } catch {}
    const onChange = (event: Event) => setManager((event as CustomEvent<Manager>).detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  const choose = (next: Manager) => {
    setManager(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  };
  return [manager, choose] as const;
}

function CommandLine({ command }: { command: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex min-h-12 items-center gap-2 ps-4 pe-2">
      <code
        dir="ltr"
        className="min-w-0 flex-1 overflow-x-auto font-mono text-[0.8125rem] whitespace-nowrap text-text-default"
        style={{ unicodeBidi: "isolate" }}
      >
        <span aria-hidden className="me-2 text-text-secondary-paragraph select-none">
          $
        </span>
        {command}
      </code>
      <Button
        variant="subtle"
        size="sm"
        iconOnly
        aria-label={copied ? t("command.copied") : t("command.copy")}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {}
        }}
      >
        <Icon icon={copied ? Tick02Icon : Copy01Icon} />
      </Button>
    </div>
  );
}

const tab =
  "relative min-h-10 px-3 text-[0.8125rem] font-medium text-text-secondary-paragraph transition-colors hover:bg-button-background-neutral-default hover:text-text-default active:bg-button-background-neutral-pressed data-active:text-text-default data-active:shadow-[inset_0_-2px_0_var(--border-primary)]";

/**
 * Install block: the CLI with bun, npm, pnpm and yarn tabs, or Manual (dependencies and the
 * source to copy, rendered on the server and passed in as `manual`).
 */
export function InstallTabs({
  item,
  manual,
}: {
  /** Registry item name, for example `button`. */
  item: string;
  manual: ReactNode;
}) {
  const t = useT();
  const [manager, choose] = useManager();
  const [mode, setMode] = useState<"cli" | "manual">("cli");
  return (
    <div className="not-prose my-4 overflow-hidden rounded-md border border-border-neutral-secondary bg-background-neutral-50">
      <Tabs.Root value={mode} onValueChange={(v) => setMode(v as "cli" | "manual")}>
        <div className="flex items-center border-b border-border-neutral-secondary bg-background-white">
          <Tabs.List aria-label={t("install.method")} className="flex">
            <Tabs.Tab value="cli" className={tab}>
              {t("install.cli")}
            </Tabs.Tab>
            <Tabs.Tab value="manual" className={tab}>
              {t("install.manual")}
            </Tabs.Tab>
          </Tabs.List>
          {mode === "cli" ? (
            <Tabs.Root
              value={manager}
              onValueChange={(v) => choose(v as Manager)}
              className="ms-auto"
            >
              <Tabs.List aria-label={t("install.manager")} className="flex">
                {MANAGERS.map((m) => (
                  <Tabs.Tab key={m} value={m} className={tab}>
                    {m}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.Root>
          ) : null}
        </div>
        <Tabs.Panel value="cli">
          <CommandLine command={`${RUNNERS[manager]} add @dga/${item}`} />
        </Tabs.Panel>
        <Tabs.Panel value="manual" className="p-4">
          {manual}
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  );
}
