'use strict'

const KarmaServer = require('karma').Server

module.exports = function(config) {
  new KarmaServer(config).start()
}
