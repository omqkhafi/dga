"use client";

import { FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { Button } from "@/components/dga/button";
import { Checkbox } from "@/components/dga/checkbox";
import { DatePicker, type DatePickerBaseProps } from "@/components/dga/date-picker";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dga/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/dga/drawer";
import { Input } from "@/components/dga/input";
import { Radio, RadioGroup } from "@/components/dga/radio";
import { Rating } from "@/components/dga/rating";
import { SearchBox } from "@/components/dga/search-box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dga/select";
import { Tag } from "@/components/dga/tag";
import { cn } from "@/registry/bases/base/lib/utils";

type FiltrationOption = {
  value: string;
  label: string;
  /** How many results this option has. Shown after the label. */
  count?: string;
  disabled?: boolean;
};

type FiltrationGroupBase = {
  /** What the group is called in `value`. */
  id: string;
  /** The group's heading. */
  label: string;
};

/** What a group of options can add: a search field and a "Show more" button for a long list. */
type FiltrationOptionsExtras = {
  options: FiltrationOption[];
  /** Adds a search field above the options. It narrows the list by label as you type. */
  searchable?: boolean;
  /** Placeholder of the search field. */
  searchPlaceholder?: string;
  /** The name of the search field. Default: "Search" and the group's heading. */
  searchLabel?: string;
  /** The name of the search field's clear button. */
  searchClearLabel?: string;
  /** Said when the search matches no option. */
  noMatchLabel?: string;
  /** Shows only this many options, then a "Show more" button for the rest. */
  initialCount?: number;
  /** The text of the button that shows all the options. */
  showMoreLabel?: string;
  /** The text of the button that folds the list back. */
  showLessLabel?: string;
};

/** What a control you draw yourself in a group receives. */
type FiltrationCustomContext = {
  /** An id for the control, so the group's heading can name it with `labelId`. */
  id: string;
  /** The id of the group's heading. */
  labelId: string;
  /** The group's current value. */
  value: string | string[] | undefined;
  /** Sets the group's value. `undefined` or an empty value clears it. */
  onValueChange: (next: string | string[] | undefined) => void;
};

type FiltrationGroup =
  | (FiltrationGroupBase & { type: "checkbox" } & FiltrationOptionsExtras)
  | (FiltrationGroupBase & { type: "radio" } & FiltrationOptionsExtras)
  | (FiltrationGroupBase & {
      /**
       * A date (DGA: Date Picker). The value is an ISO date, or `[start, end]` for
       * `mode="range"`. `datePickerProps` passes the Date Picker's own props (labels, numerals,
       * min, max, calendars).
       */
      type: "date";
      mode?: "single" | "range";
      datePickerProps?: Omit<DatePickerBaseProps, "id" | "name">;
      /** Writes a date in the applied-filter tag. Default: the ISO date. */
      formatDate?: (iso: string) => string;
    })
  | (FiltrationGroupBase & {
      /** A star rating (DGA: Rating). The value is the chosen number of stars, for example "4". */
      type: "rating";
      max?: number;
      allowHalf?: boolean;
      /** The name of one star, for example "3 stars". */
      starLabel?: (value: number) => string;
      /** Writes the applied-filter tag, for example "4 stars and up". */
      formatApplied?: (value: number) => string;
    })
  | (FiltrationGroupBase & {
      /** Any control you draw: it gets the value and a setter, and the group joins the tags. */
      type: "custom";
      render: (context: FiltrationCustomContext) => React.ReactNode;
      /** Writes the applied-filter tag. Default: the value, joined with commas. */
      formatApplied?: (value: string | string[]) => string;
    })
  | (FiltrationGroupBase & {
      type: "select";
      options: FiltrationOption[];
      placeholder?: string;
    })
  | (FiltrationGroupBase & {
      type: "input";
      placeholder?: string;
      inputType?: React.HTMLInputTypeAttribute;
    })
  | (FiltrationGroupBase & {
      type: "range";
      /** Names of the two fields, for example "From" and "To". */
      minLabel: string;
      maxLabel: string;
      inputType?: React.HTMLInputTypeAttribute;
    });

/**
 * The chosen filters, by group `id`: a list of values for checkboxes, one value for a radio group
 * or a select, text for an input, and `[min, max]` for a range. Empty values are left out.
 */
type FiltrationValue = Record<string, string | string[]>;

type AppliedFilter = { key: string; group: FiltrationGroup; text: string; clear: () => void };

type FiltrationProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  /** The filter groups, in order. */
  groups: FiltrationGroup[];
  /** The chosen filters (controlled). */
  value?: FiltrationValue;
  /** The filters chosen at first (uncontrolled). */
  defaultValue?: FiltrationValue;
  /** Called with the new filters. */
  onValueChange?: (value: FiltrationValue) => void;
  /** The number of results, shown above them. Leave it out to hide the count. */
  resultCount?: number;
  /** Writes the count, for example "12 results". Translate it on Arabic pages. */
  resultLabel?: (count: number) => string;
  /** The panel's heading. */
  title?: string;
  /** The name of the clear-all button. */
  clearAllLabel?: string;
  /** The name of the list of applied filters. */
  appliedLabel?: string;
  /** The name of a tag's remove button, for example "Remove Riyadh". */
  removeLabel?: (filter: string) => string;
  /** The text of the button that opens the panel on small screens. */
  triggerLabel?: string;
  /** The text of the drawer's button that shows the results. */
  applyLabel?: (count?: number) => string;
  /** A line under the drawer title for screen readers. */
  drawerDescription?: string;
  /** The side the drawer opens from on small screens (with `placement="inline"`). */
  drawerSide?: "start" | "end";
  /**
   * Where the panel is (DGA: Placement). `inline` (default) puts it beside the results from the
   * `lg` width and in a Drawer below it. `start` and `end` always show a button that opens the
   * panel anchored to that side in a Drawer; `center` opens it in a centred Dialog.
   */
  placement?: "inline" | "start" | "end" | "center";
  /** Name of the drawer's close button. */
  closeLabel?: string;
  /** The results: any content, shown beside the panel. */
  children?: React.ReactNode;
};

