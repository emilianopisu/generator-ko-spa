'use strict'

const path = require('path')
const helpers = require('yeoman-test')

module.exports = {
  runGenerator(generator, args, prompts, opts, config) {
    let basename

    return new Promise((resolve, reject) => {
      helpers.run(path.join(__dirname, '../generators', generator))
        .inTmpDir((d) => basename = path.basename(d))
        .withArguments(args || [])
        .withPrompts(prompts || {})
        .withOptions(opts || {})
        .withLocalConfig(config || {
          contentBase: 'client/',
          path: 'client/dist',
          publicPath: '/dist/'
        })
        .on('error', reject)
        .on('end', () =>
          resolve(basename))
      })
  }
}
