"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var theme_1 = require("../theme");
exports.classPrefix = 'a-';
exports.classnames = theme_1.makeClassnames(exports.classPrefix);
theme_1.theme('default', {
    classPrefix: exports.classPrefix,
    classnames: exports.classnames
});
//# sourceMappingURL=./themes/default.js.map
