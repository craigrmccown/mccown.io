module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    config: {
      src: 'src',
      stage: '.tmp',
      dist: 'build'
    },
    clean: {
      stage: ['<%= config.stage %>'],
      dist: ['<%= config.dist %>'],
      scssFromStage: ['<%= config.stage %>/**/*.scss'],
      stylesFromDist: ['<%= config.dist %>/styles'],
    },
    copy: {
      toStage: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>',
            src: [
              'styles/**/*',
              '*.html'
            ],
            dest: '<%= config.stage %>'
          }
        ]
      },
      stylesToStage: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>',
            src: [
              'styles/**/*'
            ],
            dest: '<%= config.stage %>'
          }
        ]
      },
      toDist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.stage %>',
            src: [
              'styles/**/*',
              '*.html'
            ],
            dest: '<%= config.dist %>'
          }
        ]
      },
      stylesToDist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.stage %>',
            src: [
              'styles/**/*'
            ],
            dest: '<%= config.dist %>'
          }
        ]
      }
    },
    compass: {
      stage: {
        options: {
          sassDir: '<%= config.stage %>/styles',
          cssDir: '<%= config.stage %>/styles'
        }
      }
    },
    useminPrepare: {
      html: '<%= config.stage %>/index.html',
      options: {
        root: '<%= config.stage %>',
        dest: '<%= config.stage %>'
      }
    },
    usemin: {
      html: '<%= config.stage %>/index.html'
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '<%= config.dist %>',
          keepalive: true,
          debug: true
        }
      }
    },
    watch: {
      styles: {
        files: '<%= config.src %>/styles/**/*',
        tasks: [
          'copy:stylesToStage',
          'compass:stage',
          'clean:scssFromStage',
          'clean:stylesFromDist',
          'copy:stylesToDist',
          'clean:stage'
        ],
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
          'connect:server'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:stage',
    'copy:toStage',
    'compass:stage',
    'clean:scssFromStage',
    'useminPrepare',
    'concat',
    'cssmin',
    'usemin',
    'clean:dist',
    'copy:toDist',
    'clean:stage'
  ]);

  grunt.registerTask('dev', [
    'concurrent:dev',
  ]);
}
