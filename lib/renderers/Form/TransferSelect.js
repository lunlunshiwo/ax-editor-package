"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Options_1 = require("./Options");
var lodash_1 = require("lodash");
var Checkbox_1 = tslib_1.__importDefault(require("../../components/Checkbox"));
var icons_1 = require("../../components/icons");
var components_1 = require("../../components");
var TransferSelect = /** @class */ (function (_super) {
    tslib_1.__extends(TransferSelect, _super);
    function TransferSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            filteredOptions: [],
            keyword: ''
        };
        _this.handleCheckAll = _this.handleCheckAll.bind(_this);
        _this.handleClear = _this.handleClear.bind(_this);
        _this.handleSearch = _this.handleSearch.bind(_this);
        return _this;
    }
    TransferSelect.prototype.componentDidMount = function () {
        var options = this.props.options;
        if (options && Array.isArray(options)) {
            this.setState({
                filteredOptions: options
            });
        }
    };
    TransferSelect.prototype.componentDidUpdate = function (prevProps) {
        var options = this.props.options;
        if (options && prevProps.options !== options) {
            this.setState({
                filteredOptions: options,
                keyword: ''
            });
        }
    };
    TransferSelect.prototype.handleCheck = function (checkedItem) {
        var _a = this.props, selectedOptions = _a.selectedOptions, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        var newValue = selectedOptions.length === 0
            ? [checkedItem]
            : lodash_1.xorBy(selectedOptions.concat(), [checkedItem], valueField || 'value');
        if (joinValues) {
            newValue = newValue
                .map(function (item) { return item[valueField || 'value']; })
                .join(delimiter || ',');
        }
        else if (extractValue) {
            newValue = newValue.map(function (item) { return item[valueField || 'value']; });
        }
        onChange(newValue);
    };
    TransferSelect.prototype.handleCheckAll = function () {
        var filteredOptions = this.state.filteredOptions;
        var _a = this.props, selectedOptions = _a.selectedOptions, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        var newValue;
        if (selectedOptions.length === filteredOptions.length) {
            newValue = '';
        }
        else {
            newValue = joinValues
                ? filteredOptions
                    .map(function (item) { return item[valueField || 'value']; })
                    .join(delimiter || '')
                : extractValue
                    ? filteredOptions.map(function (item) { return item[valueField || 'value']; })
                    : filteredOptions;
        }
        onChange(newValue);
    };
    TransferSelect.prototype.handleClear = function () {
        this.props.onChange('');
    };
    TransferSelect.prototype.handleSearch = function (e) {
        var _a = this.props, viewMode = _a.viewMode, searchField = _a.searchField, options = _a.options;
        var newOptions = [];
        var keyword = e.target.value.toLowerCase();
        if (keyword === '') {
            newOptions = options;
        }
        else {
            newOptions = options.filter(function (option) {
                return (option[viewMode === 'table' ? searchField : 'label']
                    .toLowerCase()
                    .indexOf(keyword) > -1);
            });
        }
        this.setState({
            filteredOptions: newOptions,
            keyword: keyword
        });
    };
    TransferSelect.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    TransferSelect.prototype.renderTable = function () {
        var _this = this;
        var filteredOptions = this.state.filteredOptions;
        var _a = this.props, cx = _a.classnames, ns = _a.classPrefix, selectedOptions = _a.selectedOptions, columns = _a.columns, allTitle = _a.allTitle, searchable = _a.searchable, searchPlaceholder = _a.searchPlaceholder, valueField = _a.valueField;
        return (react_1.default.createElement("div", { className: cx('TransferSelect-allOptions', 'TransferSelect-allOptions--table') },
            react_1.default.createElement("div", { className: cx('TransferSelect-heading') },
                react_1.default.createElement("span", null, allTitle + "\uFF08" + selectedOptions.length + "/" + filteredOptions.length + "\uFF09"),
                searchable ? (react_1.default.createElement("div", { className: cx('TransferSelect-searchWrapper') },
                    react_1.default.createElement("div", { className: cx('TextControl-input') },
                        react_1.default.createElement("input", { placeholder: searchPlaceholder, autoComplete: "off", value: this.state.keyword, onChange: this.handleSearch }),
                        react_1.default.createElement("i", { className: "fa fa-search" })))) : null),
            react_1.default.createElement("div", { className: cx('TransferSelect-body') },
                react_1.default.createElement("table", { className: cx('Table-table') },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", { className: cx('Table-checkCell') },
                                react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, partial: selectedOptions.length !== filteredOptions.length, checked: selectedOptions.length > 0, onChange: this.handleCheckAll })),
                            columns.map(function (column, columnIndex) { return (react_1.default.createElement("th", { key: columnIndex }, column.label)); }))),
                    react_1.default.createElement("tbody", null, filteredOptions.map(function (option, optionIndex) {
                        var _a;
                        return (react_1.default.createElement("tr", { className: cx((_a = {},
                                _a[ns + "Table-tr--odd"] = optionIndex % 2 === 0,
                                _a[ns + "Table-tr--even"] = optionIndex % 2 === 1,
                                _a)), key: optionIndex },
                            react_1.default.createElement("td", null,
                                react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, value: false, checked: lodash_1.find(selectedOptions, function (selectedOption) {
                                        return (selectedOption[valueField || 'value'] ===
                                            option[valueField || 'value']);
                                    }), onChange: _this.handleCheck.bind(_this, option) })),
                            columns.map(function (column, columnIndex) {
                                var text = option[column.name] + '';
                                return react_1.default.createElement("td", { key: columnIndex }, text);
                            })));
                    }))))));
    };
    TransferSelect.prototype.renderNormal = function () {
        var _this = this;
        var filteredOptions = this.state.filteredOptions;
        var _a = this.props, cx = _a.classnames, ns = _a.classPrefix, selectedOptions = _a.selectedOptions, allTitle = _a.allTitle, searchable = _a.searchable, searchPlaceholder = _a.searchPlaceholder, labelField = _a.labelField, valueField = _a.valueField;
        return (react_1.default.createElement("div", { className: cx('TransferSelect-allOptions', 'TransferSelect-allOptions--normal') },
            react_1.default.createElement("div", { className: cx('TransferSelect-heading') },
                react_1.default.createElement("span", null, allTitle + "\uFF08" + selectedOptions.length + "/" + filteredOptions.length + "\uFF09"),
                selectedOptions.length < filteredOptions.length ? (react_1.default.createElement("span", { onClick: this.handleCheckAll, className: cx('TransferSelect-selectAll') }, "\u5168\u90E8\u9009\u62E9")) : null),
            react_1.default.createElement("div", { className: cx('TransferSelect-body') },
                searchable ? (react_1.default.createElement("div", { className: cx('TransferSelect-searchWrapper') },
                    react_1.default.createElement("div", { className: cx('TextControl-input') },
                        react_1.default.createElement("input", { placeholder: searchPlaceholder, autoComplete: "off", onChange: this.handleSearch }),
                        react_1.default.createElement("i", { className: "fa fa-search" })))) : null,
                react_1.default.createElement("ul", null, filteredOptions.length > 0 ? (filteredOptions.map(function (option, optionIndex) { return (react_1.default.createElement("li", { key: optionIndex },
                    react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, checked: !!lodash_1.find(selectedOptions, function (selectedOption) {
                            return (selectedOption[valueField || 'value'] ===
                                option[valueField || 'value']);
                        }), onChange: _this.handleCheck.bind(_this, option) }, option[labelField || 'label']))); })) : (react_1.default.createElement("li", null, "\u6682\u65E0\u6570\u636E"))))));
    };
    TransferSelect.prototype.renderAction = function () {
        var cx = this.props.classnames;
        return (react_1.default.createElement("div", { className: cx('TransferSelect-action') },
            react_1.default.createElement("span", { className: cx('TransferSelect-actionIcon') })));
    };
    TransferSelect.prototype.renderTableSelectedOptions = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, selectedOptions = _a.selectedOptions, selectedTitle = _a.selectedTitle, labelField = _a.labelField, columns = _a.columns;
        return (react_1.default.createElement("div", { className: cx('TransferSelect-selectedOptions', 'TransferSelect-selectedOptions--table') },
            react_1.default.createElement("div", { className: cx('TransferSelect-heading') },
                react_1.default.createElement("span", null, selectedTitle + "\uFF08" + selectedOptions.length + "\uFF09"),
                selectedOptions.length > 0 ? (react_1.default.createElement("span", { onClick: this.handleClear, className: cx('TransferSelect-clearAll') }, "\u5168\u90E8\u6E05\u9664")) : null),
            react_1.default.createElement("div", { className: cx('TransferSelect-body') },
                react_1.default.createElement("table", { className: cx('Table-table') },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", null, lodash_1.find(columns, function (column) { return column.name === labelField; }).label))),
                    react_1.default.createElement("tbody", null, selectedOptions.map(function (option, optionIndex) { return (react_1.default.createElement("tr", { className: cx('Table-tr--odd'), key: optionIndex },
                        react_1.default.createElement("td", null,
                            option[labelField || 'label'],
                            react_1.default.createElement("a", { onClick: _this.handleCheck.bind(_this, option), className: cx('TransferSelect-option-close') },
                                react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))))); }))))));
    };
    TransferSelect.prototype.renderNormalSelectedOptions = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, selectedOptions = _a.selectedOptions, selectedTitle = _a.selectedTitle, labelField = _a.labelField;
        return (react_1.default.createElement("div", { className: cx('TransferSelect-selectedOptions', 'TransferSelect-selectedOptions--normal') },
            react_1.default.createElement("div", { className: cx('TransferSelect-heading') },
                react_1.default.createElement("span", null, selectedTitle + "\uFF08" + selectedOptions.length + "\uFF09"),
                selectedOptions.length > 0 ? (react_1.default.createElement("span", { onClick: this.handleClear, className: cx('TransferSelect-clearAll') }, "\u5168\u90E8\u6E05\u9664")) : null),
            react_1.default.createElement("div", { className: cx('TransferSelect-body') },
                react_1.default.createElement("ul", null, selectedOptions.map(function (option, optionIndex) { return (react_1.default.createElement("li", { key: optionIndex },
                    option[labelField || 'label'],
                    react_1.default.createElement("a", { onClick: _this.handleCheck.bind(_this, option), className: cx('TransferSelect-option-close') }, icons_1.closeIcon))); })))));
    };
    TransferSelect.prototype.render = function () {
        var _a = this.props, className = _a.className, cx = _a.classnames, render = _a.render, viewMode = _a.viewMode, loading = _a.loading;
        return (react_1.default.createElement("div", { className: cx('TransferSelectControl', className) },
            viewMode === 'table' ? this.renderTable() : this.renderNormal(),
            this.renderAction(),
            viewMode === 'table'
                ? this.renderTableSelectedOptions()
                : this.renderNormalSelectedOptions(),
            react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: loading })));
    };
    TransferSelect.defaultProps = {
        viewMode: 'normal',
        multiple: true,
        labelField: 'label',
        valueField: 'value',
        searchField: 'label',
        searchPlaceholder: '请输入关键字',
        allTitle: '全部',
        selectedTitle: '已选',
        columns: [],
        searchable: true
    };
    return TransferSelect;
}(react_1.default.Component));
exports.TransferSelect = TransferSelect;
var TransferSelectControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TransferSelectControlRenderer, _super);
    function TransferSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransferSelectControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'transfer-select'
        })
    ], TransferSelectControlRenderer);
    return TransferSelectControlRenderer;
}(TransferSelect));
exports.TransferSelectControlRenderer = TransferSelectControlRenderer;
//# sourceMappingURL=./renderers/Form/TransferSelect.js.map
