"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var isPlainObject = require("lodash/isPlainObject");
var isEqual = require("lodash/isEqual");
var lodashIsObject = require("lodash/isObject");
var uniq = require("lodash/uniq");
var tpl_1 = require("./tpl");
var autobind_decorator_1 = require("autobind-decorator");
var qs_1 = tslib_1.__importDefault(require("qs"));
// 方便取值的时候能够把上层的取到，但是获取的时候不会全部把所有的数据获取到。
function createObject(superProps, props, properties) {
    if (superProps && Object.isFrozen(superProps)) {
        superProps = cloneObject(superProps);
    }
    var obj = superProps
        ? Object.create(superProps, tslib_1.__assign(tslib_1.__assign({}, properties), { __super: {
                value: superProps,
                writable: false,
                enumerable: false
            } }))
        : Object.create(Object.prototype, properties);
    props && Object.keys(props).forEach(function (key) { return (obj[key] = props[key]); });
    return obj;
}
exports.createObject = createObject;
function cloneObject(from) {
    var obj = from && from.__super
        ? Object.create(from.__super, {
            __super: {
                value: from.__super,
                writable: false,
                enumerable: false
            }
        })
        : Object.create(Object.prototype);
    from && Object.keys(from).forEach(function (key) { return (obj[key] = from[key]); });
    return obj;
}
exports.cloneObject = cloneObject;
function extendObject(to, from) {
    var obj = cloneObject(to);
    from && Object.keys(from).forEach(function (key) { return (obj[key] = from[key]); });
    return obj;
}
exports.extendObject = extendObject;
function syncDataFromSuper(data, superObject, prevSuperObject, force, store) {
    var obj = tslib_1.__assign({}, data);
    var keys = Object.keys(obj);
    // 如果是 form store，则从父级同步 formItem 种东西。
    if (store && store.storeType === 'FormStore') {
        keys = uniq(store.items.map(function (item) { return ("" + item.name).replace(/\..*$/, ''); }));
        force = false;
    }
    if (superObject || prevSuperObject) {
        keys.forEach(function (key) {
            if (((superObject && typeof superObject[key] !== 'undefined') ||
                (prevSuperObject && typeof prevSuperObject[key] !== 'undefined')) &&
                (force ||
                    (prevSuperObject && !superObject) ||
                    (!prevSuperObject && superObject) ||
                    prevSuperObject[key] !== superObject[key])) {
                obj[key] = superObject[key];
            }
        });
    }
    return obj;
}
exports.syncDataFromSuper = syncDataFromSuper;
/**
 * 生成 8 位随机数字。
 *
 * @return {string} 8位随机数字
 */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4();
}
exports.guid = guid;
function findIndex(arr, detect) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (detect(arr[i], i)) {
            return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function getVariable(data, key, canAccessSuper) {
    if (canAccessSuper === void 0) { canAccessSuper = true; }
    if (!data || !key) {
        return undefined;
    }
    else if (canAccessSuper ? key in data : data.hasOwnProperty(key)) {
        return data[key];
    }
    return key
        .split('.')
        .reduce(function (obj, key) {
        return obj &&
            typeof obj === 'object' &&
            (canAccessSuper ? key in obj : obj.hasOwnProperty(key))
            ? obj[key]
            : undefined;
    }, data);
}
exports.getVariable = getVariable;
function setVariable(data, key, value) {
    data = data || {};
    if (key in data) {
        data[key] = value;
        return;
    }
    var parts = key.split('.');
    var last = parts.pop();
    while (parts.length) {
        var key_1 = parts.shift();
        if (isPlainObject(data[key_1])) {
            data = data[key_1] = tslib_1.__assign({}, data[key_1]);
        }
        else if (data[key_1]) {
            // throw new Error(`目标路径不是纯对象，不能覆盖`);
            // 强行转成对象
            data[key_1] = {};
            data = data[key_1];
        }
        else {
            data[key_1] = {};
            data = data[key_1];
        }
    }
    data[last] = value;
}
exports.setVariable = setVariable;
function deleteVariable(data, key) {
    if (!data) {
        return;
    }
    else if (data.hasOwnProperty(key)) {
        delete data[key];
        return;
    }
    var parts = key.split('.');
    var last = parts.pop();
    while (parts.length) {
        var key_2 = parts.shift();
        if (isPlainObject(data[key_2])) {
            data = data[key_2] = tslib_1.__assign({}, data[key_2]);
        }
        else if (data[key_2]) {
            throw new Error("\u76EE\u6807\u8DEF\u5F84\u4E0D\u662F\u7EAF\u5BF9\u8C61\uFF0C\u4E0D\u80FD\u4FEE\u6539");
        }
        else {
            break;
        }
    }
    if (data && data.hasOwnProperty && data.hasOwnProperty(last)) {
        delete data[last];
    }
}
exports.deleteVariable = deleteVariable;
function hasOwnProperty(data, key) {
    var parts = key.split('.');
    while (parts.length) {
        var key_3 = parts.shift();
        if (!isObject(data) || !data.hasOwnProperty(key_3)) {
            return false;
        }
        data = data[key_3];
    }
    return true;
}
exports.hasOwnProperty = hasOwnProperty;
function noop() { }
exports.noop = noop;
function anyChanged(attrs, from, to, strictMode) {
    if (strictMode === void 0) { strictMode = true; }
    return (typeof attrs === 'string' ? attrs.split(/\s*,\s*/) : attrs).some(function (key) { return (strictMode ? from[key] !== to[key] : from[key] != to[key]); });
}
exports.anyChanged = anyChanged;
function rmUndefined(obj) {
    var newObj = {};
    if (typeof obj !== 'object') {
        return obj;
    }
    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        if (obj[key] !== undefined) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}
exports.rmUndefined = rmUndefined;
function isObjectShallowModified(prev, next, strictMode, ignoreUndefined) {
    if (strictMode === void 0) { strictMode = true; }
    if (ignoreUndefined === void 0) { ignoreUndefined = false; }
    if (null == prev || null == next || !isObject(prev) || !isObject(next)) {
        return strictMode ? prev !== next : prev != next;
    }
    if (ignoreUndefined) {
        prev = rmUndefined(prev);
        next = rmUndefined(next);
    }
    var keys = Object.keys(prev);
    var nextKeys = Object.keys(next);
    if (keys.length !== nextKeys.length ||
        keys.join(',') !== nextKeys.join(',')) {
        return true;
    }
    for (var i = keys.length - 1; i >= 0; i--) {
        var key = keys[i];
        if (strictMode
            ? next[key] !== prev[key]
            : isObjectShallowModified(next[key], prev[key], false, ignoreUndefined)) {
            return true;
        }
    }
    return false;
}
exports.isObjectShallowModified = isObjectShallowModified;
function isArrayChilrenModified(prev, next, strictMode) {
    if (strictMode === void 0) { strictMode = true; }
    if (!Array.isArray(prev) || !Array.isArray(next)) {
        return strictMode ? prev !== next : prev != next;
    }
    if (prev.length !== next.length) {
        return true;
    }
    for (var i = prev.length - 1; i >= 0; i--) {
        if (strictMode ? prev[i] !== next[i] : prev[i] != next[i]) {
            return true;
        }
    }
    return false;
}
exports.isArrayChilrenModified = isArrayChilrenModified;
// 即将抛弃
function makeColumnClassBuild(steps, classNameTpl) {
    if (classNameTpl === void 0) { classNameTpl = 'col-sm-$value'; }
    var count = 12;
    var step = Math.floor(count / steps);
    return function (schema) {
        if (schema.columnClassName &&
            /\bcol-(?:xs|sm|md|lg)-(\d+)\b/.test(schema.columnClassName)) {
            var flex = parseInt(RegExp.$1, 10);
            count -= flex;
            steps--;
            step = Math.floor(count / steps);
            return schema.columnClassName;
        }
        else if (schema.columnClassName) {
            count -= step;
            steps--;
            return schema.columnClassName;
        }
        count -= step;
        steps--;
        return classNameTpl.replace('$value', '' + step);
    };
}
exports.makeColumnClassBuild = makeColumnClassBuild;
function isVisible(schema, data) {
    return !(schema.hidden ||
        schema.visible === false ||
        (schema.hiddenOn && tpl_1.evalExpression(schema.hiddenOn, data) === true) ||
        (schema.visibleOn && tpl_1.evalExpression(schema.visibleOn, data) === false));
}
exports.isVisible = isVisible;
function isDisabled(schema, data) {
    return (schema.disabled ||
        (schema.disabledOn && tpl_1.evalExpression(schema.disabledOn, data)));
}
exports.isDisabled = isDisabled;
function hasAbility(schema, ability, data, defaultValue) {
    if (defaultValue === void 0) { defaultValue = true; }
    return schema.hasOwnProperty(ability)
        ? schema[ability]
        : schema.hasOwnProperty(ability + "On")
            ? tpl_1.evalExpression(schema[ability + "On"], data || schema)
            : defaultValue;
}
exports.hasAbility = hasAbility;
function makeHorizontalDeeper(horizontal, count) {
    if (count > 1 && /\bcol-(xs|sm|md|lg)-(\d+)\b/.test(horizontal.left)) {
        var flex = parseInt(RegExp.$2, 10) * count;
        return {
            leftFixed: horizontal.leftFixed,
            left: flex,
            right: 12 - flex,
            offset: flex
        };
    }
    else if (count > 1 && typeof horizontal.left === 'number') {
        var flex = horizontal.left * count;
        return {
            leftFixed: horizontal.leftFixed,
            left: flex,
            right: 12 - flex,
            offset: flex
        };
    }
    return horizontal;
}
exports.makeHorizontalDeeper = makeHorizontalDeeper;
function promisify(fn) {
    var promisified = function () {
        try {
            var ret_1 = fn.apply(null, arguments);
            if (ret_1 && ret_1.then) {
                return ret_1;
            }
            else if (typeof ret_1 === 'function') {
                // thunk support
                return new Promise(function (resolve, reject) {
                    return ret_1(function (error, value) {
                        return error ? reject(error) : resolve(value);
                    });
                });
            }
            return Promise.resolve(ret_1);
        }
        catch (e) {
            Promise.reject(e);
        }
    };
    promisified.raw = fn;
    return promisified;
}
exports.promisify = promisify;
function getScrollParent(node) {
    if (node == null) {
        return null;
    }
    var style = getComputedStyle(node);
    var text = style.getPropertyValue('overflow') +
        style.getPropertyValue('overflow-x') +
        style.getPropertyValue('overflow-y');
    if (/auto|scroll/.test(text) || node.nodeName === 'BODY') {
        return node;
    }
    return getScrollParent(node.parentNode);
}
exports.getScrollParent = getScrollParent;
/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function difference(object, base) {
    function changes(object, base) {
        var keys = uniq(Object.keys(object).concat(Object.keys(base)));
        var result = {};
        keys.forEach(function (key) {
            var a = object[key];
            var b = base[key];
            if (isEqual(a, b)) {
                return;
            }
            if (!object.hasOwnProperty(key)) {
                result[key] = undefined;
            }
            else if (Array.isArray(a) && Array.isArray(b)) {
                // todo 数组要不要深入分析？我看先别了。
                result[key] = a;
            }
            else if (lodashIsObject(a) && lodashIsObject(b)) {
                result[key] = changes(a, b);
            }
            else {
                result[key] = a;
            }
        });
        return result;
    }
    return changes(object, base);
}
exports.difference = difference;
exports.padArr = function (arr, size) {
    if (size === void 0) { size = 4; }
    var ret = [];
    var pool = arr.concat();
    var from = 0;
    while (pool.length) {
        var host = ret[from] || (ret[from] = []);
        if (host.length >= size) {
            from += 1;
            continue;
        }
        host.push(pool.shift());
    }
    return ret;
};
function __uri(id) {
    return id;
}
exports.__uri = __uri;
function isObject(obj) {
    var typename = typeof obj;
    return (obj &&
        typename !== 'string' &&
        typename !== 'number' &&
        typename !== 'boolean' &&
        typename !== 'function' &&
        !Array.isArray(obj));
}
exports.isObject = isObject;
// xs < 768px
// sm >= 768px
// md >= 992px
// lg >= 1200px
function isBreakpoint(str) {
    if (typeof str !== 'string') {
        return !!str;
    }
    var breaks = str.split(/\s*,\s*|\s+/);
    if (window.matchMedia) {
        return breaks.some(function (item) {
            return item === '*' ||
                (item === 'xs' &&
                    matchMedia("screen and (max-width: 767px)").matches) ||
                (item === 'sm' &&
                    matchMedia("screen and (min-width: 768px) and (max-width: 991px)")
                        .matches) ||
                (item === 'md' &&
                    matchMedia("screen and (min-width: 992px) and (max-width: 1199px)")
                        .matches) ||
                (item === 'lg' && matchMedia("screen and (min-width: 1200px)").matches);
        });
    }
    else {
        var width_1 = window.innerWidth;
        return breaks.some(function (item) {
            return item === '*' ||
                (item === 'xs' && width_1 < 768) ||
                (item === 'sm' && width_1 >= 768 && width_1 < 992) ||
                (item === 'md' && width_1 >= 992 && width_1 < 1200) ||
                (item === 'lg' && width_1 >= 1200);
        });
    }
}
exports.isBreakpoint = isBreakpoint;
function until(fn, when, getCanceler, interval) {
    var _this = this;
    if (interval === void 0) { interval = 5000; }
    var timer;
    var stoped = false;
    return new Promise(function (resolve, reject) {
        var cancel = function () {
            clearTimeout(timer);
            stoped = true;
        };
        var check = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var ret, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fn()];
                    case 1:
                        ret = _a.sent();
                        if (stoped) {
                            return [2 /*return*/];
                        }
                        else if (when(ret)) {
                            stoped = true;
                            resolve(ret);
                        }
                        else {
                            timer = setTimeout(check, interval);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        reject(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        check();
        getCanceler && getCanceler(cancel);
    });
}
exports.until = until;
function omitControls(controls, omitItems) {
    return controls.filter(function (control) { return !~omitItems.indexOf(control.name || control._name); });
}
exports.omitControls = omitControls;
function isEmpty(thing) {
    if (isObject(thing) && Object.keys(thing).length) {
        return false;
    }
    return true;
}
exports.isEmpty = isEmpty;
/**
 * 基于时间戳的 uuid
 *
 * @returns uniqueId
 */
exports.uuid = function () {
    return (+new Date()).toString(36);
};
/**
 * 类似于 arr.map 方法，此方法主要针对类似下面示例的树形结构。
 * [
 *     {
 *         children: []
 *     },
 *     // 其他成员
 * ]
 *
 * @param {Tree} tree 树形数据
 * @param {Function} iterator 处理函数，返回的数据会被替换成新的。
 * @return {Tree} 返回处理过的 tree
 */
function mapTree(tree, iterator, level, depthFirst, paths) {
    if (level === void 0) { level = 1; }
    if (depthFirst === void 0) { depthFirst = false; }
    if (paths === void 0) { paths = []; }
    return tree.map(function (item, index) {
        if (depthFirst) {
            var children = item.children
                ? mapTree(item.children, iterator, level + 1, depthFirst, paths.concat(item))
                : undefined;
            children && (item = tslib_1.__assign(tslib_1.__assign({}, item), { children: children }));
            item = iterator(item, index, level, paths) || tslib_1.__assign({}, item);
            return item;
        }
        item = iterator(item, index, level, paths) || tslib_1.__assign({}, item);
        if (item.children && item.children.splice) {
            item.children = mapTree(item.children, iterator, level + 1, depthFirst, paths.concat(item));
        }
        return item;
    });
}
exports.mapTree = mapTree;
/**
 * 遍历树
 * @param tree
 * @param iterator
 */
function eachTree(tree, iterator, level) {
    if (level === void 0) { level = 1; }
    tree.map(function (item, index) {
        iterator(item, index, level);
        if (item.children && item.children.splice) {
            eachTree(item.children, iterator, level + 1);
        }
    });
}
exports.eachTree = eachTree;
/**
 * 在树中查找节点。
 * @param tree
 * @param iterator
 */
function findTree(tree, iterator) {
    var result = null;
    everyTree(tree, function (item, key, level, paths) {
        if (iterator(item, key, level, paths)) {
            result = item;
            return false;
        }
        return true;
    });
    return result;
}
exports.findTree = findTree;
/**
 * 在树中查找节点, 返回下标数组。
 * @param tree
 * @param iterator
 */
function findTreeIndex(tree, iterator) {
    var idx = [];
    findTree(tree, function (item, index, level, paths) {
        if (iterator(item, index, level, paths)) {
            idx = [index];
            paths = paths.concat();
            paths.unshift({
                children: tree
            });
            for (var i = paths.length - 1; i > 0; i--) {
                var prev = paths[i - 1];
                var current = paths[i];
                idx.unshift(prev.children.indexOf(current));
            }
            return true;
        }
        return false;
    });
    return idx.length ? idx : undefined;
}
exports.findTreeIndex = findTreeIndex;
function getTree(tree, idx) {
    var indexes = Array.isArray(idx) ? idx : [idx];
    var lastIndex = indexes.pop();
    var list = tree;
    for (var i = 0, len = indexes.length; i < len; i++) {
        var index = indexes[i];
        if (!list[index]) {
            list = null;
            break;
        }
        list = list[index].children;
    }
    return list ? list[lastIndex] : undefined;
}
exports.getTree = getTree;
/**
 * 过滤树节点
 *
 * @param tree
 * @param iterator
 */
function filterTree(tree, iterator, level) {
    if (level === void 0) { level = 1; }
    return tree.filter(function (item, index) {
        if (!iterator(item, index, level)) {
            return false;
        }
        if (item.children && item.children.splice) {
            item.children = filterTree(item.children, iterator, level + 1);
        }
        return true;
    });
}
exports.filterTree = filterTree;
/**
 * 判断树中每个节点是否满足某个条件。
 * @param tree
 * @param iterator
 */
function everyTree(tree, iterator, level, paths) {
    if (level === void 0) { level = 1; }
    if (paths === void 0) { paths = []; }
    return tree.every(function (item, index) {
        var value = iterator(item, index, level, paths);
        if (value && item.children && item.children.splice) {
            return everyTree(item.children, iterator, level + 1, paths.concat(item));
        }
        return value;
    });
}
exports.everyTree = everyTree;
/**
 * 判断树中是否有某些节点满足某个条件。
 * @param tree
 * @param iterator
 */
function someTree(tree, iterator) {
    return !everyTree(tree, iterator);
}
exports.someTree = someTree;
function flattenTree(tree, mapper) {
    var flattened = [];
    eachTree(tree, function (item, index) {
        return flattened.push(mapper ? mapper(item, index) : item);
    });
    return flattened;
}
exports.flattenTree = flattenTree;
/**
 * 操作树，遵循 imutable, 每次返回一个新的树。
 * 类似数组的 splice 不同的地方这个方法不修改原始数据，
 * 同时第二个参数不是下标，而是下标数组，分别代表每一层的下标。
 *
 * 至于如何获取下标数组，请查看 findTreeIndex
 *
 * @param tree
 * @param idx
 * @param deleteCount
 * @param ...items
 */
function spliceTree(tree, idx, deleteCount) {
    if (deleteCount === void 0) { deleteCount = 0; }
    var items = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        items[_i - 3] = arguments[_i];
    }
    var list = tree.concat();
    if (typeof idx === 'number') {
        list.splice.apply(list, tslib_1.__spreadArrays([idx, deleteCount], items));
    }
    else if (Array.isArray(idx) && idx.length) {
        var lastIdx = idx.pop();
        var host = idx.reduce(function (list, idx) {
            var child = tslib_1.__assign(tslib_1.__assign({}, list[idx]), { children: list[idx].children ? list[idx].children.concat() : [] });
            list[idx] = child;
            return child.children;
        }, list);
        host.splice.apply(host, tslib_1.__spreadArrays([lastIdx, deleteCount], items));
    }
    return list;
}
exports.spliceTree = spliceTree;
function ucFirst(str) {
    return str ? str.substring(0, 1).toUpperCase() + str.substring(1) : '';
}
exports.ucFirst = ucFirst;
function lcFirst(str) {
    return str ? str.substring(0, 1).toLowerCase() + str.substring(1) : '';
}
exports.lcFirst = lcFirst;
function camel(str) {
    return str
        ? str
            .split(/[\s_\-]/)
            .map(function (item, index) { return (index === 0 ? lcFirst(item) : ucFirst(item)); })
            .join('')
        : '';
}
exports.camel = camel;
function getWidthRate(value) {
    if (typeof value === 'string' && /\bcol\-\w+\-(\d+)\b/.test(value)) {
        return parseInt(RegExp.$1, 10);
    }
    return value || 0;
}
exports.getWidthRate = getWidthRate;
function getLevelFromClassName(value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 'default'; }
    if (/\b(?:btn|text)-(link|primary|secondary|info|success|warning|danger|light|dark)\b/.test(value)) {
        return RegExp.$1;
    }
    return defaultValue;
}
exports.getLevelFromClassName = getLevelFromClassName;
function pickEventsProps(props) {
    var ret = {};
    props &&
        Object.keys(props).forEach(function (key) { return /^on/.test(key) && (ret[key] = props[key]); });
    return ret;
}
exports.pickEventsProps = pickEventsProps;
exports.autobind = autobind_decorator_1.boundMethod;
exports.bulkBindFunctions = function (context, funNames) {
    funNames.forEach(function (key) { return (context[key] = context[key].bind(context)); });
};
function sortArray(items, field, dir) {
    return items.sort(function (a, b) {
        var ret;
        var a1 = a[field];
        var b1 = b[field];
        if (typeof a1 === 'number' && typeof b1 === 'number') {
            ret = a1 < b1 ? -1 : a1 === b1 ? 0 : 1;
        }
        else {
            ret = String(a1).localeCompare(String(b1));
        }
        return ret * dir;
    });
}
exports.sortArray = sortArray;
// 只判断一层, 如果层级很深，form-data 也不好表达。
function hasFile(object) {
    return Object.keys(object).some(function (key) {
        var value = object[key];
        return (value instanceof File ||
            (Array.isArray(value) && value.length && value[0] instanceof File));
    });
}
exports.hasFile = hasFile;
function qsstringify(data, options) {
    if (options === void 0) { options = {
        arrayFormat: 'indices',
        encodeValuesOnly: true
    }; }
    return qs_1.default.stringify(data, options);
}
exports.qsstringify = qsstringify;
function object2formData(data, options, fd) {
    if (options === void 0) { options = {
        arrayFormat: 'indices',
        encodeValuesOnly: true
    }; }
    if (fd === void 0) { fd = new FormData(); }
    var others = {};
    Object.keys(data).forEach(function (key) {
        var value = data[key];
        if (value instanceof File) {
            fd.append(key, value, value.name);
        }
        else if (Array.isArray(value) &&
            value.length &&
            value[0] instanceof File) {
            value.forEach(function (value) { return fd.append(key + "[]", value, value.name); });
        }
        else {
            others[key] = value;
        }
    });
    // 因为 key 的格式太多了，偷个懒，用 qs 来处理吧。
    qsstringify(others, options)
        .split('&')
        .forEach(function (item) {
        var parts = item.split('=');
        parts[0] && fd.append(parts[0], parts[1]);
    });
    return fd;
}
exports.object2formData = object2formData;
function chainFunctions() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        fns.forEach(function (fn) { return fn && fn.apply(void 0, args); });
    };
}
exports.chainFunctions = chainFunctions;
function mapObject(value, fn) {
    if (Array.isArray(value)) {
        return value.map(function (item) { return mapObject(item, fn); });
    }
    if (isObject(value)) {
        var tmpValue_1 = tslib_1.__assign({}, value);
        Object.keys(tmpValue_1).forEach(function (key) {
            tmpValue_1[key] = mapObject(tmpValue_1[key], fn);
        });
        return tmpValue_1;
    }
    return fn(value);
}
exports.mapObject = mapObject;
//# sourceMappingURL=./utils/helper.js.map
