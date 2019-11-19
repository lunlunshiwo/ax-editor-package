"use strict";
/**
 * @file DatePicker
 * @description 时间选择器组件
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var moment_1 = tslib_1.__importDefault(require("moment"));
require("moment/locale/zh-cn");
// hack 进去，让 days view 用 CustomDaysView 代替
var CalendarContainer_1 = tslib_1.__importDefault(require("react-datetime/src/CalendarContainer"));
var react_datetime_1 = tslib_1.__importDefault(require("react-datetime"));
var Select_1 = tslib_1.__importDefault(require("./Select"));
var icons_1 = require("./icons");
var PopOver_1 = tslib_1.__importDefault(require("./PopOver"));
var Overlay_1 = tslib_1.__importDefault(require("./Overlay"));
var theme_1 = require("../theme");
var HackedCalendarContainer = /** @class */ (function (_super) {
    tslib_1.__extends(HackedCalendarContainer, _super);
    function HackedCalendarContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HackedCalendarContainer.prototype.render = function () {
        if (this.props.view === 'days') {
            return react_1.default.createElement(CustomDaysView, tslib_1.__assign({}, this.props.viewProps));
        }
        return _super.prototype.render.call(this);
    };
    return HackedCalendarContainer;
}(CalendarContainer_1.default));
// hack 后，view 中可以调用 setDateTimeState
var BaseDatePicker = /** @class */ (function (_super) {
    tslib_1.__extends(BaseDatePicker, _super);
    function BaseDatePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseDatePicker.prototype.render = function () {
        if (!this.__hacked) {
            this.__hacked = true;
            var origin_1 = this.getComponentProps;
            var setState_1 = this.setState.bind(this);
            this.getComponentProps = function () {
                var _this = this;
                var props = origin_1.apply(this);
                props.setDateTimeState = setState_1;
                [
                    'onChange',
                    'onClose',
                    'requiredConfirm',
                    'classPrefix',
                    'prevIcon',
                    'nextIcon',
                    'isEndDate'
                ].forEach(function (key) { return (props[key] = _this.props[key]); });
                return props;
            };
        }
        // TODO: Make a function or clean up this code,
        // logic right now is really hard to follow
        var className = 'rdt' +
            (this.props.className
                ? Array.isArray(this.props.className)
                    ? ' ' + this.props.className.join(' ')
                    : ' ' + this.props.className
                : ''), children = [];
        if (this.props.input) {
            var finalInputProps = tslib_1.__assign({ type: 'text', className: 'form-control', onClick: this.openCalendar, onFocus: this.openCalendar, onChange: this.onInputChange, onKeyDown: this.onInputKey, value: this.state.inputValue }, this.props.inputProps);
            if (this.props.renderInput) {
                children = [
                    react_1.default.createElement("div", { key: "i" }, this.props.renderInput(finalInputProps, this.openCalendar, this.closeCalendar))
                ];
            }
            else {
                children = [react_1.default.createElement("input", tslib_1.__assign({ key: "i" }, finalInputProps))];
            }
        }
        else {
            className += ' rdtStatic';
        }
        if (this.state.open)
            className += ' rdtOpen';
        return (react_1.default.createElement("div", { className: className }, children.concat(react_1.default.createElement("div", { key: "dt", className: "rdtPicker" },
            react_1.default.createElement(HackedCalendarContainer, { view: this.state.currentView, viewProps: this.getComponentProps(), onClickOutside: this.handleClickOutside })))));
    };
    return BaseDatePicker;
}(react_datetime_1.default));
exports.BaseDatePicker = BaseDatePicker;
var CustomDaysView = /** @class */ (function (_super) {
    tslib_1.__extends(CustomDaysView, _super);
    function CustomDaysView(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClickOutside = _this.handleClickOutside.bind(_this);
        _this.handleYearChange = _this.handleYearChange.bind(_this);
        _this.handleMonthChange = _this.handleMonthChange.bind(_this);
        _this.handleDayChange = _this.handleDayChange.bind(_this);
        _this.confirm = _this.confirm.bind(_this);
        _this.cancel = _this.cancel.bind(_this);
        return _this;
    }
    CustomDaysView.prototype.getDaysOfWeek = function (locale) {
        var days = locale.weekdaysMin();
        var first = locale.firstDayOfWeek();
        var dow = [];
        var i = 0;
        days.forEach(function (day) {
            dow[(7 + i++ - first) % 7] = day;
        });
        return dow;
    };
    CustomDaysView.prototype.alwaysValidDate = function () {
        return true;
    };
    CustomDaysView.prototype.handleDayChange = function (event) {
        // need confirm
        if (this.props.requiredConfirm) {
            var viewDate = this.props.viewDate.clone();
            var currentDate = this.props.selectedDate || viewDate;
            var target = event.target;
            var modifier = 0;
            if (~target.className.indexOf('rdtNew')) {
                modifier = 1;
            }
            if (~target.className.indexOf('rdtOld')) {
                modifier = -1;
            }
            viewDate
                .month(viewDate.month() + modifier)
                .date(parseInt(target.getAttribute('data-value'), 10))
                .hours(currentDate.hours())
                .minutes(currentDate.minutes())
                .seconds(currentDate.seconds())
                .milliseconds(currentDate.milliseconds());
            this.props.setDateTimeState({
                viewDate: viewDate,
                selectedDate: viewDate.clone()
            });
            return;
        }
        this.props.updateSelectedDate(event, true);
    };
    CustomDaysView.prototype.handleMonthChange = function (option) {
        // const div = document.createElement('div');
        // div.innerHTML = `<span class="rdtMonth" data-value="${option.value}"></span>`;
        // const fakeEvent = {
        //     target: div.firstChild
        // };
        // this.props.updateSelectedDate(fakeEvent as any);
        var viewDate = this.props.viewDate;
        this.props.setDateTimeState({
            viewDate: viewDate
                .clone()
                .month(option.value)
                .startOf('month')
        });
    };
    CustomDaysView.prototype.handleYearChange = function (option) {
        // const div = document.createElement('div');
        // div.innerHTML = `<span class="rdtYear" data-value="${option.value}"></span>`;
        // const fakeEvent = {
        //     target: div.firstChild
        // };
        // this.props.updateSelectedDate(fakeEvent as any);
        var viewDate = this.props.viewDate;
        var newDate = viewDate.clone().year(option.value);
        this.props.setDateTimeState({
            viewDate: newDate[newDate.isBefore(viewDate) ? 'endOf' : 'startOf']('year')
        });
    };
    CustomDaysView.prototype.setTime = function (type, value) {
        var date = (this.props.selectedDate || this.props.viewDate).clone();
        date[type](value);
        this.props.setDateTimeState({
            viewDate: date.clone(),
            selectedDate: date.clone()
        });
        if (!this.props.requiredConfirm) {
            this.props.onChange(date);
        }
    };
    CustomDaysView.prototype.confirm = function () {
        var date = this.props.viewDate.clone();
        this.props.setDateTimeState({
            selectedDate: date
        });
        this.props.onChange(date);
        this.props.onClose && this.props.onClose();
    };
    CustomDaysView.prototype.cancel = function () {
        this.props.onClose && this.props.onClose();
    };
    CustomDaysView.prototype.handleClickOutside = function () {
        this.props.handleClickOutside();
    };
    CustomDaysView.prototype.renderYearsSelect = function () {
        var classPrefix = this.props.classPrefix;
        var date = this.props.viewDate;
        var years = [];
        var isValid = this.props.isValidDate || this.alwaysValidDate;
        var irrelevantMonth = 0;
        var irrelevantDate = 1;
        var year = date.year();
        var count = 0;
        years.push(year);
        var _loop_1 = function () {
            year++;
            var currentYear = date.clone().set({
                year: year,
                month: irrelevantMonth,
                date: irrelevantDate
            });
            var noOfDaysInYear = parseInt(currentYear.endOf('year').format('DDD'), 10);
            var daysInYear = Array.from({
                length: noOfDaysInYear
            }, function (e, i) { return i + 1; });
            var validDay = daysInYear.find(function (d) {
                return isValid(currentYear.clone().dayOfYear(d));
            });
            if (!validDay) {
                return "break";
            }
            years.push(year);
            count++;
        };
        while (count < 20) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
        count = 0;
        year = date.year();
        var _loop_2 = function () {
            year--;
            var currentYear = date.clone().set({
                year: year,
                month: irrelevantMonth,
                date: irrelevantDate
            });
            var noOfDaysInYear = parseInt(currentYear.endOf('year').format('DDD'), 10);
            var daysInYear = Array.from({
                length: noOfDaysInYear
            }, function (e, i) { return i + 1; });
            var validDay = daysInYear.find(function (d) {
                return isValid(currentYear.clone().dayOfYear(d));
            });
            if (!validDay) {
                return "break";
            }
            years.unshift(year);
            count++;
        };
        while (count < 20) {
            var state_2 = _loop_2();
            if (state_2 === "break")
                break;
        }
        return (react_1.default.createElement(Select_1.default, { value: date.year(), options: years.map(function (year) { return ({
                label: "" + year,
                value: year
            }); }), onChange: this.handleYearChange, clearable: false, searchable: false }));
    };
    CustomDaysView.prototype.renderMonthsSelect = function () {
        var classPrefix = this.props.classPrefix;
        var date = this.props.viewDate;
        var year = this.props.viewDate.year();
        var isValid = this.props.isValidDate || this.alwaysValidDate;
        var i = 0;
        var days = [];
        var _loop_3 = function () {
            var currentMonth = date.clone().set({
                year: year,
                month: i,
                date: 1
            });
            var noOfDaysInMonth = parseInt(currentMonth.endOf('month').format('D'), 10);
            var daysInMonth = Array.from({ length: noOfDaysInMonth }, function (e, i) {
                return i + 1;
            });
            var validDay = daysInMonth.find(function (d) {
                return isValid(currentMonth.clone().set('date', d));
            });
            if (validDay) {
                days.push(i);
            }
            i++;
        };
        while (i < 12) {
            _loop_3();
        }
        return (react_1.default.createElement(Select_1.default, { classPrefix: classPrefix, value: date.month(), options: days.map(function (day) { return ({
                label: "" + (day + 1),
                value: day
            }); }), onChange: this.handleMonthChange, clearable: false, searchable: false }));
    };
    CustomDaysView.prototype.renderDay = function (props, currentDate) {
        return react_1.default.createElement("td", tslib_1.__assign({}, props), currentDate.date());
    };
    CustomDaysView.prototype.renderTimes = function () {
        var _this = this;
        var _a = this.props, timeFormat = _a.timeFormat, selectedDate = _a.selectedDate, viewDate = _a.viewDate, isEndDate = _a.isEndDate;
        var date = selectedDate || (isEndDate ? viewDate.endOf('day') : viewDate);
        var inputs = [];
        timeFormat.split(':').forEach(function (format, i) {
            var type = /h/i.test(format)
                ? 'hours'
                : /m/i.test(format)
                    ? 'minutes'
                    : 'seconds';
            var min = 0;
            var max = type === 'hours' ? 23 : 59;
            inputs.push(react_1.default.createElement("input", { key: i + 'input', type: "text", value: date.format(format), min: min, max: max, onChange: function (e) {
                    return _this.setTime(type, Math.max(min, Math.min(parseInt(e.currentTarget.value.replace(/\D/g, ''), 10) || 0, max)));
                } }));
            inputs.push(react_1.default.createElement("span", { key: i + 'divider' }, ":"));
        });
        inputs.length && inputs.pop();
        return react_1.default.createElement("div", null, inputs);
    };
    CustomDaysView.prototype.renderFooter = function () {
        if (!this.props.timeFormat && !this.props.requiredConfirm) {
            return null;
        }
        return (react_1.default.createElement("tfoot", { key: "tf" },
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 7 },
                    this.props.timeFormat ? this.renderTimes() : null,
                    this.props.requiredConfirm ? (react_1.default.createElement("div", { key: "button", className: "rdtActions" },
                        react_1.default.createElement("a", { className: "rdtBtn rdtBtnConfirm", onClick: this.confirm }, "\u786E\u8BA4"),
                        react_1.default.createElement("a", { className: "rdtBtn rdtBtnCancel", onClick: this.cancel }, "\u53D6\u6D88"))) : null))));
    };
    CustomDaysView.prototype.renderDays = function () {
        var date = this.props.viewDate;
        var selected = this.props.selectedDate && this.props.selectedDate.clone();
        var prevMonth = date.clone().subtract(1, 'months');
        var currentYear = date.year();
        var currentMonth = date.month();
        var weeks = [];
        var days = [];
        var renderer = this.props.renderDay || this.renderDay;
        var isValid = this.props.isValidDate || this.alwaysValidDate;
        var classes, isDisabled, dayProps, currentDate;
        // Go to the last week of the previous month
        prevMonth.date(prevMonth.daysInMonth()).startOf('week');
        var lastDay = prevMonth.clone().add(42, 'd');
        while (prevMonth.isBefore(lastDay)) {
            classes = 'rdtDay';
            currentDate = prevMonth.clone();
            if ((prevMonth.year() === currentYear &&
                prevMonth.month() < currentMonth) ||
                prevMonth.year() < currentYear)
                classes += ' rdtOld';
            else if ((prevMonth.year() === currentYear &&
                prevMonth.month() > currentMonth) ||
                prevMonth.year() > currentYear)
                classes += ' rdtNew';
            if (selected && prevMonth.isSame(selected, 'day'))
                classes += ' rdtActive';
            if (prevMonth.isSame(moment_1.default(), 'day'))
                classes += ' rdtToday';
            isDisabled = !isValid(currentDate, selected);
            if (isDisabled)
                classes += ' rdtDisabled';
            dayProps = {
                key: prevMonth.format('M_D'),
                'data-value': prevMonth.date(),
                className: classes
            };
            if (!isDisabled)
                dayProps.onClick = this.handleDayChange;
            days.push(renderer(dayProps, currentDate, selected));
            if (days.length === 7) {
                weeks.push(react_1.default.createElement("tr", { key: prevMonth.format('M_D') }, days));
                days = [];
            }
            prevMonth.add(1, 'd');
        }
        return weeks;
    };
    CustomDaysView.prototype.render = function () {
        var footer = this.renderFooter();
        var date = this.props.viewDate;
        var locale = date.localeData();
        var tableChildren = [
            react_1.default.createElement("thead", { key: "th" },
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { colSpan: 7 },
                        react_1.default.createElement("div", { className: "rdtHeader" },
                            react_1.default.createElement("a", { className: "rdtBtn", onClick: this.props.subtractTime(1, 'months') },
                                react_1.default.createElement("i", { className: "rdtBtnPrev" })),
                            react_1.default.createElement("div", { className: "rdtSelect" }, this.renderYearsSelect()),
                            react_1.default.createElement("div", { className: "rdtSelect" }, this.renderMonthsSelect()),
                            react_1.default.createElement("a", { className: "rdtBtn", onClick: this.props.addTime(1, 'months') },
                                react_1.default.createElement("i", { className: "rdtBtnNext" }))))),
                react_1.default.createElement("tr", null, this.getDaysOfWeek(locale).map(function (day, index) { return (react_1.default.createElement("th", { key: day + index, className: "dow" }, day)); }))),
            react_1.default.createElement("tbody", { key: "tb" }, this.renderDays())
        ];
        footer && tableChildren.push(footer);
        return (react_1.default.createElement("div", { className: "rdtDays" },
            react_1.default.createElement("table", null, tableChildren)));
    };
    CustomDaysView.defaultProps = {
        classPrefix: 'a-'
    };
    return CustomDaysView;
}(react_1.default.Component));
var availableShortcuts = {
    today: {
        label: '今天',
        date: function (now) {
            return now.startOf('day');
        }
    },
    yesterday: {
        label: '昨天',
        date: function (now) {
            return now.add(-1, 'days').startOf('day');
        }
    },
    thisweek: {
        label: '本周一',
        date: function (now) {
            return now.startOf('week').add(-1, 'weeks');
        }
    },
    thismonth: {
        label: '本月初',
        date: function (now) {
            return now.startOf('month');
        }
    },
    prevmonth: {
        label: '上个月初',
        date: function (now) {
            return now.startOf('month').add(-1, 'month');
        }
    },
    prevquarter: {
        label: '上个季节初',
        date: function (now) {
            return now.startOf('quarter').add(-1, 'quarter');
        }
    },
    thisquarter: {
        label: '本季度初',
        date: function (now) {
            return now.startOf('quarter');
        }
    },
    tomorrow: {
        label: '明天',
        date: function (now) {
            return now.add(1, 'days').startOf('day');
        }
    },
    endofthisweek: {
        label: '本周日',
        date: function (now) {
            return now.endOf('week');
        }
    },
    endofthismonth: {
        label: '本月底',
        date: function (now) {
            return now.endOf('month');
        }
    }
};
var advancedShortcuts = [
    {
        regexp: /^(\d+)daysago$/,
        resolve: function (_, days) {
            return {
                label: days + "\u5929\u524D",
                date: function (now) {
                    return now.subtract(days, 'days');
                }
            };
        }
    },
    {
        regexp: /^(\d+)dayslater$/,
        resolve: function (_, days) {
            return {
                label: days + "\u5929\u540E",
                date: function (now) {
                    return now.add(days, 'days');
                }
            };
        }
    },
    {
        regexp: /^(\d+)weeksago$/,
        resolve: function (_, weeks) {
            return {
                label: weeks + "\u5468\u524D",
                date: function (now) {
                    return now.subtract(weeks, 'weeks');
                }
            };
        }
    },
    {
        regexp: /^(\d+)weekslater$/,
        resolve: function (_, weeks) {
            return {
                label: weeks + "\u5468\u540E",
                date: function (now) {
                    return now.add(weeks, 'weeks');
                }
            };
        }
    },
    {
        regexp: /^(\d+)monthsago$/,
        resolve: function (_, months) {
            return {
                label: months + "\u6708\u524D",
                date: function (now) {
                    return now.subtract(months, 'months');
                }
            };
        }
    },
    {
        regexp: /^(\d+)monthslater$/,
        resolve: function (_, months) {
            return {
                label: months + "\u6708\u540E",
                date: function (now) {
                    return now.add(months, 'months');
                }
            };
        }
    },
    {
        regexp: /^(\d+)quartersago$/,
        resolve: function (_, quarters) {
            return {
                label: quarters + "\u5B63\u5EA6\u524D",
                date: function (now) {
                    return now.subtract(quarters, 'quarters');
                }
            };
        }
    },
    {
        regexp: /^(\d+)quarterslater$/,
        resolve: function (_, quarters) {
            return {
                label: quarters + "\u5B63\u5EA6\u540E",
                date: function (now) {
                    return now.add(quarters, 'quarters');
                }
            };
        }
    }
];
var DatePicker = /** @class */ (function (_super) {
    tslib_1.__extends(DatePicker, _super);
    function DatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpened: false,
            isFocused: false,
            value: _this.props.value
                ? (_this.props.utc ? moment_1.default.utc : moment_1.default)(_this.props.value, _this.props.format)
                : undefined
        };
        _this.domRef = function (ref) {
            _this.dom = ref;
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.selectRannge = _this.selectRannge.bind(_this);
        _this.checkIsValidDate = _this.checkIsValidDate.bind(_this);
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.clearValue = _this.clearValue.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        _this.getParent = _this.getParent.bind(_this);
        _this.getTarget = _this.getTarget.bind(_this);
        _this.handlePopOverClick = _this.handlePopOverClick.bind(_this);
        return _this;
    }
    DatePicker.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
                    ? (nextProps.utc ? moment_1.default.utc : moment_1.default)(nextProps.value, nextProps.format)
                    : undefined
            });
        }
    };
    DatePicker.prototype.focus = function () {
        if (!this.dom) {
            return;
        }
        this.dom.focus();
    };
    DatePicker.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    DatePicker.prototype.handleBlur = function () {
        this.setState({
            isFocused: false
        });
    };
    DatePicker.prototype.handleKeyPress = function (e) {
        if (e.key === ' ') {
            this.handleClick();
        }
    };
    DatePicker.prototype.handleClick = function () {
        this.state.isOpened ? this.close() : this.open();
    };
    DatePicker.prototype.handlePopOverClick = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    DatePicker.prototype.open = function (fn) {
        this.props.disabled ||
            this.setState({
                isOpened: true
            }, fn);
    };
    DatePicker.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    DatePicker.prototype.clearValue = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var onChange = this.props.onChange;
        onChange('');
    };
    DatePicker.prototype.handleChange = function (value) {
        var _a = this.props, onChange = _a.onChange, format = _a.format, minTime = _a.minTime, maxTime = _a.maxTime, dateFormat = _a.dateFormat, timeFormat = _a.timeFormat;
        if (!moment_1.default.isMoment(value)) {
            return;
        }
        if (minTime && value && value.isBefore(minTime, 'second')) {
            value = minTime;
        }
        else if (maxTime && value && value.isAfter(maxTime, 'second')) {
            value = maxTime;
        }
        onChange(value.format(format));
        if (dateFormat && !timeFormat) {
            this.close();
        }
    };
    DatePicker.prototype.selectRannge = function (item) {
        var now = moment_1.default();
        this.handleChange(item.date(now));
        this.close();
    };
    DatePicker.prototype.checkIsValidDate = function (currentDate) {
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate;
        if (minDate && currentDate.isBefore(minDate, 'day')) {
            return false;
        }
        else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
            return false;
        }
        return true;
    };
    DatePicker.prototype.getTarget = function () {
        return this.dom;
    };
    DatePicker.prototype.getParent = function () {
        return this.dom;
    };
    DatePicker.prototype.getAvailableShortcuts = function (key) {
        if (availableShortcuts[key]) {
            return availableShortcuts[key];
        }
        for (var i = 0, len = advancedShortcuts.length; i < len; i++) {
            var item = advancedShortcuts[i];
            var m = item.regexp.exec(key);
            if (m) {
                return item.resolve.apply(item, m);
            }
        }
        return null;
    };
    DatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, className = _a.className, value = _a.value, placeholder = _a.placeholder, disabled = _a.disabled, format = _a.format, inputFormat = _a.inputFormat, dateFormat = _a.dateFormat, timeFormat = _a.timeFormat, viewMode = _a.viewMode, timeConstraints = _a.timeConstraints, popOverContainer = _a.popOverContainer, clearable = _a.clearable, shortcuts = _a.shortcuts, utc = _a.utc;
        var isOpened = this.state.isOpened;
        var date = this.state.value;
        return (react_1.default.createElement("div", { tabIndex: 0, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, className: classnames_1.default(ns + "DatePicker", {
                'is-disabled': disabled,
                'is-focused': this.state.isFocused
            }, className), ref: this.domRef, onClick: this.handleClick },
            date ? (react_1.default.createElement("span", { className: ns + "DatePicker-value" }, date.format(inputFormat))) : (react_1.default.createElement("span", { className: ns + "DatePicker-placeholder" }, placeholder)),
            clearable && !disabled && value ? (react_1.default.createElement("a", { className: ns + "DatePicker-clear", onClick: this.clearValue },
                react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
            react_1.default.createElement("a", { className: ns + "DatePicker-toggler" }),
            isOpened ? (react_1.default.createElement(Overlay_1.default, { placement: "left-bottom-left-top  right-bottom-right-top", target: this.getTarget, container: popOverContainer || this.getParent, rootClose: false, show: true },
                react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: ns + "DatePicker-popover", onHide: this.close, overlay: true, onClick: this.handlePopOverClick },
                    shortcuts ? (react_1.default.createElement("ul", { className: ns + "DatePicker-shortcuts" }, (typeof shortcuts === 'string'
                        ? shortcuts.split(',')
                        : Array.isArray(shortcuts)
                            ? shortcuts
                            : []).map(function (key) {
                        var shortcut = _this.getAvailableShortcuts(key);
                        if (!shortcut) {
                            return null;
                        }
                        return (react_1.default.createElement("li", { className: ns + "DatePicker-shortcut", onClick: function () { return _this.selectRannge(shortcut); }, key: key },
                            react_1.default.createElement("a", null, shortcut.label)));
                    }))) : null,
                    react_1.default.createElement(BaseDatePicker, { value: date, onChange: this.handleChange, classPrefix: ns, classnames: classnames_1.default, requiredConfirm: dateFormat && timeFormat, dateFormat: dateFormat, timeFormat: timeFormat, isValidDate: this.checkIsValidDate, viewMode: viewMode, timeConstraints: timeConstraints, input: false, onClose: this.close, utc: utc })))) : null));
    };
    DatePicker.defaultProps = {
        viewMode: 'days',
        shortcuts: ''
    };
    return DatePicker;
}(react_1.default.Component));
exports.DatePicker = DatePicker;
exports.default = theme_1.themeable(DatePicker);
//# sourceMappingURL=./components/DatePicker.js.map
