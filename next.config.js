module.exports = {
  reactStrictMode: false,
  // target: 'serverless',
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    // config.externals = {
    //   ...config.externals,
    //   canvas: "util",
    //   bufferutil: "bufferutil",
    //   "utf-8-validate": "utf-8-validate"
    // }
    return config;
  },
};

// const withMDX = require('@next/mdx')({
//     extension: /\.mdx$/
//   })

// module.exports = withMDX({
//     pageExtensions: ['js', 'jsx', 'md', 'mdx']
// })
