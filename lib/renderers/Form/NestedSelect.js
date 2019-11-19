"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var xorBy = require("lodash/xorBy");
var unionBy = require("lodash/unionBy");
var Overlay_1 = tslib_1.__importDefault(require("../../components/Overlay"));
var Checkbox_1 = tslib_1.__importDefault(require("../../components/Checkbox"));
var PopOver_1 = tslib_1.__importDefault(require("../../components/PopOver"));
var react_overlays_1 = require("react-overlays");
var icons_1 = require("../../components/icons");
var helper_1 = require("../../utils/helper");
var tpl_builtin_1 = require("../../utils/tpl-builtin");
var Options_1 = require("../Form/Options");
var NestedSelectControl = /** @class */ (function (_super) {
    tslib_1.__extends(NestedSelectControl, _super);
    function NestedSelectControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpened: false
        };
        return _this;
    }
    NestedSelectControl.prototype.domRef = function (ref) {
        this.target = ref;
    };
    NestedSelectControl.prototype.open = function () {
        if (!this.props.disabled) {
            this.setState({
                isOpened: true
            });
        }
    };
    NestedSelectControl.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    NestedSelectControl.prototype.renderValue = function () {
        var _a = this.props, multiple = _a.multiple, cx = _a.classnames, selectedOptions = _a.selectedOptions, labelField = _a.labelField;
        var len = Array.isArray(selectedOptions) ? selectedOptions.length : 0;
        return (react_1.default.createElement("div", { className: cx('NestedSelect-valueWrap'), onClick: this.open }, len > 0 ? (react_1.default.createElement("div", { className: cx('NestedSelect-value') }, multiple
            ? "\u5DF2\u9009\u62E9 " + len + " \u9879"
            : selectedOptions[0][labelField || 'label'])) : null));
    };
    NestedSelectControl.prototype.renderClear = function () {
        var _a = this.props, clearable = _a.clearable, value = _a.value, disabled = _a.disabled, cx = _a.classnames;
        return clearable &&
            !disabled &&
            (Array.isArray(value) ? value.length : value) ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('NestedSelect-clear') },
            react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null;
    };
    NestedSelectControl.prototype.clearValue = function () {
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        onChange(typeof resetValue === 'undefined' ? '' : resetValue);
    };
    NestedSelectControl.prototype.handleOptionClick = function (option, e) {
        var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, autoFill = _a.autoFill, onBulkChange = _a.onBulkChange;
        e.stopPropagation();
        var sendTo = !multiple &&
            autoFill &&
            !helper_1.isEmpty(autoFill) &&
            tpl_builtin_1.dataMapping(autoFill, option);
        sendTo && onBulkChange(sendTo);
        onChange(joinValues
            ? option[valueField || 'value']
            : extractValue
                ? option[valueField || 'value']
                : option);
        !multiple && this.close();
    };
    NestedSelectControl.prototype.handleCheck = function (option) {
        var _a = this.props, onChange = _a.onChange, selectedOptions = _a.selectedOptions, joinValues = _a.joinValues, valueField = _a.valueField, delimiter = _a.delimiter, extractValue = _a.extractValue, withChildren = _a.withChildren, cascade = _a.cascade;
        var items = selectedOptions.concat();
        var newValue;
        // 三种情况：
        // 1.全选，option为数组
        // 2.单个选中，且有children
        // 3.单个选中，没有children
        if (Array.isArray(option)) {
            option = withChildren ? helper_1.flattenTree(option) : option;
            newValue = items.length === option.length ? [] : option;
        }
        else if (Array.isArray(option.children)) {
            if (cascade) {
                newValue = xorBy(items, [option], valueField || 'value');
            }
            else if (withChildren) {
                option = helper_1.flattenTree([option]);
                var fn = option.every(function (opt) { return !!~items.indexOf(opt); })
                    ? xorBy
                    : unionBy;
                newValue = fn(items, option, valueField || 'value');
            }
            else {
                newValue = items.filter(function (item) { return !~helper_1.flattenTree([option]).indexOf(item); });
                !~items.indexOf(option) && newValue.push(option);
            }
        }
        else {
            newValue = xorBy(items, [option], valueField || 'value');
        }
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
    NestedSelectControl.prototype.allChecked = function (options) {
        var _this = this;
        return options.every(function (option) {
            if (option.children) {
                return _this.allChecked(option.children);
            }
            return _this.props.selectedOptions.some(function (selectedOption) { return selectedOption.value == option.value; });
        });
    };
    NestedSelectControl.prototype.partialChecked = function (options) {
        var _this = this;
        return options.some(function (option) {
            if (option.children) {
                return _this.partialChecked(option.children);
            }
            return _this.props.selectedOptions.some(function (selectedOption) { return selectedOption.value == option.value; });
        });
    };
    NestedSelectControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    NestedSelectControl.prototype.renderOptions = function (newOptions, isChildren, uncheckable) {
        var _this = this;
        var _a = this.props, multiple = _a.multiple, selectedOptions = _a.selectedOptions, cx = _a.classnames, value = _a.value, options = _a.options, disabled = _a.disabled, cascade = _a.cascade;
        if (multiple) {
            var partialChecked = this.partialChecked(options);
            var allChecked = this.allChecked(options);
            return (react_1.default.createElement("div", { className: cx({ 'NestedSelect-childrenOuter': isChildren }) },
                !isChildren ? (react_1.default.createElement("div", { className: cx('NestedSelect-option', 'checkall') },
                    react_1.default.createElement(Checkbox_1.default, { onChange: this.handleCheck.bind(this, options), checked: partialChecked, partial: partialChecked && !allChecked }, "\u5168\u9009"))) : null,
                newOptions.map(function (option, idx) {
                    var checked = selectedOptions.some(function (o) { return o.value == option.value; });
                    var selfChecked = !!uncheckable || checked;
                    var nodeDisabled = !!uncheckable || !!disabled;
                    return (react_1.default.createElement("div", { className: cx('NestedSelect-option'), key: idx },
                        react_1.default.createElement(Checkbox_1.default, { onChange: _this.handleCheck.bind(_this, option), trueValue: option.value, checked: selfChecked, disabled: nodeDisabled }, option.label),
                        option.children ? (react_1.default.createElement("div", { className: cx('NestedSelect-optionArrowRight') },
                            react_1.default.createElement(icons_1.Icon, { icon: "right-arrow", className: "icon" }))) : null,
                        option.children && option.children.length
                            ? _this.renderOptions(option.children, true, cascade ? false : uncheckable || (multiple && checked))
                            : null));
                })));
        }
        return (react_1.default.createElement("div", { className: cx({ 'NestedSelect-childrenOuter': isChildren }) }, newOptions.map(function (option, idx) { return (react_1.default.createElement("div", { key: idx, className: cx('NestedSelect-option', {
                'is-active': value && value === option.value
            }), onClick: _this.handleOptionClick.bind(_this, option) },
            react_1.default.createElement("span", null, option.label),
            option.children ? (react_1.default.createElement("div", { className: cx('NestedSelect-optionArrowRight') },
                react_1.default.createElement(icons_1.Icon, { icon: "right-arrow", className: "icon" }))) : null,
            option.children && option.children.length
                ? _this.renderOptions(option.children, true, false)
                : null)); })));
    };
    NestedSelectControl.prototype.renderOuter = function () {
        var _this = this;
        var _a = this.props, popOverContainer = _a.popOverContainer, options = _a.options, cx = _a.classnames;
        var body = (react_1.default.createElement(react_overlays_1.RootCloseWrapper, { disabled: !this.state.isOpened, onRootClose: this.close },
            react_1.default.createElement("div", { className: cx('NestedSelect-menuOuter'), style: { minWidth: this.target.offsetWidth } }, this.renderOptions(options, false, false))));
        if (popOverContainer) {
            return (react_1.default.createElement(Overlay_1.default, { container: popOverContainer, target: function () { return _this.target; }, show: true },
                react_1.default.createElement(PopOver_1.default, { className: cx('NestedSelect-popover'), style: { minWidth: this.target.offsetWidth } }, body)));
        }
        return body;
    };
    NestedSelectControl.prototype.render = function () {
        var _a = this.props, className = _a.className, disabled = _a.disabled, placeholder = _a.placeholder, selectedOptions = _a.selectedOptions, cx = _a.classnames;
        return (react_1.default.createElement("div", { className: cx('NestedSelectControl') },
            react_1.default.createElement("div", { className: cx('NestedSelect', {
                    'is-opened': this.state.isOpened,
                    'is-disabled': disabled
                }, className), onClick: this.open, ref: this.domRef },
                !(selectedOptions && selectedOptions.length > 0) ? (react_1.default.createElement("div", { className: cx('NestedSelect-placeholder') }, placeholder)) : null,
                this.renderValue(),
                this.renderClear(),
                react_1.default.createElement("span", { className: cx('Select-arrow') })),
            this.state.isOpened ? this.renderOuter() : null));
    };
    NestedSelectControl.defaultProps = {
        cascade: false,
        withChildren: false
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "domRef", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "open", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "close", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "clearValue", null);
    return NestedSelectControl;
}(react_1.default.Component));
exports.default = NestedSelectControl;
var NestedSelectControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(NestedSelectControlRenderer, _super);
    function NestedSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NestedSelectControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'nested-select'
        })
    ], NestedSelectControlRenderer);
    return NestedSelectControlRenderer;
}(NestedSelectControl));
exports.NestedSelectControlRenderer = NestedSelectControlRenderer;
//# sourceMappingURL=./renderers/Form/NestedSelect.js.map
