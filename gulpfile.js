const gulp = require("gulp");
const { parallel, series } = require("gulp");

const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass')(require('sass'));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create(); //https://browsersync.io/docs/gulp#page-top
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const purify = require('gulp-purifycss');


// /*
// TOP LEVEL FUNCTIONS
//     gulp.task = Define tasks
//     gulp.src = Point to files to use
//     gulp.dest = Points to the folder to output
//     gulp.watch = Watch files and folders for changes
// */

// Optimise Images
function imageMin(cb) {
    gulp.src("src/assets/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/assets/img"));
    cb();
}

// Copy all HTML files to Dist
function copyHTML(cb) {
    gulp.src("src/*.html").pipe(gulp.dest("dist"));
    cb();
}
// Copy all font files to Dist
function copyFonts(cb) {
    gulp.src("src/assets/fonts/**/*").pipe(gulp.dest("dist/assets/fonts"));
    cb();
}

// Minify HTML
function minifyHTML(cb) {
    gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(
            htmlmin({
                collapseWhitespace: true
            })
        )
        .pipe(gulp.dest("dist"));
    cb();
}

// Scripts
function js(cb) {
    gulp.src(['src/assets/js/**/*.js'])
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/assets/js"));
    cb();
}

// Compile Sass
function css(cb) {
    gulp.src("src/assets/styles/*.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({
            browserlist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("dist/assets/css"))
        // Stream changes to all browsers
        .pipe(browserSync.stream());
    cb();
}

// Watch Files
function watch_files() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch("src/assets/styles/**/*.scss", css);
    gulp.watch("dist/assets/styles/**/*.css", purifycss);
    gulp.watch("src/**/*.html", copyHTML);
    gulp.watch("src/assets/img/**/*", imageMin);
    gulp.watch("src/assets/js/*.js", js).on("change", browserSync.reload);
}

//purify the css
function purifycss() {
    return gulp.src('dist/assets/css/styles.css')
        .pipe(purify(['src/**/*.js', 'src/**/*.html']))
        .pipe(gulp.dest('dist/assets/css/'));
}


// Default 'gulp' command with start local server and watch files for changes.
exports.default = series(copyHTML, copyFonts, css, js, imageMin, watch_files);

// 'gulp build' will build all assets but not run on a local server.
exports.build = parallel(css, js, imageMin);