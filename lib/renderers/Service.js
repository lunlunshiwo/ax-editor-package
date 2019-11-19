"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var service_1 = require("../store/service");
var tpl_1 = require("../utils/tpl");
var Scoped_1 = require("../Scoped");
var api_1 = require("../utils/api");
var components_1 = require("../components");
var Service = /** @class */ (function (_super) {
    tslib_1.__extends(Service, _super);
    function Service(props) {
        var _this = _super.call(this, props) || this;
        _this.handleQuery = _this.handleQuery.bind(_this);
        _this.reload = _this.reload.bind(_this);
        _this.silentReload = _this.silentReload.bind(_this);
        _this.initInterval = _this.initInterval.bind(_this);
        return _this;
    }
    Service.prototype.componentDidMount = function () {
        var _a = this.props, schemaApi = _a.schemaApi, initFetchSchema = _a.initFetchSchema, api = _a.api, initFetch = _a.initFetch, initFetchOn = _a.initFetchOn, store = _a.store, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed;
        this.mounted = true;
        if (api_1.isEffectiveApi(schemaApi, store.data, initFetchSchema)) {
            store.fetchSchema(schemaApi, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            });
        }
        if (api_1.isEffectiveApi(api, store.data, initFetch, initFetchOn)) {
            store
                .fetchInitData(api, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.initInterval);
        }
    };
    Service.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var store = props.store;
        var _a = props.messages, fetchSuccess = _a.fetchSuccess, fetchFailed = _a.fetchFailed;
        api_1.isApiOutdated(prevProps.api, props.api, prevProps.data, props.data) &&
            store
                .fetchData(props.api, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.initInterval);
        api_1.isApiOutdated(prevProps.schemaApi, props.schemaApi, prevProps.data, props.data) &&
            store
                .fetchSchema(props.schemaApi, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.initInterval);
    };
    Service.prototype.componentWillUnmount = function () {
        this.mounted = false;
        clearTimeout(this.timer);
    };
    Service.prototype.initInterval = function (value) {
        var _a = this.props, interval = _a.interval, silentPolling = _a.silentPolling, stopAutoRefreshWhen = _a.stopAutoRefreshWhen, data = _a.data;
        interval &&
            this.mounted &&
            (!stopAutoRefreshWhen || !tpl_1.evalExpression(stopAutoRefreshWhen, data)) &&
            (this.timer = setTimeout(silentPolling ? this.silentReload : this.reload, Math.max(interval, 3000)));
        return value;
    };
    Service.prototype.reload = function (subpath, query, ctx, silent) {
        if (query) {
            return this.receive(query);
        }
        var _a = this.props, schemaApi = _a.schemaApi, initFetchSchema = _a.initFetchSchema, api = _a.api, initFetch = _a.initFetch, initFetchOn = _a.initFetchOn, store = _a.store, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed;
        clearTimeout(this.timer);
        if (api_1.isEffectiveApi(schemaApi, store.data)) {
            store
                .fetchSchema(schemaApi, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.initInterval);
        }
        if (api_1.isEffectiveApi(api, store.data)) {
            store
                .fetchData(api, store.data, {
                silent: silent,
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.initInterval);
        }
    };
    Service.prototype.silentReload = function (target, query) {
        this.reload(target, query, undefined, true);
    };
    Service.prototype.receive = function (values) {
        var store = this.props.store;
        store.updateData(values);
        this.reload();
    };
    Service.prototype.handleQuery = function (query) {
        this.receive(query);
    };
    Service.prototype.renderBody = function () {
        var _a = this.props, render = _a.render, store = _a.store, schema = _a.body, cx = _a.classnames;
        return (react_1.default.createElement("div", { className: cx('Service-body') }, render('body', store.schema || schema, {
            key: store.schemaKey || 'body',
            onQuery: this.handleQuery
        })));
    };
    Service.prototype.render = function () {
        var _a = this.props, className = _a.className, store = _a.store, render = _a.render, ns = _a.classPrefix, cx = _a.classnames;
        return (react_1.default.createElement("div", { className: cx(ns + "Service", className) },
            store.error ? (react_1.default.createElement("div", { className: cx("Alert Alert--danger") },
                react_1.default.createElement("button", { className: cx('Alert-close'), onClick: function () { return store.updateMessage(''); }, type: "button" },
                    react_1.default.createElement("span", null, "\u00D7")),
                store.msg)) : null,
            this.renderBody(),
            react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: store.loading })));
    };
    Service.defaultProps = {
        messages: {
            fetchFailed: '初始化失败'
        }
    };
    Service.propsList = [];
    return Service;
}(react_1.default.Component));
exports.default = Service;
var ServiceRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceRenderer, _super);
    function ServiceRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServiceRenderer.prototype.componentWillMount = function () {
        // super.componentWillMount();
        var scoped = this.context;
        scoped.registerComponent(this);
    };
    ServiceRenderer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    ServiceRenderer.contextType = Scoped_1.ScopedContext;
    ServiceRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)service$/,
            storeType: service_1.ServiceStore.name,
            name: 'service'
        })
    ], ServiceRenderer);
    return ServiceRenderer;
}(Service));
exports.ServiceRenderer = ServiceRenderer;
//# sourceMappingURL=./renderers/Service.js.map
