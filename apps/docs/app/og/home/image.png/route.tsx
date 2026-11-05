import { ogImage } from "@/lib/og";

export const revalidate = false;

export function GET() {
  return ogImage({
    title: "The Saudi government design system, as React components",
    description: "Copy-paste components on Base UI. Arabic and English, light and dark, WCAG AA.",
    eyebrow: "Design system",
  });
}
