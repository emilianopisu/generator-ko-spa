import test from 'ava'
import assert from 'yeoman-assert'

import { runGenerator } from '../utils/test-utils'

test('generator-ko-spa:app single-entry', async () => {
  await runGenerator('app')

  assert
    .file([
      '.babelrc',
      '.editorconfig',
      '.eslintrc',
      '.git/HEAD',
      'package.json',
      'webpack.config.js',
      'client/app.js',
      'client/index.html',
      'client/routes.js'
    ])

  assert
    .fileContent([
      ['client/index.html', '<title>app</title>'],
      ['client/index.html', '<script src="/dist/app.js"></script>'],
      ['package.json', '"test": "karma start"'],
      ['karma.conf.js', 'basePath: path.resolve(__dirname, \'client/\')'],
      ['webpack.config.js', 'contentBase: \'client/\''],
      ['webpack.config.js', 'path: \'client/dist\''],
      ['webpack.config.js', 'publicPath: \'/dist/\''],
      ['webpack.config.js', 'app: \'./client/app.js\'']
    ])
})

test('generator-ko-spa:app multi-entry (via args)', async () => {
  await runGenerator('app', ['foo'])

  assert
    .file([
      'client/foo/app.js',
      'client/foo/index.html',
      'client/foo/routes.js'
    ])

  assert
    .fileContent([
      ['client/foo/index.html', '<script src="/dist/foo.js"></script>'],
      ['webpack.config.js', 'foo: \'./client/foo/app.js\'']
    ])
})

test('generator-ko-spa:app multi-entry (via prompt)', async () => {
  await runGenerator('app', null, { multiEntry: true, appName: 'foo' })

  assert
    .file([
      'client/foo/app.js',
      'client/foo/index.html',
      'client/foo/routes.js'
    ])

  assert
    .fileContent([
      ['client/foo/index.html', '<title>foo</title>'],
      ['client/foo/index.html', '<script src="/dist/foo.js"></script>'],
      ['webpack.config.js', 'foo: \'./client/foo/app.js\'']
    ])
})

test('generator-ko-spa:app single-entry (repeated)', (t) => {
  runGenerator('app', null, null, null, { multiEntry: false })
    .then(() => t.fail())
    .catch(() => t.pass())
})
