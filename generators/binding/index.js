'use strict'

const _ = require('lodash')
const co = require('co')
const Base = require('yeoman-generator').Base

const USE_REQUIRE_SYNTAX = 'USE_REQUIRE_SYNTAX'
const TEST_FRAMEWORK = 'TEST_FRAMEWORK'

class Generator extends Base {
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
    const dir = `web_modules/bindings/${this.name}`

    const files = [
      'binding.js',
      'index.js'
    ]

    if (this.config.get(TEST_FRAMEWORK) !== 'none') {
      files.push('binding.test.js')
    }

    _.each(files, (file) => {
      const filename = file === 'index.js'
        ? 'index.js'
        : this.name + file.split('binding')[1]

      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(
          `${dir}/${filename}`),
        {
          BINDING_NAME: this.name,
          TEST_FRAMEWORK: this.config.get(TEST_FRAMEWORK),
          USE_REQUIRE_SYNTAX: this.config.get(USE_REQUIRE_SYNTAX)
        }
      )
    })
  }

  _p(o) { return new Promise((r) => this.prompt(o, (a) => r(a[o.name]))) }
}

module.exports = Generator
