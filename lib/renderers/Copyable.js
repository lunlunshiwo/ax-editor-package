"use strict";
/**
 * @file scoped.jsx.
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var hoistNonReactStatic = require("hoist-non-react-statics");
var tpl_1 = require("../utils/tpl");
exports.HocCopyable = function () { return function (Component) {
    var QuickEditComponent = /** @class */ (function (_super) {
        tslib_1.__extends(QuickEditComponent, _super);
        function QuickEditComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QuickEditComponent.prototype.handleClick = function (content) {
            var env = this.props.env;
            env.copy && env.copy(content);
        };
        QuickEditComponent.prototype.render = function () {
            var _a = this.props, copyable = _a.copyable, name = _a.name, className = _a.className, data = _a.data, noHoc = _a.noHoc, cx = _a.classnames;
            if (copyable && !noHoc) {
                var content = tpl_1.filter(copyable.content || '${' + name + ' | raw }', data);
                if (content) {
                    return (react_1.default.createElement(Component, tslib_1.__assign({}, this.props, { className: cx("Field--copyable", className) }),
                        react_1.default.createElement(Component, tslib_1.__assign({}, this.props, { wrapperComponent: '', noHoc: true })),
                        react_1.default.createElement("i", { key: "edit-btn", "data-tooltip": "\u70B9\u51FB\u590D\u5236", className: cx('Field-copyBtn fa fa-clipboard'), onClick: this.handleClick.bind(this, content) })));
                }
            }
            return react_1.default.createElement(Component, tslib_1.__assign({}, this.props));
        };
        QuickEditComponent.ComposedComponent = Component;
        return QuickEditComponent;
    }(react_1.default.PureComponent));
    hoistNonReactStatic(QuickEditComponent, Component);
    return QuickEditComponent;
}; };
exports.default = exports.HocCopyable;
//# sourceMappingURL=./renderers/Copyable.js.map
