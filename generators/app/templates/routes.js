<% if (USE_REQUIRE_SYNTAX) { %>
'use strict'

const routes = {}

module.exports = routes
<% } else { %>
const routes = {}

export default routes
<% } %>
