var Utils = require('./gulpfile.utils.js');  // 公有方法

var SRC_DIR = 'src/';     // 源文件目录
var DIST_DIR = './dist/';   // 文件处理后存放的目录
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
	controller: {
		src: SRC_DIR + 'controller/**/*.php',
        dist: DIST_DIR + 'controller'
	},
    html: {
        src: SRC_DIR + 'pages/**/*.php',
        dist: DIST_DIR + 'pages'
    },
	fileinclude: {
		src: SRC_DIR + 'pages/includes',
	},
    assets: {
        src: SRC_DIR + 'assets/**/*',            // assets目录：./src/assets
        dist: DIST_DIR + 'assets'                // assets文件build后存放的目录：./dist/assets
    },
    css: {
        src: SRC_DIR + 'css/**/*.css',           // CSS目录：./src/css/
        dist: DIST_DIR + 'css'                   // CSS文件build后存放的目录：./dist/css
    },
    sass: {
        src: {
			logic: Utils.extendBasePath(SRC_DIR + 'scss/', ['**/*.scss', '!common/**/*.scss', '!base/*.scss', '!index/*.scss', '!components/**/*.scss', '!index/**/*.scss']),   // SASS目录：./src/sass/
			template: SRC_DIR + 'sass/'
		},
        dist: DIST_DIR + 'css'                   // SASS文件生成CSS后存放的目录：./dist/css
    },
    js: {
        src: {
			logic: Utils.extendBasePath(SRC_DIR + 'js/', ['**/*.js', '!theme/*.js'])
		},           // JS目录：./src/js/
        dist: DIST_DIR + 'js',                   // JS文件build后存放的目录：./dist/js
        build_name: 'build.js'                   // 合并后的js的文件名
    },
    img: {
        src: SRC_DIR + 'images/**/*',            // images目录：./src/images/
		dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images
    },
	font: {
		src: SRC_DIR + 'fonts/supermarket/*',
		dist: DIST_DIR + 'fonts'
	}
};

module.exports = Config;
