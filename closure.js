(function(diy) {

	function Closure(env, params, body) {
		this.env = env;
		this.params = params;
		this.body = body;
	}

	diy.Closure = Closure;
})(typeof exports === 'undefined' ? this['diy'] = this['diy'] || {} : exports);