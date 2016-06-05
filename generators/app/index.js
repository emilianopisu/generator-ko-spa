'use strict'

const _ = require('lodash')
const co = require('co')
const { Base } = require('yeoman-generator')
const yosay = require('yosay')

const APP_NAME = 'APP_NAME'
const USE_REQUIRE_SYNTAX = 'USE_REQUIRE_SYNTAX'
const TEST_FRAMEWORK = 'TEST_FRAMEWORK'

class Generator extends Base {
  constructor() {
    super(...arguments)
    this.argument(APP_NAME, { required: false })
  }

  initializing() {
    this._initGit()
    this._initNpm()
  }

  prompting() {
    const done = this.async()

    this.log(yosay(`
      Hey there! Ready to get started writing kickass Knockout apps?
      Let\'s go!
    `))

    co(function* () {
      this.config.set(USE_REQUIRE_SYNTAX, yield this._p({
        type: 'list',
        name: USE_REQUIRE_SYNTAX,
        message: 'module system',
        choices: [
          {
            name: 'ES2015 `import/from`',
            value: false,
            short: 'es'
          },
          {
            name: 'CommonJS `require`',
            value: true,
            short: 'cjs'
          }
        ],
        default: false
      }))

      this.config.set(TEST_FRAMEWORK, yield this._p({
        type: 'list',
        name: TEST_FRAMEWORK,
        message: 'test framework',
        choices: ['mocha', 'tape', 'none'],
        default: 'mocha'
      }))
    }.bind(this)).then(done)
  }

  writing() {
    const files = [
      '.babelrc',
      '.gitignore',
      'app.js',
      'index.html',
      'routes.js',
      'config/index.js',
      'config/local.js.sample',
      'config/server.js',
      'config/webpack.js',
      'Gulpfile.js/build.js',
      'Gulpfile.js/clean.js',
      'Gulpfile.js/index.js',
      'Gulpfile.js/README.md',
      'Gulpfile.js/serve.js',
      'Gulpfile.js/test.js',
      'Gulpfile.js/vendor.js',
      'Gulpfile.js/watch.js',
      'Gulpfile.js/utils/webpack.js',
      'web_modules/bindings/.gitkeep',
      'web_modules/components/.gitkeep',
      'web_modules/filters/.gitkeep',
      'web_modules/utils/.gitkeep',
      'web_modules/views/.gitkeep'
    ]

    if (this.config.get(TEST_FRAMEWORK) !== 'none') {
      files.push(...[
        'config/karma.js',
        'Gulpfile.js/utils/karma.js'
      ])
    }

    _.each(files, (f) => this.fs.copyTpl(
      this.templatePath(f),
      this.destinationPath(f),
      {
        APP_NAME: this.config.get('APP_NAME'),
        USE_REQUIRE_SYNTAX: this.config.get('USE_REQUIRE_SYNTAX'),
        TEST_FRAMEWORK: this.config.get('TEST_FRAMEWORK')
      }))
  }

  install() {
    const dependencies = [
      'jquery',
      'knockout',
      'knockout-punches',
      'ko-component-router',
      'ko-contrib-utils',
      'lodash',
      'es6-promise'
    ]

    const devDependencies = [
      'babel-core',
      'babel-loader',
      'babel-plugin-transform-runtime',
      'babel-preset-es2015',
      'bundle-loader',
      'css-loader',
      'file-loader',
      'fs-extra',
      'gulp',
      'html-loader',
      'image-webpack-loader',
      'node-sass',
      'readable-stream',
      'sass-loader',
      'style-loader',
      'url-loader',
      'webpack',
      'webpack-dev-server',
      'webpack-stats-plugin',
      'yargs'
    ]

    if (this.config.get(TEST_FRAMEWORK) !== 'none') {
      devDependencies.push(...[
        'karma',
        'karma-coverage',
        'karma-webpack',
        'isparta-loader'
      ])
    }

    switch (this.config.get(TEST_FRAMEWORK)) {
      case 'mocha':
        devDependencies.push(...['mocha', 'karma-mocha', 'chai'])
        break
      case 'tape':
        devDependencies.push(...['tape', 'karma-tap'])
        break
    }

    if (!this.config.get(USE_REQUIRE_SYNTAX)) {
      devDependencies.push('babel-plugin-transform-es2015-modules-commonjs')
    }

    this.npmInstall(dependencies, { save: true })
    this.npmInstall(devDependencies, { saveDev: true })
  }

  _p(o) { return new Promise((r) => this.prompt(o, (a) => r(a[o.name]))) }

  _fileExists(f) { return this.fs.exists(this.destinationPath(f)) }

  _initGit() {
    if (!this._fileExists('.git/HEAD')) {
      this.composeWith('git-init', {}, {
        local: require.resolve('generator-git-init/generators/app')
      })
    }
  }

  _initNpm() {
    if (!this._fileExists('package.json')) {
      this.composeWith('npm-init', {
        options: {
          scripts: {
            test: 'gulp test',
            start: 'gulp serve',
            build: 'gulp build'
          },
          version: '0.0.1',
          'skip-test': true,
          'skip-version': true,
          'skip-name': true,
          'skip-description': true,
          'skip-keywords': true
        }
      }, {
        local: require.resolve('generator-npm-init/app')
      })
    }
  }
}

module.exports = Generator
