'use strict'

const webpack = require('webpack')

module.exports = {
  entry: {},

  output: {
    path: '<%= path %>',
    publicPath: '<%= publicPath %>',
    filename: '[name].js'
  },

  devtool: 'source-map',

  devServer: {
    contentBase: '<%= contentBase %>',
    inline: true

    // Uncomment if you are using HTML5 routing
    // historyApiFallback: true

    // Uncomment to proxy all requests containing `API` to <apiUrl>
    // proxy: [{
    //   path: /API/i,
    //   target: <apiUrl>
    // }]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      },

      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },

      {
        test: /\.html$/,
        loader: 'html?attrs=false&removeComments=false&removeOptionalTags=false'
      },

      {
        test: /\.(woff|ttf|eot)$/i,
        loader: 'file?hash=sha512&digest=hex&name=[name]-[hash].[ext]'
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name]-[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'web_modules'
    ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 20000 }),
    new webpack.optimize.CommonsChunkPlugin({ children: true, minChunks: 2 })
  ]
}
