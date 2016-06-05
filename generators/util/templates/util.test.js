<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } %>
<%- getTestEnvImport() %>
<%- makeImport(UTIL_NAME, `../${UTIL_NAME}`) %>

<% if (TEST_FRAMEWORK === 'tape') { -%>
test('utils/<%= UTIL_NAME %>', (t) => {
<% } else { -%>
describe('utils/<%= UTIL_NAME %>', () => {
<% } -%>
})
