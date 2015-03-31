(function() {
  'use strict';

  var gulp = require('gulp');
  var nodemon = require('gulp-nodemon');
  var eslint = require('gulp-eslint');

  var jsFiles = ['./**/*.js', '!./node_modules/**/*.js'];

  gulp.task('lint', function() {
    return gulp.src(jsFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
  });

  gulp.task('watch', function() {
    return gulp.watch(jsFiles, ['lint']);
  });

  gulp.task('run', function() {
    return nodemon({script: 'server.js', ext: 'js'});
  });

  gulp.task('default', ['lint']);
  gulp.task('dev', ['lint', 'watch', 'run']);
})();
