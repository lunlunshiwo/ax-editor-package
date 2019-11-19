"use strict";
/**
 * @file Toast
 * @description toast提示组件, 单例模式，App级别只需要一个ToastComponent，引入了多个会兼容，也只有第一个生效
 * @author fex
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Transition_1 = tslib_1.__importStar(require("react-transition-group/Transition"));
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Html_1 = tslib_1.__importDefault(require("./Html"));
var helper_1 = require("../utils/helper");
var theme_1 = require("../theme");
var fadeStyles = (_a = {},
    _a[Transition_1.ENTERING] = 'in',
    _a[Transition_1.ENTERED] = 'in',
    _a[Transition_1.EXITING] = 'out',
    _a);
var toastRef = null;
var config = {};
var show = function (content, title, conf, method) {
    if (title === void 0) { title = ''; }
    if (conf === void 0) { conf = {}; }
    if (!toastRef || !toastRef[method]) {
        return;
    }
    toastRef[method](content, title || '', tslib_1.__assign(tslib_1.__assign({}, config), conf));
};
var ToastComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToastComponent, _super);
    function ToastComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 当前ToastComponent是否真正render了
        _this.hasRendered = false;
        _this.state = {
            items: []
        };
        return _this;
    }
    ToastComponent.prototype.componentWillMount = function () {
        var _a = this.props, closeButton = _a.closeButton, timeOut = _a.timeOut, extendedTimeOut = _a.extendedTimeOut;
        config = {
            closeButton: closeButton,
            timeOut: timeOut,
            extendedTimeOut: extendedTimeOut
        };
    };
    ToastComponent.prototype.componentDidMount = function () {
        this.hasRendered = true;
        toastRef = this;
    };
    ToastComponent.prototype.componentWillUnmount = function () {
        if (this.hasRendered) {
            toastRef = null;
        }
    };
    ToastComponent.prototype.notifiy = function (level, content, title, config) {
        var items = this.state.items.concat();
        items.push(tslib_1.__assign(tslib_1.__assign({ title: title, body: content, level: level }, config), { id: helper_1.uuid() }));
        this.setState({
            items: items
        });
    };
    ToastComponent.prototype.success = function (content, title, config) {
        this.notifiy('success', content, title, config);
    };
    ToastComponent.prototype.error = function (content, title, config) {
        this.notifiy('error', content, title, config);
    };
    ToastComponent.prototype.info = function (content, title, config) {
        this.notifiy('info', content, title, config);
    };
    ToastComponent.prototype.warning = function (content, title, config) {
        this.notifiy('warning', content, title, config);
    };
    ToastComponent.prototype.handleDismissed = function (index) {
        var items = this.state.items.concat();
        items.splice(index, 1);
        this.setState({
            items: items
        });
    };
    ToastComponent.prototype.render = function () {
        var _this = this;
        if (toastRef && !this.hasRendered) {
            return null;
        }
        var _a = this.props, ns = _a.classPrefix, className = _a.className, timeOut = _a.timeOut, position = _a.position;
        var items = this.state.items;
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "Toast-wrap " + ns + "Toast-wrap--" + position.replace(/\-(\w)/g, function (_, l) { return l.toUpperCase(); }), className) }, items.map(function (item, index) { return (react_1.default.createElement(ToastMessage, { key: item.id, classPrefix: ns, title: item.title, body: item.body, level: item.level || 'info', timeOut: timeOut, onDismiss: _this.handleDismissed.bind(_this, index) })); })));
    };
    ToastComponent.defaultProps = {
        position: 'top-right',
        closeButton: false,
        timeOut: 5000,
        extendedTimeOut: 3000
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ToastComponent.prototype, "success", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ToastComponent.prototype, "error", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ToastComponent.prototype, "info", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ToastComponent.prototype, "warning", null);
    return ToastComponent;
}(react_1.default.Component));
exports.ToastComponent = ToastComponent;
exports.default = theme_1.themeable(ToastComponent);
var ToastMessage = /** @class */ (function (_super) {
    tslib_1.__extends(ToastMessage, _super);
    function ToastMessage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            visible: false
        };
        // this.content = React.createRef();
        _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        _this.handleEntered = _this.handleEntered.bind(_this);
        _this.close = _this.close.bind(_this);
        return _this;
    }
    ToastMessage.prototype.componentWillUnmount = function () {
        clearTimeout(this.timer);
    };
    ToastMessage.prototype.componentDidMount = function () {
        this.setState({
            visible: true
        });
    };
    ToastMessage.prototype.handleMouseEnter = function () {
        clearTimeout(this.timer);
    };
    ToastMessage.prototype.handleMouseLeave = function () {
        this.handleEntered();
    };
    ToastMessage.prototype.handleEntered = function () {
        var timeOut = this.props.timeOut;
        this.timer = setTimeout(this.close, timeOut);
    };
    ToastMessage.prototype.close = function () {
        clearTimeout(this.timer);
        this.setState({
            visible: false
        });
    };
    ToastMessage.prototype.render = function () {
        var _this = this;
        var _a = this.props, onDismiss = _a.onDismiss, ns = _a.classPrefix, position = _a.position, title = _a.title, body = _a.body, allowHtml = _a.allowHtml, level = _a.level;
        return (react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, in: this.state.visible, timeout: 750, onEntered: this.handleEntered, onExited: onDismiss }, function (status) {
            // if (status === ENTERING) {
            //     // force reflow
            //     // 由于从 mount 进来到加上 in 这个 class 估计是时间太短，上次的样式还没应用进去，所以这里强制reflow一把。
            //     // 否则看不到动画。
            //     this.content.current && this.content.current.offsetWidth;
            // }
            return (react_1.default.createElement("div", { 
                // ref={this.content}
                className: classnames_1.default(ns + "Toast " + ns + "Toast--" + level, fadeStyles[status]), onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave, onClick: _this.close },
                title ? react_1.default.createElement("div", { className: ns + "Toast-title" }, title) : null,
                react_1.default.createElement("div", { className: ns + "Toast-body" }, allowHtml ? react_1.default.createElement(Html_1.default, { html: body }) : body)));
        }));
    };
    ToastMessage.defaultProps = {
        timeOut: 5000,
        classPrefix: '',
        position: 'top-right',
        allowHtml: true,
        level: 'info'
    };
    return ToastMessage;
}(react_1.default.Component));
exports.ToastMessage = ToastMessage;
exports.toast = {
    container: toastRef,
    success: function (content, title, conf) {
        return show(content, title, conf, 'success');
    },
    error: function (content, title, conf) {
        return show(content, title, conf, 'error');
    },
    info: function (content, title, conf) {
        return show(content, title, conf, 'info');
    },
    warning: function (content, title, conf) {
        return show(content, title, conf, 'warning');
    }
};
//# sourceMappingURL=./components/Toast.js.map
