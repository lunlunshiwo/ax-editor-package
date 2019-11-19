"use strict";
/**
 * @file Modal
 * @description
 * @author fex
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Transition_1 = tslib_1.__importStar(require("react-transition-group/Transition"));
var react_overlays_1 = require("react-overlays");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var ModalManager_1 = require("./ModalManager");
var theme_1 = require("../theme");
var fadeStyles = (_a = {},
    _a[Transition_1.ENTERING] = 'in',
    _a[Transition_1.ENTERED] = 'in',
    _a[Transition_1.EXITING] = 'out',
    _a);
var Modal = /** @class */ (function (_super) {
    tslib_1.__extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleEntered = function () {
            var onEntered = _this.props.onEntered;
            document.body.classList.add("is-modalOpened");
            onEntered && onEntered();
        };
        _this.handleExited = function () {
            var onExited = _this.props.onExited;
            onExited && onExited();
            setTimeout(function () {
                document.querySelector('.amis-dialog-widget') ||
                    document.body.classList.remove("is-modalOpened");
            }, 200);
        };
        _this.modalRef = function (ref) {
            var ns = _this.props.classPrefix;
            if (ref) {
                ModalManager_1.addModal(_this);
                ref.classList.add(ns + "Modal--" + ModalManager_1.current() + "th");
            }
            else {
                ModalManager_1.removeModal();
            }
        };
        return _this;
    }
    Modal.prototype.componentDidMount = function () {
        if (this.props.show) {
            this.handleEntered();
        }
    };
    Modal.prototype.componentWillUnmount = function () {
        if (this.props.show) {
            this.handleExited();
        }
    };
    Modal.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, children = _a.children, container = _a.container, show = _a.show, size = _a.size, overlay = _a.overlay, ns = _a.classPrefix;
        return (react_1.default.createElement(react_overlays_1.Portal, { container: container },
            react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, in: show, timeout: 500, onExited: this.handleExited, onEntered: this.handleEntered }, function (status) {
                var _a;
                return (react_1.default.createElement("div", { ref: _this.modalRef, role: "dialog", className: classnames_1.default("amis-dialog-widget " + ns + "Modal", (_a = {},
                        _a[ns + "Modal--" + size] = size,
                        _a), className) },
                    overlay ? (react_1.default.createElement("div", { className: classnames_1.default(ns + "Modal-overlay", fadeStyles[status]) })) : null,
                    react_1.default.createElement("div", { className: classnames_1.default(ns + "Modal-content", fadeStyles[status]) }, children)));
            })));
    };
    Modal.defaultProps = {
        container: document.body,
        size: '',
        overlay: true
    };
    return Modal;
}(react_1.default.Component));
exports.Modal = Modal;
exports.default = theme_1.themeable(Modal);
//# sourceMappingURL=./components/Modal.js.map
