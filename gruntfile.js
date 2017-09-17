module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-filerev');

	var now = new Date();
	var config = {
	    releaseDir: 'dist/' //编译文件的目录0601201793
	};

	grunt.initConfig({
		filerev: {
			main: {
				files: [{
					expand: true,
					cwd: config.releaseDir,
					src: ['**/*.js', '**/*.css', '**/*.{png,jpg,jpeg,gif}'],
					dest: config.releaseDir
				}]
			}
		}
	});
};
