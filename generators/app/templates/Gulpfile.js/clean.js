'use strict'

const fs = require('fs-extra')

module.exports = (done) => fs.remove('./dist', done)
