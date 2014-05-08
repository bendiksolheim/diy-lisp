#!/usr/bin/env sh

. compile_stdlib.sh
uglifyjs stdlib.js closure.js environment.js types.js parser.js evaluator.js -o lisp-latest.min.js