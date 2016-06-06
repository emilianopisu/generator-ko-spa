<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } %>
<%- _makeImport('template', `./${COMPONENT_NAME}.html`) %>
<% if (!TEMPLATE_ONLY) { -%>
<%- _makeImport('viewModel', `./${COMPONENT_NAME}`) %>
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
