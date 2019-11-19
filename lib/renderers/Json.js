"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var react_json_tree_1 = tslib_1.__importDefault(require("react-json-tree"));
var twilight = {
    scheme: 'twilight',
    author: 'david hart (http://hart-dev.com)',
    base00: '#1e1e1e',
    base01: '#323537',
    base02: '#464b50',
    base03: '#5f5a60',
    base04: '#838184',
    base05: '#a7a7a7',
    base06: '#c3c3c3',
    base07: '#ffffff',
    base08: '#cf6a4c',
    base09: '#cda869',
    base0A: '#f9ee98',
    base0B: '#8f9d6a',
    base0C: '#afc4db',
    base0D: '#7587a6',
    base0E: '#9b859d',
    base0F: '#9b703f',
    tree: {
        border: 0,
        padding: '0 0.625em 0.425em',
        marginTop: '-0.25em',
        marginBottom: '0',
        marginLeft: '0',
        marginRight: 0,
        listStyle: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        whiteSpace: 'nowrap',
        display: 'inline-block'
    }
};
var eighties = {
    scheme: 'eighties',
    author: 'chris kempson (http://chriskempson.com)',
    base00: '#2d2d2d',
    base01: '#393939',
    base02: '#515151',
    base03: '#747369',
    base04: '#a09f93',
    base05: '#d3d0c8',
    base06: '#e8e6df',
    base07: '#f2f0ec',
    base08: '#f2777a',
    base09: '#f99157',
    base0A: '#ffcc66',
    base0B: '#99cc99',
    base0C: '#66cccc',
    base0D: '#6699cc',
    base0E: '#cc99cc',
    base0F: '#d27b53',
    tree: {
        border: 0,
        padding: '0 0.625em 0.425em',
        marginTop: '-0.25em',
        marginBottom: '0',
        marginLeft: '0',
        marginRight: 0,
        listStyle: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        backgroundColor: '#2D2D2D',
        whiteSpace: 'nowrap',
        display: 'inline-block'
    }
};
var themes = {
    twilight: twilight,
    eighties: eighties
};
var JSONField = /** @class */ (function (_super) {
    tslib_1.__extends(JSONField, _super);
    function JSONField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shouldExpandNode = function (keyName, data, level) {
            var levelExpand = _this.props.levelExpand;
            return level < levelExpand;
        };
        return _this;
    }
    JSONField.prototype.valueRenderer = function (raw) {
        if (typeof raw === 'string' && /^\"?https?:\/\//.test(raw)) {
            return (react_1.default.createElement("a", { href: raw.replace(/^\"(.*)\"$/, '$1'), target: "_blank" }, raw));
        }
        return raw;
    };
    JSONField.prototype.render = function () {
        var _a = this.props, className = _a.className, value = _a.value, jsonTheme = _a.jsonTheme, cx = _a.classnames;
        var data = value;
        if (typeof value === 'string') {
            try {
                data = JSON.parse(value);
            }
            catch (e) {
                data = {
                    error: e.message
                };
            }
        }
        var theme = themes[jsonTheme] ? themes[jsonTheme] : themes['twilight'];
        return (react_1.default.createElement("div", { className: cx('JsonField', className) },
            react_1.default.createElement(react_json_tree_1.default, { data: data, theme: theme, shouldExpandNode: this.shouldExpandNode, valueRenderer: this.valueRenderer })));
    };
    JSONField.defaultProps = {
        placeholder: '-',
        levelExpand: 1,
        jsonTheme: 'twilight'
    };
    return JSONField;
}(react_1.default.Component));
exports.JSONField = JSONField;
var JSONFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(JSONFieldRenderer, _super);
    function JSONFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)json$/,
            name: 'json'
        })
    ], JSONFieldRenderer);
    return JSONFieldRenderer;
}(JSONField));
exports.JSONFieldRenderer = JSONFieldRenderer;
//# sourceMappingURL=./renderers/Json.js.map
