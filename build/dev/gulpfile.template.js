var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var htmlmin = require('gulp-htmlmin');
var minifyCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var livereload = require("gulp-livereload");
var connect = require("gulp-connect");
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');
var autoprefixer = require('gulp-autoprefixer');
var Config = require('./gulpfile.config.js');

gulp.task('del', function(done) {
    del.sync(Config.dist);
    done();
});

gulp.task('html', function() {
    return gulp.src('src/html/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/html'))
        .pipe(connect.reload());
});

gulp.task('default', gulp.series('del', gulp.parallel('html', 'js', 'sass', 'images'), 'connect', 'watch'));
