"use strict";

module.exports = function(grunt){
  grunt.initConfig({

    concat: {
      swagger: {
        src: ['src/js/app.js', 'src/js/controllers/*.js',
          'src/js/directives/*.js', 'src/js/models/*.js',
        'src/js/services/*.js'],
        dest: 'build/js/src/sge.js',
      },
      depend: {
        src:['src/bower_components/**/*.min.js'],
        dest:['build/js/depend/dep.js']
      },
      css: {
        src:['src/css/**/*.css'],
        dest:['build/css/style.css']
      },
    },

    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: 'index.html',
        dest: 'build/',
      },
      templates: {
        expand: true,
        cwd: 'src/templates/',
        src: '*.html',
        dest: 'build/js/templates',
      },
      bow_com:{
        expand:true,
        cwd:'src/bower_components/',
        src:'**',
        dest:'build/js/bower_components/'
      }
    },

    clean: {
      src: ["build/js/src/**"],
      bow_com: ["build/js/bower_components/**"],
      templates: ["build/js/templates/**"],
      css: ["build/css/**"],
      main: ["build/*.html"],
    },

    watch: {
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['clean:swagger', 'concat:swagger', 'connect', 'watch'],
      },
      templates: {
        files: ['src/templates/*.html'],
        tasks: ['clean:templates', 'copy:templates', 'connect', 'watch'],
      },
      css: {
        files: ['src/css/**/*.css'],
        tasks: ['clean:css', 'concat:css', 'connect', 'watch'],
      },
      html: {
        files: ['src/index.html'],
        tasks: ['clean:main', 'copy:main', 'connect', 'watch'],
      },
      bow_com: {
        files: ['src/bower_components/**/*'],
        tasks: ['clean:bow_com', 'copy:bow_com', 'connect', 'watch']
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: 'localhost',
          base: {
            path: 'build/',
            options: {
              index: 'index.html',
              maxAge: 300000
            }
          },
          //keepalive: true,
          //livereload: 35729
        },
//        livereload: {
//          options: {
//            open: true,
//            base: [
//              'client/main-app/',
//              'index.html'
//            ]
//          }
//        },
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['connect', 'watch']);

};
