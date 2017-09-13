var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var minifyCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var livereload = require("gulp-livereload");
var connect = require("gulp-connect");
var changed = require('gulp-changed');
var debug = require('gulp-debug');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var template = require('gulp-template');
var plumber = require('gulp-plumber');
var component = require('gulp-component-inline');

var Config = require('../config/gulpfile.path.js');
var Utils = require('../gulpfile.utils.js');
var domainMap = Utils.generateDomainMap();

function devLogic() {
	gulp.task('del', function(done) {
	    del.sync(Config.dist);
	    done();
	});

	gulp.task('controller', function() {
	    return gulp.src(Config.controller.src)
			.pipe(changed(Config.controller.dist))
	        .pipe(gulp.dest(Config.controller.dist));
	});

	gulp.task('html', function() {
	    return gulp.src(Config.html.src)
			.pipe(changed(Config.html.dist))
			.pipe(plumber())
	        .pipe(fileinclude({
		      basepath: Config.fileinclude.src
		    }))
			.pipe(template(domainMap))
	        .pipe(gulp.dest(Config.html.dist));
	});

	gulp.task('sass', function() {
	    return gulp.src(Config.sass.src.logic, {base: 'src/scss'})
	        .pipe(plumber())
			.pipe(changed(Config.css.dist, {extension:'.css'}))
	        .pipe(template(domainMap))
	        .pipe(sass())
	        .pipe(autoprefixer({
	          browsers: ['> 1%'], // 主流浏览器的最新两个版本
	          cascade: false // 是否美化属性值
	        }))
	        // .pipe(minifyCSS())
	        .pipe(gulp.dest(Config.css.dist));
	});

	gulp.task('css', function() {
	    return gulp.src(Config.css.src, {base: 'src/css'})
			.pipe(changed(Config.css.dist))
	        .pipe(plumber())
	        .pipe(template(domainMap))
	        .pipe(autoprefixer({
	          browsers: ['> 1%'], // 主流浏览器的最新两个版本
	          cascade: false // 是否美化属性值
	        }))
	        // .pipe(minifyCSS())
	        .pipe(gulp.dest(Config.css.dist));
	});

	gulp.task('js', function() {
	    return gulp.src(Config.js.src.logic, {base: 'src/js'})
			.pipe(plumber())
			.pipe(component())
	        .pipe(gulp.dest(Config.js.dist));
	});

	gulp.task('img', function() {
	    return gulp.src(Config.img.src, {base: 'src/images'})
			.pipe(changed(Config.img.dist))
	        .pipe(gulp.dest(Config.img.dist));
	});

	gulp.task('font', function() {
	    return gulp.src(Config.font.src, {base: 'src/fonts'})
			.pipe(changed(Config.font.dist))
	        .pipe(gulp.dest(Config.font.dist));
	});

	gulp.task('concat', Utils.buildConcatTask());

	gulp.task('watch', function() {
		gulp.watch(Config.controller.src, gulp.series('controller'));
		gulp.watch(Config.html.src, gulp.series('html'));
		gulp.watch(Config.css.src, gulp.series('css'));
		gulp.watch(Config.js.src.logic, gulp.series('js'));
	    gulp.watch(Config.sass.src.logic, gulp.series('sass'));
		gulp.watch(Config.img.logic, gulp.series('img'));
		gulp.watch(Config.font.logic, gulp.series('font'));
	});

	gulp.task('local', gulp.series('del', gulp.parallel('controller', 'html', 'sass', 'css', 'js', 'img', 'font'), 'concat', 'watch'));
};

module.exports = devLogic;
