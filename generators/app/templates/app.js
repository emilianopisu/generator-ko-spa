'use strict'

const $ = require('jquery')
const _ = require('lodash')
const ko = require('knockout')
const routes = require('./routes')

require('ko-component-router')
require('knockout-punches')

ko.components.loaders.push({
  getConfig(name, done) {
    if (_(routes).values().contains(name)) {
      require.context(
        'bundle?name=[1]&regExp=views/(.*)/index.js!./',
        true,
        /\/views\/[^\/]+\/index\.js$/
      )(`./views/${name}/index.js`)(done)
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
