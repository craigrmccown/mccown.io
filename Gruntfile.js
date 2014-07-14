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
      scss: ['<%= config.stage %>/**/*.scss']
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
      }
    },
    compass: {
      main: {
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
    }
  });

  grunt.registerTask('build', [
    'clean:stage',
    'copy:toStage',
    'compass:main',
    'clean:scss',
    'useminPrepare',
    'concat',
    'cssmin',
    'usemin',
    'clean:dist',
    'copy:toDist',
    'clean:stage'
  ]);
}
