var fs = require('fs');
var parser = require('./parser').Parser;
var evaluator = require('./evaluator').Evaluator;
var std = require('./stdlib').stdlib;

function interpret(source, env) {
	return parser.unparse(evaluator.evaluate(parser.parse(source), env));
}

function interpretFile(filename, env) {
	//var contents = fs.readFileSync(filename, 'utf-8');
	var asts = parser.parse_multiple(std);
	var results = asts.map(function(ast) { return evaluator.evaluate(ast, env)});
	return parser.unparse(results[results.length - 1]);
}

module.exports = {
	interpretFile: interpretFile,
	interpret: interpret
};