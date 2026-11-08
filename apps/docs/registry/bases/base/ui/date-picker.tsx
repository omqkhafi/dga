"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { ArrowLeft01Icon, ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { Button } from "@/components/dga/button";
import { ContentSwitcher, ContentSwitcherItem } from "@/components/dga/content-switcher";
import { Input } from "@/components/dga/input";
import { useDocumentDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

// ------------------------------------------------------------------------------------------
// Dates. Every date is a Gregorian ISO string ("2026-11-08"), whichever calendar is shown, so a
// value never depends on the time zone. The Hijri (Umm al-Qura) calendar is computed with Intl.
// ------------------------------------------------------------------------------------------

type CalendarSystem = "gregorian" | "hijri";
type DateRange = { start: string | null; end: string | null };
type DateParts = { year: number; month: number; day: number };

const DAY = 86_400_000;
const pad = (value: number, length = 2) => String(value).padStart(length, "0");

function isoToTime(iso: string) {
  const [year = 1970, month = 1, day = 1] = iso.split("-").map(Number);
  return Date.UTC(year, month - 1, day, 12);
}

function timeToIso(time: number) {
  const date = new Date(time);
  return `${pad(date.getUTCFullYear(), 4)}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** Today's date in the person's time zone, as an ISO string. */
function todayIso() {
  const now = new Date();
  return `${pad(now.getFullYear(), 4)}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function addDays(iso: string, days: number) {
  return timeToIso(isoToTime(iso) + days * DAY);
}

let hijriFormat: Intl.DateTimeFormat | undefined;
function hijriParts(time: number): DateParts {
  hijriFormat ??= new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC",
  });
  const parts: Record<string, number> = {};
  for (const part of hijriFormat.formatToParts(time)) {
    if (part.type === "year" || part.type === "month" || part.type === "day") {
      parts[part.type] = Number.parseInt(part.value, 10);
    }
  }
  return { year: parts.year ?? 0, month: parts.month ?? 0, day: parts.day ?? 0 };
}

/** The Gregorian time of a Hijri date, found by closing in on it from an estimate. */
function hijriToTime(year: number, month: number, day: number): number | null {
  const estimate =
    Date.UTC(622, 6, 19) + ((year - 1) * 354.36707 + (month - 1) * 29.530588 + (day - 1)) * DAY;
  let time = Math.round(estimate / DAY) * DAY + 12 * 3_600_000;
  for (let step = 0; step < 14; step++) {
    const found = hijriParts(time);
    const months = (year - found.year) * 12 + (month - found.month);
    const days = day - found.day;
    if (months === 0 && days === 0) return time;
    time += (months === 0 ? days : Math.round(months * 29.530588) + days) * DAY;
  }
  return null;
}

/** The year, month (1 to 12) and day of an ISO date in a calendar. */
function getParts(iso: string, system: CalendarSystem): DateParts {
  if (system === "gregorian") {
    const [year = 0, month = 0, day = 0] = iso.split("-").map(Number);
    return { year, month, day };
  }
  return hijriParts(isoToTime(iso));
}

function normalizeMonth(year: number, month: number) {
  return { year: year + Math.floor((month - 1) / 12), month: ((((month - 1) % 12) + 12) % 12) + 1 };
}

function daysInMonth(system: CalendarSystem, year: number, month: number) {
  const here = normalizeMonth(year, month);
  if (system === "gregorian") return new Date(Date.UTC(here.year, here.month, 0)).getUTCDate();
  const next = normalizeMonth(here.year, here.month + 1);
  const from = hijriToTime(here.year, here.month, 1);
  const to = hijriToTime(next.year, next.month, 1);
  return from === null || to === null ? 30 : Math.round((to - from) / DAY);
}

/** The ISO date of a calendar date. The day is limited to the length of the month. */
function fromParts(system: CalendarSystem, year: number, month: number, day: number) {
  const here = normalizeMonth(year, month);
  const clamped = Math.min(Math.max(day, 1), daysInMonth(system, here.year, here.month));
  if (system === "gregorian") return `${pad(here.year, 4)}-${pad(here.month)}-${pad(clamped)}`;
  const time = hijriToTime(here.year, here.month, clamped);
  return time === null ? todayIso() : timeToIso(time);
}

/** Moves a date by whole months in a calendar, keeping the day when the month is long enough. */
function addMonths(iso: string, system: CalendarSystem, months: number) {
  const { year, month, day } = getParts(iso, system);
  return fromParts(system, year, month + months, day);
}

