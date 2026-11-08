"use client";

import { FilterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { Button } from "@/components/dga/button";
import { Checkbox } from "@/components/dga/checkbox";
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

type FiltrationGroup =
  | (FiltrationGroupBase & { type: "checkbox"; options: FiltrationOption[] })
  | (FiltrationGroupBase & { type: "radio"; options: FiltrationOption[] })
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
  /** The side the drawer opens from on small screens. */
  drawerSide?: "start" | "end";
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

/**
 * The filter pattern (DGA: Filtration): a panel of groups (checkboxes, radios, a select, a text
 * input or a range), the applied filters as removable Tags with a clear-all button, and a result
 * count above your results (`children`). From the `lg` width the panel sits beside the results;
 * below it a button opens the same panel in a Drawer. Use it controlled with `value` and
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
        <fieldset key={group.id} className="cn-filtration-group">
          <legend className="cn-filtration-legend">{group.label}</legend>
          {group.options.map((option) => (
            // biome-ignore lint/a11y/noLabelWithoutControl: the Checkbox inside is the control
            <label
              key={option.value}
              className="cn-filtration-option"
              data-disabled={option.disabled ? "" : undefined}
            >
              <Checkbox
                size="sm"
                checked={chosen.includes(option.value)}
                disabled={option.disabled}
                onCheckedChange={(checked) =>
                  set(
                    group.id,
                    checked ? [...chosen, option.value] : chosen.filter((v) => v !== option.value),
                  )
                }
              />
              <span className="cn-filtration-option-label">{option.label}</span>
              {option.count ? <span className="cn-filtration-count">{option.count}</span> : null}
            </label>
          ))}
        </fieldset>
      );
    }
    if (group.type === "radio") {
      return (
        <fieldset key={group.id} className="cn-filtration-group">
          <legend className="cn-filtration-legend">{group.label}</legend>
          <RadioGroup
            value={(current as string | undefined) ?? ""}
            onValueChange={(next) => set(group.id, next as string)}
          >
            {group.options.map((option) => (
              // biome-ignore lint/a11y/noLabelWithoutControl: the Radio inside is the control
              <label
                key={option.value}
                className="cn-filtration-option"
                data-disabled={option.disabled ? "" : undefined}
              >
                <Radio value={option.value} disabled={option.disabled} />
                <span className="cn-filtration-option-label">{option.label}</span>
                {option.count ? <span className="cn-filtration-count">{option.count}</span> : null}
              </label>
            ))}
          </RadioGroup>
        </fieldset>
      );
    }
    if (group.type === "select") {
      return (
        <div key={group.id} className="cn-filtration-group">
          <span id={`${id}-label`} className="cn-filtration-legend">
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
        <div key={group.id} className="cn-filtration-group">
          <label htmlFor={id} className="cn-filtration-legend">
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
    const [min = "", max = ""] = (current as string[] | undefined) ?? [];
    return (
      <fieldset key={group.id} className="cn-filtration-group">
        <legend className="cn-filtration-legend">{group.label}</legend>
        <div className="cn-filtration-range">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: the Input inside is the control */}
          <label className="cn-filtration-range-field">
            <span className="cn-filtration-range-label">{group.minLabel}</span>
            <Input
              size="md"
              type={group.inputType ?? "text"}
              inputMode="numeric"
              value={min}
              onChange={(event) => set(group.id, [event.target.value, max])}
            />
          </label>
          {/* biome-ignore lint/a11y/noLabelWithoutControl: the Input inside is the control */}
          <label className="cn-filtration-range-field">
            <span className="cn-filtration-range-label">{group.maxLabel}</span>
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
    <div className="cn-filtration-groups">{groups.map((group) => renderGroup(group, prefix))}</div>
  );

  return (
    <div data-slot="filtration" className={cn("cn-filtration", className)} {...props}>
      <aside aria-label={title} data-slot="filtration-panel" className="cn-filtration-panel">
        <div className="cn-filtration-head">
          <h2 className="cn-filtration-title">{title}</h2>
          {applied.length > 0 ? (
            <Button variant="transparent" size="sm" onClick={clearAll}>
              {clearAllLabel}
            </Button>
          ) : null}
        </div>
        {panel(`${baseId}-panel`)}
      </aside>

      <div data-slot="filtration-main" className="cn-filtration-main">
        <div className="cn-filtration-bar">
          <Drawer open={open} onOpenChange={setOpen} side={drawerSide}>
            <DrawerTrigger
              render={<Button variant="outline" size="md" className="cn-filtration-trigger" />}
            >
              <HugeiconsIcon icon={FilterIcon} aria-hidden />
              {triggerLabel}
              {applied.length > 0 ? (
                <Tag size="xs" rounded variant="success">
                  {applied.length}
                </Tag>
              ) : null}
            </DrawerTrigger>
            <DrawerContent closeLabel={closeLabel}>
              <DrawerHeader>
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription className={drawerDescription ? undefined : "sr-only"}>
                  {drawerDescription ?? title}
                </DrawerDescription>
              </DrawerHeader>
              {panel(`${baseId}-drawer`)}
              <DrawerFooter>
                {applied.length > 0 ? (
                  <Button variant="outline" onClick={clearAll}>
                    {clearAllLabel}
                  </Button>
                ) : null}
                <DrawerClose render={<Button variant="primary" />}>
                  {applyLabel(resultCount)}
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          {resultCount !== undefined ? (
            <p role="status" data-slot="filtration-result-count" className="cn-filtration-result">
              {resultLabel(resultCount)}
            </p>
          ) : null}
        </div>

        {applied.length > 0 ? (
          <ul
            aria-label={appliedLabel}
            data-slot="filtration-applied"
            className="cn-filtration-applied"
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

export type { FiltrationGroup, FiltrationOption, FiltrationProps, FiltrationValue };
export { Filtration, getAppliedFilters };
