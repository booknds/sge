(function(){
  "use strict";

  var gulp = require("gulp"),
      serve = require("browser-sync"),
      path = require('path'),
      sync = require('run-sequence'),
      webpack = require('gulp-webpack');

      //console.log(path);

  var root = './src/';

  // helper method for resolving paths
  var resolveToApp = function(glob){
    glob = glob || '';
    return path.join(root, 'app', glob); // app/{glob}
  };

  var resolveToComponents = function(glob) {
    glob = glob || '';
    var temp = path.join(root, 'app/components', glob); // app/components/{glob}
    console.log(temp);
    return temp;
  };

  var resolveToCommon = function(glob) {
    glob = glob || '';
    var temp = path.join(root, 'app/common', glob); // app/common/{glob}
    console.log(temp);
    return temp;
  };

  // map of all paths
  var paths = {
    jsComp: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
    jsComm: resolveToCommon('**/*!(.spec.js).js'), // exclude spec files
    styl: resolveToApp('**/*.styl'), // stylesheets
    html: [
      resolveToApp('**/*.html'),
      path.join(root, 'index.html')
    ],
    entry: path.join(root, 'app/app.js'),
    output: root,
    blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**')
  };

  var config = {
    server: {},
    port:9005,
    devBaseUrl:'http://localhost',
    paths:{
      html:'./src/*.html',
      js:'',
      css:'',
      dist: './dist',
      app: ['src/**/*.{js,css,html}'],
    },
  };

  gulp.task('serve', function(){
    // This will serve our client folder on localhost:4500
   serve({
     port: 3000,
     open: false,
     server: {
       baseDir: './dist'
     }
   });
  });

  gulp.task('build', function() {
    return gulp.src(paths.entry)
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('dist/'));
  });

  gulp.task('watch', function(){
    var allPaths = [].concat(['src/app/*.js'], [paths.jsComp], [paths.jsComm], paths.html, [paths.styl]);
    gulp.watch(allPaths, ['build', serve.reload]);
  });

  gulp.task('default', function(done) {
    sync('build', 'serve', 'watch', done);
  });

})();
