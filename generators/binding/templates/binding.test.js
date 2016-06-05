<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } %>
<%- getTestEnvImport() %>
<%- makeImport(['renderHtml'], 'ko-component-tester') %>
<%- makeImport(null, `../${BINDING_NAME}`) %>

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
