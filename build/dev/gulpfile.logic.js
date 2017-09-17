var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var minifyCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var changed = require('gulp-changed');
var debug = require('gulp-debug');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var rev = require('gulp-rev');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var template = require('gulp-template');
var plumber = require('gulp-plumber');
var component = require('gulp-component-inline');
var gutil = require('gulp-util');
var transport = require('gulp-cmd-transport');
var gulpif = require('gulp-if');
require('gulp-grunt')(gulp);

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
			.pipe(plumber())
			.pipe(template(domainMap))
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
	        .pipe(gulp.dest(Config.html.dist))
			.pipe(connect.reload());;
	});

	gulp.task('php', function() {
	    return gulp.src(Config.php.src)
			.pipe(changed(Config.php.dist))
			.pipe(plumber())
	        .pipe(fileinclude({
		      basepath: Config.fileinclude.src
		    }))
			.pipe(template(domainMap))
	        .pipe(gulp.dest(Config.php.dist));
	});

	gulp.task('js', function() {
	    return gulp.src(Config.js.src, {base: 'src/js'})
			.pipe(plumber())
			.pipe(component())
			.pipe(template(domainMap))
			// .pipe(transport())
			// .pipe(rev())
	        .pipe(gulp.dest(Config.js.dist))
			// .pipe(rev.manifest({
			// 	base: 'dist/',
			// 	merge: true
			// }))
			// .pipe(gulp.dest(Config.js.dist))
			.pipe(gulpif(Utils.isTemplate, connect.reload()));
	});

	gulp.task('sass', function() {
	    return gulp.src(Config.sass.src, {base: 'src/scss'})
	        .pipe(plumber())
			.pipe(changed(Config.css.dist, {extension:'.css'}))
	        .pipe(sass())
	        .pipe(template(domainMap))
	        .pipe(autoprefixer({
	          browsers: ['> 1%'], // 主流浏览器的最新两个版本
	          cascade: false // 是否美化属性值
	        }))
	        // .pipe(minifyCSS())
	        .pipe(gulp.dest(Config.css.dist))
			.pipe(gulpif(Utils.isTemplate, connect.reload()));
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
			// .pipe(rev())
	        // .pipe(gulp.dest(Config.css.dist))
			// .pipe(rev.manifest())
			.pipe(gulp.dest(Config.css.dist));
	});

	gulp.task('img', function() {
	    return gulp.src(Config.img.src, {base: 'src/images'})
			.pipe(changed(Config.img.dist))
			// .pipe(imagemin())
	        .pipe(gulp.dest(Config.img.dist))
			.pipe(gulpif(Utils.isTemplate, connect.reload()));
	});

	gulp.task('font', function() {
	    return gulp.src(Config.font.src, {base: 'src/fonts'})
			.pipe(changed(Config.font.dist))
	        .pipe(gulp.dest(Config.font.dist))
			.pipe(gulpif(Utils.isTemplate, connect.reload()));
	});

	gulp.task('mock', function() {
	    return gulp.src(Config.mock.src, {base: 'src/mock'})
			.pipe(plumber())
			.pipe(template(domainMap))
			.pipe(changed(Config.mock.dist))
	        .pipe(gulp.dest(Config.mock.dist))
			.pipe(connect.reload());;
	});

	gulp.task('testData', function() {
	    return gulp.src(Config.testData.src, {base: 'src/test'})
			.pipe(changed(Config.testData.dist))
	        .pipe(gulp.dest(Config.testData.dist))
			.pipe(connect.reload());
	});

	gulp.task('concat', Utils.buildConcatTask());

	gulp.task('connect', function () {
		connect.server({
			root: 'dist/',
			port: 9001,
			livereload: true
		});
	});

	gulp.task('rev', gulp.series('grunt-filerev'));

	gulp.task('watch', function() {
		gulp.watch(Config.controller.src, gulp.series('controller'));
		gulp.watch(Config.php.src, gulp.series('php'));
		gulp.watch(Config.css.src, gulp.series('css'));
		gulp.watch(Config.js.src, gulp.series('js'));
	    gulp.watch(Config.sass.src, gulp.series('sass'));
		gulp.watch(Config.img.src, gulp.series('img'));
		gulp.watch(Config.font.src, gulp.series('font'));
	});

	if (Utils.isTemplate) {
		gulp.task('local', gulp.series('del', gulp.parallel('img', 'sass', 'js', 'font', 'mock', 'html'), gulp.parallel('connect', 'watch')));
		return;
	}

	gulp.task('local', gulp.series('del', gulp.parallel('controller', 'php', 'sass', 'css', 'js', 'img', 'font'), 'watch'));
};

module.exports = devLogic;
