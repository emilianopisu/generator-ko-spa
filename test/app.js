import test from 'ava'
import assert from 'yeoman-assert'
import { exec } from 'child_process'

import { runGenerator } from '../utils/test-utils'

const files = [
  '.babelrc',
  '.gitignore',
  'app.js',
  'index.html',
  'routes.js',
  'config/index.js',
  'config/local.js.sample',
  'config/server.js',
  'config/webpack.js',
  'Gulpfile.js/build.js',
  'Gulpfile.js/clean.js',
  'Gulpfile.js/index.js',
  'Gulpfile.js/README.md',
  'Gulpfile.js/serve.js',
  'Gulpfile.js/test.js',
  'Gulpfile.js/vendor.js',
  'Gulpfile.js/watch.js',
  'Gulpfile.js/utils/webpack.js',
  'web_modules/bindings/.gitkeep',
  'web_modules/components/.gitkeep',
  'web_modules/filters/.gitkeep',
  'web_modules/utils/.gitkeep',
  'web_modules/views/.gitkeep'
]

test('generator-ko-spa:app', async () => {
  await runGenerator('app')
  assert.file(files)
})
