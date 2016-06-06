import _ from 'lodash'
import test from 'ava'
import assert from 'yeoman-assert'
import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:util', async () => {
  await runGenerator('util', { args: 'foo' })

  assertFilesAndContent({
    'web_modules/utils/foo/index.js': [
      './foo'
    ],
    'web_modules/utils/foo/foo.js': [],
    'web_modules/utils/foo/foo.test.js': [
      '../foo',
      'utils/foo'
    ]
  })

  await runGenerator('util', { prompts: { name: 'bar' } })

  assertFilesAndContent({
    'web_modules/utils/bar/index.js': [
      './bar'
    ],
    'web_modules/utils/bar/bar.js': [],
    'web_modules/utils/bar/bar.test.js': [
      '../bar',
      'utils/bar'
    ]
  })
})

test('generator-ko-spa:util / modules / es2015', async () => {
  await runGenerator('util', { args: 'foo' })

  assertFilesAndContent({
    'web_modules/utils/foo/index.js': [
      'import foo from \'./foo\'',
      'export default foo'
    ],
    'web_modules/utils/foo/foo.js': [
    ],
    'web_modules/utils/foo/foo.test.js': [
      'import foo from \'../foo\''
    ]
  })
})

test('generator-ko-spa:util / modules / commonjs', async () => {
  await runGenerator('util', { args: 'foo', config: { 'USE_REQUIRE_SYNTAX': true } })

  assertFilesAndContent({
    'web_modules/utils/foo/index.js': [
      'use strict',
      'module.exports = require(\'./foo\')',
    ],
    'web_modules/utils/foo/foo.js': [
      'use strict'
    ],
    'web_modules/utils/foo/foo.test.js': [
      'use strict',
      'const foo = require(\'../foo\')'
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
