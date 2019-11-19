"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var CityDB_1 = tslib_1.__importStar(require("./CityDB"));
var theme_1 = require("../../theme");
var components_1 = require("../../components");
var helper_1 = require("../../utils/helper");
var Options_1 = require("./Options");
var CityPicker = /** @class */ (function (_super) {
    tslib_1.__extends(CityPicker, _super);
    function CityPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            code: 0,
            province: '',
            provinceCode: 0,
            city: '',
            cityCode: 0,
            district: '',
            districtCode: 0,
            street: ''
        };
        return _this;
    }
    CityPicker.prototype.componentWillMount = function () {
        this.syncIn();
    };
    CityPicker.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.value !== nextProps.value) {
            this.syncIn(nextProps);
        }
    };
    CityPicker.prototype.handleProvinceChange = function (option) {
        this.setState({
            province: option.label,
            provinceCode: option.value,
            city: '',
            cityCode: 0,
            district: '',
            districtCode: 0,
            street: '',
            code: option.value
        }, this.syncOut);
    };
    CityPicker.prototype.handleCityChange = function (option) {
        if (option.value % 100) {
            return this.handleDistrictChange(option, {
                cityCode: option.value
            });
        }
        this.setState({
            city: option.label,
            cityCode: option.value,
            district: '',
            districtCode: 0,
            street: '',
            code: option.value
        }, this.syncOut);
    };
    CityPicker.prototype.handleDistrictChange = function (option, otherStates) {
        if (otherStates === void 0) { otherStates = {}; }
        this.setState(tslib_1.__assign(tslib_1.__assign({}, otherStates), { district: option.label, districtCode: option.value, street: '', code: option.value }), this.syncOut);
    };
    CityPicker.prototype.handleStreetChange = function (e) {
        this.setState({
            street: e.currentTarget.value
        });
    };
    CityPicker.prototype.handleStreetEnd = function () {
        this.syncOut();
    };
    CityPicker.prototype.syncIn = function (props) {
        if (props === void 0) { props = this.props; }
        var value = props.value, delimiter = props.delimiter;
        var state = {
            code: 0,
            province: '',
            provinceCode: 0,
            city: '',
            cityCode: 0,
            district: '',
            districtCode: 0,
            street: ''
        };
        var code = (value && value.code) ||
            (typeof value === 'number' && value) ||
            (typeof value === 'string' && /(\d{6})/.test(value) && RegExp.$1);
        if (code && CityDB_1.default[code]) {
            code = parseInt(code, 10);
            state.code = code;
            var provinceCode = code - (code % 10000);
            if (CityDB_1.default[provinceCode]) {
                state.provinceCode = provinceCode;
                state.province = CityDB_1.default[provinceCode];
            }
            var cityCode = code - (code % 100);
            if (CityDB_1.default[cityCode]) {
                state.cityCode = cityCode;
                state.city = CityDB_1.default[cityCode];
            }
            if (code % 100) {
                state.district = CityDB_1.default[code];
                state.districtCode = code;
            }
        }
        else if (value) {
            // todo 模糊查找
        }
        if (value && value.street) {
            state.street = value.street;
        }
        else if (typeof value === 'string' && ~value.indexOf(delimiter)) {
            state.street = value.slice(value.indexOf(delimiter) + delimiter.length);
        }
        this.setState(state);
    };
    CityPicker.prototype.syncOut = function () {
        var _a = this.props, onChange = _a.onChange, 
        // allowStreet,
        joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter;
        var _b = this.state, code = _b.code, province = _b.province, city = _b.city, district = _b.district
        // street
        ;
        if (typeof extractValue === 'undefined' ? joinValues : extractValue) {
            code
                ? onChange(
                /*allowStreet && street ? [code, street].join(delimiter) :*/ String(code))
                : onChange('');
        }
        else {
            onChange({
                code: code,
                province: province,
                city: city,
                district: district
                // street
            });
        }
    };
    CityPicker.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, disabled = _a.disabled, allowCity = _a.allowCity, allowDistrict = _a.allowDistrict
        // allowStreet
        ;
        var _b = this.state, provinceCode = _b.provinceCode, cityCode = _b.cityCode, districtCode = _b.districtCode, street = _b.street;
        return (react_1.default.createElement("div", { className: cx('CityPicker', className) },
            react_1.default.createElement(components_1.Select, { disabled: disabled, options: CityDB_1.province.map(function (item) { return ({
                    label: CityDB_1.default[item],
                    value: item
                }); }), value: provinceCode, onChange: this.handleProvinceChange }),
            provinceCode &&
                allowDistrict &&
                Array.isArray(CityDB_1.district[provinceCode]) ? (react_1.default.createElement(components_1.Select, { disabled: disabled, options: CityDB_1.district[provinceCode].map(function (item) { return ({
                    label: CityDB_1.default[item],
                    value: item
                }); }), value: districtCode, onChange: this.handleDistrictChange })) : allowCity && CityDB_1.city[provinceCode] && CityDB_1.city[provinceCode].length ? (react_1.default.createElement(components_1.Select, { disabled: disabled, options: CityDB_1.city[provinceCode].map(function (item) { return ({
                    label: CityDB_1.default[item],
                    value: item
                }); }), value: cityCode, onChange: this.handleCityChange })) : null,
            cityCode &&
                allowDistrict &&
                CityDB_1.district[provinceCode] &&
                CityDB_1.district[provinceCode][cityCode] ? (react_1.default.createElement(components_1.Select, { disabled: disabled, options: CityDB_1.district[provinceCode][cityCode].map(function (item) { return ({
                    label: CityDB_1.default[item],
                    value: item
                }); }), value: districtCode, onChange: this.handleDistrictChange })) : null));
    };
    var _a, _b, _c, _d, _e;
    CityPicker.defaultProps = {
        joinValues: true,
        extractValue: true,
        delimiter: ',',
        allowCity: true,
        allowDistrict: true
        // allowStreet: false
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleProvinceChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _b : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleCityChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _c : Object, typeof (_d = typeof Partial !== "undefined" && Partial) === "function" ? _d : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleDistrictChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _e : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleStreetChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "handleStreetEnd", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "syncIn", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CityPicker.prototype, "syncOut", null);
    return CityPicker;
}(react_1.default.Component));
exports.CityPicker = CityPicker;
var ThemedCity = theme_1.themeable(CityPicker);
exports.default = ThemedCity;
var LocationControl = /** @class */ (function (_super) {
    tslib_1.__extends(LocationControl, _super);
    function LocationControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocationControl.prototype.render = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange, allowCity = _a.allowCity, allowDistrict = _a.allowDistrict, extractValue = _a.extractValue, joinValues = _a.joinValues
        // allowStreet
        ;
        return (react_1.default.createElement(ThemedCity, { value: value, onChange: onChange, allowCity: allowCity, allowDistrict: allowDistrict, extractValue: extractValue, joinValues: joinValues }));
    };
    return LocationControl;
}(react_1.default.Component));
exports.LocationControl = LocationControl;
var CheckboxControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxControlRenderer, _super);
    function CheckboxControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'city',
            sizeMutable: false
        })
    ], CheckboxControlRenderer);
    return CheckboxControlRenderer;
}(LocationControl));
exports.CheckboxControlRenderer = CheckboxControlRenderer;
//# sourceMappingURL=./renderers/Form/City.js.map
