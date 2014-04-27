var interpreter = require('./interpreter');
var Environment = require('./environment');
var util = require('util');
var log = function(s) {
	console.log(util.inspect(s, {showHidden: false, depth: null}));
};

function interpret(s) {
	var env = new Environment();
	interpreter.interpretFile('stdlib.diy', env);
	console.log(interpreter.interpret(s, env));
}

interpret("(map (lambda (n) (* 10 n)) (range 5 10))");
interpret("(map (lambda (n) (* 10 n)) (range 1 5))");
interpret("(append '(1 2) '(3 4))");
interpret("(sort '(99 1000 0 25 87 500))");
