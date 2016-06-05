<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

<% if (TEST_FRAMEWORK === 'tape') { -%>
const test = require('tape')
<% } else { -%>
const { expect } = require('chai')
<% } -%>
const { renderHtml } = require('ko-component-tester')
require('../<%= FILTER_NAME %>')
<% } else { -%>
<% if (TEST_FRAMEWORK === 'tape') { -%>
import test from 'tape'
<% } else { -%>
import { expect } from 'chai'
<% } -%>
import { renderHtml } from 'ko-component-tester'
import '../<%= FILTER_NAME %>'
<% } -%>

<% if (TEST_FRAMEWORK === 'tape') { -%>
test('filters/<%= FILTER_NAME %>', (t) => {
<% } else { -%>
describe('filters/<%= FILTER_NAME %>', () => {
<% } -%>
  const $el = renderHtml({
    viewModel: { value: 'foo', arg: true },
    template: `<div data-bind="text: value | <%= FILTER_NAME %>:arg"></div>`
  })
})
