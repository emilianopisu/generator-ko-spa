import _ from 'lodash'
import test from 'ava'
import assert from 'yeoman-assert'
import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:view', async () => {
  await runGenerator('view', { args: ['foo', '/foo'] })

  assertFilesAndContent({
    'routes.json': [
      '"/foo": "foo"'
    ],
    'web_modules/views/foo/index.js': [
      '\'./foo.html\'',
      '\'./foo\''
    ],
    'web_modules/views/foo/foo.html': [
      '/foo'
    ],
    'web_modules/views/foo/foo.js': [
      'class Foo'
    ],
    'web_modules/views/foo/foo.test.js': [
      '\'../foo\'',
      '\'/foo\''
    ]
  })

  await runGenerator('view', {
    prompts: {
      name: 'bar',
      route: '/bar'
    }
  })

  assertFilesAndContent({
    'routes.json': [
      '"/bar": "bar"'
    ],
    'web_modules/views/bar/index.js': [
      '\'./bar.html\'',
      '\'./bar\''
    ],
    'web_modules/views/bar/bar.html': [
      '/bar'
    ],
    'web_modules/views/bar/bar.js': [
      'class Bar'
    ],
    'web_modules/views/bar/bar.test.js': [
      '\'../bar\'',
      '\'/bar\''
    ]
  })
})

test('generator-ko-spa:view / opts / --template-only', async () => {
  await runGenerator('view', { args: 'foo', opts: { 'template-only': true } })

  assert
    .noFile([
      'web_modules/views/foo/foo.js',
      'web_modules/views/foo/foo.test.js'
    ])

  assert
    .noFileContent([
      ['web_modules/views/foo/index.js', 'viewModel']
    ])

  assertFilesAndContent({
    'web_modules/views/foo/index.js': '{ template }'
  })
})

test('generator-ko-spa:view / modules / es2015', async () => {
  await runGenerator('view', { args: 'foo' })

  assertFilesAndContent({
    'web_modules/views/foo/index.js': [
      'import template from \'./foo.html\'',
      'import viewModel from \'./foo\'',
      'export default { template, viewModel }'
    ],
    'web_modules/views/foo/foo.js': [
      'export default Foo'
    ],
    'web_modules/views/foo/foo.test.js': [
      'import { renderComponent } from \'ko-component-tester\'',
      'import RouterContext from \'ko-component-router/lib/context\'',
      'import routes from \'../../../routes\'',
      'import SUT from \'../foo\''
    ]
  })
})

test('generator-ko-spa:view / modules / commonjs', async () => {
  await runGenerator('view', { args: ['foo', '/foo'], config: { 'USE_REQUIRE_SYNTAX': true } })

  assertFilesAndContent({
    'web_modules/views/foo/index.js': [
      'use strict',
      'const template = require(\'./foo.html\')',
      'const viewModel = require(\'./foo\')',
      'module.exports = { template, viewModel }'
    ],
    'web_modules/views/foo/foo.js': [
      'use strict',
      'module.exports = Foo'
    ],
    'web_modules/views/foo/foo.test.js': [
      'use strict',
      'const { renderComponent } = require(\'ko-component-tester\')',
      'const RouterContext = require(\'ko-component-router/lib/context\')',
      'const routes = require(\'../../../routes\')',
      'const SUT = require(\'../foo\')'
    ]
  })
})

function assertFilesAndContent(files) {
  _.each(files, (lines, file) => {
    assert.file(file)
    _.each(lines, (line) =>
      assert.fileContent([ [file, line] ]))
  })
}
