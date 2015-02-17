module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      jshint: {
        files: 'src/**/*.js',
        tasks: ['jshint']
      },

      jest: {
        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: ['jest']
      },

      browserify: {
        files: ['src/**/*.js'],
        tasks: ['browserify']
      }
    },

    browserify: {
      example : {
        src: ['example/boot.jsx'],
        dest: 'example/bundle.js',
        options: {
          transform: ['reactify']
        }
      }
    },

    jshint: {
      all: ['src/**/*.js'],
      options: {
        eqnull: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-jest');

  grunt.registerTask('travis', ['jshint', 'jest']);
  grunt.registerTask('bundle-example', ['browserify:example']);
};
