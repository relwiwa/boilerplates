const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const VENDOR_LIBS = ['react', 'react-dom'];

const config = {
  entry: {
    bundle: './src/index.jsx',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        use: 'eslint-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/
      },
      {
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        }),
        test: /\.s?css$/
      },
      {
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ],
        test: /\.(jpe?g|png|gif|svg)$/
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          cache: true,
        }
      }
    }),
    new ExtractTextPlugin({ filename: '[name].[chunkhash].css', allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};

module.exports = () => config;
