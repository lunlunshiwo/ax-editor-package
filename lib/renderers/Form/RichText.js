"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var LazyComponent_1 = tslib_1.__importDefault(require("../../components/LazyComponent"));
var helper_1 = require("../../utils/helper");
function loadComponent() {
    return new Promise(function (resolve) {
        return require(['../../components/RichText'], function (component) {
            return resolve(component.default);
        });
    });
}
var RichTextControl = /** @class */ (function (_super) {
    tslib_1.__extends(RichTextControl, _super);
    function RichTextControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            focused: false
        };
        _this.config = null;
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.config = tslib_1.__assign(tslib_1.__assign({ imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'], imageDefaultAlign: 'left', imageEditButtons: props.imageEditable
                ? [
                    'imageReplace',
                    'imageAlign',
                    'imageRemove',
                    '|',
                    'imageLink',
                    'linkOpen',
                    'linkEdit',
                    'linkRemove',
                    '-',
                    'imageDisplay',
                    'imageStyle',
                    'imageAlt',
                    'imageSize'
                ]
                : [], key: props.env.richTextToken }, props.options), { editorClass: props.editorClass, placeholderText: props.placeholder, imageUploadURL: props.reciever, imageUploadParams: {
                from: 'rich-text'
            }, videoUploadURL: props.videoReciever, videoUploadParams: {
                from: 'rich-text'
            }, events: tslib_1.__assign(tslib_1.__assign({}, (props.options && props.options.events)), { 'froalaEditor.focus': _this.handleFocus, 'froalaEditor.blur': _this.handleBlur }) });
        if (props.buttons) {
            _this.config.toolbarButtonsSM = props.buttons;
            _this.config.toolbarButtonsMD = props.buttons;
            _this.config.toolbarButtonsXS = props.buttons;
            _this.config.toolbarButtons = props.buttons;
        }
        return _this;
    }
    RichTextControl.prototype.handleFocus = function () {
        this.setState({
            focused: true
        });
    };
    RichTextControl.prototype.handleBlur = function () {
        this.setState({
            focused: false
        });
    };
    RichTextControl.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, size = _a.size;
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "RichTextControl", className, {
                'is-focused': this.state.focused,
                'is-disabled': disabled
            }) },
            react_1.default.createElement(LazyComponent_1.default, { getComponent: loadComponent, model: value, onModelChange: disabled ? helper_1.noop : onChange, onFocus: this.handleFocus, onBlur: this.handleBlur, config: this.config, disabled: disabled })));
    };
    RichTextControl.defaultProps = {
        imageEditable: true,
        reciever: '/api/upload/image',
        videoReciever: '/api/upload/video',
        placeholder: '请输入',
        options: {
            language: 'zh_cn',
            toolbarButtonsSM: [
                'paragraphFormat',
                'quote',
                'color',
                '|',
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                '|',
                'formatOL',
                'formatUL',
                'align',
                '|',
                'insertLink',
                'insertImage',
                'insertEmotion',
                'insertTable',
                '|',
                'undo',
                'redo',
                'html'
            ],
            toolbarButtonsMD: [
                'paragraphFormat',
                'quote',
                'color',
                '|',
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                '|',
                'formatOL',
                'formatUL',
                'align',
                '|',
                'insertLink',
                'insertImage',
                'insertEmotion',
                'insertTable',
                '|',
                'undo',
                'redo',
                'html'
            ],
            toolbarButtons: [
                'paragraphFormat',
                'quote',
                'color',
                '|',
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                '|',
                'formatOL',
                'formatUL',
                'align',
                '|',
                'insertLink',
                'insertImage',
                'insertEmotion',
                'insertTable',
                '|',
                'undo',
                'redo',
                'html'
            ]
        }
    };
    return RichTextControl;
}(react_1.default.Component));
exports.default = RichTextControl;
var RichTextControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(RichTextControlRenderer, _super);
    function RichTextControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RichTextControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'rich-text',
            sizeMutable: false
        })
    ], RichTextControlRenderer);
    return RichTextControlRenderer;
}(RichTextControl));
exports.RichTextControlRenderer = RichTextControlRenderer;
//# sourceMappingURL=./renderers/Form/RichText.js.map
