'use strict'

const Base = require('yeoman-generator').Base
const yosay = require('yosay')

class Generator extends Base {
  constructor() {
    super(...arguments)
    this.argument('name', { required: true })
  }

  writing() {
    const dir = `${this.config.get('contentBase')}web_modules/filters/${this.name}`
    const name = this.name

    this.fs.copy(
      this.templatePath('filter.js'),
      this.destinationPath(
        `${dir}/${name}.js`)
    )

    this.fs.copyTpl(
      this.templatePath('filter.test.js'),
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

  end() {
    this.log(yosay(`
      Don't forget!
      You have to call
      require('filters/${this.name}')
      before it's available to use
    `))
  }
}

module.exports = Generator
