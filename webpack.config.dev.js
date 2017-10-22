const webpackMerge = require('webpack-merge');

const webpackParts = require('./webpack.parts');

const webpackConfigDev = webpackMerge([
  {
    output: {
      publicPath: '/',
      sourceMapFilename: '[name].[chunkhash].map',
    },
    devtool: '#eval-cheap-module-source-map',
  },
  webpackParts.devServer(),
  webpackParts.loadImages(),
]);

module.exports = webpackConfigDev;
