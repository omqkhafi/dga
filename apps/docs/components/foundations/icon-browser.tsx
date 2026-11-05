"use client";

import { Search01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useT } from "@/lib/locale-context";

type IconEntry = { name: string; icon: IconSvgElement };
const PAGE = 120;

/** Searchable grid of the Hugeicons free set (stroke rounded). Loaded on demand. */
export function IconBrowser() {
  const t = useT();
  const [icons, setIcons] = useState<IconEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [copied, setCopied] = useState<string | null>(null);
  const deferred = useDeferredValue(query);

  useEffect(() => {
    let alive = true;
    import("@hugeicons/core-free-icons").then((mod) => {
      const seen = new Set<unknown>();
      const list: IconEntry[] = [];
      for (const [name, icon] of Object.entries(mod)) {
        // The package also exports aliases (e.g. AArrowDown); keep one canonical *Icon name each.
        if (!name.endsWith("Icon") || seen.has(icon)) continue;
        seen.add(icon);
        list.push({ name, icon: icon as IconSvgElement });
      }
      list.sort((a, b) => a.name.localeCompare(b.name));
      if (alive) setIcons(list);
    });
    return () => {
      alive = false;
    };
  }, []);

  const results = useMemo(() => {
    if (!icons) return [];
    const q = deferred.trim().toLowerCase().replace(/\s+/g, "");
    return q ? icons.filter((i) => i.name.toLowerCase().includes(q)) : icons;
  }, [icons, deferred]);

  const copy = async (name: string) => {
    await navigator.clipboard?.writeText(`import { ${name} } from "@hugeicons/core-free-icons";`);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <label className="flex items-center gap-2 rounded-sm border border-input bg-background px-3 py-2">
        <HugeiconsIcon
          icon={Search01Icon}
          size={18}
          className="text-muted-foreground"
          aria-hidden
        />
        <span className="sr-only">{t("icons.searchLabel")}</span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(PAGE);
          }}
          placeholder={t("icons.placeholder")}
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </label>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {icons ? t("icons.count", { count: results.length }) : t("icons.loading")}
      </p>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
        {results.slice(0, limit).map(({ name, icon }) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => copy(name)}
              title={name}
              className="flex w-full flex-col items-center gap-2 rounded-sm border border-border bg-card p-3 text-icon-default hover:border-primary hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
            >
              <HugeiconsIcon
                icon={copied === name ? Tick02Icon : icon}
                size={24}
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="w-full truncate text-center text-xs text-muted-foreground">
                {name.replace(/Icon$/, "")}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {results.length > limit && (
        <button
          type="button"
          onClick={() => setLimit((n) => n + PAGE * 2)}
          className="inline-flex items-center justify-center gap-2 self-center rounded-sm border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
        >
          {t("icons.more", { count: results.length - limit })}
        </button>
      )}
    </div>
  );
}
