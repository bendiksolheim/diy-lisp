function is_number(n) {
    return /^\d+$/.test(n);
}

function number(n) {
    return parseInt(n, 10);
}

module.exports = {
    is_number: is_number,
    number: number
};
