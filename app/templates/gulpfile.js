'use strict';
// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    del = require('del'),
    neat = require('node-neat').includePaths,
    cleanCSS = require('gulp-clean-css')<% if (jsPre === 'es6') { %>,
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    glob = require('glob'),
    eventStream  = require('event-stream')<% } %>;

var production = false,
    paths = {
      app:     'app',
      html:    'app/**/*.{html,md}',
      styles:  'app/styles/**/*.scss',<% if (jsPre === 'coffeescript') { %>
      scripts: 'app/scripts/**/*.coffee',<% } else { %>
      scripts: 'app/scripts/**/*.js',<% } %>
      images:  'app/images/**/*.{png,gif,jpg,jpeg,svg}',
      fonts:   'app/fonts/**/*.{eot*,otf,svg,ttf,woff}',
      vendor:  'vendor',
      styleguide: 'app/_components/**/*',
      colors: 'app/_colors/**/*'
    };

gulp.task('html', function (cb) {
  var config = (production) ? '_config.yml,_config.build.yml' : '_config.yml',
      dest   = (production) ? 'dist' : '.tmp';

  var spawn  = require('child_process').spawn,
      jekyll = spawn('jekyll', ['build', '-q', '--config', config, '-s', paths.app, '-d', dest], { stdio: 'inherit' });

  jekyll.on('exit', function (code) {
    cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    browserSync.reload();
  });
});

gulp.task('styles', function () {<% if (sassComp === 'libsass') { %>
  return gulp.src(paths.styles)
    .pipe($.sass({
      style: 'nested',
      includePaths: [paths.styles].concat(neat),
      onError: console.error.bind(console, 'Sass error:')
    }))<% } else { %>
  return $.rubySass('app/styles/', {
      style: 'nested',
      loadPath: [paths.styles].concat(neat),
      onError: console.error.bind(console, 'Sass error:')
    })<% } %>
    .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function (done) {<% if (jsPre === 'es6') { %>
  glob(paths.scripts, function(err, files) {
    var tasks = files.map(function(entry) {
      return browserify({ entries: [entry] })
        .transform('babelify', { presets: ['env'] })
        .bundle()
        .pipe(source('application.js'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(browserSync.reload({ stream: true }));
      });
    eventStream.merge(tasks).on('end', done);
  });<% } else if (jsPre != 'es6') { %>
  return gulp.src(paths.scripts)<% if (jsPre === 'coffeescript') { %>
    .pipe($.coffee()).on('error', function(err) { console.log('Script error: ', err); this.emit('end'); })<% } %>
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(browserSync.reload({ stream: true }));<% } %>
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: []
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function (cb) {
  del(['.tmp', 'dist'], cb);
});

gulp.task('optimize', ['html', 'styles', 'scripts', 'images', 'fonts'], function () {
  var assets = $.useref.assets({ searchPath: ['.tmp', 'dist', '.'] });

  return gulp.src('dist/**/*.html')
    .pipe(assets)
    .pipe($.if('*.css', cleanCSS()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});
<% if (ghPages && ghPagesType === 'project') { %>
// Update absolute asset paths for GitHub Pages subdirectory
gulp.task('replace', ['optimize'], function () {
  var ghPages = '$1https://<%= ghOwner %>.github.io/<%= ghRepo %>';

  return gulp.src('dist/**/*.html')
    .pipe($.replace(/("|'?)\/?styles\//g,  ghPages + '/styles/'))
    .pipe($.replace(/("|'?)\/?scripts\//g, ghPages + '/scripts/'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['replace'], function () {<% } else { %>
gulp.task('build', ['optimize'], function () {<% } %>
  return gulp.src('dist/**/*')
    .pipe($.size({
      title: 'build',
      gzip: true
    }));
});<% if (ghPages) { %>

gulp.task('gh-pages', function () {
  return gulp.src('dist/**/*')
    .pipe($.ghPages(<% if (ghPagesType === 'user_organization') { %>{
      branch: 'master'
    }<% } %>))
});<% } %>

gulp.task('watch', function () {
  gulp.watch(paths.html,    ['html'<% if (styleguide) { %>,'copy-styleguide'<% } %>]);
  gulp.watch(paths.styles,  ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.fonts,   ['fonts']);
});

gulp.task('browser-sync', ['html', 'styles', 'scripts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', paths.app],
      routes: {
        '/vendor': 'vendor'
      }
    }
  });
});
<% if (styleguide) { %>

gulp.task('copy-styleguide', function() {
  gulp.src(paths.styleguide)
  	.pipe($.replace(/---(.|\n)*---/, ''))
  	.pipe(gulp.dest('app/_includes/components'));
});
<% } %>

gulp.task('serve', function () {
  runSequence('clean', ['browser-sync', 'watch']);
});<% if (ghPages) { %>

gulp.task('deploy', function () {
  production = true;
  runSequence('clean', 'build', 'gh-pages');
});<% } %>

gulp.task('default', function () {
  production = true;
  runSequence(<% if (styleguide) { %>'copy-styleguide', <% } %>'clean', 'build');
});
