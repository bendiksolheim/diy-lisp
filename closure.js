function Closure(env, params, body) {
	this.env = env;
	this.params = params;
	this.body = body;
}

module.exports = Closure;