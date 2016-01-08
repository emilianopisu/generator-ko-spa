'use strict'

const Base = require('yeoman-generator').Base

class Generator extends Base {
  constructor() {
    super(...arguments)
    this.argument('name', { required: true })
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
}

module.exports = Generator
