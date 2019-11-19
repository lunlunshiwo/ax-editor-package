"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var MappingField = /** @class */ (function (_super) {
    tslib_1.__extends(MappingField, _super);
    function MappingField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MappingField.prototype.render = function () {
        var _a = this.props, className = _a.className, value = _a.value, placeholder = _a.placeholder, map = _a.map, render = _a.render, cx = _a.classnames;
        var viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
        var key = value === true ? '1' : value;
        if (typeof value !== 'undefined' && map && (map[key] || map['*'])) {
            viewValue = render('tpl', map[key] || map['*']);
        }
        return react_1.default.createElement("span", { className: cx('MappingField', className) }, viewValue);
    };
    MappingField.defaultProps = {
        placeholder: '-',
        map: {
            '*': '通配值'
        }
    };
    return MappingField;
}(react_1.default.Component));
exports.MappingField = MappingField;
var MappingFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MappingFieldRenderer, _super);
    function MappingFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MappingFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)(?:map|mapping)$/,
            name: 'mapping'
        })
    ], MappingFieldRenderer);
    return MappingFieldRenderer;
}(MappingField));
exports.MappingFieldRenderer = MappingFieldRenderer;
//# sourceMappingURL=./renderers/Mapping.js.map
