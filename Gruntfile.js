module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: {
      stage: ['.tmp'],
      dist: ['build'],
      scss: ['.tmp/*.scss']
    },
    copy: {
      toStage: {
        src: 'src',
        dest: '.tmp'
      },
      toDist: {
        src: '.tmp',
        dest: 'build'
      }
    },
    compass: {
      sassDir: '.tmp/styles',
      cssDir: '.tmp/styles'
    },
    useminPrepare: {
      html: 'src/index.html'
    }
  });

  grunt.registerTask('build', [
    'clean:stage',
    'copy:toStage',
    'compass',
    'clean:scss',
    'useminPrepare',
    'cssmin',
    'usemin',
    'clean:dist',
    'copy:toDist',
    'clean:stage'
  ]);
}
