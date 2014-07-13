module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: {
      stage: ['.tmp'],
      dist: ['build'],
      scss: ['.tmp/**/*.scss']
    },
    copy: {
      toStage: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              'styles/**/*',
              '*.html'
            ],
            dest: '.tmp/'
          }
        ]
      },
      toDist: {
        files: [
          {
            expand: true,
            cwd: '.tmp',
            src: [
              'styles/**/*',
              '*.html'
            ],
            dest: 'build/'
          }
        ]
      }
    },
    compass: {
      main: {
        options: {
          sassDir: '.tmp/styles',
          cssDir: '.tmp/styles'
        }
      }
    },
    useminPrepare: {
      html: 'src/index.html'
    },
    usemin: {
      html: '.tmp/index.html'
    }
  });

  grunt.registerTask('build', [
    'clean:stage',
    'copy:toStage',
    'compass:main',
    'clean:scss',
    'useminPrepare',
    'cssmin',
    'usemin',
    'clean:dist',
    'copy:toDist',
    'clean:stage'
  ]);
}
