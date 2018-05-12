/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: ['src/js/imbue.page.js',
              'src/js/imbue.accordion.js',
              'src/js/imbue.counters.js'],
        dest: 'dist/js/main.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      options: {
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/js/main.min.js'
      }
    },
    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['concat', 'uglify']
      },
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['sass']
      },
      styles: {
        files: ['dist/css/*.css', '!dist/css/*.min.css'],
        tasks: ['cssmin']
      },
      html: {
        files: ['src/pages/**/*.html', 'src/includes/**/*.html'],
        tasks: ['includes']
      }
    },
    includes: {
      files: {
        src: ['**/*.html'],
        dest: 'dist/',
        cwd: 'src/pages',
        options: {
          flatten: true,
          includePath: 'src/includes',
          wrapper: 'src/includes/wrapper.html'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-includes');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'includes']);
  grunt.registerTask('styles', ['sass', 'cssmin']);
  grunt.registerTask('scripts', ['concat', 'uglify']);
};
