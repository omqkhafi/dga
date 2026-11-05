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
  // Field
  "field.Field.name": {
    include: true,
    type: "string",
    description: "Name of the control. Links it to the form value and to server-side errors.",
  },
  "field.Field.invalid": {
    include: true,
    type: "boolean",
    description:
      "Marks the control invalid from your own validation. Pair it with `match` on FieldError.",
  },
  "field.Field.disabled": {
    include: true,
    type: "boolean",
    description: "Disables the control and greys out its label and helper text.",
  },
  "field.FieldError.match": {
    include: true,
    type: 'boolean | "valueMissing" | "typeMismatch" | …',
    description:
      "When to show the message. `true` always shows it (use it with `invalid`), a validity key shows it for that failure, and leaving it out shows it whenever the control fails validation.",
  },
  // Input
  "input.size": { description: "Height: `md` 32px, `lg` 40px." },
  "input.appearance": {
    description: "Fill: `default` (white), `lighter` or `darker`. All three keep a visible border.",
  },
  "input.Input.type": {
    include: true,
    type: "string",
    description: "Input type: `text`, `email`, `tel`, `url`, `password` and so on.",
  },
  "input.Input.value": { include: true, type: "string | number", description: "Controlled value." },
  "input.Input.defaultValue": {
    include: true,
    type: "string | number",
    description: "Initial value when uncontrolled.",
  },
  "input.Input.onValueChange": {
    include: true,
    type: "(value: string, details) => void",
    description: "Called with the new text whenever it changes. From Base UI.",
  },
  "input.Input.placeholder": {
    include: true,
    type: "string",
    description: "Hint shown while empty.",
  },
  "input.Input.disabled": { include: true, type: "boolean", description: "Disables the field." },
  "input.Input.readOnly": {
    include: true,
    type: "boolean",
    description: "The text can be read and copied but not changed.",
  },
  "input.Input.required": {
    include: true,
    type: "boolean",
    description: "The form cannot be submitted while the field is empty.",
  },
  // Textarea
  "textarea.appearance": {
    description: "Fill: `default` (white), `lighter` or `darker`. All three keep a visible border.",
  },
  "textarea.resize": {
    description: "`vertical` lets the user drag the corner to change the height. `none` fixes it.",
  },
  "textarea.Textarea.rows": {
    include: true,
    type: "number",
    description: "Visible lines of text, which sets the starting height.",
  },
  "textarea.Textarea.value": { include: true, type: "string", description: "Controlled value." },
  "textarea.Textarea.defaultValue": {
    include: true,
    type: "string",
    description: "Initial value when uncontrolled.",
  },
  "textarea.Textarea.placeholder": {
    include: true,
    type: "string",
    description: "Hint shown while empty.",
  },
  "textarea.Textarea.disabled": {
    include: true,
    type: "boolean",
    description: "Disables the field.",
  },
  "textarea.Textarea.readOnly": {
    include: true,
    type: "boolean",
    description: "The text can be read and copied but not changed.",
  },
  "textarea.Textarea.required": {
    include: true,
    type: "boolean",
    description: "The form cannot be submitted while the field is empty.",
  },
  // Select
  "select.SelectTrigger.size": { description: "Height: `md` 32px, `lg` 40px." },
  "select.SelectTrigger.appearance": {
    description: "Fill: `default` (white), `lighter` or `darker`. All three keep a visible border.",
  },
  "select.Select.items": {
    include: true,
    type: "{ value, label }[] | Record<string, ReactNode>",
    description:
      "The options with their labels, so the trigger can show the label of the chosen value before the list opens.",
  },
  "select.Select.value": { include: true, type: "Value", description: "Controlled value." },
  "select.Select.defaultValue": {
    include: true,
    type: "Value",
    description: "Initial value when uncontrolled.",
  },
  "select.Select.onValueChange": {
    include: true,
    type: "(value: Value, details) => void",
    description: "Called when the user chooses an option. From Base UI.",
  },
  "select.Select.name": { include: true, type: "string", description: "Name for form submission." },
  "select.Select.required": {
    include: true,
    type: "boolean",
    description: "The form cannot be submitted without a choice.",
  },
  "select.Select.disabled": { include: true, type: "boolean", description: "Disables the select." },
  "select.Select.readOnly": {
    include: true,
    type: "boolean",
    description: "Shows the choice but does not open the list.",
  },
  "select.Select.multiple": {
    include: true,
    type: "boolean",
    description: "Lets the user choose several options. The value is then an array.",
  },
  "select.SelectValue.placeholder": {
    include: true,
    type: "ReactNode",
    description: "Shown while nothing is chosen.",
  },
  "select.SelectContent.side": {
    include: true,
    type: '"top" | "bottom" | "inline-start" | "inline-end"',
    description: "Which side of the trigger the list opens on. Default `bottom`.",
  },
  "select.SelectContent.align": {
    include: true,
    type: '"start" | "center" | "end"',
    description: "Alignment against the trigger. `start` is the right edge in RTL.",
  },
  "select.SelectContent.sideOffset": {
    include: true,
    type: "number",
    description: "Gap between the trigger and the list, in pixels. Default 4.",
  },
  "select.SelectContent.alignItemWithTrigger": {
    include: true,
    type: "boolean",
    description:
      "Overlaps the chosen option on the trigger, like a native select on macOS. Default `false`.",
  },
  "select.SelectItem.value": {
    include: true,
    type: "Value",
    description: "The value this option stands for.",
  },
  "select.SelectItem.disabled": {
    include: true,
    type: "boolean",
    description: "Disables the option.",
  },
  // Checkbox
  "checkbox.size": { description: "Box size: `md` 24px, `sm` 20px, `xs` 16px." },
  "checkbox.tone": { description: "`primary` (green) or `neutral` (black in light mode)." },
  "checkbox.Checkbox.checked": { include: true, type: "boolean", description: "Controlled state." },
  "checkbox.Checkbox.defaultChecked": {
    include: true,
    type: "boolean",
    description: "Initial state when uncontrolled.",
  },
  "checkbox.Checkbox.onCheckedChange": {
    include: true,
    type: "(checked: boolean, details) => void",
    description: "Called when the user toggles the box. From Base UI.",
  },
  "checkbox.Checkbox.indeterminate": {
    include: true,
    type: "boolean",
    description:
      "Shows a dash and reports `aria-checked=mixed`, for a parent whose children are partly chosen.",
  },
  "checkbox.Checkbox.disabled": {
    include: true,
    type: "boolean",
    description: "Disables the box.",
  },
  "checkbox.Checkbox.readOnly": {
    include: true,
    type: "boolean",
    description: "Shows the state but cannot be changed.",
  },
  "checkbox.Checkbox.required": {
    include: true,
    type: "boolean",
    description: "The form cannot be submitted until it is checked.",
  },
  "checkbox.Checkbox.name": {
    include: true,
    type: "string",
    description: "Name for form submission.",
  },
  "checkbox.Checkbox.value": {
    include: true,
    type: "string",
    description: "The value submitted when checked.",
  },
  // Radio
  "radio.Radio.tone": { description: "`primary` (green) or `neutral` (black in light mode)." },
  "radio.Radio.value": {
    include: true,
    type: "string",
    description: "The value of the group when this radio is chosen.",
  },
  "radio.Radio.disabled": { include: true, type: "boolean", description: "Disables this radio." },
  "radio.RadioGroup.value": { include: true, type: "string", description: "Controlled value." },
  "radio.RadioGroup.defaultValue": {
    include: true,
    type: "string",
    description: "Initial value when uncontrolled.",
  },
  "radio.RadioGroup.onValueChange": {
    include: true,
    type: "(value: string, details) => void",
    description: "Called when the user chooses a radio. From Base UI.",
  },
  "radio.RadioGroup.name": {
    include: true,
    type: "string",
    description: "Name for form submission.",
  },
  "radio.RadioGroup.disabled": {
    include: true,
    type: "boolean",
    description: "Disables every radio in the group.",
  },
  "radio.RadioGroup.readOnly": {
    include: true,
    type: "boolean",
    description: "Shows the choice but cannot be changed.",
  },
  "radio.RadioGroup.required": {
    include: true,
    type: "boolean",
    description: "The form cannot be submitted without a choice.",
  },
  // Switch
  "switch.Switch.checked": { include: true, type: "boolean", description: "Controlled state." },
  "switch.Switch.defaultChecked": {
    include: true,
    type: "boolean",
    description: "Initial state when uncontrolled.",
  },
  "switch.Switch.onCheckedChange": {
    include: true,
    type: "(checked: boolean, details) => void",
    description: "Called when the user flips the switch. From Base UI.",
  },
  "switch.Switch.disabled": { include: true, type: "boolean", description: "Disables the switch." },
  "switch.Switch.readOnly": {
    include: true,
    type: "boolean",
    description: "Shows the state but cannot be changed.",
  },
  "switch.Switch.required": {
    include: true,
    type: "boolean",
    description: "The form cannot be submitted until it is on.",
  },
  "switch.Switch.name": { include: true, type: "string", description: "Name for form submission." },
  // Number Input
  "number-input.size": { description: "Height: `md` 32px, `lg` 40px." },
  "number-input.appearance": {
    description: "Fill: `default` (white), `lighter` or `darker`. All three keep a visible border.",
  },
  "number-input.NumberInput.value": {
    include: true,
    type: "number | null",
    description: "Controlled value. `null` is an empty field.",
  },
  "number-input.NumberInput.defaultValue": {
    include: true,
    type: "number",
    description: "Initial value when uncontrolled.",
  },
  "number-input.NumberInput.onValueChange": {
    include: true,
    type: "(value: number | null, details) => void",
    description: "Called with the parsed number, always a Western-digit `number`. From Base UI.",
  },
  "number-input.NumberInput.min": { include: true, type: "number", description: "Smallest value." },
  "number-input.NumberInput.max": { include: true, type: "number", description: "Largest value." },
  "number-input.NumberInput.step": {
    include: true,
    type: "number",
    description: "How much the − and + buttons and the arrow keys change the value. Default 1.",
  },
  "number-input.NumberInput.locale": {
    include: true,
    type: "string",
    description:
      "Formatting locale. Defaults to `en-u-nu-latn`: Western digits on every page, including Arabic ones.",
  },
  "number-input.NumberInput.format": {
    include: true,
    type: "Intl.NumberFormatOptions",
    description: "Formatting options: currency, percent, units, decimals.",
  },
  "number-input.NumberInput.disabled": {
    include: true,
    type: "boolean",
    description: "Disables the field and its buttons.",
  },
  "number-input.NumberInput.readOnly": {
    include: true,
    type: "boolean",
    description: "The number can be read but not changed.",
  },
  "number-input.NumberInput.required": {
    include: true,
    type: "boolean",
    description: "The form cannot be submitted while the field is empty.",
  },
  "number-input.NumberInput.name": {
    include: true,
    type: "string",
    description: "Name for form submission.",
  },
  // Search Box
  "search-box.value": { include: true, type: "string", description: "Controlled text." },
  "search-box.defaultValue": {
    include: true,
    type: "string",
    description: "Initial text when uncontrolled.",
  },
  "search-box.placeholder": {
    include: true,
    type: "string",
    description: "Hint shown while empty.",
  },
  "search-box.disabled": { include: true, type: "boolean", description: "Disables the field." },
  "search-box.readOnly": {
    include: true,
    type: "boolean",
    description: "The text can be read but not changed. The clear button is hidden.",
  },
  // File Upload
  "file-upload.accept": {
    include: true,
    type: "string",
    description: "Accepted formats, as in the HTML `accept` attribute: `.pdf,image/*`.",
  },
  "file-upload.multiple": {
    include: true,
    type: "boolean",
    description: "Allows several files. Defaults to `true` unless `maxFiles` is 1.",
  },
  "file-upload.disabled": {
    include: true,
    type: "boolean",
    description: "Disables the drop zone.",
  },
  "file-upload.name": { include: true, type: "string", description: "Name for form submission." },
  "file-upload.required": {
    include: true,
    type: "boolean",
    description: "The form cannot be submitted without a file.",
  },

  // Dialog
  "dialog.size": {
    description: "Width: `sm` 400px, `md` 600px (DGA), `lg` 800px. All shrink to fit a phone.",
  },
  "dialog.Dialog.open": { include: true, type: "boolean", description: "Controlled open state." },
  "dialog.Dialog.defaultOpen": {
    include: true,
    type: "boolean",
    description: "Open at first (uncontrolled).",
  },
  "dialog.Dialog.onOpenChange": {
    include: true,
    type: "(open: boolean) => void",
    description: "Called when it opens or closes.",
  },
  "dialog.Dialog.disablePointerDismissal": {
    include: true,
    type: "boolean",
    description:
      "Stops a click outside from closing it. Use it for a decision that must be answered; Escape and the buttons still close it.",
  },
  "dialog.Dialog.modal": {
    include: true,
    type: 'boolean | "trap-focus"',
    description: "`true` (default) makes the page behind inert and locks its scroll.",
  },
  // Drawer
  "drawer.tone": { description: "Surface: `white` (background-menu) or `gray` (neutral-100)." },
  "drawer.Drawer.open": { include: true, type: "boolean", description: "Controlled open state." },
  "drawer.Drawer.defaultOpen": {
    include: true,
    type: "boolean",
    description: "Open at first (uncontrolled).",
  },
  "drawer.Drawer.onOpenChange": {
    include: true,
    type: "(open: boolean) => void",
    description: "Called when it opens or closes.",
  },
  // Tooltip
  "tooltip.tone": {
    description: "`light` is white (neutral-800 in dark mode); `dark` is the inverted tooltip.",
  },
  "tooltip.TooltipContent.align": {
    description:
      "Alignment along the trigger's edge. `start` is the right edge in RTL for top and bottom.",
  },
  "tooltip.TooltipContent.sideOffset": {
    description:
      "Gap between the trigger and the bubble in pixels. Default 10 (room for the beak).",
  },
  "tooltip.Tooltip.open": { include: true, type: "boolean", description: "Controlled open state." },
  "tooltip.Tooltip.defaultOpen": {
    include: true,
    type: "boolean",
    description: "Open at first (uncontrolled).",
  },
  "tooltip.Tooltip.disabled": {
    include: true,
    type: "boolean",
    description: "Never opens.",
  },
  "tooltip.TooltipProvider.delay": {
    include: true,
    type: "number",
    description: "Milliseconds to hover before a tooltip opens. Default 300.",
  },
  // Menu
  "menu.MenuContent.side": {
    description: "Which side of the trigger it opens on. Default `bottom`.",
  },
  "menu.MenuContent.align": {
    description: "Alignment with the trigger. `start` is the right edge in RTL.",
  },
  "menu.MenuContent.sideOffset": {
    description: "Gap between the trigger and the menu in pixels. Default 4.",
  },
  "menu.MenuContent.alignOffset": {
    description: "Shifts the menu along the trigger's edge, in pixels.",
  },
  "menu.Menu.open": { include: true, type: "boolean", description: "Controlled open state." },
  "menu.Menu.defaultOpen": {
    include: true,
    type: "boolean",
    description: "Open at first (uncontrolled).",
  },
  "menu.Menu.onOpenChange": {
    include: true,
    type: "(open: boolean) => void",
    description: "Called when it opens or closes.",
  },
  "menu.MenuItem.onClick": {
    include: true,
    type: "(event) => void",
    description: "Called when the item is chosen, with the mouse or the keyboard.",
  },
  "menu.MenuItem.disabled": {
    include: true,
    type: "boolean",
    description: "The item cannot be chosen. It stays in the arrow-key order so it can be found.",
  },
  "menu.MenuItem.closeOnClick": {
    include: true,
    type: "boolean",
    description: "Whether choosing it closes the menu. Default `true`.",
  },
  "menu.MenuCheckboxItem.checked": {
    include: true,
    type: "boolean",
    description: "Controlled on or off state.",
  },
  "menu.MenuCheckboxItem.onCheckedChange": {
    include: true,
    type: "(checked: boolean) => void",
    description: "Called when it is turned on or off.",
  },
  "menu.MenuRadioGroup.value": { include: true, type: "string", description: "The chosen value." },
  "menu.MenuRadioGroup.onValueChange": {
    include: true,
    type: "(value: string) => void",
    description: "Called with the newly chosen value.",
  },
  "menu.MenuRadioItem.value": {
    include: true,
    type: "string",
    description: "This option's value.",
  },
  // Tabs
  "tabs.size": { description: "Padding and text: `sm`, `md` or `lg`." },
  "tabs.divider": { description: "A 3px line under (or beside) the list. Default `true`." },
  "tabs.flush": { description: "No inline padding at the start of the list." },
  "tabs.Tabs.value": {
    include: true,
    type: "string | number",
    description: "The selected tab (controlled).",
  },
  "tabs.Tabs.defaultValue": {
    include: true,
    type: "string | number",
    description: "The tab selected at first (uncontrolled).",
  },
  "tabs.Tabs.onValueChange": {
    include: true,
    type: "(value) => void",
    description: "Called with the value of the tab that was selected.",
  },
  "tabs.Tabs.orientation": {
    include: true,
    type: '"horizontal" | "vertical"',
    description: "Direction of the list. Vertical tabs use Up and Down arrows.",
  },
  "tabs.TabsTrigger.value": {
    include: true,
    type: "string | number",
    description: "What identifies the tab. The panel with the same `value` is shown.",
  },
  "tabs.TabsTrigger.disabled": {
    include: true,
    type: "boolean",
    description: "The tab cannot be selected. It stays in the arrow-key order so it can be found.",
  },
  "tabs.TabsList.activateOnFocus": {
    include: true,
    type: "boolean",
    description:
      "A tab opens its panel as soon as the arrow keys focus it. Default `true`; set `false` to open it with Enter or Space.",
  },
  "tabs.TabsContent.value": {
    include: true,
    type: "string | number",
    description: "The `value` of the tab this panel belongs to.",
  },
  // Accordion
  "accordion.size": { description: "Header padding: `sm` 8px, `md` 12px, `lg` 16px (DGA)." },
  "accordion.iconPosition": {
    description: "Where the chevron sits: `trailing` (default) or `leading`.",
  },
  "accordion.flush": { description: "The lines stop 16px short of the edges." },
  "accordion.Accordion.value": {
    include: true,
    type: "string[]",
    description: "The `value`s of the open items (controlled).",
  },
  "accordion.Accordion.defaultValue": {
    include: true,
    type: "string[]",
    description: "The items open at first (uncontrolled).",
  },
  "accordion.Accordion.onValueChange": {
    include: true,
    type: "(value: string[]) => void",
    description: "Called with the `value`s of the open items.",
  },
  "accordion.Accordion.multiple": {
    include: true,
    type: "boolean",
    description: "Lets several items be open at once. Default `false`.",
  },
  "accordion.AccordionItem.value": {
    include: true,
    type: "string",
    description: "What identifies the item. Defaults to its position.",
  },
  "accordion.AccordionItem.disabled": {
    include: true,
    type: "boolean",
    description: "Skips the item.",
  },
  // Content Switcher
  "content-switcher.size": { description: "Height: `sm` 32px, `md` 40px, `lg` 48px." },
  "content-switcher.onColor": {
    description: "For brand fills (`background-primary`, the nav header).",
  },
  "content-switcher.ContentSwitcherItem.value": {
    include: true,
    type: "string",
    description: "What identifies the option.",
  },
  "content-switcher.ContentSwitcherItem.disabled": {
    include: true,
    type: "boolean",
    description: "The option cannot be chosen.",
  },
  // Toast
  "toast.Toaster.limit": { description: "The most toasts shown at once. Default 3." },
  // Notification
  "notification.variant": {
    description: "Kind: `neutral`, `info`, `success`, `warning` or `critical`.",
  },
  // Inline Alert
  "inline-alert.variant": {
    description: "Kind: `neutral`, `info`, `success`, `warning` or `destructive`.",
  },
  "inline-alert.tinted": {
    description: "Tinted fill and text in the kind's colour instead of white.",
  },
};
