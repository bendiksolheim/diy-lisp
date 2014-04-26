function clone(obj) {
	if (null == obj || "object" != typeof obj) return obj;

    /*var copy = {};
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }*/
    return extend({}, obj);
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

	return this.vars[v];
};

Environment.prototype.extend = function(vars) {
	var newEnv = clone(this.vars);
	extend(newEnv, vars);
	return new Environment(newEnv);
};

Environment.prototype.set = function(v, val) {
	if (this.vars.hasOwnProperty(v))
		throw new Error('Property ' + v + ' already defined');

	this.vars[v] = val;
};

module.exports = Environment;