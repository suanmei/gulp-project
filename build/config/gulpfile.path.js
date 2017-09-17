var gutil = require('gulp-util');
var Utils = require('../gulpfile.utils.js');  // 公有方法

var templateName = gutil.env.template || 'default'; // 模板名
var SRC_DIR = 'src/';     // 源文件目录
var DIST_DIR = 'dist/';   // 文件处理后存放的目录
var SASSFILE = {
	logic: ['**', '!common/**', '!base/**', '!components/**', '!index/**', 'index/default.scss'],
	template: ['base/**', 'buy/**', 'components/custombar/normal.scss', 'index/' + templateName + '.scss', 'others/*'],
	allTemplate: ['**']
};
var JSFILE = {
	logic: ['**/*', '!theme/*', 'theme/default.js'],
	template: ['common/**', 'index/**', 'components/**', 'theme/' + templateName + '.js'],
	allTemplate: ['**']
};

module.exports = {
    src: SRC_DIR,
    dist: DIST_DIR,
	controller: {
		src: SRC_DIR + 'controller/**/*.php',
        dist: DIST_DIR + 'controller'
	},
    html: {
        src: SRC_DIR + 'html/*.html',
        dist: DIST_DIR + 'html'
    },
    php: {
        src: SRC_DIR + 'pages/**/*.php',
        dist: DIST_DIR + 'pages'
    },
	fileinclude: {
		src: SRC_DIR + 'pages/includes',
	},
    css: {
        src: SRC_DIR + 'css/**/*.css',
        dist: DIST_DIR + 'css'
    },
    sass: {
        src: Utils.extendBasePath(SRC_DIR, 'scss/', Utils.getFilesByTask(SASSFILE)),
        dist: DIST_DIR + 'css'
    },
    js: {
        src: Utils.extendBasePath(SRC_DIR, 'js/', Utils.getFilesByTask(JSFILE)),
        dist: DIST_DIR + 'js'
    },
    img: {
        src: SRC_DIR + 'images/**',
		dist: DIST_DIR + 'images'
    },
	font: {
		src: SRC_DIR + 'fonts/**',
		dist: DIST_DIR + 'fonts'
	},
	mock: {
		src: SRC_DIR + 'mock/**',
		dist: DIST_DIR + 'mock'
	},
	testData: {
		src: SRC_DIR + 'test/**',
		dist: DIST_DIR + 'test'
	},
	tpl: {
		src: SRC_DIR + 'tpls/**'
	}
};
