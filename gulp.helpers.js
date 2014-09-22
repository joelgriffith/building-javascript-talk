module.exports = {
	parseBrowserArgs: function(argv) {
		return (argv.browsers) ? argv.browsers.split(',') : [];
	},
	toCapitalCase: function(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
};