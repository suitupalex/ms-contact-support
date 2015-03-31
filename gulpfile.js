(function() {
  'use strict';

  var gulp = require('gulp');
  var nodemon = require('gulp-nodemon');
  var eslint = require('gulp-eslint');
  var mocha = require('gulp-mocha');

  var jsFiles = ['./**/*.js', '!./node_modules/**/*.js'];

  gulp.task('lint', function() {
    return gulp.src(jsFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
  });

  gulp.task('test', function() {
    return gulp.src('test/*', {read: false})
      .pipe(mocha());
  });

  gulp.task('watch', function() {
    return gulp.watch(jsFiles, ['lint', 'test']);
  });

  gulp.task('run', function() {
    return nodemon({script: 'server.js', ext: 'js'});
  });

  gulp.task('default', ['lint', 'test']);
  gulp.task('dev', ['lint', 'test', 'watch', 'run']);
})();
