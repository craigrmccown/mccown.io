module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    config: {
      src: 'src',
      dist: 'build'
    },
    clean: {
      dist: ['<%= config.dist %>']
    },
    copy: {
      toDist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>',
            src: [
              'styles/**/*.css',
              '*.html'
            ],
            dest: '<%= config.dist %>'
          }
        ]
      }
    },
    express: {
        all: {
            options: {
                port: 9000,
                bases: './src',
                server: 'server.js'
            }
        }
    },
    compass: {
      all: {
        options: {
          sassDir: '<%= config.src %>/styles',
          cssDir: '<%= config.src %>/styles'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>',
          src: ['main.css'],
          dest: '<%= config.src %>'
        }]
      }
    },
    watch: {
      styles: {
        files: '<%= config.src %>/styles/**/*.{scss,sass}',
        tasks: ['compass:all'],
        options: {
          interrupt: true,
          debounceDelay: 250
        }
      }
    },
    concurrent: {
      dev: {
        tasks: [
          'watch:styles',
          'express:all'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('build', [
    'compass:all',
    'cssmin',
    'copy:toDist'
  ]);

  grunt.registerTask('dev', [
    'compass:all',
    'express:all',
    'watch:styles'
  ]);
}
