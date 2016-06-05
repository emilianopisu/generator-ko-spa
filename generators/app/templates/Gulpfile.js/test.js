'use strict'

const _ = require('lodash')
const karma = require('./utils/karma')
const config = require('../config')

module.exports = () =>
  _.each(config.karma.files, (f) =>
    karma(_.extend({}, config.karma, {
      files: [f],
      preprocessors: { [f]: 'webpack' }
    })))
