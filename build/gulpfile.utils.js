var glob = require('glob');
var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var concatConfig = require('./config/gulpfile.concat.js');
var domainConfig = require('./config/gulpfile.domain.js');

var env = getEnvValue('env');
var isTemplate = getEnvValue('t'); // 构建模板
var isAll = getEnvValue('a'); // 全部模板
var templateName = getEnvValue('template') || 'default'; // 模板名
env = env === 'watch' ? 'local' : env;

var SRC = 'src/';
var	DIST = 'dev/';
var now = new Date();
var config = {
	product: 'decorate',
	localhost: (env === 'local' && !isTemplate)  ? '//me.weidian.com/gulp-project/dev' : '',
	staticDir: '' + now.getFullYear() + (now.getMonth() + 1),
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
	getServerUseminConfig: function() {
        if (env && env.match(/test(\d*)/)) {
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
        } else if (['product', 'pre_product'].indexOf(env) != -1) {
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
