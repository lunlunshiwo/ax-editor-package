"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var omit = require("lodash/omit");
var pick = require("lodash/pick");
var helper_1 = require("../../utils/helper");
var dom;
var stripTag = function (value) {
    if (!value) {
        return value;
    }
    dom = dom || document.createElement('div');
    dom.innerHTML = value;
    return dom.innerText;
};
var SubFormControl = /** @class */ (function (_super) {
    tslib_1.__extends(SubFormControl, _super);
    function SubFormControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            openedIndex: -1,
            optionIndex: -1
        };
        _this.addItem = _this.addItem.bind(_this);
        _this.removeItem = _this.removeItem.bind(_this);
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.handleDialogConfirm = _this.handleDialogConfirm.bind(_this);
        return _this;
    }
    SubFormControl.prototype.addItem = function () {
        var value = this.props.value;
        if (!Array.isArray(value)) {
            value = [];
        }
        else {
            value = value.concat();
        }
        value.push({});
        this.props.onChange(value);
    };
    SubFormControl.prototype.removeItem = function (key, e) {
        e.stopPropagation();
        e.preventDefault();
        var value = this.props.value;
        if (!Array.isArray(value)) {
            return;
        }
        value = value.concat();
        value.splice(key, 1);
        this.props.onChange(value);
    };
    SubFormControl.prototype.open = function (index) {
        if (index === void 0) { index = 0; }
        this.setState({
            openedIndex: index
        });
    };
    SubFormControl.prototype.close = function () {
        this.setState({
            openedIndex: -1
        });
    };
    SubFormControl.prototype.handleDialogConfirm = function (values) {
        var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, value = _a.value;
        if (multiple) {
            var newValue = Array.isArray(value) ? value.concat() : [];
            newValue[this.state.openedIndex] = tslib_1.__assign(tslib_1.__assign({}, newValue[this.state.openedIndex]), values[0]);
            onChange(newValue);
        }
        else {
            onChange(tslib_1.__assign(tslib_1.__assign({}, value), values[0]));
        }
        this.close();
    };
    SubFormControl.prototype.buildDialogSchema = function () {
        var form = this.props.form;
        var dialogProps = [
            'title',
            'actions',
            'name',
            'size',
            'closeOnEsc',
            'showCloseButton',
            'bodyClassName',
            'type'
        ];
        return tslib_1.__assign(tslib_1.__assign({}, pick(form, dialogProps)), { type: 'dialog', body: tslib_1.__assign({ type: 'form' }, omit(form, dialogProps)) });
    };
    SubFormControl.prototype.renderMultipe = function () {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, addButtonClassName = _a.addButtonClassName, editButtonClassName = _a.editButtonClassName, disabled = _a.disabled, labelField = _a.labelField, value = _a.value, btnLabel = _a.btnLabel, render = _a.render, data = _a.data;
        return [
            react_1.default.createElement("div", { className: ns + "SubForm-values", key: "values" }, Array.isArray(value)
                ? value.map(function (value, key) { return (react_1.default.createElement("div", { className: classnames_1.default(ns + "SubForm-value", {
                        'is-disabled': disabled
                    }, editButtonClassName), key: key },
                    react_1.default.createElement("span", { "data-tooltip": "\u5220\u9664", "data-position": "bottom", className: ns + "Select-valueIcon", onClick: _this.removeItem.bind(_this, key) }, "\u00D7"),
                    react_1.default.createElement("span", { onClick: _this.open.bind(_this, key), className: ns + "SubForm-valueLabel", "data-tooltip": "\u7F16\u8F91\u8BE6\u60C5", "data-position": "bottom" }, (value &&
                        labelField &&
                        value[labelField] &&
                        stripTag(value[labelField])) ||
                        render('label', {
                            type: 'tpl',
                            tpl: btnLabel
                        }, {
                            data: data
                        })))); })
                : null),
            react_1.default.createElement("button", { key: "add", type: "button", onClick: this.addItem, className: classnames_1.default(ns + "Button " + ns + "SubForm-addBtn", addButtonClassName), disabled: disabled, "data-tooltip": "\u65B0\u589E\u4E00\u6761\u6570\u636E" },
                react_1.default.createElement("i", { className: "fa fa-plus m-r-xs" }),
                react_1.default.createElement("span", null, "\u65B0\u589E"))
        ];
    };
    SubFormControl.prototype.renderSingle = function () {
        var _a = this.props, ns = _a.classPrefix, btnClassName = _a.btnClassName, disabled = _a.disabled, value = _a.value, labelField = _a.labelField, btnLabel = _a.btnLabel, render = _a.render, data = _a.data;
        return (react_1.default.createElement("div", { className: ns + "SubForm-values", key: "values" },
            react_1.default.createElement("div", { className: classnames_1.default(ns + "SubForm-value", {
                    'is-disabled': disabled
                }, btnClassName), onClick: this.open.bind(this, 0), "data-tooltip": "\u7F16\u8F91\u8BE6\u60C5", "data-position": "bottom" },
                react_1.default.createElement("span", { className: ns + "SubForm-valueLabel" }, (value &&
                    labelField &&
                    value[labelField] &&
                    stripTag(value[labelField])) ||
                    render('label', {
                        type: 'tpl',
                        tpl: btnLabel
                    }, {
                        data: data
                    })))));
    };
    SubFormControl.prototype.render = function () {
        var _a = this.props, multiple = _a.multiple, ns = _a.classPrefix, className = _a.className, render = _a.render, value = _a.value, data = _a.data;
        var openedIndex = this.state.openedIndex;
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "SubFormControl", className) },
            multiple ? this.renderMultipe() : this.renderSingle(),
            render("dalog/" + openedIndex, this.buildDialogSchema(), {
                show: openedIndex !== -1,
                onClose: this.close,
                onConfirm: this.handleDialogConfirm,
                data: helper_1.createObject(data, (multiple ? Array.isArray(value) && value[openedIndex] : value) ||
                    {})
            })));
    };
    SubFormControl.defaultProps = {
        minLength: 0,
        maxLength: 0,
        multiple: false,
        btnClassName: '',
        addButtonClassName: '',
        editButtonClassName: '',
        labelField: 'label',
        btnLabel: '设置'
    };
    return SubFormControl;
}(react_1.default.PureComponent));
exports.default = SubFormControl;
var SubFormControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(SubFormControlRenderer, _super);
    function SubFormControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubFormControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'form',
            sizeMutable: false
        })
    ], SubFormControlRenderer);
    return SubFormControlRenderer;
}(SubFormControl));
exports.SubFormControlRenderer = SubFormControlRenderer;
//# sourceMappingURL=./renderers/Form/SubForm.js.map
