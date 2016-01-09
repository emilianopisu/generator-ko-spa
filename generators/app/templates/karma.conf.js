'use strict'

const path = require('path')
const coverage = require('yargs').argv.coverage

module.exports = function(config) {
  const c = {
    basePath: path.resolve(__dirname, 'client/'),

    frameworks: ['tap'],

    files: ['**/*.test.js'],

    preprocessors: {
      '**/*.test.js': 'webpack'
    },

    // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    client: {
      args: ['coverage']
    },

    reporters: ['dots'],

    webpack: {
      node: {
        fs: 'empty'
      },
      module: {
        preLoaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
          }
        ]
      },
      devtool: 'inline-source-map'
    },

    webpackMiddleware: {
      noInfo: true
    }
  }

  if (coverage) {
    c.reporters.push('coverage')

    c.coverageReporter = {
      dir : 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.txt' }
      ]
    }

    c.webpack.isparta = {
      embedSource: true,
      noAutoWrap: true
    }

    c.webpack.module.preLoaders.push({
      test: /\.js$/,
      exclude: /(node_modules|\.test\.js$)/,
      loader: 'isparta'
    })

    delete c.webpack.devtool
  }

  config.set(c)
}
