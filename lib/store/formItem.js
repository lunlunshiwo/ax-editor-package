"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var validations_1 = require("../utils/validations");
var combo_1 = require("./combo");
var tpl_1 = require("../utils/tpl");
var findIndex = require("lodash/findIndex");
var helper_1 = require("../utils/helper");
var helper_2 = require("../utils/helper");
var Select_1 = require("../components/Select");
var find = require("lodash/find");
var SimpleMap_1 = require("../utils/SimpleMap");
var ErrorDetail = mobx_state_tree_1.types.model('ErrorDetail', {
    msg: '',
    tag: ''
});
exports.FormItemStore = mobx_state_tree_1.types
    .model('FormItemStore', {
    identifier: mobx_state_tree_1.types.identifier,
    isFocused: false,
    type: '',
    unique: false,
    loading: false,
    required: false,
    rules: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
    messages: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
    errorData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(ErrorDetail), []),
    name: mobx_state_tree_1.types.string,
    id: '',
    unsetValueOnInvisible: false,
    validated: false,
    validating: false,
    multiple: false,
    delimiter: ',',
    valueField: 'value',
    labelField: 'label',
    joinValues: true,
    extractValue: false,
    options: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
    expressionsInOptions: false,
    selectedOptions: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), []),
    filteredOptions: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), []),
    dialogSchema: mobx_state_tree_1.types.frozen(),
    dialogOpen: false,
    dialogData: mobx_state_tree_1.types.frozen()
})
    .views(function (self) {
    function getForm() {
        return mobx_state_tree_1.getParent(self, 2);
    }
    function getValue() {
        return getForm().getValueByName(self.name);
    }
    function getLastOptionValue() {
        if (self.selectedOptions.length) {
            return self.selectedOptions[self.selectedOptions.length - 1].value;
        }
        return '';
    }
    function getErrors() {
        return self.errorData.map(function (item) { return item.msg; });
    }
    return {
        get form() {
            return getForm();
        },
        get value() {
            return getValue();
        },
        get prinstine() {
            return mobx_state_tree_1.getParent(self, 2).getPristineValueByName(self.name);
        },
        get errors() {
            return getErrors();
        },
        get valid() {
            var errors = getErrors();
            return !!(!errors || !errors.length);
        },
        get lastSelectValue() {
            return getLastOptionValue();
        },
        getSelectedOptions: function (value) {
            var _a;
            if (value === void 0) { value = getValue(); }
            if (value === getValue()) {
                return self.selectedOptions;
            }
            else if (typeof value === 'undefined') {
                return [];
            }
            var selected = Array.isArray(value)
                ? value.map(function (item) {
                    return item && item.hasOwnProperty(self.valueField || 'value')
                        ? item[self.valueField || 'value']
                        : item;
                })
                : typeof value === 'string'
                    ? value.split(self.delimiter || ',')
                    : [
                        value && value.hasOwnProperty(self.valueField || 'value')
                            ? value[self.valueField || 'value']
                            : value
                    ];
            if (value && value.hasOwnProperty(self.labelField || 'label')) {
                selected[0] = (_a = {},
                    _a[self.labelField || 'label'] = value[self.labelField || 'label'],
                    _a[self.valueField || 'value'] = value[self.valueField || 'value'],
                    _a);
            }
            var selectedOptions = [];
            self.filteredOptions.forEach(function (item) {
                var idx = findIndex(selected, function (seleced) {
                    return helper_1.isObject(seleced)
                        ? seleced === item[self.valueField || 'value']
                        : String(item[self.valueField || 'value']) === String(seleced);
                });
                if (~idx) {
                    selected.splice(idx, 1);
                    selectedOptions.push(item);
                }
            });
            selected.forEach(function (item, index) {
                var _a;
                var unMatched = (value && value[index]) || item;
                if (unMatched &&
                    (typeof unMatched === 'string' || typeof unMatched === 'number')) {
                    unMatched = (_a = {},
                        _a[self.valueField || 'value'] = item,
                        _a[self.labelField || 'label'] = item,
                        _a);
                }
                unMatched && selectedOptions.push(unMatched);
            });
            return selectedOptions;
        }
    };
})
    .actions(function (self) {
    var form = self.form;
    var dialogCallbacks = new SimpleMap_1.SimpleMap();
    function config(_a) {
        var required = _a.required, unique = _a.unique, value = _a.value, rules = _a.rules, messages = _a.messages, delimiter = _a.delimiter, multiple = _a.multiple, valueField = _a.valueField, labelField = _a.labelField, joinValues = _a.joinValues, extractValue = _a.extractValue, type = _a.type, id = _a.id;
        if (typeof rules === 'string') {
            rules = validations_1.str2rules(rules);
        }
        typeof type !== 'undefined' && (self.type = type);
        typeof id !== 'undefined' && (self.id = id);
        typeof messages !== 'undefined' && (self.messages = messages);
        typeof required !== 'undefined' && (self.required = !!required);
        typeof unique !== 'undefined' && (self.unique = !!unique);
        typeof multiple !== 'undefined' && (self.multiple = !!multiple);
        typeof joinValues !== 'undefined' && (self.joinValues = !!joinValues);
        typeof extractValue !== 'undefined' &&
            (self.extractValue = !!extractValue);
        typeof delimiter !== 'undefined' &&
            (self.delimiter = delimiter || ',');
        typeof valueField !== 'undefined' &&
            (self.valueField = valueField || 'value');
        typeof labelField !== 'undefined' &&
            (self.labelField = labelField || 'label');
        if (self.required) {
            rules = rules || {};
            rules = tslib_1.__assign(tslib_1.__assign({}, rules), { isRequired: true });
        }
        rules && (self.rules = rules);
        if (value !== void 0 && self.value === void 0) {
            form.setValueByName(self.name, value, true);
        }
    }
    function focus() {
        self.isFocused = true;
    }
    function blur() {
        self.isFocused = false;
    }
    function changeValue(value, isPrintine) {
        if (isPrintine === void 0) { isPrintine = false; }
        if (typeof value === 'undefined' || value === '__undefined') {
            self.form.deleteValueByName(self.name);
        }
        else {
            self.form.setValueByName(self.name, value, isPrintine);
        }
    }
    var validate = mobx_state_tree_1.flow(function validate(hook) {
        var combo, group;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (self.validating) {
                        return [2 /*return*/, self.valid];
                    }
                    self.validating = true;
                    clearError();
                    if (!hook) return [3 /*break*/, 2];
                    return [4 /*yield*/, hook()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    addError(validations_1.validate(self.value, self.form.data, self.rules, self.messages));
                    self.validated = true;
                    if (self.unique &&
                        self.form.parentStore &&
                        self.form.parentStore.storeType === 'ComboStore') {
                        combo = self.form.parentStore;
                        group = combo.uniques.get(self.name);
                        if (group.items.some(function (item) { return item !== self && self.value && item.value === self.value; })) {
                            addError("\u5F53\u524D\u503C\u4E0D\u552F\u4E00");
                        }
                    }
                    self.validating = false;
                    return [2 /*return*/, self.valid];
            }
        });
    });
    function setError(msg, tag) {
        if (tag === void 0) { tag = 'bultin'; }
        clearError();
        addError(msg, tag);
    }
    function addError(msg, tag) {
        if (tag === void 0) { tag = 'bultin'; }
        var msgs = Array.isArray(msg) ? msg : [msg];
        msgs.forEach(function (item) {
            return self.errorData.push({
                msg: item,
                tag: tag
            });
        });
    }
    function clearError(tag) {
        if (tag) {
            var filtered = self.errorData.filter(function (item) { return item.tag !== tag; });
            self.errorData.replace(filtered);
        }
        else {
            self.errorData.clear();
        }
    }
    function setOptions(options) {
        if (!Array.isArray(options)) {
            return;
        }
        options = options.filter(function (item) { return item; });
        var originOptions = self.options.concat();
        options.length ? self.options.replace(options) : self.options.clear();
        syncOptions(originOptions);
    }
    var loadCancel = null;
    var loadOptions = mobx_state_tree_1.flow(function getInitData(api, data, options, clearValue, onChange) {
        var json, options_1, e_1, root;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (loadCancel) {
                        loadCancel();
                        loadCancel = null;
                        self.loading = false;
                    }
                    self.loading = true;
                    return [4 /*yield*/, mobx_state_tree_1.getRoot(self).fetcher(api, data, tslib_1.__assign({ autoAppend: false, cancelExecutor: function (executor) { return (loadCancel = executor); } }, options))];
                case 1:
                    json = _a.sent();
                    loadCancel = null;
                    if (!json.ok) {
                        setError("\u52A0\u8F7D\u9009\u9879\u5931\u8D25\uFF0C\u539F\u56E0\uFF1A" + (json.msg ||
                            (options && options.errorMessage)));
                        mobx_state_tree_1.getRoot(self).notify('error', self.errors.join(''));
                    }
                    else {
                        clearError();
                        self.validated = false; // 拉完数据应该需要再校验一下
                        options_1 = json.data.options ||
                            json.data.items ||
                            json.data.rows ||
                            json.data ||
                            [];
                        options_1 = Select_1.normalizeOptions(options_1);
                        setOptions(options_1);
                        if (json.data && typeof json.data.value !== 'undefined') {
                            onChange && onChange(json.data.value);
                        }
                        else if (clearValue) {
                            self.selectedOptions.some(function (item) { return item.__unmatched; }) &&
                                onChange &&
                                onChange('');
                        }
                    }
                    self.loading = false;
                    return [2 /*return*/, json];
                case 2:
                    e_1 = _a.sent();
                    root = mobx_state_tree_1.getRoot(self);
                    if (root.storeType !== 'RendererStore') {
                        // 已经销毁了，不管这些数据了。
                        return [2 /*return*/];
                    }
                    self.loading = false;
                    if (root.isCancel(e_1)) {
                        return [2 /*return*/];
                    }
                    console.error(e_1.stack);
                    mobx_state_tree_1.getRoot(self) &&
                        mobx_state_tree_1.getRoot(self).notify('error', e_1.message);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
    function syncOptions(originOptions) {
        var _a;
        if (!self.options.length && typeof self.value === 'undefined') {
            self.selectedOptions = [];
            self.filteredOptions = [];
            return;
        }
        var form = self.form;
        var value = self.value;
        var selected = Array.isArray(value)
            ? value.map(function (item) {
                return item && item.hasOwnProperty(self.valueField || 'value')
                    ? item[self.valueField || 'value']
                    : item;
            })
            : typeof value === 'string'
                ? value.split(self.delimiter || ',')
                : value === void 0
                    ? []
                    : [
                        value && value.hasOwnProperty(self.valueField || 'value')
                            ? value[self.valueField || 'value']
                            : value
                    ];
        if (value && value.hasOwnProperty(self.labelField || 'label')) {
            selected[0] = (_a = {},
                _a[self.labelField || 'label'] = value[self.labelField || 'label'],
                _a[self.valueField || 'value'] = value[self.valueField || 'value'],
                _a);
        }
        var expressionsInOptions = false;
        var filteredOptions = self.options
            .filter(function (item) {
            if (!expressionsInOptions && (item.visibleOn || item.hiddenOn)) {
                expressionsInOptions = true;
            }
            return item.visibleOn
                ? tpl_1.evalExpression(item.visibleOn, form.data) !== false
                : item.hiddenOn
                    ? tpl_1.evalExpression(item.hiddenOn, form.data) !== true
                    : item.visible !== false || item.hidden !== true;
        })
            .map(function (item, index) {
            var disabled = tpl_1.evalExpression(item.disabledOn, form.data);
            var newItem = item.disabledOn
                ? self.filteredOptions.length > index &&
                    self.filteredOptions[index].disabled === disabled
                    ? self.filteredOptions[index]
                    : tslib_1.__assign(tslib_1.__assign({}, item), { disabled: disabled })
                : item;
            return newItem;
        });
        self.expressionsInOptions = expressionsInOptions;
        var flattened = helper_2.flattenTree(filteredOptions);
        var selectedOptions = [];
        selected.forEach(function (item, index) {
            var _a;
            var idx = findIndex(flattened, function (target) {
                return helper_1.isObject(item)
                    ? item === target[self.valueField || 'value']
                    : String(target[self.valueField || 'value']) === String(item);
            });
            if (~idx) {
                selectedOptions.push(flattened[idx]);
            }
            else {
                var unMatched = (value && value[index]) || item;
                if (unMatched &&
                    (typeof unMatched === 'string' || typeof unMatched === 'number')) {
                    unMatched = (_a = {},
                        _a[self.valueField || 'value'] = item,
                        _a[self.labelField || 'label'] = item,
                        _a['__unmatched'] = true,
                        _a);
                    var orgin = originOptions &&
                        find(originOptions, function (target) {
                            return String(target[self.valueField || 'value']) === String(item);
                        });
                    if (orgin) {
                        unMatched[self.labelField || 'label'] =
                            orgin[self.labelField || 'label'];
                    }
                }
                unMatched && selectedOptions.push(unMatched);
            }
        });
        var parentStore = form.parentStore;
        if (parentStore && parentStore.storeType === combo_1.ComboStore.name) {
            var combo = parentStore;
            var group = combo.uniques.get(self.name);
            var options_2 = [];
            group &&
                group.items.forEach(function (item) {
                    if (self !== item) {
                        options_2.push.apply(options_2, item.selectedOptions.map(function (item) { return item && item.value; }));
                    }
                });
            if (filteredOptions.length) {
                filteredOptions = filteredOptions.filter(function (option) { return !~options_2.indexOf(option.value); });
            }
        }
        helper_1.isArrayChilrenModified(self.selectedOptions, selectedOptions) &&
            (self.selectedOptions = selectedOptions);
        helper_1.isArrayChilrenModified(self.filteredOptions, filteredOptions) &&
            (self.filteredOptions = filteredOptions);
    }
    function setLoading(value) {
        self.loading = value;
    }
    var subStore;
    function setSubStore(store) {
        subStore = store;
    }
    function reset() {
        self.validated = false;
        if (subStore && subStore.storeType === 'ComboStore') {
            var combo = subStore;
            combo.forms.forEach(function (form) { return form.reset(); });
        }
        clearError();
    }
    function openDialog(schema, data, callback) {
        if (data === void 0) { data = form.data; }
        self.dialogSchema = schema;
        self.dialogData = data;
        self.dialogOpen = true;
        callback && dialogCallbacks.set(self.dialogData, callback);
    }
    function closeDialog(result) {
        var callback = dialogCallbacks.get(self.dialogData);
        self.dialogOpen = false;
        if (callback) {
            dialogCallbacks.delete(self.dialogData);
            setTimeout(function () { return callback(result); }, 200);
        }
    }
    return {
        focus: focus,
        blur: blur,
        config: config,
        changeValue: changeValue,
        validate: validate,
        setError: setError,
        addError: addError,
        clearError: clearError,
        setOptions: setOptions,
        loadOptions: loadOptions,
        syncOptions: syncOptions,
        setLoading: setLoading,
        setSubStore: setSubStore,
        reset: reset,
        openDialog: openDialog,
        closeDialog: closeDialog
    };
});
//# sourceMappingURL=./store/formItem.js.map
