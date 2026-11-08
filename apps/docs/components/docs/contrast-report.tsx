"use client";

import { cn } from "cn";
import { useEffect, useMemo, useState } from "react";
import { ContrastBadge } from "@/components/foundations/contrast";
import { useT } from "@/lib/locale-context";
import { tokens } from "@/lib/tokens";

type Check = (typeof tokens.componentAudit)[number];

const label = (component: string, chrome: string) =>
  component === "ui-chrome"
    ? chrome
    : component.replace(/(^|-)([a-z])/g, (_, s, c) => (s ? " " : "") + c.toUpperCase());

/** The pair's colours as hex and OKLCH (the audit runs on the hex source values). */
function ColourPair({ check }: { check: Check }) {
  const fg = tokens.auditColors[`${check.mode}:${check.fg}` as keyof typeof tokens.auditColors];
  const bg = tokens.auditColors[`${check.mode}:${check.bg}` as keyof typeof tokens.auditColors];
  if (!fg || !bg) return null;
  return (
    <span
      dir="ltr"
      className="flex flex-col font-mono text-xs break-all text-text-secondary-paragraph"
    >
      <span className="uppercase">
        {fg.hex} / {bg.hex}
      </span>
      <span>
        {fg.oklch} / {bg.oklch}
      </span>
    </span>
  );
}

/** Every audited pair, one component at a time, with the tokens behind each ratio. */
export function ContrastReport() {
  const t = useT();
  const components = useMemo(() => {
    const map = new Map<string, Check[]>();
    for (const c of tokens.componentAudit)
      map.set(c.component, [...(map.get(c.component) ?? []), c]);
    return [...map.entries()].sort(([a], [b]) =>
      a === "ui-chrome" ? 1 : b === "ui-chrome" ? -1 : a.localeCompare(b),
    );
  }, []);
  const [selected, setSelected] = useState(components[0]?.[0] ?? "");
  const [onlyFailing, setOnlyFailing] = useState(false);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (components.some(([name]) => name === id)) setSelected(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [components]);

  const checks = components.find(([name]) => name === selected)?.[1] ?? [];
  const rows = useMemo(() => {
    const map = new Map<
      string,
      { state: string; fg: string; bg: string; light?: Check; dark?: Check }
    >();
    for (const c of checks) {
      const row = map.get(c.state) ?? { state: c.state, fg: c.fg, bg: c.bg };
      const mode = c.mode as "light" | "dark";
      const current = row[mode];
      if (!current || c.ratio / c.min < current.ratio / current.min) row[mode] = c;
      map.set(c.state, row);
    }
    const all = [...map.values()];
    return onlyFailing
      ? all.filter((r) => [r.light, r.dark].some((c) => c && c.ratio < c.min))
      : all;
  }, [checks, onlyFailing]);
  const failing = checks.filter((c) => c.ratio < c.min).length;

  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <div role="toolbar" aria-label={t("contrast.component")} className="flex flex-wrap gap-1">
        {components.map(([name, list]) => (
          <button
            key={name}
            type="button"
            aria-pressed={selected === name}
            onClick={() => {
              setSelected(name);
              history.replaceState(null, "", `#${name}`);
            }}
            className={cn(
              "min-h-8 rounded-sm border border-border px-2.5 text-[0.8125rem] font-medium",
              selected === name
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-accent active:bg-button-background-neutral-pressed",
            )}
          >
            {label(name, t("contrast.chrome"))} <span className="opacity-80">({list.length})</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <p id={selected} className="text-text-primary-paragraph">
          {t("contrast.summary", {
            count: checks.length.toLocaleString("en"),
            status:
              failing === 0
                ? t("contrast.statusPass")
                : t("contrast.statusFail", { count: failing }),
          })}
        </p>
        <label className="flex min-h-8 cursor-pointer items-center gap-2 text-[0.8125rem] text-text-primary-paragraph">
          <input
            type="checkbox"
            checked={onlyFailing}
            onChange={(e) => setOnlyFailing(e.target.checked)}
          />
          {t("contrast.onlyFailing")}
        </label>
      </div>
      <div className="max-h-[40rem] overflow-auto rounded-md border border-border-neutral-secondary">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="sticky top-0 bg-background-neutral-100 text-[0.8125rem] text-text-primary-paragraph">
            <tr>
              {[
                t("contrast.variantState"),
                t("contrast.fgOnBg"),
                t("contrast.light"),
                t("contrast.dark"),
              ].map((h) => (
                <th key={h} scope="col" className="px-3 py-2 text-start font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-neutral-secondary">
            {rows.map((row) => (
              <tr key={row.state}>
                <th
                  scope="row"
                  className="px-3 py-1.5 text-start text-[0.8125rem] font-normal text-text-default"
                >
                  <span dir="ltr" lang="en" className="inline-block">
                    {row.state}
                  </span>
                </th>
                <td
                  dir="ltr"
                  className="px-3 py-1.5 text-start font-mono text-[0.8125rem] break-all text-text-primary-paragraph"
                >
                  {row.fg} / {row.bg}
                </td>
                {(["light", "dark"] as const).map((mode) => {
                  const c = row[mode];
                  return (
                    <td key={mode} className="px-3 py-1.5">
                      {c ? (
                        <div className="flex flex-col gap-1">
                          <ContrastBadge ratio={c.ratio} min={c.min} label={`${c.fg} on ${c.bg}`} />
                          <ColourPair check={c} />
                        </div>
                      ) : (
                        <span aria-hidden>–</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
