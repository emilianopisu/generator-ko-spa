'use strict' // eslint-disable-line

const _ = require('lodash')
const co = require('co')
const ast = require('ast-query')
const Base = require('yeoman-generator').Base
const yosay = require('yosay')

class Generator extends Base {
  constructor() {
    super(...arguments)
    this.argument('appName', { required: false })
  }

  initializing() {
    const hasPkgJson = this.fs.exists(this.destinationPath('package.json'))
    const hasWebpackConfig = this.fs.exists(this.destinationPath('webpack.config.js'))

    if (!this.fs.exists(this.destinationPath('.git/HEAD'))) {
      this.composeWith('git-init', {}, {
        local: require.resolve('generator-git-init/generators/app')
      })
    }
    if (!hasWebpackConfig) {
      this.composeWith('npm-init', {
        options: {
          'skip-name': hasPkgJson,
          'skip-version': hasPkgJson,
          'skip-description': hasPkgJson,
          'skip-repo': hasPkgJson,
          'skip-keywords': hasPkgJson,
          'skip-author': hasPkgJson,
          'skip-license': hasPkgJson,

          'skip-test': true,
          'skip-main': true,

          test: 'nyc --reporter=lcov --reporter=html ava --verbose **/*.test.js'
        }
      }, {
        local: require.resolve('generator-npm-init/app')
      })
    }

    if (this.config.get('multiEntry') === false) {
      throw new Error(`
        This project wasn\'t set-up for multiple entry points;
        you'll have to do some manual tweaking.
      `)
    }

    this.config.defaults({
      contentBase: 'client/',
      path: 'client/dist',
      publicPath: '/dist/'
    })
  }

  prompting() {
    const done = this.async()
    const hasWebpackConfig = this.fs.exists(this.destinationPath('webpack.config.js'))

    this.log(yosay(`
      Hey there! Ready to get started writing kickass Knockout apps?
      Let\'s go!
    `))

    co(function* () {
      if (!hasWebpackConfig) {
        this.config.set('contentBase', yield this._p({
          type: 'input',
          name: 'contentBase',
          message: 'content base:',
          default: 'client/'
        }))

        this.config.set('path', yield this._p({
          type: 'input',
          name: 'path',
          message: 'path:',
          default: `${this.config.get('contentBase')}dist`
        }))

        this.config.set('publicPath', yield this._p({
          type: 'input',
          name: 'publicPath',
          message: 'public path:',
          default: '/dist/'
        }))
      }

      if (this.appName) {
        if (this.config.get('multiEntry') !== false) {
          this.config.set('multiEntry', true)
        }
      } else if (typeof this.config.get('multiEntry') === 'undefined') {
        this.config.set('multiEntry', yield this._p({
          type: 'confirm',
          name: 'multiEntry',
          message: 'multiple entry points?',
          default: false
        }))
        if (this.config.get('multiEntry')) {
          this.appName = yield this._p({
            type: 'input',
            name: 'appName',
            message: 'app name:',
            default: 'app'
          })
        } else {
          this.appName = 'app'
        }
      }
    }.bind(this)).then(done)
  }

  configuring() {
    const dotfiles = [
      '.babelrc',
      '.editorconfig',
      '.eslintrc'
    ]

    for (const f in dotfiles) {
      const file = dotfiles[f]

      if (!this.fs.exists(this.destinationPath(file))) {
        this.fs.copy(this.templatePath(file), this.destinationPath(file))
      }
    }
  }

  writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {})
    const appDir = this.config.get('multiEntry')
      ? this.appName + '/'
      : ''

    _.merge(pkg, {
      scripts: {
        'build': 'webpack',
        'build:prod': 'webpack -p',
        'watch': 'webpack --watch',
        'watch:prod': 'webpack --watch -p',
        'serve': 'webpack-dev-server',
        'serve:prod': 'webpack-dev-server -p'
      }
    })

    this.fs.writeJSON(this.destinationPath('package.json'), pkg)

    if (!this.fs.exists(this.destinationPath('webpack.config.js'))) {
      this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'),
        {
          contentBase: this.config.get('contentBase'),
          path: this.config.get('path'),
          publicPath: this.config.get('publicPath')
        })
    }

    const tree = ast(this.fs.read(this.destinationPath('webpack.config.js')))
    tree
      .assignment('module.exports').value()
        .key('entry')
          .key(this.appName).value(`'./${this.config.get('contentBase')}${appDir}app.js'`)
    this.fs.write(this.destinationPath('webpack.config.js'), tree.toString())

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath(`${this.config.get('contentBase')}${appDir}index.html`),
      {
        publicPath: this.config.get('publicPath'),
        appName: this.appName
      }
    )

    this.fs.copy(
      this.templatePath('routes.js'),
      this.destinationPath(`${this.config.get('contentBase')}${appDir}routes.js`)
    )

    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath(`${this.config.get('contentBase')}${appDir}app.js`)
    )
  }

  install() {
    this.npmInstall([
      'jquery',
      'knockout',
      'knockout-punches',
      'ko-component-router',
      'lodash'
    ], {
      save: true
    })

    this.npmInstall([
      'ava',
      'babel-core',
      'babel-loader',
      'babel-plugin-transform-runtime',
      'babel-preset-es2015',
      'bundle-loader',
      'css-loader',
      'eslint',
      'file-loader',
      'html-loader',
      'image-webpack-loader',
      'ko-component-router',
      'node-sass',
      'nyc',
      'sass-loader',
      'style-loader',
      'url-loader',
      'webpack',
      'webpack-dev-server'
    ], {
      saveDev: true
    })
  }

  _p(opts) {
    return new Promise((resolve) => {
      this.prompt(opts, (res) => resolve(res[opts.name]))
    })
  }
}

module.exports = Generator
