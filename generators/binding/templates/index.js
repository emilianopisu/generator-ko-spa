<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

const ko = require('knockout')
const <%= BINDING_NAME %> = require('./<%= BINDING_NAME %>')
<% } else { -%>
import ko from 'knockout'
import <%= BINDING_NAME %> from '<%= BINDING_NAME %>'
<% } -%>

ko.bindingHandlers.<%= BINDING_NAME %> = <%= BINDING_NAME %>
