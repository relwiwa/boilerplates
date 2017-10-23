const webpackMerge = require('webpack-merge');

const webpackParts = require('./webpack.parts');

const webpackConfigProd = webpackMerge([
  {
    devtool: 'source-map', // most detailed, external sourcemap
  },  
  webpackParts.extractSCSS({
    use: ['css-loader', webpackParts.autoprefixCSS, 'sass-loader'],
  }),
  webpackParts.minifyCSS(),
  webpackParts.loadImages({
    options: {
      limit: 150000,
    },
  }),
  webpackParts.minifyJavascript(),
]);

module.exports = webpackConfigProd;
