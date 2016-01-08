'use strict'

const path = require('path')
const helpers = require('yeoman-test')

module.exports = {
  runGenerator(generator, args, prompts, opts) {
    let basename

    return new Promise((resolve) => {
      helpers.run(path.join(__dirname, '../generators', generator))
        .inTmpDir((d) => basename = path.basename(d))
        .withArguments(args || [])
        .withPrompts(prompts || {})
        .withOptions(opts || {})
        .on('end', () =>
          resolve(basename))
      })
  }
}
