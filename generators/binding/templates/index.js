<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } %>
<%- makeImport('ko', 'knockout') %>
<%- makeImport(BINDING_NAME, `./${BINDING_NAME}`) %>

ko.bindingHandlers.<%= BINDING_NAME %> = <%= BINDING_NAME %>
