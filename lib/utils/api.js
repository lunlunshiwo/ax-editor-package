"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tpl_builtin_1 = require("./tpl-builtin");
var qs_1 = tslib_1.__importDefault(require("qs"));
var tpl_1 = require("./tpl");
var helper_1 = require("./helper");
var rSchema = /(?:^|raw\:)(get|post|put|delete|patch|options|head):/i;
var apiCaches = [];
function normalizeApi(api, defaultMethod) {
    if (typeof api === 'string') {
        var method = rSchema.test(api) ? RegExp.$1 : '';
        method && (api = api.replace(method + ':', ''));
        api = {
            method: (method || defaultMethod),
            url: api
        };
    }
    else {
        api = tslib_1.__assign({}, api);
    }
    return api;
}
exports.normalizeApi = normalizeApi;
function buildApi(api, data, options) {
    if (options === void 0) { options = {}; }
    api = normalizeApi(api, options.method);
    var autoAppend = options.autoAppend, ignoreData = options.ignoreData, rest = tslib_1.__rest(options, ["autoAppend", "ignoreData"]);
    api.config = tslib_1.__assign({}, rest);
    api.method = api.method || options.method || 'get';
    if (!data) {
        return api;
    }
    else if (data instanceof FormData ||
        data instanceof Blob ||
        data instanceof ArrayBuffer) {
        api.data = data;
        return api;
    }
    var raw = (api.url = api.url || '');
    api.url = tpl_builtin_1.tokenize(api.url, data, '| url_encode');
    if (ignoreData) {
        return api;
    }
    if (api.data) {
        api.data = tpl_builtin_1.dataMapping(api.data, data);
    }
    else if (api.method === 'post' || api.method === 'put') {
        api.data = data;
    }
    // get 类请求，把 data 附带到 url 上。
    if (api.method === 'get') {
        if (!~raw.indexOf('$') && !api.data && autoAppend) {
            api.data = data;
        }
        if (api.data) {
            var idx = api.url.indexOf('?');
            if (~idx) {
                var params = tslib_1.__assign(tslib_1.__assign({}, qs_1.default.parse(api.url.substring(idx + 1))), api.data);
                api.url = api.url.substring(0, idx) + '?' + helper_1.qsstringify(params);
            }
            else {
                api.url += '?' + helper_1.qsstringify(api.data);
            }
            delete api.data;
        }
    }
    if (api.headers) {
        api.headers = tpl_builtin_1.dataMapping(api.headers, data);
    }
    if (api.requestAdaptor && typeof api.requestAdaptor === 'string') {
        api.requestAdaptor = str2function(api.requestAdaptor, 'api');
    }
    if (api.adaptor && typeof api.adaptor === 'string') {
        api.adaptor = str2function(api.adaptor, 'payload', 'response', 'api');
    }
    return api;
}
exports.buildApi = buildApi;
function str2function(contents) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    try {
        var fn = new (Function.bind.apply(Function, tslib_1.__spreadArrays([void 0], args, [contents])))();
        return fn;
    }
    catch (e) {
        console.warn(e);
        return null;
    }
}
function responseAdaptor(ret) {
    var data = ret.data;
    if (!data) {
        throw new Error('Response is empty!');
    }
    else if (!data.hasOwnProperty('status')) {
        throw new Error('接口返回格式不符合，请参考 http://amis.baidu.com/v2/docs/api');
    }
    var payload = {
        ok: data.status == 0,
        status: data.status,
        msg: data.msg,
        data: data.data
    };
    if (payload.status == 422) {
        payload.errors = data.errors;
    }
    return payload;
}
function wrapFetcher(fn) {
    return function (api, data, options) {
        api = buildApi(api, data, options);
        if (api.data && (helper_1.hasFile(api.data) || api.dataType === 'form-data')) {
            api.data = helper_1.object2formData(api.data, api.qsOptions);
        }
        else if (api.data && api.dataType === 'form') {
            api.data = helper_1.qsstringify(api.data, api.qsOptions);
            api.headers = api.headers || (api.headers = {});
            api.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        api.requestAdaptor && (api = api.requestAdaptor(api) || api);
        if (typeof api.cache === 'number' && api.cache > 0) {
            var apiCache = getApiCache(api);
            return wrapAdaptor(apiCache
                ? apiCache.cachedPromise
                : setApiCache(api, fn(api)), api);
        }
        return wrapAdaptor(fn(api), api);
    };
}
exports.wrapFetcher = wrapFetcher;
function wrapAdaptor(promise, api) {
    var adaptor = api.adaptor;
    return adaptor
        ? promise
            .then(function (response) { return (tslib_1.__assign(tslib_1.__assign({}, response), { data: adaptor(response.data, response, api) })); })
            .then(responseAdaptor)
        : promise.then(responseAdaptor);
}
exports.wrapAdaptor = wrapAdaptor;
function isApiOutdated(prevApi, nextApi, prevData, nextData) {
    var url = (nextApi && nextApi.url) || nextApi;
    if (url && typeof url === 'string' && ~url.indexOf('$')) {
        prevApi = buildApi(prevApi, prevData, { ignoreData: true });
        nextApi = buildApi(nextApi, nextData, { ignoreData: true });
        return !!(prevApi.url !== nextApi.url &&
            isValidApi(nextApi.url) &&
            (!nextApi.sendOn || tpl_1.evalExpression(nextApi.sendOn, nextData)));
    }
    return false;
}
exports.isApiOutdated = isApiOutdated;
function isValidApi(api) {
    return api && /^(?:https?:\/\/[^\/]+)?(\/[^\s\/\?]*){1,}(\?.*)?$/.test(api);
}
exports.isValidApi = isValidApi;
function isEffectiveApi(api, data, initFetch, initFetchOn) {
    if (!api) {
        return false;
    }
    if (initFetch === false) {
        return false;
    }
    if (initFetchOn && data && !tpl_1.evalExpression(initFetchOn, data)) {
        return false;
    }
    if (typeof api === 'string' && api.length) {
        return true;
    }
    else if (helper_1.isObject(api) && api.url) {
        if (api.sendOn &&
            data &&
            !tpl_1.evalExpression(api.sendOn, data)) {
            return false;
        }
        return true;
    }
    return false;
}
exports.isEffectiveApi = isEffectiveApi;
function isSameApi(apiA, apiB) {
    return (apiA.method === apiB.method &&
        apiA.url === apiB.url &&
        !helper_1.isObjectShallowModified(apiA.data, apiB.data, false));
}
exports.isSameApi = isSameApi;
function getApiCache(api) {
    // 清理过期cache
    var now = Date.now();
    var result;
    for (var idx = 0, len = apiCaches.length; idx < len; idx++) {
        var apiCache = apiCaches[idx];
        if (now - apiCache.requestTime > apiCache.cache) {
            apiCaches.splice(idx, 1);
            len--;
            idx--;
            continue;
        }
        if (isSameApi(api, apiCache)) {
            result = apiCache;
            break;
        }
    }
    return result;
}
exports.getApiCache = getApiCache;
function setApiCache(api, promise) {
    apiCaches.push(tslib_1.__assign(tslib_1.__assign({}, api), { cachedPromise: promise, requestTime: Date.now() }));
    return promise;
}
exports.setApiCache = setApiCache;
function clearApiCache() {
    apiCaches.splice(0, apiCaches.length);
}
exports.clearApiCache = clearApiCache;
// window.apiCaches = apiCaches;
//# sourceMappingURL=./utils/api.js.map
