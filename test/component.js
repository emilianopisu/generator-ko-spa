import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:component', async () => {
  await runGenerator('component', ['foo'])

  assert
    .file([
      'client/web_modules/components/foo/index.js',
      'client/web_modules/components/foo/foo.js',
      'client/web_modules/components/foo/foo.html',
      'client/web_modules/components/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['client/web_modules/components/foo/index.js', 'template: require(\'./foo.html\')'],
      ['client/web_modules/components/foo/index.js', 'viewModel: require(\'./foo.js\')'],
      ['client/web_modules/components/foo/foo.html', 'foo'],
      ['client/web_modules/components/foo/foo.js', 'FooViewModel'],
      ['client/web_modules/components/foo/foo.test.js', 'test(\'components/foo\'']
    ])
})

test('generator-ko-spa:component --template-only', async () => {
  await runGenerator('component', ['foo'], null, { 'template-only': true })

  assert
    .noFile([
      'client/web_modules/components/foo/foo.js',
      'client/web_modules/components/foo/foo.test.js'
    ])

  assert
    .noFileContent([
      ['client/web_modules/components/foo/index.js', 'viewModel']
    ])
})

test('generator-ko-spa:component --synchronous', async () => {
  await runGenerator('component', ['foo'], null, { synchronous: true })

  assert
    .fileContent([
      ['client/web_modules/components/foo/index.js', 'synchronous: true']
    ])
})
