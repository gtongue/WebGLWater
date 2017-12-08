const path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './lib/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    loaders: [
      {
        test: [/\.css$/, /\.scss$/],
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 99999999999
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map'
};