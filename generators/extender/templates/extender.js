<% if (USE_REQUIRE_SYNTAX) { -%>
'use strict'

module.exports = function(obs, config) {
<% } else { -%>
export default function(obs, config) {
<% } -%>
  return obs
}
