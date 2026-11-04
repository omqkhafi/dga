import { type Deviation, deviations } from "@/lib/tokens";

/** The Deviations entries that belong to one component. */
export function ComponentDeviations({ component }: { component: string }) {
  const rows = (deviations as Deviation[]).filter(
    (d) => "component" in d && d.component === component,
  );
  if (rows.length === 0) return <p>None. This component matches the DGA Figma file.</p>;
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted text-xs text-muted-foreground">
          <tr>
            {["Item", "DGA original", "Ours", "Reason"].map((c) => (
              <th key={c} scope="col" className="px-3 py-2 text-start font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((d, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: items repeat per mode
            <tr key={`${d.item}-${i}`}>
              <td className="px-3 py-2 align-top text-xs font-medium break-words">{d.item}</td>
              <td className="px-3 py-2 align-top text-xs text-muted-foreground">{d.original}</td>
              <td className="px-3 py-2 align-top text-xs">{d.ours}</td>
              <td className="px-3 py-2 align-top text-xs text-text-primary-paragraph">
                {d.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
