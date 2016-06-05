<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

const ko = require('knockout')
const <%= FILTER_NAME %> = require('./<%= FILTER_NAME %>')
<% } else { -%>
import ko from 'knockout'
import <%= FILTER_NAME %> from '<%= FILTER_NAME %>'
<% } -%>

ko.filters.<%= FILTER_NAME %> = <%= FILTER_NAME %>
