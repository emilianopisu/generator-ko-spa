'use strict'

const $ = window.$ = window.jQuery = require('jquery')
const _ = window._ = require('lodash')
const ko = window.ko = require('knockout')
const routes = require('./routes')

require('es6-promise').polyfill()

require('ko-component-router')
require('knockout-punches')
ko.punches.enableAll()

require('knockout-fast-foreach')
ko.bindingHandlers.foreach = ko.bindingHandlers.fastForEach

ko.components.loaders.push({
  getConfig(name, done) {
    if (_(routes).values().contains(name)) {
      require.context(
        'bundle?name=[1]&regExp=<%= appDir %>(.*)/index.js!./',
        true,
        /\.\/[^\/]+\/index\.js$/
      )(`./${name}/index.js`)(done)
    } else {
      done(null)
    }
  }
})

ko.components.register('app', {
  viewModel: class App {
    constructor() {
      this.routes = routes
      this.base = <%= basePath %>
    }
  },
  template: `
    <ko-component-router params="routes: routes, base: base"></ko-component-router>
  `
})

$(() => ko.applyBindings())
