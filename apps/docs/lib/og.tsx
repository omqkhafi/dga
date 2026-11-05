import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const font = (file: string) =>
  readFileSync(join(process.cwd(), "assets", "fonts", `ibm-plex-sans-arabic-${file}.woff`));

// The DGA UI mark (see components/shell/logo.tsx) and the eight-point star lattice
// (public/pattern-light.svg), drawn for the OG renderer.
const MARK =
  "M12.00 1.00 L14.95 4.89 L19.78 4.22 L19.11 9.05 L23.00 12.00 L19.11 14.95 L19.78 19.78 L14.95 19.11 L12.00 23.00 L9.05 19.11 L4.22 19.78 L4.89 14.95 L1.00 12.00 L4.89 9.05 L4.22 4.22 L9.05 4.89Z M12.00 7.40 L13.11 9.32 L15.25 8.75 L14.68 10.89 L16.60 12.00 L14.68 13.11 L15.25 15.25 L13.11 14.68 L12.00 16.60 L10.89 14.68 L8.75 15.25 L9.32 13.11 L7.40 12.00 L9.32 10.89 L8.75 8.75 L10.89 9.32Z";
const PATTERN = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="96" height="96" fill="none" stroke="#1b8354" stroke-opacity="0.22" stroke-width="1" stroke-linejoin="round"><path d="M32.00 1.00 L39.46 13.98 L53.92 10.08 L50.02 24.54 L63.00 32.00 L50.02 39.46 L53.92 53.92 L39.46 50.02 L32.00 63.00 L24.54 50.02 L10.08 53.92 L13.98 39.46 L1.00 32.00 L13.98 24.54 L10.08 10.08 L24.54 13.98Z"/><path d="M32.00 19.00 L35.14 24.42 L41.19 22.81 L39.58 28.86 L45.00 32.00 L39.58 35.14 L41.19 41.19 L35.14 39.58 L32.00 45.00 L28.86 39.58 L22.81 41.19 L24.42 35.14 L19.00 32.00 L24.42 28.86 L22.81 22.81 L28.86 24.42Z"/><path d="M0.00 -8.00 L8.00 0.00 L0.00 8.00 L-8.00 0.00Z"/><path d="M64.00 -8.00 L72.00 0.00 L64.00 8.00 L56.00 0.00Z"/><path d="M0.00 56.00 L8.00 64.00 L0.00 72.00 L-8.00 64.00Z"/><path d="M64.00 56.00 L72.00 64.00 L64.00 72.00 L56.00 64.00Z"/></svg>',
)}`;

/**
 * 1200×630 OG image: the star lattice fading in from the right, the mark, and the page title in
 * IBM Plex Sans Arabic (Latin subset; the OG renderer cannot read the Arabic subset's glyph
 * substitution tables yet). The brand green appears once, in the mark.
 */
export function ogImage({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow: string;
}) {
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
          right: 0,
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
          right: 0,
          bottom: 0,
          width: 720,
          display: "flex",
          backgroundImage: "linear-gradient(to right, #f9fafb 0%, rgba(249,250,251,0) 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: an image response, not a page */}
          <svg width="56" height="56" viewBox="0 0 24 24">
            <path fill="#1b8354" fillRule="evenodd" d={MARK} />
          </svg>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#161616", letterSpacing: -1 }}>
            DGA UI
          </div>
          <div style={{ fontSize: 28, color: "#4d5761", marginLeft: 16 }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 880 }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#0d121c",
              lineHeight: 1.04,
              letterSpacing: -2.5,
            }}
          >
            {title}
          </div>
          {description ? (
            <div style={{ fontSize: 32, color: "#384250", lineHeight: 1.4, maxWidth: 800 }}>
              {description}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#4d5761" }}>
          dga.omqkhafi.dev · Not an official DGA product
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "IBM Plex Sans Arabic", data: font("latin-400"), weight: 400, style: "normal" },
        { name: "IBM Plex Sans Arabic", data: font("latin-700"), weight: 700, style: "normal" },
      ],
    },
  );
}
