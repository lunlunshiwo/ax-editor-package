"use strict";
/**
 * @file Overlay
 * @description
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_overlays_1 = require("react-overlays");
var react_dom_1 = require("react-dom");
var react_1 = tslib_1.__importDefault(require("react"));
var dom_1 = require("../utils/dom");
react_overlays_1.Position.propTypes.placement = react_overlays_1.Overlay.propTypes.placement = function () { return null; };
react_overlays_1.Position.prototype.updatePosition = function (target) {
    this._lastTarget = target;
    if (!target) {
        return this.setState({
            positionLeft: 0,
            positionTop: 0,
            arrowOffsetLeft: null,
            arrowOffsetTop: null
        });
    }
    var overlay = react_dom_1.findDOMNode(this);
    var container = dom_1.getContainer(this.props.container, dom_1.ownerDocument(this).body);
    this.setState(dom_1.calculatePosition(this.props.placement, overlay, target, container, this.props.containerPadding));
};
var Overlay = /** @class */ (function (_super) {
    tslib_1.__extends(Overlay, _super);
    function Overlay(props) {
        return _super.call(this, props) || this;
    }
    Overlay.prototype.render = function () {
        return react_1.default.createElement(react_overlays_1.Overlay, tslib_1.__assign({}, this.props));
    };
    Overlay.defaultProps = {
        placement: 'auto'
    };
    return Overlay;
}(react_1.default.Component));
exports.default = Overlay;
//# sourceMappingURL=./components/Overlay.js.map
