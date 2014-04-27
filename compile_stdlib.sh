#!/usr/bin/env sh

INPUT='stdlib.diy'
OUTPUT='stdlib.js'
COMPILED_SRC=$(tr -d '\t' < $INPUT | tr '\n' ' ')
cat << EOF > $OUTPUT
(function(diy) {
	diy.stdlib = "$COMPILED_SRC";
})(typeof exports === 'undefined' ? this['diy'] = this['diy'] || {} : exports);
EOF