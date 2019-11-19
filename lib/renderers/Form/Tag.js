"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Options_1 = require("./Options");
var find = require("lodash/find");
var icons_1 = require("../../components/icons");
var react_overlays_1 = require("react-overlays");
var react_dom_1 = require("react-dom");
var TagControl = /** @class */ (function (_super) {
    tslib_1.__extends(TagControl, _super);
    function TagControl(props) {
        var _this = _super.call(this, props) || this;
        _this.input = react_1.default.createRef();
        _this.state = {
            inputValue: '',
            isFocused: false
        };
        _this.focus = _this.focus.bind(_this);
        _this.clearValue = _this.clearValue.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.getParent = _this.getParent.bind(_this);
        return _this;
    }
    TagControl.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.value !== nextProps.value) {
            this.setState({
                inputValue: ''
            });
        }
    };
    TagControl.prototype.focus = function () {
        if (!this.input.current) {
            return;
        }
        this.input.current.focus();
        // 光标放到最后
        var len = this.input.current.value.length;
        len && this.input.current.setSelectionRange(len, len);
    };
    TagControl.prototype.clearValue = function () {
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        onChange(resetValue);
        this.setState({
            inputValue: resetValue
        }, this.focus);
    };
    TagControl.prototype.removeItem = function (index) {
        var _a = this.props, selectedOptions = _a.selectedOptions, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        var newValue = selectedOptions.concat();
        newValue.splice(index, 1);
        onChange(joinValues
            ? newValue
                .map(function (item) { return item[valueField || 'value']; })
                .join(delimiter || ',')
            : extractValue
                ? newValue.map(function (item) { return item[valueField || 'value']; })
                : newValue);
    };
    TagControl.prototype.addItem = function (option) {
        var _a = this.props, selectedOptions = _a.selectedOptions, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        var newValue = selectedOptions.concat();
        if (find(newValue, function (item) { return item.value == option.value; })) {
            return;
        }
        newValue.push(option);
        onChange(joinValues
            ? newValue
                .map(function (item) { return item[valueField || 'value']; })
                .join(delimiter || ',')
            : extractValue
                ? newValue.map(function (item) { return item[valueField || 'value']; })
                : newValue);
    };
    TagControl.prototype.handleClick = function () {
        this.focus();
    };
    TagControl.prototype.handleFocus = function (e) {
        this.setState({
            isFocused: true
        });
        this.props.onFocus && this.props.onFocus(e);
    };
    TagControl.prototype.handleBlur = function (e) {
        var _a = this.props, selectedOptions = _a.selectedOptions, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        var value = this.state.inputValue.trim();
        this.props.onBlur && this.props.onBlur(e);
        this.setState({
            isFocused: false,
            inputValue: ''
        }, value
            ? function () {
                var newValue = selectedOptions.concat();
                if (!find(newValue, function (item) { return item.value === value; })) {
                    var option = {
                        label: value,
                        value: value
                    };
                    newValue.push(option);
                    onChange(joinValues
                        ? newValue
                            .map(function (item) { return item[valueField || 'value']; })
                            .join(delimiter || ',')
                        : extractValue
                            ? newValue.map(function (item) { return item[valueField || 'value']; })
                            : newValue);
                }
            }
            : undefined);
    };
    TagControl.prototype.handleInputChange = function (evt) {
        var value = evt.currentTarget.value;
        this.setState({
            inputValue: value
        });
    };
    TagControl.prototype.handleKeyDown = function (evt) {
        var _a = this.props, selectedOptions = _a.selectedOptions, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        var value = this.state.inputValue.trim();
        if (selectedOptions.length && !value && evt.key == 'Backspace') {
            var newValue = selectedOptions.concat();
            newValue.pop();
            onChange(joinValues
                ? newValue
                    .map(function (item) { return item[valueField || 'value']; })
                    .join(delimiter || ',')
                : extractValue
                    ? newValue.map(function (item) { return item[valueField || 'value']; })
                    : newValue);
        }
        else if (value && (evt.key === 'Enter' || evt.key === delimiter)) {
            evt.preventDefault();
            var newValue = selectedOptions.concat();
            if (!find(newValue, function (item) { return item.value == value; })) {
                newValue.push({
                    label: value,
                    value: value
                });
                onChange(joinValues
                    ? newValue
                        .map(function (item) { return item[valueField || 'value']; })
                        .join(delimiter || ',')
                    : extractValue
                        ? newValue.map(function (item) { return item[valueField || 'value']; })
                        : newValue);
            }
            this.setState({
                inputValue: ''
            });
        }
    };
    TagControl.prototype.getParent = function () {
        return react_dom_1.findDOMNode(this).parentNode;
    };
    TagControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    TagControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, cx = _a.classnames, disabled = _a.disabled, placeholder = _a.placeholder, name = _a.name, options = _a.options, optionsTip = _a.optionsTip, clearable = _a.clearable, value = _a.value, loading = _a.loading, spinnerClassName = _a.spinnerClassName, selectedOptions = _a.selectedOptions, labelField = _a.labelField;
        return (react_1.default.createElement("div", { className: cx(className, "TagControl", {
                'is-focused': this.state.isFocused,
                'is-disabled': disabled
            }) },
            react_1.default.createElement("div", { onClick: this.handleClick, className: cx('TagControl-input') },
                react_1.default.createElement("div", { className: cx('TagControl-valueWrap') },
                    placeholder &&
                        !selectedOptions.length &&
                        !this.state.inputValue ? (react_1.default.createElement("div", { className: cx('TagControl-placeholder') }, placeholder)) : null,
                    selectedOptions.map(function (item, index) { return (react_1.default.createElement("div", { className: cx('TagControl-value'), key: index },
                        react_1.default.createElement("span", { className: cx('TagControl-valueIcon'), onClick: _this.removeItem.bind(_this, index) }, "\u00D7"),
                        react_1.default.createElement("span", { className: cx('TagControl-valueLabel') }, item[labelField || 'label']))); }),
                    react_1.default.createElement("input", { ref: this.input, name: name, value: this.state.inputValue, onChange: this.handleInputChange, onKeyDown: this.handleKeyDown, onFocus: this.handleFocus, onBlur: this.handleBlur })),
                clearable && !disabled && value ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('TagControl-clear') },
                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                loading ? (react_1.default.createElement("i", { className: cx("TagControl-spinner", spinnerClassName) })) : null),
            options.length ? (react_1.default.createElement(react_overlays_1.Portal, { container: this.getParent },
                react_1.default.createElement("div", { className: cx('TagControl-sug') },
                    optionsTip ? (react_1.default.createElement("div", { className: cx('TagControl-sugTip') }, optionsTip)) : null,
                    options.map(function (item, index) { return (react_1.default.createElement("div", { className: cx('TagControl-sugItem'), key: index, onClick: _this.addItem.bind(_this, item) }, item.label)); })))) : null));
    };
    TagControl.defaultProps = {
        resetValue: '',
        labelField: 'label',
        valueField: 'value',
        placeholder: '',
        multiple: true,
        optionsTip: '最近您使用的标签'
    };
    return TagControl;
}(react_1.default.PureComponent));
exports.default = TagControl;
var TagControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TagControlRenderer, _super);
    function TagControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TagControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'tag'
        })
    ], TagControlRenderer);
    return TagControlRenderer;
}(TagControl));
exports.TagControlRenderer = TagControlRenderer;
//# sourceMappingURL=./renderers/Form/Tag.js.map
