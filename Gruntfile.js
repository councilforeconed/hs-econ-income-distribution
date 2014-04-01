'use strict';

var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    concat_sourcemap: {
      options: {},
      development: {
        files: {
          'main.js': ['javascripts/**/*.js']
        }
      }
    },
    sass: {
      main: {
        options: {
          style: 'expanded',
          sourcemap: true
        },
        files: {
          'stylesheets/main.css': 'stylesheets/main.scss'
        }
      }
    },
    ember_handlebars: {
      compile: {
        options: {
          namespace: 'Ember.TEMPLATES',
          processName: function(filePath) {
            return filePath.match(/templates\/(.+)\.hbs/)[1];
          }
        },
        files: {
          'templates/templates.js': ['templates/**/*.hbs',]
        },
      }
    },
    watch: {
      templates: {
        files: [
          'templates/**/*.hbs'
        ],
        tasks: ['ember_handlebars']
      },
      javascripts: {
        files: [
          'javascripts/**/*.js'
        ],
        tasks: ['concat_sourcemap:development']
      },
      stylesheets: {
        files: [
          'stylesheets/**/*.scss'
        ],
        tasks: ['sass:main']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          'templates/templates.js',
          'main.js',
          'stylesheets/main.css',
          'index.html'
        ]
      },
    },
    connect: {
      options: {
        port: SERVER_PORT,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, './')
            ];
          }
        }
      },
    },
    clean: {
      server: '.tmp'
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    }
  });
  
  grunt.registerTask('default', [
    'build'
  ]);
  
  grunt.registerTask('build', [
    'clean:server',
    'sass:main',
    'concat_sourcemap:development',
    'ember_handlebars'
  ]);
  
  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'clean:server',
      'build',
      'connect:livereload',
      'open:server',
      'watch'
    ]);
  });
};
