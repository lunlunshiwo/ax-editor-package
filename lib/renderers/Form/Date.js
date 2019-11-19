"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var tpl_builtin_1 = require("../../utils/tpl-builtin");
require("moment/locale/zh-cn");
var DatePicker_1 = tslib_1.__importDefault(require("../../components/DatePicker"));
var DateControl = /** @class */ (function (_super) {
    tslib_1.__extends(DateControl, _super);
    function DateControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateControl.prototype.componentWillMount = function () {
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate, value = _a.value, defaultValue = _a.defaultValue, setPrinstineValue = _a.setPrinstineValue, data = _a.data, format = _a.format;
        if (defaultValue && value === defaultValue) {
            setPrinstineValue(tpl_builtin_1.filterDate(defaultValue, data, format).format(format));
        }
        this.setState({
            minDate: minDate ? tpl_builtin_1.filterDate(minDate, data, format) : undefined,
            maxDate: maxDate ? tpl_builtin_1.filterDate(maxDate, data, format) : undefined
        });
    };
    DateControl.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.defaultValue !== nextProps.defaultValue) {
            nextProps.setPrinstineValue(tpl_builtin_1.filterDate(nextProps.defaultValue, nextProps.data));
        }
        if (props.minDate !== nextProps.minDate ||
            props.maxDate !== nextProps.maxDate ||
            props.data !== nextProps.data) {
            this.setState({
                minDate: nextProps.minDate
                    ? tpl_builtin_1.filterDate(nextProps.minDate, nextProps.data, this.props.format)
                    : undefined,
                maxDate: nextProps.maxDate
                    ? tpl_builtin_1.filterDate(nextProps.maxDate, nextProps.data, this.props.format)
                    : undefined
            });
        }
    };
    DateControl.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, defaultValue = _a.defaultValue, defaultData = _a.defaultData, rest = tslib_1.__rest(_a, ["className", "classPrefix", "defaultValue", "defaultData"]);
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "DateControl", className) },
            react_1.default.createElement(DatePicker_1.default, tslib_1.__assign({}, rest, this.state, { classPrefix: ns }))));
    };
    DateControl.defaultProps = {
        format: 'X',
        viewMode: 'days',
        inputFormat: 'YYYY-MM-DD',
        timeConstrainst: {
            minutes: {
                step: 1
            }
        },
        clearable: true,
        iconClassName: 'fa fa-calendar'
    };
    return DateControl;
}(react_1.default.PureComponent));
exports.default = DateControl;
var DateControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DateControlRenderer, _super);
    function DateControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateControl.defaultProps), { placeholder: '请选择日期', dateFormat: 'YYYY-MM-DD', timeFormat: '', strictMode: false });
    DateControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'date',
            weight: -150
        })
    ], DateControlRenderer);
    return DateControlRenderer;
}(DateControl));
exports.DateControlRenderer = DateControlRenderer;
var DatetimeControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DatetimeControlRenderer, _super);
    function DatetimeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatetimeControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateControl.defaultProps), { placeholder: '请选择日期以及时间', inputFormat: 'YYYY-MM-DD HH:mm:ss', dateFormat: 'LL', timeFormat: 'HH:mm:ss', closeOnSelect: false, strictMode: false });
    DatetimeControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'datetime'
        })
    ], DatetimeControlRenderer);
    return DatetimeControlRenderer;
}(DateControl));
exports.DatetimeControlRenderer = DatetimeControlRenderer;
var TimeControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimeControlRenderer, _super);
    function TimeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateControl.defaultProps), { placeholder: '请选择时间', inputFormat: 'HH:mm', dateFormat: '', timeFormat: 'HH:mm', viewMode: 'time', closeOnSelect: false });
    TimeControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'time'
        })
    ], TimeControlRenderer);
    return TimeControlRenderer;
}(DateControl));
exports.TimeControlRenderer = TimeControlRenderer;
//# sourceMappingURL=./renderers/Form/Date.js.map
