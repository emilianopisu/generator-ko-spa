<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

module.exports = function(obs, arg) {
<% } else { -%>
export default function(obs, arg) {
<% } -%>
  return obs
}
