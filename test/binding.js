import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:binding', async (t) => { // eslint-disable-line
  await runGenerator('binding', ['foo'])

  assert
    .file([
      'client/web_modules/bindings/foo/index.js',
      'client/web_modules/bindings/foo/foo.js',
      'client/web_modules/bindings/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/bindings/foo/index.js', 'ko.bindingHandlers.foo']
    ])
})
