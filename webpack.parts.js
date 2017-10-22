const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports.devServer = () => ({
  devServer: {
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
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
          use: plugin.extract({
            use: ['css-loader', 'sass-loader']
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

module.exports.lintJavaScript = ({ include, exclude, options } = {}) => ({
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
