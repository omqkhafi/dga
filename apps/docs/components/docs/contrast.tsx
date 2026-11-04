import { ContrastBadge } from "@/components/foundations/contrast";
import { tokens } from "@/lib/tokens";

type Check = (typeof tokens.componentAudit)[number];

/**
 * Every audited colour pair for a component, grouped by variant. Each row shows the lowest
 * ratio across the surfaces the variant can sit on, in light and dark mode.
 */
export function ComponentContrast({ component }: { component: string }) {
  const checks = tokens.componentAudit.filter((c) => c.component === component);
  const rows = new Map<string, { fg: string; bg: string; light?: Check; dark?: Check }>();

  for (const c of checks) {
    const key = c.state;
    const row = rows.get(key) ?? { fg: c.fg, bg: c.bg };
    const mode = c.mode as "light" | "dark";
    const current = row[mode];
    if (!current || c.ratio / c.min < current.ratio / current.min) row[mode] = c;
    rows.set(key, row);
  }
  const groups = new Map<
    string,
    [string, typeof rows extends Map<string, infer R> ? R : never][]
  >();
  for (const [state, row] of rows) {
    const group = state.split(" / ")[0] ?? state;
    groups.set(group, [...(groups.get(group) ?? []), [state, row]]);
  }
  const failing = checks.filter((c) => c.ratio < c.min).length;
  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <p className="text-sm text-text-primary-paragraph">
        {checks.length} pairs checked against WCAG 2.1 AA (text 4.5:1, icons and focus rings 3:1),{" "}
        {failing === 0 ? "all passing" : `${failing} failing`}. Disabled states are exempt.
      </p>
      {[...groups].map(([group, entries]) => (
        <details key={group} className="rounded-md border border-border bg-card">
          <summary className="cursor-pointer px-3 py-2 text-sm font-medium text-foreground">
            {group}
          </summary>
          <div className="overflow-x-auto border-t border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-xs text-muted-foreground">
                <tr>
                  <th scope="col" className="px-3 py-2 text-start font-semibold">
                    State
                  </th>
                  <th scope="col" className="px-3 py-2 text-start font-semibold">
                    Foreground on background
                  </th>
                  <th scope="col" className="px-3 py-2 text-start font-semibold">
                    Light
                  </th>
                  <th scope="col" className="px-3 py-2 text-start font-semibold">
                    Dark
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {entries.map(([state, row]) => (
                  <tr key={state}>
                    <td className="px-3 py-2 align-top text-xs">{state.split(" / ")[1]}</td>
                    <td className="px-3 py-2 align-top font-mono text-xs break-all">
                      {row.fg} / {row.bg}
                    </td>
                    {(["light", "dark"] as const).map((mode) => (
                      <td key={mode} className="px-3 py-2 align-top">
                        {row[mode] ? (
                          <ContrastBadge
                            ratio={row[mode].ratio}
                            min={row[mode].min}
                            label={`${row[mode].fg} on ${row[mode].bg}${row[mode].on ? ` over ${row[mode].on}` : ""}`}
                          />
                        ) : (
                          "—"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ))}
    </div>
  );
}
