// Descriptions the TypeScript types cannot carry: cva variant props have no JSDoc, and a few
// inherited Base UI props are worth listing. Keyed `slug.Component.prop` or `slug.prop`.
// Anything with a JSDoc comment in the component source wins over these.

export type ApiNote = { description?: string; type?: string; include?: boolean };

const iconOnly = "Square, icon only. Needs an `aria-label`.";
const render = "Render as another element, for example a Next.js `Link` or an `<a>`. From Base UI.";

export const API_NOTES: Record<string, ApiNote> = {
  // Button
  "button.variant": {
    description:
      "Style. `neutral` is Figma's Primary-Neutral, `secondary` is Secondary-Solid and `outline` is Secondary-Outline.",
  },
  "button.size": { description: "Height: `sm` 24px, `md` 32px, `lg` 40px." },
  "button.destructive": {
    description:
      "Destructive version of the style. `neutral` has none in Figma and falls back to destructive `primary`.",
  },
  "button.onColor": {
    description: "For buttons on brand fills (`background-primary`, the nav header).",
  },
  "button.iconOnly": { description: iconOnly },
  "button.render": { include: true, type: "ReactElement | function", description: render },
  // Spinner
  "spinner.variant": {
    description: "Colour. `current` takes the text colour of its parent, for use inside buttons.",
  },
  "spinner.size": {
    description: "Diameter in the Figma sizes, from `2xs` (20px) to `2xl` (44px).",
  },
  // Featured Icon
  "featured-icon.variant": { description: "Colour family." },
  "featured-icon.size": { description: "Container size: `sm` 32px up to `xl` 56px." },
  "featured-icon.circle": { description: "Round container instead of square." },
  "featured-icon.appearance": {
    description: "`light` is a tinted container, `hard` a solid one and `outlined` a ring.",
  },
  // Divider
  "divider.variant": {
    description: "Colour. `alpha-white` and `white` are for dividers on brand fills.",
  },
  "divider.orientation": {
    include: true,
    type: '"horizontal" | "vertical"',
    description: "Direction of the line. From Base UI.",
  },
  // Avatar
  "avatar.size": { description: "Size in pixels." },
  "avatar.square": { description: "Square with rounded corners instead of a circle." },
  "avatar.bordered": { description: "Adds a ring around the avatar." },
  // Badge
  "badge.variant": {
    description: "Colour family. `on-color` is for badges on brand fills.",
  },
  "badge.size": { description: "Height: `sm` 20px, `md` 24px, `lg` 32px." },
  "badge.iconOnly": { description: iconOnly },
  "badge.outlined": { description: "Outlined instead of filled." },
  "badge.rounded": { description: "Fully rounded (pill) corners." },
  // Link
  "link.variant": { description: "Colour. `on-color` is for links on brand fills." },
  "link.size": { description: "Text size: `sm` 14px, `md` 16px." },
  "link.inline": {
    description: "Always underlined, for links inside running text (WCAG 1.4.1).",
  },
  "link.href": { include: true, type: "string", description: "Destination." },
  "link.render": { include: true, type: "ReactElement | function", description: render },
  // Tag and Status Tag
  "tag.variant": { description: "Colour family. `on-color` is for tags on brand fills." },
  "tag.size": { description: "Height: `xs` 20px, `sm` 24px, `md` 32px." },
  "tag.iconOnly": { description: iconOnly },
  "tag.outlined": { description: "Outlined instead of filled." },
  "tag.rounded": { description: "Fully rounded (pill) corners." },
  "tag.StatusTag.appearance": {
    description: "`subtle` is a tinted fill, `inverted` a solid one and `ghost` has no fill.",
  },
  // Skeleton
  "skeleton.shape": { description: "Shape of the placeholder." },
  "skeleton.size": { description: "Figma size. Omit it and size the skeleton with `className`." },
};
