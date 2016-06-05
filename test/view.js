// import test from 'ava'
// import assert from 'yeoman-assert'
// import { runGenerator } from '../utils/test-utils'
//
// test('generator-ko-spa:view (single-entry via args)', async () => {
//   const persistentDir = await runGenerator('app')
//   await runGenerator('view', ['bar', '/foo/bar'], null, null, null, persistentDir)
//
//   assert
//     .file([
//       'bar/index.js',
//       'bar/bar.html',
//       'bar/bar.js',
//       'bar/bar.test.js'
//     ])
//
//   assert
//     .fileContent([
//       ['routes.js', '\'/foo/bar\': \'bar\''],
//       ['bar/index.js', 'template: require(\'./bar.html\')'],
//       ['bar/index.js', 'viewModel: require(\'./bar.js\')'],
//       ['bar/bar.html', 'bar'],
//       ['bar/bar.js', 'BarViewModel'],
//       ['bar/bar.test.js', 'test(\'bar\'']
//     ])
// })
//
// test('generator-ko-spa:view (single-entry via prompts)', async () => {
//   const persistentDir = await runGenerator('app')
//   await runGenerator('view', null, {
//     name: 'bar',
//     route: '/foo/bar'
//   }, null, null, persistentDir)
//
//   assert
//     .file([
//       'bar/index.js',
//       'bar/bar.html',
//       'bar/bar.js',
//       'bar/bar.test.js'
//     ])
//
//   assert
//     .fileContent([
//       ['routes.js', '\'/foo/bar\': \'bar\''],
//       ['bar/index.js', 'template: require(\'./bar.html\')'],
//       ['bar/index.js', 'viewModel: require(\'./bar.js\')'],
//       ['bar/bar.html', 'bar'],
//       ['bar/bar.js', 'BarViewModel'],
//       ['bar/bar.test.js', 'test(\'bar\'']
//     ])
// })
//
// test('generator-ko-spa:view (multi-entry via args)', async () => {
//   const persistentDir = await runGenerator('app', ['baz'])
//   await runGenerator('app', ['qux'], null, null, null, persistentDir)
//   await runGenerator('view', ['qux', 'bar', '/foo/bar'], null, null, null, persistentDir)
//
//   assert
//     .file([
//       'qux/bar/index.js',
//       'qux/bar/bar.html',
//       'qux/bar/bar.js',
//       'qux/bar/bar.test.js'
//     ])
//
//   assert
//     .fileContent([
//       ['qux/routes.js', '\'/foo/bar\': \'bar\''],
//       ['qux/bar/index.js', 'template: require(\'./bar.html\')'],
//       ['qux/bar/index.js', 'viewModel: require(\'./bar.js\')'],
//       ['qux/bar/bar.html', 'bar'],
//       ['qux/bar/bar.js', 'BarViewModel'],
//       ['qux/bar/bar.test.js', 'test(\'qux/bar\'']
//     ])
// })
//
// test('generator-ko-spa:view (multi-entry — but only one entry — via args)', async () => {
//   const persistentDir = await runGenerator('app', ['qux'])
//   await runGenerator('view', ['bar', '/foo/bar'], null, null, null, persistentDir)
//
//   assert
//     .file([
//       'qux/bar/index.js',
//       'qux/bar/bar.html',
//       'qux/bar/bar.js',
//       'qux/bar/bar.test.js'
//     ])
//
//   assert
//     .fileContent([
//       ['qux/routes.js', '\'/foo/bar\': \'bar\''],
//       ['qux/bar/index.js', 'template: require(\'./bar.html\')'],
//       ['qux/bar/index.js', 'viewModel: require(\'./bar.js\')'],
//       ['qux/bar/bar.html', 'bar'],
//       ['qux/bar/bar.js', 'BarViewModel'],
//       ['qux/bar/bar.test.js', 'test(\'qux/bar\'']
//     ])
// })
//
// test('generator-ko-spa:view (multi-entry via prompts)', async () => {
//   const persistentDir = await runGenerator('app', ['baz'])
//   await runGenerator('app', ['qux'], null, null, null, persistentDir)
//   await runGenerator('view', null, {
//     entry: 'qux',
//     name: 'bar',
//     route: '/foo/bar'
//   }, null, null, persistentDir)
//
//   assert
//     .file([
//       'qux/bar/index.js',
//       'qux/bar/bar.html',
//       'qux/bar/bar.js',
//       'qux/bar/bar.test.js'
//     ])
//
//   assert
//     .fileContent([
//       ['qux/routes.js', '\'/foo/bar\': \'bar\''],
//       ['qux/bar/index.js', 'template: require(\'./bar.html\')'],
//       ['qux/bar/index.js', 'viewModel: require(\'./bar.js\')'],
//       ['qux/bar/bar.html', 'bar'],
//       ['qux/bar/bar.js', 'BarViewModel'],
//       ['qux/bar/bar.test.js', 'test(\'qux/bar\'']
//     ])
// })
//
//
// test('generator-ko-spa:view --template-only', async () => {
//   const persistentDir = await runGenerator('app')
//   await runGenerator('view', ['foo'], null, { 'template-only': true }, null, persistentDir)
//
//   assert
//     .noFile([
//       'foo/foo.js',
//       'foo/foo.test.js'
//     ])
//
//   assert
//     .noFileContent([
//       ['foo/index.js', 'viewModel']
//     ])
// })
//
// test('generator-ko-spa:view --synchronous', async () => {
//   const persistentDir = await runGenerator('app')
//   await runGenerator('view', ['foo', '/foo'], null, { synchronous: true }, null, persistentDir)
//
//   assert
//     .fileContent([
//       ['foo/index.js', 'synchronous: true']
//     ])
// })
