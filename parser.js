var _ = require('./util');

function parse(source) {
    source = trim(source);
    if (source === '#t')
        return true;
    else if (source === '#f')
        return false;
    else if (_.is_number(source))
        return _.number(source);
    else if (source[0] === '(')
        return to_list(source);
    else if (source[0] === '\'')
        return ['quote', parse(source.substr(1))];
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
    /*return split_exps(source.substr(1, end-1))
        .map(function(exp) { return parse(exp);});*/
}

// works
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
    if (source[0] === '\'') {
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

module.exports = {
    parse: parse,
    first_exp: first_exp
}
