import _ from 'lodash'
import test from 'ava'
import assert from 'yeoman-assert'
import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:binding', async () => {
  await runGenerator('binding', { args: 'foo' })

  assertFilesAndContent({
    'web_modules/bindings/foo/index.js': [
      'ko.bindingHandlers.foo = foo',
      './foo'
    ],
    'web_modules/bindings/foo/foo.js': [],
    'web_modules/bindings/foo/foo.test.js': [
      '../foo',
      'bindings/foo',
      'foo: value'
    ]
  })

  await runGenerator('binding', { prompts: { name: 'bar' } })

  assertFilesAndContent({
    'web_modules/bindings/bar/index.js': [
      'ko.bindingHandlers.bar = bar',
      './bar'
    ],
    'web_modules/bindings/bar/bar.js': [],
    'web_modules/bindings/bar/bar.test.js': [
      '../bar',
      'bindings/bar',
      'bar: value'
    ]
  })
})

test('generator-ko-spa:binding / modules / es2015', async () => {
  await runGenerator('binding', { args: 'foo' })

  assertFilesAndContent({
    'web_modules/bindings/foo/index.js': [
      'import ko from \'knockout\'',
      'import foo from \'./foo\''
    ],
    'web_modules/bindings/foo/foo.js': [
      'export default {'
    ],
    'web_modules/bindings/foo/foo.test.js': [
      'import { renderHtml } from \'ko-component-tester\'',
      'import \'../foo\''
    ]
  })
})

test('generator-ko-spa:binding / modules / commonjs', async () => {
  await runGenerator('binding', { args: 'foo', config: { 'USE_REQUIRE_SYNTAX': true } })

  assertFilesAndContent({
    'web_modules/bindings/foo/index.js': [
      'use strict',
      'const ko = require(\'knockout\')',
      'const foo = require(\'./foo\')'
    ],
    'web_modules/bindings/foo/foo.js': [
      'use strict',
      'module.exports = {'
    ],
    'web_modules/bindings/foo/foo.test.js': [
      'use strict',
      'const { renderHtml } = require(\'ko-component-tester\')',
      'require(\'../foo\')'
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
