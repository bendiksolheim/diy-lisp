var assert = require('assert');
var util = require('util');
var Closure = require('../closure').Closure;
var Environment = require('../environment').Environment;
var evaluator = require('../evaluator').Evaluator;
var parser = require('../parser').Parser;
var types = require('../types').Types;
var parse = parser.parse;
var evaluate = evaluator.evaluate;
var equal = assert.equal;
var deepEqual = assert.deepEqual;
var log = function(s) {
	console.log(util.inspect(s, {showHidden: false, depth: null}));
};

var e1 = new Environment({'var': 42});
equal(e1.lookup('var'), 42);
assert.throws(function() {e1.lookup('lol')}, Error);

var e2 = e1.extend({'bar': true});
equal(e2.lookup('var'), 42);
equal(e2.lookup('bar'), true);

var e3 = new Environment({'a': 1}).extend({'b': 2}).extend({'c': 3}).extend({'foo': 42});
equal(e3.lookup('foo'), 42);

var e4 = e1.extend({'var': 99});
equal(e1.lookup('var'), 42);
equal(e4.lookup('var'), 99);

var e5 = new Environment();
e5.set('foo', 42);
equal(e5.lookup('foo'), 42);

assert.throws(function() { e5.set('foo', 99);}, Error);

equal(evaluate('foo', e5), 42);

assert.throws(function() { evaluate('foo', new Environment()); }, Error);

var e6 = new Environment();
evaluate(parse('(define x 1000)'), e6);
equal(e6.lookup('x'), 1000);

assert.throws(function() { evaluate(parse("(define #t 42)"), new Environment())}, Error);

var e7 = new Environment();
evaluate(parse("(define foo (+ 2 2))"), e7);
equal(evaluate("foo", e7), 4);

var ast = ['lambda', [], 42];
var closure = evaluate(ast, new Environment());
equal(isClosure(closure), true);

var e8 = new Environment({'foo': 1, 'bar': 2});
closure = evaluate(ast, e8);
equal(closure.env, e8);

closure = evaluate(parse("(lambda (x y) (+ x y))"), new Environment());
deepEqual(['x', 'y'], closure.params);
deepEqual(['+', 'x', 'y'], closure.body);

closure = evaluate(parse("(lambda () (+ 1 2))"), new Environment());
ast = [closure];
equal(evaluate(ast, new Environment()), 3);

var e9 = new Environment();
closure = evaluate(parse("(lambda (a b) (+ a b))"), e9);
ast = [closure, 4, 5];
equal(evaluate(ast, e9), 9);

var e10 = new Environment();
closure = evaluate(parse("(lambda (a) (+ a 5))"), e10);
ast = [closure, parse("(if #f 0 (+ 10 10))")];
equal(evaluate(ast, e10), 25);

closure = evaluate(parse("(lambda (x) (+ x y))"), new Environment({'y': 1}));
ast = [closure, 0];
equal(evaluate(ast, new Environment({'y': 2})), 1);

e11 = new Environment();
evaluate(parse("(define add (lambda (x y) (+ x y)))"), e11);
equal(isClosure(e11.lookup('add')), true);
equal(evaluate(parse("(add 1 2)"), e11), 3);

ast = parse("((lambda (x) x) 42)");
equal(evaluate(ast, new Environment()), 42);

ast = parse("((if #f wont-evaluate-this-branch (lambda (x) (+ x y))) 2)");
var e12 = new Environment({'y': 3});
equal(evaluate(ast, e12), 5);

var e13 = new Environment();
evaluate(parse("(define my-fn (lambda (x) (if (eq x 0) 42 (my-fn (- x 1)))))"), e13);
equal(evaluate(parse("(my-fn 0)"), e13), 42);
equal(evaluate(parse("(my-fn 10)"), e13), 42);

deepEqual(evaluate(parse("'(1 2 3 #t)"), new Environment()), [1, 2, 3, true]);

deepEqual(evaluate(parse("(cons 0 '(1 2 3))"), new Environment()), parse("(0 1 2 3)"));

deepEqual(evaluate(parse("(cons 3 (cons (- 4 2) (cons 1 '())))"), new Environment()), parse("(3 2 1)"));

equal(evaluate(parse("(head (quote (1 2 3 4 5)))"), new Environment()), 1)

assert.throws(function() { evaluate(parse("(head (quote ()))"), new Environment());}, Error);

deepEqual(evaluate(parse("(tail '(1 2 3))"), new Environment()), parse("(2 3)"));

equal(evaluate(parse("(empty '(1 2 3))"), new Environment()), false);
equal(evaluate(parse("(empty '(1))"), new Environment()), false);
equal(evaluate(parse("(empty '())"), new Environment()), true);
equal(evaluate(parse("(empty (tail '(1)))"), new Environment()), true);