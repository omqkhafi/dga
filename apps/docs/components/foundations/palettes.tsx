import { tokens } from "@/lib/tokens";
import { ContrastBadge, Swatch } from "./contrast";

const { white, black } = tokens.swatchText;

const LABELS: [RegExp, string][] = [
  [/^primary-sa-flag$/, "SA Flag green (primary)"],
  [/^secondary-gold$/, "Gold (secondary)"],
  [/^tertiary-lavender$/, "Lavender (tertiary)"],
  [/^neutral$/, "Neutral"],
  [/^neutral-dark$/, "Neutral, dark mode (DGA UI, green-tinted)"],
  [/^base-(white|black)$/, "Base"],
  [/^(green|red|yellow|blue)$/, "Status: $1"],
  [/^alpha-alpha-600-primary$|^primary-sa-flag-500-alpha$/, "Alpha: primary"],
  [/^alpha-alpha-(\w+)$/, "Alpha: $1"],
  [/^(.+)$/, "Extended (site CSS only): $1"],
];

function label(palette: string) {
  for (const [re, out] of LABELS) if (re.test(palette)) return palette.replace(re, out);
  return palette;
}

export function PrimitivePalettes({
  filter,
}: {
  filter?: "brand" | "status" | "alpha" | "extended";
}) {
  const groups = new Map<string, typeof tokens.primitives>();
  for (const p of tokens.primitives) {
    const name = label(p.palette);
    const kind = name.startsWith("Alpha")
      ? "alpha"
      : name.startsWith("Status")
        ? "status"
        : name.startsWith("Extended")
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
        Each swatch shows the contrast of white (<code>{white.token}</code>, {white.value}) and of
        black (<code>{black.token}</code>, {black.value}) text on it. Translucent swatches are
        measured over white.
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
