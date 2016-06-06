import _ from 'lodash'
import test from 'ava'
import assert from 'yeoman-assert'
import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:extender', async () => {
  await runGenerator('extender', { args: 'foo' })

  assertFilesAndContent({
    'web_modules/extenders/foo/index.js': [
      'ko.extenders.foo = foo',
      './foo'
    ],
    'web_modules/extenders/foo/foo.js': [],
    'web_modules/extenders/foo/foo.test.js': [
      '../foo',
      'extenders/foo',
      'ko.observable().extend({ foo: true })'
    ]
  })

  await runGenerator('extender', { prompts: { name: 'bar' } })

  assertFilesAndContent({
    'web_modules/extenders/bar/index.js': [
      'ko.extenders.bar = bar',
      './bar'
    ],
    'web_modules/extenders/bar/bar.js': [],
    'web_modules/extenders/bar/bar.test.js': [
      '../bar',
      'extenders/bar',
      'ko.observable().extend({ bar: true })'
    ]
  })
})

test('generator-ko-spa:extender / modules / es2015', async () => {
  await runGenerator('extender', { args: 'foo' })

  assertFilesAndContent({
    'web_modules/extenders/foo/index.js': [
      'import ko from \'knockout\'',
      'import foo from \'./foo\''
    ],
    'web_modules/extenders/foo/foo.js': [
      'export default function'
    ],
    'web_modules/extenders/foo/foo.test.js': [
      'import ko from \'knockout\'',
      'import \'../foo\''
    ]
  })
})

test('generator-ko-spa:extender / modules / commonjs', async () => {
  await runGenerator('extender', { args: 'foo', config: { 'USE_REQUIRE_SYNTAX': true } })

  assertFilesAndContent({
    'web_modules/extenders/foo/index.js': [
      'use strict',
      'const ko = require(\'knockout\')',
      'const foo = require(\'./foo\')'
    ],
    'web_modules/extenders/foo/foo.js': [
      'use strict',
      'module.exports = function'
    ],
    'web_modules/extenders/foo/foo.test.js': [
      'use strict',
      'const ko = require(\'knockout\')',
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
