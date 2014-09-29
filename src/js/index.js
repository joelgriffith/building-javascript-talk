var Person = require('Person');
import Animal from './animal.js';

var joel = new Person({
	name: 'Joel Griffith'
});

var cat = new Animal({
	animalType: 'Cat'
});

console.log(joel.getName());
console.log(cat.getAnimalType());