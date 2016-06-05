<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

const $ = require('jquery')
const _ = require('lodash')
const ko = require('knockout')
require('ko-component-router')
require('knockout-punches')

const routes = require('./routes')
<% } else { -%>
import $ from 'jquery'
import _ from 'lodash'
import ko from 'knockout'
import 'ko-component-router'
import 'knockout-punches'

import routes from './routes'
<% } -%>

const bindings = require.context(
  // this can not be refactored out; it is used at compile time
  `./web_modules/bindings/`, true, /\.\/([^\/]+)\/index\.js$/)

const components = require.context(
  `bundle?name=[1]&regExp=(.*)/index.js!./web_modules/components/`, true, /\.\/([^\/]+)\/index\.js$/)

const views = require.context(
  `bundle?name=[1]&regExp=(.*)/index.js!./web_modules/views`, true, /\.\/([^\/]+)\/index\.js$/)

function parseNames(cs) {
  return _.map(cs.keys(), (p) => p.match(/\.\/([^\/]+)\/index\.js$/)[1])
}

// register bindings
_.each(bindings.keys(), (b) => bindings(b))

// enable custom-element syntax
// http://knockoutjs.com/documentation/component-custom-elements.html#registering-custom-elements
_.each(_.flatMap([components, views], parseNames), (c) => ko.components.register(c, {}))
ko.components.loaders.push({
  getConfig(name, done) {
    const componentPath = `./${name}/index.js`
    if (_.contains(parseNames(components), name)) {
      components(componentPath)(done)
    } else if (_.contains(parseNames(views), name)) {
      views(componentPath)(done)
    }
  }
})

ko.punches.enableAll()

ko.components.register('app', {
  viewModel: class App {
    constructor() {
      this.routes = routes
    }
  },
  template: '<ko-component-router params="routes: routes"></ko-component-router>'
})

$(() => ko.applyBindings())
