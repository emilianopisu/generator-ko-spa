'use strict'

const _ = require('lodash')
const gutil = require('gulp-util')
const argv = require('yargs').argv
const webpack = require('webpack')
const os = require('os')

const config = {
  output: {
    filename: 'app.js'
  },

  devtool: 'source-map',

  node: {
    fs: 'empty'
  },

  module: {
    loaders: [
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
        loader: 'html'
      },
      {
        test: /\.(woff|ttf|eot)$/i,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?name=[name].[ext]',
          'image-webpack?bypassOnDebug'
        ]
      },
      {
        test: /\.json$/i,
        loader: 'json'
      }
    ]
  },

  plugins: [],

  resolve: {
    modulesDirectories: [
      'node_modules',
      'web_modules'
    ]
  }
}

const prodConfig = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 100000 }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
}

if (argv.babel === false) {
  gutil.log(gutil.colors.yellow('skipping babel compilation'))
} else {
  config.module.loaders.unshift({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: `babel?cacheDirectory=${os.tmpdir()}`
  })
}

_.merge(config, argv.p ? prodConfig : {})

module.exports = config
