<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

<% if (TEST_FRAMEWORK === 'tape') { -%>
const test = require('tape')
<% } else { -%>
const { expect } = require('chai')
<% } -%>
require('../<%= EXTENDER_NAME %>')
<% } else { -%>
<% if (TEST_FRAMEWORK === 'tape') { -%>
import test from 'tape'
<% } else { -%>
import { expect } from 'chai'
<% } -%>
import '../<%= EXTENDER_NAME %>'
<% } -%>

<% if (TEST_FRAMEWORK === 'tape') { -%>
test('extenders/<%= EXTENDER_NAME %>', (t) => {
  const obs = ko.observable().extend({ <%= EXTENDER_NAME %>: true })
})
<% } else { -%>
describe('extenders/<%= EXTENDER_NAME %>', () => {
  it('should work', () => {
    const obs = ko.observable().extend({ <%= EXTENDER_NAME %>: true })
  })
})
<% } -%>
