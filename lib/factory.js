"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var qs_1 = tslib_1.__importDefault(require("qs"));
var index_1 = require("./store/index");
var mobx_state_tree_1 = require("mobx-state-tree");
var api_1 = require("./utils/api");
var helper_1 = require("./utils/helper");
var mobx_react_1 = require("mobx-react");
var filter_schema_1 = tslib_1.__importDefault(require("./utils/filter-schema"));
var hoistNonReactStatic = require("hoist-non-react-statics");
var omit = require("lodash/omit");
var difference = require("lodash/difference");
var isPlainObject = require("lodash/isPlainObject");
var Scoped_1 = tslib_1.__importDefault(require("./Scoped"));
var theme_1 = require("./theme");
var find = require("lodash/find");
var Alert2_1 = tslib_1.__importDefault(require("./components/Alert2"));
var components_1 = require("./components");
var renderers = [];
var rendererNames = [];
var schemaFilters = [];
var anonymousIndex = 1;
function addSchemaFilter(fn) {
    schemaFilters.push(fn);
}
exports.addSchemaFilter = addSchemaFilter;
function filterSchema(schema, render, props) {
    return schemaFilters.reduce(function (schema, filter) { return filter(schema, render, props); }, schema);
}
exports.filterSchema = filterSchema;
function Renderer(config) {
    return function (component) {
        var renderer = registerRenderer(tslib_1.__assign(tslib_1.__assign({}, config), { component: component }));
        return renderer.component;
    };
}
exports.Renderer = Renderer;
function registerRenderer(config) {
    if (!config.test) {
        throw new TypeError('config.test is required');
    }
    else if (!config.component) {
        throw new TypeError('config.component is required');
    }
    config.weight = config.weight || 0;
    config.Renderer = config.component;
    config.name = config.name || "anonymous-" + anonymousIndex++;
    if (~rendererNames.indexOf(config.name)) {
        throw new Error("The renderer with name \"" + config.name + "\" has already exists, please try another name!");
    }
    if (config.storeType && config.component) {
        config.component = HocStoreFactory({
            storeType: config.storeType,
            extendsData: config.storeExtendsData
        })(mobx_react_1.observer(config.component));
    }
    if (config.isolateScope) {
        config.component = Scoped_1.default(config.component);
    }
    var idx = helper_1.findIndex(renderers, function (item) { return config.weight < item.weight; });
    ~idx ? renderers.splice(idx, 0, config) : renderers.push(config);
    rendererNames.push(config.name);
    return config;
}
exports.registerRenderer = registerRenderer;
function unRegisterRenderer(config) {
    var idx = typeof config === 'string'
        ? helper_1.findIndex(renderers, function (item) { return item.name === config; })
        : renderers.indexOf(config);
    ~idx && renderers.splice(idx, 1);
    // 清空渲染器定位缓存
    cache = {};
}
exports.unRegisterRenderer = unRegisterRenderer;
function renderChildren(prefix, node, props) {
    if (Array.isArray(node)) {
        return node.map(function (node, index) {
            return renderChild(prefix + "/" + index, node, tslib_1.__assign(tslib_1.__assign({}, props), { key: "" + (props.key ? props.key + "-" : '') + index }));
        });
    }
    return renderChild(prefix, node, props);
}
exports.renderChildren = renderChildren;
function renderChild(prefix, node, props) {
    if (Array.isArray(node)) {
        return renderChildren(prefix, node, props);
    }
    var typeofnode = typeof node;
    var schema = typeofnode === 'string' || typeofnode === 'number'
        ? { type: 'tpl', tpl: String(node) }
        : node;
    var detectData = schema.detectField === '&' ? props : props[schema.detectField || 'data'];
    var exprProps = detectData ? filter_schema_1.default(schema, detectData) : null;
    if (exprProps &&
        (exprProps.hidden ||
            exprProps.visible === false ||
            schema.hidden ||
            schema.visible === false ||
            props.hidden ||
            props.visible === false)) {
        return null;
    }
    var transform = props.propsTransform;
    if (transform) {
        delete props.propsTransform;
        props = transform(props);
    }
    return (react_1.default.createElement(SchemaRenderer, tslib_1.__assign({}, props, exprProps, { schema: schema, "$path": "" + (prefix ? prefix + "/" : '') + ((schema && schema.type) || '') })));
}
exports.renderChild = renderChild;
var RootStoreContext = react_1.default.createContext(undefined);
var RootRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(RootRenderer, _super);
    function RootRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            error: null,
            errorInfo: null
        };
        return _this;
    }
    RootRenderer.prototype.componentDidCatch = function (error, errorInfo) {
        console.error(error);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    };
    RootRenderer.prototype.resolveDefinitions = function (name) {
        var definitions = this.props.schema.definitions;
        if (!name || helper_1.isEmpty(definitions)) {
            return {};
        }
        return definitions && definitions[name];
    };
    RootRenderer.prototype.render = function () {
        var _a = this.state, error = _a.error, errorInfo = _a.errorInfo;
        if (errorInfo) {
            return errorRenderer(error, errorInfo);
        }
        var _b = this.props, schema = _b.schema, rootStore = _b.rootStore, env = _b.env, pathPrefix = _b.pathPrefix, location = _b.location, data = _b.data, rest = tslib_1.__rest(_b, ["schema", "rootStore", "env", "pathPrefix", "location", "data"]);
        var theme = env.theme;
        var query = (location && location.query) ||
            (location && location.search && qs_1.default.parse(location.search.substring(1))) ||
            (window.location.search && qs_1.default.parse(window.location.search.substring(1)));
        var finalData = query
            ? helper_1.createObject(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (data && data.__super ? data.__super : null)), query), { query: query }), data)
            : data;
        return (react_1.default.createElement(RootStoreContext.Provider, { value: rootStore },
            react_1.default.createElement(theme_1.ThemeContext.Provider, { value: this.props.theme || 'default' }, renderChild(pathPrefix || '', isPlainObject(schema)
                ? tslib_1.__assign({ type: 'page' }, schema) : schema, tslib_1.__assign(tslib_1.__assign({}, rest), { resolveDefinitions: this.resolveDefinitions, location: location, data: finalData, env: env, classnames: theme.classnames, classPrefix: theme.classPrefix })))));
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], RootRenderer.prototype, "resolveDefinitions", null);
    return RootRenderer;
}(react_1.default.Component));
exports.RootRenderer = RootRenderer;
exports.ScopedRootRenderer = Scoped_1.default(RootRenderer);
var defaultOmitList = [
    'type',
    'name',
    '$ref',
    'className',
    'data',
    'children',
    'ref',
    'visible',
    'visibleOn',
    'hidden',
    'hiddenOn',
    'disabled',
    'disabledOn',
    'component',
    'detectField'
];
var SchemaRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(SchemaRenderer, _super);
    function SchemaRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.refFn = _this.refFn.bind(_this);
        _this.renderChild = _this.renderChild.bind(_this);
        _this.reRender = _this.reRender.bind(_this);
        return _this;
    }
    SchemaRenderer.prototype.componentWillMount = function () {
        this.resolveRenderer(this.props);
    };
    SchemaRenderer.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.schema.type !== nextProps.schema.type ||
            props.schema.$$id !== nextProps.schema.$$id) {
            this.resolveRenderer(nextProps);
        }
    };
    // 限制：只有 schema 除外的 props 变化，或者 schema 里面的某个成员值发生变化才更新。
    SchemaRenderer.prototype.shouldComponentUpdate = function (nextProps) {
        var props = this.props;
        var list = difference(Object.keys(nextProps), ['schema']);
        if (difference(Object.keys(props), ['schema']).length !== list.length ||
            helper_1.anyChanged(list, this.props, nextProps)) {
            return true;
        }
        else {
            var list_1 = Object.keys(nextProps.schema);
            if (Object.keys(props.schema).length !== list_1.length ||
                helper_1.anyChanged(list_1, props.schema, nextProps.schema)) {
                return true;
            }
        }
        return false;
    };
    SchemaRenderer.prototype.resolveRenderer = function (props) {
        var schema = props.schema;
        var path = props.$path;
        var rendererResolver = props.env.rendererResolver || resolveRenderer;
        if (schema.$ref) {
            schema = tslib_1.__assign(tslib_1.__assign({}, props.resolveDefinitions(schema.$ref)), schema);
            delete schema.$ref;
            path = path.replace(/(?!.*\/).*/, schema.type);
        }
        // value 会提前从 control 中获取到，所有需要把control中的属性也补充完整
        // if (schema.control && schema.control.$ref) {
        //     schema.control = {
        //         ...props.resolveDefinitions(schema.control.$ref),
        //         ...schema.control
        //     }
        //     delete schema.control.$ref;
        // }
        this.renderer = rendererResolver(path, schema, props);
        return schema;
    };
    SchemaRenderer.prototype.getWrappedInstance = function () {
        return this.ref;
    };
    SchemaRenderer.prototype.refFn = function (ref) {
        this.ref = ref;
    };
    SchemaRenderer.prototype.renderChild = function (region, node, subProps) {
        if (subProps === void 0) { subProps = {}; }
        var _a = this.props, schema = _a.schema, $path = _a.$path, env = _a.env, rest = tslib_1.__rest(_a, ["schema", "$path", "env"]);
        var omitList = defaultOmitList.concat();
        if (this.renderer) {
            var Component = this.renderer.component;
            Component.propsList &&
                omitList.push.apply(omitList, Component.propsList);
        }
        return renderChild("" + $path + (region ? "/" + region : ''), node || '', tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, omit(rest, omitList)), subProps), { data: subProps.data || rest.data, env: env }));
    };
    SchemaRenderer.prototype.reRender = function () {
        this.resolveRenderer(this.props);
        this.forceUpdate();
    };
    SchemaRenderer.prototype.render = function () {
        var _this = this;
        var _a = this.props, $path = _a.$path, schema = _a.schema, rest = tslib_1.__rest(_a, ["$path", "schema"]);
        if (schema.$ref) {
            schema = this.resolveRenderer(this.props);
        }
        var theme = this.props.env.theme;
        if (Array.isArray(schema)) {
            return renderChildren($path, schema, rest);
        }
        else if (schema.children) {
            return react_1.default.isValidElement(schema.children)
                ? schema.children
                : schema.children(tslib_1.__assign(tslib_1.__assign({}, rest), { $path: $path, render: this.renderChild }));
        }
        else if (typeof schema.component === 'function') {
            return react_1.default.createElement(schema.component, tslib_1.__assign(tslib_1.__assign({}, rest), { $path: $path, render: this.renderChild }));
        }
        else if (!this.renderer) {
            return (react_1.default.createElement(components_1.LazyComponent, tslib_1.__assign({}, rest, { getComponent: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var result;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, rest.env.loadRenderer(schema, $path, this.reRender)];
                            case 1:
                                result = _a.sent();
                                if (result && typeof result === 'function') {
                                    return [2 /*return*/, result];
                                }
                                else if (result && react_1.default.isValidElement(result)) {
                                    return [2 /*return*/, function () { return result; }];
                                }
                                this.reRender();
                                return [2 /*return*/, function () { return loadRenderer(schema, $path); }];
                        }
                    });
                }); }, "$path": $path, retry: this.reRender })));
        }
        var renderer = this.renderer;
        schema = filterSchema(schema, renderer, rest);
        var defaultData = schema.data, restSchema = tslib_1.__rest(schema, ["data"]);
        var Component = renderer.component;
        return (react_1.default.createElement(Component, tslib_1.__assign({}, theme.getRendererConfig(renderer.name), restSchema, rest, { defaultData: defaultData, "$path": $path, ref: this.refFn, render: this.renderChild })));
    };
    SchemaRenderer.displayName = 'Renderer';
    return SchemaRenderer;
}(react_1.default.Component));
function HocStoreFactory(renderer) {
    return function (Component) {
        var StoreFactory = /** @class */ (function (_super) {
            tslib_1.__extends(StoreFactory, _super);
            function StoreFactory() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            StoreFactory.prototype.getWrappedInstance = function () {
                return this.ref;
            };
            StoreFactory.prototype.refFn = function (ref) {
                this.ref = ref;
            };
            StoreFactory.prototype.formatData = function (data) {
                if (Array.isArray(data)) {
                    return {
                        items: data
                    };
                }
                return data;
            };
            StoreFactory.prototype.componentWillMount = function () {
                var rootStore = this.context;
                this.renderChild = this.renderChild.bind(this);
                this.refFn = this.refFn.bind(this);
                var store = (this.store = rootStore.addStore({
                    id: helper_1.guid(),
                    path: this.props.$path,
                    storeType: renderer.storeType,
                    parentId: this.props.store ? this.props.store.id : ''
                }));
                if (renderer.extendsData === false) {
                    store.initData(helper_1.createObject(this.props.data
                        ? this.props.data.__super
                        : null, tslib_1.__assign(tslib_1.__assign({}, this.formatData(this.props.defaultData)), this.formatData(this.props.data))));
                }
                else if (this.props.scope ||
                    (this.props.data && this.props.data.__super)) {
                    if (this.props.store && this.props.data === this.props.store.data) {
                        store.initData(helper_1.createObject(this.props.store.data, tslib_1.__assign({}, this.formatData(this.props.defaultData))));
                    }
                    else {
                        store.initData(helper_1.createObject(this.props.data.__super || this.props.scope, tslib_1.__assign(tslib_1.__assign({}, this.formatData(this.props.defaultData)), this.formatData(this.props.data))));
                    }
                }
                else {
                    store.initData(tslib_1.__assign(tslib_1.__assign({}, this.formatData(this.props.defaultData)), this.formatData(this.props.data)));
                }
            };
            StoreFactory.prototype.componentWillReceiveProps = function (nextProps) {
                var props = this.props;
                var store = this.store;
                if (renderer.extendsData === false) {
                    (props.defaultData !== nextProps.defaultData ||
                        helper_1.isObjectShallowModified(props.data, nextProps.data) ||
                        // CRUD 中 toolbar 里面的 data 是空对象，但是 __super 会不一样
                        (nextProps.data &&
                            props.data &&
                            nextProps.data.__super !== props.data.__super)) &&
                        store.initData(helper_1.extendObject(nextProps.data, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (store.hasRemoteData ? store.data : null)), this.formatData(nextProps.defaultData)), this.formatData(nextProps.data))));
                }
                else if (helper_1.isObjectShallowModified(props.data, nextProps.data)) {
                    if (nextProps.store && nextProps.store.data === nextProps.data) {
                        var newData = helper_1.createObject(nextProps.store.data, helper_1.syncDataFromSuper(store.data, nextProps.store.data, props.scope, nextProps.dataUpdatedAt !== props.dataUpdatedAt, store));
                        // todo fix: dialog 种数据从孩子 form 同步过来后，会走这个逻辑让 form 更新 data，会导致里面的 __prev 丢失。
                        store.initData(newData);
                    }
                    else if (nextProps.data && nextProps.data.__super) {
                        store.initData(helper_1.extendObject(nextProps.data));
                    }
                    else {
                        store.initData(helper_1.createObject(nextProps.scope, nextProps.data));
                    }
                }
                else if ((!nextProps.store || nextProps.data !== nextProps.store.data) &&
                    nextProps.data &&
                    nextProps.data.__super) {
                    // 这个用法很少，当 data.__super 值发生变化时，更新 store.data
                    (!props.data ||
                        helper_1.isObjectShallowModified(nextProps.data.__super, props.data.__super, false)) &&
                        store.initData(helper_1.createObject(nextProps.data.__super, tslib_1.__assign(tslib_1.__assign({}, nextProps.data), store.data)));
                }
                else if (props.scope !== nextProps.scope) {
                    store.initData(helper_1.createObject(nextProps.scope, tslib_1.__assign({}, store.data)));
                }
            };
            StoreFactory.prototype.componentWillUnmount = function () {
                var rootStore = this.context;
                var store = this.store;
                rootStore.removeStore(store);
                delete this.store;
            };
            StoreFactory.prototype.renderChild = function (region, node, subProps) {
                if (subProps === void 0) { subProps = {}; }
                var render = this.props.render;
                return render(region, node, tslib_1.__assign(tslib_1.__assign({ data: this.store.data, dataUpdatedAt: this.store.updatedAt }, subProps), { scope: this.store.data, store: this.store }));
            };
            StoreFactory.prototype.render = function () {
                var _a = this.props, detectField = _a.detectField, rest = tslib_1.__rest(_a, ["detectField"]);
                var exprProps = {};
                if (!detectField || detectField === 'data') {
                    exprProps = filter_schema_1.default(rest, this.store.data);
                    if (exprProps.hidden || exprProps.visible === false) {
                        return null;
                    }
                }
                return (react_1.default.createElement(Component, tslib_1.__assign({}, rest /* todo */, exprProps, { ref: this.refFn, data: this.store.data, dataUpdatedAt: this.store.updatedAt, store: this.store, scope: this.store.data, render: this.renderChild })));
            };
            StoreFactory.displayName = "WithStore(" + (Component.displayName ||
                Component.name) + ")";
            StoreFactory.ComposedComponent = Component;
            StoreFactory.contextType = RootStoreContext;
            StoreFactory = tslib_1.__decorate([
                mobx_react_1.observer
            ], StoreFactory);
            return StoreFactory;
        }(react_1.default.Component));
        hoistNonReactStatic(StoreFactory, Component);
        return StoreFactory;
    };
}
exports.HocStoreFactory = HocStoreFactory;
function loadRenderer(schema, path) {
    return (react_1.default.createElement(Alert2_1.default, { level: "danger" },
        react_1.default.createElement("p", null, "Error: \u627E\u4E0D\u5230\u5BF9\u5E94\u7684\u6E32\u67D3\u5668"),
        react_1.default.createElement("p", null,
            "Path: ",
            path),
        react_1.default.createElement("pre", null,
            react_1.default.createElement("code", null, JSON.stringify(schema, null, 2)))));
}
function errorRenderer(error, errorInfo) {
    return (react_1.default.createElement(Alert2_1.default, { level: "danger" },
        react_1.default.createElement("p", null, error && error.toString()),
        react_1.default.createElement("pre", null,
            react_1.default.createElement("code", null, errorInfo.componentStack))));
}
var defaultOptions = {
    session: 'global',
    affixOffsetTop: 50,
    affixOffsetBottom: 0,
    richTextToken: '',
    loadRenderer: loadRenderer,
    fetcher: function () {
        return Promise.reject('fetcher is required');
    },
    isCancel: function () {
        console.error('Please implements this. see https://baidu.github.io/amis/docs/getting-started#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8');
        return false;
    },
    alert: function (msg) {
        alert(msg);
    },
    updateLocation: function () {
        console.error('Please implements this. see https://baidu.github.io/amis/docs/getting-started#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8');
    },
    confirm: function (msg) {
        return confirm(msg);
    },
    notify: function (msg) {
        alert(msg);
    },
    jumpTo: function () {
        console.error('Please implements this. see https://baidu.github.io/amis/docs/getting-started#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8');
    },
    isCurrentUrl: function () {
        return false;
    },
    copy: function (contents) {
        console.error('copy contents', contents);
    },
    rendererResolver: resolveRenderer
};
var stores = {};
function render(schema, props, options, pathPrefix) {
    if (props === void 0) { props = {}; }
    if (options === void 0) { options = {}; }
    if (pathPrefix === void 0) { pathPrefix = ''; }
    options = tslib_1.__assign(tslib_1.__assign({}, defaultOptions), options);
    var store = stores[options.session || 'global'] ||
        (stores[options.session || 'global'] = index_1.RendererStore.create({}, tslib_1.__assign(tslib_1.__assign({}, options), { fetcher: options.fetcher
                ? api_1.wrapFetcher(options.fetcher)
                : defaultOptions.fetcher, confirm: options.confirm
                ? helper_1.promisify(options.confirm)
                : defaultOptions.confirm })));
    window.amisStore = store; // 为了方便 debug.
    var env = mobx_state_tree_1.getEnv(store);
    var theme = props.theme || options.theme || 'default';
    env.theme = theme_1.getTheme(theme);
    return (react_1.default.createElement(exports.ScopedRootRenderer, tslib_1.__assign({}, props, { schema: schema, pathPrefix: pathPrefix, rootStore: store, env: env, theme: theme })));
}
exports.render = render;
function clearStoresCache(sessions) {
    if (Array.isArray(sessions) && sessions.length) {
        sessions.forEach(function (key) { return delete stores[key]; });
    }
    else {
        stores = {};
    }
}
exports.clearStoresCache = clearStoresCache;
var cache = {};
function resolveRenderer(path, schema, props) {
    if (cache[path]) {
        return cache[path];
    }
    else if (path && path.length > 1024) {
        throw new Error('Path太长是不是死循环了？');
    }
    var renderer = null;
    renderers.some(function (item) {
        var matched = false;
        if (typeof item.test === 'function') {
            matched = item.test(path, schema, resolveRenderer);
        }
        else if (item.test instanceof RegExp) {
            matched = item.test.test(path);
        }
        if (matched) {
            renderer = item;
        }
        return matched;
    });
    // 只能缓存纯正则表达式的后者方法中没有用到第二个参数的，因为自定义 test 函数的有可能依赖 schema 的结果
    if (renderer !== null &&
        (renderer.test instanceof RegExp ||
            (typeof renderer.test === 'function' &&
                renderer.test.length < 2))) {
        cache[path] = renderer;
    }
    return renderer;
}
exports.resolveRenderer = resolveRenderer;
function getRenderers() {
    return renderers.concat();
}
exports.getRenderers = getRenderers;
function getRendererByName(name) {
    return find(renderers, function (item) { return item.name === name; });
}
exports.getRendererByName = getRendererByName;
//# sourceMappingURL=./factory.js.map
