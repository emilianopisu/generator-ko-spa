'use strict'

const _ = require('lodash')
const gutil = require('gulp-util')

let local

try {
  local = require('./local')
} catch (e) {
  local = []
  gutil.log(gutil.colors.yellow('Could not load config/local.js'))
}

module.exports = _.merge({
  server: require('./server'),
  karma: require('./karma'),
  webpack: require('./webpack'),
  tmp: {}
}, local)
