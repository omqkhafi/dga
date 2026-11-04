import { IBM_Plex_Sans_Arabic } from "next/font/google";

// Same setup the dga-style registry item installs: --font-sans on <html>.
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
