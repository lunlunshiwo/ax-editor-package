"use strict";
/**
 * @file Editor
 * @description
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var theme_1 = require("../theme.js");
function noJsExt(raw) {
    return raw.replace(/\.js$/, '');
}
var defaultConfig = {
    url: 'vs/loader.js',
    'vs/nls': {
        availableLanguages: {
            '*': 'zh-cn'
        }
    },
    paths: {}
};
try {
    // fis 编译的话，能正确赋值上，如果不是，那请通过外部参数传递。
    defaultConfig.url = (function(){try {return __uri('../thirds/monaco-editor/vs/loader.js')} catch(e) {return 'monaco-editor/min/vs/loader.js'}})();
    defaultConfig.paths = {
        vs: noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/editor/editor.main.js')} catch(e) {return 'monaco-editor/min/vs/editor/editor.main.js'}})()).replace(/\/vs\/.*$/, ''),
        'vs/base/worker/workerMain': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/base/worker/workerMain.js')} catch(e) {return 'monaco-editor/min/vs/base/worker/workerMain.js'}})()),
        'vs/basic-languages/apex/apex': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/apex/apex.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/apex/apex'}})()),
        'vs/basic-languages/azcli/azcli': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/azcli/azcli.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/azcli/azcli'}})()),
        'vs/basic-languages/clojure/clojure': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/clojure/clojure.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/clojure/clojure'}})()),
        'vs/basic-languages/bat/bat': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/bat/bat.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/bat/bat'}})()),
        'vs/basic-languages/coffee/coffee': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/coffee/coffee.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/coffee/coffee'}})()),
        'vs/basic-languages/cpp/cpp': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/cpp/cpp.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/cpp/cpp'}})()),
        'vs/basic-languages/csharp/csharp': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/csharp/csharp.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/csharp/csharp'}})()),
        'vs/basic-languages/css/css': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/css/css.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/css/css'}})()),
        'vs/basic-languages/dockerfile/dockerfile': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/dockerfile/dockerfile.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/dockerfile/dockerfile'}})()),
        'vs/basic-languages/fsharp/fsharp': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/fsharp/fsharp.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/fsharp/fsharp'}})()),
        'vs/basic-languages/go/go': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/go/go.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/go/go'}})()),
        'vs/basic-languages/handlebars/handlebars': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/handlebars/handlebars.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/handlebars/handlebars'}})()),
        'vs/basic-languages/html/html': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/html/html.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/html/html'}})()),
        'vs/basic-languages/ini/ini': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/ini/ini.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/ini/ini'}})()),
        'vs/basic-languages/java/java': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/java/java.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/java/java'}})()),
        'vs/basic-languages/javascript/javascript': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/javascript/javascript.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/javascript/javascript'}})()),
        'vs/basic-languages/less/less': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/less/less.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/less/less'}})()),
        'vs/basic-languages/lua/lua': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/lua/lua.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/lua/lua'}})()),
        'vs/basic-languages/markdown/markdown': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/markdown/markdown.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/markdown/markdown'}})()),
        'vs/basic-languages/msdax/msdax': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/msdax/msdax.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/msdax/msdax'}})()),
        'vs/basic-languages/objective-c/objective-c': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/objective-c/objective-c.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/objective-c/objective-c'}})()),
        'vs/basic-languages/php/php': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/php/php.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/php/php'}})()),
        'vs/basic-languages/postiats/postiats': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/postiats/postiats.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/postiats/postiats'}})()),
        'vs/basic-languages/powershell/powershell': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/powershell/powershell.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/powershell/powershell'}})()),
        'vs/basic-languages/pug/pug': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/pug/pug.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/pug/pug'}})()),
        'vs/basic-languages/python/python': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/python/python.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/python/python'}})()),
        'vs/basic-languages/r/r': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/r/r.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/r/r'}})()),
        'vs/basic-languages/razor/razor': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/razor/razor.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/razor/razor'}})()),
        'vs/basic-languages/redis/redis': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/redis/redis.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/redis/redis'}})()),
        'vs/basic-languages/redshift/redshift': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/redshift/redshift.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/redshift/redshift'}})()),
        'vs/basic-languages/ruby/ruby': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/ruby/ruby.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/ruby/ruby'}})()),
        'vs/basic-languages/rust/rust': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/rust/rust.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/rust/rust'}})()),
        'vs/basic-languages/sb/sb': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/sb/sb.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/sb/sb'}})()),
        'vs/basic-languages/scheme/scheme': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/scheme/scheme.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/scheme/scheme'}})()),
        'vs/basic-languages/scss/scss': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/scss/scss.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/scss/scss'}})()),
        'vs/basic-languages/shell/shell': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/shell/shell.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/shell/shell'}})()),
        'vs/basic-languages/solidity/solidity': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/solidity/solidity.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/solidity/solidity'}})()),
        'vs/basic-languages/sql/sql': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/sql/sql.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/sql/sql'}})()),
        'vs/basic-languages/st/st': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/st/st.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/st/st'}})()),
        'vs/basic-languages/swift/swift': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/swift/swift.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/swift/swift'}})()),
        'vs/basic-languages/typescript/typescript': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/typescript/typescript.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/typescript/typescript'}})()),
        'vs/basic-languages/vb/vb': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/vb/vb.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/vb/vb'}})()),
        'vs/basic-languages/xml/xml': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/xml/xml.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/xml/xml'}})()),
        'vs/basic-languages/yaml/yaml': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/basic-languages/yaml/yaml.js')} catch(e) {return 'monaco-editor/min/vs/basic-languages/yaml/yaml'}})()),
        'vs/editor/editor.main': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/editor/editor.main.js')} catch(e) {return 'monaco-editor/min/vs/editor/editor.main.js'}})()),
        'vs/editor/editor.main.css': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/editor/editor.main.css')} catch(e) {return 'monaco-editor/min/vs/editor/editor.main.css'}})()),
        'vs/editor/editor.main.nls': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/editor/editor.main.nls.js')} catch(e) {return 'monaco-editor/min/vs/editor/editor.main.nls.js'}})()),
        'vs/editor/editor.main.nls.zh-cn': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/editor/editor.main.nls.zh-cn.js')} catch(e) {return 'monaco-editor/min/vs/editor/editor.main.nls.zh-cn.js'}})()),
        // 'vs/editor/contrib/suggest/media/String_16x.svg': noJsExt((function(){try {return __uri('monaco-editor/min/vs/editor/contrib/suggest/media/String_16x.svg')} catch(e) {return 'monaco-editor/min/vs/editor/contrib/suggest/media/String_16x.svg'}})()),
        // 'vs/editor/contrib/suggest/media/String_inverse_16x.svg': noJsExt((function(){try {return __uri('monaco-editor/min/vs/editor/contrib/suggest/media/String_inverse_16x.svg')} catch(e) {return 'monaco-editor/min/vs/editor/contrib/suggest/media/String_inverse_16x.svg'}})()),
        // 'vs/editor/standalone/browser/quickOpen/symbol-sprite.svg': noJsExt((function(){try {return __uri('monaco-editor/min/vs/editor/standalone/browser/quickOpen/symbol-sprite.svg')} catch(e) {return 'monaco-editor/min/vs/editor/standalone/browser/quickOpen/symbol-sprite.svg'}})()),
        'vs/language/typescript/tsMode': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/language/typescript/tsMode.js')} catch(e) {return 'monaco-editor/min/vs/language/typescript/tsMode.js'}})()),
        // 'vs/language/typescript/lib/typescriptServices': noJsExt((function(){try {return __uri('monaco-editor/min/vs/language/typescript/lib/typescriptServices.js')} catch(e) {return 'monaco-editor/min/vs/language/typescript/lib/typescriptServices.js'}})()),
        'vs/language/typescript/tsWorker': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/language/typescript/tsWorker.js')} catch(e) {return 'monaco-editor/min/vs/language/typescript/tsWorker.js'}})()),
        'vs/language/json/jsonMode': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/language/json/jsonMode.js')} catch(e) {return 'monaco-editor/min/vs/language/json/jsonMode.js'}})()),
        'vs/language/json/jsonWorker': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/language/json/jsonWorker.js')} catch(e) {return 'monaco-editor/min/vs/language/json/jsonWorker.js'}})()),
        'vs/language/html/htmlMode': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/language/html/htmlMode.js')} catch(e) {return 'monaco-editor/min/vs/language/html/htmlMode.js'}})()),
        'vs/language/html/htmlWorker': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/language/html/htmlWorker.js')} catch(e) {return 'monaco-editor/min/vs/language/html/htmlWorker.js'}})()),
        'vs/language/css/cssMode': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/language/css/cssMode.js')} catch(e) {return 'monaco-editor/min/vs/language/css/cssMode.js'}})()),
        'vs/language/css/cssWorker': noJsExt((function(){try {return __uri('../thirds/monaco-editor/vs/language/css/cssWorker.js')} catch(e) {return 'monaco-editor/min/vs/language/css/cssWorker.js'}})())
    };
    // cdn 支持
    /^(https?:)?\/\//.test(defaultConfig.paths.vs) &&
        (window.MonacoEnvironment = {
            getWorkerUrl: function () {
                return "data:text/javascript;charset=utf-8," + encodeURIComponent("\n                self.MonacoEnvironment = {\n                    baseUrl: '" + defaultConfig.paths.vs + "',\n                    paths: " + JSON.stringify(defaultConfig.paths) + "\n                };\n                importScripts('" + (function(){try {return __uri('../thirds/monaco-editor/vs/base/worker/workerMain.js')} catch(e) {return 'monaco-editor/min/vs/base/worker/workerMain.js'}})() + "');");
            }
        });
}
catch (e) { }
function monacoFactory(containerElement, monaco, options) {
    return monaco.editor.create(containerElement, tslib_1.__assign({ autoIndent: true, formatOnType: true, formatOnPaste: true, selectOnLineNumbers: true, scrollBeyondLastLine: false, folding: true, minimap: {
            enabled: false
        } }, options));
}
exports.monacoFactory = monacoFactory;
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.disposes = [];
        _this.wrapperRef = _this.wrapperRef.bind(_this);
        _this.currentValue = props.value;
        return _this;
    }
    Editor.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.options.readOnly !== nextProps.options.readOnly &&
            this.editor) {
            this.editor.updateOptions && this.editor.updateOptions(nextProps.options);
        }
    };
    Editor.prototype.componentDidUpdate = function () {
        if (this.props.value !== this.currentValue && this.editor) {
            var value = String(this.props.value);
            if (this.props.language === 'json') {
                try {
                    value = JSON.stringify(JSON.parse(value), null, 4);
                }
                catch (e) { }
            }
            this.preventTriggerChangeEvent = true;
            this.editor.setValue && this.editor.setValue(value);
            this.preventTriggerChangeEvent = false;
        }
    };
    Editor.prototype.componentWillUnmount = function () {
        if (this.editor) {
            var context = this.props.context || window;
            var monaco = context.monaco || window.monaco;
            var editorWillUnmount = this.props.editorWillUnmount;
            editorWillUnmount && editorWillUnmount(this.editor, monaco);
        }
        this.disposes.forEach(function (_a) {
            var dispose = _a.dispose;
            return dispose();
        });
        this.disposes = [];
    };
    Editor.prototype.wrapperRef = function (ref) {
        this.container = ref;
        if (ref) {
            this.loadMonaco();
        }
        else {
            try {
                this.disposes.forEach(function (_a) {
                    var dispose = _a.dispose;
                    return dispose();
                });
                this.disposes = [];
                if (this.editor) {
                    this.editor.getModel().dispose();
                    this.editor.dispose();
                }
                this.editor = null;
            }
            catch (e) {
                // ignore
            }
        }
    };
    Editor.prototype.loadMonaco = function () {
        var _this = this;
        var requireConfig = this.props.requireConfig;
        var loaderUrl = requireConfig.url || 'vs/loader.js';
        var context = window.monacaAmd ||
            (window.monacaAmd = {
                document: window.document
            });
        var onGotAmdLoader = function () {
            if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
                // Do not use webpack
                if (requireConfig.paths && requireConfig.paths.vs) {
                    context.require.config(requireConfig);
                }
            }
            // Load monaco
            context['require'](['vs/editor/editor.main', 'vs/editor/editor.main.nls.zh-cn'], function () {
                _this.initMonaco();
            });
            // Call the delayed callbacks when AMD loader has been loaded
            if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
                context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false;
                var loaderCallbacks = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;
                if (loaderCallbacks && loaderCallbacks.length) {
                    var currentCallback = loaderCallbacks.shift();
                    while (currentCallback) {
                        currentCallback.fn.call(currentCallback.context);
                        currentCallback = loaderCallbacks.shift();
                    }
                }
            }
        };
        // Load AMD loader if necessary
        if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
            // We need to avoid loading multiple loader.js when there are multiple editors loading concurrently
            //  delay to call callbacks except the first one
            context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ =
                context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ || [];
            context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({
                context: this,
                fn: onGotAmdLoader
            });
        }
        else {
            if (typeof context.require === 'undefined') {
                var loaderScript = context.document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = loaderUrl;
                loaderScript.addEventListener('load', onGotAmdLoader);
                context.document.body.appendChild(loaderScript);
                context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
            }
            else {
                onGotAmdLoader();
            }
        }
    };
    Editor.prototype.initMonaco = function () {
        var value = this.props.value !== null ? this.props.value : this.props.defaultValue;
        var _a = this.props, language = _a.language, editorTheme = _a.editorTheme, options = _a.options, editorFactory = _a.editorFactory;
        var containerElement = this.container;
        if (!containerElement) {
            return;
        }
        var context = this.props.context || window;
        var monaco = context.monaco || window.monaco;
        if (typeof monaco !== 'undefined') {
            // Before initializing monaco editor
            this.editorWillMount(monaco);
            if (this.props.language === 'json') {
                try {
                    value = JSON.stringify(typeof value === 'string' ? JSON.parse(value) : value, null, 4);
                }
                catch (e) {
                    // ignore
                }
            }
            var factory = editorFactory || monacoFactory;
            this.editor = factory(containerElement, monaco, tslib_1.__assign(tslib_1.__assign({}, options), { automaticLayout: true, value: value,
                language: language,
                editorTheme: editorTheme, theme: editorTheme }));
            // json 默认开启验证。
            monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                enableSchemaRequest: true,
                validate: true
            });
            // After initializing monaco editor
            this.editorDidMount(this.editor, monaco);
        }
    };
    Editor.prototype.editorWillMount = function (monaco) {
        var editorWillMount = this.props.editorWillMount;
        editorWillMount && editorWillMount(monaco);
    };
    Editor.prototype.editorDidMount = function (editor, monaco) {
        var _this = this;
        var _a = this.props, editorDidMount = _a.editorDidMount, onChange = _a.onChange, onFocus = _a.onFocus, onBlur = _a.onBlur;
        editorDidMount && editorDidMount(editor, monaco);
        editor.onDidChangeModelContent &&
            this.disposes.push(editor.onDidChangeModelContent(function (event) {
                var value = editor.getValue();
                // Always refer to the latest value
                _this.currentValue = value;
                // Only invoking when user input changed
                if (!_this.preventTriggerChangeEvent && onChange) {
                    onChange(value, event);
                }
            }));
        onFocus &&
            editor.onDidFocusEditorWidget &&
            this.disposes.push(editor.onDidFocusEditorWidget(onFocus));
        onBlur &&
            editor.onDidBlurEditorWidget &&
            this.disposes.push(editor.onDidBlurEditorWidget(onBlur));
    };
    Editor.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, width = _a.width, height = _a.height;
        var style = this.props.style || {};
        style.width = width;
        style.height = height;
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "MonacoEditor", className), style: style, ref: this.wrapperRef }));
    };
    Editor.defaultProps = {
        requireConfig: defaultConfig,
        language: 'javascript',
        editorTheme: 'vs',
        width: '100%',
        height: '100%',
        options: {}
    };
    return Editor;
}(react_1.default.Component));
exports.Editor = Editor;
exports.default = theme_1.themeable(Editor);
//# sourceMappingURL=./components/Editor.js.map
