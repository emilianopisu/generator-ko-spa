import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:filter', async () => {
  await runGenerator('filter', ['foo'])

  assert
    .file([
      'client/web_modules/filters/foo/index.js',
      'client/web_modules/filters/foo/foo.js',
      'client/web_modules/filters/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/filters/foo/index.js', 'ko.filters.foo'],
      ['client/web_modules/filters/foo/foo.test.js', 'test(\'filters/foo\'']
    ])
})
