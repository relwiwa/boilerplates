const webpack = require('webpack');
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
  webpackParts.setGlobalConstants({
    // process.env.NODE_ENV needs to be set to production for React to remove plenty of error messages
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  webpackParts.minifyJavascript(),
]);

module.exports = webpackConfigProd;
