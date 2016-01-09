const test = require('tape')
const <%= capitalizedName %>ViewModel require('./<%= name %>')

require('../<%= name %>')

test('<%= appname %><%= name %>', (t) => {
  t.plan(1)
  t.pass()
})
