const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#190a36",
              "@font-family": "'tt_normsregular' sans-serif",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
