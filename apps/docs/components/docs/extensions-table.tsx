import { getT } from "@/lib/dictionary";
import { DGA_DEFINED, EXTENSIONS } from "@/lib/extensions";
import type { Locale } from "@/lib/i18n";

/** Every extension and how its look is derived, then the Phase 7 components DGA does define. */
export function ExtensionsTable({ lang = "en" }: { lang?: Locale }) {
  const t = getT(lang);
  const th = "px-3 py-2 text-start font-semibold";
  const base = `/${lang}/docs/components`;
  return (
    <div className="not-prose my-6 flex flex-col gap-8">
      <div className="overflow-x-auto rounded-md border border-border-neutral-secondary">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="bg-background-neutral-100 text-[0.8125rem] text-text-primary-paragraph">
            <tr>
              <th scope="col" className={th}>
                {t("ext.table.component")}
              </th>
              <th scope="col" className={th}>
                {t("ext.table.builtOn")}
              </th>
              <th scope="col" className={th}>
                {t("ext.table.derived")}
              </th>
              <th scope="col" className={th}>
                {t("ext.table.tokens")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-neutral-secondary">
            {EXTENSIONS.map((e) => (
              <tr key={e.slug}>
                <th scope="row" className="px-3 py-2 text-start align-top font-semibold">
                  <a className="underline underline-offset-4" href={`${base}/${e.slug}`}>
                    {e.title[lang]}
                  </a>
                </th>
                <td className="px-3 py-2 align-top">
                  <code dir="ltr">{e.builtOn}</code>
                </td>
                <td className="px-3 py-2 align-top">{e.from[lang]}</td>
                <td className="px-3 py-2 align-top">
                  <span className="flex flex-wrap gap-1">
                    {e.tokens.map((token) => (
                      <code key={token} dir="ltr" className="text-[0.8125rem]">
                        {token}
                      </code>
                    ))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {DGA_DEFINED.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-border-neutral-secondary">
          <table className="w-full min-w-[32rem] text-sm">
            <thead className="bg-background-neutral-100 text-[0.8125rem] text-text-primary-paragraph">
              <tr>
                <th scope="col" className={th}>
                  {t("ext.table.component")}
                </th>
                <th scope="col" className={th}>
                  {t("ext.table.source")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-neutral-secondary">
              {DGA_DEFINED.map((e) => (
                <tr key={e.slug}>
                  <th scope="row" className="px-3 py-2 text-start font-semibold">
                    <a className="underline underline-offset-4" href={`${base}/${e.slug}`}>
                      {e.title[lang]}
                    </a>
                  </th>
                  <td className="px-3 py-2">{e.source[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
