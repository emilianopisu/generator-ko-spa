'use strict'

const _ = require('lodash')
const { Base } = require('yeoman-generator')

const USE_REQUIRE_SYNTAX = 'USE_REQUIRE_SYNTAX'
const TEST_FRAMEWORK = 'TEST_FRAMEWORK'

class KoSpaBaseGenerator extends Base {
  constructor() {
    super(...arguments)

    this.config.defaults({
      [TEST_FRAMEWORK]: 'mocha'
    })
  }

  _p(o) { return new Promise((r) => this.prompt(o, (a) => r(a[o.name]))) }

  _fileExists(f) { return this.fs.exists(this.destinationPath(f)) }

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

module.exports = KoSpaBaseGenerator
