'use strict';
// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    del = require('del'),
    neat = require('node-neat').includePaths,
    production = false;

var paths = {
  app:     './app',
  html:    './app/**/*.html',
  styles:  './app/styles/**/*.scss',<% if (jsPre === 'coffeescript') { %>
  scripts: './app/scripts/**/*.coffee',<% } else { %>
  scripts: './app/scripts/**/*.js',<% } %>
  images:  './app/images/**/*.{png,gif,jpg,jpeg,svg}',
  fonts:   './app/fonts/**/*.{eot*,otf,svg,ttf,woff}',
  vendor:  './vendor'
}

gulp.task('jekyll', function (cb) {
  var spawn = require('child_process').spawn,
      jekyll = spawn('jekyll', ['build', '-q', '--config', '_config.yml', '-s', paths.app, '-d', './dist'], {stdio: 'inherit'});

  jekyll.on('exit', function (code) {
    cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

gulp.task('html', ['jekyll'], function () {
  // Make useref work!! Should it be in a separate task using streams?
  var assets = $.useref.assets();

  return gulp.src('./dist/**/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.if(production, $.useref()))
    // .pipe($.if(production, $.htmlmin({
    //   collapseWhitespace: true
    // })))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('styles', function () {
  return gulp.src([paths.styles])
    .pipe($.sass({
      style: 'nested',
      includePaths: [paths.styles].concat(neat),
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // .pipe($.if(production, $.minifyCss()))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe($.coffee()).on('error', function(err) {})
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
    // .pipe($.if(production, $.uglify()))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: []
    }))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('build', ['html', 'styles', 'scripts', 'images', 'fonts'], function () {
  return gulp.src('./dist/**/*')
    .pipe($.size({
      title: 'build',
      gzip: true
    }));
});

gulp.task('browser-sync', ['build'], function () {
  browserSync({
    open: false,
    notify: true,
    port: 9000,
    server: {
      baseDir: ['./dist'],
      routes: {
        './vendor': 'vendor'
      }
    }
  });
});

gulp.task('watch', function () {
  gulp.watch(paths.html,    ['html']);
  gulp.watch(paths.styles,  ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images,  ['images']);
  gulp.watch(paths.fonts,   ['fonts']);
});

gulp.task('serve', ['clean', 'watch'], function () {
  runSequence('browser-sync');
});

gulp.task('deploy', function (cb) {
  production = true;
  runSequence('clean', 'build', cb);
});

gulp.task('default', function (cb) {
  runSequence('clean', 'build', cb);
});
