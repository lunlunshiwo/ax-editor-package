"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var tpl_1 = require("../utils/tpl");
var StatusField = /** @class */ (function (_super) {
    tslib_1.__extends(StatusField, _super);
    function StatusField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusField.prototype.render = function () {
        var _a = this.props, className = _a.className, placeholder = _a.placeholder, map = _a.map, labelMap = _a.labelMap, cx = _a.classnames, data = _a.data;
        var value = this.props.value;
        var viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
        var wrapClassName = '';
        if (value !== undefined && value !== '' && map) {
            if (typeof value === 'boolean') {
                value = value ? 1 : 0;
            }
            else if (/^\d+$/.test(value)) {
                value = parseInt(value, 10) || 0;
            }
            wrapClassName = "StatusField--" + value;
            viewValue = (react_1.default.createElement("i", { className: cx('StatusField-icon', map[value]), key: "icon" }));
            if (labelMap && labelMap[value]) {
                viewValue = [
                    viewValue,
                    react_1.default.createElement("span", { className: cx('StatusField-label'), key: "label" }, tpl_1.filter(labelMap[value], data))
                ];
            }
        }
        return (react_1.default.createElement("span", { className: cx('StatusField', wrapClassName, className) }, viewValue));
    };
    StatusField.defaultProps = {
        placeholder: '-',
        map: {
            0: 'fa fa-times text-danger',
            1: 'fa fa-check text-success'
        },
        labelMap: {
        // 0: '失败',
        // 1: '成功'
        }
    };
    return StatusField;
}(react_1.default.Component));
exports.StatusField = StatusField;
var StatusFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(StatusFieldRenderer, _super);
    function StatusFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)status$/,
            name: 'status'
        })
    ], StatusFieldRenderer);
    return StatusFieldRenderer;
}(StatusField));
exports.StatusFieldRenderer = StatusFieldRenderer;
//# sourceMappingURL=./renderers/Status.js.map
