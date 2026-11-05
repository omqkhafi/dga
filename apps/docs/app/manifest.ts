import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DGA UI",
    short_name: "DGA UI",
    description:
      "The Saudi DGA design system as copy-paste React components, installed with the shadcn CLI.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#1b8354",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
