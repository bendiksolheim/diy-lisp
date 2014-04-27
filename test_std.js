var assert = require('assert');
var util = require('util');
var interpreter = require('./interpreter');
var Environment = require('./environment');
var util = require('util');
var interpret = interpreter.interpret;
var equal = assert.equal;
var deepEqual = assert.deepEqual;
var log = function(s) {
	console.log(util.inspect(s, {showHidden: false, depth: null}));
};

var env = new Environment();
interpreter.interpretFile('stdlib.diy', env);

/*equal("#t", interpret('(not #f)', env));
equal("#f", interpret('(not #t)', env));

equal("#f", interpret('(or #f #f)', env));

equal('5', interpret("(sum '(1 1 1 1 1))", env));
equal('10', interpret("(sum '(1 2 3 4))", env));

equal('5', interpret("(length '(1 2 3 4 5))", env));*/

equal("(1 2 3 4 5)", interpret("(append '(1 2) '(3 4 5))", env));

interpret("(define even (lambda (x) (eq (mod x 2) 0 )))", env);
//equal("(2 4 6)", interpret("(filter even '(1 2 3 4 5 6))", env));

interpret("(define inc (lambda (x) (+ 1 x)))", env);
console.log("=====================");
equal("(2 3 4)", interpret("(map inc '(1 2 3))", env));
console.log("=====================");
log(env);
//equal("(2 3 4)", interpret("(map (lambda (x) (+ 1 x)) '(1 2 3))", env));