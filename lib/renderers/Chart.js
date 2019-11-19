"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var service_1 = require("../store/service");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var LazyComponent_1 = tslib_1.__importDefault(require("../components/LazyComponent"));
var resize_sensor_1 = require("../utils/resize-sensor");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var api_1 = require("../utils/api");
var Scoped_1 = require("../Scoped");
var Chart = /** @class */ (function (_super) {
    tslib_1.__extends(Chart, _super);
    function Chart(props) {
        var _this = _super.call(this, props) || this;
        _this.refFn = _this.refFn.bind(_this);
        _this.reload = _this.reload.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    Chart.prototype.componentWillMount = function () {
        var _a = this.props, config = _a.config, api = _a.api, data = _a.data, initFetch = _a.initFetch, source = _a.source;
        this.mounted = true;
        if (source && /^\$(?:([a-z0-9_.]+)|{.+})$/.test(source)) {
            var ret = tpl_builtin_1.resolveVariableAndFilter(source, data, '| raw');
            ret && this.renderChart(ret);
        }
        else if (api && initFetch !== false) {
            this.reload();
        }
        config && this.renderChart(config);
    };
    Chart.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var api = (props.api && props.api.url) || props.api;
        if (api_1.isApiOutdated(prevProps.api, props.api, prevProps.data, props.data)) {
            this.reload();
        }
        else if (props.source &&
            /^\$(?:([a-z0-9_.]+)|{.+})$/.test(props.source)) {
            var prevRet = prevProps.source
                ? tpl_builtin_1.resolveVariableAndFilter(prevProps.source, prevProps.data, '| raw')
                : null;
            var ret = tpl_builtin_1.resolveVariableAndFilter(props.source, props.data, '| raw');
            if (prevRet !== ret) {
                this.renderChart(ret || {});
            }
        }
        else if (props.config !== prevProps.config) {
            this.renderChart(props.config || {});
        }
    };
    Chart.prototype.componentWillUnmount = function () {
        this.mounted = false;
        clearTimeout(this.timer);
    };
    Chart.prototype.handleClick = function (ctx) {
        var _a = this.props, onAction = _a.onAction, clickAction = _a.clickAction;
        clickAction && onAction && onAction(null, clickAction, ctx);
    };
    Chart.prototype.refFn = function (ref) {
        var _this = this;
        var chartRef = this.props.chartRef;
        if (ref) {
            require(['echarts', 'echarts/map/js/china', 'echarts/map/js/world'], function (echarts) {
                window.echarts = echarts;
                _this.echarts = echarts.init(ref);
                _this.echarts.on('click', _this.handleClick);
                _this.unSensor = resize_sensor_1.resizeSensor(ref, function () {
                    var width = ref.offsetWidth;
                    var height = ref.offsetHeight;
                    _this.echarts.resize({
                        width: width,
                        height: height
                    });
                });
                chartRef && chartRef(_this.echarts);
                _this.renderChart();
            });
        }
        else {
            chartRef && chartRef(null);
            this.unSensor && this.unSensor();
        }
        this.ref = ref;
    };
    Chart.prototype.reload = function (query) {
        var _this = this;
        var _a = this.props, api = _a.api, env = _a.env, store = _a.store, interval = _a.interval;
        if (query) {
            return this.receive(query);
        }
        else if (!env || !env.fetcher || !api_1.isEffectiveApi(api, store.data)) {
            return;
        }
        clearTimeout(this.timer);
        if (this.reloadCancel) {
            this.reloadCancel();
            delete this.reloadCancel;
            this.echarts && this.echarts.hideLoading();
        }
        this.echarts && this.echarts.showLoading();
        env
            .fetcher(api, store.data, {
            cancelExecutor: function (executor) { return (_this.reloadCancel = executor); }
        })
            .then(function (result) {
            delete _this.reloadCancel;
            _this.renderChart(result.data || {});
            _this.echarts && _this.echarts.hideLoading();
            interval &&
                _this.mounted &&
                (_this.timer = setTimeout(_this.reload, Math.max(interval, 3000)));
        })
            .catch(function (reason) {
            if (env.isCancel(reason)) {
                return;
            }
            env.notify('error', reason);
            _this.echarts && _this.echarts.hideLoading();
        });
    };
    Chart.prototype.receive = function (data) {
        var store = this.props.store;
        store.updateData(data);
        this.reload();
    };
    Chart.prototype.renderChart = function (config) {
        config && (this.pending = config);
        if (!this.echarts) {
            return;
        }
        var onDataFilter = this.props.onDataFilter;
        config = config || this.pending;
        if (typeof config === 'string') {
            config = new Function('return ' + config)();
        }
        onDataFilter && (config = onDataFilter(config) || config);
        if (config) {
            try {
                this.echarts.setOption(config, this.props.replaceChartOption);
            }
            catch (e) {
                console.warn(e);
            }
        }
    };
    Chart.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, width = _a.width, height = _a.height, ns = _a.classPrefix;
        var style = this.props.style || {};
        width && (style.width = width);
        height && (style.height = height);
        return (react_1.default.createElement(LazyComponent_1.default, { unMountOnHidden: true, placeholder: react_1.default.createElement("div", { className: classnames_1.default(ns + "Chart", className), style: style },
                react_1.default.createElement("div", { className: ns + "Chart-placeholder" },
                    react_1.default.createElement("i", { key: "loading", className: "fa fa-spinner fa-spin fa-2x fa-fw" }))), component: function () { return (react_1.default.createElement("div", { className: classnames_1.default(ns + "Chart", className), style: style, ref: _this.refFn })); } }));
    };
    Chart.defaultProps = {
        offsetY: 50,
        replaceChartOption: false
    };
    Chart.propsList = [];
    return Chart;
}(react_1.default.Component));
exports.Chart = Chart;
var ChartRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ChartRenderer, _super);
    function ChartRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChartRenderer.prototype.componentWillMount = function () {
        _super.prototype.componentWillMount.call(this);
        var scoped = this.context;
        scoped.registerComponent(this);
    };
    ChartRenderer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    ChartRenderer.contextType = Scoped_1.ScopedContext;
    ChartRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)chart$/,
            storeType: service_1.ServiceStore.name,
            name: 'chart'
        })
    ], ChartRenderer);
    return ChartRenderer;
}(Chart));
exports.ChartRenderer = ChartRenderer;
//# sourceMappingURL=./renderers/Chart.js.map
