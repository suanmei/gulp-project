import gulp from 'gulp';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import htmlmin from 'gulp-htmlmin';
import minifyCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import rename from "gulp-rename";
import connect from "gulp-connect";
import changed from 'gulp-changed';
import debug from 'gulp-debug';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import notify from 'gulp-notify';
import eslint from 'gulp-eslint';
import autoprefixer from 'gulp-autoprefixer';
import fileinclude from 'gulp-file-include';
import template from 'gulp-template';
import plumber from 'gulp-plumber';
import component from 'gulp-component-inline';
import transport from 'gulp-cmd-transport';
import gulpif from 'gulp-if';
import gulpgrunt from 'gulp-grunt';
import Utils from './gulpfile.utils.js';
const domainMap = Utils.generateDomainMap();
const isTemplate = Utils.getEnvValue('t');
var pathConfig = require('./config/gulpfile.path.js');

gulpgrunt(gulp);

export default function devTask() {
	gulp.task('del', done => {
	    del.sync(pathConfig.dev);
	    done();
	});

	gulp.task('controller', () => {
	    return gulp.src(pathConfig.controller.src)
			.pipe(changed(pathConfig.controller.dev))
			.pipe(plumber())
			.pipe(template(domainMap))
	        .pipe(gulp.dest(pathConfig.controller.dev));
	});

	gulp.task('html', () => {
	    return gulp.src(pathConfig.html.src)
			.pipe(changed(pathConfig.html.dev))
			.pipe(plumber())
	        .pipe(fileinclude({
		      basepath: pathConfig.fileinclude.src
		    }))
			.pipe(template(domainMap))
	        .pipe(gulp.dest(pathConfig.html.dev))
			.pipe(connect.reload());;
	});

	gulp.task('php', () => {
	    return gulp.src(pathConfig.php.src)
			.pipe(changed(pathConfig.php.dev))
			.pipe(plumber())
	        .pipe(fileinclude({
		      basepath: pathConfig.fileinclude.src
		    }))
			.pipe(template(domainMap))
	        .pipe(gulp.dest(pathConfig.php.dev));
	});

	gulp.task('js', () => {
	    return gulp.src(pathConfig.js.src, {base: 'src/js'})
			.pipe(plumber())
			.pipe(component())
			.pipe(template(domainMap))
			// .pipe(transport())
			// .pipe(rev())
	        .pipe(gulp.dest(pathConfig.js.dev))
			// .pipe(rev.manifest({
			// 	base: 'dev/',
			// 	merge: true
			// }))
			// .pipe(gulp.dest(pathConfig.js.dev))
			.pipe(gulpif(isTemplate, connect.reload()));
	});

	gulp.task('sass', () => {
	    return gulp.src(pathConfig.sass.src, {base: 'src/scss'})
	        .pipe(plumber())
			.pipe(changed(pathConfig.css.dev, {extension:'.css'}))
	        .pipe(sass())
	        .pipe(template(domainMap))
	        .pipe(autoprefixer({
	          browsers: ['> 1%'], // 主流浏览器的最新两个版本
	          cascade: false // 是否美化属性值
	        }))
	        // .pipe(minifyCSS())
	        .pipe(gulp.dest(pathConfig.css.dev))
			.pipe(gulpif(isTemplate, connect.reload()));
	});

	gulp.task('css', () => {
	    return gulp.src(pathConfig.css.src, {base: 'src/css'})
			.pipe(changed(pathConfig.css.dev))
	        .pipe(plumber())
	        .pipe(template(domainMap))
	        .pipe(autoprefixer({
	          browsers: ['> 1%'], // 主流浏览器的最新两个版本
	          cascade: false // 是否美化属性值
	        }))
	        // .pipe(minifyCSS())
			// .pipe(rev())
	        // .pipe(gulp.dest(pathConfig.css.dev))
			// .pipe(rev.manifest())
			.pipe(gulp.dest(pathConfig.css.dev));
	});

	gulp.task('img', () => {
	    return gulp.src(pathConfig.img.src, {base: 'src/images'})
			.pipe(changed(pathConfig.img.dev))
			// .pipe(imagemin())
	        .pipe(gulp.dest(pathConfig.img.dev))
			.pipe(gulpif(isTemplate, connect.reload()));
	});

	gulp.task('font', () => {
	    return gulp.src(pathConfig.font.src, {base: 'src/fonts'})
			.pipe(changed(pathConfig.font.dev))
	        .pipe(gulp.dest(pathConfig.font.dev))
			.pipe(gulpif(isTemplate, connect.reload()));
	});

	gulp.task('mock', () => {
	    return gulp.src(pathConfig.mock.src, {base: 'src/mock'})
			.pipe(plumber())
			.pipe(template(domainMap))
			.pipe(changed(pathConfig.mock.dev))
	        .pipe(gulp.dest(pathConfig.mock.dev))
			.pipe(connect.reload());;
	});

	gulp.task('testData', () => {
	    return gulp.src(pathConfig.testData.src, {base: 'src/test'})
			.pipe(changed(pathConfig.testData.dev))
	        .pipe(gulp.dest(pathConfig.testData.dev))
			.pipe(connect.reload());
	});

	gulp.task('connect', () => {
		connect.server({
			root: 'dev/',
			port: 9001,
			livereload: true
		});
	});

	gulp.task('rev', gulp.series('grunt-userev'));

	gulp.task('watch', () => {
		gulp.watch(pathConfig.controller.src, gulp.series('controller'));
		gulp.watch(pathConfig.php.src, gulp.series('php'));
		gulp.watch(pathConfig.css.src, gulp.series('css'));
		gulp.watch(pathConfig.js.src, gulp.series('js'));
	    gulp.watch(pathConfig.sass.src, gulp.series('sass'));
		gulp.watch(pathConfig.img.src, gulp.series('img'));
		gulp.watch(pathConfig.font.src, gulp.series('font'));
	});

	if (isTemplate) {
		gulp.task('local', gulp.series('del', gulp.parallel('img', 'sass', 'js', 'font', 'mock', 'html', 'testData'), gulp.parallel('connect', 'watch')));
		return;
	}

	gulp.task('local', gulp.series('del', gulp.parallel('controller', 'php', 'sass', 'css', 'js', 'img', 'font'), 'watch'));
};
