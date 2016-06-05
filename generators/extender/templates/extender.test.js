<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } %>
<%- getTestEnvImport() %>
<%- makeImport('ko', 'knockout') %>
<%- makeImport(null, `../${EXTENDER_NAME}`) %>

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
