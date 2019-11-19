"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Overlay_1 = tslib_1.__importDefault(require("../../components/Overlay"));
var PopOver_1 = tslib_1.__importDefault(require("../../components/PopOver"));
var Options_1 = require("./Options");
var icons_1 = require("../../components/icons");
var Tree_1 = tslib_1.__importDefault(require("../../components/Tree"));
// @ts-ignore
var match_sorter_1 = tslib_1.__importDefault(require("match-sorter"));
var debouce = require("lodash/debounce");
var find = require("lodash/find");
var api_1 = require("../../utils/api");
var TreeSelectControl = /** @class */ (function (_super) {
    tslib_1.__extends(TreeSelectControl, _super);
    function TreeSelectControl(props) {
        var _this = _super.call(this, props) || this;
        _this.input = react_1.default.createRef();
        _this.cache = {};
        _this.state = {
            inputValue: '',
            isOpened: false,
            isFocused: false
        };
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.clearValue = _this.clearValue.bind(_this);
        _this.target = react_1.default.createRef();
        _this.container = react_1.default.createRef();
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleInputKeyDown = _this.handleInputKeyDown.bind(_this);
        _this.loadRemote = debouce(_this.loadRemote.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        return _this;
    }
    TreeSelectControl.prototype.componentDidMount = function () {
        this.loadRemote('');
    };
    TreeSelectControl.prototype.open = function (fn) {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            isOpened: true
        }, fn);
    };
    TreeSelectControl.prototype.close = function () {
        var _this = this;
        this.setState({
            isOpened: false,
            inputValue: this.props.multiple ? this.state.inputValue : ''
        }, function () { return _this.loadRemote(_this.state.inputValue); });
    };
    TreeSelectControl.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    TreeSelectControl.prototype.handleBlur = function () {
        this.setState({
            isFocused: false
        });
    };
    TreeSelectControl.prototype.handleClick = function () {
        var _this = this;
        this.state.isOpened
            ? this.close()
            : this.open(function () { return _this.input.current && _this.input.current.focus(); });
    };
    TreeSelectControl.prototype.handleKeyPress = function (e) {
        if (e.key === ' ') {
            this.handleClick();
        }
    };
    TreeSelectControl.prototype.validate = function () {
        var _a = this.props, value = _a.value, minLength = _a.minLength, maxLength = _a.maxLength, delimiter = _a.delimiter;
        var curValue = Array.isArray(value)
            ? value
            : (value ? String(value) : '').split(delimiter || ',');
        if (minLength && curValue.length < minLength) {
            return "\u5DF2\u9009\u62E9\u6570\u91CF\u4F4E\u4E8E\u8BBE\u5B9A\u7684\u6700\u5C0F\u4E2A\u6570" + minLength + "\uFF0C\u8BF7\u9009\u62E9\u66F4\u591A\u7684\u9009\u9879\u3002";
        }
        else if (maxLength && curValue.length > maxLength) {
            return "\u5DF2\u9009\u62E9\u6570\u91CF\u8D85\u51FA\u8BBE\u5B9A\u7684\u6700\u5927\u4E2A\u6570" + maxLength + "\uFF0C\u8BF7\u53D6\u6D88\u9009\u62E9\u8D85\u51FA\u7684\u9009\u9879\u3002";
        }
    };
    TreeSelectControl.prototype.removeItem = function (index, e) {
        var _a = this.props, selectedOptions = _a.selectedOptions, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField, onChange = _a.onChange, disabled = _a.disabled;
        e && e.stopPropagation();
        if (disabled) {
            return;
        }
        var items = selectedOptions.concat();
        items.splice(index, 1);
        var value = items;
        if (joinValues) {
            value = items
                .map(function (item) { return item[valueField || 'value']; })
                .join(delimiter || ',');
        }
        else if (extractValue) {
            value = items.map(function (item) { return item[valueField || 'value']; });
        }
        onChange(value);
    };
    TreeSelectControl.prototype.handleChange = function (value) {
        var _a = this.props, onChange = _a.onChange, multiple = _a.multiple;
        if (!multiple) {
            this.close();
        }
        multiple || !this.state.inputValue
            ? onChange(value)
            : this.setState({
                inputValue: ''
            }, function () { return onChange(value); });
    };
    TreeSelectControl.prototype.handleInputChange = function (e) {
        var _this = this;
        var _a = this.props, autoComplete = _a.autoComplete, data = _a.data;
        this.setState({
            inputValue: e.currentTarget.value
        }, api_1.isEffectiveApi(autoComplete, data)
            ? function () { return _this.loadRemote(_this.state.inputValue); }
            : undefined);
    };
    TreeSelectControl.prototype.handleInputKeyDown = function (event) {
        var inputValue = this.state.inputValue;
        var _a = this.props, multiple = _a.multiple, selectedOptions = _a.selectedOptions;
        if (event.key === 'Backspace' &&
            !inputValue &&
            selectedOptions.length &&
            multiple) {
            this.removeItem(selectedOptions.length - 1);
        }
    };
    TreeSelectControl.prototype.clearValue = function () {
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        onChange(typeof resetValue === 'undefined' ? '' : resetValue);
    };
    TreeSelectControl.prototype.filterOptions = function (options, keywords) {
        var _this = this;
        var _a = this.props, labelField = _a.labelField, valueField = _a.valueField;
        return options.map(function (option) {
            option = tslib_1.__assign({}, option);
            option.visible = !!match_sorter_1.default([option], keywords, {
                keys: [labelField || 'label', valueField || 'value']
            }).length;
            if (!option.visible && option.children) {
                option.children = _this.filterOptions(option.children, keywords);
                var visibleCount = option.children.filter(function (item) { return item.visible; })
                    .length;
                option.visible = !!visibleCount;
            }
            option.visible && (option.collapsed = false);
            return option;
        });
    };
    TreeSelectControl.prototype.loadRemote = function (input) {
        var _this = this;
        var _a = this.props, autoComplete = _a.autoComplete, env = _a.env, data = _a.data, setOptions = _a.setOptions, setLoading = _a.setLoading;
        if (!api_1.isEffectiveApi(autoComplete, data)) {
            return;
        }
        else if (!env || !env.fetcher) {
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
        return env
            .fetcher(autoComplete, tslib_1.__assign(tslib_1.__assign({}, data), { term: input, value: input }))
            .then(function (ret) {
            var options = (ret.data && ret.data.options) || ret.data || [];
            _this.cache[input] = options;
            var combinedOptions = _this.mergeOptions(options);
            setOptions(combinedOptions);
            return Promise.resolve({
                options: combinedOptions
            });
        })
            .finally(function () { return setLoading(false); });
    };
    TreeSelectControl.prototype.mergeOptions = function (options) {
        var selectedOptions = this.props.selectedOptions;
        var combinedOptions = options.concat();
        if (Array.isArray(selectedOptions) && selectedOptions.length) {
            selectedOptions.forEach(function (option) {
                if (!find(combinedOptions, function (item) { return item.value == option.value; })) {
                    combinedOptions.push(tslib_1.__assign(tslib_1.__assign({}, option), { visible: false }));
                }
            });
        }
        return combinedOptions;
    };
    TreeSelectControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    TreeSelectControl.prototype.renderValues = function () {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, selectedOptions = _a.selectedOptions, multiple = _a.multiple, labelField = _a.labelField, disabled = _a.disabled, placeholder = _a.placeholder, cx = _a.classnames;
        if ((!multiple || !selectedOptions.length) && this.state.inputValue) {
            return null;
        }
        return selectedOptions.length ? (selectedOptions.map(function (item, index) {
            return multiple ? (react_1.default.createElement("div", { key: index, className: cx("TreeSelect-value", {
                    disabled: disabled
                }) },
                react_1.default.createElement("span", { className: cx('TreeSelect-valueIcon'), onClick: _this.removeItem.bind(_this, index) }, "\u00D7"),
                react_1.default.createElement("span", { className: cx('TreeSelect-valueLabel') }, item[labelField || 'label']))) : (react_1.default.createElement("div", { className: cx('TreeSelect-value'), key: index }, item[labelField || 'label']));
        })) : (react_1.default.createElement("span", { key: "placeholder", className: cx('TreeSelect-placeholder') }, placeholder));
    };
    TreeSelectControl.prototype.renderOuter = function () {
        var _this = this;
        var _a = this.props, value = _a.value, disabled = _a.disabled, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, placeholder = _a.placeholder, options = _a.options, multiple = _a.multiple, valueField = _a.valueField, initiallyOpen = _a.initiallyOpen, unfoldedLevel = _a.unfoldedLevel, withChildren = _a.withChildren, rootLabel = _a.rootLabel, cascade = _a.cascade, rootValue = _a.rootValue, showIcon = _a.showIcon, showRadio = _a.showRadio, popOverContainer = _a.popOverContainer, onlyChildren = _a.onlyChildren, ns = _a.classPrefix, optionsPlaceholder = _a.optionsPlaceholder, searchable = _a.searchable, autoComplete = _a.autoComplete, maxLength = _a.maxLength, minLength = _a.minLength;
        var filtedOptions = !api_1.isEffectiveApi(autoComplete) && searchable && this.state.inputValue
            ? this.filterOptions(options, this.state.inputValue)
            : options;
        return (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || (function () { return _this.container.current; }), target: function () { return _this.target.current; }, show: true },
            react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: ns + "TreeSelect-popover", style: {
                    minWidth: this.target.current
                        ? this.target.current.offsetWidth
                        : undefined
                }, onHide: this.close, overlay: true },
                react_1.default.createElement(Tree_1.default, { classPrefix: ns, onlyChildren: onlyChildren, valueField: valueField, disabled: disabled, onChange: this.handleChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, placeholder: optionsPlaceholder, options: filtedOptions, highlightTxt: this.state.inputValue, multiple: multiple, initiallyOpen: initiallyOpen, unfoldedLevel: unfoldedLevel, withChildren: withChildren, rootLabel: rootLabel, rootValue: rootValue, showIcon: showIcon, showRadio: showRadio, cascade: cascade, foldedField: "collapsed", hideRoot: true, value: value || '', labelField: "label", maxLength: maxLength, minLength: minLength }))));
    };
    TreeSelectControl.prototype.render = function () {
        var _a = this.props, className = _a.className, disabled = _a.disabled, spinnerClassName = _a.spinnerClassName, inline = _a.inline, loading = _a.loading, multiple = _a.multiple, value = _a.value, clearable = _a.clearable, ns = _a.classPrefix, cx = _a.classnames, searchable = _a.searchable, autoComplete = _a.autoComplete, selectedOptions = _a.selectedOptions;
        return (react_1.default.createElement("div", { ref: this.container, className: cx("TreeSelectControl", className) },
            react_1.default.createElement("div", { tabIndex: 0, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, ref: this.target, className: cx("TreeSelect", {
                    'TreeSelect--inline': inline,
                    'TreeSelect--single': !multiple,
                    'TreeSelect--multi': multiple,
                    'TreeSelect--searchable': searchable || api_1.isEffectiveApi(autoComplete),
                    'is-opened': this.state.isOpened,
                    'is-focused': this.state.isFocused,
                    'is-disabled': disabled
                }) },
                react_1.default.createElement("div", { onClick: this.handleClick, className: cx('TreeSelect-input') },
                    react_1.default.createElement("div", { className: cx('TreeSelect-valueWrap') },
                        this.renderValues(),
                        searchable || api_1.isEffectiveApi(autoComplete) ? (react_1.default.createElement("input", { onChange: this.handleInputChange, value: this.state.inputValue, ref: this.input, onKeyDown: this.handleInputKeyDown })) : null),
                    clearable && !disabled && selectedOptions.length ? (react_1.default.createElement("a", { onClick: this.clearValue, className: ns + "TreeSelect-clear" },
                        react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                    loading ? (react_1.default.createElement("span", { className: cx('TreeSelect-spinner') },
                        react_1.default.createElement("i", { className: spinnerClassName }))) : null,
                    react_1.default.createElement("span", { className: cx('TreeSelect-arrow') })),
                this.state.isOpened ? this.renderOuter() : null)));
    };
    TreeSelectControl.defaultProps = {
        placeholder: '请选择',
        optionsPlaceholder: '暂无数据',
        multiple: false,
        clearable: true,
        rootLabel: '顶级',
        rootValue: '',
        showIcon: true,
        joinValues: true,
        extractValue: false,
        delimiter: ',',
        resetValue: '',
        spinnerClassName: 'fa fa-spinner fa-spin fa-1x fa-fw'
    };
    return TreeSelectControl;
}(react_1.default.Component));
exports.default = TreeSelectControl;
var TreeSelectControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TreeSelectControlRenderer, _super);
    function TreeSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeSelectControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'tree-select'
        })
    ], TreeSelectControlRenderer);
    return TreeSelectControlRenderer;
}(TreeSelectControl));
exports.TreeSelectControlRenderer = TreeSelectControlRenderer;
//# sourceMappingURL=./renderers/Form/TreeSelect.js.map
