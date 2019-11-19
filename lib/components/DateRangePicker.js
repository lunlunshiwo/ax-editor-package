"use strict";
/**
 * @file DateRangePicker
 * @description 自定义日期范围时间选择器组件
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var moment = require("moment");
var react_dom_1 = require("react-dom");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var icons_1 = require("./icons");
var Overlay_1 = tslib_1.__importDefault(require("./Overlay"));
var DatePicker_1 = require("./DatePicker");
var PopOver_1 = tslib_1.__importDefault(require("./PopOver"));
var theme_1 = require("../theme");
var availableRanges = {
    today: {
        label: '今天',
        startDate: function (now) {
            return now.startOf('day');
        },
        endDate: function (now) {
            return now;
        }
    },
    yesterday: {
        label: '昨天',
        startDate: function (now) {
            return now.add(-1, 'days').startOf('day');
        },
        endDate: function (now) {
            return now.add(-1, 'days').endOf('day');
        }
    },
    '1dayago': {
        label: '最近1天',
        startDate: function (now) {
            return now.add(-1, 'days');
        },
        endDate: function (now) {
            return now;
        }
    },
    '7daysago': {
        label: '最近7天',
        startDate: function (now) {
            return now.add(-7, 'days');
        },
        endDate: function (now) {
            return now;
        }
    },
    '90daysago': {
        label: '最近90天',
        startDate: function (now) {
            return now.add(-90, 'days');
        },
        endDate: function (now) {
            return now;
        }
    },
    prevweek: {
        label: '上周',
        startDate: function (now) {
            return now.startOf('week').add(-1, 'weeks');
        },
        endDate: function (now) {
            return now
                .startOf('week')
                .add(-1, 'days')
                .endOf('day');
        }
    },
    thismonth: {
        label: '本月',
        startDate: function (now) {
            return now.startOf('month');
        },
        endDate: function (now) {
            return now;
        }
    },
    prevmonth: {
        label: '上个月',
        startDate: function (now) {
            return now.startOf('month').add(-1, 'month');
        },
        endDate: function (now) {
            return now
                .startOf('month')
                .add(-1, 'day')
                .endOf('day');
        }
    },
    prevquarter: {
        label: '上个季节',
        startDate: function (now) {
            return now.startOf('quarter').add(-1, 'quarter');
        },
        endDate: function (now) {
            return now
                .startOf('quarter')
                .add(-1, 'day')
                .endOf('day');
        }
    },
    thisquarter: {
        label: '本季度',
        startDate: function (now) {
            return now.startOf('quarter');
        },
        endDate: function (now) {
            return now;
        }
    }
};
var DateRangePicker = /** @class */ (function (_super) {
    tslib_1.__extends(DateRangePicker, _super);
    function DateRangePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.handleStartChange = _this.handleStartChange.bind(_this);
        _this.handleEndChange = _this.handleEndChange.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.checkStartIsValidDate = _this.checkStartIsValidDate.bind(_this);
        _this.checkEndIsValidDate = _this.checkEndIsValidDate.bind(_this);
        _this.confirm = _this.confirm.bind(_this);
        _this.clearValue = _this.clearValue.bind(_this);
        _this.dom = React.createRef();
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        _this.handlePopOverClick = _this.handlePopOverClick.bind(_this);
        var _a = _this.props, format = _a.format, joinValues = _a.joinValues, delimiter = _a.delimiter, value = _a.value;
        _this.state = tslib_1.__assign({ isOpened: false, isFocused: false }, DateRangePicker.unFormatValue(value, format, joinValues, delimiter));
        return _this;
    }
    DateRangePicker.formatValue = function (newValue, format, joinValues, delimiter) {
        newValue = [
            newValue.startDate.format(format),
            newValue.endDate.format(format)
        ];
        if (joinValues) {
            newValue = newValue.join(delimiter);
        }
        return newValue;
    };
    DateRangePicker.unFormatValue = function (value, format, joinValues, delimiter) {
        if (!value) {
            return {
                startDate: undefined,
                endDate: undefined
            };
        }
        if (joinValues && typeof value === 'string') {
            value = value.split(delimiter);
        }
        return {
            startDate: value[0] ? moment(value[0], format) : undefined,
            endDate: value[1] ? moment(value[1], format) : undefined
        };
    };
    DateRangePicker.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        var value = nextProps.value, format = nextProps.format, joinValues = nextProps.joinValues, delimiter = nextProps.delimiter;
        if (props.value !== value) {
            this.setState(tslib_1.__assign({}, DateRangePicker.unFormatValue(value, format, joinValues, delimiter)));
        }
    };
    DateRangePicker.prototype.focus = function () {
        if (!this.dom.current || this.props.disabled) {
            return;
        }
        this.dom.current.focus();
    };
    DateRangePicker.prototype.blur = function () {
        if (!this.dom.current || this.props.disabled) {
            return;
        }
        this.dom.current.blur();
    };
    DateRangePicker.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    DateRangePicker.prototype.handleBlur = function () {
        this.setState({
            isFocused: false
        });
    };
    DateRangePicker.prototype.open = function () {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            isOpened: true
        });
    };
    DateRangePicker.prototype.close = function () {
        this.setState({
            isOpened: false
        }, this.blur);
    };
    DateRangePicker.prototype.handleClick = function () {
        this.state.isOpened ? this.close() : this.open();
    };
    DateRangePicker.prototype.handlePopOverClick = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    DateRangePicker.prototype.handleKeyPress = function (e) {
        if (e.key === ' ') {
            this.handleClick();
        }
    };
    DateRangePicker.prototype.confirm = function () {
        if (!this.state.startDate || !this.state.endDate) {
            return;
        }
        else if (this.state.startDate.isAfter(this.state.endDate)) {
            return;
        }
        this.props.onChange(DateRangePicker.formatValue({
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }, this.props.format, this.props.joinValues, this.props.delimiter));
        this.close();
    };
    DateRangePicker.prototype.handleStartChange = function (newValue) {
        this.setState({
            startDate: newValue.clone()
        });
    };
    DateRangePicker.prototype.handleEndChange = function (newValue) {
        newValue =
            !this.state.endDate && !this.props.timeFormat
                ? newValue.endOf('day')
                : newValue;
        this.setState({
            endDate: newValue.clone()
        });
    };
    DateRangePicker.prototype.selectRannge = function (range) {
        var now = moment();
        this.setState({
            startDate: range.startDate(now.clone()),
            endDate: range.endDate(now.clone())
        });
    };
    DateRangePicker.prototype.clearValue = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        onChange(resetValue);
    };
    DateRangePicker.prototype.checkStartIsValidDate = function (currentDate) {
        var endDate = this.state.endDate;
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate;
        maxDate =
            maxDate && endDate
                ? maxDate.isBefore(endDate)
                    ? maxDate
                    : endDate
                : maxDate || endDate;
        if (minDate && currentDate.isBefore(minDate, 'day')) {
            return false;
        }
        else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
            return false;
        }
        return true;
    };
    DateRangePicker.prototype.checkEndIsValidDate = function (currentDate) {
        var startDate = this.state.startDate;
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate;
        minDate =
            minDate && startDate
                ? minDate.isAfter(startDate)
                    ? minDate
                    : startDate
                : minDate || startDate;
        if (minDate && currentDate.isBefore(minDate, 'day')) {
            return false;
        }
        else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
            return false;
        }
        return true;
    };
    DateRangePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, placeholder = _a.placeholder, popOverContainer = _a.popOverContainer, inputFormat = _a.inputFormat, format = _a.format, joinValues = _a.joinValues, delimiter = _a.delimiter, clearable = _a.clearable, timeFormat = _a.timeFormat, ranges = _a.ranges, disabled = _a.disabled, iconClassName = _a.iconClassName;
        var _b = this.state, isOpened = _b.isOpened, isFocused = _b.isFocused, startDate = _b.startDate, endDate = _b.endDate;
        var selectedDate = DateRangePicker.unFormatValue(value, format, joinValues, delimiter);
        var startViewValue = selectedDate.startDate
            ? selectedDate.startDate.format(inputFormat)
            : '';
        var endViewValue = selectedDate.endDate
            ? selectedDate.endDate.format(inputFormat)
            : '';
        var arr = [];
        startViewValue && arr.push(startViewValue);
        endViewValue && arr.push(endViewValue);
        return (React.createElement("div", { tabIndex: 0, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, className: classnames_1.default(ns + "DateRangePicker", {
                'is-disabled': disabled,
                'is-focused': isFocused
            }, className), ref: this.dom, onClick: this.handleClick },
            arr.length ? (React.createElement("span", { className: ns + "DateRangePicker-value" }, arr.join(' 至 '))) : (React.createElement("span", { className: ns + "DateRangePicker-placeholder" }, placeholder)),
            clearable && !disabled && value ? (React.createElement("a", { className: ns + "DateRangePicker-clear", onClick: this.clearValue },
                React.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
            React.createElement("a", { className: ns + "DateRangePicker-toggler" },
                React.createElement("i", { className: iconClassName })),
            isOpened ? (React.createElement(Overlay_1.default, { placement: "left-bottom-left-top right-bottom-right-top", target: function () { return _this.dom.current; }, onHide: this.close, container: popOverContainer || (function () { return react_dom_1.findDOMNode(_this); }), rootClose: false, show: true },
                React.createElement(PopOver_1.default, { classPrefix: ns, className: ns + "DateRangePicker-popover", onHide: this.close, onClick: this.handlePopOverClick, overlay: true },
                    React.createElement("div", { className: ns + "DateRangePicker-wrap" },
                        ranges ? (React.createElement("ul", { className: ns + "DateRangePicker-rangers" }, (typeof ranges === 'string'
                            ? ranges.split(',')
                            : Array.isArray(ranges)
                                ? ranges
                                : [])
                            .filter(function (key) { return !!availableRanges[key]; })
                            .map(function (key) { return (React.createElement("li", { className: ns + "DateRangePicker-ranger", onClick: function () {
                                return _this.selectRannge(availableRanges[key]);
                            }, key: key },
                            React.createElement("a", null, availableRanges[key].label))); }))) : null,
                        React.createElement(DatePicker_1.BaseDatePicker, { classPrefix: ns, classnames: classnames_1.default, className: ns + "DateRangePicker-start", value: startDate, onChange: this.handleStartChange, requiredConfirm: false, dateFormat: format, timeFormat: timeFormat, isValidDate: this.checkStartIsValidDate, viewMode: "days", input: false, onClose: this.close }),
                        React.createElement(DatePicker_1.BaseDatePicker, { classPrefix: ns, classnames: classnames_1.default, className: ns + "DateRangePicker-end", value: endDate, onChange: this.handleEndChange, requiredConfirm: false, dateFormat: format, timeFormat: timeFormat, isEndDate: true, isValidDate: this.checkEndIsValidDate, viewMode: "days", input: false, onClose: this.close }),
                        React.createElement("div", { key: "button", className: ns + "DateRangePicker-actions" },
                            React.createElement("a", { className: classnames_1.default('rdtBtn rdtBtnConfirm', {
                                    'is-disabled': !this.state.startDate || !this.state.endDate
                                }), onClick: this.confirm }, "\u786E\u8BA4"),
                            React.createElement("a", { className: "rdtBtn rdtBtnCancel", onClick: this.close }, "\u53D6\u6D88")))))) : null));
    };
    DateRangePicker.defaultProps = {
        placeholder: '请选择日期范围',
        format: 'X',
        inputFormat: 'YYYY-MM-DD',
        joinValues: true,
        clearable: true,
        delimiter: ',',
        ranges: 'yesterday,7daysago,prevweek,thismonth,prevmonth,prevquarter',
        iconClassName: 'fa fa-calendar',
        resetValue: ''
    };
    return DateRangePicker;
}(React.Component));
exports.DateRangePicker = DateRangePicker;
exports.default = theme_1.themeable(DateRangePicker);
//# sourceMappingURL=./components/DateRangePicker.js.map
