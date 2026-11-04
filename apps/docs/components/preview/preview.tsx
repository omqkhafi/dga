"use client";

import {
  ComputerIcon,
  Moon02Icon,
  SmartPhone01Icon,
  Sun03Icon,
  Tablet01Icon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import { useTheme } from "next-themes";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  type Direction,
  isPreviewMessage,
  type PreviewMessage,
  type Theme,
  VIEWPORTS,
  type Viewport,
} from "@/lib/preview";

type Option<T extends string> = { value: T; label: string; icon: IconSvgElement };

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="inline-flex items-center rounded-sm border border-border bg-background p-0.5">
      <legend className="sr-only">{label}</legend>
      {options.map((option) => (
        <label
          key={option.value}
          title={option.label}
          className={cn(
            "inline-flex cursor-pointer items-center gap-1 rounded-xs px-2 py-1 text-xs font-medium text-muted-foreground transition-colors",
            "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
            option.value === value
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <input
            type="radio"
            className="sr-only"
            name={label}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
          <HugeiconsIcon icon={option.icon} size={14} strokeWidth={1.8} aria-hidden />
          <span className="hidden sm:inline">{option.label}</span>
          <span className="sr-only sm:hidden">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

const DIRECTIONS: Option<Direction>[] = [
  { value: "ltr", label: "LTR", icon: TextAlignLeftIcon },
  { value: "rtl", label: "RTL", icon: TextAlignRightIcon },
];
const THEMES: Option<Theme>[] = [
  { value: "light", label: "Light", icon: Sun03Icon },
  { value: "dark", label: "Dark", icon: Moon02Icon },
];
const VIEWPORT_OPTIONS: Option<Viewport>[] = [
  { value: "mobile", label: VIEWPORTS.mobile.label, icon: SmartPhone01Icon },
  { value: "tablet", label: VIEWPORTS.tablet.label, icon: Tablet01Icon },
  { value: "desktop", label: VIEWPORTS.desktop.label, icon: ComputerIcon },
];

/**
 * Renders /preview/{name} in an iframe so media queries see the chosen viewport width.
 * Direction and theme are pushed in with postMessage, so toggling never reloads the frame.
 */
export function Preview({
  name,
  title,
  defaultDir = "ltr",
  defaultViewport,
  minHeight = 160,
  children,
}: {
  name: string;
  title?: string;
  defaultDir?: Direction;
  /** Omit to pick the largest viewport that fits at 75% scale or more. */
  defaultViewport?: Viewport;
  minHeight?: number;
  children?: ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [dir, setDir] = useState<Direction>(defaultDir);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [chosenViewport, setViewport] = useState<Viewport | null>(defaultViewport ?? null);
  const [available, setAvailable] = useState(0);
  const [height, setHeight] = useState(minHeight);
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // Built after mount, once the docs theme is known, so the frame opens in the right theme.
  const [src, setSrc] = useState<string | null>(null);

  // The server cannot know the docs theme, so read it only after mount (avoids a hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const activeTheme: Theme = theme ?? (mounted && resolvedTheme === "dark" ? "dark" : "light");
  const fitting = (["desktop", "tablet"] as const).find(
    (v) => available >= VIEWPORTS[v].width * 0.75,
  );
  const viewport: Viewport = chosenViewport ?? fitting ?? "mobile";
  const width = VIEWPORTS[viewport].width;
  const scale = available > 0 ? Math.min(1, available / width) : 1;

  // biome-ignore lint/correctness/useExhaustiveDependencies: only the first theme matters for src.
  useEffect(() => {
    if (src === null && mounted && resolvedTheme)
      setSrc(`/preview/${name}?dir=${dir}&theme=${activeTheme}`);
  }, [resolvedTheme, mounted]);

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setAvailable(entry?.contentRect.width ?? 0));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || !isPreviewMessage(event.data)) return;
      if (event.data.type === "dga-preview:height")
        setHeight(Math.max(minHeight, event.data.height));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [minHeight]);

  const post = () => {
    const message: PreviewMessage = { type: "dga-preview:set", dir, theme: activeTheme };
    frame.current?.contentWindow?.postMessage(message, window.location.origin);
  };
  useEffect(post, [dir, activeTheme]);

  // Scale from the inline-start corner so the frame stays aligned in RTL pages too.
  const origin = typeof document !== "undefined" && document.dir === "rtl" ? "100% 0" : "0 0";

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-md border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted px-3 py-2">
        <figcaption className="text-sm font-medium text-foreground">
          {title ?? "Preview"}
        </figcaption>
        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            label={`${name}-direction`}
            value={dir}
            options={DIRECTIONS}
            onChange={setDir}
          />
          <Segmented
            label={`${name}-theme`}
            value={activeTheme}
            options={THEMES}
            onChange={setTheme}
          />
          <Segmented
            label={`${name}-viewport`}
            value={viewport}
            options={VIEWPORT_OPTIONS}
            onChange={setViewport}
          />
        </div>
      </div>
      <div ref={stage} className="w-full overflow-hidden" style={{ blockSize: height * scale }}>
        {src && (
          <iframe
            ref={frame}
            src={src}
            title={title ?? name}
            onLoad={post}
            className="block border-0"
            style={{
              inlineSize: width,
              blockSize: height,
              transform: `scale(${scale})`,
              transformOrigin: origin,
            }}
          />
        )}
      </div>
      <div className="border-t border-border px-3 py-1.5 text-xs text-muted-foreground">
        {VIEWPORTS[viewport].label} · {width}px
        {scale < 1 ? ` · shown at ${Math.round(scale * 100)}%` : ""}
      </div>
      {children}
    </figure>
  );
}
