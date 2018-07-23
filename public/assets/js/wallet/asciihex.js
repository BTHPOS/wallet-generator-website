var ASCIIHEX = {};

// ASCII to HEX
ASCIIHEX.asciitohex = function(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n ++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
};

// Converts ascii to hex
ASCIIHEX.hextoascii = function(hexValue) {
    var hex = hexValue.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
};
