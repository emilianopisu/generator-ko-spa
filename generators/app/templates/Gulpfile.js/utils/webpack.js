'use strict'

const _ = require('lodash')
const { argv } = require('yargs')
const gutil = require('gulp-util')
const chalk = require('chalk')
const webpack = require('webpack')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const config = require('../../config')

if (argv.p) {
  gutil.log(chalk.red('Be forewarned, building for production can take a while...'))
}

module.exports = ({ watch }, done) => {
  const vendorDll = new webpack.DllReferencePlugin({
    context: '',
    manifest: require('../../dist/vendor.json')
  })

  const viewManifest = new StatsWriterPlugin({
    filename: 'manifest.json',
    fields: ['chunks', 'publicPath'],
    transform: ({ chunks }) =>
      JSON.stringify(
        _(chunks)
          .flatMap(({ files: [file], origins }) =>
            _.map(origins, (o) => _.extend(o, { file })))
          .filter(({ name }) =>
            name.indexOf('view') > -1)
          .reduce((memo, { file, name }) =>
            _.merge(memo, {
              [name]: file
            }), {})
      )
  })

  config.webpack.plugins.push(...[vendorDll, viewManifest])

  webpack(
    _.merge(
      {
        output: {
          path: './dist',
          publicPath: '/'
        },
        watch
      },
      config.webpack),
    done
  )
}
