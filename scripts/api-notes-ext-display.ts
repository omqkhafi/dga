// English notes the types cannot carry, for the Phase 7 part 2 display work stream (cva props
// and a few inherited props). Keyed `slug.Component.prop` or `slug.prop`.
import type { ApiNote } from "./api-notes";

const render = "Render as another element, for example `ul`, `li` or an `<a>`. From Base UI.";

export const API_NOTES_EXT_DISPLAY: Record<string, ApiNote> = {
  // Item
  "item.variant": {
    description: "`default` has no fill, `outline` a 1px border and `muted` a gray fill.",
  },
  "item.size": { description: "`default` has 16px padding, `sm` is more compact." },
  "item.render": { include: true, type: "ReactElement | function", description: render },
  "item.ItemGroup.render": { include: true, type: "ReactElement | function", description: render },
  "item.ItemMedia.variant": {
    description:
      "`default` is any content, `icon` a 40px framed icon and `image` a cropped 40px picture.",
  },
  // Empty
  "empty.EmptyMedia.variant": {
    description:
      "`default` shows the icon or picture as it is; `icon` puts an icon on a round fill.",
  },
  // Chart
  "chart.ChartTooltipContent.indicator": {
    description: "How a series is marked in the tooltip: a `dot`, a `line` or a `dashed` line.",
  },
};
