import type { ReactNode } from "react";
import { getT } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { tokens } from "@/lib/tokens";
import { Swatch } from "./contrast";
import { SemanticTable } from "./semantic-table";

/** A table that becomes stacked cards below the md breakpoint. */
export function ResponsiveTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: { key: string; cells: ReactNode[] }[];
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-md border border-border">
      <table className="w-full border-collapse text-sm">
        <thead className="hidden bg-muted md:table-header-group">
          <tr>
            {columns.map((c) => (
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
          {rows.map((row) => (
            <tr
              key={row.key}
              className="flex flex-col gap-1 px-3 py-3 md:table-row md:px-0 md:py-0"
            >
              {row.cells.map((cell, i) => (
                <td key={columns[i]} className="align-top md:px-3 md:py-2">
                  <span className="me-2 text-xs font-medium text-muted-foreground md:hidden">
                    {columns[i]}:
                  </span>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Code = ({ children }: { children: ReactNode }) => (
  <code className="font-mono text-xs text-foreground">{children}</code>
);
const Muted = ({ children }: { children: ReactNode }) => (
  <span dir="ltr" className="inline-block font-mono text-xs text-muted-foreground">
    {children}
  </span>
);

export function SemanticColors({
  initialCategory,
}: {
  initialCategory?: "All" | "Text" | "Background";
}) {
  return <SemanticTable tokens={tokens.semantic} initialCategory={initialCategory} />;
}

export function ShadcnMapping({ lang = "en" }: { lang?: Locale } = {}) {
  const t = getT(lang);
  const byName = new Map(tokens.semantic.map((t) => [t.name, t]));
  return (
    <ResponsiveTable
      columns={[t("col.shadcnVar"), t("col.dgaToken"), t("col.light"), t("col.dark")]}
      rows={tokens.shadcn.map((s) => {
        const t = byName.get(s.token);
        return {
          key: s.name,
          cells: [
            <Code key="a">--{s.name}</Code>,
            <Muted key="b">--{s.token}</Muted>,
            t ? <Swatch key="c" color={t.light.value} className="size-5" /> : null,
            t ? <Swatch key="d" color={t.dark.value} className="size-5" /> : null,
          ],
        };
      })}
    />
  );
}

export function AliasTable({ lang = "en" }: { lang?: Locale } = {}) {
  const t = getT(lang);
  const rows = tokens.semantic.flatMap((t) =>
    t.aliases.map((alias) => ({
      key: alias,
      cells: [
        <Code key="a">{alias}</Code>,
        <Muted key="b">
          {alias.split("-")[0]}-{t.name}
        </Muted>,
        <Muted key="c">--{t.name}</Muted>,
      ],
    })),
  );
  return (
    <ResponsiveTable
      columns={[t("col.shortAlias"), t("col.figmaUtility"), t("col.token")]}
      rows={rows}
    />
  );
}

export function TypeScaleTable({ lang = "en" }: { lang?: Locale } = {}) {
  const t = getT(lang);
  return (
    <ResponsiveTable
      columns={[
        t("col.utility"),
        t("col.figmaStyle"),
        t("col.desktop"),
        t("col.tablet"),
        t("col.mobile"),
        t("col.letterSpacing"),
      ]}
      rows={tokens.typography.sizes.map((s) => ({
        key: s.key,
        cells: [
          <Code key="u">{s.utility}</Code>,
          <Muted key="f">{s.figma}</Muted>,
          <Muted key="d">
            {s.size.desktop} / {s.lineHeight.desktop}
          </Muted>,
          <Muted key="t">
            {s.size.tablet} / {s.lineHeight.tablet}
          </Muted>,
          <Muted key="m">
            {s.size.mobile} / {s.lineHeight.mobile}
          </Muted>,
          <Muted key="l">{s.letterSpacing}</Muted>,
        ],
      }))}
    />
  );
}

export function WeightTable({ lang = "en" }: { lang?: Locale } = {}) {
  const t = getT(lang);
  const utility: Record<string, string> = {
    "font-weight-regular": "font-regular (font-normal)",
    "font-weight-medium": "font-medium",
    "font-weight-semibold": "font-semibold",
    "font-weight-bold": "font-bold",
  };
  return (
    <ResponsiveTable
      columns={[t("col.token"), t("col.value"), t("col.utility")]}
      rows={tokens.typography.weights.map((w) => ({
        key: w.name,
        cells: [
          <Code key="t">--{w.name}</Code>,
          <Muted key="v">{w.value}</Muted>,
          <Muted key="u">{utility[w.name]}</Muted>,
        ],
      }))}
    />
  );
}

export function SpacingScale() {
  return (
    <div className="not-prose my-6 flex flex-col gap-1.5">
      {tokens.spacing.scale.map((s) => (
        <div
          key={s.name}
          className="grid grid-cols-[5.5rem_4rem_minmax(0,1fr)] items-center gap-3 text-xs"
        >
          <code className="font-mono text-foreground">p-{s.utility}</code>
          <span className="font-mono text-muted-foreground">{s.value}</span>
          <span
            className="block h-3 max-w-full rounded-xs bg-sa-flag-400"
            style={{ inlineSize: s.value }}
          />
        </div>
      ))}
    </div>
  );
}

export function SpacingTokens({
  kind,
  lang = "en",
}: {
  kind: "tshirt" | "semantic";
  lang?: Locale;
}) {
  const tr = getT(lang);
  const list = tokens.spacing.tokens.filter((t) =>
    kind === "tshirt" ? t.name.startsWith("spacing-") : !t.name.startsWith("spacing-"),
  );
  return (
    <ResponsiveTable
      columns={
        kind === "tshirt"
          ? [tr("col.token"), tr("col.sameAs"), tr("col.value")]
          : [tr("col.utility"), tr("col.desktop"), tr("col.tablet"), tr("col.mobile")]
      }
      rows={list.map((t) => ({
        key: t.name,
        cells:
          kind === "tshirt"
            ? [
                <Code key="n">--{t.name}</Code>,
                <Muted key="r">{t.ref?.replace("spacing-", "p-").replace("-5", ".5")}</Muted>,
                <Muted key="v">{t.values.desktop}</Muted>,
              ]
            : [
                <Code key="n">{t.utility}</Code>,
                <Muted key="d">{t.values.desktop}</Muted>,
                <Muted key="t">{t.values.tablet}</Muted>,
                <Muted key="m">{t.values.mobile}</Muted>,
              ],
      }))}
    />
  );
}

export function BreakpointTable({ lang = "en" }: { lang?: Locale } = {}) {
  const t = getT(lang);
  const modes: Record<string, string> = {
    md: t("bp.md"),
    lg: t("bp.lg"),
  };
  return (
    <ResponsiveTable
      columns={[t("col.prefix"), t("col.minWidth"), t("col.notes")]}
      rows={tokens.breakpoints.map((b) => ({
        key: b.name,
        cells: [
          <Code key="p">{b.name}:</Code>,
          <Muted key="w">
            {b.px}px ({b.rem})
          </Muted>,
          <span key="n" className="text-xs text-muted-foreground">
            {modes[b.name] ?? ""}
          </span>,
        ],
      }))}
    />
  );
}

export function GridTable({ lang = "en" }: { lang?: Locale } = {}) {
  const t = getT(lang);
  return (
    <ResponsiveTable
      columns={[
        t("col.figmaGrid"),
        t("col.columns"),
        t("col.gutter"),
        t("col.margin"),
        t("col.contentWidth"),
      ]}
      rows={tokens.grids.map((g) => ({
        key: g.name,
        cells: [
          <Code key="n">{g.name}</Code>,
          <Muted key="c">{g.columns}</Muted>,
          <Muted key="g">{g.gutter}px</Muted>,
          <Muted key="m">{g.margin}px</Muted>,
          <Muted key="w">{g.content ? `${g.content}px` : t("grid.fluid")}</Muted>,
        ],
      }))}
    />
  );
}

export function RadiusTable({ lang = "en" }: { lang?: Locale } = {}) {
  const t = getT(lang);
  return (
    <ResponsiveTable
      columns={[t("col.utility"), t("col.token"), t("col.value")]}
      rows={tokens.radius.map((r) => ({
        key: r.name,
        cells: [
          <Code key="u">
            {r.name === "card-radius" ? "rounded-card" : `rounded-${r.name.replace("radius-", "")}`}
          </Code>,
          <Muted key="t">--{r.name}</Muted>,
          <Muted key="v">{r.value}</Muted>,
        ],
      }))}
    />
  );
}

export function ShadowTable({ lang = "en" }: { lang?: Locale } = {}) {
  const t = getT(lang);
  return (
    <ResponsiveTable
      columns={[t("col.utility"), t("col.value")]}
      rows={[
        ...tokens.shadows.map((s) => ({
          key: s.name,
          cells: [<Code key="u">{s.name}</Code>, <Muted key="v">{s.value}</Muted>],
        })),
        ...tokens.blurs.map((b) => ({
          key: b.name,
          cells: [
            <Code key="u">{b.name.replace("backdrop-blur", "backdrop-blur")}</Code>,
            <Muted key="v">blur({b.value})</Muted>,
          ],
        })),
      ]}
    />
  );
}
