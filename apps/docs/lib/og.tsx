import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const font = (file: string) =>
  readFileSync(join(process.cwd(), "assets", "fonts", `ibm-plex-sans-arabic-${file}.woff`));

/**
 * 1200×630 OG image in the DGA identity: SA flag green, IBM Plex Sans Arabic (Latin subset;
 * the OG renderer cannot read the Arabic subset's glyph substitution tables yet).
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
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#f9fafb",
        fontFamily: "IBM Plex Sans Arabic",
        borderTop: "16px solid #1b8354",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 8, background: "#1b8354" }} />
        <div style={{ fontSize: 36, fontWeight: 700, color: "#161616" }}>DGA UI</div>
        <div style={{ fontSize: 28, color: "#384250", marginInlineStart: 16 }}>{eyebrow}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 84, fontWeight: 700, color: "#0d121c", lineHeight: 1.1 }}>
          {title}
        </div>
        {description ? (
          <div style={{ fontSize: 34, color: "#384250", lineHeight: 1.4, maxWidth: 1000 }}>
            {description}
          </div>
        ) : null}
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#14573a" }}
      >
        <span>dga.omqkhafi.dev</span>
        <span>shadcn · Base UI · Tailwind CSS v4</span>
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
