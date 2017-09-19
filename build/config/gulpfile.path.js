var Utils = require('../gulpfile.utils.js');  // 公有方法

var templateName = Utils.getEnvValue('template') || 'default'; // 模板名
var SRC_DIR = 'src/';     // 源文件目录
var DEV_DIR = 'dev/';   // 文件处理后存放的目录
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
    dev: DEV_DIR,
	controller: {
		src: SRC_DIR + 'controller/**/*.php',
		watch: SRC_DIR + 'controller/**',
        dev: DEV_DIR + 'controller'
	},
    html: {
        src: SRC_DIR + 'html/*.html',
		watch: SRC_DIR + 'html/**',
        dev: DEV_DIR + 'html'
    },
    php: {
        src: SRC_DIR + 'pages/**/*.php',
		watch: SRC_DIR + 'php/**',
        dev: DEV_DIR + 'pages'
    },
	fileinclude: {
		src: SRC_DIR + 'pages/includes',
	},
    css: {
        src: SRC_DIR + 'css/**/*.css',
		watch: SRC_DIR + 'css/**',
        dev: DEV_DIR + 'css'
    },
    sass: {
        src: Utils.extendBasePath(SRC_DIR, 'scss/', Utils.getFilesByTask(SASSFILE)),
		watch: SRC_DIR + 'scss/**',
        dev: DEV_DIR + 'css'
    },
    js: {
        src: Utils.extendBasePath(SRC_DIR, 'js/', Utils.getFilesByTask(JSFILE)),
		watch: SRC_DIR + 'js/**',
        dev: DEV_DIR + 'js'
    },
    img: {
        src: SRC_DIR + 'images/**',
		watch: SRC_DIR + 'images/**',
		dev: DEV_DIR + 'images'
    },
	font: {
		src: SRC_DIR + 'fonts/**',
		watch: SRC_DIR + 'fonts/**',
		dev: DEV_DIR + 'fonts'
	},
	mock: {
		src: SRC_DIR + 'mock/**',
		watch: SRC_DIR + 'mock/**',
		dev: DEV_DIR + 'mock'
	},
	testData: {
		src: SRC_DIR + 'test/**',
		watch: SRC_DIR + 'test/**',
		dev: DEV_DIR + 'test'
	},
	tpl: {
		src: SRC_DIR + 'tpls/**',
		watch: SRC_DIR + 'tpls/**',
	}
};
