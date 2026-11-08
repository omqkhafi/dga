import { getT } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { tokens } from "@/lib/tokens";
import { ContrastBadge, Swatch } from "./contrast";

const { white, black } = tokens.swatchText;

function label(palette: string, t: ReturnType<typeof getT>) {
  const each = (name: string) => name.replace(/^(.)/, (c) => c.toUpperCase());
  if (palette === "primary-sa-flag") return t("pal.primary");
  if (palette === "secondary-gold") return t("pal.gold");
  if (palette === "tertiary-lavender") return t("pal.lavender");
  if (palette === "neutral") return t("pal.neutral");
  if (palette === "neutral-dark") return t("pal.neutralDark");
  if (/^base-(white|black)$/.test(palette)) return t("pal.base");
  const status = /^(green|red|yellow|blue)$/.exec(palette);
  if (status) return t("pal.status", { name: each(status[1] as string) });
  if (/^alpha-alpha-600-primary$|^primary-sa-flag-500-alpha$/.test(palette))
    return t("pal.alphaPrimary");
  const alpha = /^alpha-alpha-(\w+)$/.exec(palette);
  if (alpha) return t("pal.alpha", { name: alpha[1] as string });
  return t("pal.extended", { name: palette });
}

export function PrimitivePalettes({
  filter,
  lang = "en",
}: {
  filter?: "brand" | "status" | "alpha" | "extended";
  lang?: Locale;
}) {
  const t = getT(lang);
  const groups = new Map<string, typeof tokens.primitives>();
  for (const p of tokens.primitives) {
    const name = label(p.palette, t);
    const kind = /^(alpha-alpha|primary-sa-flag-500-alpha)/.test(p.palette)
      ? "alpha"
      : /^(green|red|yellow|blue)$/.test(p.palette)
        ? "status"
        : label(p.palette, t) === t("pal.extended", { name: p.palette })
          ? "extended"
          : "brand";
    if (filter && kind !== filter) continue;
    groups.set(name, [...(groups.get(name) ?? []), p]);
  }
  return (
    <div className="not-prose my-6 flex flex-col gap-8">
      {[...groups].map(([name, swatches]) => (
        <section key={name} className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-foreground">{name}</h4>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {swatches.map((s) => {
              const useWhite = s.onWhite >= s.onBlack;
              return (
                <li
                  key={s.name}
                  className="flex flex-col overflow-hidden rounded-sm border border-border bg-card"
                >
                  <div
                    className="flex h-16 items-end justify-end p-2 text-xs font-semibold"
                    style={{
                      backgroundColor: s.value,
                      color: useWhite ? white.value : black.value,
                    }}
                  >
                    Aa
                  </div>
                  <div className="flex flex-col gap-1 p-2">
                    <code
                      className="truncate text-xs font-semibold text-foreground"
                      title={`--${s.name}`}
                    >
                      {s.utility}
                    </code>
                    <span className="font-mono text-xs text-muted-foreground uppercase">
                      {s.value}
                    </span>
                    <span dir="ltr" className="font-mono text-xs break-all text-muted-foreground">
                      {s.oklch}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      <ContrastBadge
                        ratio={s.onWhite}
                        label={`White (${white.value}, ${white.token}) text on this colour`}
                      />
                      <ContrastBadge
                        ratio={s.onBlack}
                        label={`Black (${black.value}, ${black.token}) text on this colour`}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <p className="text-xs text-muted-foreground">
        {t("pal.note", {
          whiteToken: white.token,
          white: white.value,
          blackToken: black.token,
          black: black.value,
        })}
      </p>
    </div>
  );
}

export function Swatches({ colors }: { colors: string[] }) {
  return (
    <span className="inline-flex gap-1">
      {colors.map((c) => (
        <Swatch key={c} color={c} className="size-4" />
      ))}
    </span>
  );
}
