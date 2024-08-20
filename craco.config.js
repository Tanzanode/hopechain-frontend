module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.use) {
          rule.use.forEach((use) => {
            if (use.loader && use.loader.includes("source-map-loader")) {
              // Exclude the simple-cbor package from source map processing
              rule.exclude = (rule.exclude || []).concat(/node_modules\/simple-cbor/);
            }
          });
        }
      });
      return webpackConfig;
    },
  },
};
