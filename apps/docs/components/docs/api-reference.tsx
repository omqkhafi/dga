import { getT } from "@/lib/dictionary";
import api from "@/lib/generated/api.json";
import type { Locale } from "@/lib/i18n";
import type { Api } from "../../../../scripts/api-types";
import { PropsTable } from "./props-table";

/**
 * One props table per part, generated from the TypeScript types (`bun run api`). Add
 * `<ApiReference component="button" />` under the "API Reference" heading.
 */
export function ApiReference({ component, lang = "en" }: { component: string; lang?: Locale }) {
  const t = getT(lang);
  const parts = (api as Api)[component];
  if (!parts) throw new Error(`No API data for ${component}. Run \`bun run api\`.`);
  const text = (en: string, ar: string) => (lang === "ar" ? ar : en);
  return (
    <div className="not-prose">
      {parts.map((part) => (
        <section key={part.name} className="mb-4 last:mb-0">
          <h3
            id={`api-${part.name.toLowerCase()}`}
            className="mt-4 text-lg font-semibold text-text-default"
          >
            {part.name}
          </h3>
          {part.description ? (
            <p className="mt-1 text-sm text-text-primary-paragraph">
              {text(part.description, part.descriptionAr)}
            </p>
          ) : null}
          {part.props.length > 0 ? (
            <PropsTable
              caption={t("props.caption", { part: part.name })}
              props={part.props.map((prop) => ({
                ...prop,
                description: text(prop.description, prop.descriptionAr),
              }))}
            />
          ) : null}
          <p className="text-[0.8125rem] text-text-secondary-paragraph">
            {part.inherits ? (
              <>
                {t("props.alsoBase")}{" "}
                <a
                  className="underline underline-offset-4 hover:text-text-default"
                  href={part.inherits.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Base UI {part.inherits.name}
                  <span className="sr-only"> {t("newTab")}</span>
                </a>
                .
              </>
            ) : (
              t("props.alsoElement")
            )}
          </p>
        </section>
      ))}
    </div>
  );
}
