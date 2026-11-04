"use client";

import { cn } from "cn";
import { useMemo, useState } from "react";
import { type Deviation, deviations } from "@/lib/tokens";

const AREAS = [...new Set(deviations.map((d) => d.area))];

function Status({ status }: { status?: string | null }) {
  if (!status || status === "fixed") return null;
  return (
    <span
      className={cn(
        "rounded-xs px-1.5 py-0.5 text-xs font-medium",
        status === "unresolved" ? "bg-error-50 text-error" : "bg-warning-50 text-warning",
      )}
    >
      {status}
    </span>
  );
}

export function DeviationsTable() {
  const [area, setArea] = useState<string>("All");
  const rows = useMemo(
    () => (deviations as Deviation[]).filter((d) => area === "All" || d.area === area),
    [area],
  );
  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <div className="flex flex-wrap gap-1" role="toolbar" aria-label="Filter by area">
        {["All", ...AREAS].map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={area === a}
            onClick={() => setArea(a)}
            className={cn(
              "rounded-sm border border-border px-2 py-1 text-xs font-medium",
              area === a
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-accent",
            )}
          >
            {a}
            {a !== "All" && ` (${deviations.filter((d) => d.area === a).length})`}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full border-collapse text-sm">
          <thead className="hidden bg-muted lg:table-header-group">
            <tr>
              {["Token / component", "DGA original", "Ours", "Reason"].map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="px-3 py-2 text-start text-xs font-semibold text-muted-foreground"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((d, i) => (
              <tr
                // biome-ignore lint/suspicious/noArrayIndexKey: items can repeat per mode
                key={`${d.item}-${i}`}
                className="flex flex-col gap-2 px-3 py-3 lg:table-row lg:px-0 lg:py-0"
              >
                <td className="align-top lg:w-1/4 lg:px-3 lg:py-2">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="rounded-xs bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                      {d.area}
                    </span>
                    <Status status={"status" in d ? d.status : null} />
                  </div>
                  <code className="mt-1 block font-mono text-xs break-words text-foreground">
                    {d.item}
                  </code>
                </td>
                <td className="align-top lg:px-3 lg:py-2">
                  <span className="me-2 text-xs font-medium text-muted-foreground lg:hidden">
                    DGA original:
                  </span>
                  <span className="text-xs break-words text-muted-foreground">{d.original}</span>
                </td>
                <td className="align-top lg:px-3 lg:py-2">
                  <span className="me-2 text-xs font-medium text-muted-foreground lg:hidden">
                    Ours:
                  </span>
                  <span className="text-xs break-words text-foreground">{d.ours}</span>
                </td>
                <td className="align-top text-sm text-primary-paragraph lg:w-1/3 lg:px-3 lg:py-2">
                  {d.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
