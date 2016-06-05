<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } %>
<%- getTestEnvImport() %>
<%- makeImport(['renderHtml'], 'ko-component-tester') %>
<%- makeImport(null, `../${FILTER_NAME}`) %>

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
