var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  context: __dirname,
  entry: ['./src/app/app.js'],
  devtool: 'sourcemap',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  plugins: [
    new LiveReloadPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.html', '.css'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    loaders: [
      { test: /src.*\.js$/, loaders: ['ng-annotate'] },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader?name=img/img-[hash:6].[ext]',
      },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css$/, loader: 'style!css' },
    ],
  },
};
