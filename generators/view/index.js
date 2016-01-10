'use strict'

const _ = require('lodash')
const fs = require('fs')
const co = require('co')
const path = require('path')
const Base = require('yeoman-generator').Base
const ast = require('ast-query')
const escodegenOpts = require('../../utils/escodegen-options')

class Generator extends Base {
  constructor() {
    super(...arguments)

    this.entries = (() => {
      const dist = this.destinationPath(this.config.get('contentBase'))
      return _.filter(fs.readdirSync(dist), (file) =>
        file !== 'web_modules' && fs.statSync(path.join(dist, file)).isDirectory())
    })()

    if (this.config.get('multiEntry') && this.entries.length > 1) {
      this.argument('entry', { required: false })
    }
    this.argument('name', { required: false })
    this.argument('route', { required: false })

    this.option('template-only')
    this.option('synchronous')
  }

  prompting() {
    const done = this.async()

    co(function* () {
      if (this.config.get('multiEntry') && !this.entry) {
        if (this.entries.length > 1) {
          this.entry = yield this._p({
            type: 'list',
            name: 'entry',
            message: 'sub app:',
            choices: this.entries
          })
        } else {
          this.entry = this.entries[0]
        }
      }

      if (!this.name) {
        this.name = yield this._p({
          type: 'input',
          name: 'name',
          message: 'name:'
        })
      }

      if (!this.route) {
        this.route = yield this._p({
          type: 'input',
          name: 'route',
          message: 'route:',
          default: '/' + this.name
        })
      }
    }.bind(this)).then(done)
  }

  writing() {
    const dir = this._getViewDir()
    const name = this.name
    const capitalizedName = (() => name[0].toUpperCase() + name.substring(1))()

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`${dir}/index.js`),
      {
        name
      }
    )

    this.fs.copyTpl(
      this.templatePath('view.html'),
      this.destinationPath(`${dir}/${name}.html`),
      {
        name,
        appname: this.entry ? this.entry + '/' : ''
      }
    )

    const routesFile = this.destinationPath(this._getAppDir() + 'routes.js')
    const tree = ast(this.fs.read(routesFile), escodegenOpts)
    tree
      .assignment('module.exports').value()
        .key(`'${this.route}'`).value(`'${this.name}'`)
    this.fs.write(routesFile, tree.toString())

    if (this.options['template-only'] !== true) {
      this._addPropToComponentRegistration('viewModel', `require('./${name}.js')`)

      this.fs.copyTpl(
        this.templatePath('view.js'),
        this.destinationPath(`${dir}/${name}.js`),
        {
          capitalizedName
        }
      )

      this.fs.copyTpl(
        this.templatePath('view.test.js'),
        this.destinationPath(`${dir}/${name}.test.js`),
        {
          name,
          capitalizedName,
          appname: this.entry ? this.entry + '/' : ''
        }
      )
    }

    if (this.options['synchronous']) {
      this._addPropToComponentRegistration('synchronous', 'true')
    }
  }

  conflicts() {
    // I really didn't want to have to do this... but this stops the tests from
    // breaking on account of merge conflicts in `routes.js`
    if ((process.env.NODE_ENV || 'development').toLowerCase().indexOf('test') > -1) {
      const _preserve = this.conflicter.adapter.prompt
      this.conflicter.adapter.prompt = (foo, confirm) => confirm({ action: 'force' })
      this.conflicter.adapter.prompt.restoreDefaultPrompts = () => this.conflicter.adapter.prompt = _preserve
    }
  }

  _addPropToComponentRegistration(k, v) {
    const indexFile = this.destinationPath(`${this._getViewDir()}/index.js`)
    const tree = ast(this.fs.read(indexFile), escodegenOpts)

    tree
      .assignment('module.exports').value()
        .key(k).value(v)

    this.fs.write(this.destinationPath(indexFile), tree.toString())
  }

  _getAppDir() {
    const subdir = this.config.get('multiEntry')
      ? this.entry + '/'
      : ''
    return this.config.get('contentBase') + subdir
  }

  _getViewDir() {
    return this._getAppDir() + this.name
  }

  _p(o) { return new Promise((r) => this.prompt(o, (a) => r(a[o.name]))) }
}

module.exports = Generator
