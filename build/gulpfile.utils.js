var glob = require('glob');
var gulp = require('gulp');
var path = require('path');
var zip = require('gulp-zip');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var merge = require('merge-stream');
var concatConfig = require('./config/gulpfile.concat.js');
var domainConfig = require('./config/gulpfile.domain.js');

var env = getEnvValue('env');
var isTemplate = getEnvValue('t'); // 构建模板
var isAll = getEnvValue('a'); // 全部模板
var isRush = getEnvValue('rush'); // 是否是rush
var templateName = getEnvValue('template') || 'default'; // 模板名
var envISTest = env === 'test';
env = env === 'watch' ? 'local' : env;

var SRC = 'src/';               // 源文件目录
var	DEV = 'dev/';			    // 开发目录
var DIST = 'dist/';			    // 发布目录
var ZIP = 'weidian/';	     	// 打包目录
var now = new Date();
var config = {
	product: 'decorate',
	localhost: (env === 'local' && !isTemplate)  ? '//me.weidian.com/gulp-project/dev' : '',
	staticDir: '' + now.getFullYear() + (now.getMonth() + 1),
	testServerIndex: getEnvValue('testIndex'),
	file: '' // gutil.template needs it
};

/**
 * 获取环境变量值
 * @param  {String} param - 变量名
 * @return {String | Boolean} - 变量值
 */
function getEnvValue(param) {
	var args = JSON.parse(process.env.npm_config_argv).original,
		arg;

	if (param === 'env') {
		return args[1];
	}

	for (var i = 2; i < args.length; i++) {
		arg = args[i].split('=');
		if (arg[0] === ('--' + param)) {
			return arg[1] ? arg[1] : true;
		}
	}
	return '';
}

