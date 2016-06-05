'use strict'

const path = require('path')
const helpers = require('yeoman-test')

module.exports = {
  runGenerator(generator, { args, prompts, opts, config, dir } = {}) {
    const snagDir = (_d) => d = _d
    let d

    return new Promise((resolve, reject) => {
      let runner = helpers.run(path.join(__dirname, '../generators', generator), {
        tmpdir: !dir
      })

      if (dir) {
        process.cwd(dir)
      } else {
        runner = runner.inTmpDir(snagDir)
      }

      runner
        .withArguments(args || [])
        .withPrompts(prompts || {})
        .withOptions(opts || {})
        .withLocalConfig(config || {})
        .on('error', reject)
        .on('end', () => resolve(d))
      })
  }
}
