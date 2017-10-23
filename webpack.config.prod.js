const webpackMerge = require('webpack-merge');

const webpackParts = require('./webpack.parts');

const webpackConfigProd = webpackMerge([
  webpackParts.extractSCSS({
    use: ['css-loader', webpackParts.autoprefixCSS, 'sass-loader'],
  }),
  webpackParts.optimizeCSS(),
  webpackParts.loadImages({
    options: {
      limit: 150000,
    },
  }),
]);

module.exports = webpackConfigProd;
