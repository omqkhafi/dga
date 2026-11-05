import { ContrastBadge } from "@/components/foundations/contrast";
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
export function ComponentContrast({ component }: { component: string }) {
  const checks = tokens.componentAudit.filter((c) => c.component === component);
  const failing = checks.filter((c) => c.ratio < c.min).length;
  if (checks.length === 0) {
    return (
      <p>
        No contrast pairs: this component is decorative. Content that carries meaning must not rely
        on it (WCAG 1.4.11 applies only to graphics needed to understand the content).
      </p>
    );
  }
  const rows = contrastRows(component);
  return (
    <div className="not-prose my-4">
      <details className="group rounded-md border border-border-neutral-secondary bg-background-card">
        <summary className="flex min-h-11 cursor-pointer items-center gap-2 px-3 text-sm font-medium text-text-default hover:bg-button-background-neutral-default">
          <span className="min-w-0 flex-1">
            {checks.length.toLocaleString("en")} pairs checked ·{" "}
            {failing === 0 ? "all pass WCAG 2.1 AA" : `${failing} failing`}
          </span>
          <span className="text-[0.8125rem] text-text-secondary-paragraph group-open:hidden">
            Show {rows.length} states
          </span>
          <span className="hidden text-[0.8125rem] text-text-secondary-paragraph group-open:inline">
            Hide
          </span>
        </summary>
        <div className="max-h-[32rem] overflow-auto border-t border-border-neutral-secondary">
          <table className="w-full min-w-[28rem] text-sm">
            <thead className="sticky top-0 bg-background-neutral-100 text-[0.8125rem] text-text-primary-paragraph">
              <tr>
                <th scope="col" className="px-3 py-2 text-start font-semibold">
                  Variant / state
                </th>
                <th scope="col" className="px-3 py-2 text-start font-semibold">
                  Light
                </th>
                <th scope="col" className="px-3 py-2 text-start font-semibold">
                  Dark
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
                    {row.state}
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
        Text needs 4.5:1, icons and focus rings 3:1. Disabled states are exempt.{" "}
        <a href={`/docs/contrast#${component}`}>Full contrast report</a>
      </p>
    </div>
  );
}
