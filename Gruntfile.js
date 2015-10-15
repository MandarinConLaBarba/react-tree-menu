module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      browserify: {
        files: ['src/**/*.js*', 'example/*.jsx'],
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('bundle-example', ['browserify:example']);
};
