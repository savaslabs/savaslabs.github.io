const path = require('path');

module.exports = {
  entry: './_comments-app/index.js',
  output: {
    path: path.resolve(__dirname, './_assets/js'), // eslint-disable-line
    filename: 'comments.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-react',
            'babel-preset-env'
          ].map(require.resolve)
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
