(function(diy) {

    function isNumber(n) {
        return /^\d+$/.test(n);
    }

    function toNumber(n) {
        return parseInt(n, 10);
    }

    function toCharacter(n) {
        return String.fromCharCode(n + 65);
    }

    function fromCharacter(c) {
        return c.charCodeAt() - 65;
    }

    function parse(source) {
        source = trim(source);
        if (source === '#t')
            return true;
        else if (source === '#f')
            return false;
        else if (isNumber(source))
            return toNumber(source);
        else if (source[0] === '(')
            return to_list(source);
        else if (source[0] === '\'')
            return ['quote', parse(source.substr(1))];
        else if (source[0] === ':')
            return ['quote', expand(source.substr(1))];
        else
            return source;
    }

    function parse_multiple(source) {
        return split_exps(source).map(function(exp) { return parse(exp); });
    }

    function to_list(source) {
        var end = matching_paren(source);
        if (end === source.length)
            throw new Error("Expected EOF: " + source);

        var exps = split_exps(source.substr(1, end-1));
        exps = exps.map(function(exp) { return parse(exp); });
        return exps;
    }

    function expand(source) {
        var end = matching_paren(source);
        if (end === source.length)
            throw new Error("Expected EOF: " + source);

        var exps = split_exps(source.substr(1, end-1));
        if (exps.length !== 2)
            throw new Error("Expansion only takes two parameters: " + source);
        var from = exps[0];
        var to = exps[1];

        if (isNumber(from) && isNumber(to))
            return expandNumberRange(toNumber(from), toNumber(to));
        
        return expandCellRange(from, to);
    }

    function expandNumberRange(from, to) {
        var a = [];
        while (from <= to)
            a.push(from++);
        return a;
    }

    function expandCellRange(from, to) {
        var letter = /[A-Za-z]+/;
        var number = /[0-9]+/;
        var fromLetter = letter.exec(from)[0];
        var toLetter = letter.exec(to)[0];
        from = number.exec(from)[0];
        to = number.exec(to)[0];
        var range = expandNumberRange(from, to).map(function(n) { return fromLetter + n; });
        return range;
    }

    function matching_paren(source) {
        if (source[0] !== '(')
            throw new Error("Expected '(' as first character, got " + source);
        var pos = 0;
        var open_brackets = 1;
        while (open_brackets > 0) {
            pos += 1;
            if (pos == source.length)
                throw new Error("Incomplete expression: ", source);
            if (source[pos] === '(')
                open_brackets++;
            if (source[pos] === ')')
                open_brackets--;
        }
        return pos;
    }

    function split_exps(source) {
        source = trim(source);
        var exps = [];
        while (source.length > 0) {
            var res = first_exp(source);
            exps.push(res.exp);
            source = res.rest;
        }
        
        return exps;
    }

    function first_exp(source) {
        source = trim(source);
        if (source[0] === '\'' || source[0] === ':') {
            var tmp = first_exp(source.substr(1));
            return {exp: source[0] + tmp.exp, rest: tmp.rest};
        } else if (source[0] === '(') {
            var end = matching_paren(source);
            return {exp: source.substr(0, end + 1), rest: source.substr(end + 1)};
        }

        var single_exp = /^[^\s)']+/g;
        var match = single_exp.exec(source);
        var end = single_exp.lastIndex;
        var atom = source.substr(0, end);
        return {exp: atom, rest: source.substr(end)};
    }

    function trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

    function unparse(ast) {
        if (isBoolean(ast)) {
            return ast ? '#t' : '#f';
        } else if (isList(ast)) {
            if (ast.length > 0 && ast[0] === 'quote')
                return "'" + unparse(ast[1]);
            else
                return "(" + ast.map(function(a) { return unparse(a); }).join(" ") + ")";
        }

        return ast + "";
    }

    diy.Parser = {
        parse: parse,
        parse_multiple: parse_multiple,
        unparse: unparse,
        first_exp: first_exp
    }

})(typeof exports === 'undefined' ? this['diy'] = this['diy'] || {} : exports);