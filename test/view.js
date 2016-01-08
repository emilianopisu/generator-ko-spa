import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:view', async () => {
  await runGenerator('view', ['foo'], null, { multiEntry: false })

  assert
    .file([
      'client/web_modules/views/foo/index.js',
      'client/web_modules/views/foo/foo.js',
      'client/web_modules/views/foo/foo.html',
      'client/web_modules/views/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/views/foo/index.js', 'template: require(\'./foo.html\')'],
      ['client/web_modules/views/foo/index.js', 'viewModel: require(\'./foo.js\')'],
      ['client/web_modules/views/foo/foo.html', 'foo'],
      ['client/web_modules/views/foo/foo.js', 'FooViewModel'],
      ['client/web_modules/views/foo/foo.test.js', 'test(\'views/foo\'']
    ])
})

test('generator-ko-spa:view (multi-entry)', async () => {
  await runGenerator('view', ['foo'], null, { multiEntry: true })

  assert
    .noFile([
      'client/web_modules/views/foo/foo.js',
      'client/web_modules/views/foo/foo.test.js'
    ])

  assert
    .noFileContent([
      ['client/web_modules/views/foo/index.js', 'viewModel']
    ])
})

test('generator-ko-spa:view (multi-entry, missing appName argument)', async () => {
  await runGenerator('view', ['foo'], null, { multiEntry: true })

  assert
    .noFile([
      'client/web_modules/views/foo/foo.js',
      'client/web_modules/views/foo/foo.test.js'
    ])

  assert
    .noFileContent([
      ['client/web_modules/views/foo/index.js', 'viewModel']
    ])
})

test('generator-ko-spa:view --synchronous', async () => {
  await runGenerator('view', ['foo'], null, { synchronous: true })

  assert
    .fileContent([
      ['client/web_modules/views/foo/index.js', 'synchronous: true']
    ])
})
