import { getT } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { type Deviation, deviations } from "@/lib/tokens";

const MAX_GROUPS = 4;

/**
 * The key Deviations for one component: rows that share a reason are grouped (a contrast fix
 * often touches many tokens), at most four groups, then a link to every deviation for the
 * component on the global Deviations page.
 */
export function ComponentDeviations({
  component,
  lang = "en",
}: {
  component: string;
  lang?: Locale;
}) {
  const t = getT(lang);
  const rows = (deviations as Deviation[]).filter(
    (d) => "component" in d && d.component === component,
  );
  if (rows.length === 0) return <p>{t("dev.none")}</p>;

  const groups = new Map<string, Deviation[]>();
  for (const row of rows) groups.set(row.reason, [...(groups.get(row.reason) ?? []), row]);
  const shown = [...groups.values()].slice(0, MAX_GROUPS);

  return (
    <div className="not-prose my-6 flex flex-col gap-3">
      <div className="overflow-x-auto rounded-md border border-border-neutral-secondary">
        <table className="w-full min-w-[32rem] text-sm">
          <thead className="bg-background-neutral-100 text-[0.8125rem] text-text-primary-paragraph">
            <tr>
              <th scope="col" className="px-3 py-2 text-start font-semibold">
                {t("dev.change")}
              </th>
              <th scope="col" className="px-3 py-2 text-start font-semibold">
                {t("dev.reason")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-neutral-secondary">
            {shown.map((group) => {
              const first = group[0] as Deviation;
              return (
                <tr key={first.reason}>
                  <td className="w-2/5 px-3 py-1.5 align-top">
                    <code
                      dir="ltr"
                      className="font-mono text-[0.8125rem] break-words text-text-default"
                    >
                      {first.item}
                    </code>
                    {group.length > 1 ? (
                      <span className="text-[0.8125rem] text-text-secondary-paragraph">
                        {" "}
                        {lang === "ar"
                          ? `و${group.length - 1} غيرها`
                          : `and ${group.length - 1} more`}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-1.5 align-top text-[0.8125rem] text-text-primary-paragraph">
                    <span className="line-clamp-2" dir="ltr" lang="en" title={first.reason}>
                      {first.reason}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        <a href={`/${lang}/docs/deviations#component-${component}`}>
          {t("dev.viewAll", { count: rows.length })}
        </a>
        {lang === "ar" ? (
          <span className="text-text-secondary-paragraph"> {t("dev.englishNote")}</span>
        ) : null}
      </p>
    </div>
  );
}
