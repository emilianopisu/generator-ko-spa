'use strict'

const Base = require('yeoman-generator').Base
const yosay = require('yosay')
const ast = require('ast-query')

class Generator extends Base {
  constructor() {
    super(...arguments)
    this.argument('name', { required: true })

    this.option('template-only')
    this.option('synchronous')
  }

  writing() {
    const dir = `${this.config.get('contentBase')}web_modules/components/${this.name}`
    const name = this.name
    const capitalizedName = (() => name[0].toUpperCase() + name.substring(1))()

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(
        `${dir}/index.js`),
      {
        name
      }
    )

    this.fs.copyTpl(
      this.templatePath('component.html'),
      this.destinationPath(
        `${dir}/${name}.html`),
      {
        name
      }
    )

    if (this.options['template-only'] !== true) {
      this._addPropToComponentRegistration('viewModel', `require('./${name}.js')`)

      this.fs.copyTpl(
        this.templatePath('component.js'),
        this.destinationPath(
          `${dir}/${name}.js`),
        {
          capitalizedName
        }
      )

      this.fs.copyTpl(
        this.templatePath('component.test.js'),
        this.destinationPath(
          `${dir}/${name}.test.js`),
        {
          name,
          capitalizedName
        }
      )
    }

    if (this.options['synchronous']) {
      this._addPropToComponentRegistration('synchronous', 'true')
    }
  }

  end() {
    this.log(yosay(`
      Don't forget!
      You have to call
      require('components/${this.name}')
      before it's available to use
    `))
  }

  _addPropToComponentRegistration(k, v) {
    const indexFile = this.destinationPath(`${this.config.get('contentBase')}web_modules/components/${this.name}/index.js`)
    const tree = ast(this.fs.read(indexFile))

    tree
      .callExpression('ko.components.register')
        .arguments
        .at(1)
        .key(k)
        .value(v)

    this.fs.write(this.destinationPath(indexFile), tree.toString())
  }
}

module.exports = Generator
