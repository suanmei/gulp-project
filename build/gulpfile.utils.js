var glob = require('glob');
var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var concat = require('gulp-concat');

var concatConfig = require('./config/gulpfile.concat.js');
var domainConfig = require('./config/gulpfile.domain.js');
var SRC = 'src/';
var	DIST = 'dist/';
var env = gutil.env._[0];
var now = new Date();
var config = {
	product: 'decorate',
	localhost: env === 'local' ? '//me.weidian.com/gulp-project/dist' : '',
	staticDir: '' + now.getFullYear() + (now.getMonth() + 1),
	file: '' // gutil.template needs it
};

var Utils = {
	/**
	 * 合成路径
	 * @param {String} - 前置路径(n个)
	 * @param {String | Array} - 匹配路径
	 * @return {String | Array} - 拼接路径
	 */
	extendBasePath: function() {
		var args = Array.prototype.slice.call(arguments),
			base = args.slice(0, -1),
			path = args[args.length - 1];

		if (base.length === 0) {
			return path;
		}

		if (typeof path === 'String') {
			return base.join('') + path;
		}

		return path.map(function(value) {
			if (~value.indexOf('!')) {
				return '!' + base.join('') + value.slice(1);
			} else {
				return base.join('') + value;
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
			testServerIndex,
			domainMap;

		if (env === 'local') {
			environment = 'product';
		} else if (~env.indexOf('test')) {
			testServerIndex = environment.match(/\d+/)[0];
			environment = 'test';
			config.testServerIndex = testServerIndex;
		}

		domainMap = domainConfig[environment];
		domainMap = gutil.template(JSON.stringify(domainMap), config);
		domainMap = JSON.parse(domainMap)

		if (env === 'local') {
			domainMap.staticBase = config.localhost;
			domainMap.serverUrl = 'http://me.weidian.com:9001';
		}

		// indexController needs templateMap
		domainMap.templateMap = Utils.generateStyleMap(domainMap);

		return domainMap;
	},
	/**
	 * 文件合并配置添加前置路径
	 * @param  {String} pre - 前置路径
	 * @param  {Array} fileConfig - 待合并文件集合
	 */
	generateConcatMap: function(pre, fileMaps) {
		for (var i = 0; i < fileMaps.length; i++) {
			fileMaps[i][1] = Utils.extendBasePath(pre, fileMaps[i][1]);
		}
	},
	/**
	 * 返回 concat 任务所需函数
	 * @return {Function} - 根据 gulpfile.concat.js 合并文件
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
