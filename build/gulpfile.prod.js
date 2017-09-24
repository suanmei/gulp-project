import del from 'del';
import gulp from 'gulp';
import sass from 'gulp-sass';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import rename from "gulp-rename";
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import htmlmin from 'gulp-htmlmin';
import csslint from 'gulp-csslint';
import template from 'gulp-template';
import imagemin from 'gulp-imagemin';
import gulpgrunt from 'gulp-grunt';
import minifyCSS from 'gulp-clean-css';
import transport from 'gulp-cmd-transport';
import component from 'gulp-component-inline';
import sourcemaps from 'gulp-sourcemaps';
import fileinclude from 'gulp-file-include';
import autoprefixer from 'gulp-autoprefixer';
import Utils from './gulpfile.utils.js';
const domainMap = Utils.generateDomainMap();
const env = Utils.getEnvValue('env');
const isTemplate = Utils.getEnvValue('t');
var pathConfig = require('./config/gulpfile.path.js');

gulpgrunt(gulp, {
	force: false
});

export default function prodTask() {
	gulp.task('del', done => {
	    del.sync([pathConfig.dev, pathConfig.dist, pathConfig.zip]);
	    done();
	});

	gulp.task('controller', () => {
	    return gulp.src(pathConfig.controller.src)
			.pipe(plumber())
			.pipe(template(domainMap))
	        .pipe(gulp.dest(pathConfig.controller.dev));
	});

	gulp.task('php', () => {
	    return gulp.src(pathConfig.php.src)
			.pipe(plumber())
	        .pipe(fileinclude({
		      basepath: pathConfig.fileinclude.src
		    }))
			.pipe(template(domainMap))
			.pipe(htmlmin({
				collapseWhitespace: true,
				minifyCSS: true
			}))
	        .pipe(gulp.dest(pathConfig.php.dev));
	});

	gulp.task('js', () => {
	    return gulp.src(pathConfig.js.src, {base: 'src/js'})
			.pipe(plumber())
			.pipe(component())
			.pipe(template(domainMap))
			.pipe(transport())
			.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(sourcemaps.write())
	        .pipe(gulp.dest(pathConfig.js.dev));
	});

	gulp.task('sass', () => {
	    return gulp.src(pathConfig.sass.src, {base: 'src/scss'})
	        .pipe(plumber())
	        .pipe(sass())
	        .pipe(template(domainMap))
			.pipe(csslint())
	        .pipe(autoprefixer({
	          browsers: ['> 20%', 'iOS > 6', 'Android > 4'],
	          cascade: false
	        }))
			.pipe(minifyCSS())
	        .pipe(gulp.dest(pathConfig.css.dev));
	});

	gulp.task('css', () => {
	    return gulp.src(pathConfig.css.src, {base: 'src/css'})
	        .pipe(plumber())
	        .pipe(template(domainMap))
			.pipe(csslint())
	        .pipe(autoprefixer({
	          browsers: ['> 20%', 'iOS > 6', 'Android > 4'],
	          cascade: false
	        }))
	        .pipe(minifyCSS())
	        .pipe(gulp.dest(pathConfig.css.dev));
	});

	gulp.task('img', () => {
	    return gulp.src(pathConfig.img.src, {base: 'src/images'})
			.pipe(imagemin([
				imagemin.gifsicle({interlaced: true}),
				imagemin.jpegtran({progressive: true}),
				imagemin.optipng({optimizationLevel: 1}),
				imagemin.svgo({
					plugins: [
						{removeViewBox: true}
					]
				})
			]))
	        .pipe(gulp.dest(pathConfig.img.dev));
	});

	gulp.task('font', () => {
	    return gulp.src(pathConfig.font.src, {base: 'src/fonts'})
	        .pipe(gulp.dest(pathConfig.font.dev));
	});

	gulp.task('rev', gulp.series('grunt-userev'));

	gulp.task('release', Utils.buildReleaseTask());

	Utils.registerTaskByEnv();
};
