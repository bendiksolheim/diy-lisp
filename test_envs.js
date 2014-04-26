var assert = require('assert');
var Environment = require('./environment');
var evaluator = require('./evaluator');
var parser = require('./parser');
var parse = parser.parse;
var evaluate = evaluator.evaluate;
var equal = assert.equal;

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