'use strict'

const _ = require('lodash')
const webpack = require('webpack')
const argv = require('yargs').argv

const config = {
  entry: {},

  output: {
    path: '<%= path %>',
    publicPath: '<%= publicPath %>',
    filename: '[name].js'
  },

  devtool: 'inline-source-map',

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
        test: /\.css$/,
        loader: 'style!css'
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
  }
}

const prodConfig = {
  devtool: undefined,

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 50000 }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      filename: '0.Common.js',
      async: true,
      children: true,
      minChunks: 10
    })
  ]
}

module.exports = _.merge(config, argv.p ? prodConfig : {})
