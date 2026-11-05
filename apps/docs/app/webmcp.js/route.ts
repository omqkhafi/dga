import { WEBMCP_SCRIPT } from "@/lib/webmcp";

export const revalidate = false;

/** The WebMCP tool script, for browsers that implement `navigator.modelContext`. */
export const GET = () =>
  new Response(WEBMCP_SCRIPT, {
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
