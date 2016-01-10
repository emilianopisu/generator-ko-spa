'use strict'

const $ = window.$ = require('jquery')
const _ = window._ = require('lodash')
const ko = window.ko = require('knockout')
const routes = require('./routes')

require('ko-component-router')
require('knockout-punches')
ko.punches.enableAll()

require('knockout-fast-foreach')
ko.bindingHandlers.foreach = ko.bindingHandlers.fastForEach

ko.components.loaders.push({
  getConfig(name, done) {
    if (_(routes).values().contains(name)) {
      require.context(
        'bundle?name=[1]&regExp=<%= appDir %>/(.*)/index.js!./',
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
    }
  },
  template: `
    <ko-component-router params="routes: routes"></ko-component-router>
  `
})

$(() => ko.applyBindings())
