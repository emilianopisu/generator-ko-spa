<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } %>
<%- _makeImport('template', `./${VIEW_NAME}.html`) %>
<% if (!TEMPLATE_ONLY) { -%>
<%- _makeImport('viewModel', `./${VIEW_NAME}`) %>
<% } -%>

<% if (USE_REQUIRE_SYNTAX) { -%>
<% if (TEMPLATE_ONLY) { %>
module.exports = { template  }
<% } else { %>
module.exports = { template, viewModel }
<% } -%>
<% } else { -%>
<% if (TEMPLATE_ONLY) { %>
export default { template  }
<% } else { %>
export default { template, viewModel }
<% } -%>
<% } -%>
