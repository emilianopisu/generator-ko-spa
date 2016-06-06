import _ from 'lodash'
import test from 'ava'
import assert from 'yeoman-assert'
import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:filter', async () => {
  await runGenerator('filter', { args: 'foo' })

  assertFilesAndContent({
    'web_modules/filters/foo/index.js': [
      'ko.filters.foo = foo',
      './foo'
    ],
    'web_modules/filters/foo/foo.js': [],
    'web_modules/filters/foo/foo.test.js': [
      '../foo',
      'filters/foo',
      'text: value | foo:arg'
    ]
  })

  await runGenerator('filter', { prompts: { name: 'bar' } })

  assertFilesAndContent({
    'web_modules/filters/bar/index.js': [
      'ko.filters.bar = bar',
      './bar'
    ],
    'web_modules/filters/bar/bar.js': [],
    'web_modules/filters/bar/bar.test.js': [
      '../bar',
      'filters/bar',
      'text: value | bar:arg'
    ]
  })
})

test('generator-ko-spa:filter / modules / es2015', async () => {
  await runGenerator('filter', { args: 'foo' })

  assertFilesAndContent({
    'web_modules/filters/foo/index.js': [
      'import ko from \'knockout\'',
      'import \'knockout-punches\'',
      'import foo from \'./foo\''
    ],
    'web_modules/filters/foo/foo.js': [
      'export default function'
    ],
    'web_modules/filters/foo/foo.test.js': [
      'import { renderHtml } from \'ko-component-tester\'',
      'import \'../foo\''
    ]
  })
})

test('generator-ko-spa:filter / modules / commonjs', async () => {
  await runGenerator('filter', { args: 'foo', config: { 'USE_REQUIRE_SYNTAX': true } })

  assertFilesAndContent({
    'web_modules/filters/foo/index.js': [
      'use strict',
      'const ko = require(\'knockout\')',
      'require(\'knockout-punches\')',
      'const foo = require(\'./foo\')'
    ],
    'web_modules/filters/foo/foo.js': [
      'use strict',
      'module.exports = function'
    ],
    'web_modules/filters/foo/foo.test.js': [
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
      assert.fileContent([[file, line]]))
  })
}
