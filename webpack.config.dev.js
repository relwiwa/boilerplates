const webpackMerge = require('webpack-merge');

const webpackParts = require('./webpack.parts');

const webpackConfigDev = webpackMerge([
  {
    output: {
      publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map', // inline, eval-based sourcemap
  },
  webpackParts.devServer(),
  webpackParts.extractSCSS({
    use: ['css-loader', 'sass-loader'],
  }),
  webpackParts.loadImages(),
]);

module.exports = webpackConfigDev;
