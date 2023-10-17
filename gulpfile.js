const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const imagemin = require("gulp-imagemin");
const cleanCSS = require('gulp-clean-css');
const gulpif = require('gulp-if');

// Compile SCSS to CSS
function compileSass() {
  return gulp.src("./assets/styles/scss/style.scss")
    .pipe(sass().on('error', sass.logError)) // Compile, excluding variables.scss
    // .pipe(gulpif('*.css', cleanCSS())) // Minify CSS
    .pipe(gulp.dest("./assets/styles/"));
}

// Compress Images
function compressImages() {
  return gulp.src(["./assets/images/*"], { base: "./assets/images" })
    .pipe(imagemin())
    .pipe(gulp.dest("./assets/images"));
}

// Task for building without watching
const build = gulp.series(compileSass, compressImages);

// Watch Files for Changes
function watchFiles() {
  gulp.watch("./assets/scss/*.scss", compileSass);
  gulp.watch("./assets/images/*", compressImages);
}

// Default task with watching
exports.default = gulp.series(build, watchFiles);

// Task for running build without watching
exports.build = build;
