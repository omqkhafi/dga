import { defineConfig } from "fumadocs-mdx/config";

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: { light: "github-light-high-contrast", dark: "github-dark-high-contrast" },
      transformers: [
        {
          name: "dga:language",
          // The MDX `pre` override shows the language as a pill in the code block header.
          pre(node) {
            node.properties["data-language"] = this.options.lang;
          },
          // Every line is its own left-to-right isolate: Arabic strings keep their reading
          // order and the surrounding code stays in source order.
          line(node) {
            node.properties.dir = "ltr";
          },
        },
      ],
    },
  },
});
