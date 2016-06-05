'use strict'

const { coverage } = require('yargs').argv
const _ = require('lodash')
const path = require('path')
const webpackConfig = require('./webpack')

const config = {
  basePath: path.resolve(__dirname, '..'),

  frameworks: [
  <% switch (TEST_FRAMEWORK) { case 'mocha': -%>
  'mocha'
  <% break; case 'tape': -%>
  'tap'
  <% break } -%>
],

  files: ['**/*.test.js'],

  preprocessors: {
    '**/*.test.js': 'webpack'
  },

  // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  logLevel: 'WARN',

  autoWatch: true,

  reporters: ['dots'],

  webpack: _.extend({}, webpackConfig, {
    externals: {},
    devTool: 'source-map',
    quiet: true,
    resolve: {
      alias: {
        // see http://stackoverflow.com/questions/31169760/how-to-avoid-react-loading-twice-with-webpack-when-developing
        jquery: path.resolve('./node_modules/jquery'),
        knockout: path.resolve('./node_modules/knockout')
      }
    }
  }),

  webpackMiddleware: {
    noInfo: true
  }
}

if (coverage) {
  config.reporters.push('coverage')

  config.coverageReporter = {
    dir : 'coverage/',
    reporters: [
      { type: 'html', subdir: 'html' },
      { type: 'lcovonly', subdir: '.', file: 'lcov.txt' }
    ]
  }

  config.webpack.isparta = {
    embedSource: true,
    noAutoWrap: true
  }

  config.webpack.module.preLoaders.push({
    test: /\.js$/,
    exclude: /(node_modules|\.test\.js$)/,
    loader: 'isparta'
  })

  delete config.webpack.devtool
}

module.exports = config
