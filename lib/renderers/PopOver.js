"use strict";
/**
 * @file scoped.jsx.
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var hoistNonReactStatic = require("hoist-non-react-statics");
var react_overlays_1 = require("react-overlays");
var PopOver_1 = tslib_1.__importDefault(require("../components/PopOver"));
var Overlay_1 = tslib_1.__importDefault(require("../components/Overlay"));
var allowedPositions = ['center', 'top'];
exports.HocPopOver = function (config) {
    if (config === void 0) { config = {}; }
    return function (Component) {
        var PopOverComponent = /** @class */ (function (_super) {
            tslib_1.__extends(PopOverComponent, _super);
            function PopOverComponent(props) {
                var _this = _super.call(this, props) || this;
                _this.openPopOver = _this.openPopOver.bind(_this);
                _this.closePopOver = _this.closePopOver.bind(_this);
                _this.targetRef = _this.targetRef.bind(_this);
                // this.handleClickOutside = this.handleClickOutside.bind(this);
                _this.state = {
                    isOpened: false
                };
                return _this;
            }
            PopOverComponent.prototype.targetRef = function (ref) {
                this.target = ref;
            };
            PopOverComponent.prototype.openPopOver = function () {
                var _this = this;
                var onPopOverOpen = this.props.onPopOverOpen;
                this.setState({
                    isOpened: true
                }, function () { return onPopOverOpen && onPopOverOpen(_this.props.popOver); });
            };
            PopOverComponent.prototype.closePopOver = function () {
                var _this = this;
                if (!this.state.isOpened) {
                    return;
                }
                var onPopOverClose = this.props.onPopOverClose;
                this.setState({
                    isOpened: false
                }, function () { return onPopOverClose && onPopOverClose(_this.props.popOver); });
            };
            PopOverComponent.prototype.buildSchema = function () {
                var _a = this.props, popOver = _a.popOver, name = _a.name, label = _a.label;
                var schema;
                if (popOver === true) {
                    schema = {
                        type: 'panel',
                        body: '${name}'
                    };
                }
                else if (popOver &&
                    (popOver.mode === 'dialog' || popOver.mode === 'drawer')) {
                    schema = tslib_1.__assign({ type: popOver.mode, actions: [
                            {
                                label: '关闭',
                                type: 'button',
                                actionType: 'cancel'
                            }
                        ] }, popOver);
                }
                else if (popOver) {
                    schema = tslib_1.__assign({ type: 'panel' }, popOver);
                }
                return schema || 'error';
            };
            PopOverComponent.prototype.renderPopOver = function () {
                var _this = this;
                var _a = this.props, popOver = _a.popOver, render = _a.render, popOverContainer = _a.popOverContainer, cx = _a.classnames, ns = _a.classPrefix;
                if (popOver &&
                    (popOver.mode === 'dialog' ||
                        popOver.mode === 'drawer')) {
                    return render('popover-detail', this.buildSchema(), {
                        show: true,
                        onClose: this.closePopOver,
                        onConfirm: this.closePopOver
                    });
                }
                var content = render('popover-detail', this.buildSchema(), {
                    className: cx(popOver.className)
                });
                if (!popOverContainer) {
                    popOverContainer = function () { return react_dom_1.findDOMNode(_this); };
                }
                var position = (popOver && popOver.position) || '';
                var isFixed = /^fixed\-/.test(position);
                return isFixed ? (react_1.default.createElement(react_overlays_1.RootCloseWrapper, { disabled: !this.state.isOpened, onRootClose: this.closePopOver },
                    react_1.default.createElement("div", { className: cx("PopOverAble--fixed PopOverAble--" + position) }, content))) : (react_1.default.createElement(Overlay_1.default, { container: popOverContainer, placement: position || 'center', target: function () { return _this.target; }, onHide: this.closePopOver, rootClose: true, show: true },
                    react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: cx('PopOverAble-popover'), offset: popOver.offset }, content)));
            };
            PopOverComponent.prototype.render = function () {
                var _a = this.props, onQuickChange = _a.onQuickChange, popOver = _a.popOver, popOverEnabled = _a.popOverEnabled, className = _a.className, noHoc = _a.noHoc, cx = _a.classnames, render = _a.render;
                if (!popOver || popOverEnabled === false || noHoc) {
                    return react_1.default.createElement(Component, tslib_1.__assign({}, this.props));
                }
                return (react_1.default.createElement(Component, tslib_1.__assign({}, this.props, { className: cx("Field--popOverAble", className, {
                        in: this.state.isOpened
                    }) }),
                    react_1.default.createElement(Component, tslib_1.__assign({}, this.props, { wrapperComponent: '', noHoc: true, ref: this.targetRef })),
                    react_1.default.createElement("i", { key: "popover-btn", className: cx('Field-popOverBtn fa fa-search-plus'), onClick: this.openPopOver }),
                    this.state.isOpened ? this.renderPopOver() : null));
            };
            PopOverComponent.ComposedComponent = Component;
            return PopOverComponent;
        }(react_1.default.Component));
        hoistNonReactStatic(PopOverComponent, Component);
        return PopOverComponent;
    };
};
exports.default = exports.HocPopOver;
//# sourceMappingURL=./renderers/PopOver.js.map
