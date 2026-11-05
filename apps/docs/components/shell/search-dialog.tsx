"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Cancel01Icon, File01Icon, HashtagIcon } from "@hugeicons/core-free-icons";
import type { SharedProps } from "fumadocs-ui/contexts/search";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { Key } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/locale-context";
import type { SearchEntry } from "@/lib/search-index";
import { highlightPattern, normalize, queryTerms } from "@/lib/search-text";
import { Button } from "@/registry/bases/base/ui/button";
import { Icon } from "./icon";

const MAX_RESULTS = 8;
const SNIPPET = 120;

// The index for the active language is fetched once and kept in memory. It is prebuilt
// (app/search-index/[lang]), so results are a plain in-memory filter: well under 100 ms after
// typing. Each language has its own file, so results never mix languages.
const indexes = new Map<Locale, Promise<Prepared[]>>();
type Prepared = SearchEntry & { lower: string; titleLower: string; pageLower: string };

function loadIndex(lang: Locale) {
  let promise = indexes.get(lang);
  if (!promise) {
    promise = fetch(`/search-index/${lang}`)
      .then((r) => r.json() as Promise<SearchEntry[]>)
      .then((entries) =>
        entries.map((e) => ({
          ...e,
          lower: normalize(e.text),
          titleLower: normalize(e.title),
          pageLower: normalize(e.page),
        })),
      )
      .catch(() => {
        indexes.delete(lang);
        return [] as Prepared[];
      });
    indexes.set(lang, promise);
  }
  return promise;
}

type Hit = { entry: Prepared; score: number; snippet: string };
type Group = { page: string; pageUrl: string; crumb: string; hits: Hit[] };

/** A ≤120-character line around the first match, found in the original text so marks and spellings line up. */
function snippetFor(entry: Prepared, terms: string[]) {
  const text = entry.text;
  if (!text) return "";
  const at = Math.max(0, text.search(new RegExp(highlightPattern(terms).source, "i")));
  const start = Math.max(0, at - 30);
  const end = Math.min(text.length, start + SNIPPET);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
}

