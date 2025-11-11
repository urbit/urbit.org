const withMarkdoc = require('@markdoc/next.js');

const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
}

const markdocConfig = {
  schemaPath: "./app/schema"
}

module.exports = withMarkdoc(markdocConfig)(nextConfig);
