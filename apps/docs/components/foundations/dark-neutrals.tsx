import { getT, type Key } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { tokens } from "@/lib/tokens";
import { ContrastBadge } from "./contrast";

const DARK_ROLE_KEYS = new Set(["950", "900", "850", "800", "700", "400", "300", "200", "50"]);

const channel = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
function luminance(hex: string) {
  const n = (i: number) => channel(Number.parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * n(1) + 0.7152 * n(3) + 0.0722 * n(5);
}
function ratio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return Math.floor(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/** The tinted dark neutral ramp with the role each step plays. */
export function DarkNeutrals({ lang = "en" }: { lang?: Locale }) {
  const t = getT(lang);
  const steps = tokens.primitives.filter((p) => p.palette === "neutral-dark");
  const surface = steps.find((s) => s.name.endsWith("-900"))?.value ?? "#000000";
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-md border border-border-neutral-secondary">
      <table className="w-full min-w-[32rem] text-sm">
        <thead className="bg-background-neutral-100 text-[0.8125rem] text-text-primary-paragraph">
          <tr>
            <th scope="col" className="px-3 py-2 text-start font-semibold">
              {t("dark.step")}
            </th>
            <th scope="col" className="px-3 py-2 text-start font-semibold">
              {t("dark.colour")}
            </th>
            <th scope="col" className="px-3 py-2 text-start font-semibold">
              {t("dark.role")}
            </th>
            <th scope="col" className="px-3 py-2 text-start font-semibold">
              {t("dark.onSurface")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-neutral-secondary">
          {[...steps].reverse().map((s) => {
            const step = s.name.replace("colors-neutral-dark-", "");
            return (
              <tr key={s.name}>
                <th
                  scope="row"
                  className="px-3 py-1.5 text-start font-mono text-[0.8125rem] font-normal"
                >
                  {step}
                </th>
                <td className="px-3 py-1.5">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="size-6 rounded-xs border border-border-neutral-primary"
                      style={{ backgroundColor: s.value }}
                    />
                    <span className="flex flex-col">
                      <code className="font-mono text-[0.8125rem] uppercase">{s.value}</code>
                      <code dir="ltr" className="font-mono text-xs text-muted-foreground">
                        {s.oklch}
                      </code>
                    </span>
                  </span>
                </td>
                <td className="px-3 py-1.5 text-[0.8125rem] text-text-primary-paragraph">
                  {DARK_ROLE_KEYS.has(step) ? t(`dark.role.${step}` as Key) : ""}
                </td>
                <td className="px-3 py-1.5">
                  {Number(step) <= 400 ? (
                    <ContrastBadge
                      ratio={ratio(s.value, surface)}
                      label={`${s.value} on ${surface}`}
                    />
                  ) : (
                    <span className="text-[0.8125rem] tabular-nums text-text-secondary-paragraph">
                      {ratio(s.value, surface).toFixed(2)}:1
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
