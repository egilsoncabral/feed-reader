'use strict';
var cleanCSS  = require('gulp-clean-css');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
});

gulp.task('scripts', function() {
  return gulp.src('./src/js/**/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('./dist/js'))
});

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./src/css/**/*.css')
  .pipe(cleanCSS())
  .pipe(gulp.dest('./dist/css'));
});

// Gulp task to minify CSS files
gulp.task('fonts', function () {
  return gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'));
});

// Gulp task to minify CSS files
gulp.task('libs', function () {
  return gulp.src('./src/lib/**/*')
  .pipe(gulp.dest('./dist/lib'));
});

// Gulp task to minify CSS files
gulp.task('tests', function () {
  return gulp.src('./src/spec/**/*.js')
  .pipe(gulp.dest('./dist/specs'));
});

// Gulp task to minify HTML files
gulp.task('pages', function() {
  return gulp.src(['./src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
  runSequence(
    'styles',
    'fonts',
    'scripts',
    'libs',
    'pages',
    'tests'
  );
});