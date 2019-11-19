"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../../factory");
var Tabs_1 = tslib_1.__importDefault(require("../Tabs"));
var TabsRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TabsRenderer, _super);
    function TabsRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.renderTab = _this.renderTab.bind(_this);
        return _this;
    }
    TabsRenderer.prototype.renderTab = function (tab, _a) {
        var key = _a.key;
        var _b = this.props, renderFormItems = _b.renderFormItems, formMode = _b.formMode, formHorizontal = _b.formHorizontal, $path = _b.$path, render = _b.render, cx = _b.classnames;
        if (renderFormItems &&
            !tab.type &&
            (tab.controls || tab.fieldSet || tab.tabs)) {
            return (react_1.default.createElement("div", { className: cx("Form--" + (tab.mode || formMode || 'normal')) }, renderFormItems(tab, $path.replace(/^.*form\//, ''), {
                mode: tab.mode || formMode,
                horizontal: tab.horizontal || formHorizontal
            })));
        }
        return render("tab/" + key, tab.body || tab.tab || tab);
    };
    TabsRenderer.prototype.render = function () {
        var _a = this.props, children = _a.children, type = _a.type, rest = tslib_1.__rest(_a, ["children", "type"]);
        return react_1.default.createElement(Tabs_1.default, tslib_1.__assign({}, rest, { tabRender: this.renderTab }));
    };
    TabsRenderer.defaultProps = {
        mountOnEnter: false // form 中的不按需渲染
    };
    TabsRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)form(?:.+)?\/control\/tabs$/i,
            weight: -100,
            name: 'tabs-control'
        }),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], TabsRenderer);
    return TabsRenderer;
}(react_1.default.Component));
exports.TabsRenderer = TabsRenderer;
//# sourceMappingURL=./renderers/Form/Tabs.js.map