type GridCell = { iso: string; inMonth: boolean };

/** Six weeks of a month, as ISO dates, starting on `weekStartsOn` (0 is Sunday). */
function getMonthGrid(
  system: CalendarSystem,
  year: number,
  month: number,
  weekStartsOn = 0,
): GridCell[][] {
  const first = fromParts(system, year, month, 1);
  const length = daysInMonth(system, year, month);
  const weekday = new Date(isoToTime(first)).getUTCDay();
  const lead = (weekday - weekStartsOn + 7) % 7;
  const start = isoToTime(first) - lead * DAY;
  return Array.from({ length: 6 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const index = week * 7 + day;
      return {
        iso: timeToIso(start + index * DAY),
        inMonth: index >= lead && index < lead + length,
      };
    }),
  );
}

/** Reads a typed date such as `2026-11-08` or `1448/05/26` (Arabic-Indic digits work too). */
function parseDateInput(text: string, system: CalendarSystem): string | null {
  // Arabic-Indic (U+0660 to U+0669) and Persian (U+06F0 to U+06F9) digits become 0 to 9.
  const latin = text
    .trim()
    .replace(/[\u0660-\u0669\u06F0-\u06F9]/g, (digit) => String(digit.charCodeAt(0) & 0xf));
  const match = /^(\d{4})\D(\d{1,2})\D(\d{1,2})$/.exec(latin);
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth(system, year, month)) return null;
  return fromParts(system, year, month, day);
}

function formatDateInput(iso: string, system: CalendarSystem, format: (n: number) => string) {
  const { year, month, day } = getParts(iso, system);
  return [pad(year, 4), pad(month), pad(day)]
    .map((part) =>
      /^\d+$/.test(part) ? format(Number(part)).padStart(part.length, format(0)) : part,
    )
    .join("-");
}

// ------------------------------------------------------------------------------------------
// Calendar
// ------------------------------------------------------------------------------------------

type CalendarLabels = {
  /** The name of the previous-month button. Translate it on Arabic pages. */
  previousMonth?: string;
  /** The name of the next-month button. */
  nextMonth?: string;
  /** The name of the calendar switch. */
  calendarSwitch?: string;
  gregorian?: string;
  hijri?: string;
};

type CalendarBaseProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  /** The calendar shown (controlled). */
  calendar?: CalendarSystem;
  /** The calendar shown at first (uncontrolled). Default `gregorian`. */
  defaultCalendar?: CalendarSystem;
  onCalendarChange?: (calendar: CalendarSystem) => void;
  /**
   * The calendars the person can switch between. One entry hides the switch.
   * Default both: Gregorian and Hijri (Umm al-Qura).
   */
  calendars?: CalendarSystem[];
  /** The earliest date that can be chosen, as an ISO date. */
  min?: string;
  /** The latest date that can be chosen. */
  max?: string;
  /** Marks other dates as unavailable, for example weekends or holidays. */
  isDateDisabled?: (iso: string) => boolean;
  /** The month shown at first, as any ISO date in it. Default: the chosen date, else today. */
  defaultMonth?: string;
  /** One month, or two side by side (DGA: dual-month view). */
  months?: 1 | 2;
  /** The first day of the week: 0 is Sunday (default), 6 is Saturday. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** The language of month and day names. Default: Arabic when the page direction is RTL, English otherwise. */
  locale?: string;
  /** The digits: `latn` (0 to 9, default) or `arab` (Arabic-Indic). */
  numerals?: "latn" | "arab";
  /**
   * Shows the day of the other calendar under each number, as "day/month" (DGA: Secondary Date),
   * for example the Hijri day on a Gregorian calendar.
   */
  secondaryDate?: boolean;
  /** Today's date, as an ISO date. Default: the date on the device. Useful in tests. */
  today?: string;
  labels?: CalendarLabels;
};

type CalendarProps = CalendarBaseProps &
  (
    | {
        mode?: "single";
        /** The chosen date as an ISO date, or null (controlled). */
        value?: string | null;
        defaultValue?: string | null;
        onValueChange?: (value: string | null) => void;
      }
    | {
        mode: "range";
        /** The chosen range (controlled). `end` is null while the person is still choosing. */
        value?: DateRange;
        defaultValue?: DateRange;
        onValueChange?: (value: DateRange) => void;
      }
  );