function isEmpty(value: string | string[] | undefined) {
  return (
    value === undefined || (Array.isArray(value) ? value.every((v) => v === "") : value === "")
  );
}

/** Removes empty entries, so `value` only holds what is applied. */
function cleanValue(value: FiltrationValue): FiltrationValue {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => !isEmpty(v)));
}

/** The filters as tags: one per chosen option, one for a text or a range. */
function getAppliedFilters(
  groups: FiltrationGroup[],
  value: FiltrationValue,
  set: (id: string, next: string | string[] | undefined) => void,
): AppliedFilter[] {
  const applied: AppliedFilter[] = [];
  for (const group of groups) {
    const current = value[group.id];
    if (isEmpty(current)) continue;
    const labelOf = (v: string) =>
      "options" in group ? (group.options.find((o) => o.value === v)?.label ?? v) : v;
    if (group.type === "checkbox") {
      for (const v of current as string[]) {
        applied.push({
          key: `${group.id}:${v}`,
          group,
          text: labelOf(v),
          clear: () =>
            set(
              group.id,
              (current as string[]).filter((x) => x !== v),
            ),
        });
      }
    } else if (group.type === "date") {
      const dates = Array.isArray(current) ? current : [current as string];
      const write = group.formatDate ?? ((iso: string) => iso);
      const [from = "", to = ""] = dates;
      applied.push({
        key: group.id,
        group,
        text:
          group.mode === "range"
            ? `${from ? write(from) : ""} – ${to ? write(to) : ""}`.trim()
            : write(from),
        clear: () => set(group.id, undefined),
      });
    } else if (group.type === "rating") {
      const stars = Number(current);
      applied.push({
        key: group.id,
        group,
        text: group.formatApplied?.(stars) ?? `${stars} stars and up`,
        clear: () => set(group.id, undefined),
      });
    } else if (group.type === "custom") {
      applied.push({
        key: group.id,
        group,
        text:
          group.formatApplied?.(current as string | string[]) ??
          (Array.isArray(current) ? current.join(", ") : String(current)),
        clear: () => set(group.id, undefined),
      });
    } else if (group.type === "range") {
      const [min = "", max = ""] = current as string[];
      applied.push({
        key: group.id,
        group,
        text: `${group.minLabel} ${min} ${group.maxLabel} ${max}`.replace(/\s+/g, " ").trim(),
        clear: () => set(group.id, undefined),
      });
    } else {
      applied.push({
        key: group.id,
        group,
        text: labelOf(current as string),
        clear: () => set(group.id, undefined),
      });
    }
  }
  return applied;
}

