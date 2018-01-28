var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var embedTemplates = require('gulp-angular-embed-templates');

var DEST = 'dist/';

gulp.task('build', function() {
  gulp.src('src/*.js')
      .pipe(embedTemplates())
      .pipe(concat('app.js'))
      .pipe(gulp.dest(DEST))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(DEST));
});

gulp.task('connect', function() {
  connect.server({
    root: [
      '.',
      'example'
    ]
  });
});

gulp.task('watch', function() {
  gulp.watch([
    'src/*.js',
    'src/*.html'
  ], [
    'build'
  ]);
});

gulp.task('default', [
  'watch',
  'build',
  'connect'
]);
