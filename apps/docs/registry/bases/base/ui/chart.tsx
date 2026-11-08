"use client";

import * as React from "react";
import type { TooltipValueType } from "recharts";
import * as RechartsPrimitive from "recharts";
import { useDocumentDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;
type TooltipNameType = number | string;

/**
 * The four DGA chart series colours (tokens `chart-series-1` to `chart-series-4`). Each is at least
 * 3:1 against the page surfaces and against the series next to it, in light and dark. Series 1 and
 * 3 are the dark pair, 2 and 4 the light pair, so neighbours differ in lightness and not only hue.
 */
const CHART_SERIES = [
  "var(--chart-series-1)",
  "var(--chart-series-2)",
  "var(--chart-series-3)",
  "var(--chart-series-4)",
] as const;

type ChartMarker = "circle" | "square" | "triangle" | "diamond";
const CHART_MARKERS: ChartMarker[] = ["circle", "square", "triangle", "diamond"];

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    /** The shape of the series in the legend, the tooltip and the dots of a line. */
    marker?: ChartMarker;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

type ChartContextProps = { config: ChartConfig };
const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

/**
 * Props that put a chart in reading order for the page direction. In RTL the horizontal axis runs
 * from the right, the vertical axis sits on the right, and a pie turns the other way.
 *
 *     const { xAxisProps, yAxisProps } = useChartDirection();
 *     <XAxis dataKey="month" {...xAxisProps} />
 *     <YAxis {...yAxisProps} />
 */
function useChartDirection() {
  const rtl = useDocumentDirection() === "rtl";
  return {
    dir: rtl ? ("rtl" as const) : ("ltr" as const),
    rtl,
    xAxisProps: { reversed: rtl },
    yAxisProps: { orientation: rtl ? ("right" as const) : ("left" as const) },
    /** For Pie: the angles that make the slices run with the reading direction. */
    pieProps: rtl ? { startAngle: 90, endAngle: 450 } : { startAngle: 90, endAngle: -270 },
  };
}

/** False when the person prefers reduced motion. Pass it to `isAnimationActive`. */
function useChartAnimation() {
  const [animate, setAnimate] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return animate;
}

type ChartTableLabels = {
  /** The button that shows the table. */
  show: string;
  /** The button that hides the table. */
  hide: string;
};

type ChartTable = {
  /** The rows, one object per category. */
  data: Record<string, string | number>[];
  /** The key of the category in each row, such as `month`. */
  categoryKey: string;
  /** The heading of the category column. */
  categoryLabel?: React.ReactNode;
  /** The series to list. Defaults to every key of `config`. */
  keys?: string[];
};

type ChartContainerProps = Omit<React.ComponentProps<"div">, "title"> & {
  /** The series: their labels, colours and markers. Colours become `--color-<key>`. */
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  initialDimension?: { width: number; height: number };
  /** The accessible name of the chart, and the caption of its table. */
  title?: string;
  /** What the chart shows, in a sentence: the trend or the biggest value. Read after the name. */
  description?: string;
  /** The same data as a table: the accessible alternative to the picture. */
  table?: ChartTable;
  /**
   * `toggle` adds a button that shows the table below the chart. `hidden` keeps the table only
   * for screen readers. `none` leaves it out.
   */
  tableMode?: "toggle" | "hidden" | "none";
  /** Text of the table button. Translate it on Arabic pages. */
  tableLabels?: ChartTableLabels;
  /**
   * Lets the keyboard move through the points (arrow keys) and show the tooltip. The chart then
   * is a focusable group and not a picture, so the table is the only static alternative.
   */
  interactive?: boolean;
};

/**
 * A chart on Recharts (Platform Code extension, not part of DGA), with the DGA chart colours. Put
 * one Recharts chart inside (`BarChart`, `LineChart`, `AreaChart` or `PieChart`). By default the
 * chart is a picture for screen readers (`role="img"`, named by `title`, described by
 * `description`) and `table` gives the numbers.
 */
function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  title = "Chart",
  description,
  table,
  tableMode = "toggle",
  tableLabels = { show: "View as table", hide: "Hide table" },
  interactive = false,
  ...props
}: ChartContainerProps) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
  const descriptionId = `${chartId}-description`;
  const tableId = `${chartId}-table`;
  const [open, setOpen] = React.useState(false);
  // The picture is not a keyboard widget unless `interactive`: switch the Recharts layer to match.
  const chart = React.isValidElement<{ accessibilityLayer?: boolean }>(children)
    ? React.cloneElement(children, {
        accessibilityLayer: children.props.accessibilityLayer ?? interactive,
      })
    : children;
  return (
    <ChartContext.Provider value={{ config }}>
      <div data-slot="chart-root" className="flex w-full min-w-0 flex-col gap-3">
        {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: the role is img or group, both take a name */}
        <div
          data-slot="chart"
          data-chart={chartId}
          role={interactive ? "group" : "img"}
          {...(interactive ? { "aria-roledescription": "chart" } : {})}
          aria-label={title}
          aria-describedby={description ? descriptionId : undefined}
          dir="ltr"
          className={cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-text-primary-paragraph [&_.recharts-cartesian-grid_line]:stroke-border-neutral-secondary [&_.recharts-cartesian-axis-line]:stroke-border-neutral-primary [&_.recharts-cartesian-axis-tick-line]:stroke-border-neutral-primary [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border-neutral-primary [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-background-neutral-100 [&_.recharts-sector]:stroke-background-white [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden [&_svg:focus-visible]:outline-2 [&_svg:focus-visible]:outline-solid [&_svg:focus-visible]:outline-offset-2 [&_svg:focus-visible]:outline-border-black", className)}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer initialDimension={initialDimension}>
            {chart}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
        {description ? (
          <p id={descriptionId} className="sr-only">
            {description}
          </p>
        ) : null}
        {table && tableMode !== "none" ? (
          <>
            {tableMode === "toggle" ? (
              <button
                type="button"
                data-slot="chart-table-toggle"
                className="inline-flex min-h-6 w-fit cursor-pointer items-center rounded-xs border-0 bg-transparent p-0 text-sm font-medium text-link-primary underline underline-offset-4 hover:text-link-primary-hovered active:text-link-primary-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black"
                aria-expanded={open}
                aria-controls={tableId}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? tableLabels.hide : tableLabels.show}
              </button>
            ) : null}
            <ChartDataTable
              id={tableId}
              caption={title}
              config={config}
              table={table}
              className={tableMode === "hidden" ? "sr-only" : undefined}
              hidden={tableMode === "toggle" && !open}
            />
          </>
        ) : null}
      </div>
    </ChartContext.Provider>
  );
}

/** The chart's data as a table. `ChartContainer` renders it from its `table` prop. */
function ChartDataTable({
  config,
  table,
  caption,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  config: ChartConfig;
  table: ChartTable;
  caption?: string;
}) {
  const keys = table.keys ?? Object.keys(config);
  return (
    <div data-slot="chart-table" className={cn("max-w-full overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_caption]:pb-2 [&_caption]:text-start [&_caption]:font-semibold [&_caption]:text-text-display [&_th]:border-b [&_th]:border-border-neutral-primary [&_th]:px-3 [&_th]:py-2 [&_th]:text-start [&_th]:font-semibold [&_th]:text-text-display [&_td]:border-b [&_td]:border-border-neutral-secondary [&_td]:px-3 [&_td]:py-2 [&_td]:text-text-primary-paragraph", className)} {...props}>
      <table>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            <th scope="col">{table.categoryLabel ?? table.categoryKey}</th>
            {keys.map((key) => (
              <th key={key} scope="col">
                {config[key]?.label ?? key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.data.map((row) => (
            <tr key={String(row[table.categoryKey])}>
              <th scope="row">{row[table.categoryKey]}</th>
              {keys.map((key) => (
                <td key={key}>
                  <bdi dir="ltr">{row[key]}</bdi>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, entry]) => entry.theme ?? entry.color);
  if (!colorConfig.length) return null;
  return (
    <style
      // biome-ignore lint/security/noDangerouslySetInnerHtml: builds a rule from the config, as shadcn does
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

/** A small shape that marks a series in the legend and the tooltip. */
function ChartSwatch({
  marker = "square",
  color,
  className,
}: {
  marker?: ChartMarker;
  color?: string;
  className?: string;
}) {
  const shape = {
    circle: <circle cx="6" cy="6" r="5" />,
    square: <rect x="1" y="1" width="10" height="10" rx="1" />,
    triangle: <path d="M6 1 11 11H1z" />,
    diamond: <path d="M6 0.5 11.5 6 6 11.5 0.5 6z" />,
  }[marker];
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      data-slot="chart-swatch"
      className={cn("size-2.5 shrink-0", className)}
      style={{ fill: color }}
    >
      {shape}
    </svg>
  );
}

/**
 * A dot for a line, in the shape of the series, so lines that cross are told apart without
 * colour: `<Line dot={<ChartDot marker="square" />} activeDot={…} />`.
 */
function ChartDot({
  cx = 0,
  cy = 0,
  stroke,
  fill,
  marker = "circle",
  size = 5,
}: {
  cx?: number;
  cy?: number;
  stroke?: string;
  fill?: string;
  marker?: ChartMarker;
  size?: number;
}) {
  const color = stroke ?? fill;
  const s = size;
  const shape = {
    circle: <circle cx={cx} cy={cy} r={s} />,
    square: <rect x={cx - s} y={cy - s} width={s * 2} height={s * 2} rx={1} />,
    triangle: <path d={`M${cx} ${cy - s - 1}L${cx + s + 1} ${cy + s}H${cx - s - 1}z`} />,
    diamond: (
      <path
        d={`M${cx} ${cy - s - 1}L${cx + s + 1} ${cy}L${cx} ${cy + s + 1}L${cx - s - 1} ${cy}z`}
      />
    ),
  }[marker];
  return <g fill={color}>{shape}</g>;
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<TooltipValueType, TooltipNameType>,
    "accessibilityLayer"
  >) {
  const { config } = useChart();
  const { dir } = useChartDirection();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string" ? (config[label]?.label ?? label) : itemConfig?.label;
    if (labelFormatter) {
      return (
        <div className={cn("font-semibold text-text-display", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }
    if (!value) return null;
    return <div className={cn("font-semibold text-text-display", labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) return null;
  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div dir={dir} data-slot="chart-tooltip" className={cn("grid min-w-36 items-start gap-1.5 rounded-md border border-border-neutral-primary bg-background-card px-3 py-2 text-xs text-text-default shadow-2xl", className)}>
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color ?? item.payload?.fill ?? item.color;
            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: two series can share a name
                key={`${key}-${index}`}
                className={cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5", indicator === "dot" && "items-center")}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator &&
                      (itemConfig?.marker && indicator === "dot" ? (
                        <ChartSwatch marker={itemConfig.marker} color={indicatorColor} />
                      ) : (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      ))
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between gap-4 leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5 text-text-primary-paragraph">
                        {nestLabel ? tooltipLabel : null}
                        <span>{itemConfig?.label ?? item.name}</span>
                      </div>
                      {item.value != null && (
                        <bdi dir="ltr" className="font-semibold text-text-display tabular-nums">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString("en-US")
                            : String(item.value)}
                        </bdi>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  nameKey?: string;
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart();
  const { dir } = useChartDirection();
  if (!payload?.length) return null;
  return (
    <div
      dir={dir}
      data-slot="chart-legend"
      className={cn("flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-text-primary-paragraph", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: two series can share a name
            <div key={`${key}-${index}`} className="flex items-center gap-1.5 [&>svg]:size-3">
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <ChartSwatch marker={itemConfig?.marker} color={item.color} />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) return undefined;
  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;
  let configLabelKey: string = key;
  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export type { ChartContainerProps, ChartMarker, ChartTable, ChartTableLabels };
export {
  CHART_MARKERS,
  CHART_SERIES,
  ChartContainer,
  ChartDataTable,
  ChartDot,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartSwatch,
  ChartTooltip,
  ChartTooltipContent,
  useChartAnimation,
  useChartDirection,
};
