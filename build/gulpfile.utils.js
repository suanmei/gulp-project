var glob = require('glob');
var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var concat = require('gulp-concat');

var concatConfig = require('./config/gulpfile.concat.js');
var domainConfig = require('./config/gulpfile.domain.js');
var SRC = 'src/';
var	DIST = 'dist/';
var env = gutil.env._[0];
var isTemplate = gutil.env.t; // 构建模板
var isAll = gutil.env.a; // 全部模板
var templateName = gutil.env.template || 'default'; // 模板名
var now = new Date();
var config = {
	product: 'decorate',
	localhost: (env === 'local' && !isTemplate)  ? '//me.weidian.com/gulp-project/dist' : '',
	staticDir: '' + now.getFullYear() + (now.getMonth() + 1),
	file: '' // gutil.template needs it
};

var Utils = {
	env: env,
	config: config,
	isTemplate: isTemplate,
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
	 * 根据 task 类型获取对应的 js/css 文件路径
	 * @param  {Object} fileMap - 文件路径存储对象
	 * @return {Array} - task 对应文件匹配表达式
	 */
	getFilesByTask: function(fileMap) {
		var key =
			isTemplate ?
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
			testServerIndex,
			domainMap;

		console.log(env);

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

		isTemplate && (domainMap.templateName = templateName);

		// indexController needs templateMap
		domainMap.templateMap = Utils.generateStyleMap(domainMap);

		return domainMap;
	},
	/**
	 * 文件合并配置添加前置路径 -- gulp
	 * @param  {String} pre - 前置路径
	 * @param  {Array} fileMaps - 待合并文件集合
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
	},
	/**
	 * 生成 concat 合并配置 -- grunt
	 * @return {[type]} [description]
	 */
	generateConcatMap_Grunt: function() {
        concatConfig = (function generalConcatFiles(pre, files) {
            var conf = {};
            if (pre && files) {
                files.forEach(function (value) {
                    conf[path.join(pre, value[0])] = value[1].map(function (f) {
                        return path.join(pre, f);
                    });
                });
            }
            return conf;
        })(concatConfig.pre, concatConfig.files);

		return concatConfig;
	},
	/**
	 * 生成 usemin 配置参数
	 * @return {[Object} - usemin 配置项
	 */
	getServerUseminConfig: function(serverName) {
        if (serverName && serverName.match(/test(\d*)/)) {
            var generalReg = new RegExp('\/\/wd[\d]+.test.weidian.com\/vshop\/1\/H5\/decorate\/' + config.staticDir + '(([^"\']+))', 'gm'),
                cssReg = new RegExp('\/\/wd[\d]+.test.weidian.com\/vshop\/1\/H5\/decorate\/' + config.staticDir + '((([^"\)\']))*)', 'gm');
            return {
                html: DIST + '**/*.php',
                css: DIST + '**/*.css',
                js: DIST + '**/*.js',
                options: {
                    assetsDirs: [DIST],
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
        }
        if (['https'].indexOf(serverName) != -1) {
            var generalReg = new RegExp('\/\/s.test.weidian.com\/decorate\/' + config.staticDir + '(([^"\']+))', 'gm'),
                cssReg = new RegExp('\/\/s.test.weidian.com\/decorate\/' + config.staticDir + '((([^"\)\']))*)', 'gm');
            return {
                html: DIST + '/**/*.php',
                css: DIST + '/**/*.css',
                js: DIST + '/**/*.js',
                options: {
                    assetsDirs: [DIST],
                    patterns: {
                        html: [
                            [
                                generalReg,
                                'view match',
                                function (m) {
                                    return m.replace('\/\/s.test.weidian.com\/decorate\/' + config.staticDir, '');
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
                                    return m.replace('\/\/s.test.weidian.com\/decorate\/' + config.staticDir, '');
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
                                    return m.replace('\/\/s.test.weidian.com\/decorate\/' + config.staticDir, '');
                                },
                                function (m) {
                                    return m;
                                }
                            ]
                        ]
                    }
                }
            }
        } else if (['product', 'pre_product'].indexOf(serverName) != -1) {
            var generalReg = new RegExp('\/\/s.geilicdn.com\/decorate\/' + config.staticDir + '(([^"\']+))', 'gm'),
                cssReg = new RegExp('\/\/s.geilicdn.com\/decorate\/' + config.staticDir + '((([^"\)\']))*)', 'gm');
            return {
                html: DIST + '/**/*.php',
                css: DIST + '/**/*.css',
                js: DIST + '/**/*.js',
                options: {
                    assetsDirs: [DIST],
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
