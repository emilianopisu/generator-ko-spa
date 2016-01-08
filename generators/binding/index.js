'use strict' // eslint-disable-line

const Base = require('yeoman-generator').Base
const yosay = require('yosay')

class Generator extends Base {
  constructor() {
    super(...arguments)
    this.argument('bindingName', { required: true })
  }

  writing() {
    const bindingDir = `${this.config.get('contentBase')}web_modules/bindings/${this.bindingName}`
    const bindingName = this.bindingName

    this.fs.copy(
      this.templatePath('binding.js'),
      this.destinationPath(
        `${bindingDir}/${bindingName}.js`)
    )

    this.fs.copyTpl(
      this.templatePath('binding.test.js'),
      this.destinationPath(
        `${bindingDir}/${bindingName}.test.js`),
      {
        bindingName
      }
    )

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(
        `${bindingDir}/index.js`),
      {
        bindingName
      }
    )
  }

  end() {
    this.log(yosay(`
      Don't forget!
      You have to call
      require('bindings/${this.bindingName}')
      before it's available to use
    `))
  }
}

module.exports = Generator
