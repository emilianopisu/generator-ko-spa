<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

module.exports = require('./<%= UTIL_NAME -%>')
<% } else { -%>
import <%= UTIL_NAME -%> from './<%= UTIL_NAME -%>'
export default <%= UTIL_NAME -%>
<% } -%>
