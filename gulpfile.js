(function() {

    var gulp = require("gulp"),
        serve = require("browser-sync"),
        path = require("path"),
        sync = require("run-sequence"),
        webpack = require("gulp-webpack"),
        eslint = require("gulp-eslint"),
        clean = require("gulp-clean");

    // console.log(path);

    var root = "./src/";

    // helper method for resolving paths
    var resolveToApp = function(glob){
        glob = glob || "";
        return path.join(root, "app", glob); // app/{glob}
    };

    var resolveToComponents = function(glob) {
        glob = glob || "";
        var temp = path.join(root, "app/components", glob); // app/components/{glob}
        console.log(temp);
        return temp;
    };

    var resolveToCommon = function(glob) {
        glob = glob || "";
        var temp = path.join(root, "app/common", glob); // app/common/{glob}
        console.log(temp);
        return temp;
    };

    // map of all paths
    var paths = {
        jsComp: resolveToComponents("**/*!(.spec.js).js"), // exclude spec files
        jsComm: resolveToCommon("**/*!(.spec.js).js"), // exclude spec files
        styl: resolveToApp("**/*.styl"), // stylesheets
        css: resolveToApp("**/*.css"),
        html: [
            resolveToApp("**/*.html"),
            path.join(root, "index.html")
        ],
        entry: path.join(root, "app/app.js"),
        output: root,
        blankTemplates: path.join(__dirname, "generator", "component/**/*.**")
    };

    gulp.task("serve", function() {
        // This will serve our client folder on localhost:4500
        serve({
            port: 3000,
            open: false,
            server: {
                baseDir: "./dist"
            }
        });
    });

    gulp.task("clean", function() {
        return gulp.src("./dist/index.html", {read: false})
                    .pipe(clean({force: true}));
    });

    gulp.task("move", function() {
        return gulp.src("./src/index.html")
                    .pipe(gulp.dest("./dist/"));
    });

    gulp.task("build", function() {
        return gulp.src(paths.entry)
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(gulp.dest("dist/"));
    });

    gulp.task("lint", function() {
        // ESLint ignores files with "node_modules" paths.
        // So, it"s best to have gulp ignore the directory as well.
        // Also, Be sure to return the stream from the task;
        // Otherwise, the task may end before the stream has finished.
        return gulp.src(["src/**/*.js", "!node_modules/**"])
        // return gulp.src([paths.entry, "!node_modules/**"])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint(require("./.eslintrc")))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
    });

    gulp.task("watch", function() {
        var allPaths = [].concat(["src/app/*.js"], [paths.jsComp], [paths.jsComm], paths.html, [paths.styl], [paths.css]);
        gulp.watch(allPaths, ["lint", "clean", "move", "build", serve.reload]);
    });

    gulp.task("default", function(done) {
        sync("lint", "clean", "move", "build", "serve", "watch", done);
    });

    gulp.task("build-dev", function(done) {
        sync("lint", "clean", "move", "build", done);
    });

})();
