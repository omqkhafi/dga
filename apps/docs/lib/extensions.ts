import type { Locale } from "./i18n";

type Bilingual = Record<Locale, string>;

export type ExtensionEntry = {
  slug: string;
  title: Bilingual;
  /** The Base UI primitive (code, English in both languages). */
  builtOn: string;
  /** The DGA components its look follows. */
  from: Bilingual;
  /** The main DGA tokens it uses (code). */
  tokens: string[];
};

/**
 * Every Platform Code extension (components DGA does not define), for the Extensions page. The
 * order is the sidebar order. Kept in step with `EXTENSION_COMPONENTS` in `nav.ts`.
 */
export const EXTENSIONS: ExtensionEntry[] = [];

/**
 * Components added in Phase 7 that DGA does define. They follow the DGA specification and are not
 * extensions: the Slider and the Digital Stamp (the official site strip).
 */
export const DGA_DEFINED: { slug: string; title: Bilingual; source: Bilingual }[] = [];
