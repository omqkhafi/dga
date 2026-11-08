// biome-ignore-all lint/a11y/useSemanticElements: the WAI-ARIA carousel pattern uses role=group for each slide and for the dots, with aria-roledescription
"use client";

import { ArrowLeft01Icon, ArrowRight01Icon, PauseIcon, PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useDocumentDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const arrowVariants = cva("cn-carousel-arrow", {
  variants: {
    arrowStyle: { primary: "cn-carousel-arrow-primary", subtle: "cn-carousel-arrow-subtle" },
    size: { sm: "cn-carousel-arrow-sm", md: "cn-carousel-arrow-md", lg: "cn-carousel-arrow-lg" },
  },
  defaultVariants: { arrowStyle: "primary", size: "md" },
});

/** Pixels of horizontal movement that count as a swipe. */
const SWIPE_DISTANCE = 40;

/**
 * Which way a swipe moves the carousel: `1` for the next slide, `-1` for the previous one and
 * `0` when the finger moved too little. `dx` is the horizontal movement in pixels (positive
 * towards the physical right edge of the screen). Content moves with the finger, so a swipe
 * towards the left edge shows the next slide on a page that reads left to right and the previous
 * one on a page that reads right to left.
 */
function getSwipeStep(dx: number, rtl: boolean): -1 | 0 | 1 {
  if (Math.abs(dx) < SWIPE_DISTANCE) return 0;
  const toNext = rtl ? dx > 0 : dx < 0;
  return toNext ? 1 : -1;
}

type CarouselProps = Omit<React.ComponentProps<"section">, "onChange"> &
  VariantProps<typeof arrowVariants> & {
    /**
     * What to show under (and beside) the slides: `arrows` (previous and next beside the slides),
     * `dots` (arrows and the dot row) or `dots-only`.
     */
    controls?: "arrows" | "dots" | "dots-only";
    /** The visible slide, from 0 (controlled). */
    index?: number;
    /** The slide shown at first (uncontrolled). Default 0. */
    defaultIndex?: number;
    /** Called with the new slide index. */
    onIndexChange?: (index: number) => void;
    /** Moves on by itself every this many milliseconds. 0 (default) turns it off. */
    autoPlay?: number;
    /** Wraps from the last slide to the first, and back. Default false. */
    loop?: boolean;
    /** Name of the previous button. Translate it on Arabic pages. */
    previousLabel?: string;
    /** Name of the next button. */
    nextLabel?: string;
    /** Name of the pause button (shown while it plays). */
    pauseLabel?: string;
    /** Name of the play button (shown while it is paused). */
    playLabel?: string;
    /** Name of each slide, for example "1 of 5". */
    slideLabel?: (index: number, count: number) => string;
    /** Name of each dot, for example "Go to slide 2". */
    dotLabel?: (index: number, count: number) => string;
    /** The name of the row of dots. */
    dotsLabel?: string;
    /** The size of the dots: 8, 12 or 16px. Default `md`. */
    dotSize?: "sm" | "md" | "lg";
    /** The slides: each child is one slide. */
    children?: React.ReactNode;
  };

/**
 * Browse a set of slides (DGA: Carousel). Previous and next buttons, a row of dots, autoplay
 * with a pause button, swipe on touch screens, and Left and Right arrow keys (swapped on Arabic
 * pages) while focus is inside. Slides follow the page direction: the first one is on the right
 * in Arabic. Autoplay stops while the pointer or focus is inside, and does not start when the
 * person prefers reduced motion. Name it with `aria-label`. Each child is one slide.
 */
function Carousel({
  className,
  controls = "dots",
  arrowStyle,
  size,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  autoPlay = 0,
  loop = false,
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  pauseLabel = "Pause slideshow",
  playLabel = "Start slideshow",
  slideLabel = (i, n) => `${i + 1} of ${n}`,
  dotLabel = (i) => `Go to slide ${i + 1}`,
  dotsLabel = "Slides",
  dotSize = "md",
  children,
  onKeyDown,
  ...props
}: CarouselProps) {
  const slides = React.Children.toArray(children);
  const count = slides.length;
  const rtl = useDocumentDirection() === "rtl";
  const [inner, setInner] = React.useState(defaultIndex);
  const index = Math.min(Math.max(indexProp ?? inner, 0), Math.max(count - 1, 0));
  const [playing, setPlaying] = React.useState(autoPlay > 0);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const pointer = React.useRef<{ x: number; id: number } | null>(null);

  const go = React.useCallback(
    (target: number) => {
      if (count === 0) return;
      const next = loop ? (target + count) % count : Math.min(Math.max(target, 0), count - 1);
      if (next === index) return;
      if (indexProp === undefined) setInner(next);
      onIndexChange?.(next);
    },
    [count, index, indexProp, loop, onIndexChange],
  );

  // Reduced motion: never start by itself. Checked after mount, so the server markup is stable.
  React.useEffect(() => {
    if (autoPlay > 0 && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    }
  }, [autoPlay]);

  const running = autoPlay > 0 && playing && !hovered && !focused && count > 1;
  React.useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(
      () => go(index + 1 >= count && !loop ? 0 : index + 1),
      autoPlay,
    );
    return () => window.clearInterval(timer);
  }, [running, autoPlay, go, index, count, loop]);

  const atStart = !loop && index === 0;
  const atEnd = !loop && index === count - 1;
  const showArrows = controls !== "dots-only";
  const showDots = controls !== "arrows";
  const forward = rtl ? "ArrowLeft" : "ArrowRight";
  const backward = rtl ? "ArrowRight" : "ArrowLeft";

  const arrow = (direction: "previous" | "next") => {
    const isPrevious = direction === "previous";
    const disabled = isPrevious ? atStart : atEnd;
    return (
      <button
        type="button"
        data-slot={`carousel-${direction}`}
        className={arrowVariants({ arrowStyle, size })}
        data-side={isPrevious ? "start" : "end"}
        aria-label={isPrevious ? previousLabel : nextLabel}
        disabled={disabled}
        onClick={() => go(isPrevious ? index - 1 : index + 1)}
      >
        <HugeiconsIcon
          icon={isPrevious ? ArrowLeft01Icon : ArrowRight01Icon}
          aria-hidden
          className="cn-carousel-arrow-icon"
        />
      </button>
    );
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: the keys and pointer events are shortcuts; every control inside is a real button
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: a section named by aria-label is a region, which supports aria-roledescription
    <section
      data-slot="carousel"
      data-controls={controls}
      aria-roledescription="carousel"
      className={cn("cn-carousel", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
        const target = event.target as HTMLElement;
        if (target.closest("input, textarea, select, [contenteditable='true']")) return;
        let next: number | undefined;
        if (event.key === forward) next = index + 1;
        else if (event.key === backward) next = index - 1;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = count - 1;
        if (next === undefined) return;
        event.preventDefault();
        go(next);
      }}
      {...props}
    >
      <div className="cn-carousel-stage">
        {showArrows ? arrow("previous") : null}
        <div
          data-slot="carousel-viewport"
          className="cn-carousel-viewport"
          aria-live={running ? "off" : "polite"}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse") return;
            pointer.current = { x: event.clientX, id: event.pointerId };
          }}
          onPointerUp={(event) => {
            const start = pointer.current;
            pointer.current = null;
            if (!start || start.id !== event.pointerId) return;
            const step = getSwipeStep(event.clientX - start.x, rtl);
            if (step !== 0) go(index + step);
          }}
          onPointerCancel={() => {
            pointer.current = null;
          }}
        >
          <div
            data-slot="carousel-track"
            className="cn-carousel-track"
            style={{ transform: `translateX(${(rtl ? 1 : -1) * index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: slides are positional
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={slideLabel(i, count)}
                data-slot="carousel-slide"
                data-active={i === index ? "" : undefined}
                aria-hidden={i === index ? undefined : true}
                inert={i === index ? undefined : true}
                className="cn-carousel-slide"
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
        {showArrows ? arrow("next") : null}
      </div>

      {showDots || autoPlay > 0 ? (
        <div className="cn-carousel-footer">
          {autoPlay > 0 ? (
            <button
              type="button"
              data-slot="carousel-toggle"
              className="cn-carousel-toggle"
              aria-label={playing ? pauseLabel : playLabel}
              onClick={() => setPlaying((value) => !value)}
            >
              <HugeiconsIcon icon={playing ? PauseIcon : PlayIcon} aria-hidden />
            </button>
          ) : null}
          {showDots ? (
            <div
              role="group"
              aria-label={dotsLabel}
              data-dot-size={dotSize}
              className="cn-carousel-dots"
            >
              {slides.map((_, i) => (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: slides are positional
                  key={i}
                  type="button"
                  data-slot="carousel-dot"
                  data-current={i === index ? "" : undefined}
                  aria-label={dotLabel(i, count)}
                  aria-current={i === index ? "true" : undefined}
                  className="cn-carousel-dot"
                  onClick={() => go(i)}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export type { CarouselProps };
export { arrowVariants as carouselArrowVariants, Carousel, getSwipeStep };
