import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:util (via args)', async () => {
  await runGenerator('util', { args: 'foo' })

  assert
    .file([
      'web_modules/utils/foo/index.js',
      'web_modules/utils/foo/foo.js',
      'web_modules/utils/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/utils/foo/index.js', 'export default foo'],
      ['web_modules/utils/foo/foo.test.js', 'describe(\'utils/foo\''],
      ['web_modules/utils/foo/foo.test.js', 'import foo from \'../foo\'']
    ])
})

test('generator-ko-spa:util (via prompts)', async () => {
  await runGenerator('util', { prompts: { name: 'foo' } })

  assert
    .file([
      'web_modules/utils/foo/index.js',
      'web_modules/utils/foo/foo.js',
      'web_modules/utils/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/utils/foo/index.js', 'export default foo'],
      ['web_modules/utils/foo/foo.test.js', 'describe(\'utils/foo\''],
      ['web_modules/utils/foo/foo.test.js', 'import foo from \'../foo\'']
    ])
})
