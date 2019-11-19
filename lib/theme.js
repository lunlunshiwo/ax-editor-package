"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// 主题管理
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importDefault(require("react"));
var hoistNonReactStatic = require("hoist-non-react-statics");
var themes = {
    default: {}
};
function theme(name, config) {
    themes[name] = tslib_1.__assign({}, config);
}
exports.theme = theme;
var fns = {};
function makeClassnames(ns) {
    if (ns && fns[ns]) {
        return fns[ns];
    }
    var fn = function () {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        var str = classnames_1.default.apply(void 0, classes);
        return str && ns
            ? str
                .replace(/(^|\s)([A-Z])/g, '$1' + ns + '$2')
                .replace(/(^|\s)\:/g, '$1')
            : str || '';
    };
    ns && (fns[ns] = fn);
    return fn;
}
exports.makeClassnames = makeClassnames;
function hasTheme(theme) {
    return !!themes[theme];
}
exports.hasTheme = hasTheme;
function setDefaultTheme(theme) {
    if (hasTheme(theme)) {
        exports.defaultTheme = theme;
    }
}
exports.setDefaultTheme = setDefaultTheme;
function classnames() {
    var _a;
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return (_a = getTheme(exports.defaultTheme)).classnames.apply(_a, classes);
}
exports.classnames = classnames;
function getClassPrefix() {
    return getTheme(exports.defaultTheme).classPrefix;
}
exports.getClassPrefix = getClassPrefix;
function getTheme(theme) {
    if (!themes[theme]) {
        throw new Error("Theme with name \"" + theme + "\" does not exist!");
    }
    var config = themes[theme];
    if (!config.getRendererConfig) {
        config.getRendererConfig = function (name) {
            return config.renderers && name ? config.renderers[name] : null;
        };
    }
    if (!config.classnames) {
        var ns = config.classPrefix;
        config.classnames = config.classnames || makeClassnames(ns);
    }
    return config;
}
exports.getTheme = getTheme;
exports.ThemeContext = react_1.default.createContext('theme');
exports.defaultTheme = 'default';
function themeable(ComposedComponent) {
    var EnhancedComponent = /** @class */ (function (_super) {
        tslib_1.__extends(EnhancedComponent, _super);
        function EnhancedComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EnhancedComponent.prototype.render = function () {
            var theme = this.props.theme || this.context || exports.defaultTheme;
            var config = hasTheme(theme) ? getTheme(theme) : getTheme(exports.defaultTheme);
            var injectedProps = {
                classPrefix: config.classPrefix,
                classnames: config.classnames
            };
            return (react_1.default.createElement(exports.ThemeContext.Provider, { value: theme },
                react_1.default.createElement(ComposedComponent, tslib_1.__assign({}, this.props /* todo, 解决这个类型问题 */, injectedProps))));
        };
        EnhancedComponent.displayName = "Themeable(" + (ComposedComponent.displayName ||
            ComposedComponent.name) + ")";
        EnhancedComponent.contextType = exports.ThemeContext;
        EnhancedComponent.ComposedComponent = ComposedComponent;
        return EnhancedComponent;
    }(react_1.default.Component));
    return hoistNonReactStatic(EnhancedComponent, ComposedComponent);
}
exports.themeable = themeable;
//# sourceMappingURL=./theme.js.map
