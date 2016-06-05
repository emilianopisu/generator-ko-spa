import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:binding (via args)', async () => {
  await runGenerator('binding', {
    args: ['foo']
  })

  assert
    .file([
      'web_modules/bindings/foo/index.js',
      'web_modules/bindings/foo/foo.js',
      'web_modules/bindings/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/bindings/foo/index.js', 'ko.bindingHandlers.foo'],
      ['web_modules/bindings/foo/foo.test.js', 'describe(\'bindings/foo\'']
    ])
})

test('generator-ko-spa:binding (via prompts)', async (t) => {
  await runGenerator('binding', {
    prompts: {
      name: 'foo'
    }
  })

  assert
    .file([
      'web_modules/bindings/foo/index.js',
      'web_modules/bindings/foo/foo.js',
      'web_modules/bindings/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/bindings/foo/index.js', 'ko.bindingHandlers.foo'],
      ['web_modules/bindings/foo/foo.test.js', 'describe(\'bindings/foo\'']
    ])
})
