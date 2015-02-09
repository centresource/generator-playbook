'use strict';
// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync');

var paths = {
  html: './app/**/*.html',
  images: './app/images/**/*',
  fonts: './app/fonts/**/*',<% if (jsPre === 'coffeescript') { %>
  scripts: './app/scripts/**/*.coffee',<% } else { %>
  scripts: './app/scripts/**/*.js',<% } %>
  styles: './app/styles/**/*.scss'
}

gulp.task('styles', function () {
  return gulp.src(path.styles)
    .pipe($.sass({ style: 'expanded', }))
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/styles'))
    // .pipe($.rename({ suffix: '.min' }))
    .pipe($.notify({ message: 'Styles complete' }));
});

gulp.task('scripts', function () {
  return gulp.src(path.scripts)
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('main.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'))
    // .pipe($.rename({ suffix: '.min' }))
    .pipe($.notify({ message: 'Scripts complete' }));
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('serve', function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist', 'app'],
      routes: {
        '/vendor': 'vendor'
      }
    }
  });

  gulp.task('watch', function () {
    gulp.watch(path.html, ['jekyll']);
    gulp.watch(path.fonts, ['fonts']);
    gulp.watch(path.images, ['images']);
    gulp.watch(path.styles, ['styles']);
    gulp.watch(path.scripts, ['scripts']);
    gulp.watch([
      'dist/**'
    ]).on('change', browserSync.reload);
  });
});

gulp.task('build', ['styles', 'scripts', 'images', 'fonts'], function () {
  return gulp.src('dist/**/*')
    .pipe($.size({
      title: 'build',
      gzip: true
    }));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
