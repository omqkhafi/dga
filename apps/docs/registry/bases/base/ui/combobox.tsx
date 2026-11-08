"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { Add01Icon, ArrowDown01Icon, Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { inputVariants } from "@/components/dga/input";
import { Spinner } from "@/components/dga/spinner";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

/** One choice. `value` is what you store, `label` is what people read and search. */
type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
  /** Extra words that also match the search. */
  keywords?: string[];
  /** Set on the "Create …" row of a creatable combobox. */
  creatable?: string;
};

/** A heading with its options. Pass an array of these as `items` to group the list. */
type ComboboxGroupData = { label: string; items: ComboboxOption[] };

type ComboboxItemData = ComboboxOption | ComboboxGroupData;

const isGroup = (item: unknown): item is ComboboxGroupData =>
  typeof item === "object" && item !== null && "items" in item;

/**
 * Makes Arabic and English text comparable for search: lower case, no diacritics (tashkeel) or
 * tatweel, the alef forms (أ إ آ ٱ) as a plain alef, ى as ي, ة as ه, ؤ as و, ئ as ي, and
 * Arabic-Indic digits as Western ones. So "مدرسه" finds "مدرسة" and "احمد" finds "أحمد".
 */
function normalizeArabic(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670\u0640]|\u200C|\u200D|\u200E|\u200F/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .toLocaleLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Does the option match what was typed? Case-insensitive, Arabic-normalised, matches inside words. */
function matchesQuery(option: ComboboxOption, query: string) {
  if (option.creatable !== undefined) return true;
  const needle = normalizeArabic(query);
  if (!needle) return true;
  return [option.label, option.value, ...(option.keywords ?? [])].some((text) =>
    normalizeArabic(text).includes(needle),
  );
}

const optionLabel = (value: unknown) =>
  typeof value === "object" && value !== null && "label" in value
    ? String((value as ComboboxOption).label)
    : String(value ?? "");

const CREATE_PREFIX = "__create__:";

type ComboboxProps<Multiple extends boolean | undefined = false> = Omit<
  ComboboxPrimitive.Root.Props<ComboboxOption, Multiple, ComboboxItemData>,
  "items" | "filter" | "itemToStringLabel" | "isItemEqualToValue"
> & {
  /** The options, or groups of options. */
  items: ComboboxItemData[];
  /** Custom matching. The default ignores case and Arabic diacritics. */
  filter?: ((option: ComboboxOption, query: string) => boolean) | null;
  /** Adds a "Create …" row when what was typed matches no option (our addition, shadcn has none). */
  creatable?: boolean;
  /** The text of the create row. Default: `Create "{query}"`. Translate it on Arabic pages. */
  createLabel?: (query: string) => string;
  /**
   * Called when someone chooses the create row. Return the new option (and add it to `items`)
   * and it is selected. Return nothing to ignore it.
   */
  onCreate?: (label: string) => ComboboxOption | undefined;
};

/**
 * A text field with a list of options that narrows as you type (shadcn: Combobox, a Platform
 * Code extension; the look is DGA's Dropdown Input). Single or `multiple`, flat or grouped,
 * `creatable`. Compose it from ComboboxControl and ComboboxContent, and label it with a Field.
 * Arrow keys move through the list, Enter chooses, Escape closes, and the list shows the number
 * of results to screen readers.
 */
