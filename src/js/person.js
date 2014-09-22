function Person(options) {
	this.name = options.name;
}

Person.prototype.getName = function() {
	return this.name;
};

module.exports = Person;