/** The options of a checkbox or radio group, with the optional search field and "Show more". */
function FiltrationOptions({
  group,
  id,
  render,
}: {
  group: FiltrationOptionsExtras & FiltrationGroupBase;
  id: string;
  render: (options: FiltrationOption[]) => React.ReactNode;
}) {
  const [query, setQuery] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const {
    searchable,
    searchPlaceholder,
    searchLabel = `Search ${group.label}`,
    searchClearLabel = "Clear search",
    noMatchLabel = "No matches",
    initialCount,
    showMoreLabel = "Show more",
    showLessLabel = "Show less",
  } = group;
  const text = query.trim().toLowerCase();
  const matches = text
    ? group.options.filter((o) => o.label.toLowerCase().includes(text))
    : group.options;
  const folded = !text && initialCount !== undefined && !expanded && matches.length > initialCount;
  const shown = folded ? matches.slice(0, initialCount) : matches;
  const canFold = !text && initialCount !== undefined && group.options.length > initialCount;
  return (
    <>
      {searchable ? (
        <SearchBox
          size="md"
          value={query}
          onValueChange={setQuery}
          placeholder={searchPlaceholder}
          aria-label={searchLabel}
          clearLabel={searchClearLabel}
          data-slot="filtration-search"
        />
      ) : null}
      {shown.length === 0 ? (
        <p role="status" className="m-0 text-md text-text-primary-paragraph">
          {noMatchLabel}
        </p>
      ) : (
        render(shown)
      )}
      {canFold ? (
        <button
          type="button"
          data-slot="filtration-show-more"
          className="w-fit cursor-pointer border-0 bg-transparent p-0 text-md font-semibold text-link-primary underline underline-offset-2 hover:text-link-primary-hovered active:text-link-primary-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? showLessLabel : showMoreLabel}
        </button>
      ) : null}
    </>
  );
}

/**
 * The filter pattern (DGA: Filtration): a panel of groups (checkboxes and radios that can have
 * a search field and a "Show more" button, a select, a text input, a range, a date, a rating or a
 * control you draw), the applied filters as removable Tags with a clear-all button, and a result
 * count above your results (`children`). By default the panel sits beside the results from
 * the `lg` width, and below it a button opens the same panel in a Drawer; `placement` makes the
 * button the only way in and opens the panel from a side or in the centre. Use it controlled with `value` and
 * `onValueChange`, or uncontrolled with `defaultValue`. Filter your data yourself with the value.
 */