var Utils = {
	getEnvValue: getEnvValue,
	/**
	 * 合成路径
	 * @param  {String} - 前置路径(n个)
	 * @param  {String | Array} - 匹配路径
	 * @return {String | Array} - 拼接路径
	 */
	extendBasePath: function() {
		var args = Array.prototype.slice.call(arguments),
			base = args.slice(0, -1),
			path = args[args.length - 1];

		if (base.length === 0) {
			return path;
		}

		if (typeof path === 'string') {
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
	 * 根据 task 类型获取对应的 js/css Glob
	 * @param  {Object} fileMap - 文件路径存储对象
	 * @return {Array} - task 对应 glob
	 */
	getGlobByTask: function(fileMap) {
		var key = isTemplate ?
				isAll ?
					'allTemplate'
				: 'template'
			: 'logic';

		return fileMap[key];
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

		domainMap = domainConfig[environment];
		domainMap = gutil.template(JSON.stringify(domainMap), config);
		domainMap = JSON.parse(domainMap)

		if (env === 'local') {
			domainMap.staticBase = config.localhost;
			domainMap.serverUrl = 'http://me.weidian.com:9001';
		}

		isTemplate && (domainMap.templateName = templateName);

		// indexController needs templateMap
		domainMap.templateMap = Utils.generateStyleMap(domainMap);

		return domainMap;
	},
	/**
	 * 生成 concat 合并配置 -- grunt
	 * @return {Object} - 合并文件所需配置
	 */
	generateConcatMap_Grunt: function() {
        concatConfig = (function generalConcatFiles(pre, files) {
            var conf = {},
				value;

			if (!pre || !files) return conf;

			for (var i = 0; i < files.length; i++) {
				value = files[i];
				conf[path.join(pre, value[0])] = value[1].map(function (f) {
                    return path.join(pre, f);
                });
			}
            return conf;
        })(concatConfig.pre, concatConfig.files);

		return concatConfig;
	},
	/**
	 * 根据部署环境和构建类型生成不同的文件
	 * @return {Function} - 部署线上文件的 task 所需函数
	 */
	buildReleaseTask: function() {
		var serverFiles = '**/*.php',
			logicStatic = ['css/**', '!css/base/**', 'js/**', '!js/theme/**', 'js/theme/default*.js', 'images/**', '!images/index/**', 'fonts/**'],
			templateStatic = ['css/index/**' + templateName + '.*css', 'js/theme/' + templateName + '.*js', 'images/index/' + templateName + '/*', 'fonts/' + templateName + '/*'],
			allTemplateStatic = ['css/index/**', '!css/index/index.css', '!css/index/supermarket/*', '!css/index/default/*', 'js/theme/**', 'images/index/**', 'fonts/**'],
			serverReleaseDir = DIST + 'p5/',
			staticReleaseDir = DIST + (envISTest ? 'H5/' : 'static/') + config.product + (envISTest ? ('/' + config.staticDir) : ''),
			isNeedZIP = env === 'product',
			releaseArr,
			tasks;

		return function() {
			releaseArr =
				!isAll ?
					isTemplate ?
						[templateStatic]
					: [serverFiles, logicStatic]
				: [allTemplateStatic];

			tasks = releaseArr.map(function(glob) {
				var isServer = typeof glob === 'string',
					destDir = isServer ? serverReleaseDir : staticReleaseDir,
					zipName =
						isServer ?
							isRush ?
								'rush.zip'
							: 'decorate.zip'
						: 'static.zip';

				return gulp.src(Utils.extendBasePath(DEV, glob), {base: DEV})
					.pipe(gulp.dest(destDir))
					.pipe(gulpif(isNeedZIP, zip(zipName)))
					.pipe(gulpif(isNeedZIP, gulp.dest(ZIP)));
			});

			return merge(tasks);
		};
	},
	/**
	 * 根据部署环境注册对应的构建任务
	 */
	registerTaskByEnv: function() {
		gulp.task(env, gulp.series('del', gulp.parallel('controller', 'php', 'sass', 'css', 'js', 'img', 'font'), 'rev', 'release'));
	},
	/**
	 * 生成 usemin 配置参数
	 * @return {[Object} - usemin 配置项
	 */
	getServerUseminConfig: function() {
        if (env && env === 'test') {
            var generalReg = new RegExp('\/\/wd[\d]+.test.weidian.com\/vshop\/1\/H5\/decorate\/' + config.staticDir + '(([^"\']+))', 'gm'),
                cssReg = new RegExp('\/\/wd[\d]+.test.weidian.com\/vshop\/1\/H5\/decorate\/' + config.staticDir + '((([^"\)\']))*)', 'gm');
            return {
                html: DEV + '**/*.php',
                css: DEV + '**/*.css',
                js: DEV + '**/*.js',
                options: {
                    assetsDirs: [DEV],
                    patterns: {
                        html: [
                            [
                                generalReg,
                                'view match',
                                function (m) {
                                    return m.replace('\/\/wd[\d]+.test.weidian.com\/vshop\/1\/H5\/decorate\/' + config.staticDir, '');
                                },
                                function (m) {
                                    return m;
                                }
                            ]
                        ],
                        js: [
                            [
                                cssReg,
                                'js match',
                                function (m) {
                                    return m.replace('\/\/wd[\d]+.test.weidian.com\/vshop\/1\/H5\/decorate\/' + config.staticDir, '');
                                },
                                function (m) {
                                    return m;
                                }
                            ]
                        ],
                        css: [
                            [
                                cssReg,
                                'css match',
                                function (m) {
                                    return m.replace('\/\/wd[\d]+.test.weidian.com\/vshop\/1\/H5\/decorate\/' + config.staticDir, '');
                                },
                                function (m) {
                                    return m;
                                }
                            ]
                        ]
                    }
                }
            };
        } else if (['product', 'pre_product'].indexOf(env) != -1) {
            var generalReg = new RegExp('\/\/s.geilicdn.com\/decorate\/' + config.staticDir + '(([^"\']+))', 'gm'),
                cssReg = new RegExp('\/\/s.geilicdn.com\/decorate\/' + config.staticDir + '((([^"\)\']))*)', 'gm');
            return {
                html: DEV + '/**/*.php',
                css: DEV + '/**/*.css',
                js: DEV + '/**/*.js',
                options: {
                    assetsDirs: [DEV],
                    patterns: {
                        html: [
                            [
                                generalReg,
                                'view match',
                                function (m) {
                                    return m.replace('\/\/s.geilicdn.com\/decorate\/' + config.staticDir, '');
                                },
                                function (m) {
                                    return m;
                                }
                            ]
                        ],
                        js: [
                            [
                                cssReg,
                                'js match',
                                function (m) {
                                    return m.replace('\/\/s.geilicdn.com\/decorate\/' + config.staticDir, '');
                                },
                                function (m) {
                                    return m;
                                }
                            ]
                        ],
                        css: [
                            [
                                cssReg,
                                'css match',
                                function (m) {
                                    return m.replace('\/\/s.geilicdn.com\/decorate\/' + config.staticDir, '');
                                },
                                function (m) {
                                    return m;
                                }
                            ]
                        ]
                    }
                }
            }
        }
    }
}

module.exports = Utils;
