var evaluator = require('./evaluator');
var parser = require('./parser');
var Environment = require('./environment');
var assert = require('assert');
var evaluate = evaluator.evaluate;
var parse = parser.parse;
var equal = assert.equal;
var deepEqual = assert.deepEqual;

equal(evaluator.form(['tail'], 'tail', 'head'), true);
equal(evaluator.form(['head'], 'head', 'tail'), true);
assert.notEqual(evaluator.form(['lol'], 'lal', 'lel', 'lil'));
equal(evaluator.form(['+'], '+'), true);

equal(evaluate(true, new Environment()), true);
equal(evaluate(false, new Environment()), false);
equal(evaluate(42, new Environment()), 42);
equal(evaluate(['quote', 'foo'], new Environment()), 'foo');
deepEqual(evaluate(['quote', [1, 2, false]], new Environment()), [1, 2, false]);

// atoms
equal(evaluate(['atom', true], new Environment()), true);
equal(evaluate(['atom', false], new Environment()), true);
equal(evaluate(['atom', 42], new Environment()), true);
equal(evaluate(['atom', ['quote', 'foo']], new Environment()), true);
equal(evaluate(['atom', ['quote', [1, 2]]], new Environment()), false);

// eq function
equal(evaluate(['eq', 1, 1], new Environment()), true);
equal(evaluate(['eq', 1, 2], new Environment()), false);
equal(evaluate(parse("(eq 'foo 'foo)"), new Environment()), true);
equal(evaluate(parse("(eq 'foo 'bar)"), new Environment()), false);

// math functions
equal(evaluate(['+', 2, 2], new Environment()), 4);
equal(evaluate(['-', 2, 1], new Environment()), 1);
equal(evaluate(['/', 6, 2], new Environment()), 3);
equal(evaluate(['/', 7, 2], new Environment()), 3);
equal(evaluate(['*', 2, 3], new Environment()), 6);
equal(evaluate(['mod', 7, 2], new Environment()), 1);
equal(evaluate(['>', 7, 2], new Environment()), true);
equal(evaluate(['>', 2, 2], new Environment()), false);
equal(evaluate(['>', 2, 3], new Environment()), false);
assert.throws(evaluate(parse("(+ 1 'foo)"), new Environment()), Error);