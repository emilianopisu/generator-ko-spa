import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:component (via args)', async () => {
  await runGenerator('component', { args: 'foo' })

  assert
    .file([
      'web_modules/components/foo/index.js',
      'web_modules/components/foo/foo.js',
      'web_modules/components/foo/foo.html',
      'web_modules/components/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/components/foo/index.js', 'import template from \'./foo.html\''],
      ['web_modules/components/foo/index.js', 'import viewModel from \'./foo\''],
      ['web_modules/components/foo/foo.html', 'foo'],
      ['web_modules/components/foo/foo.js', 'Foo'],
      ['web_modules/components/foo/foo.test.js', 'describe(\'components/foo\'']
    ])
})

test('generator-ko-spa:component (via prompts)', async () => {
  await runGenerator('component', { prompts: { name: 'foo' } })

  assert
    .file([
      'web_modules/components/foo/index.js',
      'web_modules/components/foo/foo.js',
      'web_modules/components/foo/foo.html',
      'web_modules/components/foo/foo.test.js'
    ])

  assert
    .fileContent([
      ['web_modules/components/foo/index.js', 'import template from \'./foo.html\''],
      ['web_modules/components/foo/index.js', 'import viewModel from \'./foo\''],
      ['web_modules/components/foo/foo.html', 'foo'],
      ['web_modules/components/foo/foo.js', 'Foo'],
      ['web_modules/components/foo/foo.test.js', 'describe(\'components/foo\'']
    ])
})

test('generator-ko-spa:component --template-only', async () => {
  await runGenerator('component', { args: 'foo', opts: { 'template-only': true } })

  assert
    .noFile([
      'web_modules/components/foo/foo.js',
      'web_modules/components/foo/foo.test.js'
    ])

  assert
    .noFileContent([
      ['web_modules/components/foo/index.js', 'viewModel']
    ])
})
