var webpack = require('webpack');

module.exports = {
  entry: ['./src/app/app.js'],
  devtool: 'sourcemap',
  output: {
    filename: 'bundle.js'
  },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     'window.jQuery': 'jquery'
  //   })
  // ],
  module: {
    loaders: [
       { test: /\.js$/,
         exclude: [/app\/lib/, /node_modules/],
         loader: 'babel',
         query:{
           presets: ['es2015']
         }
       },
       {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: "file-loader?name=img/img-[hash:6].[ext]"
        },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.styl$/, loader: 'style!css!stylus' },
       { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
