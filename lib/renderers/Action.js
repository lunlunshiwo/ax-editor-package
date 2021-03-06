"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var tpl_1 = require("../utils/tpl");
var Button_1 = tslib_1.__importDefault(require("../components/Button"));
var pick = require("lodash/pick");
var ActionProps = [
    'dialog',
    'drawer',
    'url',
    'link',
    'confirmText',
    'tooltip',
    'disabledTip',
    'className',
    'asyncApi',
    'redirect',
    'size',
    'level',
    'primary',
    'feedback',
    'api',
    'blank',
    'tooltipPlacement',
    'to',
    'content',
    'required',
    'type',
    'actionType',
    'label',
    'icon',
    'reload',
    'target',
    'close',
    'messages',
    'mergeData',
    'index',
    'copy',
    'payload',
    'requireSelected'
];
var Remark_1 = require("./Remark");
var theme_1 = require("../theme");
var helper_1 = require("../utils/helper");
var allowedType = ['button', 'submit', 'reset'];
var Action = /** @class */ (function (_super) {
    tslib_1.__extends(Action, _super);
    function Action() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Action.prototype.handleAction = function (e) {
        var _a = this.props, onAction = _a.onAction, onClick = _a.onClick, disabled = _a.disabled;
        var result = onClick && onClick(e, this.props);
        if (disabled || e.isDefaultPrevented() || result === false || !onAction) {
            return;
        }
        e.preventDefault();
        var action = pick(this.props, ActionProps);
        onAction(e, action);
    };
    Action.prototype.render = function () {
        var _a, _b;
        var _c = this.props, type = _c.type, label = _c.label, icon = _c.icon, iconClassName = _c.iconClassName, primary = _c.primary, size = _c.size, level = _c.level, disabled = _c.disabled, block = _c.block, className = _c.className, componentClass = _c.componentClass, tooltip = _c.tooltip, disabledTip = _c.disabledTip, tooltipPlacement = _c.tooltipPlacement, actionType = _c.actionType, link = _c.link, data = _c.data, activeClassName = _c.activeClassName, isCurrentUrl = _c.isCurrentUrl, isMenuItem = _c.isMenuItem, active = _c.active, activeLevel = _c.activeLevel, tooltipContainer = _c.tooltipContainer, cx = _c.classnames;
        var isActive = !!active;
        if (actionType === 'link' && !isActive && link && isCurrentUrl) {
            isActive = isCurrentUrl(link);
        }
        return isMenuItem ? (react_1.default.createElement("a", { className: cx(className, (_a = {},
                _a[activeClassName || 'is-active'] = isActive,
                _a['is-disabled'] = disabled,
                _a)), onClick: this.handleAction },
            label,
            icon ? react_1.default.createElement("i", { className: cx('Button-icon', icon) }) : null)) : (react_1.default.createElement(Button_1.default, { className: cx(className, (_b = {},
                _b[activeClassName || 'is-active'] = isActive,
                _b)), size: size, level: activeLevel && isActive
                ? activeLevel
                : level || (primary ? 'primary' : undefined), onClick: this.handleAction, type: type && ~allowedType.indexOf(type) ? type : 'button', disabled: disabled, componentClass: componentClass, tooltip: Remark_1.filterContents(tooltip, data), disabledTip: Remark_1.filterContents(disabledTip, data), placement: tooltipPlacement, tooltipContainer: tooltipContainer, block: block, iconOnly: !!(icon && !label && level !== 'link') },
            label ? react_1.default.createElement("span", null, tpl_1.filter(label, data)) : null,
            icon ? react_1.default.createElement("i", { className: cx('Button-icon', icon, iconClassName) }) : null));
    };
    var _a;
    Action.defaultProps = {
        type: 'button',
        componentClass: 'button',
        tooltipPlacement: 'bottom',
        activeClassName: 'is-active'
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Action.prototype, "handleAction", null);
    return Action;
}(react_1.default.Component));
exports.Action = Action;
exports.default = theme_1.themeable(Action);
var ActionRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ActionRenderer, _super);
    function ActionRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionRenderer.prototype.handleAction = function (e, action) {
        var _a = this.props, env = _a.env, onAction = _a.onAction, data = _a.data;
        if (action.confirmText && env.confirm) {
            env
                .confirm(tpl_1.filter(action.confirmText, data))
                .then(function (confirmed) { return confirmed && onAction(e, action, data); });
        }
        else {
            onAction(e, action, data);
        }
    };
    ActionRenderer.prototype.isCurrentAction = function (link) {
        var _a = this.props, env = _a.env, data = _a.data;
        return env.isCurrentUrl(tpl_1.filter(link, data));
    };
    ActionRenderer.prototype.render = function () {
        var _a = this.props, env = _a.env, disabled = _a.disabled, btnDisabled = _a.btnDisabled, rest = tslib_1.__rest(_a, ["env", "disabled", "btnDisabled"]);
        return (react_1.default.createElement(Action, tslib_1.__assign({}, rest, { disabled: disabled || btnDisabled, onAction: this.handleAction, isCurrentUrl: this.isCurrentAction, tooltipContainer: env.getModalContainer ? env.getModalContainer : undefined })));
    };
    var _b;
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ActionRenderer.prototype, "handleAction", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ActionRenderer.prototype, "isCurrentAction", null);
    ActionRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)action$/,
            name: 'action'
        })
    ], ActionRenderer);
    return ActionRenderer;
}(react_1.default.Component));
exports.ActionRenderer = ActionRenderer;
var ButtonRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonRenderer, _super);
    function ButtonRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)button$/,
            name: 'button'
        })
    ], ButtonRenderer);
    return ButtonRenderer;
}(ActionRenderer));
exports.ButtonRenderer = ButtonRenderer;
var SubmitRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(SubmitRenderer, _super);
    function SubmitRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubmitRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)submit$/,
            name: 'submit'
        })
    ], SubmitRenderer);
    return SubmitRenderer;
}(ActionRenderer));
exports.SubmitRenderer = SubmitRenderer;
var ResetRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ResetRenderer, _super);
    function ResetRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResetRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)reset$/,
            name: 'reset'
        })
    ], ResetRenderer);
    return ResetRenderer;
}(ActionRenderer));
exports.ResetRenderer = ResetRenderer;
//# sourceMappingURL=./renderers/Action.js.map
