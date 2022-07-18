const markdoc = require("@markdoc/markdoc");

module.exports = {
  presets: [require("foundation-design-system/tailwind.config")],
  content: {
    files: [
      "./node_modules/foundation-design-system/**/*.js",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./content/**/*.md",
    ],
    transform: {
      md: (content) => {
        const parsed = markdoc.parse(content);
        const transform = markdoc.transform(parsed);
        return markdoc.renderers.html(transform);
      },
    },
  },
};
