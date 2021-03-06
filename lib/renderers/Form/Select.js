"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Options_1 = require("./Options");
var Select_1 = tslib_1.__importDefault(require("../../components/Select"));
var find = require("lodash/find");
var debouce = require("lodash/debounce");
var api_1 = require("../../utils/api");
var helper_1 = require("../../utils/helper");
var tpl_builtin_1 = require("../../utils/tpl-builtin");
var SelectControl = /** @class */ (function (_super) {
    tslib_1.__extends(SelectControl, _super);
    function SelectControl(props) {
        var _this = _super.call(this, props) || this;
        _this.cache = {};
        _this.changeValue = _this.changeValue.bind(_this);
        _this.loadRemote = debouce(_this.loadRemote.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        _this.inputRef = _this.inputRef.bind(_this);
        return _this;
    }
    SelectControl.prototype.inputRef = function (ref) {
        this.input = ref;
    };
    SelectControl.prototype.foucs = function () {
        this.input && this.input.focus();
    };
    SelectControl.prototype.changeValue = function (value) {
        var _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, multiple = _a.multiple, type = _a.type, valueField = _a.valueField, onChange = _a.onChange, setOptions = _a.setOptions, options = _a.options, autoFill = _a.autoFill, onBulkChange = _a.onBulkChange;
        var newValue = value;
        var additonalOptions = [];
        (Array.isArray(value) ? value : value ? [value] : []).forEach(function (option) {
            var resolved = find(options, function (item) {
                return item[valueField || 'value'] == option[valueField || 'value'];
            });
            resolved || additonalOptions.push(option);
        });
        if (joinValues) {
            if (multiple) {
                newValue = Array.isArray(value)
                    ? value
                        .map(function (item) { return item[valueField || 'value']; })
                        .join(delimiter)
                    : value
                        ? value[valueField || 'value']
                        : '';
            }
            else {
                newValue = newValue ? newValue[valueField || 'value'] : '';
            }
        }
        else if (extractValue) {
            if (multiple) {
                newValue = Array.isArray(value)
                    ? value.map(function (item) { return item[valueField || 'value']; })
                    : value
                        ? [value[valueField || 'value']]
                        : [''];
            }
            else {
                newValue = newValue ? newValue[valueField || 'value'] : '';
            }
        }
        // 不设置没法回显
        additonalOptions.length && setOptions(options.concat(additonalOptions));
        var sendTo = !multiple &&
            autoFill &&
            !helper_1.isEmpty(autoFill) &&
            tpl_builtin_1.dataMapping(autoFill, value);
        sendTo && onBulkChange(sendTo);
        onChange(newValue);
    };
    SelectControl.prototype.loadRemote = function (input) {
        var _this = this;
        var _a = this.props, autoComplete = _a.autoComplete, env = _a.env, data = _a.data, setOptions = _a.setOptions, setLoading = _a.setLoading;
        if (!env || !env.fetcher) {
            throw new Error('fetcher is required');
        }
        if (this.cache[input] || ~input.indexOf("'") /*中文没输完 233*/) {
            var options = this.cache[input] || [];
            var combinedOptions = this.mergeOptions(options);
            setOptions(combinedOptions);
            return Promise.resolve({
                options: combinedOptions
            });
        }
        setLoading(true);
        return (api_1.isEffectiveApi(autoComplete, data) &&
            env
                .fetcher(autoComplete, helper_1.createObject(data, {
                term: input,
                value: input
            }))
                .then(function (ret) {
                var options = (ret.data && ret.data.options) || ret.data || [];
                _this.cache[input] = options;
                var combinedOptions = _this.mergeOptions(options);
                setOptions(combinedOptions);
                return Promise.resolve({
                    options: combinedOptions
                });
            })
                .finally(function () { return setLoading(false); }));
    };
    SelectControl.prototype.mergeOptions = function (options) {
        var selectedOptions = this.props.selectedOptions;
        var combinedOptions = options.concat();
        if (Array.isArray(selectedOptions) && selectedOptions.length) {
            selectedOptions.forEach(function (option) {
                if (!find(combinedOptions, function (item) { return item.value == option.value; })) {
                    combinedOptions.push(option);
                }
            });
        }
        return combinedOptions;
    };
    SelectControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    SelectControl.prototype.render = function () {
        var _a = this.props, autoComplete = _a.autoComplete, searchable = _a.searchable, options = _a.options, className = _a.className, loading = _a.loading, value = _a.value, selectedOptions = _a.selectedOptions, multi = _a.multi, multiple = _a.multiple, placeholder = _a.placeholder, id = _a.id, classPrefix = _a.classPrefix, classnames = _a.classnames, creatable = _a.creatable, inline = _a.inline, noResultsText = _a.noResultsText, render = _a.render, rest = tslib_1.__rest(_a, ["autoComplete", "searchable", "options", "className", "loading", "value", "selectedOptions", "multi", "multiple", "placeholder", "id", "classPrefix", "classnames", "creatable", "inline", "noResultsText", "render"]);
        if (noResultsText && /<\w+/.test(noResultsText)) {
            noResultsText = render('noResultText', noResultsText);
        }
        return (react_1.default.createElement("div", { className: classnames_1.default(classPrefix + "SelectControl", className) },
            react_1.default.createElement(Select_1.default, tslib_1.__assign({}, rest, { placeholder: placeholder, multiple: multiple || multi, ref: this.inputRef, value: selectedOptions, options: options, loadOptions: api_1.isEffectiveApi(autoComplete) ? this.loadRemote : undefined, creatable: creatable, searchable: searchable || !!autoComplete, onChange: this.changeValue, loading: loading, noResultsText: noResultsText }))));
    };
    SelectControl.defaultProps = {
        clearable: false,
        searchable: false
    };
    return SelectControl;
}(react_1.default.Component));
exports.default = SelectControl;
var SelectControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(SelectControlRenderer, _super);
    function SelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'select'
        })
    ], SelectControlRenderer);
    return SelectControlRenderer;
}(SelectControl));
exports.SelectControlRenderer = SelectControlRenderer;
var MultiSelectControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MultiSelectControlRenderer, _super);
    function MultiSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiSelectControlRenderer.defaultProps = {
        multiple: true
    };
    MultiSelectControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'multi-select'
        })
    ], MultiSelectControlRenderer);
    return MultiSelectControlRenderer;
}(SelectControl));
exports.MultiSelectControlRenderer = MultiSelectControlRenderer;
//# sourceMappingURL=./renderers/Form/Select.js.map
