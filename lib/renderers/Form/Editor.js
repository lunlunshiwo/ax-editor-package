"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var LazyComponent_1 = tslib_1.__importDefault(require("../../components/LazyComponent"));
var debouce = require("lodash/debounce");
function loadComponent() {
    return new Promise(function (resolve) {
        return require(['../../components/Editor'], function (component) {
            return resolve(component.default);
        });
    });
}
var EditorControl = /** @class */ (function (_super) {
    tslib_1.__extends(EditorControl, _super);
    function EditorControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            focused: false
        };
        _this.toDispose = [];
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleEditorMounted = _this.handleEditorMounted.bind(_this);
        _this.updateContainerSize = debouce(_this.updateContainerSize.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        _this.toDispose.push(_this.updateContainerSize.cancel);
        return _this;
    }
    EditorControl.prototype.componentWillUnmount = function () {
        this.toDispose.forEach(function (fn) { return fn(); });
    };
    EditorControl.prototype.handleFocus = function () {
        this.setState({
            focused: true
        });
    };
    EditorControl.prototype.handleBlur = function () {
        this.setState({
            focused: false
        });
    };
    EditorControl.prototype.handleEditorMounted = function (editor, monaco) {
        this.editor = editor;
        this.toDispose.push(editor.onDidFocusEditorWidget(this.updateContainerSize).dispose);
        this.toDispose.push(editor.onDidChangeModelContent(this.updateContainerSize).dispose);
        this.props.editorDidMount && this.props.editorDidMount(editor, monaco);
    };
    EditorControl.prototype.updateContainerSize = function () {
        var editor = this.editor;
        var parentDom = editor._domElement.parentNode;
        var configuration = editor.getConfiguration();
        var lineHeight = configuration.lineHeight;
        var lineCount = editor.getModel().getLineCount();
        var contentHeight = lineHeight * lineCount;
        var horizontalScrollbarHeight = configuration.layoutInfo.horizontalScrollbarHeight;
        var editorHeight = contentHeight + horizontalScrollbarHeight;
        parentDom.style.cssText = "height:" + editorHeight + "px";
    };
    EditorControl.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, ns = _b.classPrefix, cx = _b.classnames, value = _b.value, onChange = _b.onChange, disabled = _b.disabled, options = _b.options, language = _b.language, editorTheme = _b.editorTheme, size = _b.size;
        var finnalValue = value;
        if (finnalValue && typeof finnalValue !== 'string') {
            finnalValue = JSON.stringify(finnalValue, null, 4);
        }
        return (react_1.default.createElement("div", { className: cx("EditorControl", (_a = {
                    'is-focused': this.state.focused
                },
                _a["EditorControl--" + size] = size,
                _a), className) },
            react_1.default.createElement(LazyComponent_1.default, { classPrefix: ns, getComponent: loadComponent, value: finnalValue, onChange: onChange, disabled: disabled, onFocus: this.handleFocus, onBlur: this.handleBlur, language: language, editorTheme: editorTheme, editorDidMount: this.handleEditorMounted, options: tslib_1.__assign(tslib_1.__assign({}, options), { readOnly: disabled }) })));
    };
    EditorControl.defaultProps = {
        language: 'javascript',
        editorTheme: 'vs',
        options: {
            automaticLayout: true,
            selectOnLineNumbers: true,
            scrollBeyondLastLine: false,
            folding: true,
            minimap: {
                enabled: false
            }
        }
    };
    return EditorControl;
}(react_1.default.Component));
exports.default = EditorControl;
exports.availableLanguages = [
    'bat',
    'c',
    'coffeescript',
    'cpp',
    'csharp',
    'css',
    'dockerfile',
    'fsharp',
    'go',
    'handlebars',
    'html',
    'ini',
    'java',
    'javascript',
    'json',
    'less',
    'lua',
    'markdown',
    'msdax',
    'objective-c',
    'php',
    'plaintext',
    'postiats',
    'powershell',
    'pug',
    'python',
    'r',
    'razor',
    'ruby',
    'sb',
    'scss',
    'sol',
    'sql',
    'swift',
    'typescript',
    'vb',
    'xml',
    'yaml'
];
exports.EditorControls = exports.availableLanguages.map(function (lang) {
    var EditorControlRenderer = /** @class */ (function (_super) {
        tslib_1.__extends(EditorControlRenderer, _super);
        function EditorControlRenderer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EditorControlRenderer.lang = lang;
        EditorControlRenderer.displayName = "" + lang[0].toUpperCase() + lang.substring(1) + "EditorControlRenderer";
        EditorControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, EditorControl.defaultProps), { language: lang });
        EditorControlRenderer = tslib_1.__decorate([
            Item_1.FormItem({
                type: lang + "-editor",
                sizeMutable: false
            })
        ], EditorControlRenderer);
        return EditorControlRenderer;
    }(EditorControl));
    return EditorControlRenderer;
});
var JavascriptEditorControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(JavascriptEditorControlRenderer, _super);
    function JavascriptEditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JavascriptEditorControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, EditorControl.defaultProps), { language: 'javascript' });
    JavascriptEditorControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'js-editor',
            sizeMutable: false
        })
    ], JavascriptEditorControlRenderer);
    return JavascriptEditorControlRenderer;
}(EditorControl));
var TypescriptEditorControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TypescriptEditorControlRenderer, _super);
    function TypescriptEditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypescriptEditorControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, EditorControl.defaultProps), { language: 'typescript' });
    TypescriptEditorControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'ts-editor',
            sizeMutable: false
        })
    ], TypescriptEditorControlRenderer);
    return TypescriptEditorControlRenderer;
}(EditorControl));
var EditorControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(EditorControlRenderer, _super);
    function EditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditorControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, EditorControl.defaultProps), { language: 'javascript' });
    EditorControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: "editor",
            sizeMutable: false
        })
    ], EditorControlRenderer);
    return EditorControlRenderer;
}(EditorControl));
exports.EditorControlRenderer = EditorControlRenderer;
//# sourceMappingURL=./renderers/Form/Editor.js.map