export function search(index: Prepared[], query: string): Group[] {
  const terms = queryTerms(query);
  if (terms.length === 0) return [];
  const hits: Hit[] = [];
  for (const entry of index) {
    let score = 0;
    let ok = true;
    for (const term of terms) {
      const inTitle = entry.titleLower.indexOf(term);
      const inText = entry.lower.indexOf(term);
      const inPage = entry.pageLower.includes(term);
      if (inTitle === -1 && inText === -1 && !inPage) {
        ok = false;
        break;
      }
      if (entry.titleLower === term) score += 100;
      else if (inTitle === 0) score += 60;
      else if (inTitle > 0) score += 40;
      if (inText !== -1) score += 10;
      if (inPage) score += 5;
    }
    if (!ok) continue;
    // Page entries rank above their own sections on ties.
    if (!entry.url.includes("#")) score += 3;
    hits.push({ entry, score, snippet: snippetFor(entry, terms) });
  }
  hits.sort((a, b) => b.score - a.score);
  const groups = new Map<string, Group>();
  for (const hit of hits.slice(0, MAX_RESULTS)) {
    const { page, pageUrl, crumb } = hit.entry;
    const group = groups.get(pageUrl) ?? { page, pageUrl, crumb, hits: [] };
    group.hits.push(hit);
    groups.set(pageUrl, group);
  }
  return [...groups.values()];
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  const pattern = highlightPattern(terms);
  return (
    <>
      {text.split(pattern).map((part, i) =>
        i % 2 === 1 ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: static split
          <mark key={i} className="rounded-xs bg-background-secondary-50 px-0.5 text-text-default">
            {part}
          </mark>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: static split
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

const SUGGESTED: [Key, string][] = [
  ["search.suggest.installation", "/docs/installation"],
  ["search.suggest.button", "/docs/components/button"],
  ["search.suggest.colors", "/docs/foundations/colors"],
  ["search.suggest.deviations", "/docs/deviations"],
];

/** ⌘K / Ctrl+K search: breadcrumb, title and one highlighted line per result, grouped by page. */
export default function SearchDialog({ open, onOpenChange }: SharedProps) {
  const router = useRouter();
  const { lang } = useLocale();
  const t = useT();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<Prepared[] | null>(null);
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  // Warm the index as soon as the browser is idle, so the first open is instant too.
  useEffect(() => {
    const warm = () => loadIndex(lang).then(setIndex);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm);
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 500);
    return () => clearTimeout(id);
  }, [lang]);
  useEffect(() => {
    if (open && !index) loadIndex(lang).then(setIndex);
    if (!open) setQuery("");
  }, [open, index, lang]);

  const terms = useMemo(() => queryTerms(query), [query]);
  const groups = useMemo(() => (index ? search(index, query) : []), [index, query]);
  const flat = useMemo(() => groups.flatMap((g) => g.hits), [groups]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset the selection when the query changes.
  useEffect(() => {
    setActive(0);
  }, [query]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll the selected result into view when the selection moves.
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (url: string) => {
    onOpenChange(false);
    router.push(url);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (flat.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + flat.length) % flat.length);
    } else if (event.key === "Enter") {
      const hit = flat[active];
      if (hit) {
        event.preventDefault();
        go(hit.entry.url);
      }
    }
  };

  let optionIndex = -1;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-alpha-black-50 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          className="fixed start-1/2 top-[8dvh] z-50 flex max-h-[80dvh] w-[min(40rem,calc(100vw-1.5rem))] -translate-x-1/2 flex-col overflow-hidden rounded-md border border-border-neutral-primary bg-background-menu shadow-xl transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0 rtl:translate-x-1/2"
          aria-label={t("search.dialog")}
        >
          <Dialog.Title className="sr-only">{t("search.button")}</Dialog.Title>
          <div className="flex items-center gap-2 border-b border-border-neutral-secondary ps-4 pe-2 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:-outline-offset-2 has-[input:focus-visible]:outline-border-black">
            <input
              // biome-ignore lint/a11y/noAutofocus: the dialog exists to type in this field
              autoFocus
              role="combobox"
              aria-expanded={flat.length > 0}
              aria-controls="search-results"
              aria-activedescendant={flat.length > 0 ? `search-option-${active}` : undefined}
              aria-autocomplete="list"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t("search.placeholder")}
              aria-label={t("search.placeholder")}
              className="h-12 min-w-0 flex-1 bg-transparent text-md text-text-default outline-none placeholder:text-text-secondary-paragraph [&::-webkit-search-cancel-button]:hidden"
            />
            <kbd
              dir="ltr"
              className="hidden rounded-xs border border-border-neutral-secondary px-1.5 text-xs text-text-secondary-paragraph sm:block"
            >
              Esc
            </kbd>
            <Dialog.Close
              render={<Button variant="subtle" iconOnly aria-label={t("search.closeAria")} />}
            >
              <Icon icon={Cancel01Icon} />
            </Dialog.Close>
          </div>
          <div
            ref={list}
            id="search-results"
            role="listbox"
            aria-label={t("search.results")}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
          >
            {terms.length === 0 ? (
              <div className="flex flex-col gap-1 p-2">
                <p className="px-2 pb-1 text-[0.8125rem] font-medium text-text-secondary-paragraph">
                  {t("search.suggested")}
                </p>
                {SUGGESTED.map(([name, url]) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => go(`/${lang}${url}`)}
                    className="flex min-h-10 items-center gap-2 rounded-sm px-2 text-start text-sm text-text-default hover:bg-button-background-neutral-default active:bg-button-background-neutral-pressed"
                  >
                    <Icon icon={File01Icon} />
                    {t(name)}
                  </button>
                ))}
              </div>
            ) : !index ? (
              <p className="p-6 text-center text-sm text-text-secondary-paragraph">
                {t("search.loading")}
              </p>
            ) : groups.length === 0 ? (
              <p className="p-6 text-center text-sm text-text-secondary-paragraph" role="status">
                {t("search.none", { query })}
              </p>
            ) : (
              groups.map((group) => (
                <div key={group.pageUrl} role="presentation" className="mb-1">
                  <p className="px-2 pt-2 pb-1 text-[0.8125rem] text-text-secondary-paragraph">
                    {group.crumb} <span aria-hidden>›</span>{" "}
                    <span className="font-medium text-text-primary-paragraph">{group.page}</span>
                  </p>
                  {group.hits.map((hit) => {
                    optionIndex++;
                    const i = optionIndex;
                    const selected = i === active;
                    const isPage = !hit.entry.url.includes("#");
                    return (
                      // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard selection is handled on the combobox input (aria-activedescendant)
                      <div
                        key={hit.entry.url}
                        id={`search-option-${i}`}
                        role="option"
                        aria-selected={selected}
                        tabIndex={-1}
                        onMouseMove={() => setActive(i)}
                        onClick={() => go(hit.entry.url)}
                        className="flex cursor-pointer gap-2 rounded-sm px-2 py-2 aria-selected:bg-background-primary-50"
                      >
                        <Icon
                          icon={isPage ? File01Icon : HashtagIcon}
                          className="mt-0.5  shrink-0 text-icon-default-500"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-text-default">
                            <Highlight text={hit.entry.title} terms={terms} />
                          </p>
                          {hit.snippet ? (
                            <p className="truncate text-[0.8125rem] text-text-primary-paragraph">
                              <Highlight text={hit.snippet} terms={terms} />
                            </p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
          <div className="hidden items-center gap-4 border-t border-border-neutral-secondary px-4 py-2 text-[0.8125rem] text-text-secondary-paragraph sm:flex">
            <span>
              <kbd className="font-sans">↑↓</kbd> {t("search.navigate")}
            </span>
            <span>
              <kbd className="font-sans">↵</kbd> {t("search.open")}
            </span>
            <span>
              <kbd className="font-sans">Esc</kbd> {t("search.close")}
            </span>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
