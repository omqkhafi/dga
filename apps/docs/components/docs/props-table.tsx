"use client";

import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { cn } from "cn";
import { Fragment, useId, useState } from "react";
import { Icon } from "@/components/shell/icon";
import { useT } from "@/lib/locale-context";
import type { ApiProp } from "../../../../scripts/api-types";

/**
 * Props of one component part. Each row is a disclosure: click it, or focus the prop name and
 * press Enter or Space, to show the full type, default and description. The first line of the
 * description is always visible under the type.
 */
export function PropsTable({ props, caption }: { props: ApiProp[]; caption: string }) {
  const t = useT();
  const id = useId();
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (name: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(name)) next.add(name);
      return next;
    });

  return (
    <div className="not-prose relative my-4 overflow-x-auto rounded-md border border-border-neutral-secondary bg-background-card">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-background-neutral-100 text-start text-[0.8125rem] text-text-primary-paragraph">
          <tr>
            <th scope="col" className="w-1/4 px-3 py-2 text-start font-semibold">
              {t("props.prop")}
            </th>
            <th scope="col" className="px-3 py-2 text-start font-semibold">
              {t("props.type")}
            </th>
            <th scope="col" className="w-1/5 px-3 py-2 text-start font-semibold">
              {t("props.default")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-neutral-secondary">
          {props.map((prop) => {
            const expanded = open.has(prop.name);
            const rowId = `${id}-${prop.name}`;
            return (
              <Fragment key={prop.name}>
                <tr
                  onClick={() => toggle(prop.name)}
                  className="cursor-pointer align-top hover:bg-button-background-neutral-default active:bg-button-background-neutral-pressed"
                >
                  <th scope="row" className="px-3 py-1.5 text-start font-normal">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`${rowId}-details`}
                      onClick={(event) => {
                        // The row handler toggles; do not toggle twice.
                        event.stopPropagation();
                        toggle(prop.name);
                      }}
                      className="group flex min-h-7 items-center gap-1.5 rounded-xs text-start font-mono text-[0.8125rem] font-semibold text-text-default"
                    >
                      <Icon
                        icon={ArrowDown01Icon}
                        className=" shrink-0 text-icon-default-500 transition-transform group-aria-expanded:rotate-180"
                      />
                      {prop.name}
                      {prop.required ? (
                        <span className="text-text-error" title={t("props.required")}>
                          *
                        </span>
                      ) : null}
                    </button>
                  </th>
                  <td className="px-3 py-1.5">
                    <code
                      title={prop.type}
                      dir="ltr"
                      className={cn(
                        "block font-mono text-[0.8125rem] text-text-primary-paragraph",
                        !expanded && "max-w-[34ch] truncate",
                      )}
                    >
                      {prop.type}
                    </code>
                    {prop.description && !expanded ? (
                      <p className="mt-0.5 line-clamp-1 text-[0.8125rem] text-text-secondary-paragraph">
                        {prop.description}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-3 py-1.5">
                    {prop.default ? (
                      <code
                        dir="ltr"
                        className="font-mono text-[0.8125rem] text-text-primary-paragraph"
                      >
                        {prop.default}
                      </code>
                    ) : (
                      <span className="text-text-secondary-paragraph">
                        <span aria-hidden>–</span>
                        <span className="sr-only">{t("props.noDefault")}</span>
                      </span>
                    )}
                  </td>
                </tr>
                <tr id={`${rowId}-details`} hidden={!expanded} className="bg-background-neutral-50">
                  <td colSpan={3} className="px-3 py-3 ps-8">
                    <dl className="grid gap-x-4 gap-y-1.5 text-[0.8125rem] sm:grid-cols-[6rem_1fr]">
                      <dt className="font-semibold text-text-primary-paragraph">
                        {t("props.type")}
                      </dt>
                      <dd dir="ltr" className="font-mono break-words text-text-primary-paragraph">
                        {prop.type}
                      </dd>
                      <dt className="font-semibold text-text-primary-paragraph">
                        {t("props.default")}
                      </dt>
                      <dd dir="ltr" className="font-mono text-text-primary-paragraph">
                        {prop.default ?? t("props.none")}
                        {prop.required ? ` ${t("props.requiredNote")}` : ""}
                      </dd>
                      {prop.description ? (
                        <>
                          <dt className="font-semibold text-text-primary-paragraph">
                            {t("props.description")}
                          </dt>
                          <dd className="text-text-primary-paragraph">{prop.description}</dd>
                        </>
                      ) : null}
                    </dl>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
