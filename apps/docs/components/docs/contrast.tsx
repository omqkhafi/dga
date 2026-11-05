import { ContrastBadge } from "@/components/foundations/contrast";
import { getT } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { tokens } from "@/lib/tokens";

type Check = (typeof tokens.componentAudit)[number];

/** Lowest ratio per variant × state and mode: one row each, light and dark side by side. */
export function contrastRows(component: string) {
  const rows = new Map<string, { state: string; light?: Check; dark?: Check }>();
  for (const c of tokens.componentAudit.filter((c) => c.component === component)) {
    const row = rows.get(c.state) ?? { state: c.state };
    const mode = c.mode as "light" | "dark";
    const current = row[mode];
    if (!current || c.ratio / c.min < current.ratio / current.min) row[mode] = c;
    rows.set(c.state, row);
  }
  return [...rows.values()];
}

/**
 * One compact table of every audited state of a component: variant × state, ratio in light
 * and dark, pass or fail. Collapsed by default; the full report is on /docs/contrast.
 */
export function ComponentContrast({
  component,
  lang = "en",
}: {
  component: string;
  lang?: Locale;
}) {
  const t = getT(lang);
  const checks = tokens.componentAudit.filter((c) => c.component === component);
  const failing = checks.filter((c) => c.ratio < c.min).length;
  if (checks.length === 0) {
    return <p>{t("contrast.decorative")}</p>;
  }
  const rows = contrastRows(component);
  return (
    <div className="not-prose my-4">
      <details className="group rounded-md border border-border-neutral-secondary bg-background-card">
        <summary className="flex min-h-11 cursor-pointer items-center gap-2 px-3 text-sm font-medium text-text-default hover:bg-button-background-neutral-default">
          <span className="min-w-0 flex-1">
            {t("contrast.pairs", { count: checks.length.toLocaleString("en") })} ·{" "}
            {failing === 0 ? t("contrast.allPass") : t("contrast.failing", { count: failing })}
          </span>
          <span className="text-[0.8125rem] text-text-secondary-paragraph group-open:hidden">
            {t("contrast.show", { count: rows.length })}
          </span>
          <span className="hidden text-[0.8125rem] text-text-secondary-paragraph group-open:inline">
            {t("contrast.hide")}
          </span>
        </summary>
        <div className="max-h-[32rem] overflow-auto border-t border-border-neutral-secondary">
          <table className="w-full min-w-[28rem] text-sm">
            <thead className="sticky top-0 bg-background-neutral-100 text-[0.8125rem] text-text-primary-paragraph">
              <tr>
                <th scope="col" className="px-3 py-2 text-start font-semibold">
                  {t("contrast.variantState")}
                </th>
                <th scope="col" className="px-3 py-2 text-start font-semibold">
                  {t("contrast.light")}
                </th>
                <th scope="col" className="px-3 py-2 text-start font-semibold">
                  {t("contrast.dark")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-neutral-secondary">
              {rows.map((row) => (
                <tr key={row.state}>
                  <th
                    scope="row"
                    className="px-3 py-1.5 text-start text-[0.8125rem] font-normal text-text-default"
                  >
                    <span dir="ltr" className="inline-block">
                      {row.state}
                    </span>
                  </th>
                  {(["light", "dark"] as const).map((mode) => {
                    const c = row[mode];
                    return (
                      <td key={mode} className="px-3 py-1.5">
                        {c ? (
                          <ContrastBadge
                            ratio={c.ratio}
                            min={c.min}
                            label={`${c.fg} on ${c.bg}${c.on ? ` over ${c.on}` : ""}`}
                          />
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
      </details>
      <p className="mt-2 text-[0.8125rem] text-text-secondary-paragraph">
        {t("contrast.note")}{" "}
        <a href={`/${lang}/docs/contrast#${component}`}>{t("contrast.report")}</a>
      </p>
    </div>
  );
}
