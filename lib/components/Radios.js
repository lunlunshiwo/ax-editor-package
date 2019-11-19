"use strict";
/**
 * @file Radios
 * @description
 * @author fex
 *
 * @param 参数说明：
 * options: [
 *   {
 *      label: '显示的名字',
 *      value: '值',
 *      disabled: false
 *   }
 * ]
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var uncontrollable = require("uncontrollable");
var Checkbox_1 = tslib_1.__importDefault(require("./Checkbox"));
var Checkboxes_1 = require("./Checkboxes");
var chunk = require("lodash/chunk");
var theme_1 = require("../theme");
var Radios = /** @class */ (function (_super) {
    tslib_1.__extends(Radios, _super);
    function Radios() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Radios.prototype.toggleOption = function (option) {
        var _a = this.props, value = _a.value, onChange = _a.onChange, valueField = _a.valueField, clearable = _a.clearable, delimiter = _a.delimiter, options = _a.options;
        var valueArray = Checkboxes_1.value2array(value, {
            multiple: false,
            delimiter: delimiter,
            valueField: valueField,
            options: options
        });
        var idx = valueArray.indexOf(option);
        if (~idx) {
            clearable && valueArray.splice(idx, 1);
        }
        else {
            valueArray = [option];
        }
        var newValue = valueArray[0];
        onChange && onChange(newValue);
    };
    Radios.prototype.renderGroup = function (option, index, valueArray) {
        var _this = this;
        var cx = this.props.classnames;
        return (react_1.default.createElement("div", { key: index, className: cx('RadiosControl-group', option.className) },
            react_1.default.createElement("label", { className: cx('RadiosControl-groupLabel', option.labelClassName) }, option.label),
            option.children && option.children.length
                ? option.children.map(function (option, index) {
                    return _this.renderItem(option, index, valueArray);
                })
                : null));
    };
    Radios.prototype.renderItem = function (option, index, valueArray) {
        var _this = this;
        if (option.children) {
            return this.renderGroup(option, index, valueArray);
        }
        var _a = this.props, disabled = _a.disabled, inline = _a.inline, itemClassName = _a.itemClassName, cx = _a.classnames, labelClassName = _a.labelClassName;
        return (react_1.default.createElement(Checkbox_1.default, { type: "radio", key: index, onChange: function () { return _this.toggleOption(option); }, checked: !!~valueArray.indexOf(option), className: cx(itemClassName, option.className), disabled: disabled || option.disabled, description: option.description, inline: inline, labelClassName: labelClassName }, option.label));
    };
    Radios.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, options = _a.options, className = _a.className, cx = _a.classnames, placeholder = _a.placeholder, columnsCount = _a.columnsCount, joinValues = _a.joinValues, extractValue = _a.extractValue, disabled = _a.disabled, inline = _a.inline, delimiter = _a.delimiter, valueField = _a.valueField, classPrefix = _a.classPrefix;
        var valueArray = Checkboxes_1.value2array(value, {
            multiple: false,
            delimiter: delimiter,
            valueField: valueField,
            options: options,
            joinValues: joinValues,
            extractValue: extractValue
        });
        var body = [];
        if (options) {
            body = options.map(function (option, key) {
                return _this.renderItem(option, key, valueArray);
            });
        }
        if (!inline && columnsCount > 1) {
            var weight = 12 / columnsCount;
            var cellClassName_1 = "Grid-col--sm" + (weight === Math.round(weight) ? weight : '');
            body = chunk(body, columnsCount).map(function (group, groupIndex) { return (react_1.default.createElement("div", { className: cx('Grid'), key: groupIndex }, Array.from({ length: columnsCount }).map(function (_, index) { return (react_1.default.createElement("div", { key: index, className: cx(cellClassName_1) }, group[index])); }))); });
        }
        return (react_1.default.createElement("div", { className: className }, body && body.length ? body : placeholder));
    };
    Radios.defaultProps = {
        joinValues: true,
        clearable: false,
        columnsCount: 1 // 一行显示一个
    };
    return Radios;
}(react_1.default.Component));
exports.Radios = Radios;
exports.default = theme_1.themeable(uncontrollable(Radios, {
    value: 'onChange'
}));
//# sourceMappingURL=./components/Radios.js.map
