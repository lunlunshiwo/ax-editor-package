"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Button_1 = tslib_1.__importDefault(require("../../components/Button"));
var helper_1 = require("../../utils/helper");
var api_1 = require("../../utils/api");
var tpl_1 = require("../../utils/tpl");
var omit = require("lodash/omit");
var tpl_builtin_1 = require("../../utils/tpl-builtin");
var findIndex = require("lodash/findIndex");
var FormTable = /** @class */ (function (_super) {
    tslib_1.__extends(FormTable, _super);
    function FormTable(props) {
        var _this = _super.call(this, props) || this;
        _this.entityId = 1;
        _this.subForms = {};
        _this.state = {
            columns: _this.buildColumns(props),
            editIndex: -1
        };
        _this.entries = new Map();
        _this.buildItemProps = _this.buildItemProps.bind(_this);
        _this.confirmEdit = _this.confirmEdit.bind(_this);
        _this.cancelEdit = _this.cancelEdit.bind(_this);
        _this.handleSaveTableOrder = _this.handleSaveTableOrder.bind(_this);
        _this.handleTableSave = _this.handleTableSave.bind(_this);
        _this.getEntryId = _this.getEntryId.bind(_this);
        _this.subFormRef = _this.subFormRef.bind(_this);
        return _this;
    }
    FormTable.prototype.componentWillUnmount = function () {
        this.entries.clear();
    };
    FormTable.prototype.subFormRef = function (form, x, y) {
        this.subForms[x + "-" + y] = form;
    };
    FormTable.prototype.validate = function () {
        var _this = this;
        var _a = this.props, value = _a.value, minLength = _a.minLength, maxLength = _a.maxLength;
        if (minLength && (!Array.isArray(value) || value.length < minLength)) {
            return "\u7EC4\u5408\u8868\u5355\u6210\u5458\u6570\u91CF\u4E0D\u591F\uFF0C\u4F4E\u4E8E\u6700\u5C0F\u7684\u8BBE\u5B9A" + minLength + "\u4E2A\uFF0C\u8BF7\u6DFB\u52A0\u66F4\u591A\u7684\u6210\u5458\u3002";
        }
        else if (maxLength && Array.isArray(value) && value.length > maxLength) {
            return "\u7EC4\u5408\u8868\u5355\u6210\u5458\u6570\u91CF\u8D85\u51FA\uFF0C\u8D85\u51FA\u6700\u5927\u7684\u8BBE\u5B9A" + maxLength + "\u4E2A\uFF0C\u8BF7\u5220\u9664\u591A\u4F59\u7684\u6210\u5458\u3002";
        }
        else {
            var subForms_1 = [];
            Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms_1.push(_this.subForms[key]); });
            if (subForms_1.length) {
                return Promise.all(subForms_1.map(function (item) { return item.validate(); })).then(function (values) {
                    if (~values.indexOf(false)) {
                        return '内部表单验证失败';
                    }
                    return;
                });
            }
        }
    };
    FormTable.prototype.doAction = function (action, ctx) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        var _a = this.props, onAction = _a.onAction, value = _a.value, valueField = _a.valueField, env = _a.env, onChange = _a.onChange, editable = _a.editable;
        if (action.actionType === 'add') {
            var rows_1 = Array.isArray(value) ? value.concat() : [];
            if (action.payload) {
                var toAdd = tpl_builtin_1.dataMapping(action.payload, ctx);
                toAdd = Array.isArray(toAdd) ? toAdd : [toAdd];
                toAdd.forEach(function (toAdd) {
                    var idx = findIndex(rows_1, function (item) { return item[valueField] == toAdd[valueField]; });
                    if (~idx) {
                        rows_1.splice(idx, 1);
                    }
                    rows_1.push(toAdd);
                });
                onChange(rows_1);
                if (editable) {
                    this.startEdit(rows_1.length - 1, rows_1[rows_1.length - 1], true);
                }
                // todo 如果配置新增 Api 怎么办？
                return;
            }
            else {
                return this.addItem(rows_1.length - 1);
            }
        }
        else if (action.actionType === 'remove' ||
            action.actionType === 'delete') {
            if (!valueField) {
                return env.alert('请配置 valueField');
            }
            else if (!action.payload) {
                return env.alert('action 上请配置 payload, 否则不清楚要删除哪个');
            }
            var rows_2 = Array.isArray(value) ? value.concat() : [];
            var toRemove = tpl_builtin_1.dataMapping(action.payload, ctx);
            toRemove = Array.isArray(toRemove) ? toRemove : [toRemove];
            toRemove.forEach(function (toRemove) {
                var idx = findIndex(rows_2, function (item) { return item[valueField] == toRemove[valueField]; });
                if (~idx) {
                    rows_2.splice(idx, 1);
                }
            });
            onChange(rows_2);
            // todo 如果配置删除 Api 怎么办？
            return;
        }
        return onAction && onAction.apply(void 0, tslib_1.__spreadArrays([action, ctx], rest));
    };
    FormTable.prototype.addItem = function (index, payload) {
        if (payload === void 0) { payload = this.props.scaffold; }
        var _a = this.props, value = _a.value, onChange = _a.onChange;
        var newValue = Array.isArray(value) ? value.concat() : [];
        newValue.splice(index + 1, 0, tslib_1.__assign({}, payload));
        onChange(newValue);
        index = Math.min(index + 1, newValue.length - 1);
        this.startEdit(index, newValue[index], true);
    };
    FormTable.prototype.startEdit = function (index, editting, isCreate) {
        if (isCreate === void 0) { isCreate = false; }
        var value = this.props.value;
        var scaffold = this.props.scaffold;
        this.setState({
            editIndex: index,
            editting: editting || (value && value[index]) || scaffold || {},
            isCreateMode: isCreate,
            columns: this.state.isCreateMode === isCreate
                ? this.state.columns
                : this.buildColumns(this.props, isCreate)
        });
    };
    FormTable.prototype.confirmEdit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, value, onChange, scaffold, addApi, updateApi, data, env, newValue, item, origin, isNew, remote;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, value = _a.value, onChange = _a.onChange, scaffold = _a.scaffold, addApi = _a.addApi, updateApi = _a.updateApi, data = _a.data, env = _a.env;
                        newValue = Array.isArray(value) ? value.concat() : [];
                        item = tslib_1.__assign({}, this.state.editting);
                        origin = newValue[this.state.editIndex];
                        isNew = !helper_1.isObjectShallowModified(scaffold, origin, false);
                        remote = null;
                        if (!(isNew && api_1.isEffectiveApi(addApi, helper_1.createObject(data, item)))) return [3 /*break*/, 2];
                        return [4 /*yield*/, env.fetcher(addApi, helper_1.createObject(data, item))];
                    case 1:
                        remote = _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!api_1.isEffectiveApi(updateApi, helper_1.createObject(data, item))) return [3 /*break*/, 4];
                        return [4 /*yield*/, env.fetcher(updateApi, helper_1.createObject(data, item))];
                    case 3:
                        remote = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (remote && !remote.ok) {
                            env.notify('error', remote.msg || '保存失败');
                            return [2 /*return*/];
                        }
                        else if (remote && remote.ok) {
                            item = tslib_1.__assign(tslib_1.__assign({}, item), remote.data);
                        }
                        newValue.splice(this.state.editIndex, 1, item);
                        this.setState({
                            editIndex: -1,
                            editting: null
                        });
                        onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    FormTable.prototype.cancelEdit = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange;
        if (this.state.isCreateMode) {
            var newValue = Array.isArray(value) ? value.concat() : [];
            newValue.splice(this.state.editIndex, 1);
            onChange(newValue);
        }
        this.setState({
            editIndex: -1
        });
    };
    FormTable.prototype.removeItem = function (index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, value, onChange, deleteApi, deleteConfirmText, env, data, newValue, item, ctx, confirmed, result;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, value = _a.value, onChange = _a.onChange, deleteApi = _a.deleteApi, deleteConfirmText = _a.deleteConfirmText, env = _a.env, data = _a.data;
                        newValue = Array.isArray(value) ? value.concat() : [];
                        item = newValue[index];
                        if (!item) {
                            return [2 /*return*/];
                        }
                        ctx = helper_1.createObject(data, item);
                        if (!api_1.isEffectiveApi(deleteApi, ctx)) return [3 /*break*/, 3];
                        return [4 /*yield*/, env.confirm(deleteConfirmText ? tpl_1.filter(deleteConfirmText, ctx) : '确认要删除？')];
                    case 1:
                        confirmed = _b.sent();
                        if (!confirmed) {
                            // 如果不确认，则跳过！
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, env.fetcher(deleteApi, ctx)];
                    case 2:
                        result = _b.sent();
                        if (!result.ok) {
                            env.notify('error', '删除失败');
                            return [2 /*return*/];
                        }
                        _b.label = 3;
                    case 3:
                        this.removeEntry(item);
                        newValue.splice(index, 1);
                        onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    FormTable.prototype.buildItemProps = function (item, index) {
        if (!this.props.editable) {
            return null;
        }
        return {
            quickEditEnabled: this.state.editIndex === index
        };
    };
    FormTable.prototype.buildColumns = function (props, isCreateMode) {
        var _this = this;
        if (isCreateMode === void 0) { isCreateMode = false; }
        var env = this.props.env;
        var columns = Array.isArray(props.columns)
            ? props.columns.concat()
            : [];
        var ns = this.props.classPrefix;
        var btns = [];
        if (props.addable && props.showAddBtn !== false) {
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex;
                    return ~_this.state.editIndex ? null : (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: "\u65B0\u589E\u4E00\u884C", tooltipContainer: env && env.getModalContainer
                            ? env.getModalContainer
                            : undefined, onClick: _this.addItem.bind(_this, rowIndex, undefined) },
                        props.addBtnLabel ? react_1.default.createElement("span", null, props.addBtnLabel) : null,
                        props.addBtnIcon ? react_1.default.createElement("i", { className: props.addBtnIcon }) : null));
                }
            });
        }
        if (props.editable) {
            columns = columns.map(function (column) {
                var quickEdit = !isCreateMode && column.hasOwnProperty('quickEditOnUpdate')
                    ? column.quickEditOnUpdate
                    : column.quickEdit;
                return quickEdit === false
                    ? omit(column, ['quickEdit'])
                    : tslib_1.__assign(tslib_1.__assign({}, column), { quickEdit: tslib_1.__assign(tslib_1.__assign({ type: 'text' }, quickEdit), { saveImmediately: true, mode: 'inline' }) });
            });
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex, data = _a.data;
                    return ~_this.state.editIndex || (data && data.__isPlaceholder) ? null : (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: "\u7F16\u8F91\u5F53\u524D\u884C", tooltipContainer: env && env.getModalContainer
                            ? env.getModalContainer
                            : undefined, onClick: function () { return _this.startEdit(rowIndex); } },
                        props.updateBtnLabel ? (react_1.default.createElement("span", null, props.updateBtnLabel)) : null,
                        props.updateBtnIcon ? (react_1.default.createElement("i", { className: props.updateBtnIcon })) : null));
                }
            });
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex;
                    return _this.state.editIndex === rowIndex ? (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: "\u4FDD\u5B58", tooltipContainer: env && env.getModalContainer
                            ? env.getModalContainer
                            : undefined, onClick: _this.confirmEdit },
                        props.confirmBtnLabel ? (react_1.default.createElement("span", null, props.confirmBtnLabel)) : null,
                        props.confirmBtnIcon ? (react_1.default.createElement("i", { className: props.confirmBtnIcon })) : null)) : null;
                }
            });
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex;
                    return _this.state.editIndex === rowIndex ? (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: "\u53D6\u6D88", tooltipContainer: env && env.getModalContainer
                            ? env.getModalContainer
                            : undefined, onClick: _this.cancelEdit },
                        props.cancelBtnLabel ? (react_1.default.createElement("span", null, props.cancelBtnLabel)) : null,
                        props.cancelBtnIcon ? (react_1.default.createElement("i", { className: props.cancelBtnIcon })) : null)) : null;
                }
            });
        }
        if (props.removable) {
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex, data = _a.data;
                    return ~_this.state.editIndex || (data && data.__isPlaceholder) ? null : (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: "\u5220\u9664\u5F53\u524D\u884C", tooltipContainer: env && env.getModalContainer
                            ? env.getModalContainer
                            : undefined, onClick: _this.removeItem.bind(_this, rowIndex) },
                        props.deleteBtnLabel ? (react_1.default.createElement("span", null, props.deleteBtnLabel)) : null,
                        props.deleteBtnIcon ? (react_1.default.createElement("i", { className: props.deleteBtnIcon })) : null));
                }
            });
        }
        if (btns.length) {
            columns.push({
                type: 'operation',
                buttons: btns,
                width: 100,
                label: '操作'
            });
        }
        return columns;
    };
    FormTable.prototype.handleTableSave = function (rows, diff, rowIndexes) {
        var _a = this.props, onChange = _a.onChange, value = _a.value;
        var newValue = Array.isArray(value) ? value.concat() : [];
        if (~this.state.editIndex) {
            this.setState({
                editting: tslib_1.__assign({}, rows)
            });
            return;
        }
        else if (Array.isArray(rows)) {
            rowIndexes.forEach(function (rowIndex, index) {
                var data = tslib_1.__assign(tslib_1.__assign({}, newValue.splice(rowIndex, 1)[0]), diff[index]);
                newValue.splice(rowIndex, 0, data);
            });
        }
        else {
            var idx = rowIndexes;
            var origin = newValue[idx];
            var data = tslib_1.__assign(tslib_1.__assign({}, newValue.splice(idx, 1)[0]), diff);
            newValue.splice(rowIndexes, 0, data);
            this.entries.set(data, this.entries.get(origin) || this.entityId++);
            this.entries.delete(origin);
        }
        onChange(newValue);
    };
    FormTable.prototype.handleSaveTableOrder = function (moved, rows) {
        var onChange = this.props.onChange;
        onChange(rows.map(function (item) { return (tslib_1.__assign({}, item)); }));
    };
    FormTable.prototype.removeEntry = function (entry) {
        if (this.entries.has(entry)) {
            this.entries.delete(entry);
        }
    };
    FormTable.prototype.getEntryId = function (entry) {
        if (entry === this.state.editting) {
            return 'editing';
        }
        else if (!this.entries.has(entry)) {
            this.entries.set(entry, this.entityId++);
        }
        return String(this.entries.get(entry));
    };
    FormTable.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, value = _a.value, showAddBtn = _a.showAddBtn, disabled = _a.disabled, render = _a.render, placeholder = _a.placeholder, draggable = _a.draggable, addable = _a.addable, columnsTogglable = _a.columnsTogglable;
        return (react_1.default.createElement("div", { className: classnames_1.default('form-control-table', className) }, render('body', {
            type: 'table',
            placeholder: placeholder,
            disabled: disabled,
            columns: this.state.columns,
            affixHeader: false
        }, {
            value: undefined,
            draggable: draggable && !~this.state.editIndex,
            items: (Array.isArray(value) && value.length
                ? value
                : addable && showAddBtn !== false
                    ? [{ __isPlaceholder: true }]
                    : []).map(function (value, index) {
                return index === _this.state.editIndex ? _this.state.editting : value;
            }),
            getEntryId: this.getEntryId,
            onSave: this.handleTableSave,
            onSaveOrder: this.handleSaveTableOrder,
            buildItemProps: this.buildItemProps,
            quickEditFormRef: this.subFormRef,
            columnsTogglable: columnsTogglable
        })));
    };
    FormTable.defaultProps = {
        placeholder: '空',
        scaffold: {},
        addBtnIcon: 'fa fa-plus',
        updateBtnIcon: 'fa fa-pencil',
        deleteBtnIcon: 'fa fa-minus',
        confirmBtnIcon: 'fa fa-check',
        cancelBtnIcon: 'fa fa-times',
        valueField: ''
    };
    FormTable.propsList = [
        'onChange',
        'name',
        'columns',
        'label',
        'scaffold',
        'showAddBtn',
        'addable',
        'removable',
        'editable',
        'addApi',
        'updateApi',
        'deleteApi'
    ];
    return FormTable;
}(react_1.default.Component));
exports.default = FormTable;
var TableControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TableControlRenderer, _super);
    function TableControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            test: /(^|\/)form(?:\/.+)?\/control\/table$/,
            name: 'table-control'
        })
    ], TableControlRenderer);
    return TableControlRenderer;
}(FormTable));
exports.TableControlRenderer = TableControlRenderer;
//# sourceMappingURL=./renderers/Form/Table.js.map
