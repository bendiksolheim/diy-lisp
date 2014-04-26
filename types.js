var Closure = require('closure');

function isSymbol(x) {
	return typeof x === 'string';
}

function isList(x) {
	return x instanceof Array;
}

function isBoolean(x) {
	return typeof x === 'boolean';
}

function isInteger(x) {
	return typeof x === 'number';
}

function isClosure(x) {
	return x instanceof Closure;
}

function isAtom(x) {
	return isSymbol(x)
		|| isInteger(x)
		|| isBoolean(x)
		|| isClosure(x);
}