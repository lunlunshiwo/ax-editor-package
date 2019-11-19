"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var iRenderer_1 = require("./iRenderer");
var helper_1 = require("../utils/helper");
exports.ServiceStore = iRenderer_1.iRendererStore
    .named('ServiceStore')
    .props({
    msg: '',
    error: false,
    fetching: false,
    saving: false,
    busying: false,
    checking: false,
    initializing: false,
    schema: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), null),
    schemaKey: ''
})
    .views(function (self) { return ({
    get loading() {
        return self.fetching || self.saving || self.busying || self.initializing;
    }
}); })
    .actions(function (self) {
    var fetchCancel;
    var fetchSchemaCancel;
    function markFetching(fetching) {
        if (fetching === void 0) { fetching = true; }
        self.fetching = fetching;
    }
    function markSaving(saving) {
        if (saving === void 0) { saving = true; }
        self.saving = saving;
    }
    function markBusying(busying) {
        if (busying === void 0) { busying = true; }
        self.busying = busying;
    }
    function reInitData(data) {
        var newData = helper_1.extendObject(self.pristine, data);
        self.data = self.pristine = newData;
    }
    function updateMessage(msg, error) {
        if (error === void 0) { error = false; }
        self.msg = (msg && String(msg)) || '';
        self.error = error;
    }
    function clearMessage() {
        updateMessage('');
    }
    var fetchInitData = mobx_state_tree_1.flow(function getInitData(api, data, options) {
        var json, ret, e_1, root;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (fetchCancel) {
                        fetchCancel();
                        fetchCancel = null;
                        self.fetching = false;
                    }
                    if (self.fetching) {
                        return [2 /*return*/];
                    }
                    (options && options.silent) || markFetching(true);
                    return [4 /*yield*/, mobx_state_tree_1.getRoot(self).fetcher(api, data, tslib_1.__assign(tslib_1.__assign({}, options), { cancelExecutor: function (executor) { return (fetchCancel = executor); } }))];
                case 1:
                    json = _a.sent();
                    fetchCancel = null;
                    if (!!json.ok) return [3 /*break*/, 2];
                    updateMessage(json.msg || (options && options.errorMessage), true);
                    mobx_state_tree_1.getRoot(self).notify('error', json.msg);
                    return [3 /*break*/, 5];
                case 2:
                    reInitData(tslib_1.__assign(tslib_1.__assign({}, self.data), json.data));
                    self.updatedAt = Date.now();
                    self.hasRemoteData = true;
                    if (!(options && options.onSuccess)) return [3 /*break*/, 4];
                    ret = options.onSuccess(json);
                    if (!(ret && ret.then)) return [3 /*break*/, 4];
                    return [4 /*yield*/, ret];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    updateMessage(json.msg || (options && options.successMessage));
                    // 配置了获取成功提示后提示，默认是空不会提示。
                    options &&
                        options.successMessage &&
                        mobx_state_tree_1.getRoot(self).notify('success', self.msg);
                    _a.label = 5;
                case 5:
                    markFetching(false);
                    return [2 /*return*/, json];
                case 6:
                    e_1 = _a.sent();
                    root = mobx_state_tree_1.getRoot(self);
                    if (root.storeType !== 'RendererStore') {
                        // 已经销毁了，不管这些数据了。
                        return [2 /*return*/];
                    }
                    if (root.isCancel(e_1)) {
                        return [2 /*return*/];
                    }
                    markFetching(false);
                    e_1.stack && console.error(e_1.stack);
                    root.notify('error', e_1.message || e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
    var fetchData = mobx_state_tree_1.flow(function getInitData(api, data, options) {
        var json, ret, e_2, root;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (fetchCancel) {
                        fetchCancel();
                        fetchCancel = null;
                        self.fetching = false;
                    }
                    if (self.fetching) {
                        return [2 /*return*/];
                    }
                    (options && options.silent) || markFetching(true);
                    return [4 /*yield*/, mobx_state_tree_1.getRoot(self).fetcher(api, data, tslib_1.__assign(tslib_1.__assign({}, options), { cancelExecutor: function (executor) { return (fetchCancel = executor); } }))];
                case 1:
                    json = _a.sent();
                    fetchCancel = null;
                    if (!helper_1.isEmpty(json.data) || json.ok) {
                        json.data && self.updateData(json.data);
                        self.updatedAt = Date.now();
                        self.hasRemoteData = true;
                    }
                    if (!!json.ok) return [3 /*break*/, 2];
                    updateMessage(json.msg || (options && options.errorMessage), true);
                    mobx_state_tree_1.getRoot(self).notify('error', self.msg);
                    return [3 /*break*/, 5];
                case 2:
                    if (!(options && options.onSuccess)) return [3 /*break*/, 4];
                    ret = options.onSuccess(json);
                    if (!(ret && ret.then)) return [3 /*break*/, 4];
                    return [4 /*yield*/, ret];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    updateMessage(json.msg || (options && options.successMessage));
                    // 配置了获取成功提示后提示，默认是空不会提示。
                    options &&
                        options.successMessage &&
                        mobx_state_tree_1.getRoot(self).notify('success', self.msg);
                    _a.label = 5;
                case 5:
                    markFetching(false);
                    return [2 /*return*/, json];
                case 6:
                    e_2 = _a.sent();
                    root = mobx_state_tree_1.getRoot(self);
                    if (root.storeType !== 'RendererStore') {
                        // 已经销毁了，不管这些数据了。
                        return [2 /*return*/];
                    }
                    if (root.isCancel(e_2)) {
                        return [2 /*return*/];
                    }
                    markFetching(false);
                    e_2.stack && console.error(e_2.stack);
                    root.notify('error', e_2.message || e_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
    var saveRemote = mobx_state_tree_1.flow(function saveRemote(api, data, options) {
        var json, ret, e_3;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    options = tslib_1.__assign({ method: 'post' }, options);
                    if (self.saving) {
                        return [2 /*return*/];
                    }
                    markSaving(true);
                    return [4 /*yield*/, mobx_state_tree_1.getRoot(self).fetcher(api, data, options)];
                case 1:
                    json = _a.sent();
                    if (!helper_1.isEmpty(json.data) || json.ok) {
                        json.data && self.updateData(json.data);
                        self.updatedAt = Date.now();
                    }
                    if (!!json.ok) return [3 /*break*/, 2];
                    updateMessage(json.msg || (options && options.errorMessage) || '保存失败', true);
                    throw new Error(self.msg);
                case 2:
                    if (!(options && options.onSuccess)) return [3 /*break*/, 4];
                    ret = options.onSuccess(json);
                    if (!(ret && ret.then)) return [3 /*break*/, 4];
                    return [4 /*yield*/, ret];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    updateMessage(json.msg || (options && options.successMessage));
                    self.msg &&
                        mobx_state_tree_1.getRoot(self).notify('success', self.msg);
                    _a.label = 5;
                case 5:
                    markSaving(false);
                    return [2 /*return*/, json.data];
                case 6:
                    e_3 = _a.sent();
                    self.saving = false;
                    // console.log(e.stack);
                    mobx_state_tree_1.getRoot(self).notify('error', e_3.message || e_3);
                    throw e_3;
                case 7: return [2 /*return*/];
            }
        });
    });
    var fetchSchema = mobx_state_tree_1.flow(function fetchSchema(api, data, options) {
        var json, e_4, root;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    options = tslib_1.__assign(tslib_1.__assign({ method: 'post' }, options), { cancelExecutor: function (executor) { return (fetchSchemaCancel = executor); } });
                    if (fetchSchemaCancel) {
                        fetchSchemaCancel();
                        fetchSchemaCancel = null;
                        self.initializing = false;
                    }
                    if (self.initializing) {
                        return [2 /*return*/];
                    }
                    self.initializing = true;
                    if (typeof api === 'string') {
                        api += (~api.indexOf('?') ? '&' : '?') + '_replace=1';
                    }
                    else {
                        api = tslib_1.__assign(tslib_1.__assign({}, api), { url: api.url +
                                (~api.url.indexOf('?') ? '&' : '?') +
                                '_replace=1' });
                    }
                    return [4 /*yield*/, mobx_state_tree_1.getRoot(self).fetcher(api, data, options)];
                case 1:
                    json = _a.sent();
                    fetchSchemaCancel = null;
                    if (!json.ok) {
                        updateMessage(json.msg || (options && options.errorMessage) || '获取失败，请重试', true);
                        mobx_state_tree_1.getRoot(self).notify('error', self.msg);
                    }
                    else {
                        if (json.data) {
                            self.schema = json.data;
                            self.schemaKey = '' + Date.now();
                        }
                        updateMessage(json.msg || (options && options.successMessage));
                        // 配置了获取成功提示后提示，默认是空不会提示。
                        options &&
                            options.successMessage &&
                            mobx_state_tree_1.getRoot(self).notify('success', self.msg);
                    }
                    self.initializing = false;
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    root = mobx_state_tree_1.getRoot(self);
                    if (root.storeType !== 'RendererStore') {
                        // 已经销毁了，不管这些数据了。
                        return [2 /*return*/];
                    }
                    self.initializing = false;
                    if (root.isCancel(e_4)) {
                        return [2 /*return*/];
                    }
                    e_4.stack && console.error(e_4.stack);
                    root.notify('error', e_4.message || e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
    var checkRemote = mobx_state_tree_1.flow(function checkRemote(api, data, options) {
        var json;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (self.checking) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    self.checking = true;
                    return [4 /*yield*/, mobx_state_tree_1.getRoot(self).fetcher(api, data, options)];
                case 2:
                    json = _a.sent();
                    json.ok && self.updateData(json.data);
                    if (!json.ok) {
                        throw new Error(json.msg);
                    }
                    return [2 /*return*/, json.data];
                case 3:
                    self.checking = false;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
    return {
        markFetching: markFetching,
        markSaving: markSaving,
        markBusying: markBusying,
        fetchInitData: fetchInitData,
        fetchData: fetchData,
        reInitData: reInitData,
        updateMessage: updateMessage,
        clearMessage: clearMessage,
        saveRemote: saveRemote,
        fetchSchema: fetchSchema,
        checkRemote: checkRemote
    };
});
//# sourceMappingURL=./store/service.js.map
