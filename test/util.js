import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:util (via args)', async () => {
  await runGenerator('util', ['foo'])

  assert
    .file([
      'client/web_modules/utils/foo/index.js',
      'client/web_modules/utils/foo/foo.js',
      'client/web_modules/utils/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/utils/foo/index.js', 'module.exports = require(\'./foo\')'],
      ['client/web_modules/utils/foo/foo.test.js', 'test(\'utils/foo\''],
      ['client/web_modules/utils/foo/foo.test.js', 'import foo from \'./foo\'']
    ])
})

test('generator-ko-spa:util (via prompts)', async () => {
  await runGenerator('util', null, { name: 'foo' })

  assert
    .file([
      'client/web_modules/utils/foo/index.js',
      'client/web_modules/utils/foo/foo.js',
      'client/web_modules/utils/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/utils/foo/index.js', 'module.exports = require(\'./foo\')'],
      ['client/web_modules/utils/foo/foo.test.js', 'test(\'utils/foo\''],
      ['client/web_modules/utils/foo/foo.test.js', 'import foo from \'./foo\'']
    ])
})
