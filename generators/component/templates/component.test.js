'use strict'

const test = require('tape')
const <%= capitalizedName %>ViewModel = require('./<%= name %>')

require('../<%= name %>')

test('components/<%= name %>', (t) => {
  t.plan(1)
  t.pass()
})
