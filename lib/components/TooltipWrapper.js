"use strict";
/**
 * @file TooltipWrapper
 * @description
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_overlays_1 = require("react-overlays");
var Html_1 = tslib_1.__importDefault(require("./Html"));
var uncontrollable = require("uncontrollable");
var react_dom_1 = require("react-dom");
var Tooltip_1 = tslib_1.__importDefault(require("./Tooltip"));
var theme_1 = require("../theme");
var waitToHide = null;
var TooltipWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(TooltipWrapper, _super);
    function TooltipWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.targetRef = _this.targetRef.bind(_this);
        _this.getTarget = _this.getTarget.bind(_this);
        _this.show = _this.show.bind(_this);
        _this.hide = _this.hide.bind(_this);
        _this.handleShow = _this.handleShow.bind(_this);
        _this.handleHide = _this.handleHide.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);
        _this.state = {
            show: false
        };
        return _this;
    }
    TooltipWrapper.prototype.componentWillUnmount = function () {
        clearTimeout(this.timer);
    };
    TooltipWrapper.prototype.getTarget = function () {
        return this.target ? react_dom_1.findDOMNode(this.target) : null;
    };
    TooltipWrapper.prototype.targetRef = function (ref) {
        this.target = ref;
    };
    TooltipWrapper.prototype.show = function () {
        this.setState({
            show: true
        });
    };
    TooltipWrapper.prototype.hide = function () {
        waitToHide = null;
        this.setState({
            show: false
        });
    };
    TooltipWrapper.prototype.getChildProps = function () {
        var child = React.Children.only(this.props.children);
        return child && child.props;
    };
    TooltipWrapper.prototype.handleShow = function () {
        // clearTimeout(this.timer);
        // const {
        //     delay
        // } = this.props;
        // this.timer = setTimeout(this.show, delay);
        // 顺速让即将消失的层消失。
        waitToHide && waitToHide();
        this.show();
    };
    TooltipWrapper.prototype.handleHide = function () {
        clearTimeout(this.timer);
        var delay = this.props.delay;
        waitToHide = this.hide.bind(this);
        this.timer = setTimeout(this.hide, delay);
    };
    TooltipWrapper.prototype.handleFocus = function (e) {
        var onFocus = this.getChildProps().onFocus;
        this.handleShow();
        onFocus && onFocus(e);
    };
    TooltipWrapper.prototype.handleBlur = function (e) {
        var onBlur = this.getChildProps().onBlur;
        this.handleHide();
        onBlur && onBlur(e);
    };
    TooltipWrapper.prototype.handleMouseOver = function (e) {
        this.handleMouseOverOut(this.handleShow, e, 'fromElement');
    };
    TooltipWrapper.prototype.handleMouseOut = function (e) {
        this.handleMouseOverOut(this.handleHide, e, 'toElement');
    };
    TooltipWrapper.prototype.handleMouseOverOut = function (handler, e, relatedNative) {
        var target = e.currentTarget;
        var related = e.relatedTarget || e.nativeEvent[relatedNative];
        if ((!related || related !== target) && !target.contains(related)) {
            handler(e);
        }
    };
    TooltipWrapper.prototype.handleClick = function (e) {
        var onClick = this.getChildProps().onClick;
        this.state.show ? this.hide() : this.show();
        onClick && onClick(e);
    };
    TooltipWrapper.prototype.render = function () {
        var _a = this.props, tooltip = _a.tooltip, children = _a.children, placement = _a.placement, container = _a.container, trigger = _a.trigger, rootClose = _a.rootClose;
        var child = React.Children.only(children);
        if (!tooltip) {
            return child;
        }
        var childProps = {
            ref: this.targetRef,
            key: 'target'
        };
        var triggers = Array.isArray(trigger) ? trigger.concat() : [trigger];
        if (~triggers.indexOf('click')) {
            childProps.onClick = this.handleClick;
        }
        if (~triggers.indexOf('focus')) {
            childProps.onFocus = this.handleShow;
            childProps.onBlur = this.handleHide;
        }
        if (~triggers.indexOf('hover')) {
            childProps.onMouseOver = this.handleMouseOver;
            childProps.onMouseOut = this.handleMouseOut;
        }
        return [
            child ? React.cloneElement(child, childProps) : null,
            React.createElement(react_overlays_1.Overlay, { key: "overlay", target: this.getTarget, show: this.state.show, onHide: this.handleHide, rootClose: rootClose, placement: placement, container: container },
                React.createElement(Tooltip_1.default, { title: typeof tooltip !== 'string' ? tooltip.title : undefined },
                    React.createElement(Html_1.default, { html: typeof tooltip === 'string' ? tooltip : tooltip.content })))
        ];
    };
    TooltipWrapper.defaultProps = {
        placement: 'top',
        trigger: ['hover', 'focus'],
        rootClose: false,
        delay: 200
    };
    return TooltipWrapper;
}(React.Component));
exports.TooltipWrapper = TooltipWrapper;
exports.default = theme_1.themeable(uncontrollable(TooltipWrapper, {
    show: 'onVisibleChange'
}));
//# sourceMappingURL=./components/TooltipWrapper.js.map
