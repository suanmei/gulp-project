import path from 'path';
import Utils from './build/gulpfile.utils.js';
import domainConfig from './build/config/gulpfile.domain.js';

module.exports = function (grunt) {
	const dev = 'dev/';
	
	let env = Utils.getEnvValue('env');
	let staticBaseURL = Utils.generateDomainMap().staticBase
	let useminConfig = Utils.getServerUseminConfig();
	let concatConfig = Utils.generateConcatMap_Grunt();

	grunt.initConfig({
		concat: {
            main: {
                files: concatConfig
            }
        },
		filerev: {
			main: {
				files: [{
					expand: true,
					cwd: dev,
					src: ['**/*.js', '**/*.css', '**/*.{png,jpg,jpeg,gif}'],
					dest: dev
				}]
			}
		},
		concat_seajs: {
            options: {
                baseDir: dev,
                seajs_src: path.join(dev, 'js/common/'),
                cdnBase: staticBaseURL,
                //map_file_name: 'fetch.js',
                injectFetch: true, //选择生成js文件，还是嵌入到html
                injectSea: true, //选择生成js文件，还是嵌入到html
                map: [
                    {
                        'dest': path.join(dev, 'pages/template/index/default.tpl.php'),
                        'files': [
                            path.join(dev, 'js/firstCommon.min.js')
                        ]
                    },
                    {
                        'dest': path.join(dev, 'pages/template/index.php'),
                        'files': [
                            path.join(dev, 'js/firstCommon.min.js')
                        ]
                    },
                    {
                        'dest': path.join(dev, 'pages/template/index/personal.tpl.php'),
                        'files': [
                            path.join(dev, 'js/firstCommon.min.js')
                        ]
                    },
                    {
                        'dest': path.join(dev, 'pages/template/index/supermarket.tpl.php'),
                        'files': [
                            path.join(dev, 'js/firstCommon.min.js')
                        ]
                    }
                ]
            },
            main: {
                files: [{
                    expand: true,
                    cwd: dev,
                    injectSea: true,
                    src: ['**/*.html', '**/*.php']
                }]
            }
        },
		usemin: useminConfig
	});

	grunt.registerTask('userev', ['concat', 'filerev', 'concat_seajs', 'usemin']);

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-concat-seajs');
	grunt.loadNpmTasks('grunt-usemin');
};
