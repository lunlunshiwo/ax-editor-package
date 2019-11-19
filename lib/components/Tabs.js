"use strict";
/**
 * @file Tabs
 * @description 选项卡
 * @author fex
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Transition_1 = tslib_1.__importStar(require("react-transition-group/Transition"));
var theme_1 = require("../theme");
var transitionStyles = (_a = {},
    _a[Transition_1.ENTERING] = 'in',
    _a[Transition_1.ENTERED] = 'in',
    _a);
var Tabs = /** @class */ (function (_super) {
    tslib_1.__extends(Tabs, _super);
    function Tabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tabs.prototype.handleSelect = function (key) {
        var onSelect = this.props.onSelect;
        onSelect && onSelect(key);
    };
    Tabs.prototype.renderNav = function (child, index) {
        var _this = this;
        if (!child) {
            return;
        }
        var _a = this.props, cx = _a.classnames, activeKey = _a.activeKey;
        var _b = child.props, eventKey = _b.eventKey, disabled = _b.disabled, icon = _b.icon, title = _b.title, toolbar = _b.toolbar;
        return (react_1.default.createElement("li", { className: cx('Tabs-link', activeKey === eventKey ? 'is-active' : '', disabled ? 'is-disabled' : ''), key: index, onClick: function () { return (disabled ? '' : _this.handleSelect(eventKey)); } },
            react_1.default.createElement("a", null,
                icon ? react_1.default.createElement("i", { className: icon }) : null,
                " ",
                title),
            react_1.default.isValidElement(toolbar) ? toolbar : null));
    };
    Tabs.prototype.renderTab = function (child, index) {
        if (!child) {
            return;
        }
        var _a = this.props, activeKey = _a.activeKey, classnames = _a.classnames;
        return react_1.default.cloneElement(child, tslib_1.__assign(tslib_1.__assign({}, child.props), { key: index, classnames: classnames, activeKey: activeKey }));
    };
    Tabs.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, cx = _b.classnames, contentClassName = _b.contentClassName, className = _b.className, dMode = _b.mode, tabsMode = _b.tabsMode, children = _b.children, additionBtns = _b.additionBtns;
        if (!Array.isArray(children)) {
            return null;
        }
        var mode = tabsMode || dMode;
        return (react_1.default.createElement("div", { className: cx("Tabs", (_a = {},
                _a["Tabs--" + mode] = mode,
                _a), className) },
            react_1.default.createElement("ul", { className: cx('Tabs-links'), role: "tablist" },
                children.map(function (tab, index) { return _this.renderNav(tab, index); }),
                additionBtns),
            react_1.default.createElement("div", { className: cx('Tabs-content', contentClassName) }, children.map(function (child, index) {
                return _this.renderTab(child, index);
            }))));
    };
    Tabs.defaultProps = {
        mode: '',
        contentClassName: ''
    };
    return Tabs;
}(react_1.default.Component));
exports.Tabs = Tabs;
var Tab = /** @class */ (function (_super) {
    tslib_1.__extends(Tab, _super);
    function Tab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentRef = function (ref) { return (_this.contentDom = ref); };
        return _this;
    }
    Tab.prototype.render = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, mountOnEnter = _a.mountOnEnter, reload = _a.reload, unmountOnExit = _a.unmountOnExit, eventKey = _a.eventKey, activeKey = _a.activeKey, children = _a.children, className = _a.className;
        return (react_1.default.createElement(Transition_1.default, { in: activeKey === eventKey, mountOnEnter: mountOnEnter, unmountOnExit: typeof reload === 'boolean' ? reload : unmountOnExit, timeout: 500 }, function (status) {
            if (status === Transition_1.ENTERING) {
                _this.contentDom.offsetWidth;
            }
            return (react_1.default.createElement("div", { ref: _this.contentRef, className: cx &&
                    cx(transitionStyles[status], activeKey === eventKey ? 'is-active' : '', 'Tabs-pane', className) }, children));
        }));
    };
    return Tab;
}(react_1.default.PureComponent));
exports.Tab = Tab;
exports.default = theme_1.themeable(Tabs);
//# sourceMappingURL=./components/Tabs.js.map