function Combobox<Multiple extends boolean | undefined = false>({
  items,
  filter,
  creatable = false,
  createLabel = (query) => `Create "${query}"`,
  onCreate,
  value: valueProp,
  defaultValue,
  onValueChange,
  inputValue: inputProp,
  onInputValueChange,
  multiple,
  openOnInputClick = true,
  children,
  ...props
}: ComboboxProps<Multiple>) {
  const [innerQuery, setInnerQuery] = React.useState("");
  const query = inputProp !== undefined ? String(inputProp) : innerQuery;
  const [innerValue, setInnerValue] = React.useState<unknown>(
    defaultValue ?? (multiple ? [] : null),
  );
  const value = valueProp !== undefined ? valueProp : innerValue;

  const flat = React.useMemo(
    () => items.flatMap((item) => (isGroup(item) ? item.items : [item])),
    [items],
  );
  const trimmed = query.trim();
  const exists =
    trimmed !== "" &&
    flat.some((option) => normalizeArabic(option.label) === normalizeArabic(trimmed));
  const showCreate = creatable && trimmed !== "" && !exists;
  // An inline createLabel changes on every render; the row only needs to change with the query.
  const createLabelRef = React.useRef(createLabel);
  createLabelRef.current = createLabel;
  const view = React.useMemo<ComboboxItemData[]>(
    () =>
      showCreate
        ? [
            ...items,
            {
              value: `${CREATE_PREFIX}${trimmed}`,
              label: createLabelRef.current(trimmed),
              creatable: trimmed,
            },
          ]
        : items,
    [items, showCreate, trimmed],
  );
  const match = filter === undefined ? matchesQuery : filter;

  const handleValueChange = (next: unknown, details: ComboboxPrimitive.Root.ChangeEventDetails) => {
    if (creatable) {
      const list = (Array.isArray(next) ? next : [next]) as (ComboboxOption | null)[];
      const create = list.find((item) => item?.creatable !== undefined);
      if (create?.creatable !== undefined) {
        const made = onCreate?.(create.creatable);
        const rest = list.filter((item) => item && item.creatable === undefined);
        const chosen = made ? [...rest, made] : rest;
        const result = multiple ? chosen : (chosen[0] ?? null);
        setInnerValue(result);
        setInnerQuery("");
        (onValueChange as ((v: unknown, d: typeof details) => void) | undefined)?.(result, details);
        return;
      }
    }
    setInnerValue(next);
    (onValueChange as ((v: unknown, d: typeof details) => void) | undefined)?.(next, details);
  };

  return (
    <AutoDirection>
      <ComboboxPrimitive.Root
        {...(props as object)}
        multiple={multiple}
        items={view}
        value={value as never}
        onValueChange={handleValueChange as never}
        inputValue={query}
        onInputValueChange={(text, details) => {
          setInnerQuery(text);
          onInputValueChange?.(text, details);
        }}
        openOnInputClick={openOnInputClick}
        itemToStringLabel={optionLabel}
        isItemEqualToValue={(a, b) => (a as ComboboxOption)?.value === (b as ComboboxOption)?.value}
        filter={match === null ? null : (item, text) => match(item as ComboboxOption, text)}
      >
        {children}
      </ComboboxPrimitive.Root>
    </AutoDirection>
  );
}

type ComboboxControlProps = Omit<ComboboxPrimitive.Input.Props, "size"> & {
  /** Height: `md` 32px, `lg` 40px. A multiple combobox grows taller as chips wrap. */
  size?: "md" | "lg";
  /** Fill style. `lighter` and `darker` keep the border. */
  appearance?: "default" | "lighter" | "darker";
  /** Shows the clear button once something is chosen or typed. Default `true`. */
  clearable?: boolean;
  /** Accessible name of the clear button. Translate it on Arabic pages. */
  clearLabel?: string;
  /** Accessible name of the arrow button that opens the list. Translate it on Arabic pages. */
  triggerLabel?: string;
  /** Accessible name of each chip's remove button. Gets the option's label. */
  removeLabel?: (label: string) => string;
  /** Hint for removing a chip with the keyboard, read with the chip. */
  removeHint?: string;
  /** Names the group of chips for screen readers. */
  chipsLabel?: string;
  /** Class names for the box around the input. */
  boxClassName?: string;
};

/**
 * The field: an input in the DGA Input box with the clear button and the arrow. In a `multiple`
 * combobox the chosen options show as removable chips before the input and wrap onto new lines.
 * Backspace in the empty input removes the last chip.
 */
