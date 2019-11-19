"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Options_1 = require("./Options");
var Checkbox_1 = tslib_1.__importDefault(require("../../components/Checkbox"));
var chunk = require("lodash/chunk");
var CheckboxesControl = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxesControl, _super);
    function CheckboxesControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxesControl.prototype.componentDidMount = function () {
        var _a = this.props, defaultCheckAll = _a.defaultCheckAll, onToggleAll = _a.onToggleAll;
        defaultCheckAll && onToggleAll();
    };
    CheckboxesControl.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, currOptions = _a.options, onToggleAll = _a.onToggleAll, defaultCheckAll = _a.defaultCheckAll;
        var prevOptions = prevProps.options;
        if (defaultCheckAll && prevOptions != currOptions) {
            onToggleAll();
        }
    };
    CheckboxesControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    CheckboxesControl.prototype.renderGroup = function (option, index) {
        var _this = this;
        var cx = this.props.classnames;
        return (react_1.default.createElement("div", { key: index, className: cx('CheckboxesControl-group', option.className) },
            react_1.default.createElement("label", { className: cx('CheckboxesControl-groupLabel', option.labelClassName) }, option.label),
            option.children && option.children.length
                ? option.children.map(function (option, index) {
                    return _this.renderItem(option, index);
                })
                : null));
    };
    CheckboxesControl.prototype.renderItem = function (option, index) {
        if (option.children) {
            return this.renderGroup(option, index);
        }
        var _a = this.props, itemClassName = _a.itemClassName, onToggle = _a.onToggle, selectedOptions = _a.selectedOptions, disabled = _a.disabled, inline = _a.inline, labelClassName = _a.labelClassName;
        return (react_1.default.createElement(Checkbox_1.default, { className: itemClassName, key: index, onChange: function () { return onToggle(option); }, checked: !!~selectedOptions.indexOf(option), disabled: disabled || option.disabled, inline: inline, labelClassName: labelClassName }, option.label));
    };
    CheckboxesControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, disabled = _a.disabled, placeholder = _a.placeholder, options = _a.options, inline = _a.inline, columnsCount = _a.columnsCount, selectedOptions = _a.selectedOptions, onToggle = _a.onToggle, onToggleAll = _a.onToggleAll, checkAll = _a.checkAll, cx = _a.classnames, itemClassName = _a.itemClassName, labelClassName = _a.labelClassName;
        var body = [];
        if (options && options.length) {
            body = options.map(function (option, key) { return _this.renderItem(option, key); });
        }
        if (checkAll && body.length) {
            body.unshift(react_1.default.createElement(Checkbox_1.default, { key: "checkall", className: itemClassName, onChange: onToggleAll, checked: !!selectedOptions.length, partial: !!(selectedOptions.length &&
                    selectedOptions.length !== options.length), disabled: disabled, inline: inline, labelClassName: labelClassName }, "\u5168\u9009/\u4E0D\u9009"));
        }
        if (!inline && columnsCount > 1) {
            var weight = 12 / columnsCount;
            var cellClassName_1 = "Grid-col--sm" + (weight === Math.round(weight) ? weight : '');
            body = chunk(body, columnsCount).map(function (group, groupIndex) { return (react_1.default.createElement("div", { className: cx('Grid'), key: groupIndex }, Array.from({ length: columnsCount }).map(function (_, index) { return (react_1.default.createElement("div", { key: index, className: cx(cellClassName_1) }, group[index])); }))); });
        }
        return (react_1.default.createElement("div", { className: cx("CheckboxesControl", className) }, body && body.length ? (body) : (react_1.default.createElement("span", { className: "Form-placeholder" }, placeholder))));
    };
    CheckboxesControl.defaultProps = {
        columnsCount: 1,
        multiple: true,
        placeholder: '暂无选项'
    };
    return CheckboxesControl;
}(react_1.default.Component));
exports.default = CheckboxesControl;
var CheckboxesControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxesControlRenderer, _super);
    function CheckboxesControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxesControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'checkboxes',
            sizeMutable: false
        })
    ], CheckboxesControlRenderer);
    return CheckboxesControlRenderer;
}(CheckboxesControl));
exports.CheckboxesControlRenderer = CheckboxesControlRenderer;
//# sourceMappingURL=./renderers/Form/Checkboxes.js.map
