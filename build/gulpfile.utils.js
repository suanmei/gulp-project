var glob = require('glob')
var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var concat = require('gulp-concat');

var concatConfig = require('./config/gulpfile.concat.js');
var domainConfig = require('./config/gulpfile.domain.js');
var SRC = 'src/';
var	DIST = 'dist/';
var env = gutil.env._[0];

var Utils = {
	extendBasePath: function(base, path) {
		if (typeof path === 'String') {
			return base + path;
		}

		return path.map(function(value) {
			if (~value.indexOf('!')) {
				return '!' + base + value.slice(1);
			} else {
				return base + value;
			}
		});
	},
	/**
	 * 生成样式映射
	 * @param  {Object} domainMap - 域名映射
	 * @return {Object} - 样式映射
	 */
	generateStyleMap: function(domainMap) {
		var reg = /src\/scss\/index\/(.*)\.scss/,
			styleFiles = glob.sync("src/scss/index/*.scss"),
			styleMap = {},
			result;

		for (var i = 0; i < styleFiles.length; i++) {
			result = styleFiles[i].match(reg)[1];
			styleMap[result] = domainMap.staticBase + '/css/index/' + result + '.css';
		}

		return JSON.stringify(styleMap);
	},
	
	/**
	 * 生成域名映射
	 * @return {Object} - 域名映射
	 */
	generateDomainMap: function() {
		var environment = env,
			domainMap;

		if (env === 'local') {
			environment = 'product';
		}

		environment = environment.replace(/\d/g, '');
		domainMap = domainConfig[environment];

		// indexController needs templateMap
		domainMap.templateMap = Utils.generateStyleMap(domainMap);

		return domainConfig[environment];
	},
	/**
	 * 文件合并配置添加前置路径
	 * @param  {String} pre - 前置路径
	 * @param  {Array} fileConfig - 待合并文件集合
	 */
	generateConcatMap: function(pre, fileMaps) {
		for (var i = 0; i < fileMaps.length; i++) {
			fileMaps[i][1] = Utils.extendBasePath(pre, fileMap[1]);
		}
	},
	/**
	 * 返回 concat 任务所需函数
	 * @return {function} - 根据 gulpfile.concat.js 合并文件
	 */
	buildConcatTask: function() {
		return function() {
			var pre = concatConfig.pre,
				files = concatConfig.files,
				tasks;

			Utils.generateConcatMap(pre, files);

			tasks = concatConfig.files.map(function(mapping) {
				var dist = mapping[2] ? pre + mapping[2] : pre + 'js/';
				return gulp.src(mapping[1])
					.pipe(concat(mapping[0]))
					.pipe(gulp.dest(dist));
			});

			return merge(tasks);
		}
	}
}

module.exports = Utils;
