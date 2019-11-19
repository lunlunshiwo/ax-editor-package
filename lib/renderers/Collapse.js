"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var Collapse_1 = require("../components/Collapse");
var Collapse = /** @class */ (function (_super) {
    tslib_1.__extends(Collapse, _super);
    function Collapse(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            collapsed: false
        };
        _this.toggleCollapsed = _this.toggleCollapsed.bind(_this);
        _this.state.collapsed = !!props.collapsed;
        return _this;
    }
    Collapse.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.collapsed !== nextProps.collapsed) {
            this.setState({
                collapsed: !!nextProps.collapsed
            });
        }
    };
    Collapse.prototype.toggleCollapsed = function () {
        this.props.collapsable !== false &&
            this.setState({
                collapsed: !this.state.collapsed
            });
    };
    Collapse.prototype.render = function () {
        var _a;
        var _b = this.props, ns = _b.classPrefix, cx = _b.classnames, size = _b.size, WrapperComponent = _b.wrapperComponent, HeadingComponent = _b.headingComponent, className = _b.className, title = _b.title, headingClassName = _b.headingClassName, children = _b.children, body = _b.body, bodyClassName = _b.bodyClassName, render = _b.render, collapsable = _b.collapsable;
        return (react_1.default.createElement(WrapperComponent, { className: cx("Collapse", (_a = {
                    'is-collapsed': this.state.collapsed
                },
                _a["Collapse--" + size] = size,
                _a['Collapse--collapsable'] = collapsable,
                _a), className) },
            title ? (react_1.default.createElement(HeadingComponent, { onClick: this.toggleCollapsed, className: cx("Collapse-header", headingClassName) },
                render('heading', title),
                collapsable && react_1.default.createElement("span", { className: cx('Collapse-arrow') }))) : null,
            react_1.default.createElement(Collapse_1.Collapse, { show: collapsable ? !this.state.collapsed : true, classnames: cx, classPrefix: ns },
                react_1.default.createElement("div", { className: cx("Collapse-body", bodyClassName) }, children
                    ? typeof children === 'function'
                        ? children(this.props)
                        : children
                    : body
                        ? render('body', body)
                        : null))));
    };
    Collapse.propsList = [
        'wrapperComponent',
        'headingComponent',
        'bodyClassName',
        'collapsed',
        'headingClassName'
    ];
    Collapse.defaultProps = {
        wrapperComponent: 'div',
        headingComponent: 'h4',
        className: '',
        headingClassName: '',
        bodyClassName: '',
        collapsable: true
    };
    return Collapse;
}(react_1.default.Component));
exports.default = Collapse;
var CollapseRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CollapseRenderer, _super);
    function CollapseRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollapseRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)collapse$/,
            name: 'collapse'
        })
    ], CollapseRenderer);
    return CollapseRenderer;
}(Collapse));
exports.CollapseRenderer = CollapseRenderer;
//# sourceMappingURL=./renderers/Collapse.js.map
