var assert = require('assert');
var parser = require('./parser');
var util = require('util');
var parse = parser.parse;
var first_exp = parser.first_exp;
var log = function(s) {
	console.log(util.inspect(s, {showHidden: false, depth: null}));
};

assert.equal(parse('#t'), true);
assert.equal(parse('#f'), false);
assert.equal(parse('42'), 42);
assert.equal(parse('lol'), 'lol');
assert.deepEqual(parse('(foo bar #t)'), ['foo', 'bar', true]);
assert.deepEqual(parse('\'foo'), ['quote', 'foo']);
assert.deepEqual(parse('\'(foo bar)'), ['quote', ['foo', 'bar']]);
assert.deepEqual(parse('(foo \'nil)'), ['foo', ['quote', 'nil']]);

ast = ['define', 'fact', 
            ['lambda', ['n'], 
                ['if', ['<=', 'n', 1], 
                    1, 
                    ['*', 'n', ['fact', ['-', 'n', 1]]]]]];
program = '\
        (define fact \
        (lambda (n) \
            (if (<= n 1) \
                1\
                (* n (fact (- n 1))))))'
assert.deepEqual(parse(program), ast);
