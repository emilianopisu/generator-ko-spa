import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:extender (via args)', async (t) => {
  await runGenerator('extender', { args: 'foo' })

  assert
    .file([
      'web_modules/extenders/foo/index.js',
      'web_modules/extenders/foo/foo.js',
      'web_modules/extenders/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/extenders/foo/index.js', 'ko.extenders.foo'],
      ['web_modules/extenders/foo/foo.test.js', 'describe(\'extenders/foo\'']
    ])
})

test('generator-ko-spa:extender (via prompts)', async (t) => {
  await runGenerator('extender', { prompts: { name: 'foo' } })

  assert
    .file([
      'web_modules/extenders/foo/index.js',
      'web_modules/extenders/foo/foo.js',
      'web_modules/extenders/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/extenders/foo/index.js', 'ko.extenders.foo'],
      ['web_modules/extenders/foo/foo.test.js', 'describe(\'extenders/foo\'']
    ])
})
