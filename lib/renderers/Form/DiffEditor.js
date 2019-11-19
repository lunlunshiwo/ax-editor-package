"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../../factory");
var Item_1 = require("./Item");
var tpl_1 = require("../../utils/tpl");
var LazyComponent_1 = tslib_1.__importDefault(require("../../components/LazyComponent"));
var debouce = require("lodash/debounce");
function loadComponent() {
    return new Promise(function (resolve) {
        return require(['../../components/Editor'], function (component) {
            return resolve(component.default);
        });
    });
}
function normalizeValue(value) {
    if (value && typeof value !== 'string') {
        value = JSON.stringify(value, null, 4);
    }
    return value;
}
var DiffEditor = /** @class */ (function (_super) {
    tslib_1.__extends(DiffEditor, _super);
    function DiffEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            focused: false
        };
        _this.toDispose = [];
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.editorFactory = _this.editorFactory.bind(_this);
        _this.handleEditorMounted = _this.handleEditorMounted.bind(_this);
        _this.handleModifiedEditorChange = _this.handleModifiedEditorChange.bind(_this);
        _this.updateContainerSize = debouce(_this.updateContainerSize.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        _this.toDispose.push(_this.updateContainerSize.cancel);
        return _this;
    }
    DiffEditor.prototype.componentWillUnmount = function () {
        this.toDispose.forEach(function (fn) { return fn(); });
    };
    DiffEditor.prototype.handleFocus = function () {
        this.setState({
            focused: true
        });
    };
    DiffEditor.prototype.handleBlur = function () {
        this.setState({
            focused: false
        });
    };
    DiffEditor.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, data = _a.data, value = _a.value, diffValue = _a.diffValue;
        if (this.originalEditor &&
            diffValue &&
            (diffValue !== prevProps.diffValue || data !== prevProps.data)) {
            this.originalEditor
                .getModel()
                .setValue(/^\$(?:([a-z0-9_.]+)|{.+})$/.test(diffValue)
                ? tpl_1.filter(normalizeValue(diffValue || ''), data, '| raw')
                : normalizeValue(diffValue));
        }
        if (this.modifiedEditor &&
            value &&
            value !== prevProps.value &&
            !this.state.focused) {
            this.modifiedEditor.getModel().setValue(normalizeValue(value));
        }
    };
    DiffEditor.prototype.editorFactory = function (containerElement, monaco, options) {
        return monaco.editor.createDiffEditor(containerElement, options);
    };
    DiffEditor.prototype.handleEditorMounted = function (editor, monaco) {
        var _a = this.props, value = _a.value, data = _a.data, language = _a.language, diffValue = _a.diffValue;
        this.monaco = monaco;
        this.editor = editor;
        this.modifiedEditor = editor.getModifiedEditor();
        this.originalEditor = editor.getOriginalEditor();
        this.toDispose.push(this.modifiedEditor.onDidFocusEditorWidget(this.handleFocus).dispose);
        this.toDispose.push(this.modifiedEditor.onDidBlurEditorWidget(this.handleBlur).dispose);
        this.toDispose.push(this.modifiedEditor.onDidChangeModelContent(this.handleModifiedEditorChange).dispose);
        this.editor.setModel({
            original: this.monaco.editor.createModel(/^\$(?:([a-z0-9_.]+)|{.+})$/.test(diffValue)
                ? tpl_1.filter(normalizeValue(diffValue || ''), data, '| raw')
                : normalizeValue(diffValue), language),
            modified: this.monaco.editor.createModel(normalizeValue(value), language)
        });
        this.updateContainerSize();
    };
    DiffEditor.prototype.handleModifiedEditorChange = function () {
        var onChange = this.props.onChange;
        onChange && onChange(this.modifiedEditor.getModel().getValue());
        this.updateContainerSize();
    };
    DiffEditor.prototype.updateContainerSize = function () {
        var editor = this.modifiedEditor;
        var parentDom = editor._domElement.parentNode.parentNode.parentNode;
        var configuration = editor.getConfiguration();
        var lineHeight = configuration.lineHeight;
        var lineCount = editor.getModel().getLineCount();
        var contentHeight = lineHeight * lineCount;
        var horizontalScrollbarHeight = configuration.layoutInfo.horizontalScrollbarHeight;
        var editorHeight = contentHeight + horizontalScrollbarHeight;
        parentDom.style.cssText = "height:" + editorHeight + "px";
    };
    DiffEditor.prototype.render = function () {
        var _a = this.props, className = _a.className, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, size = _a.size, options = _a.options, language = _a.language, theme = _a.theme, cx = _a.classnames;
        return (react_1.default.createElement("div", { className: cx('EditorControl', size ? "EditorControl--" + size : '', className, {
                'is-focused': this.state.focused
            }) },
            react_1.default.createElement(LazyComponent_1.default, { getComponent: loadComponent, value: value, onChange: onChange, disabled: disabled, language: language, theme: theme, editorDidMount: this.handleEditorMounted, editorFactory: this.editorFactory, options: tslib_1.__assign(tslib_1.__assign({}, options), { readOnly: disabled }) })));
    };
    DiffEditor.defaultProps = {
        language: 'javascript',
        theme: 'vs',
        options: {
            automaticLayout: false,
            selectOnLineNumbers: true,
            scrollBeyondLastLine: false,
            folding: true,
            minimap: {
                enabled: false
            }
        },
        diffValue: ''
    };
    return DiffEditor;
}(react_1.default.Component));
exports.DiffEditor = DiffEditor;
var DiffEditorControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DiffEditorControlRenderer, _super);
    function DiffEditorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiffEditorControlRenderer.defaultProps = tslib_1.__assign({}, DiffEditor.defaultProps);
    DiffEditorControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: "diff-editor",
            sizeMutable: false
        })
    ], DiffEditorControlRenderer);
    return DiffEditorControlRenderer;
}(DiffEditor));
exports.DiffEditorControlRenderer = DiffEditorControlRenderer;
var DiffEditorRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DiffEditorRenderer, _super);
    function DiffEditorRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiffEditorRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DiffEditor.defaultProps), { disabled: true });
    DiffEditorRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)diff-editor$/,
            name: 'diff-editor'
        })
    ], DiffEditorRenderer);
    return DiffEditorRenderer;
}(DiffEditor));
exports.DiffEditorRenderer = DiffEditorRenderer;
//# sourceMappingURL=./renderers/Form/DiffEditor.js.map
