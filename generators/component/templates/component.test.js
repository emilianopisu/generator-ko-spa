<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } %>
<%- _getTestEnvImport() %>
<%- _makeImport(['renderComponent'], 'ko-component-tester') %>
<%- _makeImport('RouterContext', 'ko-component-router/lib/context') %>
<%- _makeImport('routes', '../../../routes') %>
<%- _makeImport('SUT', `../${COMPONENT_NAME}`) %>

const $router = new RouterContext({}, { routes })
const bindingCtx = { $router }

const SUT = require('./index')

<% if (TEST_FRAMEWORK === 'tape') { -%>
test('components/<%= COMPONENT_NAME -%>', (t) => {
  t.plan(1)

  const $el = renderComponent(
    SUT,
    _.extend({}, {
      params,
      pathname: ko.observable(''),
      state: () => {}
    }),
    bindingCtx)

  ko.tasks.runEarly()

  $el.waitForProperty('ready', true).then(() => {
    t.pass()
    $el.dispose()
  })
})
<% } else { %>
describe('components/<%= COMPONENT_NAME -%>', () => {
  let $el

  before(() => {
    $el = renderComponent(
      SUT,
      _.extend({}, {
        params,
        pathname: ko.observable(''),
        state: () => {}
      }),
      bindingCtx)

    return $el.waitForProperty('ready', true)
  })
  after(() => {
    $el.dispose()
  })
})
<% } %>
