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
    this.option('template-only')
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
    const dir = `web_modules/components/${this.name}`
    const name = this.name
    const capitalizedName = (() => name[0].toUpperCase() + name.substring(1))()

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`${dir}/index.js`),
      {
        USE_REQUIRE_SYNTAX: this.config.get(USE_REQUIRE_SYNTAX),
        TEMPLATE_ONLY: this.options['template-only'],
        COMPONENT_NAME: name,
        _makeImport: this._makeImport.bind(this)
      }
    )

    this.fs.copyTpl(
      this.templatePath('component.html'),
      this.destinationPath(`${dir}/${name}.html`),
      {
        COMPONENT_NAME: name
      }
    )

    if (this.options['template-only'] !== true) {
      this.fs.copyTpl(
        this.templatePath('component.js'),
        this.destinationPath(`${dir}/${name}.js`),
        {
          USE_REQUIRE_SYNTAX: this.config.get(USE_REQUIRE_SYNTAX),
          CAPITALIZED_COMPONENT_NAME: capitalizedName
        }
      )

      if (this.config.get(TEST_FRAMEWORK) !== 'none') {
        this.fs.copyTpl(
          this.templatePath('component.test.js'),
          this.destinationPath(`${dir}/${name}.test.js`),
          {
            USE_REQUIRE_SYNTAX: this.config.get(USE_REQUIRE_SYNTAX),
            TEST_FRAMEWORK: this.config.get(TEST_FRAMEWORK),
            COMPONENT_NAME: name,
            _getTestEnvImport: this._getTestEnvImport.bind(this),
            _makeImport: this._makeImport.bind(this)
          }
        )
      }
    }
  }

  _p(o) { return new Promise((r) => this.prompt(o, (a) => r(a[o.name]))) }

  _getTestEnvImport() {
    switch (this.config.get(TEST_FRAMEWORK)) {
      case 'mocha':
        return this._makeImport(['expect'], 'chai')
      case 'tape':
        return this._makeImport('test', 'tape')
    }
  }

  _makeImport(assignee, source) {
    const useRequire = this.config.get(USE_REQUIRE_SYNTAX)
    let importString = ''


    if (assignee) {
      importString += useRequire ? 'const ' : 'import '
      if (_.isArray(assignee)) {
        importString += '{ '
        importString += assignee.join(', ')
        importString += ' }'
      } else {
        importString += assignee
      }
      importString += useRequire ? ' = ' : ' from '
    }

    importString += useRequire ? `require('${source}')` : `'${source}'`

    return importString
  }
}

module.exports = Generator
