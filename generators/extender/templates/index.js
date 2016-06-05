<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

const ko = require('knockout')
const <%= EXTENDER_NAME %> = require('./<%= EXTENDER_NAME %>')
<% } else { -%>
import ko from 'knockout'
import <%= EXTENDER_NAME %> from '<%= EXTENDER_NAME %>'
<% } -%>

ko.extenders.<%= EXTENDER_NAME %> = <%= EXTENDER_NAME %>
