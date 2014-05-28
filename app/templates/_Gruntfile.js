// Generated on 2013-10-25 using generator-jekyllrb 0.4.0
'use strict';

// Directory reference:
//   sass: styles<% if (jsPre === 'coffeescript') { %>
//   coffeescript: scripts<% } else { %>
//   javascript: scripts<% } %>
//   images: images
//   fonts: fonts

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist',
      vendor: 'vendor'
    },
    watch: {
      sass: {
        files: ['<%%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['sass:server']
      },<% if (jsPre === 'coffeescript') { %>
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/**/*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/**/*.coffee'],
        tasks: ['coffee:test']
      },<% } %>
      jekyll: {
        files: [
          '<%%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
          '_config.yml',
          '!<%%= yeoman.vendor %>'
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '{.tmp,<%%= yeoman.app %>}/styles/**/*.css',
          '{.tmp,<%%= yeoman.app %>}/<%%= js %>/**/*.js',
          '<%%= yeoman.app %>/images/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change hostname to '0.0.0.0' to access the server
        // from another device on the same network (e.g. – iPhone)
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '.jekyll',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%%= yeoman.dist %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            '.jekyll',
            'test',
            '<%%= yeoman.app %>'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },
    sass: {
      options: {
        bundleExec: true,
        debugInfo: false,
        lineNumbers: false,
        loadPath: '<%%= yeoman.vendor %>'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/styles',
          src: '*.{scss,sass}',
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        options: {
          debugInfo: true,
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/styles',
          src: '*.{scss,sass}',
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },<% if (jsPre === 'coffeescript') { %>
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '**/*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },<% } %>
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%%= yeoman.dist %>'
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    // UseminPrepare will only scan a single page for usemin blocks. If you
    // use usemin blocks that aren't in index.html, create a usemin manifest
    // page (hackery!) and point this task there.
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
        basedir: '<%%= yeoman.dist %>',
        dirs: ['<%%= yeoman.dist %>/**/*']
      },
      html: ['<%%= yeoman.dist %>/**/*.html'],
      css: ['<%%= yeoman.dist %>/styles/**/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: false
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          src: [
            // Jekyll processes and moves HTML and text files
            // Usemin moves CSS and javascript inside of Usemin blocks
            // Copy moves asset files and directories
            'images/**/*',
            'fonts/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore
            '!**/_*{,/**}',
            // Explicitly add any files your site needs for distribution here
            //'<%%= yeoman.vendor %>/jquery/jquery.js',
            'favicon.ico',
            // 'apple-touch*.png'
          ],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    rev: {
      options: {
        length: 4
      },
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/**/*.js',
            '<%%= yeoman.dist %>/styles/**/*.css',
            '<%%= yeoman.dist %>/images/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%%= yeoman.dist %>/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }
      }
    },<% if (deploy) { %>
    buildcontrol: {
      dist: {
        options: {
          dir: 'dist',
          commit: true,
          push: true,
          message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%',
          remote: '<%= deployRemote %>',
          branch: '<%= deployBranch %>'
        }
      }
    },<% } %><% if (deployHost === 'GitHub Pages' && ghPagesProject === 'project') { %>
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /("|'?)\/?assets\//g,
              replacement: '$1http://<%= ghOwner %>.github.io/<%= ghRepo %>/assets/'
            },
            {
              match: /(<a[^>]*href="?)(\/)/g,
              replacement: '$1http://<%= ghOwner %>.github.io/<%= ghRepo %>/'
            },
            {
              match: /(<form[^>]*action="?)(\/)/g,
              replacement: '$1http://<%= ghOwner %>.github.io/<%= ghRepo %>/'
            }
          ]
        },
        files: [
          {
            expand: true,
            src: ['dist/**/*.html', 'dist/scripts/*.js']
          }
        ]
      }
    },<% } %>
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/scripts/**/*.js',
        'test/spec/**/*.js',
        '!<%%= yeoman.app %>/scripts/vendor/**/*'
      ]
    },
    csscss: {
      options: {
        bundleExec: true,
        minMatch: 4,
        ignoreProperties: '-moz-appearance,-ms-appearance,-o-appearance,-webkit-appearance',
        ignoreSassMixins: false,
        colorize: true,
        shorthand: false,
        verbose: true
      },
      check: {
        src: ['.tmp/styles/screen.css']
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: ['.tmp/styles/screen.css']
      }
    },
    concurrent: {
      server: [
        'sass:server',<% if (jsPre === 'coffeescript') { %>
        'coffee:dist',<% } %>
        'jekyll:server'
      ],
      dist: [
        'sass:dist',<% if (jsPre === 'coffeescript') { %>
        'coffee:dist',<% } %>
        'copy:dist'
      ]
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'sass:dist',<% if (jsPre === 'coffeescript') { %>
    'coffee:dist',<% } %>
    'jshint:all',
    'csscss:check',
    'csslint:check'
  ]);

  // No real tests yet. Add your own.
  grunt.registerTask('test', [
    // 'clean:server',
    // 'concurrent:test',
    // 'connect:test'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'rev',
    'usemin',
    'htmlmin'
  ]);<% if (deploy) { %>

  grunt.registerTask('deploy', [
    'default',<% if (deployHost === 'GitHub Pages' && ghPagesProject === 'project') { %>
    'replace',<% } %>
    'buildcontrol'
  ]);<% } %>

  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};
