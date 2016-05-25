var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var minifyCSS = require('gulp-minify-css');



// DEV

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: './src'
  });
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/*.html', browserSync.reload);
  gulp.watch('./src/js/*.js', browserSync.reload);
});




// PROD

gulp.task('copyFonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('copyImg', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('build', ['copyFonts', 'copyImg'], function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCSS()))
    .pipe(gulp.dest('dist'))
});