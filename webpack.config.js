// var webpack = require('webpack');
//
// module.exports = {
//   entry: './src/app/app.js',
//   output: {
//     path: __dirname,
//     filename: 'bundle.js'
//   },
//   plugins: [
//         new webpack.ProvidePlugin({
//             $: "jquery",
//             jQuery: "jquery",
//             "window.jQuery": "jquery",
//             "window.$": "jquery"
//         })
//     ],
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude:/node_modules/,
//         loader: 'babel-loader', // 'babel' is also a legal name to reference
//         query: {
//           presets: ['es2015']
//         }
//       },
//       { test: /\.html$/, loader: 'raw' },
//       { test: /\.styl$/, loader: 'style!css!stylus' },
//       { test: /\.css$/, loader: 'style!css' }
//       // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
//       // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
//       //{ test: /.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" }
//
//     ]
//   },
// };

var jQuery = require('jquery');

console.log(jQuery);


module.exports = {
  entry: './src/app/app.js',
  devtool: 'sourcemap',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
       { test: /\.js$/,
         exclude: [/app\/lib/, /node_modules/],
         loader: 'babel',
         query:{
           presets: ['es2015']
         }
       },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.styl$/, loader: 'style!css!stylus' },
       { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
