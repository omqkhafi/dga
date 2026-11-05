/**
 * WebMCP for the docs: three read-only tools for browsers that expose `navigator.modelContext`.
 * The inline guard runs on every page and downloads /webmcp.js only when this browser can
 * register tools, so nobody else pays for it.
 */

/** Inline guard. No tool definitions live here. */
export const WEBMCP_GUARD = `(()=>{const mc=(typeof document!=="undefined"&&document.modelContext)||(typeof navigator!=="undefined"&&navigator.modelContext);if(!mc||typeof mc.registerTool!=="function")return;const s=document.createElement("script");s.src="/webmcp.js";s.async=true;document.head.appendChild(s);})();`;

/** The tool script served at /webmcp.js. It reads the language of the page it runs on. */
export const WEBMCP_SCRIPT = `(() => {
  const mc =
    (typeof document !== "undefined" && document.modelContext) ||
    (typeof navigator !== "undefined" && navigator.modelContext);
  if (!mc || typeof mc.registerTool !== "function") return;

  const lang = () => (document.documentElement.lang === "ar" ? "ar" : "en");
  const text = (value) => ({ content: [{ type: "text", text: value }] });

  mc.registerTool({
    name: "search_docs",
    description: "Search the Platform Code docs. Returns page URLs and excerpts.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Words to search for." } },
      required: ["query"],
    },
    annotations: { readOnlyHint: true },
    async execute({ query }) {
      const words = String(query ?? "").toLowerCase().split(/\\s+/).filter(Boolean);
      if (words.length === 0) return text("No results");
      const response = await fetch("/search-index/" + lang());
      const entries = await response.json();
      const hits = (Array.isArray(entries) ? entries : [])
        .filter((entry) => {
          const haystack = (entry.title + " " + entry.page + " " + entry.text).toLowerCase();
          return words.every((word) => haystack.includes(word));
        })
        .slice(0, 8)
        .map((entry) => entry.url + " " + entry.title + ": " + String(entry.text).slice(0, 160));
      return text(hits.length > 0 ? hits.join("\\n") : "No results");
    },
  });

  mc.registerTool({
    name: "get_page",
    description: "Fetch one docs page as Markdown. Pass the docs slug, such as components/button.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", description: "Docs slug. Empty is the introduction." } },
      required: ["slug"],
    },
    annotations: { readOnlyHint: true },
    async execute({ slug }) {
      const raw = String(slug ?? "").trim().replace(/^\\/?(en|ar)?\\/?docs\\//, "").replace(/\\.md$/, "");
      const page = raw === "" || raw === "index" ? "index" : raw;
      if (!/^[a-z0-9]+(?:[/-][a-z0-9]+)*$/.test(page)) return text("Slug must be docs path segments.");
      const response = await fetch("/" + lang() + "/docs/" + page + ".md");
      return text(await response.text());
    },
  });

  mc.registerTool({
    name: "list_pages",
    description: "List every docs page title and its Markdown URL.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    async execute() {
      const response = await fetch("/" + lang() + "/llms.json");
      const data = await response.json();
      const pages = Array.isArray(data.pages) ? data.pages : [];
      return text(pages.map((page) => page.title + " " + page.markdown).join("\\n"));
    },
  });
})();
`;
