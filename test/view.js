import test from 'ava'
import assert from 'yeoman-assert'
import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:view (via args)', async () => {
  const dir = await runGenerator('app')
  await runGenerator('view', { args: ['bar', '/foo/bar'], dir })

  assert
    .file([
      'web_modules/views/bar/index.js',
      'web_modules/views/bar/bar.html',
      'web_modules/views/bar/bar.js',
      'web_modules/views/bar/bar.test.js'
    ])

  assert
    .fileContent([
      ['routes.json', '"/foo/bar": "bar"'],
      ['web_modules/views/bar/index.js', 'import template from \'./bar.html\''],
      ['web_modules/views/bar/index.js', 'import viewModel from \'./bar\''],
      ['web_modules/views/bar/bar.html', 'bar'],
      ['web_modules/views/bar/bar.js', 'Bar'],
      ['web_modules/views/bar/bar.test.js', 'describe(\'/foo/bar\'']
    ])
})

test('generator-ko-spa:view (via prompts)', async () => {
  const dir = await runGenerator('app')
  await runGenerator('view', {
    prompts: {
      name: 'bar',
      route: '/foo/bar'
    },
    dir
  })

  assert
    .file([
      'web_modules/views/bar/index.js',
      'web_modules/views/bar/bar.html',
      'web_modules/views/bar/bar.js',
      'web_modules/views/bar/bar.test.js'
    ])

  assert
    .fileContent([
      ['routes.json', '"/foo/bar": "bar"'],
      ['web_modules/views/bar/index.js', 'import template from \'./bar.html\''],
      ['web_modules/views/bar/index.js', 'import viewModel from \'./bar\''],
      ['web_modules/views/bar/bar.html', 'bar'],
      ['web_modules/views/bar/bar.js', 'Bar'],
      ['web_modules/views/bar/bar.test.js', 'describe(\'/foo/bar\'']
    ])
})

test('generator-ko-spa:view --template-only', async () => {
  const dir = await runGenerator('app')
  await runGenerator('view', { args: 'foo', opts: { 'template-only': true }, dir })

  assert
    .noFile([
      'web_modules/views/foo/foo.js',
      'web_modules/views/foo/foo.test.js'
    ])

  assert
    .noFileContent([
      ['web_modules/views/foo/index.js', 'viewModel']
    ])
})
