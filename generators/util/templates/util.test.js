<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

<% if (TEST_FRAMEWORK === 'tape') { -%>
const test = require('tape')
<% } else { -%>
const { expect } = require('chai')
<% } -%>
const <%= UTIL_NAME %> = require('../<%= UTIL_NAME %>')
<% } else { -%>
<% if (TEST_FRAMEWORK === 'tape') { -%>
import test from 'tape'
<% } else { -%>
import { expect } from 'chai'
<% } -%>
import <%= UTIL_NAME %> from '../<%= UTIL_NAME %>'
<% } -%>

<% if (TEST_FRAMEWORK === 'tape') { -%>
test('utils/<%= UTIL_NAME %>', (t) => {
<% } else { -%>
describe('utils/<%= UTIL_NAME %>', () => {
<% } -%>
})
