'use strict'

const _ = require('lodash')
const path = require('path')
const gutil = require('gulp-util')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../config')

module.exports = () => {
  const compiler = webpack(_.extend({}, config.webpack, {
    entry: [
      './app.js',
      `webpack-dev-server/client?http://localhost:${config.server.port}`,
      'webpack/hot/dev-server'
    ],
    output: {
      path: path.resolve('../..'),
      publicPath: '/hot/',
      filename: '[name].js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }))

  new WebpackDevServer(compiler, {
    quiet: true,
    contentBase: './',
    publicPath: '/hot/',
    inline: true,
    hot: true,

    // Uncomment if you are using HTML5 routing
    // historyApiFallback: true,

    proxy: [{
      path: new RegExp('(API)', 'i'),
      target: config.server.apiProxyUrl,
      changeOrigin: true,
      headers: { 'x-dev-server': 'yes' }
    }]
  })
    .listen(config.server.port, 'localhost', (err) => {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err)
      }

      gutil.log('[webpack-dev-server]', `running on config.server.port ${config.server.port}`)
      gutil.log('[webpack-dev-server]', chalk.yellow('NOTE: In order to prevent a redirect to the proxy url when accessing a routed app, you must append the trailing `/`. This is not a bug.'))
    })
}
