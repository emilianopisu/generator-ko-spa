'use strict'

const co = require('co')
const Base = require('yeoman-generator').Base

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
    const dir = `${this.config.get('contentBase')}web_modules/utils/${this.name}`
    const name = this.name

    this.fs.copy(
      this.templatePath('util.js'),
      this.destinationPath(
        `${dir}/${name}.js`)
    )

    this.fs.copyTpl(
      this.templatePath('util.test.js'),
      this.destinationPath(
        `${dir}/${name}.test.js`),
      {
        name
      }
    )

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(
        `${dir}/index.js`),
      {
        name
      }
    )
  }

  _p(o) { return new Promise((r) => this.prompt(o, (a) => r(a[o.name]))) }
}

module.exports = Generator
