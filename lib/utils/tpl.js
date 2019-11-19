"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var enginers = {};
function reigsterTplEnginer(name, enginer) {
    enginers[name] = enginer;
}
exports.reigsterTplEnginer = reigsterTplEnginer;
function filter(tpl, data) {
    if (data === void 0) { data = {}; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    if (!tpl || typeof tpl !== 'string') {
        return '';
    }
    var keys = Object.keys(enginers);
    for (var i = 0, len = keys.length; i < len; i++) {
        var enginer = enginers[keys[i]];
        if (enginer.test(tpl)) {
            return enginer.compile.apply(enginer, tslib_1.__spreadArrays([tpl, data], rest));
        }
    }
    return tpl;
}
exports.filter = filter;
function evalExpression(expression, data) {
    if (!expression || typeof expression !== 'string') {
        return false;
    }
    /* jshint evil:true */
    try {
        var debug = false;
        var idx = expression.indexOf('debugger');
        if (~idx) {
            debug = true;
            expression = expression.replace(/debugger;?/, '');
        }
        var fn = new Function('data', "with(data) {" + (debug ? 'debugger;' : '') + "return !!(" + expression + ");}");
        data = data || {};
        return fn.call(data, data);
    }
    catch (e) {
        console.warn(e);
        return false;
    }
}
exports.evalExpression = evalExpression;
function evalJS(js, data) {
    /* jshint evil:true */
    try {
        var fn = new Function('data', "with(data) {" + (~js.indexOf('return') ? '' : 'return ') + js + ";}");
        data = data || {};
        return fn.call(data, data);
    }
    catch (e) {
        console.warn(e);
        return null;
    }
}
exports.evalJS = evalJS;
//# sourceMappingURL=./utils/tpl.js.map
