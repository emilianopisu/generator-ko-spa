import test from 'ava'
import assert from 'yeoman-assert'
import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:view (single-entry via args)', async () => {
  const persistentDir = await runGenerator('app')
  await runGenerator('view', ['bar', '/foo/bar'], null, null, null, persistentDir)

  assert
    .file([
      'client/bar/index.js',
      'client/bar/bar.html',
      'client/bar/bar.js',
      'client/bar/bar.test.js'
    ])

  assert
    .fileContent([
      ['client/routes.js', '\'/foo/bar\': \'bar\''],
      ['client/bar/index.js', 'template: require(\'./bar.html\')'],
      ['client/bar/index.js', 'viewModel: require(\'./bar.js\')'],
      ['client/bar/bar.html', 'bar'],
      ['client/bar/bar.js', 'BarViewModel'],
      ['client/bar/bar.test.js', 'test(\'bar\'']
    ])
})

test('generator-ko-spa:view (single-entry via prompts)', async () => {
  const persistentDir = await runGenerator('app')
  await runGenerator('view', null, {
    name: 'bar',
    route: '/foo/bar'
  }, null, null, persistentDir)

  assert
    .file([
      'client/bar/index.js',
      'client/bar/bar.html',
      'client/bar/bar.js',
      'client/bar/bar.test.js'
    ])

  assert
    .fileContent([
      ['client/routes.js', '\'/foo/bar\': \'bar\''],
      ['client/bar/index.js', 'template: require(\'./bar.html\')'],
      ['client/bar/index.js', 'viewModel: require(\'./bar.js\')'],
      ['client/bar/bar.html', 'bar'],
      ['client/bar/bar.js', 'BarViewModel'],
      ['client/bar/bar.test.js', 'test(\'bar\'']
    ])
})

test('generator-ko-spa:view (multi-entry via args)', async () => {
  const persistentDir = await runGenerator('app', ['baz'])
  await runGenerator('app', ['qux'], null, null, null, persistentDir)
  await runGenerator('view', ['qux', 'bar', '/foo/bar'], null, null, null, persistentDir)

  assert
    .file([
      'client/qux/bar/index.js',
      'client/qux/bar/bar.html',
      'client/qux/bar/bar.js',
      'client/qux/bar/bar.test.js'
    ])

  assert
    .fileContent([
      ['client/qux/routes.js', '\'/foo/bar\': \'bar\''],
      ['client/qux/bar/index.js', 'template: require(\'./bar.html\')'],
      ['client/qux/bar/index.js', 'viewModel: require(\'./bar.js\')'],
      ['client/qux/bar/bar.html', 'bar'],
      ['client/qux/bar/bar.js', 'BarViewModel'],
      ['client/qux/bar/bar.test.js', 'test(\'qux/bar\'']
    ])
})

test('generator-ko-spa:view (multi-entry — but only one entry — via args)', async () => {
  const persistentDir = await runGenerator('app', ['qux'])
  await runGenerator('view', ['bar', '/foo/bar'], null, null, null, persistentDir)

  assert
    .file([
      'client/qux/bar/index.js',
      'client/qux/bar/bar.html',
      'client/qux/bar/bar.js',
      'client/qux/bar/bar.test.js'
    ])

  assert
    .fileContent([
      ['client/qux/routes.js', '\'/foo/bar\': \'bar\''],
      ['client/qux/bar/index.js', 'template: require(\'./bar.html\')'],
      ['client/qux/bar/index.js', 'viewModel: require(\'./bar.js\')'],
      ['client/qux/bar/bar.html', 'bar'],
      ['client/qux/bar/bar.js', 'BarViewModel'],
      ['client/qux/bar/bar.test.js', 'test(\'qux/bar\'']
    ])
})

test('generator-ko-spa:view (multi-entry via prompts)', async () => {
  const persistentDir = await runGenerator('app', ['baz'])
  await runGenerator('app', ['qux'], null, null, null, persistentDir)
  await runGenerator('view', null, {
    entry: 'qux',
    name: 'bar',
    route: '/foo/bar'
  }, null, null, persistentDir)

  assert
    .file([
      'client/qux/bar/index.js',
      'client/qux/bar/bar.html',
      'client/qux/bar/bar.js',
      'client/qux/bar/bar.test.js'
    ])

  assert
    .fileContent([
      ['client/qux/routes.js', '\'/foo/bar\': \'bar\''],
      ['client/qux/bar/index.js', 'template: require(\'./bar.html\')'],
      ['client/qux/bar/index.js', 'viewModel: require(\'./bar.js\')'],
      ['client/qux/bar/bar.html', 'bar'],
      ['client/qux/bar/bar.js', 'BarViewModel'],
      ['client/qux/bar/bar.test.js', 'test(\'qux/bar\'']
    ])
})


test('generator-ko-spa:view --template-only', async () => {
  const persistentDir = await runGenerator('app')
  await runGenerator('view', ['foo'], null, { 'template-only': true }, null, persistentDir)

  assert
    .noFile([
      'client/foo/foo.js',
      'client/foo/foo.test.js'
    ])

  assert
    .noFileContent([
      ['client/foo/index.js', 'viewModel']
    ])
})

test('generator-ko-spa:view --synchronous', async () => {
  const persistentDir = await runGenerator('app')
  await runGenerator('view', ['foo', '/foo'], null, { synchronous: true }, null, persistentDir)

  assert
    .fileContent([
      ['client/foo/index.js', 'synchronous: true']
    ])
})
