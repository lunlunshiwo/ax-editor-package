"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var service_1 = require("./service");
var helper_1 = require("../utils/helper");
var pick = require("lodash/pick");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var ServerError = /** @class */ (function (_super) {
    tslib_1.__extends(ServerError, _super);
    function ServerError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'ServerError';
        return _this;
    }
    return ServerError;
}(Error));
exports.CRUDStore = service_1.ServiceStore.named('CRUDStore')
    .props({
    pristineQuery: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
    query: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
    prevPage: 1,
    page: 1,
    perPage: 10,
    total: 0,
    mode: 'normal',
    hasNext: false,
    selectedAction: mobx_state_tree_1.types.frozen(),
    items: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
    selectedItems: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
    unSelectedItems: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
    filterTogggable: false,
    filterVisible: true,
    hasInnerModalOpen: false
})
    .views(function (self) { return ({
    get lastPage() {
        return Math.max(Math.ceil(self.total / (self.perPage < 1 ? 10 : self.perPage)), 1);
    },
    get filterData() {
        return helper_1.createObject(self.data, tslib_1.__assign({}, self.query));
    },
    get mergedData() {
        return helper_1.extendObject(self.data, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, self.query), self.data), { selectedItems: self.selectedItems, unSelectedItems: self.unSelectedItems }));
    },
    get hasModalOpened() {
        return self.dialogOpen || self.drawerOpen || self.hasInnerModalOpen;
    },
    get selectedItemsAsArray() {
        return self.selectedItems.concat();
    }
}); })
    .actions(function (self) {
    var fetchCancel = null;
    function setPristineQuery() {
        self.pristineQuery = self.query;
    }
    function updateQuery(values, updater, pageField, perPageField, replace) {
        if (pageField === void 0) { pageField = 'page'; }
        if (perPageField === void 0) { perPageField = 'perPage'; }
        if (replace === void 0) { replace = false; }
        var originQuery = self.query;
        self.query = replace
            ? tslib_1.__assign({}, values) : tslib_1.__assign(tslib_1.__assign({}, self.query), values);
        if (self.query[pageField || 'page']) {
            self.page = parseInt(self.query[pageField || 'page'], 10);
        }
        if (self.query[perPageField || 'perPage']) {
            self.perPage = parseInt(self.query[perPageField || 'perPage'], 10);
        }
        updater &&
            helper_1.isObjectShallowModified(originQuery, self.query, false) &&
            setTimeout(function () { return updater("?" + helper_1.qsstringify(self.query)); }, 4);
    }
    var fetchInitData = mobx_state_tree_1.flow(function getInitData(api, data, options) {
        var items, dir, data_1, ctx, json, result, total, count, page, hasNext, oItems, oRows, rest, items, rowsData, data_2, dir, e_1, root;
        var _a;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (options.forceReload === false &&
                        options.loadDataOnce &&
                        self.total) {
                        items = options.source
                            ? tpl_builtin_1.resolveVariableAndFilter(options.source, helper_1.createObject(self.mergedData, {
                                items: self.data.itemsRaw,
                                rows: self.data.itemsRaw
                            }), '| raw')
                            : self.items.concat();
                        if (self.query.orderBy) {
                            dir = /desc/i.test(self.query.orderDir) ? -1 : 1;
                            items = helper_1.sortArray(items, self.query.orderBy, dir);
                        }
                        data_1 = tslib_1.__assign(tslib_1.__assign({}, self.data), { total: items.length, items: items.slice((self.page - 1) * self.perPage, self.page * self.perPage) });
                        self.total = parseInt(data_1.total || data_1.count, 10) || 0;
                        self.reInitData(data_1);
                        return [2 /*return*/];
                    }
                    if (fetchCancel) {
                        fetchCancel();
                        fetchCancel = null;
                        self.fetching = false;
                    }
                    options.silent || self.markFetching(true);
                    ctx = helper_1.createObject(self.data, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, self.query), (_a = {}, _a[options.pageField || 'page'] = self.page, _a[options.perPageField || 'perPage'] = self.perPage, _a)), data));
                    // 一次性加载不要发送 perPage 属性
                    if (options.loadDataOnce) {
                        delete ctx[options.perPageField || 'perPage'];
                    }
                    return [4 /*yield*/, mobx_state_tree_1.getRoot(self).fetcher(api, ctx, tslib_1.__assign(tslib_1.__assign({}, options), { cancelExecutor: function (executor) { return (fetchCancel = executor); } }))];
                case 1:
                    json = _b.sent();
                    fetchCancel = null;
                    if (!json.ok) {
                        self.updateMessage(json.msg || options.errorMessage || '获取失败', true);
                        mobx_state_tree_1.getRoot(self).notify('error', json.msg);
                    }
                    else {
                        if (!json.data) {
                            throw new Error('返回数据格式不正确，payload.data 没有数据');
                        }
                        self.updatedAt = Date.now();
                        result = json.data;
                        if (Array.isArray(result)) {
                            result = {
                                items: result
                            };
                        }
                        total = result.total, count = result.count, page = result.page, hasNext = result.hasNext, oItems = result.items, oRows = result.rows, rest = tslib_1.__rest(result, ["total", "count", "page", "hasNext", "items", "rows"]);
                        items = void 0;
                        if (options.source) {
                            items = tpl_builtin_1.resolveVariableAndFilter(options.source, helper_1.createObject(self.filterData, result), '| raw');
                        }
                        else {
                            items = result.items || result.rows;
                        }
                        if (!Array.isArray(items)) {
                            throw new Error('返回数据格式不正确，payload.data.items 必须是数组');
                        }
                        else {
                            // 确保成员是对象。
                            items.map(function (item) {
                                return typeof item === 'string' ? { text: item } : item;
                            });
                        }
                        rowsData = [];
                        if (options.loadDataMode && Array.isArray(self.data.items)) {
                            rowsData = self.data.items.concat(items);
                        }
                        else {
                            // 第一次的时候就是直接加载请求的数据
                            rowsData = items;
                        }
                        data_2 = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, self.pristine), { items: rowsData, count: count, total: total }), rest);
                        if (options.loadDataOnce) {
                            // 记录原始集合，后续可能基于原始数据做排序查找。
                            data_2.itemsRaw = oItems || oRows;
                            if (self.query.orderBy) {
                                dir = /desc/i.test(self.query.orderDir) ? -1 : 1;
                                rowsData = helper_1.sortArray(rowsData, self.query.orderBy, dir);
                            }
                            data_2.items = rowsData.slice((self.page - 1) * self.perPage, self.page * self.perPage);
                            data_2.count = data_2.total = rowsData.length;
                        }
                        self.items.replace(rowsData);
                        self.reInitData(data_2);
                        options.syncResponse2Query !== false &&
                            updateQuery(pick(rest, Object.keys(self.query)), undefined, options.pageField || 'page', options.perPageField || 'perPage');
                        self.total = parseInt(data_2.total || data_2.count, 10) || 0;
                        typeof page !== 'undefined' && (self.page = parseInt(page, 10));
                        // 分页情况不清楚，只能知道有没有下一页。
                        if (typeof hasNext !== 'undefined') {
                            self.mode = 'simple';
                            self.total = 0;
                            self.hasNext = !!hasNext;
                        }
                        self.updateMessage(json.msg || options.successMessage);
                        // 配置了获取成功提示后提示，默认是空不会提示。
                        options &&
                            options.successMessage &&
                            mobx_state_tree_1.getRoot(self).notify('success', self.msg);
                    }
                    self.markFetching(false);
                    return [2 /*return*/, json];
                case 2:
                    e_1 = _b.sent();
                    root = mobx_state_tree_1.getRoot(self);
                    if (root.storeType !== 'RendererStore') {
                        // 已经销毁了，不管这些数据了。
                        return [2 /*return*/];
                    }
                    self.markFetching(false);
                    if (root.isCancel(e_1)) {
                        return [2 /*return*/];
                    }
                    console.error(e_1.stack);
                    root.notify('error', e_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
    function changePage(page, perPage) {
        self.page = page;
        perPage && (self.perPage = perPage);
    }
    function selectAction(action) {
        self.selectedAction = action;
    }
    var saveRemote = mobx_state_tree_1.flow(function saveRemote(api, data, options) {
        var json, e_2;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    options = tslib_1.__assign({ method: 'post' }, options);
                    self.markSaving(true);
                    return [4 /*yield*/, mobx_state_tree_1.getRoot(self).fetcher(api, data, options)];
                case 1:
                    json = _a.sent();
                    self.markSaving(false);
                    if (!helper_1.isEmpty(json.data) || json.ok) {
                        self.updateData(json.data, {
                            __saved: Date.now()
                        });
                        self.updatedAt = Date.now();
                    }
                    if (!json.ok) {
                        self.updateMessage(json.msg || options.errorMessage || '保存失败', true);
                        mobx_state_tree_1.getRoot(self).notify('error', self.msg);
                        throw new ServerError(self.msg);
                    }
                    else {
                        self.updateMessage(json.msg || options.successMessage);
                        self.msg &&
                            mobx_state_tree_1.getRoot(self).notify('success', self.msg);
                    }
                    return [2 /*return*/, json.data];
                case 2:
                    e_2 = _a.sent();
                    self.markSaving(false);
                    e_2.type !== 'ServerError' &&
                        mobx_state_tree_1.getRoot(self) &&
                        mobx_state_tree_1.getRoot(self).notify('error', e_2.message);
                    throw e_2;
                case 3: return [2 /*return*/];
            }
        });
    });
    var setFilterTogglable = function (toggable, filterVisible) {
        self.filterTogggable = toggable;
        filterVisible !== void 0 && (self.filterVisible = filterVisible);
    };
    var setFilterVisible = function (visible) {
        self.filterVisible = visible;
    };
    var setSelectedItems = function (items) {
        self.selectedItems.replace(items);
    };
    var setUnSelectedItems = function (items) {
        self.unSelectedItems.replace(items);
    };
    var setInnerModalOpened = function (value) {
        self.hasInnerModalOpen = value;
    };
    var initFromScope = function (scope, source) {
        var rowsData = tpl_builtin_1.resolveVariableAndFilter(source, scope, '| raw');
        if (!Array.isArray(rowsData)) {
            return;
        }
        var data = tslib_1.__assign(tslib_1.__assign({}, self.pristine), { items: rowsData, count: 0, total: 0 });
        self.items.replace(rowsData);
        self.reInitData(data);
    };
    return {
        setPristineQuery: setPristineQuery,
        updateQuery: updateQuery,
        fetchInitData: fetchInitData,
        changePage: changePage,
        selectAction: selectAction,
        saveRemote: saveRemote,
        setFilterTogglable: setFilterTogglable,
        setFilterVisible: setFilterVisible,
        setSelectedItems: setSelectedItems,
        setUnSelectedItems: setUnSelectedItems,
        setInnerModalOpened: setInnerModalOpened,
        initFromScope: initFromScope
    };
});
//# sourceMappingURL=./store/crud.js.map
