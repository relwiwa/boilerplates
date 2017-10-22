const webpackMerge = require('webpack-merge');

const webpackParts = require('./webpack.parts');

const webpackConfigProd = webpackMerge([
  webpackParts.loadImages({
    options: {
      limit: 150000,
    },
  }),
]);

module.exports = webpackConfigProd;
