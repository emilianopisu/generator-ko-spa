<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'
<% } %>
<%- makeImport('ko', 'knockout') %>
<%- makeImport(null, 'knockout-punches') %>
<%- makeImport(FILTER_NAME, `./${FILTER_NAME}`) %>

ko.punches.textFilters.enable()
ko.filters.<%= FILTER_NAME %> = <%= FILTER_NAME %>
