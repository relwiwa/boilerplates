const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports.autoprefixCSS = ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer'),
    ]),
  }
});

module.exports.devServer = () => ({
  devServer: {
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

module.exports.extractBundleChunks = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
});

module.exports.extractSCSS = ({ include, exclude, use } = {}) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].[chunkhash].css',
    allChunks: true
  });

  return {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          include,
          exclude,
          use: plugin.extract({
            use,
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

module.exports.lintJavascript = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'eslint-loader',
        enforce: 'pre',
        include,
        exclude,
        options,
      },
    ],
  },
});

module.exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude,
        include,
        use: [
          {
            loader: 'url-loader',
            options,
          },
          'image-webpack-loader'
        ],
      },
    ], 
  },
});

module.exports.loadJavascript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude,
      },
    ],
  },
});

module.exports.minifyCSS = () => ({
  plugins: [
    /*  - optimize-css-assets-webpack-plugin is a plugin based option that applies
          a chosen minifier on CSS assets. Using ExtractTextPlugin can lead to duplicated
          CSS given it only merges text chunks. OptimizeCSSAssetsPlugin avoids this
          problem by operating on the generated result and thus can lead to a better
          result.
        - it removes duplicate css rules */
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        safe: true,
      },
      canPrint: true
    }),                
  ],
});

/*  - Minification is enabled with -p or --optimize-minimize options, but then,
      UglifyJsPlugin is usedcannot yet handle ES6)
    - It cannot yet handle ES6, so BabelMinifyWebpackPlugin is used instead */
module.exports.minifyJavascript = () => ({
  plugins: [
    new BabelMinifyPlugin(),
  ],
});
