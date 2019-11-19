"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tpl_1 = require("./tpl");
var template = require("lodash/template");
var tpl_builtin_1 = require("./tpl-builtin");
var moment_1 = tslib_1.__importDefault(require("moment"));
var imports = tslib_1.__assign(tslib_1.__assign({}, tpl_builtin_1.filters), { formatTimeStamp: tpl_builtin_1.filters.date, formatNumber: tpl_builtin_1.filters.number, defaultValue: tpl_builtin_1.filters.defaut, default: undefined, moment: moment_1.default, countDown: function (end) {
        if (!end) {
            return '--';
        }
        var date = new Date(parseInt(end, 10) * 1000);
        var now = Date.now();
        if (date.getTime() < now) {
            return '已结束';
        }
        return Math.ceil((date.getTime() - now) / (1000 * 60 * 60 * 24)) + '天';
    }, formatDate: function (value, format, inputFormat) {
        if (format === void 0) { format = 'LLL'; }
        if (inputFormat === void 0) { inputFormat = ''; }
        return moment_1.default(value, inputFormat).format(format);
    } });
delete imports.default; // default 是个关键字，不能 imports 到 lodash 里面去。
function lodashCompile(str, data) {
    try {
        var fn = template(str, {
            imports: imports,
            variable: 'data'
        });
        return fn(data);
    }
    catch (e) {
        return "<span class=\"text-danger\">" + e.message + "</span>";
    }
}
tpl_1.reigsterTplEnginer('lodash', {
    test: function (str) { return !!~str.indexOf('<%'); },
    compile: function (str, data) { return lodashCompile(str, data); }
});
//# sourceMappingURL=./utils/tpl-lodash.js.map
