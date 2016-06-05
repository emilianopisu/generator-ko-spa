'use strict'

const path = require('path')
const _ = require('lodash')
const co = require('co')
const { Base } = require('yeoman-generator')

const USE_REQUIRE_SYNTAX = 'USE_REQUIRE_SYNTAX'
const TEST_FRAMEWORK = 'TEST_FRAMEWORK'

function factory(dirname, type) {
  return class KoSpaSimpleGenerator extends Base {
    constructor() {
      super(...arguments)
      this.argument('name', { required: false })
    }

    prompting() {
      const done = this.async()

      co(function* () {
        if (!this.name) {
          this.name = yield this._p({
            type: 'input',
            name: 'name',
            message: 'name:'
          })
        }
      }.bind(this)).then(done)
    }

    writing() {
      const dir = `web_modules/${type}s/${this.name}`

      const files = [
        `${type}.js`,
        'index.js'
      ]

      if (this.config.get(TEST_FRAMEWORK) !== 'none') {
        files.push(`${type}.test.js`)
      }

      _.each(files, (file) => {
        const filename = file === 'index.js'
          ? 'index.js'
          : this.name + file.split(type)[1]

        this.fs.copyTpl(
          this.templatePath(path.resolve(dirname, 'templates', file)),
          this.destinationPath(`${dir}/${filename}`),
          {
            [`${_.upperCase(type)}_NAME`]: this.name,
            TEST_FRAMEWORK: this.config.get(TEST_FRAMEWORK),
            USE_REQUIRE_SYNTAX: this.config.get(USE_REQUIRE_SYNTAX)
          }
        )
      })
    }

    _p(o) { return new Promise((r) => this.prompt(o, (a) => r(a[o.name]))) }
  }
}

module.exports = { factory }
