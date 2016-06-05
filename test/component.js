// import test from 'ava'
// import assert from 'yeoman-assert'
//
// import { runGenerator } from '../utils/test-utils'
//
// test('generator-ko-spa:component (via args)', async () => {
//   await runGenerator('component', ['foo'])
//
//   assert
//     .file([
//       'web_modules/components/foo/index.js',
//       'web_modules/components/foo/foo.js',
//       'web_modules/components/foo/foo.html',
//       'web_modules/components/foo/foo.test.js'
//     ])
//
//   assert
//     .fileContent([
//       ['web_modules/components/foo/index.js', 'template: require(\'./foo.html\')'],
//       ['web_modules/components/foo/index.js', 'viewModel: require(\'./foo.js\')'],
//       ['web_modules/components/foo/foo.html', 'foo'],
//       ['web_modules/components/foo/foo.js', 'FooViewModel'],
//       ['web_modules/components/foo/foo.test.js', 'test(\'components/foo\'']
//     ])
// })
//
// test('generator-ko-spa:component (via prompts)', async () => {
//   await runGenerator('component', null, { name: 'foo' })
//
//   assert
//     .file([
//       'web_modules/components/foo/index.js',
//       'web_modules/components/foo/foo.js',
//       'web_modules/components/foo/foo.html',
//       'web_modules/components/foo/foo.test.js'
//     ])
//
//   assert
//     .fileContent([
//       ['web_modules/components/foo/index.js', 'template: require(\'./foo.html\')'],
//       ['web_modules/components/foo/index.js', 'viewModel: require(\'./foo.js\')'],
//       ['web_modules/components/foo/foo.html', 'foo'],
//       ['web_modules/components/foo/foo.js', 'FooViewModel'],
//       ['web_modules/components/foo/foo.test.js', 'test(\'components/foo\'']
//     ])
// })
//
// test('generator-ko-spa:component --template-only', async () => {
//   await runGenerator('component', ['foo'], null, { 'template-only': true })
//
//   assert
//     .noFile([
//       'web_modules/components/foo/foo.js',
//       'web_modules/components/foo/foo.test.js'
//     ])
//
//   assert
//     .noFileContent([
//       ['web_modules/components/foo/index.js', 'viewModel']
//     ])
// })
//
// test('generator-ko-spa:component --synchronous', async () => {
//   await runGenerator('component', ['foo'], null, { synchronous: true })
//
//   assert
//     .fileContent([
//       ['web_modules/components/foo/index.js', 'synchronous: true']
//     ])
// })
