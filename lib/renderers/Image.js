"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var tpl_1 = require("../utils/tpl");
var ImageField = /** @class */ (function (_super) {
    tslib_1.__extends(ImageField, _super);
    function ImageField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageField.prototype.render = function () {
        var _a = this.props, className = _a.className, defaultImage = _a.defaultImage, description = _a.description, title = _a.title, render = _a.render, data = _a.data, imageClassName = _a.imageClassName, cx = _a.classnames, src = _a.src;
        var finnalSrc = src ? tpl_1.filter(src, data, '| raw') : '';
        var value = this.props.value;
        return (react_1.default.createElement("div", { className: cx('ImageField', className) },
            react_1.default.createElement("img", { className: imageClassName, src: finnalSrc || value || defaultImage }),
            title || description ? (react_1.default.createElement("div", { key: "caption", className: cx('ImageField-caption') },
                title ? (react_1.default.createElement("div", { className: "text-md" }, tpl_1.filter(title, data))) : null,
                render('description', description))) : null));
    };
    ImageField.defaultProps = {
        className: 'thumb-lg',
        imageClassName: 'r',
        defaultImage: 'https://fex.bdstatic.com/n/static/amis/renderers/crud/field/placeholder_cfad9b1.png'
    };
    return ImageField;
}(react_1.default.Component));
exports.ImageField = ImageField;
var ImageFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ImageFieldRenderer, _super);
    function ImageFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)image$/,
            name: 'image'
        })
    ], ImageFieldRenderer);
    return ImageFieldRenderer;
}(ImageField));
exports.ImageFieldRenderer = ImageFieldRenderer;
var ImagesFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ImagesFieldRenderer, _super);
    function ImagesFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImagesFieldRenderer.prototype.render = function () {
        return react_1.default.createElement("p", null, "Todo");
    };
    ImagesFieldRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, ImageField.defaultProps), { multiple: true, delimiter: ',' });
    ImagesFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)images$/
        })
    ], ImagesFieldRenderer);
    return ImagesFieldRenderer;
}(ImageField));
exports.ImagesFieldRenderer = ImagesFieldRenderer;
//# sourceMappingURL=./renderers/Image.js.map
