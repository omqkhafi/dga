"use client";

import { cn } from "cn";
import { useEffect, useMemo, useState } from "react";
import { useT } from "@/lib/locale-context";
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
  const t = useT();
  const [area, setArea] = useState<string>("All");
  // `#component-button` (linked from each component page) filters to one component.
  const [component, setComponent] = useState<string | null>(null);
  useEffect(() => {
    const fromHash = () => {
      const match = /^#component-(.+)$/.exec(window.location.hash);
      setComponent(match?.[1] ?? null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);
  const rows = useMemo(
    () =>
      (deviations as Deviation[]).filter(
        (d) =>
          (area === "All" || d.area === area) &&
          (component === null || ("component" in d && d.component === component)),
      ),
    [area, component],
  );
  return (
    <div
      id={component ? `component-${component}` : undefined}
      className="not-prose my-6 flex flex-col gap-3"
    >
      {component ? (
        <p className="flex flex-wrap items-center gap-2 rounded-md border border-border-neutral-secondary bg-background-primary-50 px-3 py-2 text-sm text-text-default">
          Showing {rows.length} deviations for{" "}
          <strong className="capitalize">{component.replace(/-/g, " ")}</strong>.
          <button
            type="button"
            onClick={() => {
              history.replaceState(null, "", window.location.pathname);
              setComponent(null);
            }}
            className="min-h-8 rounded-sm px-2 text-text-primary underline underline-offset-4 hover:bg-button-background-neutral-default"
          >
            {t("dev.showAll")}
          </button>
        </p>
      ) : null}
      <div className="flex flex-wrap gap-1" role="toolbar" aria-label={t("dev.filter")}>
        {["All", ...AREAS].map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={area === a}
            onClick={() => setArea(a)}
            className={cn(
              "min-h-8 rounded-sm border border-border px-2 py-1 text-[0.8125rem] font-medium",
              area === a
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-accent",
            )}
          >
            {a === "All" ? t("dev.all") : a}
            {a !== "All" && ` (${deviations.filter((d) => d.area === a).length})`}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full border-collapse text-sm">
          <thead className="hidden bg-muted lg:table-header-group">
            <tr>
              {[
                t("dev.col.item"),
                t("dev.col.original"),
                t("dev.col.ours"),
                t("dev.col.reason"),
              ].map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="px-3 py-2 text-start text-[0.8125rem] font-semibold text-muted-foreground"
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
                    <span className="rounded-xs bg-muted px-1.5 py-0.5 text-[0.8125rem] text-muted-foreground">
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
                    {t("dev.originalShort")}
                  </span>
                  <span
                    dir="ltr"
                    lang="en"
                    className="inline-block text-xs break-words text-muted-foreground"
                  >
                    {d.original}
                  </span>
                </td>
                <td className="align-top lg:px-3 lg:py-2">
                  <span className="me-2 text-xs font-medium text-muted-foreground lg:hidden">
                    {t("dev.oursShort")}
                  </span>
                  <span
                    dir="ltr"
                    lang="en"
                    className="inline-block text-xs break-words text-foreground"
                  >
                    {d.ours}
                  </span>
                </td>
                <td
                  dir="ltr"
                  lang="en"
                  className="align-top text-sm text-primary-paragraph lg:w-1/3 lg:px-3 lg:py-2"
                >
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
