"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tpl_1 = require("./tpl");
var moment_1 = tslib_1.__importDefault(require("moment"));
var isPlainObject = require("lodash/isPlainObject");
var helper_1 = require("./helper");
var UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
exports.prettyBytes = function (num) {
    if (!Number.isFinite(num)) {
        throw new TypeError("Expected a finite number, got " + typeof num + ": " + num);
    }
    var neg = num < 0;
    if (neg) {
        num = -num;
    }
    if (num < 1) {
        return (neg ? '-' : '') + num + ' B';
    }
    var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), UNITS.length - 1);
    var numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3));
    var unit = UNITS[exponent];
    return (neg ? '-' : '') + numStr + ' ' + unit;
};
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
};
exports.escapeHtml = function (str) {
    return String(str).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
};
function formatDuration(value) {
    var unit = ['秒', '分', '时', '天', '月', '季', '年'];
    var steps = [1, 60, 3600, 86400, 2592000, 7776000, 31104000];
    var len = steps.length;
    var parts = [];
    while (len--) {
        if (steps[len] && value >= steps[len]) {
            parts.push(Math.round(value / steps[len]) + unit[len]);
            value %= steps[len];
        }
        else if (len === 0 && value) {
            parts.push((value.toFixed ? value.toFixed(2) : '0') + unit[0]);
        }
    }
    return parts.join('');
}
exports.formatDuration = formatDuration;
var timeUnitMap = {
    year: 'Y',
    years: 'Y',
    month: 'M',
    months: 'M',
    week: 'w',
    weeks: 'w',
    weekday: 'W',
    day: 'd',
    days: 'd',
    hour: 'h',
    hours: 'h',
    minute: 'm',
    minutes: 'm',
    min: 'm',
    mins: 'm'
};
exports.relativeValueRe = /^(.+)?(\+|-)(\d+)(minute|minutes|min|mins|hours|hour|day|days|week|weeks|month|months|year|years|weekday)$/i;
exports.filterDate = function (value, data, format) {
    if (data === void 0) { data = {}; }
    if (format === void 0) { format = 'X'; }
    var m;
    if (typeof value === 'string') {
        value = value.trim();
    }
    value = tpl_1.filter(value, data);
    if (value && typeof value === 'string' && (m = exports.relativeValueRe.exec(value))) {
        var date = new Date();
        var step = parseInt(m[3], 10);
        var from = m[1]
            ? exports.filterDate(m[1], data, format)
            : moment_1.default(/minute|minutes|min|mins|hours|hour/.test(m[4])
                ? [
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                ]
                : [date.getFullYear(), date.getMonth(), date.getDate()]);
        return m[2] === '-'
            ? from.subtract(step, timeUnitMap[m[4]])
            : from.add(step, timeUnitMap[m[4]]);
        //   return from[m[2] === '-' ? 'subtract' : 'add'](step, mapping[m[4]] || m[4]);
    }
    else if (value === 'now') {
        return moment_1.default();
    }
    else if (value === 'today') {
        var date = new Date();
        return moment_1.default([date.getFullYear(), date.getMonth(), date.getDate()]);
    }
    else {
        return moment_1.default(value, format);
    }
};
exports.filters = {
    html: function (input) { return exports.escapeHtml(input); },
    json: function (input, tabSize) {
        if (tabSize === void 0) { tabSize = 2; }
        return tabSize
            ? JSON.stringify(input, null, parseInt(tabSize, 10))
            : JSON.stringify(input);
    },
    toJson: function (input) {
        var ret;
        try {
            ret = JSON.parse(input);
        }
        catch (e) {
            ret = null;
        }
        return ret;
    },
    raw: function (input) { return input; },
    date: function (input, format, inputFormat) {
        if (format === void 0) { format = 'LLL'; }
        if (inputFormat === void 0) { inputFormat = 'X'; }
        return moment_1.default(input, inputFormat).format(format);
    },
    number: function (input) {
        var parts = String(input).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    },
    trim: function (input) { return input.trim(); },
    percent: function (input, decimals) {
        if (decimals === void 0) { decimals = 0; }
        input = parseFloat(input) || 0;
        decimals = parseInt(decimals, 10) || 0;
        var whole = input * 100;
        var multiplier = Math.pow(10, decimals);
        return ((Math.round(whole * multiplier) / multiplier).toFixed(decimals) + '%');
    },
    duration: function (input) { return (input ? formatDuration(input) : input); },
    bytes: function (input) { return (input ? exports.prettyBytes(parseFloat(input)) : input); },
    round: function (input, decimals) {
        if (decimals === void 0) { decimals = 0; }
        if (isNaN(input)) {
            return 0;
        }
        decimals = parseInt(decimals, 10) || 2;
        var multiplier = Math.pow(10, decimals);
        return (Math.round(input * multiplier) / multiplier).toFixed(decimals);
    },
    truncate: function (input, length, end) {
        end = end || '...';
        if (length == null) {
            return input;
        }
        length = parseInt(length, 10) || 200;
        return input.substring(0, length) + (input.length > length ? end : '');
    },
    url_encode: function (input) { return encodeURIComponent(input); },
    url_decode: function (input) { return decodeURIComponent(input); },
    default: function (input, defaultValue) {
        return input ||
            (function () {
                try {
                    if (defaultValue === 'undefined') {
                        return undefined;
                    }
                    return JSON.parse(defaultValue);
                }
                catch (e) {
                    return defaultValue;
                }
            })();
    },
    join: function (input, glue) { return (input && input.join ? input.join(glue) : input); },
    split: function (input, delimiter) {
        if (delimiter === void 0) { delimiter = ','; }
        return typeof input === 'string' ? input.split(delimiter) : input;
    },
    first: function (input) { return input && input[0]; },
    nth: function (input, nth) {
        if (nth === void 0) { nth = 0; }
        return input && input[nth];
    },
    last: function (input) { return input && (input.length ? input[input.length - 1] : null); },
    minus: function (input, step) {
        if (step === void 0) { step = 1; }
        return (parseInt(input, 10) || 0) - parseInt(step, 10);
    },
    plus: function (input, step) {
        if (step === void 0) { step = 1; }
        return (parseInt(input, 10) || 0) + parseInt(step, 10);
    },
    pick: function (input, path) {
        if (path === void 0) { path = '&'; }
        return Array.isArray(input) && !/^\d+$/.test(path)
            ? input.map(function (item) { return pickValues(path, item); })
            : pickValues(path, input);
    },
    pick_if_exist: function (input, path) {
        if (path === void 0) { path = '&'; }
        return Array.isArray(input)
            ? input.map(function (item) { return exports.resolveVariable(path, item) || item; })
            : exports.resolveVariable(path, input) || input;
    },
    str2date: function (input, inputFormat, outputFormat) {
        if (inputFormat === void 0) { inputFormat = 'X'; }
        if (outputFormat === void 0) { outputFormat = 'X'; }
        return input
            ? exports.filterDate(input, this, inputFormat).format(outputFormat)
            : '';
    },
    asArray: function (input) { return (input ? [input] : input); },
    filter: function (input, keys, expOrDirective, arg1) {
        if (!Array.isArray(input) || !keys || !expOrDirective) {
            return input;
        }
        var directive = expOrDirective;
        var fn = function () { return true; };
        if (directive === 'isTrue') {
            fn = function (value) { return !!value; };
        }
        else if (directive === 'isFalse') {
            fn = function (value) { return !value; };
        }
        else if (directive === 'isExists') {
            fn = function (value) { return typeof value !== 'undefined'; };
        }
        else {
            if (directive !== 'match') {
                directive = 'match';
                arg1 = expOrDirective;
            }
            arg1 = arg1
                ? /^('|")(.*)\1$/.test(arg1)
                    ? RegExp.$2
                    : exports.resolveVariable(arg1, this)
                : '';
            // 比对的值是空时直接返回。
            if (!arg1) {
                return input;
            }
            fn = function (value) {
                return !!~String(value)
                    .toLowerCase()
                    .indexOf(arg1);
            };
        }
        keys = keys.split(/\s*,\s*/);
        return input.filter(function (item) {
            return keys.some(function (key) { return fn(exports.resolveVariable(key, item), key, item); });
        });
    },
    base64Encode: function (str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
            return String.fromCharCode(('0x' + p1));
        }));
    },
    base64Decode: function (str) {
        return decodeURIComponent(atob(str)
            .split('')
            .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(''));
    },
    lowerCase: function (input) {
        return input && typeof input === 'string' ? input.toLowerCase() : input;
    },
    upperCase: function (input) {
        return input && typeof input === 'string' ? input.toUpperCase() : input;
    }
};
function registerFilter(name, fn) {
    exports.filters[name] = fn;
}
exports.registerFilter = registerFilter;
function pickValues(names, data) {
    var _a;
    var arr;
    if (!names || ((arr = names.split(',')) && arr.length < 2)) {
        var idx = names.indexOf('~');
        if (~idx) {
            var key = names.substring(0, idx);
            var target = names.substring(idx + 1);
            return _a = {},
                _a[key] = exports.resolveVariable(target, data),
                _a;
        }
        return exports.resolveVariable(names, data);
    }
    var ret = {};
    arr.forEach(function (name) {
        var idx = name.indexOf('~');
        var target = name;
        if (~idx) {
            target = name.substring(idx + 1);
            name = name.substring(0, idx);
        }
        helper_1.setVariable(ret, name, exports.resolveVariable(target, data));
    });
    return ret;
}
exports.pickValues = pickValues;
exports.resolveVariable = function (path, data) {
    if (data === void 0) { data = {}; }
    if (!path) {
        return undefined;
    }
    if (path === '$$') {
        return data;
    }
    else if (path[0] === '$') {
        path = path.substring(1);
    }
    else if (path === '&') {
        return data;
    }
    if (typeof data[path] !== 'undefined') {
        return data[path];
    }
    var parts = path.replace(/^{|}$/g, '').split('.');
    return parts.reduce(function (data, path) {
        if ((helper_1.isObject(data) || Array.isArray(data)) && path in data) {
            return data[path];
        }
        return undefined;
    }, data);
};
exports.resolveVariableAndFilter = function (path, data, defaultFilter) {
    if (data === void 0) { data = {}; }
    if (defaultFilter === void 0) { defaultFilter = '| html'; }
    if (!path) {
        return undefined;
    }
    var m = /^(\\)?\$(?:([a-z0-9_.]+)|{([\s\S]+)})$/i.exec(path);
    if (!m) {
        return undefined;
    }
    var _ = m[0], escape = m[1], key = m[2], key2 = m[3];
    // 如果是转义如： `\$abc` => `$abc`
    if (escape) {
        return _.substring(1);
    }
    var finalKey = key || key2;
    // 先只支持一层吧
    finalKey = finalKey.replace(/(\\)?\$(?:([a-z0-9_.]+)|{([^}{]+)})/g, function (_, escape) {
        return escape
            ? _.substring(1)
            : exports.resolveVariableAndFilter(_, data, defaultFilter);
    });
    // 默认 html 转义
    if (!~finalKey.indexOf('|')) {
        finalKey += defaultFilter;
    }
    var paths = finalKey.split(/\s*\|\s*/g);
    var originalKey = finalKey;
    finalKey = paths.shift();
    var ret = exports.resolveVariable(finalKey, data);
    return ret == null && !~originalKey.indexOf('default')
        ? ''
        : paths.reduce(function (input, filter) {
            var _a;
            var params = filter
                .replace(/([^\\])\\([\:\\])/g, function (_, affix, content) {
                return affix + "__" + (content === ':' ? 'colon' : 'slash') + "__";
            })
                .split(':')
                .map(function (item) {
                return item.replace(/__(slash|colon)__/g, function (_, type) {
                    return type === 'colon' ? ':' : '\\';
                });
            });
            var key = params.shift();
            return (_a = (exports.filters[key] || exports.filters.raw)).call.apply(_a, tslib_1.__spreadArrays([data, input], params));
        }, ret);
};
exports.tokenize = function (str, data, defaultFilter) {
    if (defaultFilter === void 0) { defaultFilter = '| html'; }
    if (!str || typeof str !== 'string') {
        return str;
    }
    return str.replace(/(\\)?\$(?:([a-z0-9_\.]+|&|\$)|{([^}{]+?)})/gi, function (_, escape, key1, key2, index, source) {
        if (!escape && key1 === '$') {
            var prefix = source[index - 1];
            return prefix === '='
                ? encodeURIComponent(JSON.stringify(data))
                : helper_1.qsstringify(data);
        }
        return escape
            ? _.substring(1)
            : exports.resolveVariableAndFilter(_, data, defaultFilter);
    });
};
function resolveMapping(value, data) {
    return typeof value === 'string' &&
        /^\$(?:([a-z0-9_.]+)|{[^}{]+})$/.test(value)
        ? exports.resolveVariableAndFilter(value, data, '| raw')
        : typeof value === 'string' && ~value.indexOf('$')
            ? exports.tokenize(value, data, '| raw')
            : value;
}
function dataMapping(to, from) {
    var ret = {};
    if (Array.isArray(to)) {
        return to.map(function (item) { return dataMapping(item, from); });
    }
    else if (!to) {
        return ret;
    }
    Object.keys(to).forEach(function (key) {
        var value = to[key];
        var keys;
        if (key === '&' && value === '$$') {
            ret = tslib_1.__assign(tslib_1.__assign({}, ret), from);
        }
        else if (key === '&') {
            var v = isPlainObject(value) &&
                (keys = Object.keys(value)) &&
                keys.length === 1 &&
                from[keys[0].substring(1)] &&
                Array.isArray(from[keys[0].substring(1)])
                ? from[keys[0].substring(1)].map(function (raw) {
                    return dataMapping(value[keys[0]], helper_1.createObject(from, raw));
                })
                : resolveMapping(value, from);
            if (Array.isArray(v) || typeof v === 'string') {
                ret = v;
            }
            else if (typeof v === 'function') {
                ret = tslib_1.__assign(tslib_1.__assign({}, ret), v(from));
            }
            else {
                ret = tslib_1.__assign(tslib_1.__assign({}, ret), v);
            }
        }
        else if (value === '$$') {
            ret[key] = from;
        }
        else if (value && value[0] === '$') {
            var v = resolveMapping(value, from);
            ret[key] = v;
            if (v === '__undefined') {
                delete ret[key];
            }
        }
        else if (isPlainObject(value) &&
            (keys = Object.keys(value)) &&
            keys.length === 1 &&
            from[keys[0].substring(1)] &&
            Array.isArray(from[keys[0].substring(1)])) {
            // 支持只取数组中的部分值这个需求
            // 如:
            // data: {
            //   items: {
            //     '$rows': {
            //        id: '$id',
            //        forum_id: '$forum_id'
            //      }
            //   }
            // }
            var arr = from[keys[0].substring(1)];
            var mapping_1 = value[keys[0]];
            ret[key] = arr.map(function (raw) {
                return dataMapping(mapping_1, helper_1.createObject(from, raw));
            });
        }
        else if (isPlainObject(value)) {
            ret[key] = dataMapping(value, from);
        }
        else if (Array.isArray(value)) {
            ret[key] = value.map(function (value) {
                return isPlainObject(value)
                    ? dataMapping(value, from)
                    : resolveMapping(value, from);
            });
        }
        else if (typeof value == 'string' && ~value.indexOf('$')) {
            ret[key] = resolveMapping(value, from);
        }
        else if (typeof value === 'function') {
            ret[key] = value(from);
        }
        else {
            ret[key] = value;
            if (value === '__undefined') {
                delete ret[key];
            }
        }
    });
    return ret;
}
exports.dataMapping = dataMapping;
tpl_1.reigsterTplEnginer('builtin', {
    test: function (str) { return !!~str.indexOf('$'); },
    compile: function (str, data, defaultFilter) {
        if (defaultFilter === void 0) { defaultFilter = '| html'; }
        return exports.tokenize(str, data, defaultFilter);
    }
});
//# sourceMappingURL=./utils/tpl-builtin.js.map
