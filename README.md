# diy-lisp

This is a simple port of the LISP implemented in [kvalle's awesome diy-lisp workshop](https://github.com/kvalle/diy-lisp). If this sounds interesting you should probably go over there and read, as this readme will not contain any useful information.

The original workshop implements a LISP in Python, and this is a port to Javascript to make it run in the browser. Runs both in the browser and under Node.js. Currently only tested with latest versions of Chrome and Safari.

## Test it

[http://bendiksolheim.github.io/diy-lisp/](http://bendiksolheim.github.io/diy-lisp/)

Output is currently displayed in the browsers console. There might come a better version in the future. I really do not know.

## Run it locally

Either clone this repository and open `index.html` in the browser, or run it with Node.js:

	node repl.js

(Although the intention was to create an actual REPL, I found out I was too lazy to finish it)

Requires [Assert](https://www.npmjs.org/package/assert) to run the tests in the `test` folder, so be sure to `npm install` before running them.