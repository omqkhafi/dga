import { getT } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { Callout } from "./callout";

/**
 * The note at the top of every extension page: DGA does not define the component, what it is built
 * on and which DGA components and tokens its look comes from. `from` and `primitive` are written in
 * the page language; token names are code and stay in English.
 */
export function ExtensionNote({
  name,
  primitive,
  from,
  tokens = [],
  lang = "en",
}: {
  name: string;
  primitive: string;
  from: string;
  tokens?: string[];
  lang?: Locale;
}) {
  const t = getT(lang);
  return (
    <Callout type="info" title={t("ext.noteTitle")}>
      <p>{t("ext.note", { name, primitive, from })}</p>
      {tokens.length > 0 ? (
        <p>
          {t("ext.tokens")}{" "}
          {tokens.map((token, i) => (
            <span key={token}>
              {i > 0 ? " " : null}
              <code dir="ltr">{token}</code>
            </span>
          ))}
        </p>
      ) : null}
    </Callout>
  );
}
