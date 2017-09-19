import del from 'del';
import gulp from 'gulp';
import sass from 'gulp-sass';
import debug from 'gulp-debug';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import connect from "gulp-connect";
import changed from 'gulp-changed';
import template from 'gulp-template';
import gulpgrunt from 'gulp-grunt';
import component from 'gulp-component-inline';
import transport from 'gulp-cmd-transport';
import fileinclude from 'gulp-file-include';
import autoprefixer from 'gulp-autoprefixer';
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
	        .pipe(gulp.dest(pathConfig.js.dev))
			.pipe(gulpif(isTemplate, connect.reload()));
	});

	gulp.task('sass', () => {
	    return gulp.src(pathConfig.sass.src, {base: 'src/scss'})
	        .pipe(plumber())
	        .pipe(sass())
	        .pipe(template(domainMap))
	        .pipe(autoprefixer({
	          browsers: ['> 1%'],
	          cascade: false
	        }))
	        .pipe(gulp.dest(pathConfig.css.dev))
			.pipe(gulpif(isTemplate, connect.reload()));
	});

	gulp.task('css', () => {
	    return gulp.src(pathConfig.css.src, {base: 'src/css'})
			.pipe(changed(pathConfig.css.dev))
	        .pipe(plumber())
	        .pipe(template(domainMap))
	        .pipe(autoprefixer({
	          browsers: ['> 1%'],
	          cascade: false
	        }))
			.pipe(gulp.dest(pathConfig.css.dev));
	});

	gulp.task('img', () => {
	    return gulp.src(pathConfig.img.src, {base: 'src/images'})
			.pipe(changed(pathConfig.img.dev))
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
			.pipe(changed(pathConfig.mock.dev))
			.pipe(plumber())
			.pipe(template(domainMap))
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
		gulp.watch(pathConfig.controller.watch, gulp.series('controller'));
		gulp.watch(pathConfig.php.watch, gulp.series('php'));
		gulp.watch(pathConfig.css.watch, gulp.parallel('css', 'js'));
		gulp.watch(pathConfig.js.watch, gulp.series('js'));
	    gulp.watch(pathConfig.sass.watch, gulp.parallel('sass', 'js'));
		gulp.watch(pathConfig.img.watch, gulp.series('img'));
		gulp.watch(pathConfig.font.watch, gulp.series('font'));
		gulp.watch(pathConfig.tpl.watch, gulp.series('js'));
	});

	gulp.task('watch:template', () => {
		gulp.watch(pathConfig.html.watch, gulp.series('html'));
		gulp.watch(pathConfig.mock.watch, gulp.series('mock'));
		gulp.watch(pathConfig.testData.watch, gulp.series('testData'));
		gulp.watch(pathConfig.js.watch, gulp.series('js'));
	    gulp.watch(pathConfig.sass.watch, gulp.parallel('sass'));
		gulp.watch(pathConfig.img.watch, gulp.series('img'));
		gulp.watch(pathConfig.font.watch, gulp.series('font'));
		gulp.watch(pathConfig.tpl.watch, gulp.series('js'));
	});

	if (isTemplate) {
		gulp.task('local', gulp.series('del', gulp.parallel('img', 'sass', 'js', 'font', 'mock', 'html', 'testData'), gulp.parallel('connect', 'watch:template')));
		return;
	}

	gulp.task('local', gulp.series('del', gulp.parallel('controller', 'php', 'sass', 'css', 'js', 'img', 'font'), 'watch'));
};
