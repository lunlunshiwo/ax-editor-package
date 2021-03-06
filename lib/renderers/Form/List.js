"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Options_1 = require("./Options");
var helper_1 = require("../../utils/helper");
var tpl_builtin_1 = require("../../utils/tpl-builtin");
var ListControl = /** @class */ (function (_super) {
    tslib_1.__extends(ListControl, _super);
    function ListControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListControl.prototype.handleDBClick = function (option, e) {
        this.props.onToggle(option);
        this.props.onAction(e, {
            type: 'submit'
        });
    };
    ListControl.prototype.handleClick = function (option, e) {
        if (e.target && e.target.closest('a,button')) {
            return;
        }
        var _a = this.props, onToggle = _a.onToggle, multiple = _a.multiple, autoFill = _a.autoFill, onBulkChange = _a.onBulkChange;
        var sendTo = !multiple &&
            autoFill &&
            !helper_1.isEmpty(autoFill) &&
            tpl_builtin_1.dataMapping(autoFill, option);
        sendTo && onBulkChange(sendTo);
        onToggle(option);
    };
    ListControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    ListControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, render = _a.render, itemClassName = _a.itemClassName, cx = _a.classnames, className = _a.className, disabled = _a.disabled, options = _a.options, placeholder = _a.placeholder, selectedOptions = _a.selectedOptions, imageClassName = _a.imageClassName, submitOnDBClick = _a.submitOnDBClick, itemSchema = _a.itemSchema, data = _a.data;
        var body = null;
        if (options && options.length) {
            body = (react_1.default.createElement("div", { className: cx('ListControl-items') }, options.map(function (option, key) { return (react_1.default.createElement("div", { key: key, className: cx("ListControl-item", itemClassName, {
                    'is-active': ~selectedOptions.indexOf(option),
                    'is-disabled': option.disabled || disabled
                }), onClick: _this.handleClick.bind(_this, option), onDoubleClick: submitOnDBClick
                    ? _this.handleDBClick.bind(_this, option)
                    : undefined }, itemSchema
                ? render(key + "/body", itemSchema, {
                    data: helper_1.createObject(data, option)
                })
                : option.body
                    ? render(key + "/body", option.body)
                    : [
                        option.image ? (react_1.default.createElement("div", { key: "image", className: cx('ListControl-itemImage', imageClassName) },
                            react_1.default.createElement("img", { src: option.image, alt: option.label }))) : null,
                        option.label ? (react_1.default.createElement("div", { key: "label", className: cx('ListControl-itemLabel') }, option.label)) : null
                        // {/* {option.tip ? (<div className={`${ns}ListControl-tip`}>{option.tip}</div>) : null} */}
                    ])); })));
        }
        return (react_1.default.createElement("div", { className: cx('ListControl', className) }, body ? (body) : (react_1.default.createElement("span", { className: cx('ListControl-placeholder') }, placeholder))));
    };
    ListControl.propsList = ['itemSchema', 'value', 'renderFormItems'];
    ListControl.defaultProps = {
        clearable: false,
        imageClassName: '',
        submitOnDBClick: false
    };
    return ListControl;
}(react_1.default.Component));
exports.default = ListControl;
var ListControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ListControlRenderer, _super);
    function ListControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'list',
            sizeMutable: false
        })
    ], ListControlRenderer);
    return ListControlRenderer;
}(ListControl));
exports.ListControlRenderer = ListControlRenderer;
//# sourceMappingURL=./renderers/Form/List.js.map
