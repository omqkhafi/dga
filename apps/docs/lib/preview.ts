export const VIEWPORTS = {
  mobile: { label: "Mobile", width: 375 },
  tablet: { label: "Tablet", width: 768 },
  desktop: { label: "Desktop", width: 1280 },
} as const;

export type Viewport = keyof typeof VIEWPORTS;
export type Direction = "ltr" | "rtl";
/**
 * The language of the sample content inside a preview. It follows the preview's direction
 * toggle (see `contentLang`), not the docs page: everything outside the frame keeps the page
 * language.
 */
export type Lang = "en" | "ar";
export type Theme = "light" | "dark";

/**
 * The one rule for preview content: RTL renders the Arabic sample content and LTR the English
 * one, on /en and /ar pages alike. The default direction is still the page's, so the default
 * view of every preview is in the page language.
 */
export function contentLang(dir: Direction): Lang {
  return dir === "rtl" ? "ar" : "en";
}

/** The URL of a preview frame. The content language is derived from `dir`, never passed in. */
export function previewSrc(name: string, dir: Direction, theme: Theme, reload = 0): string {
  const query = `dir=${dir}&theme=${theme}&lang=${contentLang(dir)}`;
  return `/preview/${name}?${query}${reload > 0 ? `&r=${reload}` : ""}`;
}

export type PreviewMessage =
  | { type: "dga-preview:set"; dir: Direction; theme: Theme; lang?: Lang }
  | { type: "dga-preview:height"; height: number };

export function isPreviewMessage(data: unknown): data is PreviewMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    typeof data.type === "string" &&
    data.type.startsWith("dga-preview:")
  );
}

/** Sets direction, content language and theme on a document root. Used inside the preview iframe. */
export function applyPreviewState(root: HTMLElement, dir: Direction, theme: Theme, lang?: Lang) {
  root.dir = dir;
  root.lang = lang ?? contentLang(dir);
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}
