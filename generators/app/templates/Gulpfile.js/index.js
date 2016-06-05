'use strict'

const gulp = require('gulp')

gulp.task('clean', require('./clean'))
gulp.task('vendor', ['clean'], require('./vendor'))
gulp.task('build', ['vendor'], require('./build'))
gulp.task('serve', require('./serve'))
gulp.task('watch', ['vendor'], require('./watch'))
<% if (TEST_FRAMEWORK !== 'none') { -%>
gulp.task('test', require('./test'))
<% } -%>

gulp.task('default', ['serve'])
