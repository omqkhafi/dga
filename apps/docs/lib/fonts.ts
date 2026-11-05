import { IBM_Plex_Sans_Arabic } from "next/font/google";

// Same setup the dga-style registry item installs: --font-sans on <html>.
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  // Not preloaded: the Arabic and Latin subsets are eight files, and preloading all of them
  // competes with the CSS. The browser fetches only the ranges and weights a page uses.
  preload: false,
});
