/** @type {import('tailwindcss').Config} */
const { Markdown } = require("@urbit/fdn-design-system");
const markdoc = require("@urbit/markdoc");

module.exports = {
  presets: [require("@urbit/fdn-design-system/tailwind.config")],
  content: {
    files: [
      "./node_modules/@urbit/fdn-design-system/build/**/*.{js,jsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./content/**/*.md",
    ],
    transform: {
      md: (content) => {
        const parsed = Markdown.parse({ post: { content } });
        return markdoc.renderers.html(parsed);
      },
    },
  },
};
