import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:extender (via args)', async (t) => {
  await runGenerator('extender', ['foo'])

  assert
    .file([
      'client/web_modules/extenders/foo/index.js',
      'client/web_modules/extenders/foo/foo.js',
      'client/web_modules/extenders/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/extenders/foo/index.js', 'ko.extenders.foo'],
      ['client/web_modules/extenders/foo/foo.test.js', 'test(\'extenders/foo\'']
    ])
})

test('generator-ko-spa:extender (via prompts)', async (t) => {
  await runGenerator('extender', null, { name: 'foo' })

  assert
    .file([
      'client/web_modules/extenders/foo/index.js',
      'client/web_modules/extenders/foo/foo.js',
      'client/web_modules/extenders/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/extenders/foo/index.js', 'ko.extenders.foo'],
      ['client/web_modules/extenders/foo/foo.test.js', 'test(\'extenders/foo\'']
    ])
})
