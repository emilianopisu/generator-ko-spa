'use strict'

const ko = require('knockout')

ko.components.register('<%= name %>', {
  template: require('./<%= name %>.html')
})