function useFormatters(system: CalendarSystem, locale: string, numerals: "latn" | "arab") {
  return React.useMemo(() => {
    const tag = `${locale}-u-ca-${system === "hijri" ? "islamic-umalqura" : "gregory"}-nu-${numerals}`;
    const base = { timeZone: "UTC" } as const;
    const number = new Intl.NumberFormat(`${locale}-u-nu-${numerals}`, { useGrouping: false });
    return {
      number: (value: number) => number.format(value),
      month: new Intl.DateTimeFormat(tag, { ...base, month: "long" }),
      year: new Intl.DateTimeFormat(tag, { ...base, year: "numeric" }),
      weekdayShort: new Intl.DateTimeFormat(tag, { ...base, weekday: "short" }),
      weekdayLong: new Intl.DateTimeFormat(tag, { ...base, weekday: "long" }),
      full: new Intl.DateTimeFormat(tag, { ...base, dateStyle: "full" }),
    };
  }, [system, locale, numerals]);
}

const WEEKDAY_ANCHOR = "2026-11-01"; // a Sunday

/**
 * A month grid for choosing a date or a range (DGA: Date Picker, calendar). Gregorian and Hijri
 * (Umm al-Qura) with a switch between them. Arrow keys move by day and week (Left and Right swap on
 * Arabic pages), Home and End go to the start and end of the week, Page Up and Page Down change the
 * month, Shift with them the year, Enter or Space chooses. Dates are ISO strings, so a value does
 * not depend on the time zone.
 */
