const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const webpackMerge = require('webpack-merge');
const webpackParts = require('./webpack.parts');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const VENDOR_LIBS = ['react', 'react-dom'];

const webpackConfigCommon = webpackMerge([
  {
    entry: {
      bundle: PATHS.src,
      vendor: VENDOR_LIBS,
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      publicPath: './',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            cache: true,
          }
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
  },
  webpackParts.lintJavaScript({ include: PATHS.src }),
]);

module.exports = webpackConfigCommon;
