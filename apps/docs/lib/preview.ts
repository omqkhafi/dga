export const VIEWPORTS = {
  mobile: { label: "Mobile", width: 375 },
  tablet: { label: "Tablet", width: 768 },
  desktop: { label: "Desktop", width: 1280 },
} as const;

export type Viewport = keyof typeof VIEWPORTS;
export type Direction = "ltr" | "rtl";
/** The language of the sample content: always the language of the docs page. */
export type Lang = "en" | "ar";
export type Theme = "light" | "dark";

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

/** Sets direction and theme on a document root. Used inside the preview iframe. */
export function applyPreviewState(root: HTMLElement, dir: Direction, theme: Theme, lang?: Lang) {
  root.dir = dir;
  if (lang) root.lang = lang;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}
