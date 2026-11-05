import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const font = (weight: "Regular" | "Bold") =>
  readFileSync(join(process.cwd(), "assets", "fonts", `IBMPlexSansArabic-${weight}.ttf`));

// The DGA logo icon (see components/shell/logo.tsx) and the eight-point star lattice
// (public/pattern-light.svg), drawn for the OG renderer.
const MARK = [
  [
    "M16.7705 21.9945C16.5415 22.1602 16.3945 22.4294 16.3945 22.7194V30.0714C16.3945 30.5685 16.7915 30.962 17.2935 30.962C17.7945 30.962 18.1915 30.5685 18.1915 30.0714V23.175L26.0655 17.7075C26.3375 17.8525 26.6295 17.9146 26.9635 17.9146C28.0285 17.9146 28.9065 17.0655 28.9065 15.9886C28.9065 14.9324 28.0495 14.0625 26.9635 14.0625C25.8985 14.0625 25.0215 14.9116 25.0215 15.9886C25.0215 16.0714 25.0215 16.1543 25.0425 16.2164L16.7705 21.9945Z",
    "a",
  ],
  [
    "M11.1944 20.0468V27.3782C10.5674 27.7095 10.1494 28.3308 10.1494 29.0764C10.1494 30.1326 11.0064 31.0024 12.0924 31.0024C13.1574 31.0024 14.0344 30.1533 14.0344 29.0764C14.0344 28.3308 13.6174 27.6888 12.9904 27.3782V20.5231L24.6454 12.4462C24.8744 12.2805 25.0214 12.0113 25.0214 11.7213V6.25381C25.0214 5.75677 24.6244 5.36328 24.1224 5.36328C23.6214 5.36328 23.2244 5.75677 23.2244 6.25381V11.245L11.5704 19.3219C11.3194 19.4669 11.1734 19.7361 11.1944 20.0468Z",
    "a",
  ],
  [
    "M25.1465 22.492L22.1805 24.563C21.7625 24.853 21.6785 25.3914 21.9715 25.8056C22.1385 26.0542 22.4305 26.1784 22.7025 26.1784C22.8905 26.1784 23.0575 26.137 23.2245 26.0127L26.1905 23.9417C26.6085 23.6518 26.6915 23.1133 26.3995 22.6991C26.1275 22.3056 25.5635 22.2021 25.1465 22.492Z",
    "a",
  ],
  [
    "M30.8276 27.6893C30.5356 27.2751 29.9716 27.1716 29.5536 27.4615L15.4966 37.216L1.44057 27.4615C1.02257 27.1716 0.458579 27.2751 0.165579 27.6893C-0.126421 28.1035 -0.0214257 28.6627 0.395574 28.9527L13.9096 38.3343L9.96158 41.0888C9.69058 40.9438 9.37757 40.8817 9.06357 40.8817C7.97757 40.8817 7.10058 41.7515 7.10058 42.8284C7.10058 43.9054 7.97757 44.7752 9.06357 44.7752C10.1496 44.7752 11.0276 43.9054 11.0276 42.8284C11.0276 42.7456 11.0276 42.6628 11.0066 42.5799L15.5176 39.4527L20.0296 42.5799C20.0296 42.6628 20.0086 42.7456 20.0086 42.8284C20.0086 43.9054 20.8856 44.7752 21.9716 44.7752C23.0576 44.7752 23.9346 43.9054 23.9346 42.8284C23.9346 41.7515 23.0576 40.8817 21.9716 40.8817C21.6376 40.8817 21.3456 40.9645 21.0736 41.0888L17.1256 38.3343L30.6396 28.9527C31.0156 28.6627 31.1196 28.1035 30.8276 27.6893Z",
    "b",
  ],
  [
    "M5.84759 6.54381L8.81358 4.4728C9.23058 4.18286 9.31459 3.6444 9.02159 3.2302C8.85459 2.98167 8.56258 2.85742 8.29058 2.85742C8.10258 2.85742 7.93558 2.89883 7.76858 3.0231L4.80258 5.09411C4.38558 5.38405 4.30158 5.92251 4.59358 6.33671C4.86558 6.73021 5.42959 6.83376 5.84759 6.54381Z",
    "a",
  ],
  [
    "M18.0036 3.62426V8.53257L6.34865 16.6095C6.11865 16.7752 5.97266 17.0444 5.97266 17.3344V22.8019C5.97266 23.2989 6.36965 23.6924 6.87065 23.6924C7.37265 23.6924 7.76865 23.2989 7.76865 22.8019V17.8107L19.4236 9.73378C19.6536 9.56808 19.7997 9.29883 19.7997 9.00889V3.62426C20.4267 3.2929 20.8436 2.6716 20.8436 1.92604C20.8436 0.869825 19.9877 0 18.9017 0C17.8367 0 16.9586 0.849115 16.9586 1.92604C16.9796 2.65089 17.3976 3.2929 18.0036 3.62426Z",
    "a",
  ],
  [
    "M4.00964 14.9328C5.07464 14.9328 5.95164 14.0837 5.95164 13.0068C5.95164 12.9239 5.95165 12.8411 5.93065 12.7789L14.2016 7.04222C14.4316 6.87654 14.5777 6.6073 14.5777 6.31736V0.912015C14.5777 0.414974 14.1817 0.0214844 13.6797 0.0214844C13.1787 0.0214844 12.7816 0.414974 12.7816 0.912015V5.86174L4.90765 11.3085C4.63565 11.1635 4.34364 11.1014 4.00964 11.1014C2.94464 11.1014 2.06665 11.9505 2.06665 13.0275C2.08765 14.0837 2.94464 14.9328 4.00964 14.9328Z",
    "a",
  ],
] as const;
const PATTERN = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="96" height="96" fill="none" stroke="#1b8354" stroke-opacity="0.22" stroke-width="1" stroke-linejoin="round"><path d="M32.00 1.00 L39.46 13.98 L53.92 10.08 L50.02 24.54 L63.00 32.00 L50.02 39.46 L53.92 53.92 L39.46 50.02 L32.00 63.00 L24.54 50.02 L10.08 53.92 L13.98 39.46 L1.00 32.00 L13.98 24.54 L10.08 10.08 L24.54 13.98Z"/><path d="M32.00 19.00 L35.14 24.42 L41.19 22.81 L39.58 28.86 L45.00 32.00 L39.58 35.14 L41.19 41.19 L35.14 39.58 L32.00 45.00 L28.86 39.58 L22.81 41.19 L24.42 35.14 L19.00 32.00 L24.42 28.86 L22.81 22.81 L28.86 24.42Z"/><path d="M0.00 -8.00 L8.00 0.00 L0.00 8.00 L-8.00 0.00Z"/><path d="M64.00 -8.00 L72.00 0.00 L64.00 8.00 L56.00 0.00Z"/><path d="M0.00 56.00 L8.00 64.00 L0.00 72.00 L-8.00 64.00Z"/><path d="M64.00 56.00 L72.00 64.00 L64.00 72.00 L56.00 64.00Z"/></svg>',
)}`;

const LATIN = /[A-Za-z0-9]/;
const EDGE_PUNCT = /^([([«"“]*)(.*?)([.,،؛:!؟?)\]»"”…]*)$/u;

/**
 * Satori has no bidi support: it lays words out left to right and ignores `direction`, so a wrapped
 * Arabic sentence comes out in reverse word order. This builds the line by hand: every word is its
 * own flex item in a `row-reverse` wrap, so lines start at the right and wrap in reading order.
 * Runs of Latin words ("Base UI", "WCAG 2.1 AA") stay together and keep their own order, and
 * punctuation is split off so it lands on the correct side of its word.
 */
function rtlItems(text: string) {
  const items: { text: string; gapAfter: boolean; latin: boolean }[] = [];
  const tokens = text.split(/\s+/).filter(Boolean);
  let run: string[] = [];
  const flush = (gapAfter: boolean) => {
    if (run.length) items.push({ text: run.join(" "), gapAfter, latin: true });
    run = [];
  };
  tokens.forEach((token, i) => {
    const [, open, core, close] = token.match(EDGE_PUNCT) ?? ["", "", token, ""];
    const latin = LATIN.test(core ?? "");
    const last = i === tokens.length - 1;
    if (open) {
      flush(false);
      items.push({ text: open, gapAfter: false, latin: false });
    }
    if (latin) run.push(core ?? "");
    else {
      flush(true);
      if (core) items.push({ text: core, gapAfter: !close && !last, latin: false });
    }
    if (close) {
      flush(false);
      items.push({ text: close, gapAfter: !last, latin: false });
    } else if (latin && last) flush(false);
    else if (latin) {
      const next = tokens[i + 1] ?? "";
      if (!LATIN.test(next)) flush(true);
    }
  });
  flush(false);
  return items;
}

function RtlText({
  text,
  gap,
  style,
}: {
  text: string;
  gap: number;
  style: Record<string, unknown>;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", ...style }}>
      {rtlItems(text).map((item, i, all) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static list in an image response
          key={i}
          style={{
            display: "flex",
            marginLeft: item.gapAfter && (item.latin || all[i + 1]?.latin) ? gap : 0,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

/**
 * 1200×630 OG image: the star lattice fading in from the end side, the mark, and the page title
 * in IBM Plex Sans Arabic (full TrueType files, so Arabic is shaped correctly). Arabic images are
 * mirrored and have no letter-spacing. The colour comes from the logo icon.
 */
export function ogImage({
  title,
  description,
  eyebrow,
  footer,
  brand,
  lang = "en",
}: {
  title: string;
  description?: string;
  eyebrow: string;
  footer: string;
  /** The product name for the lockup, in the page's language. */
  brand: string;
  lang?: "en" | "ar";
}) {
  const rtl = lang === "ar";
  const side = rtl ? "left" : "right";
  const track = (px: number) => (rtl ? 0 : px);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#f9fafb",
        fontFamily: "IBM Plex Sans Arabic",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          [side]: 0,
          bottom: 0,
          width: 720,
          display: "flex",
          backgroundImage: `url("${PATTERN}")`,
          backgroundSize: "96px 96px",
          backgroundRepeat: "repeat",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          [side]: 0,
          bottom: 0,
          width: 720,
          display: "flex",
          backgroundImage: `linear-gradient(to ${side}, #f9fafb 0%, rgba(249,250,251,0) 70%)`,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: rtl ? "flex-end" : "flex-start",
          width: "100%",
          height: "100%",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: rtl ? "row-reverse" : "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: an image response, not a page */}
          <svg width="44" height="64" viewBox="0 0 31 45">
            <defs>
              <linearGradient
                id="a"
                x1="0"
                y1="5.797"
                x2="0"
                y2="40.672"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#00ABAF" />
                <stop offset="0.24" stopColor="#0093B4" />
                <stop offset="0.48" stopColor="#0080BA" />
                <stop offset="1" stopColor="#774896" />
              </linearGradient>
              <linearGradient
                id="b"
                x1="0"
                y1="5.797"
                x2="0"
                y2="40.672"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#29B2B2" />
                <stop offset="0.27" stopColor="#1091B3" />
                <stop offset="0.48" stopColor="#017EB5" />
                <stop offset="1" stopColor="#704B98" />
              </linearGradient>
            </defs>
            {MARK.map(([d, g]) => (
              <path key={d} d={d} fill={`url(#${g})`} />
            ))}
          </svg>
          {rtl ? (
            <RtlText
              text={brand}
              gap={8}
              style={{ fontSize: 40, fontWeight: 700, color: "#161616" }}
            />
          ) : (
            <div
              style={{ fontSize: 36, fontWeight: 700, color: "#161616", letterSpacing: track(-1) }}
            >
              {brand}
            </div>
          )}
          {rtl ? (
            <RtlText text={eyebrow} gap={8} style={{ fontSize: 28, color: "#4d5761" }} />
          ) : (
            <div style={{ fontSize: 28, color: "#4d5761", marginLeft: 16 }}>{eyebrow}</div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: rtl ? "flex-end" : "flex-start",
            gap: 24,
            maxWidth: 880,
          }}
        >
          {rtl ? (
            <RtlText
              text={title}
              gap={20}
              style={{
                fontSize: title.length > 36 ? 56 : title.length > 24 ? 64 : 80,
                fontWeight: 700,
                color: "#0d121c",
                lineHeight: 1.3,
              }}
            />
          ) : (
            <div
              style={{
                fontSize: 80,
                fontWeight: 700,
                color: "#0d121c",
                lineHeight: 1.04,
                letterSpacing: track(-2.5),
              }}
            >
              {title}
            </div>
          )}
          {description ? (
            rtl ? (
              <RtlText
                text={description}
                gap={10}
                style={{ fontSize: 32, color: "#384250", lineHeight: 1.6, maxWidth: 800 }}
              />
            ) : (
              <div style={{ fontSize: 32, color: "#384250", lineHeight: 1.4, maxWidth: 800 }}>
                {description}
              </div>
            )
          ) : null}
        </div>
        {rtl ? (
          <RtlText text={footer} gap={8} style={{ fontSize: 26, color: "#4d5761" }} />
        ) : (
          <div style={{ display: "flex", fontSize: 26, color: "#4d5761" }}>{footer}</div>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "IBM Plex Sans Arabic", data: font("Regular"), weight: 400, style: "normal" },
        { name: "IBM Plex Sans Arabic", data: font("Bold"), weight: 700, style: "normal" },
      ],
    },
  );
}
