module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.use) {
          rule.use.forEach((use) => {
            if (use.loader && use.loader.includes("source-map-loader")) {
              use.options = {
                filterSourceMappingUrl: (url, resourcePath) => {
                  if (resourcePath.includes("simple-cbor")) {
                    return false; // Ignore source maps for simple-cbor
                  }
                  return true;
                },
              };
            }
          });
        }
      });
      return webpackConfig;
    },
  },
};
