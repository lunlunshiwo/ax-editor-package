"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var debounce = require("lodash/debounce");
var service_1 = require("./service");
var formItem_1 = require("./formItem");
exports.IFormItemStore = formItem_1.IFormItemStore;
var helper_1 = require("../utils/helper");
var isEqual = require("lodash/isEqual");
var ServerError = /** @class */ (function (_super) {
    tslib_1.__extends(ServerError, _super);
    function ServerError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'ServerError';
        return _this;
    }
    return ServerError;
}(Error));
exports.FormStore = service_1.ServiceStore.named('FormStore')
    .props({
    inited: false,
    validated: false,
    submited: false,
    submiting: false,
    validating: false,
    items: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.late(function () { return formItem_1.FormItemStore; })), []),
    canAccessSuperData: true,
    persistData: false
})
    .views(function (self) { return ({
    get loading() {
        return self.saving || self.fetching;
    },
    get errors() {
        var errors = {};
        self.items.forEach(function (item) {
            if (!item.valid) {
                errors[item.name] = Array.isArray(errors[item.name])
                    ? errors[item.name].concat(item.errors)
                    : item.errors.concat();
            }
        });
        return errors;
    },
    getValueByName: function (name) {
        return helper_1.getVariable(self.data, name, self.canAccessSuperData);
    },
    getPristineValueByName: function (name) {
        return helper_1.getVariable(self.pristine, name);
    },
    getItemById: function (id) {
        return self.items.find(function (item) { return item.id === id; });
    },
    getItemByName: function (name) {
        return self.items.find(function (item) { return item.name === name; });
    },
    getItemsByName: function (name) {
        return self.items.filter(function (item) { return item.name === name; });
    },
    get valid() {
        return self.items.every(function (item) { return item.valid; });
    },
    get isPristine() {
        return isEqual(self.pristine, self.data);
    }
}); })
    .actions(function (self) {
    function setValues(values, tag) {
        self.updateData(values, tag);
        // 同步 options
        syncOptions();
    }
    function setValueByName(name, value, isPristine, force) {
        if (isPristine === void 0) { isPristine = false; }
        if (force === void 0) { force = false; }
        // 没有变化就不跑了。
        var origin = helper_1.getVariable(self.data, name, false);
        var prev = self.data;
        var data = helper_1.cloneObject(self.data);
        if (value !== origin) {
            if (prev.__prev) {
                // 基于之前的 __prev 改
                var prevData = helper_1.cloneObject(prev.__prev);
                helper_1.setVariable(prevData, name, origin);
                Object.defineProperty(data, '__prev', {
                    value: prevData,
                    enumerable: false,
                    configurable: false,
                    writable: false
                });
            }
            else {
                Object.defineProperty(data, '__prev', {
                    value: tslib_1.__assign({}, prev),
                    enumerable: false,
                    configurable: false,
                    writable: false
                });
            }
        }
        else if (!force) {
            return;
        }
        helper_1.setVariable(data, name, value);
        if (isPristine) {
            var pristine = helper_1.cloneObject(self.pristine);
            helper_1.setVariable(pristine, name, value);
            self.pristine = pristine;
        }
        if (!data.__pristine) {
            Object.defineProperty(data, '__pristine', {
                value: self.pristine,
                enumerable: false,
                configurable: false,
                writable: false
            });
        }
        self.data = data;
        if (self.persistData) {
            setPersistData();
        }
        // 同步 options
        syncOptions();
    }
    function deleteValueByName(name) {
        var prev = self.data;
        var data = helper_1.cloneObject(self.data);
        if (prev.__prev) {
            // 基于之前的 __prev 改
            var prevData = helper_1.cloneObject(prev.__prev);
            helper_1.setVariable(prevData, name, helper_1.getVariable(prev, name));
            Object.defineProperty(data, '__prev', {
                value: prevData,
                enumerable: false,
                configurable: false,
                writable: false
            });
        }
        else {
            Object.defineProperty(data, '__prev', {
                value: tslib_1.__assign({}, prev),
                enumerable: false,
                configurable: false,
                writable: false
            });
        }
        helper_1.deleteVariable(data, name);
        self.data = data;
    }
    function trimValues() {
        var data = helper_1.mapObject(self.data, function (item) {
            return typeof item === 'string' ? item.trim() : item;
        });
        self.updateData(data);
    }
    function syncOptions() {
        self.items.forEach(function (item) { return item.syncOptions(); });
    }
    var saveRemote = mobx_state_tree_1.flow(function saveRemote(api, data, options) {
        var ret, json, errors_1, ret, e_1;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    options = tslib_1.__assign({ method: 'post' }, options);
                    if (!(options && options.beforeSend)) return [3 /*break*/, 3];
                    ret = options.beforeSend(data);
                    if (!(ret && ret.then)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ret];
                case 1:
                    ret = _a.sent();
                    _a.label = 2;
                case 2:
                    if (ret === false) {
                        return [2 /*return*/];
                    }
                    _a.label = 3;
                case 3:
                    self.markSaving(true);
                    return [4 /*yield*/, mobx_state_tree_1.getRoot(self).fetcher(api, data, options)];
                case 4:
                    json = _a.sent();
                    // 失败也同样 merge，如果有数据的话。
                    if (!helper_1.isEmpty(json.data) || json.ok) {
                        setValues(json.data, {
                            __saved: Date.now()
                        });
                        self.updatedAt = Date.now();
                    }
                    if (!!json.ok) return [3 /*break*/, 5];
                    // 验证错误
                    if (json.status === 422 && json.errors) {
                        errors_1 = json.errors;
                        Object.keys(errors_1).forEach(function (key) {
                            var item = self.getItemById(key);
                            if (item) {
                                item.setError(errors_1[key]);
                            }
                            else {
                                self
                                    .getItemsByName(key)
                                    .forEach(function (item) { return item.setError(errors_1[key]); });
                            }
                        });
                        self.updateMessage(json.msg || (options && options.errorMessage) || '验证错误', true);
                    }
                    else {
                        self.updateMessage(json.msg || (options && options.errorMessage), true);
                    }
                    throw new ServerError(self.msg);
                case 5:
                    if (!(options && options.onSuccess)) return [3 /*break*/, 7];
                    ret = options.onSuccess(json);
                    if (!(ret && ret.then)) return [3 /*break*/, 7];
                    return [4 /*yield*/, ret];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    self.markSaving(false);
                    self.updateMessage(json.msg || (options && options.successMessage));
                    self.msg &&
                        mobx_state_tree_1.getRoot(self).notify('success', self.msg);
                    return [2 /*return*/, json.data];
                case 8: return [3 /*break*/, 10];
                case 9:
                    e_1 = _a.sent();
                    if (mobx_state_tree_1.getRoot(self).storeType !== 'RendererStore') {
                        // 已经销毁了，不管这些数据了。
                        return [2 /*return*/];
                    }
                    self.markSaving(false);
                    // console.error(e.stack);`
                    mobx_state_tree_1.getRoot(self).notify('error', e_1.message);
                    throw e_1;
                case 10: return [2 /*return*/];
            }
        });
    });
    var submit = mobx_state_tree_1.flow(function submit(fn, hooks, failedMessage) {
        var valid, diff;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    self.submited = true;
                    self.submiting = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 5, 6]);
                    return [4 /*yield*/, validate(hooks)];
                case 2:
                    valid = _a.sent();
                    if (!valid) {
                        mobx_state_tree_1.getRoot(self).notify('error', failedMessage || '表单验证失败，请仔细检查');
                        throw new Error('验证失败');
                    }
                    if (!fn) return [3 /*break*/, 4];
                    diff = helper_1.difference(self.data, self.pristine);
                    return [4 /*yield*/, fn(helper_1.createObject(helper_1.createObject(self.data.__super, {
                            diff: diff,
                            __diff: diff,
                            pristine: self.pristine
                        }), self.data))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    self.submiting = false;
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/, self.data];
            }
        });
    });
    var validate = mobx_state_tree_1.flow(function validate(hooks, forceValidate) {
        var items, i, len, item, i, len;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    self.validating = true;
                    self.validated = true;
                    items = self.items.concat();
                    i = 0, len = items.length;
                    _a.label = 1;
                case 1:
                    if (!(i < len)) return [3 /*break*/, 4];
                    item = items[i];
                    if (!(!item.validated || forceValidate)) return [3 /*break*/, 3];
                    return [4 /*yield*/, item.validate()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(hooks && hooks.length)) return [3 /*break*/, 8];
                    i = 0, len = hooks.length;
                    _a.label = 5;
                case 5:
                    if (!(i < len)) return [3 /*break*/, 8];
                    return [4 /*yield*/, hooks[i]()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    self.validating = false;
                    return [2 /*return*/, self.valid];
            }
        });
    });
    var validateFields = mobx_state_tree_1.flow(function validateFields(fields) {
        var items, result, i, len, item, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    self.validating = true;
                    items = self.items.concat();
                    result = [];
                    i = 0, len = items.length;
                    _c.label = 1;
                case 1:
                    if (!(i < len)) return [3 /*break*/, 4];
                    item = items[i];
                    if (!~fields.indexOf(item.name)) return [3 /*break*/, 3];
                    _b = (_a = result).push;
                    return [4 /*yield*/, item.validate()];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    self.validating = false;
                    return [2 /*return*/, result.every(function (item) { return item; })];
            }
        });
    });
    function clearErrors() {
        var items = self.items.concat();
        items.forEach(function (item) { return item.reset(); });
    }
    function reset(cb, resetData) {
        if (resetData === void 0) { resetData = true; }
        if (resetData) {
            self.data = self.pristine;
        }
        // 值可能变了，重新验证一次。
        self.validated = false;
        self.submited = false;
        self.items.forEach(function (item) { return item.reset(); });
        cb && cb(self.data);
    }
    function registryItem(name, options) {
        var item;
        self.items.push({
            identifier: helper_1.guid(),
            name: name
        });
        item = self.items[self.items.length - 1];
        // 默认值可能在原型上，把他挪到当前对象上。
        setValueByName(item.name, item.value, false, false);
        options && item.config(options);
        return item;
    }
    function unRegistryItem(item) {
        mobx_state_tree_1.detach(item);
    }
    function beforeDetach() {
        // 本来是想在组件销毁的时候处理，
        // 但是 componentWillUnmout 是父级先执行，form 都销毁了 formItem 就取不到 父级就不是 combo 了。
        if (self.parentStore && self.parentStore.storeType === 'ComboStore') {
            var combo_1 = self.parentStore;
            self.items.forEach(function (item) {
                if (item.unique) {
                    combo_1.unBindUniuqueItem(item);
                }
            });
            combo_1.removeForm(self);
            combo_1.forms.forEach(function (item) {
                return item.items.forEach(function (item) { return item.unique && item.syncOptions(); });
            });
        }
        self.items.forEach(function (item) { return mobx_state_tree_1.detach(item); });
    }
    function setCanAccessSuperData(value) {
        if (value === void 0) { value = true; }
        self.canAccessSuperData = value;
    }
    function setInited(value) {
        self.inited = value;
    }
    var setPersistData = debounce(function () {
        localStorage.setItem(location.pathname + self.path, JSON.stringify(self.data));
    }, 250);
    function getPersistData() {
        self.persistData = true;
        var data = localStorage.getItem(location.pathname + self.path);
        if (data) {
            self.updateData(JSON.parse(data));
        }
    }
    function clearPersistData() {
        localStorage.removeItem(location.pathname + self.path);
    }
    return {
        setInited: setInited,
        setValues: setValues,
        setValueByName: setValueByName,
        trimValues: trimValues,
        submit: submit,
        validate: validate,
        validateFields: validateFields,
        clearErrors: clearErrors,
        saveRemote: saveRemote,
        reset: reset,
        registryItem: registryItem,
        unRegistryItem: unRegistryItem,
        beforeDetach: beforeDetach,
        syncOptions: syncOptions,
        setCanAccessSuperData: setCanAccessSuperData,
        deleteValueByName: deleteValueByName,
        getPersistData: getPersistData,
        setPersistData: setPersistData,
        clearPersistData: clearPersistData
    };
});
//# sourceMappingURL=./store/form.js.map
