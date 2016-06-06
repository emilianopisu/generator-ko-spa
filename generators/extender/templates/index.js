<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } -%>
<%- makeImport('ko', 'knockout') %>
<%- makeImport(EXTENDER_NAME, `./${EXTENDER_NAME}`) %>


ko.extenders.<%= EXTENDER_NAME %> = <%= EXTENDER_NAME %>
