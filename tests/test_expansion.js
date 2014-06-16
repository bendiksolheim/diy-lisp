var assert = require('assert');
var util = require('util');
var parser = require('../parser').Parser;
var evaluator = require('../evaluator').Evaluator;
var interpreter = require('../interpreter');
var Environment = require('../environment').Environment;
var stdlib = require('../stdlib').stdlib;
var util = require('util');
var interpret = interpreter.interpret;
var equal = assert.equal;
var deepEqual = assert.deepEqual;
var log = function(s) {
	console.log(util.inspect(s, {showHidden: false, depth: null}));
};

var sum = "(define sum (lambda (lst) (if (empty lst) 0 (+ (head lst) (sum (tail lst))))))";
var env = new Environment();
evaluator.evaluate(parser.parse(sum), env);
log(env);
var tmp = {}
tmp['A0'] = 1;
env = env.extend(tmp);
log(env);
//log(parser.parse("(sum '(1 2 3))"));
//interpreter.interpretFile('../stdlib.diy', env);

//equal("6", interpret("(sum '(1 2 3))", env));
//equal("102", interpret('(sum (: A1 A3))', env));
//equal("3", interpret('(sum :(A1 A2))', env));

//var sexp = "(sum :(A1 A2))";
var sexp = "(sum '(A0 0))";
console.log(evaluator.evaluate(parser.parse(sexp), env));