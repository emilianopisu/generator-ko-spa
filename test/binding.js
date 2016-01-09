import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:binding (via args)', async (t) => {
  await runGenerator('binding', ['foo'])

  assert
    .file([
      'client/web_modules/bindings/foo/index.js',
      'client/web_modules/bindings/foo/foo.js',
      'client/web_modules/bindings/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/bindings/foo/index.js', 'ko.bindingHandlers.foo'],
      ['client/web_modules/bindings/foo/foo.test.js', 'test(\'bindings/foo\'']
    ])
})

test('generator-ko-spa:binding (via prompts)', async (t) => {
  await runGenerator('binding', null, { name: 'foo' })

  assert
    .file([
      'client/web_modules/bindings/foo/index.js',
      'client/web_modules/bindings/foo/foo.js',
      'client/web_modules/bindings/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/bindings/foo/index.js', 'ko.bindingHandlers.foo'],
      ['client/web_modules/bindings/foo/foo.test.js', 'test(\'bindings/foo\'']
    ])
})
