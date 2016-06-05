<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

<% if (TEST_FRAMEWORK === 'tape') { -%>
const test = require('tape')
<% } else { -%>
const { expect } = require('chai')
<% } -%>
const { renderHtml } = require('ko-component-tester')
<% } else { -%>
<% if (TEST_FRAMEWORK === 'tape') { -%>
import test from 'tape'
<% } else { -%>
import { expect } from 'chai'
<% } -%>
import { renderHtml } from 'ko-component-tester'
<% } -%>

<% if (TEST_FRAMEWORK === 'tape') { -%>
test('bindings/<%= BINDING_NAME %>', (t) => {
<% } else { -%>
describe('bindings/<%= BINDING_NAME %>', () => {
<% } -%>
  const $el = renderHtml({
    viewModel: { value: 'foo' },
    template: `<div data-bind="<%= BINDING_NAME %>: value"></div>`
  })
})