function ComboboxControl({
  className,
  boxClassName,
  size,
  appearance,
  clearable = true,
  clearLabel = "Clear",
  triggerLabel = "Show options",
  removeLabel = (label) => `Remove ${label}`,
  removeHint = "Press Backspace or Delete to remove",
  chipsLabel = "Selected",
  ...props
}: ComboboxControlProps) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-control"
      data-size={size ?? "lg"}
      className={cn(inputVariants({ size, appearance }), "has-[[data-slot=combobox-chips]]:h-auto has-[[data-slot=combobox-chips]]:py-1 data-[size=lg]:has-[[data-slot=combobox-chips]]:min-h-10 data-[size=md]:has-[[data-slot=combobox-chips]]:min-h-8 cursor-text", boxClassName)}
    >
      <ComboboxPrimitive.Value>
        {(selected: unknown) => {
          if (!Array.isArray(selected)) return null;
          return (
            <ComboboxPrimitive.Chips
              data-slot="combobox-chips"
              className="flex min-w-0 flex-1 flex-wrap items-center gap-1"
              aria-label={selected.length > 0 ? chipsLabel : undefined}
            >
              {selected.map((option: ComboboxOption) => (
                <ComboboxPrimitive.Chip
                  key={option.value}
                  data-slot="combobox-chip"
                  className="inline-flex h-6 max-w-full cursor-default items-center gap-1 rounded-sm border border-border-neutral-secondary bg-tag-background-neutral-light ps-2 pe-1 text-xs font-semibold text-tag-text-neutral outline-hidden data-highlighted:outline-2 data-highlighted:outline-solid data-highlighted:outline-offset-1 data-highlighted:outline-border-black focus-within:outline-2 focus-within:outline-solid focus-within:outline-offset-1 focus-within:outline-border-black"
                  aria-label={option.label}
                  aria-description={removeHint}
                >
                  <span className="min-w-0 truncate">{option.label}</span>
                  <ComboboxPrimitive.ChipRemove
                    data-slot="combobox-chip-remove"
                    className="relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-xs border-0 bg-transparent p-0 text-icon-default hover:bg-alpha-black-10 after:absolute after:-inset-1 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-border-black [&_svg]:size-3"
                    aria-label={removeLabel(option.label)}
                  >
                    <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
                  </ComboboxPrimitive.ChipRemove>
                </ComboboxPrimitive.Chip>
              ))}
              <ComboboxPrimitive.Input
                data-slot="input-field"
                className={cn("h-full min-w-0 flex-1 bg-transparent p-0 text-inherit [outline:0_none] placeholder:text-(--field-placeholder) disabled:cursor-not-allowed disabled:text-text-default-disabled disabled:placeholder:text-text-default-disabled read-only:text-field-text-readonly [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none min-h-6 min-w-16 flex-1", className)}
                {...props}
              />
            </ComboboxPrimitive.Chips>
          );
        }}
      </ComboboxPrimitive.Value>
      <ComboboxSingleInput className={className} {...props} />
      {clearable ? (
        <ComboboxPrimitive.Clear
          data-slot="combobox-clear"
          aria-label={clearLabel}
          className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs border-0 bg-transparent p-0 text-icon-default-500 transition-colors hover:bg-button-background-neutral-default hover:text-icon-default active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-4"
        >
          <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
        </ComboboxPrimitive.Clear>
      ) : null}
      <ComboboxPrimitive.Trigger
        data-slot="combobox-trigger"
        aria-label={triggerLabel}
        tabIndex={-1}
        className="-me-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs border-0 bg-transparent p-0 text-icon-default-500 transition-[color,background-color] motion-reduce:transition-none hover:bg-button-background-neutral-default hover:text-icon-default active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black data-popup-open:[&_svg]:rotate-180 data-disabled:cursor-not-allowed data-disabled:text-icon-default-disabled [&_svg]:size-5 [&_svg]:transition-transform motion-reduce:[&_svg]:transition-none"
      >
        <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden />
      </ComboboxPrimitive.Trigger>
    </ComboboxPrimitive.InputGroup>
  );
}

/** The input of a single-select combobox. A multiple one renders its input among the chips. */
function ComboboxSingleInput({ className, ...props }: Omit<ComboboxPrimitive.Input.Props, "size">) {
  return (
    <ComboboxPrimitive.Value>
      {(selected: unknown) =>
        Array.isArray(selected) ? null : (
          <ComboboxPrimitive.Input
            data-slot="input-field"
            className={cn("h-full min-w-0 flex-1 bg-transparent p-0 text-inherit [outline:0_none] placeholder:text-(--field-placeholder) disabled:cursor-not-allowed disabled:text-text-default-disabled disabled:placeholder:text-text-default-disabled read-only:text-field-text-readonly [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none", className)}
            {...props}
          />
        )
      }
    </ComboboxPrimitive.Value>
  );
}

type ComboboxContentProps = Omit<ComboboxPrimitive.Popup.Props, "children"> &
  Pick<ComboboxPrimitive.Positioner.Props, "side" | "align" | "sideOffset"> & {
    /** Custom rows. Default: every option as a ComboboxItem, groups with their heading. */
    children?: React.ReactNode | ((item: ComboboxItemData, index: number) => React.ReactNode);
    /** Shown when nothing matches. Translate it on Arabic pages. */
    emptyText?: React.ReactNode;
    /** Shown instead of the list while `loading`. */
    loadingText?: React.ReactNode;
    /** Shows `loadingText` with a spinner. Use it while options load from a server. */
    loading?: boolean;
    /** The text read to screen readers when the number of results changes. */
    statusLabel?: (count: number) => string;
    /** Class names for every option. */
    itemClassName?: string;
  };

