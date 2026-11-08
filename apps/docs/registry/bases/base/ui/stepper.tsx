"use client";

import { Alert02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

type StepStatus = "completed" | "current" | "upcoming" | "error";

type StepperLabels = {
  /** Read after a completed step's title. */
  completed: string;
  /** Read after the current step's title. */
  current: string;
  /** Read after an upcoming step's title. */
  upcoming: string;
  /** Read after a step with a problem. */
  error: string;
};

type StepContext = {
  index: number;
  status: StepStatus;
  last: boolean;
  orientation: "horizontal" | "vertical";
  interactive: boolean;
  labels: StepperLabels;
  formatNumber: (value: number) => string;
  select: (index: number) => void;
};
const StepContext = React.createContext<StepContext | null>(null);

const stepperVariants = cva("m-0 flex list-none p-0", {
  variants: {
    orientation: { horizontal: "w-full flex-row items-start", vertical: "flex-col" },
  },
  defaultVariants: { orientation: "horizontal" },
});

type StepperProps = Omit<React.ComponentProps<"ol">, "onChange"> &
  VariantProps<typeof stepperVariants> & {
    /** The current step, from 0 (controlled). Earlier steps are completed, later ones upcoming. */
    value?: number;
    /** The current step at first (uncontrolled). Default 0. */
    defaultValue?: number;
    /**
     * Called with a step's index when someone chooses it. Passing it turns the steps into
     * buttons; leave it out for a display-only stepper.
     */
    onValueChange?: (value: number) => void;
    /** Words read after each step's title, for example "completed". Translate them on Arabic pages. */
    labels?: Partial<StepperLabels>;
    /** Turns a number into the digits shown, for example Arabic-Indic digits on Arabic pages. */
    formatNumber?: (value: number) => string;
    /**
     * The text in the ring of the compact form on narrow screens, for example "2 of 4". You
     * format the digits. Pass `false` to keep the full stepper at every width.
     */
    compactLabel?: false | ((step: number, total: number) => string);
    /** The prefix before the next step's name in the compact form, for example "Next:". */
    nextLabel?: string;
  };

const defaultLabels: StepperLabels = {
  completed: "completed",
  current: "current step",
  upcoming: "not started",
  error: "has a problem",
};

/**
 * Shows where someone is in a process (DGA: Progress Indicator), horizontal or vertical. Put
 * `StepperItem`s in order and set `value` to the current one: the earlier ones are completed and
 * the later ones upcoming, and an item can be marked `status="error"`. Each item announces its
 * state, and the current one has `aria-current="step"`. Below the `sm` width a horizontal stepper
 * folds into the compact radial form (DGA: Radial Stepper): a ring with "2 of 4", the step's name
 * and the next one. With `onValueChange` the steps are buttons, reachable with Tab.
 */
function Stepper({
  className,
  orientation = "horizontal",
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  labels,
  formatNumber = String,
  compactLabel = (step, total) => `${step} of ${total}`,
  nextLabel = "Next:",
  children,
  ...props
}: StepperProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = valueProp ?? inner;
  const items = React.Children.toArray(children).filter(React.isValidElement);
  const merged = { ...defaultLabels, ...labels };
  const select = (index: number) => {
    if (valueProp === undefined) setInner(index);
    onValueChange?.(index);
  };
  const list = (
    <ol
      data-slot="stepper"
      data-orientation={orientation}
      className={cn(
        stepperVariants({ orientation }),
        orientation === "horizontal" && compactLabel !== false && "max-sm:hidden",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => {
        const own = (item.props as { status?: StepStatus }).status;
        const status: StepStatus =
          own ?? (index < value ? "completed" : index === value ? "current" : "upcoming");
        return (
          <StepContext.Provider
            key={item.key ?? index}
            value={{
              index,
              status,
              last: index === items.length - 1,
              orientation: orientation ?? "horizontal",
              interactive: onValueChange !== undefined,
              labels: merged,
              formatNumber,
              select,
            }}
          >
            {item}
          </StepContext.Provider>
        );
      })}
    </ol>
  );
  if (orientation === "vertical" || compactLabel === false) return list;

  // The compact (radial) form for narrow screens.
  const total = items.length;
  const current = Math.min(Math.max(value, 0), total - 1);
  const read = (el?: React.ReactElement) =>
    el?.props as { title?: React.ReactNode; description?: React.ReactNode } | undefined;
  const now = read(items[current]);
  const next = read(items[current + 1]);
  const fraction = total === 0 ? 0 : (current + 1) / total;
  return (
    <>
      {list}
      <div data-slot="stepper-compact" className="hidden items-center gap-4 max-sm:flex">
        <div className="relative inline-flex size-16 shrink-0 items-center justify-center text-sm font-bold text-text-primary-paragraph tabular-nums" aria-hidden>
          <svg viewBox="0 0 100 100" aria-hidden focusable="false" className="absolute inset-0 size-full -rotate-90 rtl:-scale-x-100">
            <circle cx="50" cy="50" r="45" fill="none" className="stroke-border-neutral-primary [stroke-width:8]" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${fraction * 282.74} 282.74`}
              className="stroke-stepper-button-current [stroke-width:8]"
            />
          </svg>
          <span>{compactLabel(current + 1, total)}</span>
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="m-0 text-md font-semibold text-text-default" aria-live="polite">
            {now?.title}
          </p>
          {now?.description ? <p className="block text-sm text-text-primary-paragraph">{now.description}</p> : null}
          {next?.title ? (
            <p className="m-0 text-sm text-text-primary-paragraph">
              {nextLabel} {next.title}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

type StepperItemProps = Omit<React.ComponentProps<"li">, "title"> & {
  /** The step's name. */
  title: React.ReactNode;
  /** A line under the name. */
  description?: React.ReactNode;
  /** Forces a state, for example `error` when the step has a problem. Default: from `value`. */
  status?: StepStatus;
  /** The step cannot be chosen when the stepper has `onValueChange`. */
  disabled?: boolean;
};

/** One step. It must be a direct child of `Stepper`. */
function StepperItem({
  className,
  title,
  description,
  status: _status,
  disabled,
  ...props
}: StepperItemProps) {
  const step = React.useContext(StepContext);
  if (!step) throw new Error("StepperItem must be a direct child of Stepper");
  const { status, index, last, orientation, interactive, labels } = step;
  const marker =
    status === "completed" ? (
      <HugeiconsIcon icon={Tick02Icon} aria-hidden />
    ) : status === "error" ? (
      <HugeiconsIcon icon={Alert02Icon} aria-hidden />
    ) : (
      <span>{step.formatNumber(index + 1)}</span>
    );
  const body = (
    <>
      <span data-slot="stepper-indicator" className="z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-(--s-ring) bg-(--s-fill) text-md font-medium text-(--s-num) transition-colors tabular-nums motion-reduce:transition-none [&_svg]:size-5 in-data-[status=completed]:text-icon-oncolor in-data-[status=error]:text-icon-oncolor" aria-hidden>
        {marker}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-md font-medium text-(--s-title) in-data-[status=completed]:font-normal">{title}</span>
        <span className="sr-only"> ({labels[status]})</span>
        {description ? <span className="block text-sm text-text-primary-paragraph">{description}</span> : null}
      </span>
    </>
  );
  return (
    <li
      data-slot="stepper-item"
      data-status={status}
      data-orientation={orientation}
      data-last={last ? "" : undefined}
      aria-current={status === "current" ? "step" : undefined}
      className={cn("relative flex min-w-0 data-[orientation=horizontal]:flex-1 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:gap-progress-indicator-gap data-[orientation=vertical]:flex-row data-[orientation=vertical]:pb-6 data-[orientation=vertical]:last:pb-0 [--s-ring:var(--icon-default-500)] [--s-num:var(--text-primary-paragraph)] [--s-fill:transparent] [--s-title:var(--stepper-text-tertiary)] [--s-hover:var(--stepper-button-upcoming-hovered)] data-[status=completed]:[--s-hover:var(--stepper-button-completed-hovered)] data-[status=current]:[--s-hover:var(--stepper-button-current-hovered)] data-[status=completed]:[--s-ring:var(--stepper-button-completed)] data-[status=completed]:[--s-fill:var(--stepper-button-completed)] data-[status=completed]:[--s-title:var(--stepper-text-primary)] data-[status=current]:[--s-ring:var(--stepper-button-current)] data-[status=current]:[--s-num:var(--stepper-button-current)] data-[status=current]:[--s-title:var(--stepper-button-current)] data-[status=error]:[--s-ring:var(--background-error)] data-[status=error]:[--s-fill:var(--background-error)] data-[status=error]:[--s-title:var(--text-error)]", className)}
      {...props}
    >
      {interactive ? (
        <button
          type="button"
          disabled={disabled}
          className="relative flex min-w-0 gap-progress-indicator-gap rounded-sm border-0 bg-transparent p-0 text-start in-data-[orientation=horizontal]:flex-col in-data-[orientation=horizontal]:items-start in-data-[orientation=vertical]:flex-row [&:is(button)]:cursor-pointer [&:is(button)]:focus-visible:outline-2 [&:is(button)]:focus-visible:outline-solid [&:is(button)]:focus-visible:outline-offset-4 [&:is(button)]:focus-visible:outline-border-black [&:is(button):disabled]:cursor-not-allowed [&:is(button):disabled]:opacity-60 [&:is(button):hover_[data-slot=stepper-indicator]]:bg-(--s-hover) [&:is(button):hover_[data-slot=stepper-indicator]]:border-(--s-hover)"
          onClick={() => step.select(index)}
        >
          {body}
        </button>
      ) : (
        <div className="relative flex min-w-0 gap-progress-indicator-gap rounded-sm border-0 bg-transparent p-0 text-start in-data-[orientation=horizontal]:flex-col in-data-[orientation=horizontal]:items-start in-data-[orientation=vertical]:flex-row [&:is(button)]:cursor-pointer [&:is(button)]:focus-visible:outline-2 [&:is(button)]:focus-visible:outline-solid [&:is(button)]:focus-visible:outline-offset-4 [&:is(button)]:focus-visible:outline-border-black [&:is(button):disabled]:cursor-not-allowed [&:is(button):disabled]:opacity-60 [&:is(button):hover_[data-slot=stepper-indicator]]:bg-(--s-hover) [&:is(button):hover_[data-slot=stepper-indicator]]:border-(--s-hover)">{body}</div>
      )}
      {last ? null : <span aria-hidden className="pointer-events-none absolute bg-stepper-line-upcoming in-data-[status=completed]:bg-stepper-line-completed in-data-[orientation=horizontal]:inset-s-10 in-data-[orientation=horizontal]:top-4 in-data-[orientation=horizontal]:h-0.5 in-data-[orientation=horizontal]:w-[calc(100%-2.5rem)] in-data-[orientation=vertical]:inset-s-[calc(1rem-1px)] in-data-[orientation=vertical]:top-10 in-data-[orientation=vertical]:bottom-1 in-data-[orientation=vertical]:w-0.5" />}
    </li>
  );
}

export type { StepperItemProps, StepperProps, StepStatus };
export { Stepper, StepperItem, stepperVariants };
