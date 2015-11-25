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
    //  depend: {
    //    src:['src/bower_components/**/*.min.js'],
    //    dest:['build/js/depend/dep.js']
    //  },
      css: {
        src:['src/css/**/*.css'],
        dest:'build/css/style.css'
      },
    },

    copy: {
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
      },
      main: {
        expand: true,
        cwd: 'src/',
        src: 'index.html',
        dest: 'build/',
      },
    },

    clean: {
      swagger: ["build/js/src/**"],
      bow_com: ["build/js/bower_components/**"],
      templates: ["build/js/templates/**"],
      css: ["build/css/**"],
      main: ["build/*.html"],
    },

    watch: {
      js: {
        options: {
          livereload: true
        },
        files: ['src/js/**/*.js'],
        tasks: ['clean:swagger', 'concat:swagger'],
      },
      templates: {
        options: {
          livereload: true
        },
        files: ['src/templates/*.html'],
        tasks: ['clean:templates', 'copy:templates'],
      },
      css: {
        options: {
          livereload: true
        },
        files: ['src/css/**/*.css'],
        tasks: ['clean:css', 'concat:css'],
      },
      html: {
        options: {
          livereload: true
        },
        files: ['src/index.html'],
        tasks: ['clean:main', 'copy:main', 'wiredep'],
      },
      bow_com: {
        options: {
          livereload: true
        },
        files: ['src/bower_components/**/*'],
        tasks: ['clean:bow_com', 'copy:bow_com', 'wiredep']
      },
      depend:{
        options: {
          livereload: true
        },
        files: ['build/js/bower_components/**/*'],
        tasks: ['wiredep']
      }
    },

    wiredep: {
      task: {
        src: ['build/js/index.html']
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          livereload: 35729,
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

        },
        livereload: {
          options: {
            open: true,
            base: [
              'build/',
              'index.html'
            ]
          }
        },
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: 'build/js/src',
          src: '**/*.js',
          dest: 'build/js/src'
        }]
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('build', ['clean', 'concat', 'copy', 'ngAnnotate'])
  grunt.registerTask('test', ['build', 'wiredep', 'connect:server:livereload', 'watch']);

};
