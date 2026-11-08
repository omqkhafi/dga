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

const stepperVariants = cva("cn-stepper", {
  variants: {
    orientation: { horizontal: "cn-stepper-horizontal", vertical: "cn-stepper-vertical" },
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
      <div data-slot="stepper-compact" className="cn-stepper-compact">
        <div className="cn-stepper-ring" aria-hidden>
          <svg viewBox="0 0 100 100" focusable="false" className="cn-stepper-ring-svg">
            <circle cx="50" cy="50" r="45" fill="none" className="cn-stepper-ring-track" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${fraction * 282.74} 282.74`}
              className="cn-stepper-ring-indicator"
            />
          </svg>
          <span>{compactLabel(current + 1, total)}</span>
        </div>
        <div className="cn-stepper-compact-text">
          <p className="cn-stepper-compact-title" aria-live="polite">
            {now?.title}
          </p>
          {now?.description ? <p className="cn-stepper-description">{now.description}</p> : null}
          {next?.title ? (
            <p className="cn-stepper-next">
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
      <span data-slot="stepper-indicator" className="cn-stepper-indicator" aria-hidden>
        {marker}
      </span>
      <span className="cn-stepper-text">
        <span className="cn-stepper-title">{title}</span>
        <span className="sr-only"> ({labels[status]})</span>
        {description ? <span className="cn-stepper-description">{description}</span> : null}
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
      className={cn("cn-stepper-item", className)}
      {...props}
    >
      {interactive ? (
        <button
          type="button"
          disabled={disabled}
          className="cn-stepper-step"
          onClick={() => step.select(index)}
        >
          {body}
        </button>
      ) : (
        <div className="cn-stepper-step">{body}</div>
      )}
      {last ? null : <span aria-hidden className="cn-stepper-line" />}
    </li>
  );
}

export type { StepperItemProps, StepperProps, StepStatus };
export { Stepper, StepperItem, stepperVariants };