function Calendar(props: CalendarProps) {
  const {
    className,
    calendar: calendarProp,
    defaultCalendar = "gregorian",
    onCalendarChange,
    calendars = ["gregorian", "hijri"],
    min,
    max,
    isDateDisabled,
    defaultMonth,
    months = 1,
    weekStartsOn = 0,
    locale: localeProp,
    numerals = "latn",
    today: todayProp,
    secondaryDate = false,
    labels = {},
    mode: _mode,
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    ...rest
  } = props as CalendarBaseProps & {
    mode?: "single" | "range";
    value?: string | null | DateRange;
    defaultValue?: string | null | DateRange;
    onValueChange?: (value: never) => void;
  };
  const range = props.mode === "range";
  const rtl = useDocumentDirection() === "rtl";
  const locale = localeProp ?? (rtl ? "ar" : "en");
  const {
    previousMonth = "Previous month",
    nextMonth = "Next month",
    calendarSwitch = "Calendar",
    gregorian = "Gregorian",
    hijri = "Hijri",
  } = labels;

  const [innerCalendar, setInnerCalendar] = React.useState<CalendarSystem>(defaultCalendar);
  const system = calendarProp ?? innerCalendar;
  const format = useFormatters(system, locale, numerals);
  const other: CalendarSystem = system === "hijri" ? "gregorian" : "hijri";

  const [innerValue, setInnerValue] = React.useState<string | null | DateRange>(
    props.defaultValue ?? (range ? { start: null, end: null } : null),
  );
  const value = (props.value !== undefined ? props.value : innerValue) as string | null | DateRange;
  const selection: DateRange = range
    ? (value as DateRange)
    : { start: (value as string | null) ?? null, end: (value as string | null) ?? null };

  const [today, setToday] = React.useState<string | null>(todayProp ?? null);
  React.useEffect(() => {
    if (todayProp === undefined) setToday(todayIso());
  }, [todayProp]);

  const [view, setView] = React.useState<string | null>(
    defaultMonth ?? selection.start ?? todayProp ?? null,
  );
  const [focused, setFocused] = React.useState<string | null>(null);
  const [hover, setHover] = React.useState<string | null>(null);
  const shouldFocus = React.useRef(false);
  const root = React.useRef<HTMLDivElement>(null);
  const headingId = React.useId();

  React.useEffect(() => {
    if (view === null && today !== null) setView(today);
  }, [view, today]);

  const anchor = view ?? today;
  const first = anchor ? getParts(anchor, system) : null;
  const firstMonth = first ? fromParts(system, first.year, first.month, 1) : null;
  const visible = firstMonth
    ? Array.from({ length: months }, (_, i) => addMonths(firstMonth, system, i))
    : [];
  const focusTarget =
    focused &&
    visible.some((m) => {
      const p = getParts(m, system);
      const f = getParts(focused, system);
      return p.year === f.year && p.month === f.month;
    })
      ? focused
      : (visible[0] ?? null);

  React.useEffect(() => {
    if (!shouldFocus.current || !focused) return;
    shouldFocus.current = false;
    root.current
      ?.querySelector<HTMLButtonElement>(`button[data-iso="${focused}"]:not([data-outside])`)
      ?.focus();
  });

  const blocked = (iso: string) =>
    (min !== undefined && iso < min) ||
    (max !== undefined && iso > max) ||
    isDateDisabled?.(iso) === true;

  const commit = (next: string | null | DateRange) => {
    if (props.value === undefined) setInnerValue(next);
    (props.onValueChange as ((v: unknown) => void) | undefined)?.(next);
  };

  const choose = (iso: string) => {
    if (blocked(iso)) return;
    if (!range) {
      commit(iso);
      return;
    }
    const { start, end } = selection;
    if (start === null || end !== null) commit({ start: iso, end: null });
    else if (iso < start) commit({ start: iso, end: start });
    else commit({ start, end: iso });
  };

  const move = (iso: string) => {
    let target = iso;
    if (min !== undefined && target < min) target = min;
    if (max !== undefined && target > max) target = max;
    shouldFocus.current = true;
    setFocused(target);
    const p = getParts(target, system);
    const shown = visible.map((m) => getParts(m, system));
    if (!shown.some((s) => s.year === p.year && s.month === p.month)) {
      const before = shown[0] && (p.year - shown[0].year) * 12 + (p.month - shown[0].month) < 0;
      setView(
        before
          ? fromParts(system, p.year, p.month, 1)
          : fromParts(system, p.year, p.month - (months - 1), 1),
      );
    }
  };

  const shiftView = (delta: number) => {
    if (!firstMonth) return;
    setView(addMonths(firstMonth, system, delta));
    setFocused(null);
  };

  const onDayKeyDown = (event: React.KeyboardEvent, iso: string) => {
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const backward = rtl ? "ArrowRight" : "ArrowLeft";
    const weekday = (new Date(isoToTime(iso)).getUTCDay() - weekStartsOn + 7) % 7;
    const key = event.key;
    let next: string | undefined;
    if (key === forward) next = addDays(iso, 1);
    else if (key === backward) next = addDays(iso, -1);
    else if (key === "ArrowDown") next = addDays(iso, 7);
    else if (key === "ArrowUp") next = addDays(iso, -7);
    else if (key === "Home") next = addDays(iso, -weekday);
    else if (key === "End") next = addDays(iso, 6 - weekday);
    else if (key === "PageDown") next = addMonths(iso, system, event.shiftKey ? 12 : 1);
    else if (key === "PageUp") next = addMonths(iso, system, event.shiftKey ? -12 : -1);
    if (next === undefined) return;
    event.preventDefault();
    move(next);
  };

  const preview = range && selection.start && !selection.end && hover ? hover : null;
  const bounds = (): [string, string] | null => {
    if (selection.start && selection.end) return [selection.start, selection.end];
    if (selection.start && preview) {
      return preview < selection.start ? [preview, selection.start] : [selection.start, preview];
    }
    return null;
  };
  const span = bounds();

  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const date = isoToTime(addDays(WEEKDAY_ANCHOR, (i + weekStartsOn) % 7));
    return { short: format.weekdayShort.format(date), long: format.weekdayLong.format(date) };
  });

  const switcher =
    calendars.length > 1 ? (
      <ContentSwitcher
        size="sm"
        aria-label={calendarSwitch}
        value={system}
        onValueChange={(next) => {
          if (calendarProp === undefined) setInnerCalendar(next as CalendarSystem);
          onCalendarChange?.(next as CalendarSystem);
          setFocused(null);
        }}
      >
        {calendars.map((c) => (
          <ContentSwitcherItem key={c} value={c}>
            {c === "hijri" ? hijri : gregorian}
          </ContentSwitcherItem>
        ))}
      </ContentSwitcher>
    ) : null;

  return (
    <div
      ref={root}
      data-slot="calendar"
      data-calendar={system}
      data-months={months}
      className={cn("flex w-fit max-w-full flex-col gap-4 [--cell:min(3.5rem,calc((100vw-4rem)/7))]", className)}
      {...rest}
    >
      {switcher ? <div className="flex justify-center">{switcher}</div> : null}
      <div className="flex gap-8 max-sm:flex-col">
        {visible.map((monthIso, index) => {
          const p = getParts(monthIso, system);
          const grid = getMonthGrid(system, p.year, p.month, weekStartsOn);
          const stamp = isoToTime(monthIso);
          const title = `${format.month.format(stamp)} ${format.year.format(stamp)}`;
          const id = `${headingId}-${index}`;
          return (
            <div key={monthIso} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                {index === 0 ? (
                  <button
                    type="button"
                    data-slot="calendar-previous"
                    className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-icon-default [&_svg]:size-5 [&_svg]:rtl:-scale-x-100 hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black"
                    aria-label={previousMonth}
                    onClick={() => shiftView(-1)}
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} aria-hidden />
                  </button>
                ) : (
                  <span className="size-10 shrink-0" aria-hidden />
                )}
                <h2
                  id={id}
                  data-slot="calendar-heading"
                  className="m-0 flex-1 text-center text-md font-bold text-text-display"
                  aria-live="polite"
                >
                  {title}
                </h2>
                {index === months - 1 ? (
                  <button
                    type="button"
                    data-slot="calendar-next"
                    className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-icon-default [&_svg]:size-5 [&_svg]:rtl:-scale-x-100 hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black"
                    aria-label={nextMonth}
                    onClick={() => shiftView(1)}
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} aria-hidden />
                  </button>
                ) : (
                  <span className="size-10 shrink-0" aria-hidden />
                )}
              </div>
              {/* biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: the WAI-ARIA date picker grid pattern on a native table */}
              <table role="grid" aria-labelledby={id} className="w-[calc(7*var(--cell))] table-fixed border-collapse">
                <thead>
                  <tr>
                    {weekdays.map((day) => (
                      <th key={day.long} scope="col" className="h-8 p-0 text-center text-xs font-bold text-text-primary-paragraph">
                        <span aria-hidden>{day.short}</span>
                        <span className="sr-only">{day.long}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grid.map((week) => (
                    <tr key={week[0]?.iso}>
                      {week.map(({ iso, inMonth }) => {
                        if (!inMonth && months > 1) {
                          return (
                            // biome-ignore lint/a11y/useFocusableInteractive: hidden, empty cell
                            <td
                              key={iso}
                              // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: grid pattern; an empty cell for a day outside the month
                              role="gridcell"
                              aria-hidden
                              className="h-(--cell) p-0 text-center data-[range=mid]:bg-datecell-background-100 data-[range=start]:[background:linear-gradient(to_right,transparent_50%,var(--color-datecell-background-100)_50%)] data-[range=start]:rtl:[background:linear-gradient(to_left,transparent_50%,var(--color-datecell-background-100)_50%)] data-[range=end]:[background:linear-gradient(to_left,transparent_50%,var(--color-datecell-background-100)_50%)] data-[range=end]:rtl:[background:linear-gradient(to_right,transparent_50%,var(--color-datecell-background-100)_50%)]"
                            />
                          );
                        }
                        const selected =
                          iso === selection.start ||
                          (selection.end !== null && iso === selection.end);
                        const inRange = span !== null && iso > span[0] && iso < span[1];
                        const edge =
                          span !== null && span[0] !== span[1]
                            ? iso === span[0]
                              ? "start"
                              : iso === span[1]
                                ? "end"
                                : undefined
                            : undefined;
                        const disabled = blocked(iso);
                        return (
                          // biome-ignore lint/a11y/useFocusableInteractive: the day button inside the cell is the focusable element
                          <td
                            key={iso}
                            // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: grid pattern; the day button inside the cell holds the focus
                            role="gridcell"
                            aria-selected={selected}
                            data-range={inRange ? "mid" : range ? edge : undefined}
                            className="h-(--cell) p-0 text-center data-[range=mid]:bg-datecell-background-100 data-[range=start]:[background:linear-gradient(to_right,transparent_50%,var(--color-datecell-background-100)_50%)] data-[range=start]:rtl:[background:linear-gradient(to_left,transparent_50%,var(--color-datecell-background-100)_50%)] data-[range=end]:[background:linear-gradient(to_left,transparent_50%,var(--color-datecell-background-100)_50%)] data-[range=end]:rtl:[background:linear-gradient(to_right,transparent_50%,var(--color-datecell-background-100)_50%)]"
                          >
                            <button
                              type="button"
                              data-slot="calendar-day"
                              data-iso={iso}
                              data-chosen={selected ? "" : undefined}
                              data-today={iso === today ? "" : undefined}
                              data-outside={inMonth ? undefined : ""}
                              data-disabled={disabled ? "" : undefined}
                              aria-disabled={disabled ? true : undefined}
                              aria-current={iso === today ? "date" : undefined}
                              aria-label={format.full.format(isoToTime(iso))}
                              tabIndex={iso === focusTarget ? 0 : -1}
                              className="mx-auto flex size-[min(3rem,var(--cell))] flex-col cursor-pointer items-center justify-center rounded-full border-2 border-transparent bg-transparent p-0 text-md font-normal text-text-default tabular-nums transition-colors motion-reduce:transition-none hover:bg-datecell-today-background-hovered active:bg-datecell-today-background-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black data-outside:text-text-secondary-paragraph data-outside:hover:text-text-default data-outside:active:text-text-default data-today:border-datecell-background-600 data-today:font-bold data-today:text-datecell-background-600 data-chosen:border-datecell-background-default data-chosen:bg-datecell-background-default data-chosen:text-text-oncolor-primary data-chosen:hover:bg-datecell-background-hovered data-chosen:active:bg-datecell-background-pressed data-chosen:data-today:text-text-oncolor-primary data-disabled:cursor-not-allowed data-disabled:text-text-default-disabled data-disabled:hover:bg-transparent data-disabled:active:bg-transparent data-disabled:data-today:text-text-default-disabled data-disabled:data-chosen:bg-datecell-background-default data-disabled:data-chosen:text-text-oncolor-primary"
                              onClick={() => {
                                setFocused(iso);
                                choose(iso);
                              }}
                              onKeyDown={(event) => onDayKeyDown(event, iso)}
                              onFocus={() => setFocused(iso)}
                              onMouseEnter={() => setHover(iso)}
                              onMouseLeave={() => setHover(null)}
                            >
                              <span>{format.number(getParts(iso, system).day)}</span>
                              {secondaryDate ? (
                                <span className="-mt-0.5 text-[0.625rem] leading-none font-normal">
                                  {format.number(getParts(iso, other).day)}/
                                  {format.number(getParts(iso, other).month)}
                                </span>
                              ) : null}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------------------
// Date Picker: an input (or two) with a popup calendar
// ------------------------------------------------------------------------------------------

type QuickOption = { label: string; value: string | DateRange };

type DatePickerBaseProps = Omit<CalendarBaseProps, "labels" | "className" | "months"> & {
  className?: string;
  /** The popup shows two months side by side. */
  months?: 1 | 2;
  labels?: CalendarLabels & {
    /** The name of the button that opens the calendar. */
    open?: string;
    /** The name of the start field in a range. */
    start?: string;
    /** The name of the end field in a range. */
    end?: string;
    /** The name of the popup. */
    dialog?: string;
    apply?: string;
    cancel?: string;
  };
  placeholder?: string;
  disabled?: boolean;
  size?: "md" | "lg";
  /** Marks the field as invalid (Field does this for you with `invalid`). */
  invalid?: boolean;
  /** Shows Cancel and Apply buttons: the choice only counts after Apply. */
  confirm?: boolean;
  /** Shortcuts shown beside the calendar, for example "Today" or "Last 7 days". */
  quickOptions?: QuickOption[];
  /** The name of the list of shortcuts. */
  quickOptionsLabel?: string;
  /** Form field name for the ISO value. */
  name?: string;
  /** Form field names for a range. */
  startName?: string;
  endName?: string;
  id?: string;
};

type DatePickerProps = DatePickerBaseProps &
  (
    | {
        mode?: "single";
        value?: string | null;
        defaultValue?: string | null;
        onValueChange?: (value: string | null) => void;
      }
    | {
        mode: "range";
        value?: DateRange;
        defaultValue?: DateRange;
        onValueChange?: (value: DateRange) => void;
      }
  );

/**
 * A date field with a popup calendar (DGA: Date Picker). Type a date as `YYYY-MM-DD` in the shown
 * calendar or choose it in the popup, which opens with the button or Alt + Down and closes with
 * Escape. `mode="range"` has a start and an end field. Put it in a Field to get a label, helper
 * text and an error. Pass `min`, `max` and `isDateDisabled` to limit the dates.
 */
function DatePicker(props: DatePickerProps) {
  const {
    className,
    mode = "single",
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    labels = {},
    placeholder = "YYYY-MM-DD",
    disabled,
    size,
    invalid,
    confirm = false,
    quickOptions,
    quickOptionsLabel = "Shortcuts",
    name,
    startName,
    endName,
    id,
    calendar: calendarProp,
    defaultCalendar = "gregorian",
    onCalendarChange,
    numerals = "latn",
    ...calendarProps
  } = props as DatePickerBaseProps & {
    mode?: "single" | "range";
    value?: string | null | DateRange;
    defaultValue?: string | null | DateRange;
    onValueChange?: (value: never) => void;
  };
  const range = mode === "range";
  const rtl = useDocumentDirection() === "rtl";
  const {
    open: openLabel = "Open calendar",
    start: startLabel = "Start date",
    end: endLabel = "End date",
    dialog: dialogLabel = "Calendar",
    apply: applyLabel = "Apply",
    cancel: cancelLabel = "Cancel",
    ...calendarLabels
  } = labels;

  const [innerCalendar, setInnerCalendar] = React.useState<CalendarSystem>(defaultCalendar);
  const system = calendarProp ?? innerCalendar;
  const [innerValue, setInnerValue] = React.useState<string | null | DateRange>(
    props.defaultValue ?? (range ? { start: null, end: null } : null),
  );
  const value = (props.value !== undefined ? props.value : innerValue) as string | null | DateRange;
  const selection: DateRange = range
    ? (value as DateRange)
    : { start: (value as string | null) ?? null, end: null };
  const single = !range ? (value as string | null) : null;

  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<string | null | DateRange>(value);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const popup = React.useRef<HTMLDivElement>(null);
  const locale = calendarProps.locale ?? (rtl ? "ar" : "en");
  const numberFormat = React.useMemo(
    () => new Intl.NumberFormat(`${locale}-u-nu-${numerals}`, { useGrouping: false }),
    [locale, numerals],
  );

  const commit = (next: string | null | DateRange) => {
    if (props.value === undefined) setInnerValue(next);
    (props.onValueChange as ((v: unknown) => void) | undefined)?.(next);
  };
  const setCalendar = (next: CalendarSystem) => {
    if (calendarProp === undefined) setInnerCalendar(next);
    onCalendarChange?.(next);
  };

  const show = (iso: string | null) =>
    iso ? formatDateInput(iso, system, (n) => numberFormat.format(n)) : "";

  const calendarValue = confirm ? draft : value;
  const handleCalendar = (next: string | null | DateRange) => {
    if (confirm) {
      setDraft(next);
      return;
    }
    commit(next);
    if (!range) setOpen(false);
    else if ((next as DateRange).end !== null) setOpen(false);
  };

  const allowed = (iso: string) =>
    !(
      (calendarProps.min !== undefined && iso < calendarProps.min) ||
      (calendarProps.max !== undefined && iso > calendarProps.max) ||
      calendarProps.isDateDisabled?.(iso)
    );

  // Typed text: kept as typed while editing, parsed on blur or Enter.
  const field = (which: "single" | "start" | "end", label?: string) => {
    const current =
      which === "single" ? single : which === "start" ? selection.start : selection.end;
    return (
      <TextDate
        key={`${which}-${system}`}
        id={which === "single" ? id : undefined}
        which={which}
        label={label}
        current={current}
        show={show}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        invalid={invalid}
        parse={(text) => {
          const iso = parseDateInput(text, system);
          return iso !== null && allowed(iso) ? iso : null;
        }}
        onCommit={(iso) => {
          if (which === "single") commit(iso);
          else if (which === "start")
            commit({
              start: iso,
              end: iso && selection.end && selection.end < iso ? null : selection.end,
            });
          else commit({ start: selection.start, end: iso });
        }}
        endAdornment={
          which === (range ? "end" : "single") ? (
            <PopoverPrimitive.Trigger
              data-slot="date-picker-trigger"
              aria-label={openLabel}
              disabled={disabled}
              className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xs border-0 bg-transparent p-0 text-icon-default [&_svg]:size-5 hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black disabled:cursor-not-allowed disabled:text-icon-default-disabled disabled:hover:bg-transparent"
            >
              <HugeiconsIcon icon={Calendar03Icon} aria-hidden />
            </PopoverPrimitive.Trigger>
          ) : undefined
        }
      />
    );
  };

  return (
    <div data-slot="date-picker" className={cn("w-full max-w-sm", className)}>
      <PopoverPrimitive.Root
        open={open}
        onOpenChange={(next) => {
          if (next) setDraft(value);
          setOpen(next);
        }}
      >
        <div ref={wrapper} className="flex items-center gap-2" data-range={range ? "" : undefined}>
          {range ? (
            <>
              {field("start", startLabel)}
              <span aria-hidden className="text-text-primary-paragraph">
                –
              </span>
              {field("end", endLabel)}
            </>
          ) : (
            field("single")
          )}
        </div>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner
            anchor={wrapper}
            align="start"
            sideOffset={4}
            className="z-50 outline-hidden"
          >
            <PopoverPrimitive.Popup
              ref={popup}
              data-slot="date-picker-popup"
              aria-label={dialogLabel}
              className="max-w-[calc(100vw-1rem)] rounded-md bg-field-background-default p-4 text-text-default shadow-2xl outline-hidden"
              initialFocus={() =>
                popup.current?.querySelector<HTMLElement>(
                  'button[data-slot="calendar-day"][tabindex="0"]',
                ) ?? true
              }
            >
              <div className="flex gap-4 max-sm:flex-col">
                {quickOptions?.length ? (
                  <ul aria-label={quickOptionsLabel} className="m-0 flex min-w-30 list-none flex-col gap-1 p-0">
                    {quickOptions.map((option) => (
                      <li key={option.label}>
                        <button
                          type="button"
                          className="w-full cursor-pointer rounded-sm border-0 bg-transparent px-3 py-2 text-start text-md text-text-default hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black"
                          onClick={() => handleCalendar(option.value)}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Calendar
                  {...(calendarProps as CalendarBaseProps)}
                  calendar={system}
                  onCalendarChange={setCalendar}
                  numerals={numerals}
                  labels={calendarLabels}
                  {...(range
                    ? {
                        mode: "range" as const,
                        value: calendarValue as DateRange,
                        onValueChange: handleCalendar,
                      }
                    : {
                        mode: "single" as const,
                        value: calendarValue as string | null,
                        onValueChange: handleCalendar,
                      })}
                />
              </div>
              {confirm ? (
                <div className="mt-4 flex justify-end gap-3 border-t border-border-neutral-primary pt-4">
                  <PopoverPrimitive.Close render={<Button variant="outline" size="md" />}>
                    {cancelLabel}
                  </PopoverPrimitive.Close>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      commit(draft);
                      setOpen(false);
                    }}
                  >
                    {applyLabel}
                  </Button>
                </div>
              ) : null}
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
      {name && !range ? <input type="hidden" name={name} value={single ?? ""} /> : null}
      {range && startName ? (
        <input type="hidden" name={startName} value={selection.start ?? ""} />
      ) : null}
      {range && endName ? <input type="hidden" name={endName} value={selection.end ?? ""} /> : null}
    </div>
  );
}

/** One text field of the Date Picker. It holds what is typed until blur or Enter. */
function TextDate({
  id,
  which,
  label,
  current,
  show,
  placeholder,
  disabled,
  size,
  invalid,
  parse,
  onCommit,
  endAdornment,
}: {
  id?: string;
  which: "single" | "start" | "end";
  label?: string;
  current: string | null;
  show: (iso: string | null) => string;
  placeholder: string;
  disabled?: boolean;
  size?: "md" | "lg";
  invalid?: boolean;
  parse: (text: string) => string | null;
  onCommit: (iso: string | null) => void;
  endAdornment?: React.ReactNode;
}) {
  const shown = show(current);
  const [text, setText] = React.useState(shown);
  const [bad, setBad] = React.useState(false);
  const editing = React.useRef(false);
  React.useEffect(() => {
    if (!editing.current) {
      setText(shown);
      setBad(false);
    }
  }, [shown]);
  const finish = () => {
    editing.current = false;
    if (text.trim() === "") {
      setBad(false);
      if (current !== null) onCommit(null);
      return;
    }
    const iso = parse(text);
    if (iso === null) {
      setBad(true);
      return;
    }
    setBad(false);
    setText(show(iso));
    if (iso !== current) onCommit(iso);
  };
  return (
    <Input
      id={id}
      data-which={which}
      size={size}
      aria-label={label}
      aria-invalid={bad || invalid ? true : undefined}
      inputMode="numeric"
      autoComplete="off"
      dir="ltr"
      placeholder={placeholder}
      disabled={disabled}
      value={text}
      onChange={(event) => {
        editing.current = true;
        setText(event.target.value);
      }}
      onBlur={finish}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          finish();
        }
      }}
      endAdornment={endAdornment}
    />
  );
}

export type {
  CalendarLabels,
  CalendarProps,
  CalendarSystem,
  DatePickerProps,
  DateRange,
  GridCell,
  QuickOption,
};
export {
  addDays,
  addMonths,
  Calendar,
  DatePicker,
  daysInMonth,
  formatDateInput,
  fromParts,
  getMonthGrid,
  getParts,
  parseDateInput,
  todayIso,
};
