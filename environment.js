(function(diy) {

	function clone(obj) {
		if (null == obj || "object" != typeof obj) return obj;

		if (obj instanceof Array) {
	        var copy = [];
	        for (var i = 0, len = obj.length; i < len; i++) {
	            copy[i] = clone(obj[i]);
	        }
	        return copy;
	    }

	    var copy = new obj.constructor;
	    extend(copy, obj);
	    return copy;
	}

	function extend(obj, vars) {
		for (var v in vars) {
			if (vars.hasOwnProperty(v))
				obj[v] = vars[v];
		}
	}

	function Environment(vars) {
		this.vars = vars || {};
	}

	Environment.prototype.lookup = function(v) {
		if (!this.vars.hasOwnProperty(v))
			throw new Error('Could not find symbol ' + v + ' in environment');

		// We ABSOLUTELY have to clone before returning, as returning object pointers makes all kinds of things go wrong
		return clone(this.vars[v]);
	};

	Environment.prototype.extend = function(vars) {
		var newEnv = this.vars;
		extend(newEnv, vars);
		return new Environment(newEnv);
	};

	Environment.prototype.set = function(v, val) {
		console.log("SET: " + v + ", " + val);
		if (this.vars.hasOwnProperty(v))
			throw new Error('Property ' + v + ' already defined');

		this.vars[v] = val;
	};

	diy.Environment = Environment;
})(typeof exports === 'undefined' ? this['diy'] = this['diy'] || {} : exports);