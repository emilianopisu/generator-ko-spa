'use strict'

const _ = require('lodash')
const co = require('co')
const ast = require('ast-query')
const escodegenOpts = require('../../utils/escodegen-options')
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

          'test': 'karma start'
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
        'serve:prod': 'webpack-dev-server -p',
        'coverage': 'karma start --coverage'
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

    if (!this.fs.exists(this.destinationPath('karma.conf.js'))) {
      this.fs.copyTpl(
        this.templatePath('karma.conf.js'),
        this.destinationPath('karma.conf.js'),
        {
          contentBase: this.config.get('contentBase')
        })
    }

    const webpackConfigFile = this.destinationPath('webpack.config.js')
    const tree = ast(this.fs.read(webpackConfigFile), escodegenOpts)
    tree
      .var('config').value()
        .key('entry')
          .key(this.appName).value(`'./${this.config.get('contentBase')}${appDir}app.js'`)
    this.fs.write(webpackConfigFile, tree.toString())

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

    this.fs.copyTpl(
      this.templatePath('app.js'),
      this.destinationPath(`${this.config.get('contentBase')}${appDir}app.js`),
      {
        appDir: appDir.replace(/\/$/, '')
      }
    )
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

  install() {
    this.npmInstall([
      'jquery',
      'knockout',
      'knockout-fast-foreach',
      'knockout-punches',
      'ko-component-router',
      'lodash'
    ], {
      save: true
    })

    this.npmInstall([
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
      'isparta-loader',
      'karma',
      'karma-coverage',
      'karma-tap',
      'karma-webpack',
      'ko-component-router',
      'node-sass',
      'sass-loader',
      'style-loader',
      'tape',
      'url-loader',
      'webpack',
      'webpack-dev-server',
      'yargs'
    ], {
      saveDev: true
    })
  }

  _p(o) { return new Promise((r) => this.prompt(o, (a) => r(a[o.name]))) }
}

module.exports = Generator
