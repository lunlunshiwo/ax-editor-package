"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find = require("lodash/find");
var findIndex = require("lodash/findIndex");
var SimpleMap = /** @class */ (function () {
    function SimpleMap() {
        this.list = [];
    }
    SimpleMap.prototype.set = function (key, value) {
        this.list.push({
            key: key,
            value: value
        });
    };
    SimpleMap.prototype.get = function (key) {
        var resolved = find(this.list, function (item) { return item.key === key; });
        return resolved ? resolved.value : null;
    };
    SimpleMap.prototype.delete = function (key) {
        var idx = findIndex(this.list, function (item) { return item.key === key; });
        ~idx && this.list.splice(idx, 1);
    };
    SimpleMap.prototype.dispose = function () {
        this.list.splice(0, this.list.length);
    };
    return SimpleMap;
}());
exports.SimpleMap = SimpleMap;
//# sourceMappingURL=./utils/SimpleMap.js.map
