var types = require('./types');
// Get all the is-methods into this module
for (var m in types) {
	if (types.hasOwnProperty(m))
		global[m] = types[m];
}

function evaluate(ast, env) {
	if (isList(ast))
		return evaluateList(ast, env);
	else if (isBoolean(ast))
		return ast;
	else if (isSymbol(ast))
		return env.lookup(ast);

	return ast;
}

function evaluateList(ast, env) {
	if (form(ast, 'quote')) {
			return ast[1];
	} else if (form(ast, 'atom')) {
			return isAtom(evaluate(ast[1], env));
	} else if (form(ast, 'eq')) {
			return eval_eq(ast, env);
	} else if (form(ast, '+', '-', '/', '*', 'mod', '>')) {
			return eval_math(ast, env);
	} else if (form(ast, 'if')) {
			return eval_if(ast, env);
	} else if (form(ast, 'define')) {
			return eval_env(ast, env);
	} else if (form(ast, 'lambda')) {
			return eval_lambda(ast, env);
	} else if (form(ast, 'cons')) {
			return [evaluate(ast[1], env)].push(evaluate(ast[2], env));
	} else if (form(ast, 'head')) {
		var lst = evaluate(ast[1], env);
		if (lst.length === 0)
			throw new Error('List is empty');

		return lst[0];
	} else if (form(ast, 'tail')) {
		var lst = evaluate(ast[1], env);
		return lst.slice(1);
	} else if (form(ast, 'empty')) {
		var lst = evaluate(ast[1], env);
		return lst.length === 0;
	} else if (isSymbol(ast[0]) || isList(ast[0])) {
		var closure = evaluate(ast[0], env);
		var newAst = ast.slice(1).unshift(closure);
		return eval_functionCall(newAst, env);
	} else if (isClosure(ast[0])) {
		return eval_functionCall(ast, env);
	}

	throw new Error(ast[0] + " is not a function");
}

function form(ast) {
	return Array.prototype
		.slice.call(arguments, 1)
		.indexOf(ast[0]) >= 0;
}

function eval_eq(ast, env) {
	var o1 = evaluate(ast[1], env);
	var o2 = evaluate(ast[2], env);
	return o1 === o2 && isAtom(o1) && isAtom(o2)
}

function eval_math(ast, env) {
	var operator = ast[0];
	var o1 = evaluate(ast[1], env);
	var o2 = evaluate(ast[2], env);
	if (!isInteger(o1) && isInteger(o2))
		throw new Error("Both operands must be numbers (" + o1 + ", " + o2 +")");
	
	switch(operator) {
		case '+':
			return o1 + o2;
		case '-':
			return o1 - o2;
		case '/':
			return o1 / o2;
		case '*':
			return o1 * o2;
		case 'mod':
			return o1 % o2;
		case '>':
			return o1 > o1;
	}
}

function eval_if(ast, env) {
	if (evaluate(ast[1], env))
		return evaluate(ast[2], env);

	return evaluate(ast[3], env);
}

function eval_lambda(ast, env) {

}

function eval_functionCall(ast, env) {

}

function extend_env(ast, env) {

}

module.exports = {
	form: form,
	evaluate: evaluate
};