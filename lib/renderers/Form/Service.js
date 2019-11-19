"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../../factory");
var Service_1 = tslib_1.__importDefault(require("../Service"));
var Scoped_1 = require("../../Scoped");
var service_1 = require("../../store/service");
var ServiceRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceRenderer, _super);
    function ServiceRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServiceRenderer.prototype.componentWillMount = function () {
        var scoped = this.context;
        scoped.registerComponent(this);
    };
    ServiceRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    ServiceRenderer.prototype.renderBody = function () {
        var _a = this.props, render = _a.render, store = _a.store, schema = _a.body, controls = _a.controls, tabs = _a.tabs, feildSet = _a.feildSet, renderFormItems = _a.renderFormItems, formMode = _a.formMode, $path = _a.$path, cx = _a.classnames;
        var finnalSchema = store.schema ||
            schema || {
            controls: controls,
            tabs: tabs,
            feildSet: feildSet
        };
        if (finnalSchema &&
            !finnalSchema.type &&
            (finnalSchema.controls || finnalSchema.tabs || finnalSchema.feildSet) &&
            renderFormItems) {
            return (react_1.default.createElement("div", { key: store.schemaKey || 'forms', className: cx("Form--" + (formMode || 'normal')) }, renderFormItems(finnalSchema, 'controls', {
                store: store,
                data: store.data,
                render: render
            })));
        }
        return _super.prototype.renderBody.call(this);
    };
    ServiceRenderer.contextType = Scoped_1.ScopedContext;
    ServiceRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)form\/(.*)\/service$/,
            weight: -100,
            storeType: service_1.ServiceStore.name,
            storeExtendsData: false,
            name: 'service-control'
        })
    ], ServiceRenderer);
    return ServiceRenderer;
}(Service_1.default));
exports.ServiceRenderer = ServiceRenderer;
//# sourceMappingURL=./renderers/Form/Service.js.map
