'use strict'

const webpack = require('./utils/webpack')

module.exports = (done) => webpack({ watch: false }, done)
