"use client";

import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "cn";
import { useMemo, useState } from "react";
import type { SemanticToken } from "@/lib/tokens";
import { ContrastBadge, Swatch } from "./contrast";

const CATEGORIES = ["Text", "Background", "Border", "Icon", "Link", "Alpha", "Component"] as const;
type Category = (typeof CATEGORIES)[number];

function ModeCell({ token, mode }: { token: SemanticToken; mode: "light" | "dark" }) {
  const value = token[mode];
  const contrast = token.contrast[mode];
  const fill = token.fill[mode];
  return (
    <div className="flex min-w-0 items-start gap-2">
      <Swatch color={value.value} className="mt-0.5 size-8" />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="font-mono text-xs text-foreground uppercase">{value.value}</span>
        {value.ref && (
          <span
            className="truncate font-mono text-xs text-muted-foreground"
            title={`--${value.ref}`}
          >
            {value.ref}
          </span>
        )}
        {contrast && (
          <ContrastBadge
            ratio={contrast.ratio}
            min={contrast.min}
            label={`Lowest ratio on --${contrast.bg}`}
          />
        )}
        {!contrast && fill && (
          <ContrastBadge ratio={fill.ratio} min={fill.min} label={`--${fill.fg} on this fill`} />
        )}
      </div>
    </div>
  );
}

export function SemanticTable({
  tokens,
  initialCategory = "Text",
}: {
  tokens: SemanticToken[];
  initialCategory?: Category | "All";
}) {
  const [category, setCategory] = useState<Category | "All">(initialCategory);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tokens.filter(
      (t) =>
        (category === "All" || t.category === category) &&
        (!q ||
          t.name.includes(q) ||
          t.aliases.some((a) => a.includes(q)) ||
          (t.figmaName ?? "").toLowerCase().includes(q)),
    );
  }, [tokens, category, query]);

  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1" role="toolbar" aria-label="Token category">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-sm border border-border px-2 py-1 text-xs font-medium",
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-sm border border-input bg-background px-2 py-1 sm:w-64">
          <HugeiconsIcon
            icon={Search01Icon}
            size={16}
            className="text-muted-foreground"
            aria-hidden
          />
          <span className="sr-only">Search tokens</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tokens or utilities"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>
      <p className="text-xs text-muted-foreground">
        {rows.length} of {tokens.length} tokens
      </p>
      <div className="overflow-hidden rounded-md border border-border">
        <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 border-b border-border bg-muted px-3 py-2 text-xs font-semibold text-muted-foreground md:grid">
          <span>Token and utilities</span>
          <span>Light</span>
          <span>Dark</span>
        </div>
        <ul className="divide-y divide-border">
          {rows.map((t) => (
            <li
              key={t.name}
              className="grid gap-3 px-3 py-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-4"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <code className="truncate text-sm font-semibold text-foreground">--{t.name}</code>
                {t.figmaName && (
                  <span className="truncate text-xs text-muted-foreground">{t.figmaName}</span>
                )}
                <div className="flex flex-wrap gap-1">
                  {t.aliases.map((a) => (
                    <code key={a} className="rounded-xs bg-primary-50 px-1 text-xs text-primary">
                      {a}
                    </code>
                  ))}
                  {t.fixed && (
                    <a
                      href="/docs/deviations"
                      className="rounded-xs bg-warning-50 px-1 text-xs font-medium text-warning"
                    >
                      changed
                    </a>
                  )}
                  {t.source !== "figma" && (
                    <span className="rounded-xs bg-muted px-1 text-xs text-muted-foreground">
                      {t.source === "css" ? "site CSS only" : "DGA UI"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground md:hidden">Light</span>
                <ModeCell token={t} mode="light" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground md:hidden">Dark</span>
                <ModeCell token={t} mode="dark" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
