var path = require('path');

module.exports = {
  entry: './_comments-app/index.js',
  output: {
    path: path.resolve(__dirname, './_assets/js'),
    filename: 'comments.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
