
module.exports = (env) => {
  const config = require('./webpack.config.js')(env);
  config.output.publicPath = '/';
  config.output.sourceMapFilename = '[name].[chunkhash].map';
  config.devtool = '#eval-cheap-module-source-map';
  config.devServer = {
    historyApiFallback: true
  };
  return config;
} 
