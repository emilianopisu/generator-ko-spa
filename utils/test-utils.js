'use strict'

const path = require('path')
const helpers = require('yeoman-test')

module.exports = {
  runGenerator(generator, args, prompts, opts, config, persistentDir) {
    const snagDir = (d) => dir = d
    let dir

    return new Promise((resolve, reject) => {
      let runner = helpers.run(path.join(__dirname, '../generators', generator), {
        tmpdir: !persistentDir
      })

      if (persistentDir) {
        process.cwd(persistentDir)
      } else {
        runner = runner.inTmpDir(snagDir)
      }

      runner.withArguments(args || [])
        .withPrompts(prompts || {})
        .withOptions(opts || {})
        .withLocalConfig(config || {
          contentBase: 'client/',
          path: 'client/dist',
          publicPath: '/dist/'
        })
        .on('error', reject)
        .on('end', () =>
          resolve(dir))
      })
  }
}
