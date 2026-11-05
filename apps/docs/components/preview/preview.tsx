"use client";

import {
  ArrowExpandDiagonal01Icon,
  ComputerIcon,
  Moon02Icon,
  Refresh01Icon,
  SmartPhone01Icon,
  Sun03Icon,
  Tablet01Icon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import { useTheme } from "next-themes";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@/components/shell/icon";
import { useLocale, useT } from "@/lib/locale-context";
import {
  type Direction,
  isPreviewMessage,
  type PreviewMessage,
  type Theme,
  VIEWPORTS,
  type Viewport,
} from "@/lib/preview";
import { Button } from "@/registry/bases/base/ui/button";

type Option<T extends string> = { value: T; label: string; icon: IconSvgElement };

function Segmented<T extends string>({
  label,
  legend,
  value,
  options,
  onChange,
  iconOnly = false,
}: {
  label: string;
  /** Visible to screen readers: the name of the group. */
  legend: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  /** Show only the icons (the label stays as the accessible name and the tooltip). */
  iconOnly?: boolean;
}) {
  return (
    <fieldset className="inline-flex items-center rounded-sm border border-border bg-background p-0.5">
      <legend className="sr-only">{legend}</legend>
      {options.map((option) => (
        <label
          key={option.value}
          title={option.label}
          className={cn(
            "inline-flex min-h-7 cursor-pointer items-center gap-1 rounded-xs px-2 py-1 text-[0.8125rem] font-medium text-muted-foreground transition-colors",
            "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-border-black",
            option.value === value
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent hover:text-accent-foreground active:bg-button-background-neutral-pressed",
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
          <Icon icon={option.icon} />
          <span className={iconOnly ? "sr-only" : "hidden sm:inline"}>{option.label}</span>
          {iconOnly ? null : <span className="sr-only sm:hidden">{option.label}</span>}
        </label>
      ))}
    </fieldset>
  );
}

function useOptions() {
  const t = useT();
  const directions: Option<Direction>[] = [
    { value: "ltr", label: t("preview.ltr"), icon: TextAlignLeftIcon },
    { value: "rtl", label: t("preview.rtl"), icon: TextAlignRightIcon },
  ];
  const themes: Option<Theme>[] = [
    { value: "light", label: t("preview.light"), icon: Sun03Icon },
    { value: "dark", label: t("preview.dark"), icon: Moon02Icon },
  ];
  const viewports: Option<Viewport>[] = [
    { value: "mobile", label: t("preview.mobile"), icon: SmartPhone01Icon },
    { value: "tablet", label: t("preview.tablet"), icon: Tablet01Icon },
    { value: "desktop", label: t("preview.desktop"), icon: ComputerIcon },
  ];
  return { directions, themes, viewports };
}

/** Last measured content height per preview, width and direction, so a revisit does not jump. */
const heightCache = new Map<string, number>();

/** Space the device outline takes around a mobile or tablet frame (padding + border). */
const DEVICE_CHROME = 20;

/** The docs theme, read after mount (the server cannot know it). */
function useDocsTheme(): Theme | null {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && resolvedTheme ? (resolvedTheme === "dark" ? "dark" : "light") : null;
}

/** True once the element is within 400px of the viewport. Below-the-fold previews wait. */
function useNear(ref: React.RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) return setNear(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true);
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near, ref]);
  return near;
}

/**
 * The preview iframe at a fixed width, scaled down to fit its container. Until the frame has
 * loaded (and until it is near the viewport) a skeleton with the frame's height holds the
 * space, so nothing flashes blank or jumps. Direction and theme are pushed in with
 * postMessage, so changing them never reloads the frame.
 */
