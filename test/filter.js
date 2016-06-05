import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:filter (via args)', async () => {
  await runGenerator('filter', { args: 'foo' })

  assert
    .file([
      'web_modules/filters/foo/index.js',
      'web_modules/filters/foo/foo.js',
      'web_modules/filters/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/filters/foo/index.js', 'ko.filters.foo'],
      ['web_modules/filters/foo/foo.test.js', 'describe(\'filters/foo\'']
    ])
})

test('generator-ko-spa:filter (via prompt)', async () => {
  await runGenerator('filter', { prompts: { name: 'foo' } })

  assert
    .file([
      'web_modules/filters/foo/index.js',
      'web_modules/filters/foo/foo.js',
      'web_modules/filters/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/filters/foo/index.js', 'ko.filters.foo'],
      ['web_modules/filters/foo/foo.test.js', 'describe(\'filters/foo\'']
    ])
})
