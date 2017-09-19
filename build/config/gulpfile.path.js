import Utils from '../gulpfile.utils.js';  // 公有方法

let templateName = Utils.getEnvValue('template') || 'default'; // 模板名
let SRC_DIR = 'src/';     // 源文件目录
let DEV_DIR = 'dev/';   // 文件处理后存放的目录
let SASSFILE = {
	logic: ['**', '!common/**', '!base/**', '!components/**', '!index/**', 'index/default.scss'],
	template: ['base/**', 'buy/**', 'components/custombar/normal.scss', 'index/' + templateName + '.scss', 'others/*'],
	allTemplate: ['**']
};
let JSFILE = {
	logic: ['**/*', '!theme/*', 'theme/default.js'],
	template: ['common/**', 'index/**', 'components/**', 'theme/' + templateName + '.js'],
	allTemplate: ['**']
};

export default {
    src: SRC_DIR,
    dev: DEV_DIR,
	controller: {
		src: SRC_DIR + 'controller/**/*.php',
        dev: DEV_DIR + 'controller'
	},
    html: {
        src: SRC_DIR + 'html/*.html',
        dev: DEV_DIR + 'html'
    },
    php: {
        src: SRC_DIR + 'pages/**/*.php',
        dev: DEV_DIR + 'pages'
    },
	fileinclude: {
		src: SRC_DIR + 'pages/includes',
	},
    css: {
        src: SRC_DIR + 'css/**/*.css',
        dev: DEV_DIR + 'css'
    },
    sass: {
        src: Utils.extendBasePath(SRC_DIR, 'scss/', Utils.getFilesByTask(SASSFILE)),
        dev: DEV_DIR + 'css'
    },
    js: {
        src: Utils.extendBasePath(SRC_DIR, 'js/', Utils.getFilesByTask(JSFILE)),
        dev: DEV_DIR + 'js'
    },
    img: {
        src: SRC_DIR + 'images/**',
		dev: DEV_DIR + 'images'
    },
	font: {
		src: SRC_DIR + 'fonts/**',
		dev: DEV_DIR + 'fonts'
	},
	mock: {
		src: SRC_DIR + 'mock/**',
		dev: DEV_DIR + 'mock'
	},
	testData: {
		src: SRC_DIR + 'test/**',
		dev: DEV_DIR + 'test'
	},
	tpl: {
		src: SRC_DIR + 'tpls/**'
	}
};