/** The popup list: as wide as the field, on the card surface, with the empty and loading states. */
function ComboboxContent({
  className,
  itemClassName,
  children,
  emptyText = "No results found.",
  loadingText = "Loading…",
  loading = false,
  statusLabel = (count) => (count === 1 ? "1 result" : `${count} results`),
  side = "bottom",
  align = "start",
  sideOffset = 4,
  ...props
}: ComboboxContentProps) {
  const filtered = ComboboxPrimitive.useFilteredItems<ComboboxItemData>();
  const count = filtered.reduce((n, item) => n + (isGroup(item) ? item.items.length : 1), 0);
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50 outline-hidden select-none"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn("flex max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) flex-col overflow-hidden rounded-sm border border-border-neutral-primary bg-background-card text-text-default shadow-md outline-hidden transition-[scale,opacity] duration-100 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none", className)}
          {...props}
        >
          <ComboboxPrimitive.Status className="sr-only">
            {loading ? loadingText : statusLabel(count)}
          </ComboboxPrimitive.Status>
          {loading ? (
            <div data-slot="combobox-loading" className="flex items-center gap-2 px-3 py-3 text-sm text-text-primary-paragraph empty:hidden">
              <Spinner size="xs" label={null} />
              {loadingText}
            </div>
          ) : (
            <ComboboxPrimitive.Empty data-slot="combobox-empty" className="flex items-center gap-2 px-3 py-3 text-sm text-text-primary-paragraph empty:hidden">
              {emptyText}
            </ComboboxPrimitive.Empty>
          )}
          <ComboboxPrimitive.List data-slot="combobox-list" className="relative max-h-[min(18rem,var(--available-height))] min-h-0 overflow-y-auto overscroll-contain p-1 outline-hidden empty:hidden">
            {typeof children === "function"
              ? children
              : (children ??
                ((item: ComboboxItemData) =>
                  isGroup(item) ? (
                    <ComboboxGroup key={item.label} items={item.items}>
                      <ComboboxLabel>{item.label}</ComboboxLabel>
                      <ComboboxPrimitive.Collection>
                        {(option: ComboboxOption) => (
                          <ComboboxItem key={option.value} value={option} className={itemClassName}>
                            {option.label}
                          </ComboboxItem>
                        )}
                      </ComboboxPrimitive.Collection>
                    </ComboboxGroup>
                  ) : (
                    <ComboboxItem key={item.value} value={item} className={itemClassName}>
                      {item.label}
                    </ComboboxItem>
                  )))}
          </ComboboxPrimitive.List>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

/** One option. The chosen options show a check mark on the end side. */
function ComboboxItem({
  className,
  children,
  value,
  ...props
}: ComboboxPrimitive.Item.Props & { value: ComboboxOption }) {
  const create = value?.creatable !== undefined;
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      data-creatable={create ? "" : undefined}
      value={value}
      disabled={value?.disabled}
      className={cn("relative flex min-h-8 cursor-default items-center gap-2 rounded-xs px-3 py-1.5 text-sm text-text-default outline-hidden select-none data-highlighted:bg-button-background-neutral-default data-highlighted:before:absolute data-highlighted:before:inset-y-1 data-highlighted:before:start-0 data-highlighted:before:w-0.5 data-highlighted:before:rounded-full data-highlighted:before:bg-border-black data-selected:font-medium data-disabled:cursor-not-allowed data-disabled:text-text-default-disabled data-creatable:font-medium data-creatable:[&_svg]:text-icon-primary [&_svg]:shrink-0", className)}
      {...props}
    >
      {create ? <HugeiconsIcon icon={Add01Icon} aria-hidden className="size-4" /> : null}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <ComboboxPrimitive.ItemIndicator className="inline-flex shrink-0 text-icon-primary [&_svg]:size-4">
        <HugeiconsIcon icon={Tick02Icon} aria-hidden className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

/** Groups related options under a ComboboxLabel. */
function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

/** The heading of a ComboboxGroup. */
function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-3 py-1.5 text-xs font-semibold text-field-text-helper", className)}
      {...props}
    />
  );
}

/** A line between groups. */
function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border-neutral-secondary", className)}
      {...props}
    />
  );
}

export type {
  ComboboxContentProps,
  ComboboxControlProps,
  ComboboxGroupData,
  ComboboxItemData,
  ComboboxOption,
  ComboboxProps,
};
export {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxSeparator,
  matchesQuery,
  normalizeArabic,
};
