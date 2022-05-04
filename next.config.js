const withTM = require("next-transpile-modules")([
  "remark-parse",
  "remark-gfm",
  "remark-rehype",
  "rehype-stringify",
  "rehype-raw",
  "micromark-core-commonmark",
  "micromark-extension-gfm",
  "micromark-util-combine-extensions",
  "micromark-util-chunked",
  "micromark-util-character",
  "micromark-util-sanitize-uri",
  "micromark-util-encode",
  "micromark-util-classify-character",
  "micromark-util-resolve-all",
  "micromark-util-subtokenize",
  "micromark-util-normalize-identifier",
  "micromark-util-html-tag-name",
  "micromark-util-decode-numeric-character-reference",
  "micromark-util-decode-string",
  "micromark-factory-destination",
  "micromark-factory-label",
  "micromark-factory-space",
  "micromark-factory-title",
  "micromark-factory-whitespace",
  "mdast-util-gfm",
  "ccount",
  "mdast-util-find-and-replace",
  "hast-util-raw",
  "hast-util-from-parse5",
  "hast-util-to-parse5",
  "hast-util-parse-selector",
  "hast-to-hyperscript",
  "hastscript",
  "unist-util-visit-parents",
  "unist-util-is",
  "vfile-location",
  "web-namespaces",
  "mdast-util-to-markdown",
  "mdast-util-from-markdown",
  "markdown-table",
]);

module.exports = withTM({
  reactStrictMode: false,
  // target: 'serverless',
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: "path-browserify",
        events: false,
      };
    }
    if (isServer) {
      config.externals.push("_http_common");
    }
    config.resolve.alias.stream = "stream-browserify";
    config.resolve.alias.zlib = "browserify-zlib";
    // config.externals = {
    //   ...config.externals,
    //   canvas: "util",
    //   bufferutil: "bufferutil",
    //   "utf-8-validate": "utf-8-validate"
    // }
    return config;
  },
});
