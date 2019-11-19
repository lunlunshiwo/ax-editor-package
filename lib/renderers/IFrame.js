"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var tpl_1 = require("../utils/tpl");
var helper_1 = require("../utils/helper");
var Scoped_1 = require("../Scoped");
var IFrame = /** @class */ (function (_super) {
    tslib_1.__extends(IFrame, _super);
    function IFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.IFrameRef = react_1.default.createRef();
        return _this;
    }
    IFrame.prototype.reload = function () {
        this.IFrameRef.current.src = this.IFrameRef
            .current.src;
    };
    IFrame.prototype.render = function () {
        var _a = this.props, className = _a.className, src = _a.src, width = _a.width, height = _a.height, frameBorder = _a.frameBorder, data = _a.data, style = _a.style;
        style = tslib_1.__assign({}, style);
        width !== void 0 && (style.width = width);
        height !== void 0 && (style.height = height);
        return (react_1.default.createElement("iframe", { className: className, frameBorder: frameBorder, style: style, ref: this.IFrameRef, src: src ? tpl_1.filter(src, data) : undefined }));
    };
    IFrame.propsList = ['src', 'className'];
    IFrame.defaultProps = {
        className: '',
        width: '100%',
        height: '100%',
        frameBorder: 0
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], IFrame.prototype, "reload", null);
    return IFrame;
}(react_1.default.Component));
exports.default = IFrame;
var IFrameRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(IFrameRenderer, _super);
    function IFrameRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IFrameRenderer.prototype.componentWillMount = function () {
        var scoped = this.context;
        scoped.registerComponent(this);
    };
    IFrameRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    IFrameRenderer.contextType = Scoped_1.ScopedContext;
    IFrameRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)iframe$/,
            name: 'iframe'
        })
    ], IFrameRenderer);
    return IFrameRenderer;
}(IFrame));
exports.IFrameRenderer = IFrameRenderer;
//# sourceMappingURL=./renderers/IFrame.js.map
