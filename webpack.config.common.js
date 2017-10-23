const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const webpackMerge = require('webpack-merge');
const webpackParts = require('./webpack.parts');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const webpackConfigCommon = webpackMerge([
  {
    entry: {
      app: PATHS.src,
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      publicPath: './',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            cache: true,
          }
        }
      }),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
  },
  webpackParts.lintJavaScript({ include: PATHS.src }),
  webpackParts.loadJavaScript({ exclude: /node_modules/ }),
  // instead of an entry property for vendor bundle, they are extracted automatically here
  webpackParts.extractBundleChunks([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.jsx?$/)
      ),
    },
  ]),
]);

module.exports = webpackConfigCommon;