export function PreviewFrame({
  name,
  title,
  dir,
  theme,
  width,
  minHeight = 64,
  chrome = 0,
  reloadKey = 0,
  onHeight,
  className,
}: {
  name: string;
  title: string;
  dir: Direction;
  theme: Theme;
  /** Viewport width the content is laid out at. */
  width: number;
  minHeight?: number;
  /** Pixels of the container the frame must leave free (for a device outline). */
  chrome?: number;
  /** Change to reload the frame. */
  reloadKey?: number;
  /** Reports the scaled height, so the container can size itself. */
  onHeight?: (height: number) => void;
  className?: string;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const { dir: pageDir } = useLocale();
  const near = useNear(box);
  const [available, setAvailable] = useState(0);
  const cacheKey = `${name}:${width}`;
  const [height, setHeight] = useState(() => heightCache.get(cacheKey) ?? minHeight);
  const [loaded, setLoaded] = useState(false);
  // The source is built once, in the theme the docs have when the frame first loads.
  const [src, setSrc] = useState<string | null>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: the first theme and direction are enough for src.
  useEffect(() => {
    if (near && src === null) setSrc(`/preview/${name}?dir=${dir}&theme=${theme}`);
  }, [near, src]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: reload on key change only.
  useEffect(() => {
    if (reloadKey > 0) {
      setLoaded(false);
      setSrc(`/preview/${name}?dir=${dir}&theme=${theme}&r=${reloadKey}`);
    }
  }, [reloadKey]);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setAvailable(entry?.contentRect.width ?? 0));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cached = heightCache.get(cacheKey);
    setHeight(cached ?? minHeight);
  }, [cacheKey, minHeight]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || !isPreviewMessage(event.data)) return;
      if (event.data.type === "dga-preview:height") {
        const next = Math.max(minHeight, event.data.height);
        heightCache.set(cacheKey, next);
        setHeight(next);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [minHeight, cacheKey]);

  const post = () => {
    const message: PreviewMessage = { type: "dga-preview:set", dir, theme };
    frame.current?.contentWindow?.postMessage(message, window.location.origin);
  };
  useEffect(post, [dir, theme]);

  const scale = available > 0 ? Math.min(1, (available - chrome) / width) : 1;
  const scaled = height * scale;
  useEffect(() => onHeight?.(scaled), [scaled, onHeight]);

  return (
    <div
      ref={box}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ blockSize: scaled }}
    >
      <div
        className="absolute inset-y-0 start-0 overflow-hidden"
        style={{ inlineSize: width * scale }}
      >
        {!loaded && (
          <div
            aria-hidden
            data-slot="skeleton"
            className="absolute inset-0 z-10 bg-skeleton-background motion-safe:animate-pulse"
          />
        )}
        {src && (
          <iframe
            ref={frame}
            src={src}
            title={title}
            loading="lazy"
            onLoad={() => {
              post();
              setLoaded(true);
            }}
            className={cn(
              "block border-0 bg-background transition-opacity duration-150",
              loaded ? "opacity-100" : "opacity-0",
            )}
            style={{
              inlineSize: width,
              blockSize: height,
              transform: `scale(${scale})`,
              transformOrigin: pageDir === "rtl" ? "100% 0" : "0 0",
            }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Renders /preview/{name} in an iframe so media queries see the chosen viewport width. Mobile
 * and tablet frames are centred inside a subtle device outline; the frame height follows the
 * content. Fullscreen opens the preview in a new tab and Reset restores the defaults and
 * reloads the frame (which also replays any animation).
 */
export function Preview({
  name,
  title,
  defaultDir,
  defaultViewport,
  minHeight = 64,
  compact = false,
  children,
}: {
  name: string;
  title?: string;
  /** No toolbar: a small control cluster in the corner instead. For examples under the main preview. */
  compact?: boolean;
  defaultDir?: Direction;
  /** Defaults to desktop: the column's width, unscaled. */
  defaultViewport?: Viewport;
  minHeight?: number;
  children?: ReactNode;
}) {
  const docsTheme = useDocsTheme();
  const t = useT();
  const { dir: pageDir } = useLocale();
  const { directions, themes, viewports } = useOptions();
  // The preview opens in the page's own direction: RTL on Arabic pages.
  const initialDir: Direction = defaultDir ?? pageDir;
  const [dir, setDir] = useState<Direction>(initialDir);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [chosenViewport, setViewport] = useState<Viewport | null>(defaultViewport ?? null);
  const [available, setAvailable] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const stage = useRef<HTMLDivElement>(null);

  const activeTheme: Theme = theme ?? docsTheme ?? "light";
  // Desktop is the column's own width at full size (up to 1280px), never scaled down, so
  // text stays readable. Mobile and tablet are real device widths, scaled only when they
  // do not fit.
  const viewport: Viewport = chosenViewport ?? "desktop";
  const width =
    viewport === "desktop"
      ? Math.max(320, Math.min(VIEWPORTS.desktop.width, Math.floor(available) || 640))
      : VIEWPORTS[viewport].width;
  const device = viewport !== "desktop";
  const chrome = device ? DEVICE_CHROME : 0;
  const scale = available > 0 ? Math.min(1, (available - chrome) / width) : 1;

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setAvailable(entry?.contentRect.width ?? 0));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reset = () => {
    setDir(initialDir);
    setTheme(null);
    setViewport(defaultViewport ?? null);
    setReloadKey((n) => n + 1);
  };

  const label = title ?? name;
  const other: Direction = dir === "ltr" ? "rtl" : "ltr";
  const fullscreenHref = `/preview/${name}?dir=${dir}&theme=${activeTheme}`;

  return (
    <figure
      data-preview={name}
      className="not-prose group/preview relative my-5 overflow-hidden rounded-md border border-border bg-card"
    >
      {compact ? (
        <>
          <figcaption className="sr-only">{label}</figcaption>
          <div className="absolute end-1.5 top-1.5 z-20 flex items-center gap-0.5 rounded-sm border border-border bg-card p-0.5 opacity-0 transition-opacity group-hover/preview:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100">
            <Button
              variant="subtle"
              size="sm"
              onClick={() => setDir(dir === "ltr" ? "rtl" : "ltr")}
              aria-label={t("preview.toggleDir", {
                dir: dir.toUpperCase(),
                other: other.toUpperCase(),
              })}
              title={t("preview.toggleDirTitle")}
            >
              {dir.toUpperCase()}
            </Button>
            <Button
              variant="subtle"
              size="sm"
              iconOnly
              onClick={reset}
              aria-label={t("preview.reset", { name: label })}
              title={t("preview.resetTitle")}
            >
              <Icon icon={Refresh01Icon} />
            </Button>
            <Button
              variant="subtle"
              size="sm"
              iconOnly
              nativeButton={false}
              aria-label={t("preview.fullscreen", { name: label })}
              title={t("preview.fullscreenTitle")}
              render={<a href={fullscreenHref} target="_blank" rel="noopener noreferrer" />}
            >
              <Icon icon={ArrowExpandDiagonal01Icon} />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b border-border bg-muted px-3 py-1.5">
          <figcaption className="text-sm font-medium text-foreground">{label}</figcaption>
          <div className="flex flex-wrap items-center gap-1.5">
            <Segmented
              label={`${name}-direction`}
              legend={t("preview.direction")}
              value={dir}
              options={directions}
              onChange={setDir}
            />
            <Segmented
              label={`${name}-theme`}
              legend={t("preview.theme")}
              value={activeTheme}
              options={themes}
              onChange={setTheme}
              iconOnly
            />
            <Segmented
              label={`${name}-viewport`}
              legend={t("preview.viewport")}
              value={viewport}
              options={viewports}
              onChange={setViewport}
              iconOnly
            />
            <div className="flex items-center gap-0.5">
              <Button
                variant="subtle"
                size="sm"
                iconOnly
                onClick={reset}
                aria-label={t("preview.reset", { name: label })}
                title={t("preview.resetTitle")}
              >
                <Icon icon={Refresh01Icon} />
              </Button>
              <Button
                variant="subtle"
                size="sm"
                iconOnly
                nativeButton={false}
                aria-label={t("preview.fullscreen", { name: label })}
                title={t("preview.fullscreenTitle")}
                render={<a href={fullscreenHref} target="_blank" rel="noopener noreferrer" />}
              >
                <Icon icon={ArrowExpandDiagonal01Icon} />
              </Button>
            </div>
          </div>
        </div>
      )}
      <div ref={stage} className={cn("w-full", device && "bg-muted py-4")}>
        <div
          className={cn(
            "mx-auto overflow-hidden",
            device &&
              "rounded-[1.25rem] border border-border-neutral-primary bg-background p-2 ring-4 ring-border-neutral-tertiary",
          )}
          style={{ inlineSize: device ? width * scale + chrome : undefined }}
        >
          <div className={cn("overflow-hidden", device && "rounded-[0.75rem]")}>
            <PreviewFrame
              name={name}
              title={label}
              dir={dir}
              theme={activeTheme}
              width={width}
              minHeight={minHeight}
              reloadKey={reloadKey}
            />
          </div>
        </div>
      </div>
      {device ? (
        <div className="border-t border-border px-3 py-1 text-[0.8125rem] text-muted-foreground">
          {t(`preview.${viewport}`)} · {width}px
          {scale < 1 ? ` · ${t("preview.shownAt", { percent: Math.round(scale * 100) })}` : ""}
        </div>
      ) : null}
      {children}
    </figure>
  );
}

/**
 * LTR and RTL side by side, for the RTL section of a component page. The theme follows the
 * docs; the viewport is mobile so both frames fit next to each other.
 */
export function DirectionCompare({
  name,
  title,
  minHeight = 64,
}: {
  name: string;
  title: string;
  minHeight?: number;
}) {
  const t = useT();
  const theme = useDocsTheme() ?? "light";
  return (
    <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
      {(["ltr", "rtl"] as const).map((dir) => (
        <figure
          key={dir}
          className="overflow-hidden rounded-md border border-border bg-card"
          data-preview-direction={dir}
        >
          <figcaption className="border-b border-border bg-muted px-3 py-1 text-[0.8125rem] font-medium text-foreground">
            {dir === "ltr" ? t("preview.comparisonLtr") : t("preview.comparisonRtl")}
          </figcaption>
          <PreviewFrame
            name={name}
            title={`${title} (${dir.toUpperCase()})`}
            dir={dir}
            theme={theme}
            width={VIEWPORTS.mobile.width}
            minHeight={minHeight}
          />
        </figure>
      ))}
    </div>
  );
}