function Filtration({
  className,
  groups,
  value: valueProp,
  defaultValue,
  onValueChange,
  resultCount,
  resultLabel = (n) => `${n} results`,
  title = "Filters",
  clearAllLabel = "Clear all",
  appliedLabel = "Applied filters",
  removeLabel = (filter) => `Remove ${filter}`,
  triggerLabel = "Filters",
  applyLabel = (n) => (n === undefined ? "Show results" : `Show ${n} results`),
  drawerDescription,
  drawerSide = "start",
  placement = "inline",
  closeLabel = "Close",
  children,
  ...props
}: FiltrationProps) {
  const [inner, setInner] = React.useState<FiltrationValue>(defaultValue ?? {});
  const value = valueProp ?? inner;
  const baseId = React.useId();
  const [open, setOpen] = React.useState(false);

  const set = (id: string, next: string | string[] | undefined) => {
    const merged = cleanValue({ ...value, [id]: next ?? "" });
    if (valueProp === undefined) setInner(merged);
    onValueChange?.(merged);
  };
  const clearAll = () => {
    if (valueProp === undefined) setInner({});
    onValueChange?.({});
  };
  const applied = getAppliedFilters(groups, value, set);

  const renderGroup = (group: FiltrationGroup, prefix: string) => {
    const id = `${prefix}-${group.id}`;
    const current = value[group.id];
    if (group.type === "checkbox") {
      const chosen = (current as string[] | undefined) ?? [];
      return (
        <fieldset key={group.id} className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
          <legend className="mb-1 p-0 text-md font-semibold text-text-default">{group.label}</legend>
          <FiltrationOptions
            group={group}
            id={`${id}-options`}
            render={(options) => (
              <div id={`${id}-options`} className="flex flex-col gap-2">
                {options.map((option) => (
                  // biome-ignore lint/a11y/noLabelWithoutControl: the Checkbox inside is the control
                  <label
                    key={option.value}
                    className="flex min-h-8 cursor-pointer items-center gap-2 text-md text-text-default data-disabled:cursor-not-allowed data-disabled:text-text-default-disabled"
                    data-disabled={option.disabled ? "" : undefined}
                  >
                    <Checkbox
                      size="sm"
                      checked={chosen.includes(option.value)}
                      disabled={option.disabled}
                      onCheckedChange={(checked) =>
                        set(
                          group.id,
                          checked
                            ? [...chosen, option.value]
                            : chosen.filter((v) => v !== option.value),
                        )
                      }
                    />
                    <span className="min-w-0 flex-1">{option.label}</span>
                    {option.count ? (
                      <span className="text-sm text-text-primary-paragraph tabular-nums">{option.count}</span>
                    ) : null}
                  </label>
                ))}
              </div>
            )}
          />
        </fieldset>
      );
    }
    if (group.type === "radio") {
      return (
        <fieldset key={group.id} className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
          <legend className="mb-1 p-0 text-md font-semibold text-text-default">{group.label}</legend>
          <FiltrationOptions
            group={group}
            id={`${id}-options`}
            render={(options) => (
              <RadioGroup
                id={`${id}-options`}
                value={(current as string | undefined) ?? ""}
                onValueChange={(next) => set(group.id, next as string)}
              >
                {options.map((option) => (
                  // biome-ignore lint/a11y/noLabelWithoutControl: the Radio inside is the control
                  <label
                    key={option.value}
                    className="flex min-h-8 cursor-pointer items-center gap-2 text-md text-text-default data-disabled:cursor-not-allowed data-disabled:text-text-default-disabled"
                    data-disabled={option.disabled ? "" : undefined}
                  >
                    <Radio value={option.value} disabled={option.disabled} />
                    <span className="min-w-0 flex-1">{option.label}</span>
                    {option.count ? (
                      <span className="text-sm text-text-primary-paragraph tabular-nums">{option.count}</span>
                    ) : null}
                  </label>
                ))}
              </RadioGroup>
            )}
          />
        </fieldset>
      );
    }
    if (group.type === "select") {
      return (
        <div key={group.id} className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
          <span id={`${id}-label`} className="mb-1 p-0 text-md font-semibold text-text-default">
            {group.label}
          </span>
          <Select
            items={group.options}
            value={(current as string | undefined) ?? null}
            onValueChange={(next) => set(group.id, (next as string | null) ?? undefined)}
          >
            <SelectTrigger size="md" aria-labelledby={`${id}-label`}>
              <SelectValue placeholder={group.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {group.options.map((option) => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    if (group.type === "input") {
      return (
        <div key={group.id} className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
          <label htmlFor={id} className="mb-1 p-0 text-md font-semibold text-text-default">
            {group.label}
          </label>
          <Input
            id={id}
            size="md"
            type={group.inputType ?? "text"}
            placeholder={group.placeholder}
            value={(current as string | undefined) ?? ""}
            onChange={(event) => set(group.id, event.target.value)}
          />
        </div>
      );
    }
    if (group.type === "date") {
      const dates = Array.isArray(current) ? current : current ? [current] : [];
      const { labels: dateLabels, ...dateProps } = group.datePickerProps ?? {};
      if (group.mode === "range") {
        return (
          <fieldset key={group.id} className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
            <legend className="mb-1 p-0 text-md font-semibold text-text-default">{group.label}</legend>
            <DatePicker
              {...dateProps}
              labels={dateLabels}
              mode="range"
              value={{ start: dates[0] || null, end: dates[1] || null }}
              onValueChange={(next) => set(group.id, [next.start ?? "", next.end ?? ""])}
            />
          </fieldset>
        );
      }
      return (
        <div key={group.id} className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
          <label htmlFor={id} className="mb-1 p-0 text-md font-semibold text-text-default">
            {group.label}
          </label>
          <DatePicker
            {...dateProps}
            labels={dateLabels}
            id={id}
            mode="single"
            value={dates[0] || null}
            onValueChange={(next) => set(group.id, next ?? undefined)}
          />
        </div>
      );
    }
    if (group.type === "rating") {
      return (
        <fieldset key={group.id} className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
          <legend className="mb-1 p-0 text-md font-semibold text-text-default">{group.label}</legend>
          <Rating
            value={Number(current) || 0}
            max={group.max}
            allowHalf={group.allowHalf}
            starLabel={group.starLabel}
            onValueChange={(next) => set(group.id, String(next))}
          />
        </fieldset>
      );
    }
    if (group.type === "custom") {
      return (
        <div key={group.id} className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
          <span id={`${id}-label`} className="mb-1 p-0 text-md font-semibold text-text-default">
            {group.label}
          </span>
          {group.render({
            id,
            labelId: `${id}-label`,
            value: current,
            onValueChange: (next) => set(group.id, next),
          })}
        </div>
      );
    }
    const [min = "", max = ""] = (current as string[] | undefined) ?? [];
    return (
      <fieldset key={group.id} className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
        <legend className="mb-1 p-0 text-md font-semibold text-text-default">{group.label}</legend>
        <div className="grid grid-cols-2 gap-3">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: the Input inside is the control */}
          <label className="flex min-w-0 flex-col gap-1">
            <span className="text-sm text-text-primary-paragraph">{group.minLabel}</span>
            <Input
              size="md"
              type={group.inputType ?? "text"}
              inputMode="numeric"
              value={min}
              onChange={(event) => set(group.id, [event.target.value, max])}
            />
          </label>
          {/* biome-ignore lint/a11y/noLabelWithoutControl: the Input inside is the control */}
          <label className="flex min-w-0 flex-col gap-1">
            <span className="text-sm text-text-primary-paragraph">{group.maxLabel}</span>
            <Input
              size="md"
              type={group.inputType ?? "text"}
              inputMode="numeric"
              value={max}
              onChange={(event) => set(group.id, [min, event.target.value])}
            />
          </label>
        </div>
      </fieldset>
    );
  };

  const panel = (prefix: string) => (
    <div className="flex flex-col gap-6">{groups.map((group) => renderGroup(group, prefix))}</div>
  );

  const inline = placement === "inline";
  const centred = placement === "center";
  const side = inline ? drawerSide : (placement as "start" | "end");

  const triggerContent = (
    <>
      <HugeiconsIcon icon={FilterIcon} aria-hidden />
      {triggerLabel}
      {applied.length > 0 ? (
        <Tag size="xs" rounded variant="success">
          {applied.length}
        </Tag>
      ) : null}
    </>
  );
  const trigger = (
    <Button variant="outline" size="md" className={inline ? "lg:hidden" : undefined} />
  );
  const footer = (
    <>
      {applied.length > 0 ? (
        <Button variant="outline" onClick={clearAll}>
          {clearAllLabel}
        </Button>
      ) : null}
      {centred ? (
        <DialogClose render={<Button variant="primary" />}>{applyLabel(resultCount)}</DialogClose>
      ) : (
        <DrawerClose render={<Button variant="primary" />}>{applyLabel(resultCount)}</DrawerClose>
      )}
    </>
  );

  return (
    <div
      data-slot="filtration"
      data-placement={placement}
      className={cn(inline ? "flex w-full flex-col gap-6 lg:flex-row lg:items-start" : "flex w-full flex-col gap-6", className)}
      {...props}
    >
      {inline ? (
        <aside aria-label={title} data-slot="filtration-panel" className="hidden w-72 shrink-0 flex-col gap-4 rounded-md border border-border-neutral-primary bg-background-card p-4 lg:flex">
          <div className="flex items-center justify-between gap-2">
            <h2 className="m-0 text-lg font-bold text-text-display">{title}</h2>
            {applied.length > 0 ? (
              <Button variant="transparent" size="sm" onClick={clearAll}>
                {clearAllLabel}
              </Button>
            ) : null}
          </div>
          {panel(`${baseId}-panel`)}
        </aside>
      ) : null}

      <div data-slot="filtration-main" className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {centred ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger render={trigger}>{triggerContent}</DialogTrigger>
              <DialogContent closeLabel={closeLabel}>
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription className={drawerDescription ? undefined : "sr-only"}>
                    {drawerDescription ?? title}
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>{panel(`${baseId}-dialog`)}</DialogBody>
                <DialogFooter>{footer}</DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={open} onOpenChange={setOpen} side={side}>
              <DrawerTrigger render={trigger}>{triggerContent}</DrawerTrigger>
              <DrawerContent closeLabel={closeLabel}>
                <DrawerHeader>
                  <DrawerTitle>{title}</DrawerTitle>
                  <DrawerDescription className={drawerDescription ? undefined : "sr-only"}>
                    {drawerDescription ?? title}
                  </DrawerDescription>
                </DrawerHeader>
                {panel(`${baseId}-drawer`)}
                <DrawerFooter>{footer}</DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
          {resultCount !== undefined ? (
            <p role="status" data-slot="filtration-result-count" className="m-0 text-md font-semibold text-text-default">
              {resultLabel(resultCount)}
            </p>
          ) : null}
        </div>

        {applied.length > 0 ? (
          <ul
            aria-label={appliedLabel}
            data-slot="filtration-applied"
            className="m-0 flex list-none flex-wrap items-center gap-2 p-0"
          >
            {applied.map((filter) => (
              <li key={filter.key}>
                <Tag
                  size="md"
                  onDismiss={filter.clear}
                  dismissLabel={removeLabel(filter.text)}
                  data-slot="filtration-tag"
                >
                  {filter.text}
                </Tag>
              </li>
            ))}
            <li>
              <Button variant="transparent" size="sm" onClick={clearAll}>
                {clearAllLabel}
              </Button>
            </li>
          </ul>
        ) : null}

        {children}
      </div>
    </div>
  );
}

export type {
  FiltrationCustomContext,
  FiltrationGroup,
  FiltrationOption,
  FiltrationProps,
  FiltrationValue,
};
export { Filtration, getAppliedFilters };
