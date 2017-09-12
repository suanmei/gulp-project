var Utils = {
	extendBasePath: function(base, path) {
		if (typeof path === 'String') {
			return base + path;
		}
		return path.map(function(value) {
			if (~value.indexOf('!')) {
				return '!' + base + value.slice(1);
			} else {
				return base + value;
			}
		});
	}
}

module.exports = Utils;
