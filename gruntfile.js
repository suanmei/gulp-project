module.exports = function (grunt) {
	var path = require('path');
	var Utils = require('./build/gulpfile.utils.js');
	var domainConfig = require('./build/config/gulpfile.domain.js');
	var serverName = String(grunt.cli.tasks[0]).replace('userev', '');

	var config = Utils.config;
	var staticBase = domainConfig[serverName];
	var useminConfig = Utils.getServerUseminConfig(serverName);
	var concatConfig = Utils.generateConcatMap_Grunt();
	var	DIST = 'dist/';

	grunt.initConfig({
		product: config.product,
		staticDir: config.staticDir,
		concat: {
            main: {
                files: concatConfig
            }
        },
		filerev: {
			main: {
				files: [{
					expand: true,
					cwd: DIST,
					src: ['**/*.js', '**/*.css', '**/*.{png,jpg,jpeg,gif}'],
					dest: DIST
				}]
			}
		},
		concat_seajs: {
            options: {
                baseDir: DIST,
                seajs_src: path.join(DIST, 'js/common/'),
                cdnBase: staticBase,
                //map_file_name: 'fetch.js',
                injectFetch: true, //选择生成js文件，还是嵌入到html
                injectSea: true, //选择生成js文件，还是嵌入到html
                map: [
                    {
                        'dest': path.join(DIST, 'pages/template/index/default.tpl.php'),
                        'files': [
                            path.join(DIST, 'js/firstCommon.min.js')
                        ]
                    },
                    {
                        'dest': path.join(DIST, 'pages/template/index.php'),
                        'files': [
                            path.join(DIST, 'js/firstCommon.min.js')
                        ]
                    },
                    {
                        'dest': path.join(DIST, 'pages/template/index/personal.tpl.php'),
                        'files': [
                            path.join(DIST, 'js/firstCommon.min.js')
                        ]
                    },
                    {
                        'dest': path.join(DIST, 'pages/template/index/supermarket.tpl.php'),
                        'files': [
                            path.join(DIST, 'js/firstCommon.min.js')
                        ]
                    }
                ]
            },
            main: {
                files: [{
                    expand: true,
                    cwd: DIST,
                    injectSea: true,
                    src: ['**/*.html', '**/*.php']
                }]
            }
        },
		usemin: useminConfig
	});

	grunt.registerTask('userev' + serverName, ['concat', 'filerev', 'concat_seajs', 'usemin']);

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-concat-seajs');
	grunt.loadNpmTasks('grunt-usemin');
};
