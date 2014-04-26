var interpreter = require('./interpreter');
var Environment = require('./environment');
var util = require('util');
var log = function(s) {
	console.log(util.inspect(s, {showHidden: false, depth: null}));
};

function interpret(s) {
	var env = new Environment();
	interpreter.interpretFile('stdlib.diy', env);
	console.log("=============");
	console.log(interpreter.interpret(s, env));
}

interpret("(map (lambda (n) (* 10 n)) (range 5 6))");