// Pure data, so client components (the sidebar) can use it without loading the page source.

/**
 * Platform Code extensions (Phase 7): components DGA does not define. Each page and sidebar entry
 * carries an "Extension" badge, and each one is listed on the Extensions page.
 */
export const EXTENSION_OVERLAY_COMPONENTS = [
  "popover",
  "hover-card",
  "alert-dialog",
  "context-menu",
];
export const EXTENSION_INPUT_COMPONENTS = [
  "toggle",
  "toggle-group",
  "combobox",
  "command",
  "input-otp",
  "input-group",
  "button-group",
];
export const EXTENSION_COMPONENTS = [
  ...EXTENSION_OVERLAY_COMPONENTS,
  ...EXTENSION_INPUT_COMPONENTS,
];

/** True for a docs URL or slug of an extension component, such as `/ar/docs/components/popover`. */
export function isExtensionPath(pathOrSlug: string) {
  const slug = pathOrSlug.split("/").filter(Boolean).at(-1) ?? "";
  return pathOrSlug.includes("/components/") && EXTENSION_COMPONENTS.includes(slug);
}
