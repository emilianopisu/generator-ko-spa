'use strict'

const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const argv = require('yargs').argv

const pkg = fs.readJsonSync(path.resolve(__dirname, '../package.json'))
const vendor = Object.keys(pkg.dependencies)

module.exports = (done) => {
  webpack({
    entry: { vendor },
    output: {
      path: './dist',
      filename: 'vendor.js',
      library: 'VENDOR'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?name=[name].[ext]',
            'image-webpack?bypassOnDebug'
          ]
        }
      ]
    },
    plugins: (() => {
      const plugins = [
        new webpack.DllPlugin({
          path: './dist/vendor.json',
          name: 'VENDOR'
        })
      ]

      if (argv.p === true) {
        plugins.push(...[
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.AggressiveMergingPlugin(),
          new webpack.optimize.UglifyJsPlugin()
        ])
      }

      return plugins
    })()
  }, done)
}
