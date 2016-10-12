var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'app.js'),
  output: {
    path: path.join('./'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        },
        progress: true
      }
    ]
  },
};
